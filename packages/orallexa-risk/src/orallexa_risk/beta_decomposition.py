"""Beta decomposition — single-stock beta into market + sector + idiosyncratic.

Splits each holding's beta into the portion explained by the broad market,
the portion explained by sector co-movement, and the residual idiosyncratic
component. Useful when the same beta hides very different concentration risks.
"""
from __future__ import annotations

import numpy as np
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
    """Decompose each ticker's beta into market + sector + idiosyncratic via sequential OLS.

    PHASE A — v0 implementation. Step 1: regress ticker on market; step 2:
    regress residual on sector. The two betas + remaining residual variance
    decompose the asset. Equal-weight aggregation across tickers gives a
    portfolio-level summary. Phase B will replace with Loredana's BR doc
    Section 5.2 (joint estimation with shrinkage + market+sector decomposition).
    """
    market = np.asarray(inp.market_returns, dtype=float)
    market_var = float(np.var(market, ddof=1))
    if market_var <= 0:
        raise ValueError("market_returns has zero variance")

    decomps: list[BetaDecomposition] = []
    for ticker, returns in inp.ticker_returns.items():
        sector_name = inp.sector_map.get(ticker)
        if sector_name is None:
            raise ValueError(f"sector_map missing entry for ticker {ticker}")
        sector_series = inp.sector_returns.get(sector_name)
        if sector_series is None:
            raise ValueError(f"sector_returns missing entry for sector {sector_name}")
        asset = np.asarray(returns, dtype=float)
        sector = np.asarray(sector_series, dtype=float)
        if not (len(asset) == len(market) == len(sector)):
            raise ValueError(f"length mismatch for ticker {ticker}")
        cov_am = float(np.cov(asset, market, ddof=1)[0, 1])
        total_beta = cov_am / market_var
        market_resid = asset - total_beta * market
        sector_var = float(np.var(sector, ddof=1))
        if sector_var <= 0:
            sector_beta = 0.0
            idio_resid = market_resid
        else:
            cov_rs = float(np.cov(market_resid, sector, ddof=1)[0, 1])
            sector_beta = cov_rs / sector_var
            idio_resid = market_resid - sector_beta * sector
        idio_variance = float(np.var(idio_resid, ddof=1))
        decomps.append(
            BetaDecomposition(
                ticker=ticker,
                sector=sector_name,
                total_beta=total_beta,
                market_beta=total_beta,
                sector_beta=sector_beta,
                idiosyncratic_variance=idio_variance,
            )
        )

    n_tickers = len(decomps)
    if n_tickers == 0:
        raise ValueError("no tickers provided")
    portfolio_total_beta = float(np.mean([d.total_beta for d in decomps]))
    portfolio_market_beta = float(np.mean([d.market_beta for d in decomps]))
    sector_betas = np.array([d.sector_beta for d in decomps])
    total_betas = np.array([d.total_beta for d in decomps])
    denom = float(np.sum(np.abs(sector_betas) + np.abs(total_betas)))
    portfolio_sector_concentration_ratio = (
        float(np.sum(np.abs(sector_betas)) / denom) if denom > 0 else 0.0
    )
    interpretation = (
        f"Portfolio market beta = {portfolio_market_beta:+.2f}, sector concentration ratio "
        f"= {portfolio_sector_concentration_ratio:.2f} (>0.5 means co-movement is sector-driven). "
        f"Decomposed {n_tickers} tickers over {len(market)} obs."
    )
    return BetaDecompositionOutput(
        decompositions=decomps,
        portfolio_total_beta=portfolio_total_beta,
        portfolio_market_beta=portfolio_market_beta,
        portfolio_sector_concentration_ratio=portfolio_sector_concentration_ratio,
        interpretation=interpretation,
    )


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
