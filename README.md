# Embodied Compliance Council

A multi-agent spatial AI workspace for regulated finance — running on Meta Quest 3S WebXR + Orallexa 5-voice deliberation + Brier audit + cryptographic audit trail.

> **Embodied compliance** is the proposal that *spatial physical gating* of regulated finance decisions — combined with multi-agent LLM deliberation and tamper-evident audit logs — produces a compliance primitive that 2D dashboards cannot match. The framework is tested across two regulated verticals: **bank loan origination + wealth advisory** (Banking app) and **institutional hedge-fund pre-trade approvals** (Trading app).

License: MIT.

---

## Academic Honesty Declaration

This codebase produces **four distinct academic and conference deliverables** for **three classes plus one conference**. Two are co-authored with collaborators; two are solo. Each has its own framing, scope, and evaluation depth; together they share architectural primitives in `packages/`.

| Deliverable | Course / Venue | Location | Owner / Framing |
|---|---|---|---|
| 1-page Final Project Proposal — Banking (Loan + Wealth Advisory) | Dr. Harry NGO — AI for Extended Reality | [`docs/dr-ngo-final/`](./docs/dr-ngo-final/) · app [`apps/banking-quest/`](./apps/banking-quest/) | **Loredana C. Levitchi (lead) + Alex Xiaoyu Ji (technical demo)** |
| 5-page Server-Client Multi-Agent Prototype | Dr. Ashikur Nobel | [`docs/dr-nobel-companion/`](./docs/dr-nobel-companion/) | **Alex solo.** Demonstrates the council's server-client protocol independent of vertical. |
| Capstone Thesis — Calibration-Disciplined Pre-Trade Compliance Spatial Council for Live Trading | Prof. Michael Yang — COM 6000-CP1 | [`docs/capstone-thesis/`](./docs/capstone-thesis/) · app [`apps/trading-quest/`](./apps/trading-quest/) | **Alex solo.** Extends an earlier Week 1-2 calibration thesis with a spatial-gating audit-primitive layer. |
| 8-page Conference Paper | ACM ICAIF 2027 (deadline ~2026-09-15) | [`docs/papers/icaif-2027/`](./docs/papers/icaif-2027/) | **Alex + Lora co-author.** Unified "Embodied Compliance" framework tested in both verticals. |

Each deliverable cites its sibling per academic honesty norms.

### Capstone scope note

The Capstone (Yang's class) thesis was originally scoped as "From Paper to Production: Calibration Discipline in a Solo-Operated AI Trading Agent" in Week 1-2. The Week 3 falsification gate triggering produced an empirical strengthening of the calibration claim. Week 4 onwards the thesis is being extended to **"Calibration as the Audit Primitive for Spatial Pre-Trade Compliance"**, integrating an XR spatial-gating layer atop the validated Orallexa backend. Yang has been notified by amendment email; the scope extension is measurement-first (Phase 1 = 6 calibration upgrades, Weeks 4-6; Phase 2 = spatial layer on validated backend, Weeks 7-10).

### Repository scope

- `apps/banking-quest/` is the Dr. NGO + Lora project.
- `apps/trading-quest/` is the Capstone (Yang).
- `apps/multi-agent-demo/` (TBD) is the Dr. Nobel companion.
- `packages/` (orallexa-risk, council-voices, spatial-gating-protocol) are shared infrastructure across all three apps.

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
