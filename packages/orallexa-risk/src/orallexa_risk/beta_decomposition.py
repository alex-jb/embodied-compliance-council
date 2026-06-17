"""Beta decomposition — single-stock beta into market + sector + idiosyncratic.

Splits each holding's beta into the portion explained by the broad market,
the portion explained by sector co-movement, and the residual idiosyncratic
component. Useful when the same beta hides very different concentration risks.
"""
from __future__ import annotations

from pydantic import BaseModel, Field


class BetaDecompositionInput(BaseModel):
    ticker_returns: dict[str, list[float]] = Field(..., description="Map of ticker → return series.")
    market_returns: list[float] = Field(..., min_length=60)
    sector_map: dict[str, str] = Field(..., description="Map of ticker → sector name (GICS).")
    sector_returns: dict[str, list[float]] = Field(..., description="Map of sector → return series.")


class BetaDecomposition(BaseModel):
    ticker: str
    sector: str
    total_beta: float
    market_beta: float = Field(..., description="Portion of beta attributable to broad market.")
    sector_beta: float = Field(..., description="Portion attributable to sector co-movement.")
    idiosyncratic_variance: float


class BetaDecompositionOutput(BaseModel):
    decompositions: list[BetaDecomposition]
    portfolio_total_beta: float
    portfolio_market_beta: float
    portfolio_sector_concentration_ratio: float = Field(
        ...,
        description="Share of total beta explained by sector co-movement. > 0.5 = sector-concentrated.",
    )
    interpretation: str


def beta_decomposition(inp: BetaDecompositionInput) -> BetaDecompositionOutput:
    """Decompose portfolio beta into market vs sector vs idiosyncratic.

    PHASE A — STUB. Phase B: regression-based decomposition.
    """
    raise NotImplementedError("Phase A scaffold; Phase B from Loredana's BR doc Section 5.2.")


def beta_decomposition_tool_schema() -> dict:
    return {
        "name": "beta_decomposition",
        "description": (
            "Decompose each holding's beta into market, sector, and idiosyncratic components. "
            "Use when reasoning about whether the portfolio's risk is broadly diversified or "
            "concentrated in sector co-movements that a single-name view would miss."
        ),
        "input_schema": BetaDecompositionInput.model_json_schema(),
    }
