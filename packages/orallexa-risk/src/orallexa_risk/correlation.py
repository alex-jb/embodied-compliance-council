"""Correlation matrix — Pearson + rolling + EWMA correlations between portfolio holdings.

Tracks how holding-pair correlations evolve through time. Critical for
multi-agent reasoning because static correlation hides regime-shift risk
(e.g. 2020 March everything correlated to 1.0).
"""
from __future__ import annotations

from typing import Literal

import numpy as np
from pydantic import BaseModel, Field
from scipy import stats


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


def _ewma_corr(matrix: np.ndarray, lam: float) -> np.ndarray:
    n, k = matrix.shape
    weights = (1 - lam) * lam ** np.arange(n - 1, -1, -1)
    weights = weights / weights.sum()
    centered = matrix - matrix.mean(axis=0)
    cov = (centered * weights[:, None]).T @ centered
    std = np.sqrt(np.diag(cov))
    denom = np.outer(std, std)
    denom[denom == 0] = 1.0
    return cov / denom


def correlation_matrix(inp: CorrelationMatrixInput) -> CorrelationMatrixOutput:
    """Compute portfolio correlation matrix and derived diversification metrics.

    PHASE A — v0 textbook implementation. Pearson via np.corrcoef, Spearman via
    scipy.stats.spearmanr, EWMA via RiskMetrics-style exponential weighting.
    Phase B will replace with Loredana's BR doc Section 7.1 (regime-aware
    DCC-GARCH, rolling Z-scored shifts).
    """
    tickers = list(inp.ticker_returns.keys())
    if len(tickers) < 2:
        raise ValueError("need at least 2 tickers")
    series = [np.asarray(inp.ticker_returns[t], dtype=float) for t in tickers]
    n_obs = min(len(s) for s in series)
    if n_obs < 30:
        raise ValueError("need at least 30 aligned observations across all tickers")
    matrix = np.column_stack([s[-n_obs:] for s in series])

    if inp.method == "pearson":
        corr = np.corrcoef(matrix, rowvar=False)
    elif inp.method == "spearman":
        result = stats.spearmanr(matrix, axis=0)
        corr = np.atleast_2d(result.correlation if hasattr(result, "correlation") else result.statistic)
    else:
        corr = _ewma_corr(matrix, inp.ewma_lambda)

    historical_max: dict[tuple[str, str], float] = {}
    if inp.rolling_window is not None and inp.rolling_window < n_obs:
        win = inp.rolling_window
        for start in range(0, n_obs - win + 1):
            window = matrix[start : start + win]
            window_corr = np.corrcoef(window, rowvar=False)
            for i in range(len(tickers)):
                for j in range(i + 1, len(tickers)):
                    key = (tickers[i], tickers[j])
                    c = float(window_corr[i, j])
                    if abs(c) > abs(historical_max.get(key, 0.0)):
                        historical_max[key] = c

    pairs: list[CorrelationPair] = []
    for i in range(len(tickers)):
        for j in range(i + 1, len(tickers)):
            c = float(corr[i, j])
            p_value: float | None = None
            if inp.method == "pearson":
                p_value = float(stats.pearsonr(matrix[:, i], matrix[:, j]).pvalue)
            pairs.append(
                CorrelationPair(
                    ticker_a=tickers[i],
                    ticker_b=tickers[j],
                    correlation=c,
                    p_value=p_value,
                    historical_max=historical_max.get((tickers[i], tickers[j])),
                )
            )

    off_diag = np.array([p.correlation for p in pairs])
    avg_corr = float(off_diag.mean()) if off_diag.size else 0.0
    max_pair = max(pairs, key=lambda p: abs(p.correlation))

    equal_w = np.full(len(tickers), 1.0 / len(tickers))
    single_vols = matrix.std(axis=0, ddof=1)
    weighted_vol_sum = float((equal_w * single_vols).sum())
    portfolio_var = float(equal_w @ (corr * np.outer(single_vols, single_vols)) @ equal_w)
    portfolio_vol = float(np.sqrt(max(portfolio_var, 0.0)))
    diversification_ratio = portfolio_vol / weighted_vol_sum if weighted_vol_sum > 0 else 1.0

    interpretation = (
        f"avg corr={avg_corr:.2f}, max pair = {max_pair.ticker_a}/{max_pair.ticker_b} at "
        f"{max_pair.correlation:.2f}. Diversification ratio = {diversification_ratio:.2f} "
        f"(<1 = diversification benefit). Method={inp.method}, n={n_obs} obs."
    )
    return CorrelationMatrixOutput(
        pairs=pairs,
        average_correlation=avg_corr,
        max_correlation=max_pair,
        diversification_ratio=diversification_ratio,
        interpretation=interpretation,
    )


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
