# Embodied Compliance Council: A Spatial AI Workspace for Loan Origination and Wealth Advisory on Meta Quest 3S

**Authors**: Loredana Carmen Levitchi (lead), Alex Xiaoyu Ji
**Course**: AI for Extended Reality (Dr. Harry NGO) — Final Project Proposal
**Date**: 2026-06-17
**Status**: Draft for Loredana review. Built on Loredana's HoloFinanceXR 5-layer architecture + her 120-page Aura Alexa BR document; Alex contributes multi-agent backend integration and the spatial compliance-gating protocol.

---

## 1. Problem

Microsoft HoloLens was discontinued in 2024-10, ending the AR banking deployments at Citi (holographic workstations) and Bank of America (employee training). Meta Quest 3S ($299 consumer hardware) plus WebXR offers a 10× cheaper replacement path, and Meta's enterprise pivot has accelerated bank adoption (Quest 3S replaced Quest 3 at 3:1 ratio in enterprise fleets, Q1 2026). JPMorgan's VR head departed in early 2026; the firm immediately hired an AI scientist from Meta Reality Labs — a public signal that institutional finance is moving from "pure VR" to **AI + spatial computing**.

Two unsolved problems in banking AI converge:

1. **Explainability and audit gap in AI-driven lending and wealth advisory**. The EU AI Act Annex III classifies credit-scoring AI and creditworthiness assessment systems as "high-risk", mandating Article 14 human oversight and tamper-evident audit logs (effective 2026-08). The U.S. Fair Lending Act and Equal Credit Opportunity Act (ECOA) require lenders to provide adverse-action explanations. Current 2D loan-decisioning dashboards make this auditable but slow, opaque to the customer, and prone to compliance gaps.

2. **Multi-agent risk gap**. AI-native finance platforms like Orallexa (a 5-persona deliberation council with Brier-calibrated audit) score 9/10 on Decision Intelligence but only 5/10 on Risk Controls and lack the institutional risk primitives (Value-at-Risk, Expected Shortfall, factor exposures, concentration limits, sector exposure) that banks require. The institutional risk layer cannot be surfaced quickly enough at decision moments in current 2D interfaces.

This proposal addresses both gaps by introducing **embodied compliance** — physical spatial gating of bank decisions via a multi-agent spatial council, deployed in two banking-specific modes: loan origination and wealth advisory.

---

## 2. Proposed System

We extend Loredana's HoloFinanceXR 5-layer stack (display / tracking / perception / world-model / interaction, per her IEEE technical report) with two additions:

### Layer 6 — Multi-Agent AI Backend (Orallexa, upgraded with Loredana's risk modules)

Five persona voices run as independent Python processes on a server. For the lending use case, the voices are: **credit-fundamentals analyst** (Buffett-style), **risk officer** (default and stress scenarios), **fair-lending compliance** (ECOA / Reg B disparate-impact checks), **customer advocate** (transparency and adverse-action explanations), **macro-environment contrarian** (recession and sector-cycle stress).

Each voice has direct tool access to a shared `orallexa.risk` Python module — assembled by lifting Loredana's existing risk implementations into Orallexa and exposing them as typed tool calls: `var()`, `expected_shortfall()`, `factor_exposures()`, `beta_decomposition()`, `concentration_limits()`, `sector_exposure()`, `correlation_matrix()`. Each voice calls the relevant subset before deliberating, anchoring its reasoning in institutional-grade risk primitives rather than free-form LLM judgment.

Voices deliberate in parallel against Anthropic Claude Opus 4.7 (1M context window, released 2026-04-16), which for the first time allows the full applicant or client profile, 90-day market history, and full portfolio state to fit in a single deliberation prompt. Verdicts: `approve`, `block`, `escalate`. Each voice's historical Brier score (Karpathy Software 3.0 evaluation loop, implemented in our `council-diff` library) determines its weight in the final decision.

### Layer 7 — Spatial Gating Protocol (Frontend)

For every loan application above a configurable threshold (default: $50K consumer, $250K commercial), or every wealth-advisory rebalancing exceeding 5% portfolio shift, the Quest 3S WebXR client opens a **review room**. Five podiums are arranged in a hexagonal layout matching the voice avatars. The loan officer (or wealth advisor) must physically walk to each podium, listen to that voice's reasoning, review the supporting risk metrics floating beside it, and submit a hand-gesture confirmation (approve, block, escalate). Head pose, hand gesture, voice timing, and the full audio transcript are signed with a cryptographic hash chain (WebCrypto SubtleCrypto API) and persisted as a tamper-evident audit trail. The session log is exportable in formats acceptable to OCC, CFPB, FINRA, and EU AI Act Article 14 audit submissions.

### Mode A — Loan Origination (Primary)

Loan officer wears Quest 3S; customer either also wears a paired headset (joint review) or watches the same scene mirrored to a wall screen behind glass. Multi-agent debate is fully visible to the customer, which itself satisfies ECOA's adverse-action transparency requirement — if the loan is denied, the customer has watched the reasoning. Fair-lending compliance voice's verdict and supporting metrics are auto-formatted into the regulatory adverse-action notice.

### Mode B — Wealth Advisory (Secondary, Same Codebase)

Wealth advisor and HNW client both wear Quest 3S in the advisor's office. The same five-podium architecture, but the voice roster shifts to: portfolio manager, macro analyst, growth-VC contrarian, activist short, fiduciary-duty advocate. Brier audit becomes the fiduciary-duty proof — every recommendation is calibrated against historical outcomes. Reg BI (Best Interest) compliance trail produced automatically.

### Crisis Mode (Shared Across Both)

Triggered when bank-wide stress test (CCAR / DFAST) thresholds are breached, or when portfolio drawdown exceeds 3% during a wealth-advisory session: the room reconfigures into a 24-loan-or-position 3D risk-heatmap floor, Brier scores float above each voice in real time, and an Even Realities G2 smart-display glance overlay (stretch goal) surfaces summary confidence dots when the user looks away from the headset.

---

## 3. Novel Contribution

This is the first system to treat **spatial gating as a cryptographic audit primitive** for regulated bank decisions. The contribution is not a 3D dashboard, not a multi-agent debate framework alone, not a compliance log, and not a risk module — it is the composition of all four into a single tamper-evident protocol that maps cleanly onto Fair Lending Act, ECOA, EU AI Act Article 14, and Reg BI.

A search of IEEE VR, IEEE ISMAR, ACM CHI, ACM ICAIF, and arXiv (2026-06-16) returns no published work framing spatial UI as a regulatory primitive in banking, and no prior multi-agent spatial workspace integrating institutional risk primitives. Adjacent prior work (Apex Quant on multi-agent quant trading, Microsoft Research Holoportation, HoloLens enterprise training studies) treats spatial UI as either ergonomic or visualization-only, not as audit material.

Secondary contributions:
- **Orallexa risk upgrade**: We integrate Loredana's institutional risk primitives (VaR, ES, factor exposures, beta decomposition, concentration limits, sector and correlation analysis) into Orallexa as typed tool calls accessible to each voice, lifting Orallexa from a 5/10 to an expected 8–9/10 on the JPMorgan pressure-test Risk Controls dimension (validated in our evaluation methodology, Section 6).
- **Generalization claim**: The same spatial-gating protocol generalizes across loan origination and wealth advisory with a voice-roster swap and threshold reconfiguration, demonstrating that embodied compliance is a transferable primitive across regulated banking workflows.

---

## 4. Demo Plan

- **Primary hardware**: Meta Quest 3S 128GB ($299 each, two units recommended for joint customer-officer demos; purchased by Loredana or borrowed from Yeshiva CS department).
- **Secondary hardware**: Even Realities G2 smart-display glasses ($599, stretch goal — required only for ambient confidence-glance mode).
- **Live web demo**: hello-finance-xr.vercel.app (URL to be finalized).
- **Backup for presentation**: TouchDesigner post-production compositing of NDI-captured Quest sessions into a high-fidelity hero video (optional, used only if presentation venue bandwidth is constrained).

A 7-minute live demo will cover: one Loan Origination default-mode review (small-business loan, joint customer-officer session), one Wealth Advisory rebalancing review (HNW client, fiduciary mode), and one Crisis Mode trigger (simulated CCAR breach mid-session). The demo ends with a cryptographic audit-trail export shown alongside an example OCC and EU AI Act audit submission format.

---

## 5. Existing Assets (De-Risks the Proposal)

| Asset | Owner | Status |
|---|---|---|
| 5-page HoloFinanceXR IEEE technical report draft (5-layer XR stack, Quest 3S target, evaluation metrics, weekly lab mapping) | Loredana | Drafted, ready for revisions |
| 120-page Business Requirements document covering Aura Alexa enhancement with VaR, correlation, factor analysis, and agent integration | Loredana | Drafted; risk implementations to be lifted into `orallexa.risk` module |
| Orallexa multi-agent trading system (Python, 5 voices, production cron, Brier-audited) | Alex | Live |
| `council-diff` v0.4.2 (open-source Brier audit engine, 0 npm-audit vulnerabilities, distributed across 71 AI agent platforms via skills.sh) | Alex | npm + GitHub MIT-licensed |
| `council-for-slack-2026` (production proof of 5-voice deliberation + Brier audit + spatial Canvas surface in a different domain — Slack Agent Builder Challenge submission, $42K prize pool) | Alex | Live, github.com/alex-jb/council-for-slack-2026 |
| Three.js + WebXR baseline (cross-browser parity since 2026-01) | W3C | Standardized |
| Anthropic Claude Opus 4.7 with 1M context + native bounding-box pixel localization | Anthropic | Released 2026-04-16, in active use |
| MediaPipe Hands, WebCrypto SubtleCrypto API for cryptographic hash chain | Google / W3C | Standardized, browser-native |

---

## 6. Evaluation Methodology

Preserved from Loredana's IEEE draft:
- **Perception**: detection mAP > 0.80, segmentation IoU > 0.70, relative depth error reported
- **Latency**: frame rate > 60 FPS, motion-to-photon < 22 ms, agent tool-call latency end-to-end < 1.5 s
- **Gesture and voice**: hand gesture success > 0.85, voice intent accuracy > 0.90
- **User experience**: System Usability Scale > 75, NASA-TLX cognitive load reported

Novel additions for this project:
- **Compliance integrity**: 100% of loan or rebalancing decisions produce a tamper-evident audit trail, verified by hash-chain replay; SEC FIX 5.0SP2, FINRA OATS, OCC HMDA, and EU AI Act audit-export formats validated.
- **Brier calibration stability**: 5-voice Brier(XR mode) ≈ Brier(2D control), p < 0.05 — to demonstrate the spatial UI does not introduce framing bias.
- **Risk-primitive accuracy**: Orallexa risk module VaR and Expected Shortfall validated against historical-simulation baseline (5-year SPX backtest); factor exposures validated against Fama-French 5-factor model.
- **Decision-time friction**: XR session time vs incumbent 2D loan-decisioning workflow benchmark; target XR within +20% of incumbent or better.

A 30-subject user study will be conducted with MBA Finance program students (loan-officer role-play) and 10 financial-planning practitioners (wealth-advisor role-play). IRB approval to be requested by Loredana through Yeshiva.

---

## 7. Division of Labor

| Responsibility | Owner |
|---|---|
| 1-page proposal, IEEE paper revisions, presentation delivery | Loredana |
| Quest 3S WebXR app (Three.js, Three.WebXR, MediaPipe Hands integration, hexagonal podium scene) | Alex |
| Orallexa risk module integration (lift Loredana's Python risk code into typed tool calls) | Alex (with Loredana code review) |
| Multi-agent backend (5 voice deliberation, Brier audit, Opus 4.7 prompts) | Alex |
| Cryptographic audit-trail protocol (WebCrypto + hash chain + SEC/OCC/CFPB/EU AI Act export formats) | Alex |
| User study design, IRB application, subject recruitment, NASA-TLX administration | Loredana |
| Even Realities G2 ambient-mode integration (stretch goal, contingent on SDK access) | Alex |
| Optional TouchDesigner hero-video compositing for presentation | Alex |
| Customer-facing scenario design (loan applicant journey, HNW client journey) | Loredana |

---

## 8. Multi-Deliverable Mapping

This project intentionally produces four distinct deliverables from a shared codebase:

| Deliverable | Form | Class / Venue | Estimated Due |
|---|---|---|---|
| 1-page proposal | This document | Dr. Harry NGO (AI for Extended Reality) | 2026-06-17 |
| Server-client multi-agent prototype + 5-page report | Code + report | Dr. Ashikur Nobel | TBD (course-set) |
| Capstone thesis (40–80 pages) | Full literature review, methodology, evaluation, future work | Capstone advisor (to be confirmed) | TBD |
| Conference paper (8 pages, double-column) | Compressed format | **ACM ICAIF 2027** (estimated deadline 2026-09-15); backup: **IEEE BigData 2026** (December) | 2026-09 |

The codebase is shared; each deliverable provides a distinct framing and evaluation depth. The capstone advisor will be informed of the dual-class origin per academic honesty norms.

---

## 9. Alternative Scopes (For Loredana's Review)

If a different framing is preferred, three alternatives are prepared. The recommended scope is **Option A** above.

**Option A — Embodied Compliance Council for Loan Origination + Wealth Advisory (this document, recommended)**
Strongest novelty, strongest multi-deliverable fit, direct EU AI Act and Fair Lending Act regulatory hooks, two demoable modes from a single codebase.

**Option B — Loan Origination only (subset of Option A)**
Drops wealth-advisory mode and the generalization claim. Slightly faster to ship; weaker capstone story because the generalization angle is the strongest research claim.

**Option C — Generic Banking Workspace (Loredana's original HoloFinanceXR draft, unchanged)**
The 5-layer architecture as-is, generic financial advisory scenario. Lower risk, but loses the multi-agent integration, the cryptographic audit trail, and the EU AI Act regulatory hook. Loredana's 5-page IEEE draft would need minimal revisions.

**Option D — Quant Trading Pre-Trade Compliance**
Pivots to institutional hedge-fund pre-trade compliance. Strong novelty but loses Loredana's banking framing and the broader Fair Lending audience. Recommended only if the committee specifically prefers trading over banking.

We recommend **Option A** because it composes the strongest research contribution (embodied compliance as a primitive), the strongest commercial buyer (banks, regulators), and the strongest multi-deliverable fit, while preserving Loredana's banking framing and reusing both her IEEE draft and her 120-page BR document at high fidelity.

---

## References (representative; full bibliography in the IEEE paper)

- L. C. Levitchi, *HoloFinanceXR: An AI-Powered Banking XR Workspace for Meta Quest 3S and Smart Display Glasses*, Final Project Technical Report (draft, 2026)
- L. C. Levitchi, *Aura Alexa Enhancement with Risk Analytics: Business Requirements*, 120-page draft (2026)
- A. X. Ji, *Orallexa vs JPMorgan Trading Platform: Executive Pressure-Test Assessment*, 2026
- A. Kirillov et al., *Segment Anything*, ICCV 2023
- B. Kerbl et al., *3D Gaussian Splatting for Real-Time Radiance Field Rendering*, SIGGRAPH 2023
- W3C Immersive Web Working Group, *WebXR Device API*, 2026 candidate recommendation
- 12 U.S.C. § 1691 — Equal Credit Opportunity Act (ECOA)
- 15 U.S.C. § 1601 — Fair Credit Reporting Act
- European Union, *Artificial Intelligence Act* (Regulation 2024/1689), Article 14 — Human Oversight and Annex III — High-Risk AI Systems (credit-scoring), effective 2026-08-01
- 17 CFR 240.15c3-5 — Market Access Rule (SEC); 17 CFR 240.15l-1 — Regulation Best Interest
- Anthropic, *Claude Opus 4.7 with 1M Context Window*, 2026-04-16 release notes
- Apex Quant, *Multi-Agent Debate for Quantitative Trading Signals*, SSRN 2026

---

*End of proposal — 1 page recommended scope plus 2 pages supporting detail. Loredana, please mark any preferred changes (especially Option A vs Option B), confirm hardware purchase or borrowing plan for Quest 3S, and return; Alex will revise the technical sections you flag and produce the Dr. Nobel-class companion document by the same deadline. The Orallexa risk-module merge work can begin in parallel as soon as you share the relevant Python files from your 120-page BR document.*
