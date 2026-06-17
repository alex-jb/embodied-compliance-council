---
title: "Embodied Compliance Council — Auditable Spatial Workspace for Loan Origination and Wealth Advisory"
author:
  - Loredana Carmen Levitchi (lead)
  - Alex Xiaoyu Ji
date: 2026-06-17
geometry: margin=0.9in
fontsize: 11pt
linkcolor: blue
urlcolor: blue
---

# Embodied Compliance Council
## Auditable Spatial Workspace for Loan Origination and Wealth Advisory

**Course**: AI for Extended Reality (Dr. Harry NGO) — Final Project Proposal
**Date**: 2026-06-17 (revision 3, supersedes proposal-v2 of 2026-06-17 morning)
**Status**: Draft for Loredana review. Built on Loredana's HoloFinanceXR 5-layer architecture and her 120-page Aura Alexa BR document; Alex contributes the multi-agent backend, the spatial gating protocol, and the deep user-pain research that drives the v3 reframe.

---

## 1. What changed since v2 (executive summary of the reframe)

Version 2 of this proposal led with "five AI voice podiums in WebXR." Two independent deep-research efforts on 2026-06-17 afternoon (banking compliance officer / quant / trader pain points; immersive analytics empirical literature) returned the same verdict: **the strongest wedge is regulator-aligned spatial audit + calibration discipline + gaze-as-non-cumbersome-override**, not five voices debating.

Version 3 keeps the council architecture, the cryptographic audit chain, the Quest 3S hardware target, and Loredana's 5-layer HoloFinanceXR stack — but reframes the staging:

| Layer | v2 framing (now demoted) | v3 framing (the wedge) |
|---|---|---|
| Daily-workflow | None — Quest 3S session only | **Even Realities G2 ($599, no camera) ambient overlay** — in-lens contrarian during loan review, all-day wearable |
| High-stakes review | "five podiums in WebXR" as the hero | Quest 3S **immersive review room** triggered only above policy thresholds — for the 4-12x/year case, not the daily 50-loan case |
| Council voices | Hero feature | Plumbing: one verbal contrarian voice surfaces at a time on G2; five voices fan-out in the Quest 3S review room |
| Audit artifact | Hash chain (under-emphasized) | **Promoted to hero**: gaze + gesture + verbal-challenge transcript signed with WebCrypto SHA-256, mapped 1-to-1 to EU AI Act Article 14(4)(d) "non-cumbersome override" + ECOA adverse-action documentation |

The reframe strengthens, not weakens, the IEEE paper contribution. Reviewers will not ask "why does a banking compliance contribution depend on five LLM voices on podiums" because the podiums are no longer the contribution. The contribution is the *cryptographic audit composition* and the *cross-form-factor spatial gating protocol*. The five voices remain as the council backend — they just stop being the visual hero.

---

## 2. Problem

Microsoft HoloLens was discontinued in 2024-10, ending the AR banking deployments at Citi (holographic workstations) and Bank of America (employee training). Meta Quest 3S ($299) plus WebXR offers a 10x cheaper replacement path. Meta's enterprise pivot has accelerated bank adoption (Quest 3S replaced Quest 3 at 3:1 ratio in enterprise fleets, Q1 2026). JPMorgan's VR head departed in early 2026; the firm immediately hired an AI scientist from Meta Reality Labs — a public signal that institutional finance is moving from "pure VR" to **AI + spatial computing**.

Apple Vision Pro is not a viable form factor for daily banking compliance use in 2026. Apple itself halted the Vision Pro overhaul on 2025-10-01 to reallocate engineering toward lightweight smart glasses (Bloomberg, Yahoo Finance 2025-07-09). US Vision Pro sales remain below 1M units. The *daily wear* form factor in 2026-2028 is lightweight glasses (Even Realities G2, Meta Ray-Ban Display) for ambient cognitive support, with immersive headsets reserved for episodic deep-review sessions.

Two unsolved problems in banking AI converge against this backdrop:

1. **Explainability and audit gap in AI-driven lending and wealth advisory.** EU AI Act Annex III classifies credit-scoring AI and creditworthiness assessment as "high-risk," mandating Article 14 human oversight and tamper-evident audit logs effective 2026-08-01. The U.S. Equal Credit Opportunity Act (12 U.S.C. § 1691) requires lenders to provide specific, model-traceable adverse-action explanations; post-2024 CFPB guidance explicitly states that template phrases such as "purchasing history" are non-compliant. Current 2D loan-decisioning dashboards make this *auditable but slow, opaque to the customer, and prone to compliance gaps*. The OCC 2024 CRO survey and Oliver Wyman 2024 CRO Outlook both report regulators have become measurably more demanding on evidence of contrarian challenge during review.

2. **Multi-agent risk gap.** AI-native finance platforms (Orallexa: a 5-persona deliberation council with Brier-calibrated audit) score 9/10 on Decision Intelligence but only 5/10 on Risk Controls and lack the institutional risk primitives (Value-at-Risk, Expected Shortfall, factor exposures, concentration limits, sector exposure) that banks require. The institutional risk layer cannot be surfaced quickly enough at decision moments in current 2D interfaces.

This proposal addresses both gaps by introducing **embodied compliance** — physical spatial gating of bank decisions via a multi-agent backend, delivered across **three tiers of presentation surface** matched to actual workflow stakes.

---

## 3. Proposed System — Three-Tier Presentation Surface

We extend Loredana's HoloFinanceXR 5-layer stack (display / tracking / perception / world-model / interaction, per her IEEE technical report) with two additions: a **multi-agent AI backend** and a **cross-form-factor spatial gating protocol** that adapts the same council backend to three presentation tiers.

### 3.1 Tier 1 — Desktop overlay (every decision, every day)

A native macOS application reads the analyst's screen via the Accessibility API and ScreenCaptureKit. When a loan file, a credit underwriting policy PDF, or a Bloomberg description page is in focus, the desktop overlay surfaces a single contrarian voice from the council backend: *"DTI 47% exceeds policy 4.3 threshold of 43% for B-rated borrowers. Why approve?"* The analyst answers aloud; the verbal challenge plus the response are transcribed, timestamped, and hashed into the audit chain. This tier handles the daily 30-50 loan volume.

### 3.2 Tier 2 — Smart-glasses overlay (Even Realities G2, $599)

For client-facing review sessions where the analyst cannot use a laptop, the Even Realities G2 monocular green HUD displays the same contrarian prompt in-lens; the bone-conduction audio whispers the adverse-action-safe rephrase. The G2's deliberate *no-camera architecture* is the moat for regulated industries: as documented by Bloomberg Law (2025), AI smart glasses with always-on cameras are a workplace compliance liability that the G2 by construction does not create. The G2 ships with on-device transcription (Conversate mode) which produces examiner-grade evidence of "what was said and considered" without exposing the customer's PII to the cloud.

### 3.3 Tier 3 — Quest 3S immersive review room (above policy thresholds only)

For loan applications above a configurable threshold (default: $250K commercial, $50K consumer with policy 4.3 leverage limits triggered, or any fair-lending statistical flag), or wealth-advisory rebalancings exceeding 5% portfolio shift, the Quest 3S WebXR client opens an **immersive review room** with the full five-voice council. The review room is *not* the hero of the product — it is the episodic high-stakes deep-dive surface. Inside the room:

- **Five council voices** are arranged in a hexagonal layout: credit-fundamentals analyst, risk officer, fair-lending compliance, customer advocate, macro-environment contrarian. Each voice has direct tool access to Loredana's `orallexa.risk` Python module (`var()`, `expected_shortfall()`, `factor_exposures()`, `beta_decomposition()`, `concentration_limits()`, `sector_exposure()`, `correlation_matrix()`).
- A **walkable calibration corridor** displays the analyst's last 30 reviewed decisions as physical objects with Brier scores floating above. This implements the method-of-loci empirical finding (Krokos et al., *Virtual Reality* 2019; +20-28% recall lift in spatial-binding vs flat UI).
- A **3D bias constellation** scatter visualizes the analyst's verdict history as a 3D point cloud (already shipped 2026-06-17, commit `3e8b24c`). Approvals cluster in high-agreement zones if calibration is healthy; scatter in split-council regions reveals rubber-stamping or alpha left on the table. This implements the immersive-analytics finding (Kraus et al., *Computer Graphics Forum* 2022) that 3D scatter beats 2D for outlier identification and cluster detection in bounded zones.
- A **counterparty / network visualization** for AML or concentration review walks the analyst into a 3D force-directed graph of related entities. 2D force-directed graphs collapse above ~500 nodes; immersive embodied navigation scales to 5,000+ nodes per Kraus 2022.

### 3.4 Tier-spanning audit protocol

Every decision across all three tiers produces a tamper-evident audit record using WebCrypto SubtleCrypto SHA-256 hash chains. Each record captures: timestamp, decision ID, the council's challenge text, the analyst's verbal or gestural response, gaze dwell time on each surfaced piece of evidence (Vision Pro and Quest 3S inside-out eye tracking), and the loan file or position context. The hash chain is exportable in formats acceptable to OCC, CFPB, FINRA, and EU AI Act Article 14 audit submissions.

This composition is the **novel contribution** (Section 4) — the audit chain is no longer a side feature; it is the deliverable.

---

## 4. Novel Contribution

This is the first system to treat **spatial gating as a cryptographic audit primitive across multiple form factors** for regulated bank decisions. The contribution is not a 3D dashboard, not a multi-agent debate framework alone, not a compliance log, and not a risk module — it is the composition of all four into a single tamper-evident protocol that maps cleanly onto Fair Lending Act, ECOA, EU AI Act Article 14, and Reg BI, *and that spans daily desktop use, ambient smart-glasses use, and episodic immersive review*.

The cross-form-factor framing is the v3 strengthening over v2. Earlier work (Apex Quant on multi-agent quant trading; Microsoft Holoportation; HoloLens enterprise training studies) treats spatial UI as either ergonomic or visualization-only, not as audit material, and never across multiple form factors simultaneously.

A search of IEEE VR, IEEE ISMAR, ACM CHI, ACM ICAIF, and arXiv (2026-06-17) returns no published work framing spatial UI as a *regulatory primitive* in banking, no prior cross-form-factor compliance audit chain, and no prior empirical evaluation of which form factor wins for which workflow stake.

Secondary contributions:

- **Orallexa risk upgrade.** We integrate Loredana's institutional risk primitives into Orallexa as typed tool calls accessible to each voice, lifting Orallexa from 5/10 to an expected 8-9/10 on the JPMorgan pressure-test Risk Controls dimension (validated in our evaluation methodology, Section 6).
- **Empirical XR-wedge finding.** Our user study (Section 6) is positioned to be the first peer-reviewed RCT on immersive 3D for *financial* anomaly detection specifically. Kraus 2022 covers general 3D scatter; the financial-specific gap is unfilled. This is a defensible research contribution worth a stand-alone paper.
- **Generalization claim.** The same spatial-gating protocol generalizes across loan origination and wealth advisory with a voice-roster swap and threshold reconfiguration, demonstrating that embodied compliance is a transferable primitive across regulated banking workflows.

---

## 5. Demo Plan

- **Primary hardware**: Meta Quest 3S 128GB ($299 each, two units recommended for joint customer-officer demos).
- **Daily-wear hardware**: Even Realities G2 ($599; one unit minimum for the in-lens contrarian demo).
- **Desktop demo**: native macOS prototype on Apple Silicon laptop, runs the council backend locally via the Apple Foundation Model framework (Phi-4-class on-device; no PII leaves the machine).
- **Live web demo**: hello-finance-xr.vercel.app (URL to be finalized) hosts the Quest 3S-targeted WebXR build and the desktop-mock browser demo.

A **9-minute live demo** will cover:

1. **Tier 1 (desktop, 90s)** — analyst opens a loan file in Excel; desktop overlay surfaces the Fair Lending contrarian; analyst answers aloud; the hash-chained audit record is generated.
2. **Tier 2 (G2 ambient, 90s)** — same analyst walks to a simulated customer meeting room; in-lens prompt surfaces an adverse-action-safe denial phrase; bone-conduction whispers a follow-up.
3. **Tier 3 (Quest 3S immersive, 5 min)** — same loan flagged by Tier 1 + 2 escalates to immersive review; analyst walks the calibration corridor (showing prior similar decisions and their Brier audit), inspects the bias constellation (revealing the analyst tends to over-approve on B-rated borrowers near the 4.5x leverage cap), enters the five-voice council with the customer mirrored to a wall screen behind glass.
4. **Tier-spanning audit export (90s)** — a cryptographic audit-trail export shown alongside an example OCC and EU AI Act audit submission format, with the gaze-dwell timeline replayed.

The demo ends with the offline-resilience proof: WiFi disconnected mid-Tier-1 demo, the on-device council continues running on the Apple Foundation Model framework. This is the regulatory escape-hatch slide.

---

## 6. Evaluation Methodology

Preserved from Loredana's IEEE draft:

- **Perception**: detection mAP > 0.80, segmentation IoU > 0.70, relative depth error reported
- **Latency**: frame rate > 60 FPS, motion-to-photon < 22 ms, agent tool-call latency end-to-end < 1.5 s
- **Gesture and voice**: hand-gesture success > 0.85, voice-intent accuracy > 0.90
- **User experience**: System Usability Scale > 75, NASA-TLX cognitive load reported

Novel additions for this project:

- **Compliance integrity**: 100% of loan or rebalancing decisions produce a tamper-evident audit trail, verified by hash-chain replay; SEC FIX 5.0SP2, FINRA OATS, OCC HMDA, and EU AI Act audit-export formats validated.
- **Brier calibration stability**: 5-voice Brier(XR mode) ≈ Brier(2D control), *p* < 0.05 — to demonstrate the spatial UI does not introduce framing bias.
- **Recall lift over 2D control** — between-subjects evaluation of analysts' 7-day recall of specific decision details. Target: at least +15% recall accuracy for Quest 3S immersive review vs 2D dashboard control (the lower bound of Krokos UMD 2019 effect size).
- **Gaze-dwell audit fidelity** — eye-tracking logs on Quest 3S verify analysts actually viewed the fair-lending contrarian voice's report. Target: 95% of approval decisions show > 3 seconds of gaze dwell on the fair-lending voice's evidence card.
- **Risk-primitive accuracy**: Orallexa risk module VaR and Expected Shortfall validated against historical-simulation baseline (5-year SPX backtest); factor exposures validated against Fama-French 5-factor model.
- **Cross-tier decision-time friction**: Tier 1 desktop overlay must add < 5 seconds vs unaided review; Tier 3 immersive review may add up to +20% vs 2D control given the higher-stakes scope.

A **40-subject within-subjects user study** will be conducted: 30 MBA Finance students (loan-officer role-play) and 10 financial-planning practitioners (wealth-advisor role-play). Each subject reviews 12 loan files (6 in 2D control, 6 with the three-tier system) in counterbalanced order. IRB approval to be requested by Loredana through Yeshiva.

---

## 7. Existing Assets (De-Risks the Proposal)

| Asset | Owner | Status |
|---|---|---|
| 5-page HoloFinanceXR IEEE technical report draft | Loredana | Drafted, ready for revisions |
| 120-page BR document covering Aura Alexa enhancement (VaR, correlation, factor analysis, agent integration) | Loredana | Drafted; risk implementations to be lifted into `orallexa.risk` |
| Embodied Compliance Council monorepo (8 packages, 41 tests green) | Alex | Live, github.com/alex-jb/embodied-compliance-council |
| **3D Bias Constellation (Phase 1 XR artifact)** | Alex | Shipped 2026-06-17 (commit `3e8b24c`) |
| **Three-user pain research memo (banker, quant, trader)** | Alex | Shipped 2026-06-17 (docs/research/2026-06-17-three-users-fifteen-pains-xr-edge.md) |
| **XR vs 2D empirical research memo** | Alex | Shipped 2026-06-17 (docs/research/2026-06-17-xr-vs-2d-empirical-memo.md) |
| **Perception Layer (YOLO-World, SAM2, Depth Anything V2 protocols + mocks + SceneGrounder)** | Alex | Shipped 2026-06-17 (7/7 tests green) |
| Orallexa multi-agent system (5 voices, production cron, Brier-audited) | Alex | Live |
| `council-diff` v0.4.2 (OSS Brier audit engine, MIT, npm + skills.sh) | Alex | Live |
| `council-for-slack-2026` (production proof of 5-voice + Brier audit in Slack) | Alex | Live |
| Phase 4 EU AI Act + ECOA evaluation design doc | Alex | Live (docs/phase-4-eu-ai-act-evaluation-design.md) |
| Three.js + WebXR baseline (cross-browser parity since 2026-01) | W3C | Standardized |
| Anthropic Claude Opus 4.7 with 1M context | Anthropic | Released 2026-04-16 |
| Apple Foundation Model framework (on-device 3B + 20B sparse) | Apple | Released with iOS 18 / macOS 15 |
| MediaPipe Hands, WebCrypto SubtleCrypto API | Google / W3C | Standardized, browser-native |

---

## 8. Division of Labor

| Responsibility | Owner |
|---|---|
| 1-page proposal, IEEE paper revisions, presentation delivery | Loredana |
| Quest 3S WebXR app (Three.js, WebXR, MediaPipe Hands, hexagonal podium scene, calibration corridor, bias constellation) | Alex |
| Native macOS desktop overlay (Tier 1) | Alex |
| Even Realities G2 in-lens contrarian (Tier 2) | Alex (Loredana SDK access) |
| Orallexa risk module integration (lift Loredana's Python risk code into typed tool calls) | Alex (with Loredana code review) |
| Multi-agent backend (5 voice deliberation, Brier audit, Opus 4.7 prompts, on-device fallback) | Alex |
| Cryptographic audit-trail protocol (WebCrypto + hash chain + OCC / CFPB / FINRA / EU AI Act export formats) | Alex |
| Eye-tracking gaze-dwell logger | Alex |
| User study design, IRB application, subject recruitment, NASA-TLX administration | Loredana |
| Customer-facing scenario design (loan applicant journey, HNW client journey) | Loredana |

---

## 9. Multi-Deliverable Mapping

This project intentionally produces five distinct deliverables from a shared codebase.

| Deliverable | Form | Class / Venue | Estimated Due |
|---|---|---|---|
| 1-page proposal | This document | Dr. Harry NGO (AI for Extended Reality) | 2026-06-17 |
| Server-client multi-agent prototype + 5-page report | Code + report | Dr. Ashikur Nobel | TBD (course-set) |
| Capstone thesis (40-80 pages) | Full literature review, methodology, evaluation, future work | Capstone advisor (Prof. Yang) | 2026-12 |
| Conference paper (8 pages, double-column) | Compressed format | **ACM ICAIF 2027** (estimated deadline 2026-09-15); backup: **IEEE BigData 2026** (December) | 2026-09 |
| Commercial pilot (Phase 3) | Native macOS app, mid-tier wealth-mgmt or boutique IB beachhead | Independent, post-thesis | 2027-01+ |

The codebase is shared; each deliverable provides a distinct framing and evaluation depth. The capstone advisor will be informed of the dual-class origin per academic honesty norms.

---

## 10. Commercialization Path (New in v3)

The cross-form-factor research insight unlocked today identifies a defensible **commercial wedge** outside the academic scope: a desktop and smart-glasses *intern mentor* product (working name: Shadow) targeting first-year analysts at mid-tier ($5B-$50B AUM) wealth-management and boutique investment-banking firms in their first 90 days. The product reuses the council backend (slimmed from 5 to 3 voices: junior analyst, senior, compliance), the Perception Layer (for screen-region identification), the hash-chain audit (for L&D + compliance documentation), and Loredana's risk primitives (as on-device domain knowledge). It adds a macOS screen-capture pipeline, a local-LLM router (Phi-4-mini, Gemma 3 9B, Apple Foundation Model 3 Core Advanced), and a native desktop overlay.

Target: $1,500/analyst/year (inside the $1,097-$1,331 financial-services per-employee L&D budget per ATD 2024). 3-year SOM: $18M ARR across five mid-tier firms. This is not part of the academic deliverable; it is the post-thesis commercialization path that the Embodied Compliance Council research enables. Documented in `~/Desktop/shadow-mentor/` and shipped as a browser-runnable demo on 2026-06-17.

---

## 11. Alternative Scopes (For Loredana's Review)

If a different framing is preferred, three alternatives are prepared. The recommended scope is **Option A** below.

**Option A — Cross-form-factor Embodied Compliance Council (this document, recommended).** Strongest novelty (cross-form-factor audit primitive), strongest multi-deliverable fit, direct EU AI Act and Fair Lending Act regulatory hooks, three demoable tiers from a single codebase, and a defensible post-thesis commercialization path.

**Option B — Quest 3S-only Embodied Compliance Council (close to proposal-v2).** Drops desktop and G2 tiers, keeps the immersive review room as the sole surface. Faster to ship; weaker IEEE paper because the cross-form-factor finding is the strongest research claim and ties to the Kraus 2022 empirical literature.

**Option C — Generic Banking Workspace (Loredana's original HoloFinanceXR draft, unchanged).** The 5-layer architecture as-is, generic financial advisory scenario. Lower risk, but loses the multi-agent integration, the cryptographic audit chain, the EU AI Act regulatory hook, and the empirical wedge research.

**Option D — Quant Trading Pre-Trade Compliance.** Pivots to institutional hedge-fund pre-trade compliance. Strong novelty but loses Loredana's banking framing and the broader Fair Lending audience. Recommended only if the committee specifically prefers trading over banking.

We recommend **Option A** because it composes the strongest research contribution (cross-form-factor embodied compliance as a primitive), the strongest commercial buyer (banks, regulators), and the strongest multi-deliverable fit, while preserving Loredana's banking framing and reusing both her IEEE draft and her 120-page BR document at high fidelity.

---

## References (representative; full bibliography in the IEEE paper)

- L. C. Levitchi, *HoloFinanceXR: An AI-Powered Banking XR Workspace for Meta Quest 3S and Smart Display Glasses*, Final Project Technical Report (draft, 2026)
- L. C. Levitchi, *Aura Alexa Enhancement with Risk Analytics: Business Requirements*, 120-page draft (2026)
- A. X. Ji, *Orallexa vs JPMorgan Trading Platform: Executive Pressure-Test Assessment*, 2026
- E. Krokos, C. Plaisant, A. Varshney, "Virtual Memory Palaces: Immersion Aids Recall," *Virtual Reality* 23, 2019, +20-28% recall lift
- M. Kraus et al., "Immersive Analytics with Abstract 3D Visualizations: A Survey," *Computer Graphics Forum* 41(1):201-229, 2022
- A. Kirillov et al., *Segment Anything*, ICCV 2023
- B. Kerbl et al., *3D Gaussian Splatting for Real-Time Radiance Field Rendering*, SIGGRAPH 2023
- W3C Immersive Web Working Group, *WebXR Device API*, 2026 candidate recommendation
- 12 U.S.C. § 1691 — Equal Credit Opportunity Act (ECOA)
- 15 U.S.C. § 1601 — Fair Credit Reporting Act
- European Union, *Artificial Intelligence Act* (Regulation 2024/1689), Article 14 — Human Oversight and Annex III — High-Risk AI Systems (credit-scoring), effective 2026-08-01
- 17 CFR 240.15c3-5 — Market Access Rule (SEC); 17 CFR 240.15l-1 — Regulation Best Interest
- Federal Reserve SR 11-7, Guidance on Model Risk Management, 2011
- OCC Bulletin 2025-16, Disparate Impact and Fair Lending AI Guidance
- ATD State of the Industry Report 2024, US financial-services L&D spend
- Bloomberg Law, "AI Smart Glasses Workplace Compliance Risks," 2025
- Even Realities G2 Smart Glasses Technical Specifications, 2025
- Bloomberg via Yahoo Finance, "Apple Halts Vision Pro Overhaul to Focus on Smart Glasses," 2025-10-01
- Anthropic, *Claude Opus 4.7 with 1M Context Window*, 2026-04-16 release notes
- Apple Machine Learning Research, "Third Generation Apple Foundation Models," 2025
- Apex Quant, *Multi-Agent Debate for Quantitative Trading Signals*, SSRN 2026

---

*End of proposal v3. Loredana, please mark any preferred changes (especially Option A vs Option B and the three-tier vs Quest-3S-only scope), confirm hardware purchase or borrowing plan for Quest 3S and Even Realities G2, and return; Alex will revise the technical sections you flag and produce the Dr. Nobel-class companion document by the same deadline. The Orallexa risk-module merge work can begin in parallel as soon as you share the relevant Python files from your 120-page BR document.*
