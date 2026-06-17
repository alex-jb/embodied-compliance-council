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
    """Aggregate positions into sectors and flag benchmark deviations.

    PHASE A — v0 textbook implementation. Phase B will replace with Loredana's
    BR doc Section 6.2 (GICS sub-industry hierarchy, factor-style overweights,
    cycle-aware risk-weighted exposures).
    """
    if not inp.weights:
        raise ValueError("weights map must not be empty")
    total = sum(inp.weights.values())
    if total <= 0:
        raise ValueError("weights must sum to a positive value")

    aggregated: dict[str, float] = {}
    for ticker, weight in inp.weights.items():
        sector = inp.sector_map.get(ticker)
        if sector is None:
            raise ValueError(f"sector_map missing entry for ticker {ticker}")
        aggregated[sector] = aggregated.get(sector, 0.0) + weight / total

    benchmark = inp.benchmark_sector_weights or {}
    rows: list[SectorExposure] = []
    for sector, port_weight in aggregated.items():
        bench = benchmark.get(sector)
        active = (port_weight - bench) if bench is not None else None
        flagged = False
        reason: str | None = None
        if active is not None and abs(active) > inp.deviation_threshold:
            flagged = True
            direction = "overweight" if active > 0 else "underweight"
            reason = f"{direction} by {active*100:+.1f}pp vs benchmark"
        rows.append(
            SectorExposure(
                sector=sector,
                portfolio_weight=port_weight,
                benchmark_weight=bench,
                active_weight=active,
                flagged=flagged,
                reason=reason,
            )
        )
    rows.sort(key=lambda r: -(r.active_weight if r.active_weight is not None else r.portfolio_weight))

    top_over: str | None = None
    top_under: str | None = None
    if benchmark:
        active_sorted = [r for r in rows if r.active_weight is not None]
        if active_sorted:
            top_over = max(active_sorted, key=lambda r: r.active_weight or 0.0).sector
            top_under = min(active_sorted, key=lambda r: r.active_weight or 0.0).sector

    interpretation = (
        f"{len(rows)} sectors. "
        + (
            f"Top overweight: {top_over}; top underweight: {top_under}."
            if benchmark
            else "No benchmark provided — absolute exposures only."
        )
        + f" Threshold={inp.deviation_threshold*100:.1f}pp."
    )
    return SectorExposureOutput(
        exposures=rows,
        top_overweight_sector=top_over,
        top_underweight_sector=top_under,
        interpretation=interpretation,
    )


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
