# Embodied Compliance Council

A multi-agent spatial AI workspace for regulated finance — running on Meta Quest 3S WebXR + Orallexa 5-voice deliberation + Brier audit + cryptographic audit trail.

> **Embodied compliance** is the proposal that *spatial physical gating* of regulated finance decisions — combined with multi-agent LLM deliberation and tamper-evident audit logs — produces a compliance primitive that 2D dashboards cannot match. The framework is tested across two regulated verticals: **bank loan origination + wealth advisory** (Banking app) and **institutional hedge-fund pre-trade approvals** (Trading app).

License: MIT.

---

## Academic Honesty Declaration

This codebase intentionally produces **four distinct academic and conference deliverables** for **three classes plus one conference**, sharing architectural primitives but each with its own framing, scope, and evaluation depth:

| Deliverable | Course / Venue | Location | Framing |
|---|---|---|---|
| 1-page Final Project Proposal | Dr. Harry NGO — AI for Extended Reality | [`docs/dr-ngo-final/`](./docs/dr-ngo-final/) | Banking (Loan + Wealth Advisory). Joint work with Loredana C. Levitchi. |
| 5-page Server-Client Multi-Agent Prototype report | Dr. Ashikur Nobel | [`docs/dr-nobel-companion/`](./docs/dr-nobel-companion/) | Server-client multi-agent communication protocol; client = Quest WebXR podium, server = 5 Python voice processes. |
| Capstone Thesis (40–80 pages) | Prof. Michael Yang — COM 6000-CP1 | [`docs/capstone-thesis/`](./docs/capstone-thesis/) | Solo focus: **Trading vertical — Pre-Trade Compliance for institutional hedge funds**. |
| 8-page Conference Paper | ACM ICAIF 2027 (deadline ~2026-09-15) | [`docs/papers/icaif-2027/`](./docs/papers/icaif-2027/) | Unified "Embodied Compliance" framework, tested in both banking and trading verticals. |

Each deliverable cites its sibling per academic honesty norms. Capstone thesis and Dr. NGO proposal share architectural primitives (the `packages/` directory) but apply them to **different finance verticals with different regulatory hooks**:

- Banking app → Fair Lending Act, ECOA, EU AI Act Annex III (credit-scoring as "high-risk")
- Trading app → SEC Rule 15c3-5 (Market Access Rule), EU AI Act Article 14 (human oversight)

The capstone advisor (Michael Yang) and Dr. NGO have been informed of this multi-deliverable strategy.

---

## Architecture

```
embodied-compliance-council/
├── apps/
│   ├── banking-quest/                  # Dr. NGO Final Project — Loan + Wealth modes
│   └── trading-quest/                  # Capstone — Institutional pre-trade approval
│
├── packages/
│   ├── orallexa-risk/                  # Phase A: 7 institutional risk primitives
│   │                                   # (VaR, ES, factor exposures, beta, concentration,
│   │                                   #  sector exposure, correlation) as typed tool calls
│   │
│   ├── council-voices/                 # 5-voice deliberation system prompts + tool schemas
│   │   ├── banking/                    # Credit fundamentals / Risk officer / Fair-lending /
│   │   │                               # Customer advocate / Macro contrarian
│   │   └── trading/                    # Macro / Sector / Portfolio / Growth-VC / Activist short
│   │
│   └── spatial-gating-protocol/        # Cryptographic hash chain + SEC/FINRA/OCC/CFPB/
│                                       # EU AI Act audit export formats
│
├── docs/
│   ├── dr-ngo-final/                   # Loredana + Alex banking proposal (PDF + MD)
│   ├── dr-nobel-companion/             # Server-client multi-agent prototype report
│   ├── capstone-thesis/                # Michael Yang capstone (in progress)
│   ├── papers/icaif-2027/              # ACM ICAIF 2027 conference paper draft
│   └── literature-review/              # Annotated bibliography (capstone Week 3)
```

---

## Core Stack

- **AI**: Anthropic Claude Opus 4.7 (1M context, released 2026-04-16) for 5-voice deliberation
- **XR**: Meta Quest 3S 128GB + WebXR + Three.js + WebGPU
- **Hand tracking**: MediaPipe Hands (Google)
- **Risk primitives**: Python (`orallexa-risk` package), lifted from prior Aura Alexa + Orallexa work
- **Audit chain**: WebCrypto SubtleCrypto API (SHA-256 hash chain)
- **Backend**: Python (FastAPI / WebSocket), 5 voice processes
- **Smart glasses (stretch)**: Even Realities G2 ambient-mode HUD

---

## Regulatory Hooks (Why this matters)

| Regulation | Effective | Relevance |
|---|---|---|
| EU AI Act Article 14 — Human oversight | 2026-08-01 | Mandates human-in-the-loop for high-risk AI |
| EU AI Act Annex III — High-risk AI systems | 2026-08-01 | Credit scoring explicitly listed |
| SEC Rule 15c3-5 — Market Access Rule | Active | Pre-trade risk + credit checks + tamper-evident audit |
| US Fair Lending Act + ECOA (12 USC § 1691) | Active | Adverse-action explainability |
| US Reg BI (17 CFR 240.15l-1) — Best Interest | Active | Wealth advisor fiduciary duty |

---

## Build Status

Project is in early scaffold (Week 3 of capstone, June 2026). Implementation plan in [`docs/capstone-thesis/project-plan.md`](./docs/capstone-thesis/project-plan.md).

---

## Authors

- **Alex Xiaoyu Ji** ([@alex-jb](https://github.com/alex-jb)) — Trading vertical (capstone), Orallexa multi-agent backend, spatial-gating protocol, WebXR app, Brier audit engine
- **Loredana Carmen Levitchi** — Banking vertical (Dr. NGO joint project), 5-layer XR architecture (HoloFinanceXR), institutional risk primitives, user-study design

---

## Related Work in This Stack

- [council-diff](https://github.com/alex-jb/council-diff) (npm, MIT) — 5-voice Brier-audited deliberation engine; used here for the AI council layer
- [council-for-slack-2026](https://github.com/alex-jb/council-for-slack-2026) — Production proof of multi-voice + Brier + spatial Canvas in a different surface (Slack Agent Builder Challenge submission)
- Orallexa multi-agent trading system (private, Python; risk module will be lifted here as `orallexa-risk`)
