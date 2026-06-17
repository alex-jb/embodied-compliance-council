"""Concentration limits — Herfindahl-Hirschman Index + top-N share + Gini.

Detects whether the portfolio is over-concentrated in a small number of positions.
Banks typically enforce hard limits (e.g. no single name > 5%, top-10 < 40%).
Required for ECOA and Reg B fair-lending exposure monitoring on the lending side.
"""
from __future__ import annotations

from pydantic import BaseModel, Field


class ConcentrationLimitsInput(BaseModel):
    weights: dict[str, float] = Field(
        ...,
        description="Map of ticker (or loan id) → weight as fraction of portfolio. Should sum to ~1.0.",
    )
    single_name_limit: float = Field(0.05, ge=0, le=1,
        description="Hard limit per single name. 0.05 = 5%.")
    top_n_count: int = Field(10, ge=1)
    top_n_limit: float = Field(0.40, ge=0, le=1,
        description="Hard limit on top-N combined share. 0.40 = 40%.")


class ConcentrationLimitsOutput(BaseModel):
    hhi: float = Field(..., description="Herfindahl-Hirschman Index (0-10000 standard, 0-1 fractional). >0.25 = concentrated.")
    gini: float = Field(..., description="Gini coefficient. 0 = perfect equality, 1 = single name.")
    top_n_share: float
    violations: list[str] = Field(default_factory=list, description="Plain-English list of breached limits.")
    interpretation: str


def concentration_limits(inp: ConcentrationLimitsInput) -> ConcentrationLimitsOutput:
    """Compute concentration metrics and flag limit violations.

    PHASE A — STUB. Phase B: implementation from Loredana's BR doc.
    """
    raise NotImplementedError("Phase A scaffold; Phase B from Loredana's BR doc Section 6.1.")


def concentration_limits_tool_schema() -> dict:
    return {
        "name": "concentration_limits",
        "description": (
            "Compute portfolio concentration metrics (HHI, Gini, top-N share) and flag any "
            "hard-limit breaches. Use when reasoning about diversification, regulatory "
            "concentration caps, or whether a single position is too large."
        ),
        "input_schema": ConcentrationLimitsInput.model_json_schema(),
    }
