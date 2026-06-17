"""Expected Shortfall (ES) / Conditional VaR (CVaR).

The average loss in the worst (1 - confidence_level) percent of scenarios.
Unlike VaR, ES is coherent (subadditivity), satisfies the Basel III FRTB
trading-book requirement, and quantifies tail risk where VaR is silent.

Used by Risk Officer voice + Activist Short voice during deliberation.
"""
from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field


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

    PHASE A — STUB. Phase B lifts implementation from Loredana's BR doc.
    """
    raise NotImplementedError("Phase A scaffold; Phase B from Loredana's BR doc Section 4.3.")


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
