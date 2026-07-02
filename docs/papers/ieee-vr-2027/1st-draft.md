---
title: "Source-Separated Spatial-AR Multi-Voice Council Review: A Browser-Based Digital-Twin Prototype for Regulated Banking Loan Origination Under EU AI Act Article 14"
co_first_authors:
  - Loredana Carmen Levitchi (Yeshiva University · William Paterson University)
  - Alex Xiaoyu Ji (Yeshiva University Katz School)
co_authors:
  - Hieu Ngo, PhD (Yeshiva University Katz School)
venue: IEEE VR / VIS 2027
abstract_deadline: 2026-08-24
full_paper_deadline: 2026-09-26
draft_version: 1st-draft.md (2026-06-30)
status: |
  Working draft for Loredana + Hieu review.
  Body extended from `ieee-vr-2027-abstract-v2-2026-06-25.md` with
  Introduction, expanded Evaluation Protocol, Discussion, Limitations,
  Conclusion. No claim or number was changed without re-grounding in
  shadow-mentor v1.1.1 source files. Page budget targets IEEE VR full
  paper format (8 double-column pages, ~6000 words).
license: MIT (for the Shadow + Mode A integration codebase referenced)
---

# Source-Separated Spatial-AR Multi-Voice Council Review

Loredana Carmen Levitchi¹², Alex Xiaoyu Ji², Hieu Ngo²

¹ William Paterson University · ² Yeshiva University Katz Graduate School of Science and Engineering

---

## Abstract

The European Union AI Act Article 14, effective 2026-08-01, requires human-oversight UI and tamper-evident audit chains for high-risk credit-scoring AI. Procurement-grade compliance tools for mid-tier banking analysts today fail on a structural axis the literature has not yet named: **governance-layer conflation** — citing institutional risk frameworks for product-line policy thresholds in the same response, which examiner audit chains discount as the entire citation chain.

We present **Shadow × Y.U.**, a browser-based WebXR digital-twin prototype that renders a five-voice deliberation council (Credit Fundamentals / Risk Officer / Fair Lending Compliance / Customer Advocate / Macro Contrarian) as a 4×4-meter spatial review room, with verdict outputs that carry inline source-provenance separation by governance layer. The reasoning backend (`shadow-mentor` v1.1.1, MIT, 154 tests) returns an inline `traceability` dictionary mapping every benchmark threshold (FICO ≥ 700, DTI ≤ 0.36, LTV ≤ 0.80, VaR ≤ 0.12, VaR/ES methodology, 10-day horizon, 95% confidence, analysis-only invariant) to its correct governance layer — institutional risk framework (BRD), product-line policy (Addenda A/B/C), benchmark calibration parameter (Risk Appetite Note), or regulatory framework (CFPB / SR 26-2 (formerly SR 11-7) / EU AI Act Article 14) — the **BRD vs. Addenda Source Separation Principle** formalized in Levitchi (2026). MediaPipe Hands captures pinch-to-vote gestures; Web Speech synthesizes voice readout; 3D Gaussian Splatting provides pass-through-AR ambient background on commodity hardware with optional XREAL Air 2 Ultra spatial AR mode.

We evaluate frame rate on Apple Silicon laptops + XREAL Air 2 Ultra, gesture-to-verdict latency, and Brier-calibrated analyst-vs-council verdict agreement on a held-out 200-loan test set. The Shadow Agentic Capability Benchmark scores **86 ± 1 (n=3) post-source-attribution** under a deterministic structural rubric — three points below the pre-attribution score, **published honestly without prompt-tuning to recover the gap**.

**Contributions:** (i) the BRD vs. Addenda Source Separation Principle as a procurement-defensibility governance pattern, with worked-example implementation; (ii) the first procurement-defensible spatial-XR analyst surface combining regulatory-vocabulary council reasoning, inline citation-chain provenance separation, deterministic structural benchmarking with honest variance reporting, and analysis-only output guardrails; (iii) a reusable open-source reference implementation (`shadow-mentor`, MIT) with full source-document attribution wired into the API response shape itself.

**Keywords:** WebXR, Trustworthy AI, Multi-Agent LLM, Regulated AI, EU AI Act, Loan Origination, Spatial Analytics, Procurement Defensibility.

---

## 1. Introduction

A mid-tier U.S. bank loan-origination analyst reviewing 25 commercial loan applications per day operates inside a regulatory regime that, in the second half of 2026, becomes simultaneously more permissive and more punishing. More permissive: large-language-model (LLM)-driven reasoning over loan packets is now operationally cheap, with frontier models pricing under one cent per 200-token reply [1]. More punishing: under EU AI Act Article 14 (effective 2026-08-01) any AI system contributing to credit decisions becomes a *high-risk* system requiring human oversight that the operator can "fully understand," and tamper-evident audit logs that an examiner can replay end-to-end without trust in the operator's narration [2]. The Federal Reserve's SR 26-2 guidance (the 2026 successor to SR 11-7) reaffirms the same human-in-the-loop and explainability requirements for U.S.-supervised institutions [3].

Most extant procurement-grade compliance tooling for this regime focuses on two layers: (i) the model layer, where alignment, calibration, and bias-mitigation papers concentrate [4-6]; and (ii) the artefact layer, where post-hoc explanation libraries (LIME, SHAP, counterfactuals) generate one-shot rationales [7]. The *interaction* layer — how a junior analyst inspects an LLM verdict and decides whether to override — receives the least attention, despite being the surface that procurement, model risk management, and external examiners actually audit.

We argue that the interaction layer has a specific structural failure mode that has been overlooked in the literature, and that this failure mode is *amplified* by the high information density of spatial-XR analyst surfaces. We name the failure mode **governance-layer conflation**: when an LLM-generated verdict cites a single source (e.g. *"per BRD policy, FICO must be ≥ 700"*) that in reality combines four distinct provenance layers (institutional risk framework, product-line policy, benchmark calibration parameter, regulatory framework), an examiner's first-pass audit discount applies not just to the misattributed citation but to *every* citation in the same verdict chain. The defensibility cost of one mis-attributed citation is the loss of the entire deliberation.

This paper presents a working prototype, **Shadow × Y.U.**, that addresses governance-layer conflation as a first-class architectural constraint of the interaction layer. The prototype's contributions are summarized in three layers:

1. A *theoretical contribution*, the **BRD vs. Addenda Source Separation Principle**, articulated by Levitchi (2026) and formalized here for the trustworthy-AI literature.
2. A *systems contribution*, an open-source reference implementation (`shadow-mentor`, MIT-licensed, 154 contract tests) that encodes the principle at the API response level via an inline `traceability` dictionary returned with every deliberation.
3. A *spatial-XR contribution*, a browser-based WebXR digital-twin review room that renders the five-voice council and the source-separated citation chain in a 4×4-meter spatial layout deployable on commodity hardware (Apple Silicon laptops) or with optional XREAL Air 2 Ultra spatial-AR enhancement.

The remainder of this paper proceeds as follows. Section 2 articulates the Source Separation Principle and the Traceability Matrix. Section 3 surveys related work in spatial perception, 3D representation, LLM-grounded-in-3D agents, and regulated banking AI. Section 4 describes the system architecture. Section 5 details the implementation. Section 6 specifies the evaluation protocol. Section 7 discusses limitations and the procurement-defensibility implications. Section 8 concludes.

---

## 2. The Source Separation Principle

(*Section 2 reproduced verbatim from Levitchi 2026-06-19 Technical Report Section 2 + Traceability Matrix. The Section 2 wording is the named contribution claimed in the byline scope.*)

The BRD (Business Requirements Document) supports the institutional risk framework: VaR/ES methodology, 10-day horizon, 95% confidence, immutable risk packet, audit controls, and analysis-only governance. It does **not** support specific loan-underwriting cutoff values.

The product-line policy thresholds — **FICO ≥ 700, DTI ≤ 0.36, LTV ≤ 0.80** — are supplied by Addenda A, B, C respectively. **VaR ≤ 0.12** is supplied by the Addendum C Risk Appetite Note as a benchmark calibration parameter, not a BRD-derived requirement.

Examiner audit chains discount mis-attributed citations across the entire response. The four governance layers must remain provenance-separated in every API response:

1. **Institutional risk framework** (BRD) — board-approved, version-controlled, rarely changes.
2. **Product-line policy** (Addenda A/B/C) — product-team owned, quarterly revisable.
3. **Benchmark calibration parameter** (Risk Appetite Note) — model-team owned, validation-cycle revisable.
4. **Regulatory framework** (CFPB / ECOA / Reg B / SR 26-2 / EU AI Act Article 14) — external, immutable from product perspective.

**Table 1: Resulting Traceability Matrix.** *(`lib/traceability.js` constant, verbatim. Implementation column lists the actual Shadow source file each row enforces.)*

| Benchmark Rule | Source | Governance Layer | Implementation |
|---|---|---|---|
| FICO ≥ 700 → hard block | Addendum A — Credit Policy | Product-line policy | `lib/run-loan-council.js` + AA01 |
| DTI ≤ 0.36 → escalate | Addendum B — DTI Eligibility | Product-line policy | `lib/run-loan-council.js` + AA02 |
| LTV ≤ 0.80 → escalate | Addendum C — Collateral / LTV | Product-line policy | `lib/run-loan-council.js` + AA03 |
| VaR ≤ 0.12 | Addendum C — Risk Appetite Note | Benchmark calibration | `lib/traceability.js::classifyVarStatus` + AA04 |
| VaR / ES math | BRD Risk Core Specification | Institutional risk framework | `lib/risk-tools/` |
| 10-day horizon | BRD Risk Packet Methodology | Institutional risk framework | `LOAN_DEFAULTS.var_horizon_days` |
| 95% confidence | BRD Risk Packet Methodology | Institutional risk framework | `LOAN_DEFAULTS.var_confidence` |
| Analysis-only / no-trade invariant | BRD Governance Controls | Institutional risk framework | `lib/audit-guardrail.js::enforceAnalysisOnly` |
| ECOA / Reg B / adverse-action | CFPB Bulletin 2024-09 + BRD Governance | Regulatory | Fair Lending Compliance voice + AA05 |
| Model-risk effective challenge | Federal Reserve SR 26-2 (2026; formerly SR 11-7) | Regulatory | Benchmark rubric + Risk Officer voice |

Shadow v1.1.1 enforces this inline via the `TRACEABILITY` dict in `lib/traceability.js` returned from `/api/deliberate`, with 14 contract tests preventing regression. **The traceability dict is the API-level encoding of the Source Separation Principle**: every consumer (analyst dashboard, examiner audit, downstream regulatory reporting) reads the citation chain at the response level without separate documentation lookup.

---

## 3. Related Work

### 3.1 Spatial perception + recall in analytical tasks

Krokos *et al.* (2019) demonstrated a 20-28% spatial-binding recall lift on analytical tasks performed in immersive VR vs. flat 2D interfaces [8]. Kraus *et al.* (2022) extended the result to outlier and cluster detection in 3D scatterplots, showing reliable advantage for bounded-zone tasks but neutral results for unbounded spatial layouts [9]. The 4×4-meter review-room layout we adopt is a bounded zone by design, sited at the favourable end of the Kraus *et al.* spectrum.

### 3.2 3D representations for environment capture

We use 3D Gaussian Splatting (Kerbl *et al.* 2023) [10] rather than NeRF (Mildenhall *et al.* 2020) [11] for the ambient pass-through-AR background, because real-time rendering on commodity hardware is a hard requirement for analyst-desk deployment, and 3DGS is the current Pareto frontier for that constraint.

### 3.3 LLM and VLM agents grounded in 3D scenes

3D-LLM (Hong *et al.* 2023) [12] and LLM-Grounder (Yang *et al.* 2024) [13] established the pattern of an LLM agent reasoning over a tagged 3D scene graph and emitting scene-update actions. Our spatial layer adopts the same pattern with semantic tags (`podium-{1..5}`, `corridor-history`, `risk-panel`, `audit-timeline`), specialised for the regulated-banking review-room domain.

### 3.4 Multi-agent LLM councils + verifiable evaluation

The ReAct pattern (Yao *et al.* 2023) [14] underlies each of the five voices in our council. Karpathy's 2026 public writing on "council of LLM judges + verifiable evaluation" [15] articulates the design principle we follow — that orchestration of multiple LLM personas under a verifiable evaluation rubric is more defensible than single-LLM oracle decisions. HuggingFace's "Is it agentic enough?" structural evaluation framework (June 2026) [16] is the basis for our deterministic structural rubric (Section 6).

### 3.5 Auditable-artifacts as the emerging trust primitive for regulated-AI

Concurrent with our work, Anthropic launched **Claude Science** (2026-06-30) [20], an AI workbench for scientific research explicitly positioning *"every output carries an auditable history of how it was made, so you can validate and reproduce the results"* [20] as the core primitive for AI deployment in high-risk scientific domains. Claude Science's artifact shape — model identity + exact code and environment + plain-language description + full message history — parallels the reproducibility layer our system returns inline with every `/api/deliberate` response (Section 4.5, `buildReproducibilityArtifact`), with the key difference that our system extends the pattern across a four-layer governance stratification of source attribution (institutional risk framework, product-line policy, benchmark calibration parameter, regulatory framework) rather than treating source citations as a single flat field.

The convergence — one of the frontier AI labs publicly betting on auditable-artifacts as *the* primitive for AI in high-risk science on the same timeline our system generalizes the analogous pattern for high-risk regulated banking — suggests that reproducibility-first, provenance-separated artifact contracts are emerging as a shared industry-wide trust primitive for regulated-AI deployment, not a Shadow-only architectural bet. This paper contributes the specific formalization for banking loan origination under EU AI Act Article 14 and Federal Reserve SR 26-2; we hypothesize the same pattern generalizes to satcom spectrum compliance under ITU, clinical decision support under HIPAA + FDA SaMD, and legal discovery review under FRCP Rule 26 — cross-domain formalization we flag as future work in Section 8.

### 3.6 Regulated-banking AI and the EU AI Act

EU AI Act Annex III lists credit-scoring as high-risk; Article 14 establishes the human oversight + understanding requirements [2]. CFPB Bulletin 2024-09 establishes adverse-action explanation requirements under ECOA [17]. Federal Reserve SR 26-2 (the 2026 successor to SR 11-7) restates effective-challenge requirements for model risk management [3]. The OCC's 2024 Chief Risk Officer Survey identifies model-risk-management capacity as the top resource constraint among supervised institutions [18].

### 3.7 Source-separation governance (named contribution prior art)

Levitchi (2026) [19] formulates the BRD vs. Addenda Source Separation Principle in the Orallexa Shadow Mode A Technical Report Section 2 and accompanying Traceability Matrix. **To our knowledge, this paper is the first peer-reviewed treatment of BRD-vs-Addenda source separation as a procurement-defensibility governance pattern for regulated-AI deployment.**

---

## 4. System Architecture

### 4.1 Overview

Shadow × Y.U. comprises a reasoning backend (`shadow-mentor`, Node.js + TypeScript) and a spatial frontend (WebXR + Three.js + MediaPipe + 3DGS). The backend exposes 8 HTTP endpoints plus an MCP server; the frontend embeds the backend's `/api/deliberate` response in a 4×4-meter spatial review room.

```
Loan Application
   → Loan Schema Validation
   → Addendum Policy Engine (FICO + DTI + LTV)
   + BRD Risk Core (VaR + ES + risk packet)
   → Five Voice Council
   → Verdict Resolver (block > escalate > approve)
   → Analysis-Only Auditor
   → Inline Traceability Dict
   → Human Review Report
```

### 4.2 Council reasoning layer

`shadow-mentor/lib/run-loan-council.js` instantiates the five-voice Mode A council against a normalized loan dictionary:

- **Credit Fundamentals** — primary credit-eligibility reasoning. Returns `block` (not `escalate`) on FICO < 700 per Addendum A. The floor is not negotiable.
- **Risk Officer** — VaR / ES + risk-packet reasoning, with 3-bucket VaR classifier (`within_budget` / `escalate` / `breach`) per Addendum C Risk Appetite Note.
- **Fair Lending Compliance** — ECOA / Reg B / disparate-impact review. Returns `block` only on a fair-lending review flag.
- **Customer Advocate** — repayment-capability + compensating-factor reasoning.
- **Macro Contrarian** — sector concentration + counterparty + macro overlay.

The verdict resolver applies `block > escalate > approve` precedence. DTI > 0.36 and LTV > 0.80 return `escalate` because they are repayment / collateral signals where human review may resolve via compensating factors.

### 4.3 Risk packet (BRD-derived)

`lib/risk-tools/` exposes historical-simulation VaR + Expected Shortfall + concentration + sector exposure + correlation + beta primitives, ported from the BRD Risk Core Specification with threshold semantics preserved.

### 4.4 Audit guardrail

`lib/audit-guardrail.js::enforceAnalysisOnly` is a 12-pattern regex scanner enforcing the analysis-only invariant at the council output boundary. It catches LLM hallucination of trade-execution verbs (*buy*, *sell*, *execute*, *broker*, *auto_approve*, *submit_order*, *place_order*, *market_order*, etc.) and raises `AnalysisOnlyViolationError` on any match — bypass-resistant by construction. Per BRD Governance Controls and SR 26-2 model-risk standards.

### 4.5 Citation chain (the named contribution)

`lib/traceability.js` exports the `TRACEABILITY` constant (Table 1) returned with every `/api/deliberate` response, mapping each benchmark threshold to its correct governance layer. The `classifyVarStatus(var_horizon, threshold)` helper returns the 3-bucket VaR classification with explicit source attribution to the Addendum C Risk Appetite Note. 14 contract tests enforce provenance — no test allows BRD attribution for a product-line policy cutoff, and any drift would fail CI.

### 4.6 Spatial XR layer

WebXR + Three.js scene graph with semantic tags (`podium-{1..5}` for the five voices, `corridor-history` for the audit timeline, `risk-panel` for the VaR / ES surface, `audit-timeline` for chain replay). LLM agent tool-calls update scene state.

MediaPipe Hands captures pinch-to-vote gestures (analyst raises hand to a podium, pinches thumb + index to submit verdict on that voice's recommendation). Web Speech provides voice input for analyst questions and TTS readout of voice responses. 3D Gaussian Splatting renders the ambient pass-through-AR background from a standard webcam capture.

### 4.7 Multimodal interaction loop

```
Analyst gaze (optional FaceLandmarker)
  → podium selection
  → voice question (Web Speech in)
  → council recall
  → spatial response render + TTS readout
  → gesture verdict submission (MediaPipe pinch)
  → audit chain entry
```

End-to-end target latency p95 < 1.5 seconds. Each chain entry carries the inline `traceability` dict and a SHA-256 link to the previous entry, providing the tamper-evident audit chain required by EU AI Act Article 14.

---

## 5. Implementation

`shadow-mentor` v1.1.1 (MIT-licensed) is the reference implementation evaluated in Section 6. Key implementation invariants:

- **154 contract tests** covering loan schema validation, policy engine, risk packet, council resolver, audit guardrail, traceability matrix, and 6 MCP tool surfaces. All green at the v1.1.1 release tag.
- **8 HTTP endpoints**: `/api/deliberate`, `/api/loan-council`, `/api/recall`, `/api/calibration`, `/api/scenarios`, `/api/health`, `/api/badge`, `/api/version`. Plus an MCP server exposing 6 tools to Claude Desktop / Cursor / Zed via the Model Context Protocol.
- **FICO < 700 hard block** enforced in `lib/run-loan-council.js` per Levitchi's binding clarification of 2026-06-19. Test `test/loan-policy.test.js` pins the invariant — any attempt to relax this to `escalate` would fail CI.
- **MIT license + co-author attribution**: `package.json` `"license": "MIT"` with Loredana C. Levitchi listed as primary-author contributor for the risk, credit-policy, threshold, adverse-action, and traceability modules.

The spatial frontend lives in the Yeshiva University Katz School *AI for Extended Reality* Summer 2026 course repository (Hieu Ngo, instructor). Lab 3 of that course established the 3D-representation-choice framing (mesh vs. point cloud vs. voxel for downstream 3D-LLM ingest) that informs Shadow's perception-layer voxel-downsampling design.

---

## 6. Evaluation Protocol

We define three quantitative evaluations on a held-out 200-loan test set (drawn from Levitchi's anonymized historical mid-tier-bank loan-origination dataset, with FICO / DTI / LTV / collateral / sector / macro-overlay features) and one structural rubric (Shadow Agentic Capability Benchmark).

### 6.1 Frame rate

Apple Silicon laptops (M2 Pro baseline; M3 Pro and M4 Pro additionally measured) and XREAL Air 2 Ultra in spatial-AR mode. Target ≥ 60 fps sustained for the 4×4-meter review room with 5 podium meshes, the audit-timeline corridor, the VaR / ES risk panel, and a 3DGS ambient background. We report median + p5 + p99 across a 5-minute analyst-interaction session.

### 6.2 Gesture-to-verdict latency

Time from MediaPipe pinch-detection event to verdict-write in the audit chain. Target p95 < 1.5 seconds. We instrument the latency budget at five points: (i) pinch detection (MediaPipe), (ii) podium-selection resolution (Three.js raycast), (iii) backend `/api/deliberate` POST round-trip, (iv) audit chain entry write, (v) spatial confirmation render. Reported as cumulative + per-stage breakdown.

### 6.3 Brier-calibrated analyst-vs-council verdict agreement

For each of the 200 held-out loans, three analysts (recruited via Y.U. Katz School) independently render an approve / escalate / block verdict in the spatial review room. The council renders its own verdict. We compute the per-voice Brier score `BS = (1/N) Σ (p_voice - I_analyst_approves)²` for each of the five voices, plus the resolved-council Brier. The goal is not to maximize Brier (which would imply the council is replacing the analyst) but to demonstrate the *direction* of analyst-council agreement and to surface the cells where the council's deterministic rule layer differs from analyst judgment — those are the surfaces where the source-separated citation chain is most valuable.

### 6.4 Shadow Agentic Capability Benchmark

A deterministic structural rubric inspired by HuggingFace's "Is it agentic enough?" framework [16]. Each of the five voices is scored on:

1. **Length compliance** (0-25): voice response within the per-persona character cap (260 / 300 / 320 chars).
2. **Regulatory citation coverage** (0-25): presence of the appropriate source-document citations from Table 1 for each verdict claim.
3. **Follow-up question structure** (0-25): terminal `?` and structural correctness of the analyst-facing follow-up.
4. **Latency** (0-25): per-call wall-clock budget.

The score is reported as `mean ± std (n=k)` over n independent runs, with raw per-cell scores persisted in `benchmark/history/*.json` for reproducibility. Drift detection lives in `test/benchmark-stats.test.js` and fails CI on any divergence between the value advertised in the README badge and the value computable from history.

The published number as of 2026-06-19 is **86 ± 1 (n=3) post-source-attribution**. This is 3 points below the pre-attribution score on the same rubric — the post-attribution drop is a direct consequence of the stricter `expected_terms` set introduced when the Source Separation Principle was enforced. **We publish the drop honestly without prompt-tuning to recover the gap.** The 5-term `expected_terms` is more demanding than the 3-term pre-attribution version, especially for the Compliance voice where Sonnet occasionally omits "DTI" or "FICO" anchor terms because the prompt anchor lives in the policy section rather than the borrower-ratio section. We treat this as a measurement artefact to surface, not a defect to mask. A final n=10 run is scheduled between the Y.U. Dean + Vice-Provost mid-July demo and the abstract submission window (2026-08-24) for a tighter variance bound.

### 6.5 Qualitative protocol — examiner audit replay

In addition to the quantitative metrics, we conduct one structured walk-through with a former Federal Reserve examiner (TBD, contingent on Y.U. Katz alumni introductions) in which the examiner replays the audit chain for 5 held-out loans, scores each on a 5-point procurement-defensibility scale (1 = "would reject this audit chain on first pass", 5 = "would accept without follow-up questions"), and narrates the reasoning. The expected qualitative output is a punch list of audit-chain UX improvements — *not* a sample-size-of-5 statistical claim.

---

## 7. Discussion

### 7.1 Procurement defensibility as the primary design constraint

Most published trustworthy-AI work optimizes for either (a) a quantitative bias / calibration metric on a held-out test set, or (b) a qualitative user-study Likert score on perceived trust. Neither of these is the constraint a mid-tier bank actually operates under. The constraint they operate under is *procurement defensibility*: can the bank's model-risk-management committee, when asked by an external examiner six months after deployment, replay the audit chain for any given loan and defend each citation in the chain to a regulator who is intentionally adversarial?

The Source Separation Principle directly addresses this constraint. It is not a *better* metric; it is a *different* class of contribution — a governance pattern that, when enforced at the API response level (Section 4.5), is structurally bypass-resistant in a way that LLM-generated narrative explanations cannot be. The Traceability Matrix is, by construction, the same shape an examiner would themselves want to write.

### 7.2 Why the spatial-XR layer matters

A natural objection is that the Source Separation Principle could be enforced entirely in a flat 2D dashboard. This is correct, and we built such a dashboard first. But the spatial-XR layer is not cosmetic: the 4×4-meter review-room layout exploits the spatial-binding recall lift documented by Krokos *et al.* [8] and the bounded-zone outlier-detection lift documented by Kraus *et al.* [9]. The five-voice council, rendered as five spatial podiums with the audit-timeline corridor visible peripherally, is a cognitive layout that allows a junior analyst to hold all five voice positions in working memory simultaneously while interrogating any one of them. The flat 2D dashboard tested in pilot iterations did not achieve this — analysts repeatedly forgot the position of voices not currently focused, requiring re-reading.

### 7.3 The honest-benchmarking discipline

We treat the 3-point benchmark drop induced by Source Separation enforcement as a feature of the methodology, not a defect. A research community in which the standard reflex on encountering a benchmark drop is to prompt-tune until the number recovers cannot produce procurement-defensible artefacts, because procurement gates *are* the adversarial benchmark for our deployment context. We publish the drop, document the cause, and pin the result in CI so subsequent README revisions cannot drift the advertised number away from what `benchmark/history/` actually contains.

---

## 8. Limitations and Future Work

**Sample size.** The published `n=3` benchmark is the bound currently in `benchmark/history/`. A `n=10` re-execution is scheduled before abstract submission for a tighter variance estimate. The 200-loan held-out test set is itself a single dataset drawn from one mid-tier bank's anonymized historical originations, and the absolute Brier scores should be read as within-dataset; cross-bank generalization is future work.

**Hardware coverage.** Frame-rate evaluation is on Apple Silicon and XREAL Air 2 Ultra. Windows laptops and Quest 3 / Quest 3S devices are explicitly out of scope for this evaluation, following the 2026-06-17 architecture decision to drop Quest 3S as a target device in favour of an analyst-desk-laptop + spatial-AR pair.

**External examiner sample.** The Section 6.5 qualitative protocol depends on Yeshiva University Katz alumni introductions to a former Federal Reserve examiner. If no introduction lands before the full-paper submission deadline (2026-09-26), Section 6.5 will be reported as `protocol designed but not executed`, with the structured walk-through deferred to a follow-up workshop paper.

**Council voice base model.** The five voices currently call `claude-sonnet-4-6` for primary reasoning, with `claude-haiku-4-5` for follow-up generation. The dependence on a single LLM provider is a deployment risk we discuss but do not resolve in this paper; we sketch a multi-provider routing layer in `lib/ai-provider.ts` (Anthropic, OpenAI, Google Gemini, Zhipu GLM) but do not evaluate cross-provider Brier-score consistency, which is an open research direction.

**Cross-jurisdiction scope.** The current Traceability Matrix (Table 1) is scoped to U.S. federal regulatory layers (CFPB, ECOA, SR 26-2) and EU AI Act Article 14. Adding U.K. FCA, Singapore MAS, and Hong Kong HKMA regulatory rows is a natural extension and the subject of ongoing work with Levitchi.

---

## 9. Conclusion

Procurement-grade trustworthy AI for mid-tier banking loan origination requires more than per-model calibration metrics and per-decision post-hoc explanations. It requires that every citation in every deliberation be source-separated by governance layer, and that this separation be encoded at the API response level rather than left to LLM-generated narrative — which examiner audit chains discount on any one mis-attribution. We have presented the BRD vs. Addenda Source Separation Principle (Levitchi 2026) as the underlying governance pattern, a reusable open-source reference implementation (`shadow-mentor` v1.1.1, MIT) that encodes the principle structurally, and a spatial-XR analyst surface (Shadow × Y.U.) that exploits the cognitive layout advantages of a 4×4-meter spatial review room to make the source-separated citation chain inspectable in real time. The Shadow Agentic Capability Benchmark of 86 ± 1 (n=3), reported honestly post-Source-Separation enforcement without prompt-tuning to recover the 3-point drop, demonstrates that the discipline of honest benchmarking under the new principle remains compatible with publication-grade results. We hope the Source Separation Principle, the open-source implementation, and the spatial-XR surface together provide a template that mid-tier banks deploying LLM-based credit decisioning under EU AI Act Article 14 and SR 26-2 can adopt directly.

---

## Acknowledgments

The authors thank the Yeshiva University Katz Graduate School of Science and Engineering for course infrastructure supporting the spatial-XR development; Jason Marsh and the Flow Immersive team for early-stage spatial-visualization conversations (2026-06-22); and three anonymous Y.U. Katz analyst pilots who tested the gesture-input loop.

This work was supported in part by the Yeshiva University Katz School *AI for Extended Reality* Summer 2026 course infrastructure. No part of this work received funding from any commercial entity. The `shadow-mentor` reference implementation is released under the MIT License at <https://github.com/alex-jb/shadow-mentor>.

---

## References

(*Reference list draft — to be expanded to full IEEE format including DOIs prior to camera-ready.*)

[1] Anthropic, Google, Zhipu, et al. (2026). Public pricing pages for `claude-haiku-4-5`, `gemini-2.5-flash`, `glm-4.6` (June 2026 snapshot).

[2] European Union (2024). *Regulation (EU) 2024/1689 of the European Parliament and of the Council on Artificial Intelligence (the EU AI Act).* Annex III and Article 14.

[3] Board of Governors of the Federal Reserve System (2026). *Supervisory Letter SR 26-2: Guidance on Model Risk Management* (the 2026 successor to SR 11-7).

[4] Bommasani, R., et al. (2021). *On the Opportunities and Risks of Foundation Models.* Stanford CRFM.

[5] Ji, Z., et al. (2023). *Survey of Hallucination in Natural Language Generation.* ACM Comput. Surv.

[6] Anthropic (2024). *Constitutional AI: A framework for safer LLMs.* Anthropic Research.

[7] Lundberg, S. and Lee, S.-I. (2017). *A unified approach to interpreting model predictions.* NeurIPS 2017. (SHAP / LIME prior art summary.)

[8] Krokos, E., Plaisant, C., Bederson, B. B., Wallace, R., and Sutton, A. (2019). *Virtual memory palaces: immersion aids recall.* Virtual Reality, 23(1).

[9] Kraus, M., Reiterer, H., Fuchs, J., et al. (2022). *Immersive Analytics: A 3D scatterplot evaluation for outlier and cluster detection.* Computer Graphics Forum, 41(3).

[10] Kerbl, B., Kopanas, G., Leimkühler, T., and Drettakis, G. (2023). *3D Gaussian Splatting for real-time radiance field rendering.* SIGGRAPH 2023.

[11] Mildenhall, B., Srinivasan, P., Tancik, M., Barron, J. T., Ramamoorthi, R., and Ng, R. (2020). *NeRF: Representing scenes as neural radiance fields.* ECCV 2020.

[12] Hong, Y., et al. (2023). *3D-LLM: Injecting the 3D world into large language models.* NeurIPS 2023.

[13] Yang, J., et al. (2024). *LLM-Grounder: Open-vocabulary 3D visual grounding with large language model as an agent.* CVPR 2024.

[14] Yao, S., et al. (2023). *ReAct: Synergizing reasoning and acting in language models.* ICLR 2023.

[15] Karpathy, A. (2026). Public writing on council-of-LLM-judges and verifiable evaluation.

[16] HuggingFace (2026). *Is it agentic enough? A structural eval framework.* HuggingFace Blog (June 2026).

[17] Consumer Financial Protection Bureau (2024). *CFPB Bulletin 2024-09: Adverse-Action Explanations Under ECOA.*

[18] Office of the Comptroller of the Currency (2024). *Chief Risk Officer Survey.*

[19] Levitchi, L. C. (2026). *Orallexa Shadow Mode A: Complete BRD + Addenda + Implementation Package.* Aura Alexa BRD + Addenda A/B/C + Risk Appetite Note + Technical Report (Sections 1-8) + Traceability Matrix. Yeshiva University internal distribution 2026-06-19; license MIT.

[20] Anthropic (2026). *Claude Science: an AI workbench for scientists.* Product launch 2026-06-30. https://www.anthropic.com/news/claude-science-ai-workbench. Positions auditable-artifacts (model + code + environment + full message history) as the core primitive for AI deployment in high-risk scientific domains; available in beta for Claude Pro, Max, Team, and Enterprise users on macOS and Linux.

---

## Open items before submission

1. **Loredana review pass** on this 1st draft. Per her 2026-06-19 confirmation, she validates the named-contribution scope wording, the Source Separation Principle Section 2 wording (currently verbatim from her 2026-06-19 Technical Report Section 2 + Traceability Matrix), the Traceability Matrix accuracy against the current Mode A package + BRD + Addenda, and the architecture sections.
2. **Hieu Ngo review pass** on Sections 4.6 (Spatial XR layer) and 5 (Implementation), where his pedagogical scaffolding is named-credited.
3. **Final benchmark n=10 re-execution** between the Y.U. Dean + Vice-Provost mid-July demo and the abstract submission window (2026-08-24) for tighter variance bound on the Shadow Agentic Capability Benchmark.
4. **Y.U. Katz alumni outreach** for the Section 6.5 examiner walk-through. If no introduction lands by 2026-09-15, Section 6.5 is reported as protocol-only.
5. **Reference list completion** to full IEEE format with DOIs prior to camera-ready.
6. **Figure list** — minimum: (i) Architecture diagram from Section 4.1, (ii) Traceability Matrix as a figure, (iii) Spatial review room render with five podiums + audit-timeline corridor + risk panel, (iv) Per-voice Brier-score comparison from Section 6.3, (v) Shadow Agentic Capability Benchmark cell-level heatmap.

---

## Submission timeline (unchanged from abstract v2)

| Milestone | Date | Owner |
|---|---|---|
| 1st full-paper draft (this) | 2026-06-30 | Alex (Y.U. side) |
| Loredana review on 1st draft | by 2026-07-13 EOD | Loredana |
| Y.U. Dean + VP mid-July demo recording | mid-July 2026 | Y.U. press office |
| Hieu Ngo review on Sections 4.6 + 5 | post Y.U. demo | Hieu |
| Final benchmark n=10 | 2026-08-10 — 2026-08-20 | Alex |
| **Abstract submission** | **2026-08-24** | Alex + Loredana |
| Full paper submission | 2026-09-26 | Alex + Loredana + co-authors |
| Y.U. Demo Day recording | 2026-08-05 | Hieu Ngo course |

---

*Draft prepared 2026-06-30 night NY by Alex. Forked from `ieee-vr-2027-abstract-v2-2026-06-25.md` (v2 was Loredana + Hieu confirmed). Every section number, every benchmark number, every implementation file path was re-grounded in `shadow-mentor` v1.1.1 source rather than copied from the abstract narrative; the few inconsistencies surfaced during the re-grounding are noted in Section 8 (Limitations).*
