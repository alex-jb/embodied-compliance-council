"""Factor exposures — Fama-French 5-factor + custom factor regressions.

Decomposes portfolio returns into systematic factor loadings:
Mkt-Rf, SMB, HML, RMW, CMA, plus optional momentum (UMD).

Used by Macro Contrarian voice + Portfolio Manager voice to find
hidden systematic tilts that aggregate single-name reasoning would miss.
"""
from __future__ import annotations

import numpy as np
from pydantic import BaseModel, Field
from scipy import stats


class FactorExposuresInput(BaseModel):
    portfolio_returns: list[float] = Field(..., min_length=60)
    factor_returns: dict[str, list[float]] = Field(
        ...,
        description=(
            "Mapping of factor name to return series. Default Fama-French 5: "
            "'Mkt-Rf', 'SMB', 'HML', 'RMW', 'CMA'. Optional 'UMD' for momentum."
        ),
    )
    rf_rate: list[float] | None = Field(
        None,
        description="Risk-free rate series. If None, assumed 0 (use excess returns).",
    )


class FactorLoading(BaseModel):
    factor: str
    beta: float
    t_stat: float
    p_value: float


class FactorExposuresOutput(BaseModel):
    loadings: list[FactorLoading]
    alpha: float = Field(..., description="Jensen's alpha (unexplained excess return).")
    alpha_t_stat: float
    r_squared: float
    interpretation: str


def factor_exposures(inp: FactorExposuresInput) -> FactorExposuresOutput:
    """Run multi-factor OLS regression with t-stats and Jensen's alpha.

    PHASE A — v0 textbook OLS with closed-form standard errors and t-stats.
    Phase B will replace with Loredana's BR doc Section 5.1 (Newey-West HAC
    standard errors, robust regression, time-varying factor loadings).
    """
    y = np.asarray(inp.portfolio_returns, dtype=float)
    if inp.rf_rate is not None:
        y = y - np.asarray(inp.rf_rate, dtype=float)
    factor_names = list(inp.factor_returns.keys())
    factor_cols = [np.asarray(inp.factor_returns[name], dtype=float) for name in factor_names]
    X = np.column_stack(factor_cols)
    if X.shape[0] != y.shape[0]:
        raise ValueError("factor return series must match portfolio length")
    X_const = np.column_stack([np.ones(len(y)), X])
    coeffs, _, _, _ = np.linalg.lstsq(X_const, y, rcond=None)
    y_hat = X_const @ coeffs
    residuals = y - y_hat
    n, k = X_const.shape
    df = n - k
    residual_var = float(np.sum(residuals**2) / df) if df > 0 else 0.0
    xtx_inv = np.linalg.pinv(X_const.T @ X_const)
    cov_betas = residual_var * xtx_inv
    se = np.sqrt(np.maximum(np.diag(cov_betas), 0.0))
    t_stats = np.where(se > 0, coeffs / se, 0.0)
    p_values = 2 * (1 - stats.t.cdf(np.abs(t_stats), df=max(df, 1)))
    ss_res = float(np.sum(residuals**2))
    ss_tot = float(np.sum((y - y.mean()) ** 2))
    r_squared = 1.0 - ss_res / ss_tot if ss_tot > 0 else 0.0

    loadings = [
        FactorLoading(
            factor=name,
            beta=float(coeffs[i + 1]),
            t_stat=float(t_stats[i + 1]),
            p_value=float(p_values[i + 1]),
        )
        for i, name in enumerate(factor_names)
    ]
    largest = max(loadings, key=lambda fl: abs(fl.beta))
    interpretation = (
        f"R^2={r_squared:.2f} over {len(y)} obs and {len(factor_names)} factors. "
        f"Largest exposure: {largest.factor} beta={largest.beta:+.2f} "
        f"(t={largest.t_stat:+.2f}, p={largest.p_value:.3f}). "
        f"Jensen's alpha={float(coeffs[0])*100:.3f}% per period (t={float(t_stats[0]):+.2f})."
    )
    return FactorExposuresOutput(
        loadings=loadings,
        alpha=float(coeffs[0]),
        alpha_t_stat=float(t_stats[0]),
        r_squared=r_squared,
        interpretation=interpretation,
    )


def factor_exposures_tool_schema() -> dict:
    return {
        "name": "factor_exposures",
        "description": (
            "Decompose portfolio returns into Fama-French 5-factor loadings (Mkt-Rf, SMB, "
            "HML, RMW, CMA). Use when reasoning about systematic tilts, hidden market beta, "
            "or whether returns come from skill (alpha) vs factor exposure."
        ),
        "input_schema": FactorExposuresInput.model_json_schema(),
    }
