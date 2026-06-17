"""Expected Shortfall (ES) / Conditional VaR (CVaR).

The average loss in the worst (1 - confidence_level) percent of scenarios.
Unlike VaR, ES is coherent (subadditivity), satisfies the Basel III FRTB
trading-book requirement, and quantifies tail risk where VaR is silent.

Used by Risk Officer voice + Activist Short voice during deliberation.
"""
from __future__ import annotations

import math
from typing import Literal

import numpy as np
from pydantic import BaseModel, Field
from scipy import stats


class ExpectedShortfallInput(BaseModel):
    portfolio_returns: list[float] = Field(..., min_length=30)
    confidence_level: float = Field(0.975, ge=0.80, le=0.999,
        description="Basel III FRTB uses 97.5%. Internal limits often 99%.")
    method: Literal["historical", "parametric", "cornish_fisher"] = "historical"
    horizon_days: int = Field(1, ge=1, le=20)


class ExpectedShortfallOutput(BaseModel):
    es_value: float = Field(..., description="ES as positive loss number.")
    var_value: float = Field(..., description="Companion VaR at same confidence level for context.")
    confidence_level: float
    method: str
    tail_observations: int = Field(..., description="Number of observations in the tail used for the average.")
    interpretation: str


def expected_shortfall(inp: ExpectedShortfallInput) -> ExpectedShortfallOutput:
    """Compute Expected Shortfall (CVaR).

    PHASE A — v0 textbook implementations:
      - historical: average of returns below the empirical (1-c) quantile.
      - parametric: closed-form Gaussian ES = mu + sigma * phi(z) / alpha (negated to loss sign).
      - cornish_fisher: parametric with skewness + kurtosis correction (Cornish-Fisher expansion).
    Phase B will replace with Loredana's BR doc Section 4.3 versions (GARCH conditional ES,
    extreme value theory tails).
    """
    returns = np.asarray(inp.portfolio_returns, dtype=float)
    alpha = 1.0 - inp.confidence_level
    mu = float(returns.mean())
    sigma = float(returns.std(ddof=1))
    sqrt_h = math.sqrt(inp.horizon_days)

    if inp.method == "historical":
        threshold = float(np.quantile(returns, alpha))
        tail = returns[returns <= threshold]
        tail_n = int(tail.size)
        var_1d = -threshold
        es_1d = -float(tail.mean()) if tail_n > 0 else var_1d
    else:
        z_alpha = float(stats.norm.ppf(alpha))
        if inp.method == "cornish_fisher":
            sk = float(stats.skew(returns, bias=False))
            kt = float(stats.kurtosis(returns, fisher=True, bias=False))
            z_alpha = (
                z_alpha
                + (z_alpha**2 - 1) * sk / 6
                + (z_alpha**3 - 3 * z_alpha) * kt / 24
                - (2 * z_alpha**3 - 5 * z_alpha) * (sk**2) / 36
            )
        phi_z = float(stats.norm.pdf(z_alpha))
        es_1d = -(mu - sigma * phi_z / alpha)
        var_1d = -(mu + sigma * z_alpha)
        tail_n = 0

    var_value = var_1d * sqrt_h
    es_value = es_1d * sqrt_h
    interpretation = (
        f"At {int(inp.confidence_level * 100)}% confidence, mean loss in the worst {int(alpha * 100)}% "
        f"tail is {es_value*100:.2f}% over {inp.horizon_days}d ({inp.method}, n={returns.size}, "
        f"tail_n={tail_n}). Companion VaR = {var_value*100:.2f}%."
    )
    return ExpectedShortfallOutput(
        es_value=es_value,
        var_value=var_value,
        confidence_level=inp.confidence_level,
        method=inp.method,
        tail_observations=tail_n,
        interpretation=interpretation,
    )


def expected_shortfall_tool_schema() -> dict:
    return {
        "name": "expected_shortfall",
        "description": (
            "Calculate Expected Shortfall (Conditional VaR) — the average loss in the worst "
            "tail. Required for Basel III FRTB trading-book capital. Use when reasoning about "
            "extreme downside scenarios that VaR alone cannot quantify."
        ),
        "input_schema": ExpectedShortfallInput.model_json_schema(),
    }
