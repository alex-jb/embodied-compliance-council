# Embodied Compliance Council

> **English** · [中文](./README.zh-CN.md)

[![CI](https://github.com/alex-jb/embodied-compliance-council/actions/workflows/ci.yml/badge.svg)](https://github.com/alex-jb/embodied-compliance-council/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE) [![Tests](https://img.shields.io/badge/tests-41%2F41%20passing-brightgreen)](./packages) [![Release](https://img.shields.io/badge/release-v0.1.0-blue)](https://github.com/alex-jb/embodied-compliance-council/releases/tag/v0.1.0)

**Multi-voice deliberation + calibration discipline + spatial audit for regulated AI workflows.**

A research monorepo producing the open-source AI infrastructure for regulated decision domains — trading book changes, loan origination, wealth-advisory recommendations, and other workflows where confident-but-wrong agents leave no audit trail. Each decision is debated by five disagreement-by-design AI voices, adjudicated, Brier-audited over time, and surfaced through a spatial extended-reality scene with a tamper-evident hash-chain audit trail.

<table>
<tr>
<td align="center" width="50%"><strong>Trading vertical</strong><br/><sub>Macro · Sector · Portfolio · Growth-VC · Activist Short</sub><br/><img src="docs/screenshots/trading-quest-hero.png" width="100%" alt="trading-quest WebXR scene preview" /></td>
<td align="center" width="50%"><strong>Banking vertical</strong><br/><sub>Credit Fundamentals · Risk Officer · Fair Lending · Customer Advocate · Macro Contrarian</sub><br/><img src="docs/screenshots/banking-quest-hero.png" width="100%" alt="banking-quest WebXR scene preview" /></td>
</tr>
</table>

**Status:** active research codebase. Capstone project (trading vertical) advised by Prof. Michael Yang. Banking vertical with Dr. NGO and external risk-math collaborator Loredana C. Levitchi. Submission targets: ICAIF 2027 (trading), IEEE journal (banking).

**Adversarial robustness:** see [`docs/threat-model.md`](docs/threat-model.md) for the per-attack catalog + mitigation status. First entry (MosaicLeaks multi-turn information leak, ServiceNow+HuggingFace 2026-06) filed 2026-06-21 via issue [#1](https://github.com/alex-jb/embodied-compliance-council/issues/1).

**License:** MIT.

---

## Why this exists

Production AI agents in regulated industries fail not because they are slow, but because they are *confident-but-wrong*, leave no audit trail, and have no per-voice calibration history. Single-voice agentic systems propagate the foundation model's confidence without measuring whether the model has been *right* on this kind of decision before.

The Embodied Compliance Council addresses three gaps directly:

1. **Epistemic diversity over single-model confidence.** Five voices restricted to *distinct* evidence subsets (factor exposures, sector dynamics, fair-lending statistics, etc.) so the council does not collapse to the foundation model's default opinion.
2. **Calibration as the audit primitive.** Every voice's verdict is logged with confidence and Brier-scored against outcomes. Voices whose dissents proved load-bearing receive higher weight; voices whose certainty was noise receive lower weight.
3. **Spatial, tamper-evident audit.** A WebXR scene renders the council as physical podiums around the user, and every adjudication chains forward via WebCrypto SHA-256 — meeting both EU AI Act Article 14 (human oversight) and U.S. ECOA / Reg B (auditable decisioning) on the same primitive.

---

## Architecture

```
embodied-compliance-council/
├── packages/
│   ├── council-voices/              # 10 system-prompt voices (Markdown + YAML)
│   │   ├── trading/                 #   5 trading voices (capstone vertical)
│   │   │   ├── 01-macro.md
│   │   │   ├── 02-sector.md
│   │   │   ├── 03-portfolio.md
│   │   │   ├── 04-growth-vc.md
│   │   │   └── 05-activist-short.md
│   │   └── banking/                 #   5 banking voices (Dr. NGO vertical)
│   │       ├── 01-credit-fundamentals.md
│   │       ├── 02-risk-officer.md
│   │       ├── 03-fair-lending.md
│   │       ├── 04-customer-advocate.md
│   │       └── 05-macro-contrarian.md
│   ├── orallexa-risk/               # 7 risk primitives (Python, Phase A scaffold)
│   ├── spatial-gating-protocol/     # Shared TypeScript types + WebCrypto hash chain
│   └── hand-gestures/               # MediaPipe Hands gesture classifier (Phase 2.5)
├── apps/
│   ├── trading-quest/               # WebXR scene for the trading vertical
│   └── banking-quest/               # WebXR scene for the banking vertical
├── docs/
│   ├── capstone-thesis/             # Capstone (Prof. Yang) amendments + materials
│   ├── dr-ngo-final/                # Banking proposal v2 + Lora handoff
│   ├── katz-rfp-2026/               # Katz Faculty Research Initiative submission packet
│   ├── ibm-bob-spike/               # IBM AI Builders Challenge weekend spike guide
│   ├── checkpoints/                 # Cross-session recovery snapshots
│   └── startup/                     # Bottom-up TAM + disruption framework (academic defense)
└── README.md
```

---

## The ten voices

Each voice has YAML frontmatter (`voice_id`, `allowed_tools`, `verdict_options`, `weight_in_aggregate_default`) plus a system prompt with a strict-JSON output schema. Tool restrictions are what give the council epistemic diversity — if everyone could see everything, they would converge to the foundation model's default opinion.

### Trading vertical (capstone, Prof. Yang)

| Voice | Lens | Allowed tools |
|---|---|---|
| Macro Analyst | Factor regimes + correlation history | `factor_exposures`, `correlation_matrix`, `sector_exposure` |
| Sector Specialist | GICS sub-industry catalysts + co-movement | `beta_decomposition`, `sector_exposure` |
| Portfolio Manager | NAV concentration + VaR step changes | `concentration`, `var`, `correlation_matrix` |
| Growth-VC Contrarian | 3-year moat + value/growth tilt drift | `factor_exposures`, `beta_decomposition` |
| Activist Short | Crowded-trade detection + asymmetric break | `concentration`, `sector_exposure` |

### Banking vertical (Dr. NGO + Loredana Levitchi)

| Voice | Lens | Allowed tools |
|---|---|---|
| Credit Fundamentals Analyst | Buffett-style through-cycle ability to repay | `cash_flow_coverage`, `debt_service_history`, `through_cycle_earnings` |
| Risk Officer | PD × LGD × EAD + stress scenarios | `default_probability`, `expected_loss`, `stress_scenario` |
| Fair Lending Reviewer | ECOA / Reg B disparate-impact + proxy detection | `disparate_impact_test`, `protected_class_proxy_detection`, `decisioning_variable_audit` |
| Customer Advocate | Adverse-action specificity + plain-language disclosure | `adverse_action_codes`, `disclosure_quality_check`, `plain_language_score` |
| Macro Contrarian | Through-cycle macro + sector cycle phase | `macro_regime_classifier`, `sector_cycle_phase`, `recession_proxies` |

---

## Quick start

### Prerequisites

- Node.js ≥ 20
- npm workspaces (bundled with Node)
- A modern desktop browser (for the WebXR scenes in fallback mode) or a Meta Quest 3S device on the same network

### Install

```bash
git clone https://github.com/alex-jb/embodied-compliance-council.git
cd embodied-compliance-council
npm install
```

### Run the trading vertical

```bash
npm run dev:trading
```

Open `http://localhost:5173`. Drag to look around, press **SPACE** to fire a synthetic council decision, or click **Enable hand tracking** to drive verdicts with thumbs-up (approve), fist (block), or thumb-index pinch (escalate) via MediaPipe Hands.

### Run the banking vertical

```bash
npm run dev:banking
```

Open `http://localhost:5174`. Banking maps the gestures to approve / decline / escalate.

### Run the tests

```bash
npm run test            # all workspaces
```

Current coverage:
- `packages/spatial-gating-protocol/`: 4/4 hash-chain tests (genesis, valid chain, payload tamper, link tamper).
- `packages/hand-gestures/`: 6/6 gesture classifier tests (thumbs-up, fist, pinch, open palm, empty, partial).

---

## Phase status

| Phase | What | Status |
|---|---|---|
| Phase 1 | Council-voice system prompts + tool restrictions | ✅ shipped 2026-06-16 |
| Phase 1 calibration | Brier + ECE + temperature + Reflexion + Kelly + Sakana DG | ✅ shipped in `capstone-orallexa-calibration` (sibling repo, 64 tests green) |
| Phase 2 | WebXR scenes + spatial gating protocol + hash-chain audit | ✅ shipped 2026-06-17 |
| Phase 2.5 | MediaPipe Hands gesture input (desktop webcam + Quest 3S `XRHand`) | ✅ webcam path shipped 2026-06-17; Quest path next |
| Phase 3 | Wire synthetic decisions to real Anthropic calls per voice | next |
| Phase B | Banking risk math integrated from Loredana Levitchi's research base | pending Loredana code share |
| Phase 4 | EU AI Act Article 14 + ECOA / Reg B compliance evaluation studies | Year 2 |

---

## Academic context

This codebase backs four academic deliverables:

1. **Capstone thesis** (COM 6000-CP1, Prof. Michael Yang) — *"Calibration Discipline as the Audit Primitive for Spatial Pre-Trade Compliance in Live Trading."* Trading vertical, defended August 2026.
2. **Dr. NGO Final Project** — banking-side embodied compliance for loan origination + wealth advisory, ECOA / Reg B framing.
3. **ICAIF 2027 paper** — calibration discipline + multi-voice methodology for the trading vertical. Submission deadline ~2026-09-15.
4. **IEEE banking paper** (joint with Loredana C. Levitchi) — disparate-impact detection via multi-voice fair-lending review. Target journal: IEEE TIFS or IEEE Computer.

Strategic and TAM analysis underlying the academic defense lives in `docs/startup/` — these documents are research armor for the defense, not a startup execution plan.

---

## Related open-source

- [`council-diff`](https://github.com/alex-jb/council-diff) — TypeScript / npm package implementing the 5-voice deliberation pattern as a standalone library (consumed by Slack and CLI surfaces).
- [`capstone-orallexa-calibration`](https://github.com/alex-jb/capstone-orallexa-calibration) — Python calibration toolkit (ECE, temperature scaling, Reflexion, Kelly sizing, Sakana DG self-modification).
- [`memory-wall-tracker`](https://github.com/alex-jb/memory-wall-tracker) — Druckenmiller AI inference basket with Brier-audited daily research.

---

## Contributors

- **Alex Xiaoyu Ji** — primary developer (Katz School of Science and Health, Yeshiva University, Graduate Researcher)
- **Prof. Michael Yang** — capstone advisor, trading vertical
- **Dr. NGO** — banking vertical co-PI
- **Loredana C. Levitchi** — banking risk-math collaborator, IEEE paper co-author

Pull requests welcome but please open an issue first to discuss scope — this is an active research codebase, not a stable library.

---

## License

MIT. See [`LICENSE`](./LICENSE).
