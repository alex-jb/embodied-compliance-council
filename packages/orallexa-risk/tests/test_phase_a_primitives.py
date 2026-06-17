"""Phase A v0 primitives — smoke tests against numpy-generated synthetic returns.

These tests verify orderings and rough magnitudes, not BR-doc-grade accuracy.
Phase B replaces both the implementations and these tests with Loredana's
reference test suite (when she shares).
"""
from __future__ import annotations

import math

import numpy as np
import pytest

from orallexa_risk.beta_decomposition import (
    BetaDecompositionInput,
    beta_decomposition,
)
from orallexa_risk.concentration import (
    ConcentrationLimitsInput,
    concentration_limits,
)
from orallexa_risk.correlation import (
    CorrelationMatrixInput,
    correlation_matrix,
)
from orallexa_risk.expected_shortfall import (
    ExpectedShortfallInput,
    expected_shortfall,
)
from orallexa_risk.factor_exposures import (
    FactorExposuresInput,
    factor_exposures,
)
from orallexa_risk.sector_exposure import (
    SectorExposureInput,
    sector_exposure,
)
from orallexa_risk.var import VarInput, var


@pytest.fixture
def rng() -> np.random.Generator:
    return np.random.default_rng(seed=42)


@pytest.fixture
def returns(rng) -> list[float]:
    return rng.normal(0.0005, 0.012, 250).tolist()


def test_var_historical_positive_loss(returns):
    out = var(
        VarInput(portfolio_returns=returns, confidence_level=0.95, method="historical")
    )
    assert out.var_value > 0
    assert 0.0 < out.var_value < 0.10  # within 10% daily for normal-ish returns
    assert "Companion VaR" not in out.interpretation


def test_var_parametric_close_to_historical(returns):
    hist = var(VarInput(portfolio_returns=returns, method="historical"))
    para = var(VarInput(portfolio_returns=returns, method="parametric"))
    assert math.isclose(hist.var_value, para.var_value, abs_tol=0.01)


def test_var_horizon_scales_sqrt(returns):
    one = var(VarInput(portfolio_returns=returns, horizon_days=1))
    ten = var(VarInput(portfolio_returns=returns, horizon_days=10))
    assert math.isclose(ten.var_value, one.var_value * math.sqrt(10), rel_tol=0.02)


def test_es_greater_than_var(returns):
    out = expected_shortfall(
        ExpectedShortfallInput(portfolio_returns=returns, confidence_level=0.95)
    )
    assert out.es_value >= out.var_value > 0


def test_es_parametric_finite(returns):
    out = expected_shortfall(
        ExpectedShortfallInput(
            portfolio_returns=returns, confidence_level=0.975, method="parametric"
        )
    )
    assert math.isfinite(out.es_value)
    assert out.tail_observations == 0  # parametric has no empirical tail


def test_concentration_detects_single_name_breach():
    out = concentration_limits(
        ConcentrationLimitsInput(
            weights={"A": 0.30, "B": 0.20, "C": 0.20, "D": 0.15, "E": 0.15},
            single_name_limit=0.05,
        )
    )
    assert out.hhi > 0.20
    assert any("single-name cap" in v for v in out.violations)


def test_concentration_even_weights_pass():
    weights = {chr(c): 1.0 / 26 for c in range(ord("A"), ord("A") + 26)}
    out = concentration_limits(
        ConcentrationLimitsInput(weights=weights, single_name_limit=0.10, top_n_limit=0.50)
    )
    assert out.hhi < 0.10
    assert out.violations == []


def test_correlation_pearson_finite(rng):
    common = rng.normal(0, 1, 60)
    out = correlation_matrix(
        CorrelationMatrixInput(
            ticker_returns={
                "AAA": (common + rng.normal(0, 0.5, 60)).tolist(),
                "BBB": (common + rng.normal(0, 0.5, 60)).tolist(),
                "CCC": rng.normal(0, 1, 60).tolist(),
            }
        )
    )
    assert len(out.pairs) == 3
    assert math.isfinite(out.average_correlation)
    assert -1.0 <= out.max_correlation.correlation <= 1.0
    assert out.diversification_ratio > 0


def test_factor_exposures_recovers_known_betas(rng):
    n = 120
    f_mkt = rng.normal(0, 0.012, n)
    f_smb = rng.normal(0, 0.006, n)
    portfolio = 0.8 * f_mkt + 0.3 * f_smb + rng.normal(0, 0.005, n)
    out = factor_exposures(
        FactorExposuresInput(
            portfolio_returns=portfolio.tolist(),
            factor_returns={"Mkt-Rf": f_mkt.tolist(), "SMB": f_smb.tolist()},
        )
    )
    mkt = next(l for l in out.loadings if l.factor == "Mkt-Rf")
    smb = next(l for l in out.loadings if l.factor == "SMB")
    assert math.isclose(mkt.beta, 0.8, abs_tol=0.15)
    assert math.isclose(smb.beta, 0.3, abs_tol=0.20)
    assert out.r_squared > 0.5


def test_beta_decomposition_runs(rng):
    n = 120
    market = rng.normal(0, 0.012, n)
    tech = market + rng.normal(0, 0.005, n)
    energy = market + rng.normal(0, 0.008, n)
    tickers = {
        "AAA": (1.1 * tech + rng.normal(0, 0.003, n)).tolist(),
        "BBB": (0.9 * tech + rng.normal(0, 0.004, n)).tolist(),
        "CCC": (1.2 * energy + rng.normal(0, 0.006, n)).tolist(),
    }
    out = beta_decomposition(
        BetaDecompositionInput(
            ticker_returns=tickers,
            market_returns=market.tolist(),
            sector_map={"AAA": "tech", "BBB": "tech", "CCC": "energy"},
            sector_returns={"tech": tech.tolist(), "energy": energy.tolist()},
        )
    )
    assert len(out.decompositions) == 3
    assert 0.0 <= out.portfolio_sector_concentration_ratio <= 1.0


def test_sector_exposure_flags_overweight():
    out = sector_exposure(
        SectorExposureInput(
            weights={"A": 0.4, "B": 0.3, "C": 0.2, "D": 0.1},
            sector_map={"A": "tech", "B": "tech", "C": "energy", "D": "financials"},
            benchmark_sector_weights={"tech": 0.25, "energy": 0.10, "financials": 0.15},
            deviation_threshold=0.05,
        )
    )
    assert out.top_overweight_sector == "tech"
    tech_row = next(r for r in out.exposures if r.sector == "tech")
    assert tech_row.flagged
    assert tech_row.active_weight is not None and tech_row.active_weight > 0
