"""Correlation matrix — Pearson + rolling + EWMA correlations between portfolio holdings.

Tracks how holding-pair correlations evolve through time. Critical for
multi-agent reasoning because static correlation hides regime-shift risk
(e.g. 2020 March everything correlated to 1.0).
"""
from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field


class CorrelationMatrixInput(BaseModel):
    ticker_returns: dict[str, list[float]] = Field(
        ...,
        description="Map of ticker → return series. All series must be aligned in time.",
    )
    method: Literal["pearson", "spearman", "ewma"] = Field(
        "pearson",
        description="Pearson for linear, Spearman for rank-based, EWMA for time-decayed.",
    )
    ewma_lambda: float = Field(
        0.94,
        ge=0.8,
        le=0.99,
        description="EWMA decay (RiskMetrics standard 0.94). Only used when method='ewma'.",
    )
    rolling_window: int | None = Field(
        None,
        ge=20,
        description="If set, returns rolling correlation history alongside point estimate.",
    )


class CorrelationPair(BaseModel):
    ticker_a: str
    ticker_b: str
    correlation: float
    p_value: float | None = None
    historical_max: float | None = Field(
        None,
        description="Max correlation observed in any rolling window. Useful for regime-shift warnings.",
    )


class CorrelationMatrixOutput(BaseModel):
    pairs: list[CorrelationPair]
    average_correlation: float
    max_correlation: CorrelationPair = Field(..., description="Highest-correlated pair, flagging concentrated co-movement risk.")
    diversification_ratio: float = Field(
        ...,
        description="Portfolio vol divided by weighted-sum of single-name vols. < 1 indicates diversification benefit.",
    )
    interpretation: str


def correlation_matrix(inp: CorrelationMatrixInput) -> CorrelationMatrixOutput:
    """Compute portfolio correlation matrix and derived diversification metrics.

    PHASE A — STUB. Phase B: implementation from Loredana's BR doc.
    """
    raise NotImplementedError("Phase A scaffold; Phase B from Loredana's BR doc Section 7.1.")


def correlation_matrix_tool_schema() -> dict:
    return {
        "name": "correlation_matrix",
        "description": (
            "Compute portfolio correlation matrix (Pearson, Spearman, or EWMA) and derived "
            "diversification metrics. Use when reasoning about hidden co-movement risk, "
            "diversification quality, or regime-shift scenarios where correlations spike."
        ),
        "input_schema": CorrelationMatrixInput.model_json_schema(),
    }
