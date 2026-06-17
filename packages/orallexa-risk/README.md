# orallexa-risk

Institutional risk primitives for the Orallexa 5-voice council, exposed as typed Anthropic tool calls.

## Status

**Phase A (this commit)** — Function signatures, Pydantic input/output schemas, Anthropic Tool-Use JSON schemas. All seven functions raise `NotImplementedError`.

**Phase B (planned)** — Real implementations lifted from Loredana Carmen Levitchi's 120-page "Aura Alexa Enhancement with Risk Analytics" BR document (2026). Each section in her BR document maps to one risk function here:

| Function | BR doc section | Phase B est. |
|---|---|---|
| `var` | Section 4.2 — Value-at-Risk Calculation | 2-3 days |
| `expected_shortfall` | Section 4.3 — Expected Shortfall | 1-2 days |
| `factor_exposures` | Section 5.1 — Multi-factor regression | 2-3 days |
| `beta_decomposition` | Section 5.2 — Beta decomposition | 1-2 days |
| `concentration_limits` | Section 6.1 — Portfolio concentration | 1 day |
| `sector_exposure` | Section 6.2 — Sector allocation | 1 day |
| `correlation_matrix` | Section 7.1 — Correlation analysis | 1-2 days |

Total Phase B estimate: **9-14 days**.

## Why this exists

The Orallexa-vs-JPMorgan pressure-test report (June 2026) scored Orallexa **5/10 on Risk Controls** and called out the seven primitives above as missing. This package closes that gap. After Phase B, the expected pressure-test score rises to **8-9/10** — the second novel contribution of the [Embodied Compliance Council](../../README.md) project.

## Usage (after Phase B)

```python
from orallexa_risk import all_anthropic_tools, var, VarInput

# Get all 7 tool schemas to initialize a council voice
tools = all_anthropic_tools()  # list of 7 Anthropic Tool-Use schemas

# Or call a primitive directly
result = var(VarInput(
    portfolio_returns=[-0.012, 0.008, -0.005, ...],
    confidence_level=0.95,
    method="historical",
    horizon_days=1,
))
print(result.var_value, result.interpretation)
```

## Integration with the council

Each of the five voice processes is initialized with `tools=all_anthropic_tools()`. During deliberation, Claude Opus 4.7 decides which risk primitives to call given the trade or loan under review, grounds its reasoning in the returned numbers, then emits a verdict (`approve` / `block` / `escalate`).

This lifts each voice from free-form LLM judgment to institutionally grounded reasoning — a defensible improvement when the verdict has to survive regulatory scrutiny (EU AI Act Article 14, SEC 15c3-5, Fair Lending Act).

## Authorship

- **Loredana Carmen Levitchi** — Original risk math, Aura Alexa BR document (120 pages, 2026)
- **Alex Xiaoyu Ji** — Type contracts, tool-schema design, Orallexa integration

Co-authorship on the ICAIF 2027 paper is implicit; both authors are credited in the proposal and conference paper.

## License

MIT.
