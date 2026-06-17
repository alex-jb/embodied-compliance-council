"""Value-at-Risk (VaR) — historical, parametric (Gaussian), and Monte Carlo methods.

Used by Risk Officer voice + Portfolio Manager voice + Macro Contrarian voice
during deliberation to ground their reasoning in a defensible loss bound.

References (capstone literature review will expand):
- Jorion, P. (2007). Value at Risk: The New Benchmark for Managing Financial Risk.
- Embrechts, P., Frey, R., & McNeil, A. (2015). Quantitative Risk Management.
- Christoffersen, P. (2011). Elements of Financial Risk Management.
"""
from __future__ import annotations

import math
from typing import Literal

import numpy as np
from pydantic import BaseModel, Field
from scipy import stats


class VarInput(BaseModel):
    """Input contract for VaR calculation."""

    portfolio_returns: list[float] = Field(
        ...,
        description="Historical portfolio returns (daily, decimal form). Minimum 30 observations.",
        min_length=30,
    )
    confidence_level: float = Field(
        0.95,
        ge=0.80,
        le=0.999,
        description="Confidence level. 0.95 = 95% VaR. Industry standard is 0.95 or 0.99.",
    )
    method: Literal["historical", "parametric", "monte_carlo"] = Field(
        "historical",
        description=(
            "VaR calculation method. 'historical' uses empirical quantile (recommended for "
            "fat-tailed distributions). 'parametric' assumes Gaussian (faster but underestimates "
            "tail risk). 'monte_carlo' simulates 10000 paths from fitted parameters."
        ),
    )
    horizon_days: int = Field(
        1,
        ge=1,
        le=20,
        description="Forecast horizon in days. Scales by sqrt(t) under iid assumption.",
    )


class VarOutput(BaseModel):
    """Output contract for VaR calculation."""

    var_value: float = Field(
        ...,
        description="VaR as a positive number representing potential loss. e.g. 0.0234 = 2.34% portfolio loss.",
    )
    confidence_level: float
    method: str
    horizon_days: int
    sample_size: int
    interpretation: str = Field(
        ...,
        description="Plain-English interpretation suitable for a voice avatar to speak aloud in the spatial council.",
    )


def var(inp: VarInput) -> VarOutput:
    """Compute portfolio VaR.

    PHASE A — v0 textbook implementation. Phase B will replace with
    Loredana's BR doc Section 4.2 implementation (Cornish-Fisher correction,
    GARCH conditional VaR, EVT tails) once shared.
    """
    returns = np.asarray(inp.portfolio_returns, dtype=float)
    alpha = 1.0 - inp.confidence_level

    if inp.method == "historical":
        var_1d = -float(np.quantile(returns, alpha))
    elif inp.method == "parametric":
        mu = float(returns.mean())
        sigma = float(returns.std(ddof=1))
        z = float(stats.norm.ppf(alpha))
        var_1d = -(mu + sigma * z)
    else:
        rng = np.random.default_rng(seed=42)
        mu = float(returns.mean())
        sigma = float(returns.std(ddof=1))
        simulated = rng.normal(mu, sigma, size=10000)
        var_1d = -float(np.quantile(simulated, alpha))

    var_value = var_1d * math.sqrt(inp.horizon_days)
    pct = var_value * 100
    interpretation = (
        f"At {int(inp.confidence_level * 100)}% confidence over {inp.horizon_days}d, "
        f"max expected loss is {pct:.2f}% of portfolio value ({inp.method} VaR, n={len(returns)})."
    )
    return VarOutput(
        var_value=var_value,
        confidence_level=inp.confidence_level,
        method=inp.method,
        horizon_days=inp.horizon_days,
        sample_size=len(returns),
        interpretation=interpretation,
    )


def var_tool_schema() -> dict:
    """Anthropic Tool-Use JSON schema for the VaR function.

    Each voice in the council is initialized with this tool so it can call
    var(...) mid-deliberation. The voice's reasoning becomes risk-grounded.
    """
    return {
        "name": "var",
        "description": (
            "Calculate Value-at-Risk for a portfolio. Returns the maximum expected loss "
            "at the specified confidence level over the specified horizon. Call this when "
            "reasoning about downside scenarios, position sizing, or capital adequacy."
        ),
        "input_schema": VarInput.model_json_schema(),
    }
