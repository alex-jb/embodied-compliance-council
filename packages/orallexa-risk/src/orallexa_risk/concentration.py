"""Concentration limits — Herfindahl-Hirschman Index + top-N share + Gini.

Detects whether the portfolio is over-concentrated in a small number of positions.
Banks typically enforce hard limits (e.g. no single name > 5%, top-10 < 40%).
Required for ECOA and Reg B fair-lending exposure monitoring on the lending side.
"""
from __future__ import annotations

import numpy as np
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
    hhi: float = Field(..., description="Herfindahl-Hirschman Index fractional form (0-1). >0.25 = concentrated.")
    gini: float = Field(..., description="Gini coefficient. 0 = perfect equality, 1 = single name.")
    top_n_share: float
    violations: list[str] = Field(default_factory=list, description="Plain-English list of breached limits.")
    interpretation: str


def concentration_limits(inp: ConcentrationLimitsInput) -> ConcentrationLimitsOutput:
    """Compute concentration metrics and flag limit violations.

    PHASE A — v0 textbook implementation. HHI = sum(w_i^2). Gini via the
    sorted-cumulative-share formula. Phase B will replace with Loredana's BR
    doc Section 6.1 (Diversification Ratio, Effective N positions, sector-
    weighted variants).
    """
    if not inp.weights:
        raise ValueError("weights map must not be empty")
    items = list(inp.weights.items())
    arr = np.array([w for _, w in items], dtype=float)
    total = float(arr.sum())
    if total <= 0:
        raise ValueError("weights must sum to a positive value")
    normalized = arr / total

    hhi = float((normalized * normalized).sum())

    sorted_w = np.sort(normalized)
    n = sorted_w.size
    cumulative = np.cumsum(sorted_w)
    gini = float((n + 1 - 2 * cumulative.sum() / sorted_w.sum()) / n) if n > 1 else 0.0

    descending = np.sort(normalized)[::-1]
    top_n = descending[: inp.top_n_count]
    top_n_share = float(top_n.sum())

    violations: list[str] = []
    largest_idx = int(np.argmax(normalized))
    largest_name, _ = items[largest_idx]
    largest_weight = float(normalized[largest_idx])
    if largest_weight > inp.single_name_limit:
        violations.append(
            f"single-name cap breached: {largest_name} at {largest_weight*100:.2f}% > {inp.single_name_limit*100:.2f}%"
        )
    if top_n_share > inp.top_n_limit:
        violations.append(
            f"top-{inp.top_n_count} cap breached: cumulative {top_n_share*100:.2f}% > {inp.top_n_limit*100:.2f}%"
        )
    if hhi > 0.25:
        violations.append(f"HHI {hhi:.3f} > 0.25 — portfolio is concentrated by standard FTC threshold")

    interpretation = (
        f"HHI={hhi:.3f} (Gini={gini:.2f}). Top-{inp.top_n_count} positions cover {top_n_share*100:.1f}% NAV. "
        f"Largest single name = {largest_name} at {largest_weight*100:.1f}%. "
        f"{len(violations)} limit violation(s)."
    )
    return ConcentrationLimitsOutput(
        hhi=hhi,
        gini=gini,
        top_n_share=top_n_share,
        violations=violations,
        interpretation=interpretation,
    )


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
