"""Sector exposure — GICS sector-level allocation vs benchmark + deviation flags.

Identifies sectors where the portfolio is materially over- or under-weight
relative to a chosen benchmark. Bank lending books use this for both
diversification and macro-cycle stress (e.g. CRE concentration in 2023-24).
"""
from __future__ import annotations

from pydantic import BaseModel, Field


class SectorExposureInput(BaseModel):
    weights: dict[str, float] = Field(..., description="Map of ticker (or loan id) → weight.")
    sector_map: dict[str, str] = Field(..., description="Map of ticker → GICS sector.")
    benchmark_sector_weights: dict[str, float] | None = Field(
        None,
        description="Benchmark sector weights (e.g. SPX, R3000). If None, only absolute exposures returned.",
    )
    deviation_threshold: float = Field(
        0.05,
        ge=0,
        description="Sector overweight/underweight flagged if |portfolio - benchmark| > threshold.",
    )


class SectorExposure(BaseModel):
    sector: str
    portfolio_weight: float
    benchmark_weight: float | None
    active_weight: float | None = Field(None, description="portfolio - benchmark")
    flagged: bool = False
    reason: str | None = None


class SectorExposureOutput(BaseModel):
    exposures: list[SectorExposure]
    top_overweight_sector: str | None
    top_underweight_sector: str | None
    interpretation: str


def sector_exposure(inp: SectorExposureInput) -> SectorExposureOutput:
    """Compute sector-level exposure and flag deviations from benchmark.

    PHASE A — STUB. Phase B: implementation from Loredana's BR doc.
    """
    raise NotImplementedError("Phase A scaffold; Phase B from Loredana's BR doc Section 6.2.")


def sector_exposure_tool_schema() -> dict:
    return {
        "name": "sector_exposure",
        "description": (
            "Compute GICS sector-level allocation and flag material deviations from a benchmark. "
            "Use when reasoning about sector concentration, macro-cycle exposure (e.g. CRE, "
            "regional banks), or fair-lending portfolio diversification."
        ),
        "input_schema": SectorExposureInput.model_json_schema(),
    }
