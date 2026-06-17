"""Factor exposures — Fama-French 5-factor + custom factor regressions.

Decomposes portfolio returns into systematic factor loadings:
Mkt-Rf, SMB, HML, RMW, CMA, plus optional momentum (UMD).

Used by Macro Contrarian voice + Portfolio Manager voice to find
hidden systematic tilts that aggregate single-name reasoning would miss.
"""
from __future__ import annotations

from pydantic import BaseModel, Field


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
    """Run multi-factor regression and return factor loadings.

    PHASE A — STUB. Phase B: OLS implementation (statsmodels) from Loredana's BR doc.
    """
    raise NotImplementedError("Phase A scaffold; Phase B from Loredana's BR doc Section 5.1.")


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
