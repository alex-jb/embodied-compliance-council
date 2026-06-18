---
title: "Embodied Compliance Council — Cross-Persona, Cross-Device Spatial Workspace for Regulated Banking"
author:
  - Loredana Carmen Levitchi (lead)
  - Alex Xiaoyu Ji
date: 2026-06-17 (revision 3.1)
geometry: margin=0.9in
fontsize: 11pt
linkcolor: blue
urlcolor: blue
---

# Embodied Compliance Council
## Cross-Persona, Cross-Device Spatial Workspace for Regulated Banking

**Course**: AI for Extended Reality (Dr. Harry NGO) — Final Project Proposal
**Date**: 2026-06-17 (revision 3.1, supersedes v3 of same day evening)
**Status**: Draft for Loredana review. v3.1 is the academic-deliverable framing of the canonical Shadow product proposal (`~/Desktop/shadow-mentor/docs/shadow-product-proposal.pdf`). Same engine, same architecture, scoped for academic submission and IEEE paper.

---

## 1. What changed since v3

Version 3 introduced the **three-tier presentation surface** (Desktop / G2 / Quest 3S) and was Even-G2-vs-Quest-3S framed. Subsequent same-evening research and the founder's product instinct converged on a sharper four-device architecture with five persona packs:

- **Quest 3S is dropped.** Apple paused Vision Pro overhaul October 2025; episodic immersive headsets are not the form factor regulators or analysts will wear in 2026-2028. We replace it with **XReal Air 2 Ultra** (80g, sunglass-form-factor 6DoF spatial AR, $699) for the JARVIS-style episodic deep-review surface.
- **A fifth persona is added — Quant / Data Scientist** (banking model risk and fraud / AML data engineering) — and a new academic app `quant-quest` is added to the codebase to evaluate the immersive analytics literature (Kraus 2022 CGF) for high-dimensional financial anomaly detection. This is what unlocks the empirically defensible portion of the IEEE paper.
- **The hero is no longer "five voices debating in WebXR."** The hero is **cross-persona, cross-device audit and recall** — five role-specific AI mentor + compliance voices, four device clients matched to scenario, one cryptographic hash chain that spans them all. The five-voice council remains; it is plumbing, not the visual hero.

These changes are not a scope expansion. They are a *narrowing* of the academic contribution to a more empirically defensible spatial-memory + cross-device audit-trail finding, with a wider applicability through the persona axis.

---

## 2. Problem

Microsoft HoloLens was discontinued in 2024-10. Apple Vision Pro adoption stalled and Apple itself reallocated engineering toward smart glasses on 2025-10-01. The 2026 daily-wear form factor is lightweight smart glasses (Even Realities G2, Brilliant Labs Frame, Meta Ray-Ban Display) and spatial-AR sunglass-form-factor devices (XReal Air 2 Ultra). Immersive headsets are reserved for episodic deep-review sessions.

Five regulated banking roles converge on the same three unsolved problems:

1. **Explainability and audit gap in AI-driven decisioning.** EU AI Act Annex III classifies credit-scoring AI as "high-risk," mandating Article 14 human oversight and tamper-evident audit logs effective 2026-08-01. The U.S. ECOA requires lenders to provide specific, model-traceable adverse-action explanations; post-2024 CFPB guidance explicitly states template phrases are non-compliant. Current 2D loan-decisioning dashboards make this auditable but slow, opaque to the customer, and prone to compliance gaps. The OCC 2024 CRO survey reports examiners have become measurably more demanding on contemporaneous evidence of contrarian challenge.

2. **Multi-agent risk gap.** AI-native finance platforms (Orallexa: a 5-persona deliberation council with Brier-calibrated audit) score 9/10 on Decision Intelligence but only 5/10 on Risk Controls and lack the institutional risk primitives (VaR, Expected Shortfall, factor exposures, concentration limits, sector exposure) that banks require. The institutional risk layer cannot be surfaced quickly enough at decision moments in current 2D interfaces.

3. **High-dimensional anomaly visualization gap.** Quants and data scientists detect SR 11-7 model drift via Population Stability Index but cannot attribute drift to specific feature × sub-population × contribution geometry. AML graph analytics produces traceable transaction paths but 2D force-directed layouts collapse to hairballs above ~500 nodes. Kraus et al. (Computer Graphics Forum 41(1), 2022) document that immersive 3D scatter outperforms 2D for outlier identification, distance perception, and embodied navigation of large graphs — but the literature lacks any peer-reviewed RCT in the *financial* anomaly-detection domain specifically. ECC's `quant-quest` evaluation fills this gap.

---

## 3. Proposed System — Cross-Persona, Cross-Device Architecture

Five persona packs, four device clients, one engine. The same JSON verdict is rendered at the right cognitive density for the moment.

### 3.1 The five persona packs

| Persona | What they do | Best device |
|---|---|---|
| 🛡 **Compliance officer / loan reviewer** | Loan origination review, OCC exam prep, ECOA adverse action notices, AML | Even G2 (customer-facing safe) + Desktop fallback |
| 🧮 **Quant / Data Scientist** | SR 11-7 model drift monitoring, fraud anomaly detection, AML graph analytics, counterparty network analysis | **XReal Air 2 Ultra (JARVIS mode)** + Desktop |
| 💻 **Software Engineer** | Risk system integration, internal LLM platform, Fair Lending PII boundary | Desktop primary + Brilliant Frame |
| 📈 **Trader / Portfolio Manager** | Position sizing, correlation regime, tail risk, factor exposure | **XReal Air 2 Ultra (JARVIS mode)** + Desktop |
| 💼 **Wealth Advisor** | HNW client meetings, portfolio review, Reg BI suitability | Even G2 (customer meetings) + Desktop |

Each persona pack supplies role-specific system prompts, jargon, regulations, and historical Brier audits to the shared `council-runner` backend. The same backend emits the same JSON verdict; the persona pack shapes which voices speak and what they say.

### 3.2 The four device clients

| Client | Hardware | Use case |
|---|---|---|
| 🖥 **Desktop macOS app** | Native ScreenCaptureKit + Accessibility API + AppKit overlay | Universal fallback. All personas. Where heavy review work actually gets done. |
| 👓 **Even Realities G2** ($599, no camera, monocular green HUD, bone conduction) | Even SDK + Conversate | Customer-facing primary for Compliance + Wealth Advisor. No-camera positioning is the moat for 2-party consent state law and customer trust. |
| 🕶 **Brilliant Labs Frame** ($349, color mini HUD, camera, open SDK) | Brilliant Open SDK | Internal-doc reading and runbook walk-through. Best for Software Engineer. Local-only processing of camera frames. |
| ✨ **XReal Air 2 Ultra** ($699, 6DoF spatial AR, sunglass-form-factor 80g, camera + bone conduction) | NRSDK + WebXR + Three.js | **JARVIS mode.** Three floating spatial panels anchored in the analyst's real workspace: (a) 3D risk surface / fraud feature-space UMAP / drift attribution timeline; (b) bias constellation (already shipped 2026-06-17, commit `3e8b24c`); (c) counterparty / AML 3D force-directed network walk-through. Bone-conduction council whispers. Only the user sees the panels through the AR glasses. Best for Quant + Trader at own desk with no customer present. |

### 3.3 The five academic apps (one per persona, sharing the backend)

| App | Persona | What it demos |
|---|---|---|
| `banking-quest` | 🛡 Compliance | Loan officer + Even G2 + in-lens contrarian during customer review; desktop deep-review with full 5-voice fan-out |
| `trading-quest` | 📈 Trader | Trader + XReal Air 2 Ultra JARVIS mode: 3D risk surface, bias constellation, correlation regime; desktop deep-review |
| **`quant-quest` (new in v3.1)** | 🧮 Quant / Data Scientist | **New academic app.** Quant + XReal JARVIS: walk through fraud feature-space UMAP manifold, AML transaction-network 5K-node graph, model drift attribution. **This is the academic evaluation arm that fills the Kraus 2022 financial-anomaly gap.** |
| `advisor-quest` | 💼 Wealth Advisor | HNW client meeting + Even G2 + in-lens Reg BI suitability prompt |
| (no academic app) | 💻 Engineer | Engineering pack ships as part of the commercial product (Shadow) but is not an academic deliverable. |

### 3.4 Tier-spanning audit protocol

Every decision across all four device clients × five persona packs produces a tamper-evident audit record using WebCrypto SubtleCrypto SHA-256 hash chains. Each record captures: timestamp, decision ID, the council's challenge text, the user's verbal or gestural response, gaze dwell time on each surfaced piece of evidence (XReal and Quest 3S inside-out eye tracking), and the screen or scene context.

The hash chain is exportable in formats acceptable to OCC, CFPB, FINRA, SEC, and EU AI Act Article 14 audit submissions. All generation is on-device; no cloud dependency.

This composition is the **novel contribution** (Section 4).

---

## 4. Novel Contribution

This is the first system to treat **spatial gating as a cryptographic audit primitive across multiple form factors and multiple regulated banking personas**. The contribution is not a 3D dashboard, not a multi-agent debate framework alone, not a compliance log, and not a risk module — it is the composition of all four into a single tamper-evident protocol that maps cleanly onto Fair Lending Act, ECOA, EU AI Act Article 14, and Reg BI, *and that spans daily desktop use, ambient smart-glasses use, and episodic spatial AR review*.

A search of IEEE VR, IEEE ISMAR, ACM CHI, ACM ICAIF, and arXiv (2026-06-17) returns no published work framing spatial UI as a *regulatory primitive* in banking, no prior cross-form-factor compliance audit chain, no prior empirical evaluation of immersive 3D for *financial* anomaly detection, and no prior cross-persona spatial workspace.

Secondary contributions:

- **Orallexa risk upgrade.** Loredana's institutional risk primitives are lifted into Orallexa as typed tool calls, lifting the platform from 5/10 to an expected 8-9/10 on the JPMorgan pressure-test Risk Controls dimension.
- **Empirical XR-wedge finding (`quant-quest`).** Our user study (Section 6) is positioned to be the first peer-reviewed RCT on immersive 3D for *financial* anomaly detection specifically. Kraus 2022 covers general 3D scatter; the financial-specific gap is unfilled. This is a defensible research contribution worth a stand-alone paper.
- **Generalization claim.** The same spatial-gating protocol generalizes across loan origination, wealth advisory, and quant model-risk review with a voice-roster swap and device-fit reconfiguration, demonstrating that embodied compliance is a transferable primitive across regulated banking workflows.

---

## 5. Demo Plan

- **Primary hardware**: **XReal Air 2 Ultra** ($699 each, two units recommended), **Even Realities G2** ($599, one unit minimum for the in-lens contrarian demo), and an Apple Silicon MacBook for desktop demo.
- **Live web demo**: `hello-finance-xr.vercel.app` (URL to be finalized) hosts the WebXR + NRSDK build and the desktop-mock browser demo (`~/Desktop/shadow-mentor/index.html`, runnable today).
- **Optional**: Brilliant Frame ($349) for the Software Engineer pack demo, if time permits.

A **10-minute live demo** will cover:

1. **🛡 Compliance + Even G2 (90s)** — loan officer reviews a file in Excel; in-lens green contrarian whispers ECOA-safe denial reason; bone-conduction audio transcribed to hash chain.
2. **🧮 Quant + XReal Air 2 Ultra JARVIS mode (3 min)** — quant's model PSI tripped; quant walks around floating UMAP manifold to find misclassified cluster; floats AML 5K-node graph to inspect suspicious sub-network; drift attribution timeline floats next to laptop.
3. **📈 Trader + XReal Air 2 Ultra JARVIS mode (2 min)** — trader walks around 3D risk surface to find concentration cliff; bias constellation reveals over-approval pattern; correlation surface deforms across 2007→2009 regime.
4. **💼 Advisor + Even G2 (90s)** — HNW client meeting; in-lens Reg BI checklist; bone-conduction whisper suggests IPS gap; client never sees the device working.
5. **Cross-tier audit export (90s)** — cryptographic audit-trail export shown alongside example OCC, EU AI Act Article 14, and FINRA Reg BI audit submission formats. Gaze-dwell timeline replayed.

The demo ends with the offline-resilience proof: WiFi disconnected mid-demo, the on-device council continues running on the Apple Foundation Model framework.

---

## 6. Evaluation Methodology

Preserved from Loredana's IEEE draft:

- Perception: detection mAP > 0.80, segmentation IoU > 0.70, relative depth error reported
- Latency: frame rate > 60 FPS, motion-to-photon < 22 ms, agent tool-call latency end-to-end < 1.5 s
- Gesture and voice: hand-gesture success > 0.85, voice-intent accuracy > 0.90
- User experience: SUS > 75, NASA-TLX cognitive load reported

Novel additions for v3.1:

- **Compliance integrity**: 100% of decisions across all four device clients produce a tamper-evident audit trail, verified by hash-chain replay; OCC, CFPB, FINRA, SEC, and EU AI Act audit-export formats validated.
- **Brier calibration stability**: 5-voice Brier(XR mode) ≈ Brier(2D control), *p* < 0.05.
- **Recall lift over 2D control** — between-subjects 7-day recall test of specific decision details. Target: at least +15% recall accuracy for XReal Air 2 Ultra spatial mode vs 2D dashboard control, the lower bound of Krokos UMD 2019 effect size.
- **`quant-quest` financial-anomaly RCT**: 30 financial-engineering grad students assigned to either XReal JARVIS mode (fraud UMAP walk-through) or 2D Jupyter notebook control. Outcome: time-to-correct-attribution of injected drift in a controlled fraud-dataset experiment. Target: XReal arm completes attribution at least 30% faster with at least 15% higher accuracy. **This is the first peer-reviewed RCT on immersive 3D for financial anomaly detection.**
- **Gaze-dwell audit fidelity** — eye-tracking logs verify users actually viewed surfaced compliance evidence. Target: 95% of decisions show > 3 seconds of gaze dwell on the relevant voice's evidence card.
- **Risk-primitive accuracy**: Orallexa risk module VaR and Expected Shortfall validated against historical-simulation baseline; factor exposures validated against Fama-French 5-factor model.
- **Cross-tier decision-time friction**: Desktop overlay must add < 5 seconds vs unaided review; XReal JARVIS mode may add up to +20% vs 2D control given the higher-stakes scope.

A **40-subject within-subjects user study** for Compliance + Advisor personas, plus the 30-subject `quant-quest` between-subjects study, IRB approval requested by Loredana through Yeshiva.

---

## 7. Existing Assets (De-Risks the Proposal)

| Asset | Owner | Status |
|---|---|---|
| 5-page HoloFinanceXR IEEE technical report draft | Loredana | Drafted, ready for revisions |
| 120-page BR document (VaR, correlation, factor analysis, agent integration) | Loredana | Drafted |
| Embodied Compliance Council monorepo (8 packages, 41 tests green, v0.1.0 tag) | Alex | Live, github.com/alex-jb/embodied-compliance-council |
| **Bias Constellation (Phase 1 XR artifact, JARVIS mode candidate)** | Alex | Shipped 2026-06-17 (commit `3e8b24c`) |
| **Perception Layer (YOLO-World + SAM2 + Depth Anything V2)** | Alex | Shipped 2026-06-17 (7/7 tests green) |
| **Three-user empirical pain research memos (2)** | Alex | Shipped 2026-06-17 |
| **Shadow canonical product proposal v1.0** | Alex | Shipped 2026-06-17, `~/Desktop/shadow-mentor/docs/shadow-product-proposal.pdf` |
| Orallexa multi-agent system (5 voices, production cron, Brier-audited) | Alex | Live |
| `council-diff` v0.4.2 (OSS Brier audit engine, MIT, npm + skills.sh) | Alex | Live |
| `council-for-slack-2026` (production proof of 5-voice + Brier audit in Slack) | Alex | Live |
| Phase 4 EU AI Act + ECOA evaluation design doc | Alex | Live |
| Three.js + WebXR + NRSDK baseline | W3C + XReal | Standardized |
| Anthropic Claude Opus 4.7 (1M context) | Anthropic | Released 2026-04-16 |
| Apple Foundation Model framework | Apple | Released with iOS 18 / macOS 15 |
| MediaPipe Hands, WebCrypto SubtleCrypto API | Google / W3C | Standardized |

---

## 8. Division of Labor

| Responsibility | Owner |
|---|---|
| 1-page proposal, IEEE paper revisions, presentation delivery | Loredana |
| Native macOS desktop overlay (all personas) | Alex |
| `quant-quest` WebXR + XReal NRSDK build (fraud UMAP + AML graph + drift attribution) | Alex |
| `banking-quest` WebXR scene + Even G2 in-lens contrarian integration | Alex |
| `trading-quest` WebXR + XReal NRSDK build (risk surface + bias constellation + correlation regime) | Alex |
| `advisor-quest` Even G2 in-lens Reg BI prompt | Alex |
| Orallexa risk module integration | Alex with Loredana code review |
| 5-voice council per persona (banking-quest, trading-quest, quant-quest, advisor-quest) | Alex |
| Cryptographic audit-trail protocol + OCC / CFPB / FINRA / EU AI Act export formats | Alex |
| Eye-tracking gaze-dwell logger | Alex |
| User study design (40-subj + 30-subj `quant-quest`), IRB application, NASA-TLX administration | Loredana |
| Customer-facing scenario design | Loredana |

---

## 9. Multi-Deliverable Mapping

| Deliverable | Form | Class / Venue | Estimated Due |
|---|---|---|---|
| 1-page proposal v3.1 (this document) | Markdown + PDF | Dr. Harry NGO (AI for Extended Reality) | 2026-06-17 |
| Server-client multi-agent prototype + 5-page report | Code + report | Dr. Ashikur Nobel | TBD (course-set) |
| Capstone thesis (40-80 pages) | Full literature review, methodology, evaluation, future work | Capstone advisor (Prof. Yang) | 2026-12 |
| Conference paper #1 — cross-persona embodied compliance | 8 pages double-column | **ACM ICAIF 2027** (estimated deadline 2026-09-15); backup IEEE BigData 2026 | 2026-09 |
| Conference paper #2 — first RCT on immersive 3D for financial anomaly detection (`quant-quest`) | 8 pages double-column | **IEEE VR 2027** or **IEEE VIS 2027** | 2026-12 |
| Commercial pilot — Shadow Banking (Phase 3) | Native macOS app, mid-tier wealth-mgmt or boutique IB beachhead | Independent, post-thesis | 2027-01+ |

The codebase is shared; each deliverable provides a distinct framing and evaluation depth.

---

## 10. Commercialization Path — Shadow Banking

The cross-form-factor + cross-persona research insight unlocked today identifies a defensible commercial wedge: **Shadow Banking**, a Desktop + Even G2 + Brilliant Frame + XReal Air 2 Ultra mentor and compliance council product, sold as an enterprise license to mid-tier ($5B-$50B AUM) US banks.

Pricing: base $120K/year + persona packs $1,500-$2,400/seat/year. Sample mid-tier bank deployment $982K ACV. 3-year SOM $4.9M ARR across 5 mid-tier banks. Not part of the academic deliverable; it is the post-thesis commercialization path that the ECC research enables. Documented in `~/Desktop/shadow-mentor/docs/shadow-product-proposal.pdf` (canonical product proposal v1.0).

---

## 11. Alternative Scopes (For Loredana's Review)

**Option A — Cross-persona, cross-device Embodied Compliance Council (this document, recommended).** Strongest novelty (first cross-persona spatial regulatory audit primitive + first RCT on immersive 3D for financial anomaly detection), strongest multi-deliverable fit, two conference paper outputs, and the strongest commercialization path.

**Option B — Three-tier ECC (proposal-v3).** Drops the quant-quest fifth-persona evaluation arm and the second conference paper. Faster to ship; weaker because the financial-anomaly RCT is the strongest empirically defensible research claim.

**Option C — Quest-3S-only Embodied Compliance Council (proposal-v2).** Drops desktop and G2 and XReal. Faster to ship; weakest IEEE paper because the cross-form-factor finding is the central research claim.

**Option D — Generic Banking Workspace (Loredana's original HoloFinanceXR draft).** Lower risk, but loses the multi-agent integration, the cryptographic audit chain, the EU AI Act regulatory hook, and the empirical wedge research.

**Option E — Quant Trading Pre-Trade Compliance.** Pivots to institutional hedge-fund pre-trade compliance. Loses Loredana's banking framing and the broader Fair Lending audience.

We recommend **Option A**.

---

## References (representative; full bibliography in the IEEE paper)

- L. C. Levitchi, *HoloFinanceXR: An AI-Powered Banking XR Workspace*, Final Project Technical Report (draft, 2026)
- L. C. Levitchi, *Aura Alexa Enhancement with Risk Analytics: Business Requirements*, 120-page draft (2026)
- A. X. Ji, *Shadow — One Engine, Three Smart-Glass Clients, Five Persona Packs*, canonical product proposal v1.0 (2026)
- E. Krokos, C. Plaisant, A. Varshney, "Virtual Memory Palaces: Immersion Aids Recall," *Virtual Reality* 23, 2019
- M. Kraus et al., "Immersive Analytics with Abstract 3D Visualizations: A Survey," *Computer Graphics Forum* 41(1):201-229, 2022
- A. Kirillov et al., *Segment Anything*, ICCV 2023
- W3C Immersive Web Working Group, *WebXR Device API*, 2026 candidate recommendation
- XReal NRSDK 3.0 Technical Reference, XReal Inc., 2025
- 12 U.S.C. § 1691 — Equal Credit Opportunity Act (ECOA)
- European Union, *Artificial Intelligence Act* (Regulation 2024/1689), Article 14 — Human Oversight, effective 2026-08-01
- Federal Reserve SR 11-7, Guidance on Model Risk Management, 2011
- OCC Bulletin 2025-16, Disparate Impact and Fair Lending AI Guidance
- ATD State of the Industry Report 2024
- Bloomberg Law, "AI Smart Glasses Workplace Compliance Risks," 2025
- Even Realities G2 Smart Glasses Technical Specifications, 2025
- Anthropic, *Claude Opus 4.7 with 1M Context Window*, 2026-04-16 release notes
- Apple Machine Learning Research, *Third Generation Apple Foundation Models*, 2025

---

*End of proposal v3.1. Loredana, please mark any preferred changes (Option A through E), confirm hardware purchase or borrowing plan for Even G2 + XReal Air 2 Ultra, and return; Alex will revise the technical sections you flag and produce the Dr. Nobel-class companion document by the same deadline. The Orallexa risk-module merge work can begin in parallel as soon as you share the relevant Python files from your 120-page BR document.*
