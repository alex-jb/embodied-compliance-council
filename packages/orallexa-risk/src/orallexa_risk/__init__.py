"""orallexa-risk — Institutional risk primitives for the Orallexa 5-voice council.

Seven typed tool calls each voice can invoke before deliberating, lifting
their reasoning from free-form LLM judgment to institutionally grounded
risk math. Each function has:

- A strict Pydantic input schema
- A strict Pydantic output schema
- An `anthropic_tool_schema()` classmethod returning the JSON schema in
  Anthropic Tool-Use format

Phase A (this scaffold): function signatures, types, and tool schemas.
Phase B (after Loredana shares her Python implementations from the
120-page Aura Alexa BR document): real implementations replace
NotImplementedError stubs.

Why this matters
----------------
The Orallexa-vs-JPMorgan pressure-test report scored Orallexa 5/10 on
Risk Controls and called out Portfolio VaR, Expected Shortfall, factor
exposures, beta decomposition, concentration limits, and sector exposure
as missing. This package closes that gap and lifts the expected
pressure-test score to 8-9/10 — the second novel contribution of the
Embodied Compliance Council project.

Lineage
-------
Risk math originally drafted in Loredana Carmen Levitchi's 120-page
"Aura Alexa Enhancement with Risk Analytics" BR document (2026).
Refactored into typed Anthropic tool calls here.
"""
from __future__ import annotations

from orallexa_risk.var import var
from orallexa_risk.expected_shortfall import expected_shortfall
from orallexa_risk.factor_exposures import factor_exposures
from orallexa_risk.beta_decomposition import beta_decomposition
from orallexa_risk.concentration import concentration_limits
from orallexa_risk.sector_exposure import sector_exposure
from orallexa_risk.correlation import correlation_matrix

__version__ = "0.1.0a1"

__all__ = [
    "var",
    "expected_shortfall",
    "factor_exposures",
    "beta_decomposition",
    "concentration_limits",
    "sector_exposure",
    "correlation_matrix",
]


def all_anthropic_tools() -> list[dict]:
    """Return the Anthropic Tool-Use JSON schemas for all 7 risk primitives.

    Each voice in the council can be initialized with `tools=all_anthropic_tools()`
    so it can call any risk primitive during deliberation.
    """
    from orallexa_risk.var import var_tool_schema
    from orallexa_risk.expected_shortfall import expected_shortfall_tool_schema
    from orallexa_risk.factor_exposures import factor_exposures_tool_schema
    from orallexa_risk.beta_decomposition import beta_decomposition_tool_schema
    from orallexa_risk.concentration import concentration_limits_tool_schema
    from orallexa_risk.sector_exposure import sector_exposure_tool_schema
    from orallexa_risk.correlation import correlation_matrix_tool_schema

    return [
        var_tool_schema(),
        expected_shortfall_tool_schema(),
        factor_exposures_tool_schema(),
        beta_decomposition_tool_schema(),
        concentration_limits_tool_schema(),
        sector_exposure_tool_schema(),
        correlation_matrix_tool_schema(),
    ]
