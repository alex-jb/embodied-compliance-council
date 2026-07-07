---
title: "Calibration Discipline as the Audit Primitive for AI-Assisted Trade Decisions: A Cross-Persona Framework with Cryptographic Provenance"
authors:
  - Alex Xiaoyu Ji (Yeshiva Katz School)
  - Michael Yang, PhD (Yeshiva Katz School, capstone advisor, quant research faculty)
  - Loredana Carmen Levitchi (Yeshiva University · William Paterson University) [co-author on banking-domain regulatory citations]
venue: "ACM International Conference on AI in Finance (ICAIF) 2026, Milan"
abstract_deadline: 2026-08-02 (27 days from 2026-07-06)
paper_deadline: 2026-08-02 (same as abstract for full papers)
draft_version: skeleton v0.1 (2026-07-06)
status: skeleton for Yang review — do not submit without Yang's co-author sign-off
license: MIT (Shadow + Orallexa references implementations are MIT + public)
target_page_count: 8-10 pages ACM double-column format
---

# Calibration Discipline as the Audit Primitive for AI-Assisted Trade Decisions

## Structure (skeleton for Yang review)

Each section below is a placeholder with (a) the argument the section defends and (b) the specific artifact / dataset / equation the section will cite. Prose to be written in the final draft; skeleton makes the argument structure legible before we spend the 27 days writing.

---

## Abstract (~180 words, camera-ready target)

The literature on AI-assisted trade decisions treats accuracy (Sharpe, information ratio, hit rate) as the primary evaluation metric. We argue that accuracy is a necessary but insufficient guarantee for regulated deployment: an accurate but miscalibrated model is a compliance liability under SR 26-2, Reg BI, and MiFID II best-execution rules, because *the model's confidence in each decision cannot be defended to a regulator*. We propose **calibration discipline as the audit primitive** — a framework where every trade decision emits (i) a probability estimate with a known Brier-score reliability curve, (ii) a cryptographic attestation binding that probability to the model version and the reason-code dictionary that produced it, and (iii) a governance-layer citation chain that maps every threshold used in the decision to its correct source document (institutional risk framework, product-line policy, benchmark calibration parameter, or regulatory framework). We instantiate the framework in two open-source reference implementations: **Orallexa** (Python quantitative trading agent, MIT) and **Shadow** (Node.js banking compliance council, MIT, 668 tests). We evaluate on a 200-decision held-out test set and report calibration decomposition (reliability, resolution, uncertainty) per persona, without prompt-tuning, alongside accuracy.

---

## 1. Introduction (~1.5 pages)

**Argument to defend:** the AI-in-finance literature has consolidated on accuracy metrics that are silently *conditional on the model's confidence being well-calibrated*. Section 1 argues that (a) that assumption is empirically false for LLM-based trade decisioning at production scale, (b) miscalibration is not neutral — it is a regulatory liability under SR 26-2, Reg BI, and MiFID II best-execution, and (c) calibration discipline can be treated as a first-class engineering primitive (measurable, testable, deterministically bound to the model version via cryptographic attestation) rather than a post-hoc analytical exercise.

**Concrete anchor to cite:** the CFPB Circular 2022-03 requirement that adverse-action denials cite the specific policy source. Every LLM-based compliance decision that emits a template phrase is a Reg B violation regardless of accuracy. Calibration extends this argument: an LLM-based trade decision that emits a probability with no verifiable calibration curve is a best-execution violation regardless of accuracy.

**Contribution list:**

1. Framing: calibration discipline as first-class audit primitive
2. Cryptographic attestation binding: Ed25519 (RFC 8032) with dictionary-hash + hash-chain
3. Cross-persona framework: 5 personas (trading) + 5 personas (banking) with Brier decomposition per persona
4. Two reference implementations (Orallexa Python, Shadow Node.js) both MIT + public
5. Governance-layer citation chain: the BRD vs. Addenda Source Separation Principle from Levitchi (2026)
6. 200-decision empirical calibration decomposition

---

## 2. Related Work (~1 page)

**Threads to review:**

- **LLM calibration in general:** Guo, Pleiss, Sun, Weinberger (2017) — temperature scaling. Kadavath et al. (2022, Anthropic) — LLM self-calibration second-order probability. Zhao, Naik, Peng, Cotterell (2021) — calibration under distribution shift.
- **LLM trade decisions:** Yang et al. (2024) FinGPT. Wu et al. (2023) BloombergGPT. Wang et al. (2023) Alpaca / DeepFinance. Highlight the accuracy-only evaluation posture.
- **Reflexion / self-improvement:** Shinn et al. (2023) NeurIPS. Sakana Darwin-Gödel Machine (2025). Reference the *measurement-first* prior we require before any self-modification is merged.
- **Cryptographic provenance for AI systems:** Attar et al. (2025) — model watermarking. RFC 8032 (Ed25519). NIST FIPS 186-5 (2023). No prior work binds attestation to the *reason-code dictionary* rather than the model weights, which is our contribution's specific gap.
- **Regulatory literature:** SR 26-2 (Fed 2026), Reg BI (SEC 2019), MiFID II best-execution (ESMA), CFPB Bulletin 2024-09, Kraus 2022 (immersive statistics for outlier detection — auxiliary).

**Argument this section makes:** the calibration + attestation + governance-layer separation combination is novel. Any single one has prior art; the *product* is what we are introducing.

---

## 3. Framework (~2 pages)

### 3.1 Persona typing and probability emission

Each persona (Bull, Bear, Judge, Critic, Polyseer in the Orallexa trading roster; Credit Fundamentals, Risk Officer, Fair Lending Compliance, Customer Advocate, Macro Contrarian, AML/KYC opt-in in the Shadow banking roster) emits a *signed confidence value* on every decision, drawn from a bounded probability space with explicit calibration curve refit on a monthly schedule.

Signed confidence contract:
- **Range:** [0, 1] with explicit lower and upper bounds enforced in the runtime schema
- **Calibration:** post-hoc temperature scaling per Guo et al. (2017), refit monthly on realized outcomes
- **Provenance:** signed via Ed25519 attestation over the concatenated (model_version, reason_code_dictionary_hash, decision_features) payload

### 3.2 Brier decomposition per persona

For a binary event with predicted probability p and observed outcome o ∈ {0, 1}, the Brier score is BS = (p − o)². Over N predictions, mean Brier decomposes into:

    BS̄ = REL − RES + UNC

where REL (reliability) is the average squared distance between forecasted probability and empirical frequency binned by k, RES (resolution) is how far each bin's empirical frequency deviates from the overall base rate, and UNC (uncertainty) is the base-rate randomness. The decomposition is *orthogonal* per persona: a persona with high REL is *unreliable* independent of RES; a persona with low RES is *uninformative* independent of REL.

The trading roster (Bull, Bear, Judge, Critic, Polyseer) emits probability estimates on 5 event classes:
- P(price up ≥ 1% in next H hours)
- P(volatility regime = high)
- P(macro headwind = present)
- P(technical breakout = valid)
- P(consensus = confident)

The banking roster emits probability estimates on 4 event classes:
- P(applicant meets credit floor)
- P(loan fits portfolio VaR)
- P(compliance clean)
- P(borrower explanation meets Bulletin 2024-09)

### 3.3 Cryptographic attestation binding

Every emitted probability is bound to (model_version, reason_code_dictionary_hash, decision_features) via Ed25519 signature. Any post-hoc dictionary edit — a jailbroken model rewriting a compliance rationale, a well-meaning contributor "cleaning up" prompt language — breaks verification at the auditor's SIEM ingestion boundary.

Attestation schema:
```
{
  "model_version": "shadow-mentor@v1.5.11",
  "reason_code_dictionary_hash": "sha256:...",
  "decision_features": {...},
  "probability_by_persona": {...},
  "previous_hash": "sha256:...",  // hash chain for tamper detection
  "signature": "<Ed25519 signature bytes>"
}
```

Hash chain verification (v1.5.10) walks the chain in O(N) and detects any reordering, insertion, truncation, or edit-cascade with a single Ed25519 verification operation over concatenated hashes.

### 3.4 Governance-layer citation chain (Section from Levitchi 2026)

Every threshold used in a decision cites its correct governance layer:
1. Institutional risk framework (BRD)
2. Product-line policy (Addenda A/B/C)
3. Benchmark calibration parameter (Risk Appetite Note)
4. Regulatory framework (CFPB / ECOA / Reg B / SR 26-2 / GDPR Art. 22 / Schufa / Reg BI / MiFID II)

Examiner audit chains discount mis-attributed citations across the entire response. Section 3.4 defends the source-separation principle as *a necessary condition for a Reg B examiner to accept the citation chain*. The Traceability Matrix from Section 2 of the IEEE VR 2027 companion paper is the reference table.

---

## 4. Reference implementations (~1.5 pages)

### 4.1 Orallexa (Python, MIT)

Repository: `github.com/alex-jb/orallexa-ai-trading-agent`. 5-voice LangGraph debate (Bull / Bear / Judge + Critic + Polyseer). 745+ tests. Currently paper-trading; walk-forward validation gate is enforced (Sharpe ≥ 0.5 required for real-money deployment; last cycle failed with mean OOS Sharpe of −3.08, triggering the pre-registered `iff` gate that held the $300 real-money deployment). The Polyseer voice implements a Critic pattern auditing the other four for same-source bias, missing base rates, unverifiable claims, and confirmation drift.

### 4.2 Shadow (Node.js, MIT)

Repository: `github.com/alex-jb/shadow-mentor`. 5-voice compliance council (Credit / Risk / Fair Lending / Customer Advocate / Macro Contrarian) plus AML/KYC opt-in voice. 668 tests. 7 MCP tools shipped for Claude Desktop / Cursor / OpenCode integration. Deterministic verdict resolver (block > escalate > approve). Ed25519 attestation with dictionary_hash binding + hash-chain integrity + cross-language Node ↔ Python verifier.

### 4.3 Cross-implementation invariants

Both implementations share:
- HITL-by-code-level-invariant (a Reflexion `iff` gate that halts self-modification on any measurement regression)
- Dual-tier LLM cost routing (Sonnet 4.6 + Haiku 4.5) with 10× cost reduction verified on 50 blind reviews
- Structured JSON outputs at every persona boundary
- Hash-chain audit trail
- Provider diversity primitive against Free-MAD hallucination amplification (arXiv 2509.11035)

---

## 5. Evaluation (~1.5 pages)

### 5.1 Datasets

- **Trading (Orallexa):** 90-day paper-trading decision log (2026-04-13 → 2026-07-13) — approximately 200 decisions across the SpaceX equity basket (RKLB, ASTS, LUNR, BKSY, PL, RDW, LMT, LIN). Real market ground truth at T + 24h.
- **Banking (Shadow):** 200-decision synthetic loan test set (labeled ground truth per Addenda A/B/C) — the 4-case verdict lattice (approve / escalate / block × 2 block paths) extended to 200 synthetic loans with realistic feature distributions.

### 5.2 Metrics

- **Accuracy metrics:** Sharpe, information ratio, hit rate (trading); verdict correctness on gold-labeled loans, F1 by verdict class, per-persona agreement (banking).
- **Calibration metrics:** Brier score, reliability (REL), resolution (RES), uncertainty (UNC), reliability curve, expected calibration error (ECE) per persona, expected calibration error post-recalibration.
- **Attestation metrics:** verification success rate at auditor SIEM ingestion boundary, hash-chain integrity check pass rate, dictionary-hash binding regression detection rate on deliberately-tampered inputs.
- **Governance-layer metrics:** citation-chain misattribution rate on 200 test decisions, measured against the Traceability Matrix.

### 5.3 Results (to be filled from live data 2026-07-13 to 2026-07-30)

Preliminary numbers as of 2026-07-06:
- Orallexa: paper-trading Sharpe negative on latest walk-forward, correctly held real-money deployment via iff gate. Brier score per persona to be measured on the 90-day log.
- Shadow: Agentic Capability Benchmark 87 ± 3 (n=6). Ed25519 attestation verification 100% success rate on the 4-case verdict lattice. Zero regressions across 668 tests.

Final results block reserved for the camera-ready draft — the 200-decision empirical decomposition is the empirical anchor of the paper and must be regenerated with the final model + dictionary versions the day before submission.

### 5.4 Ablations

- With and without post-hoc temperature scaling per persona
- With and without hash-chain (single attestation only)
- With and without dictionary-hash binding (attestation is model-only)
- With and without governance-layer citation chain (Reg B examiner audit simulation)

---

## 6. Discussion (~1 page)

### 6.1 What breaks if you skip the attestation layer

A jailbroken model can rewrite a compliance rationale in a way that passes accuracy tests (F1 on the verdict class) but fails at auditor SIEM because the reason-code dictionary hash no longer matches. Section 6.1 walks through 3 specific attack surfaces with Shadow's `test/aml-kyc-adversarial.test.js` (32 tests) as the empirical reference.

### 6.2 What breaks if you skip governance-layer separation

Examiner audit chains discount the entire citation chain when any single threshold is mis-attributed. Section 6.2 argues that source separation is a *necessary* not merely helpful condition for procurement-grade regulated deployment.

### 6.3 Limitations

- Small sample sizes at the persona level (n < 100 as of 2026-07-06)
- Synthetic banking test set — real bank data is unavailable to any solo research team, and this is not going to change in the paper's lifetime
- Post-hoc temperature scaling assumes stationary calibration curves; production deployment would need drift-detection monitoring
- Provider diversity primitive assumes no shared infrastructure between LLM providers, which is empirically false in some deployment scenarios (many banks use both Anthropic and OpenAI running on the same cloud provider)

### 6.4 Future work

- Cross-workspace calibration leaderboard (extension of the Council-for-Slack 2026-07-13 hackathon submission)
- Real-time recalibration under adversarial drift
- Integration with FINRA CAT audit trail export format
- AMD MI300X vLLM portable backend (already scaffolded in council-diff provider abstraction)

---

## 7. Conclusion (~0.5 page)

Calibration discipline as first-class audit primitive is the framing that lets solo research teams and mid-tier banks with modest engineering budgets ship production-grade AI trade / compliance decisioning that can be defended to a regulator. The framework is measurable, testable, cryptographically bound, and open-sourced in two reference implementations that anyone can clone and stress-test. Milan 2026 attendees interested in the trading, banking, or spatial-XR applications of this framework are invited to open issues on either repository.

---

## Skeleton reviewer notes (for Alex before sending to Yang)

**Before sending to Yang:**

1. Rewrite Section 1's Introduction with Prof. Yang's typical Introduction structure (start with the trading-side story, then broaden to compliance). Yang is a quant researcher; his lens is Sharpe first, calibration second.
2. Section 5.3 (Results) is *the* section a reviewer will read. It has to be fully populated by 2026-07-30 at the latest, giving 3 days to iterate before submission. Blocker: Alex needs 200 clean labeled trading decisions from the paper-trading log by 2026-07-30.
3. Section 3.4 (Governance-layer citation chain) leans on Lora's authority. Confirm she's willing to co-author the banking side of Section 3.4 or agrees the paragraph in its current form; if she wants to reframe, iterate.
4. Verify with Yang that the trading-side dataset in Section 5.1 (90-day paper-trading log) is actually publishable — the paper-trading platform's terms may restrict decision-log publication.

**Skeleton timeline for Alex:**

| Date | Action |
|---|---|
| **2026-07-07** | Send skeleton to Yang + Lora for review |
| **2026-07-15** | Sections 1, 2, 3 fully written (introduction + related work + framework) |
| **2026-07-22** | Sections 4, 6, 7 fully written (implementations + discussion + conclusion) |
| **2026-07-30** | Section 5 (evaluation) written with actual n=200 numbers |
| **2026-08-01** | Full paper review by Yang + Lora, iterate |
| **2026-08-02 EOD** | Submit |

---

## References (partial — to be expanded)

- Brier, G. W. (1950). Verification of forecasts expressed in terms of probability. *Monthly Weather Review*, 78(1), 1-3.
- Murphy, A. H. (1973). A new vector partition of the probability score. *Journal of Applied Meteorology*, 12(4), 595-600.
- Guo, C., Pleiss, G., Sun, Y., & Weinberger, K. Q. (2017). On calibration of modern neural networks. *ICML 2017.*
- Kadavath, S., et al. (2022). Language models (mostly) know what they know. Anthropic technical report.
- Shinn, N., et al. (2023). Reflexion: Language agents with verbal reinforcement learning. *NeurIPS 2023.*
- Federal Reserve. (2026). *SR 26-2 Supervisory Guidance on Model Risk Management.* Board of Governors of the Federal Reserve System.
- CFPB. (2024). *Bulletin 2024-09: Model traceability for adverse-action explanations.* Consumer Financial Protection Bureau.
- ECJ. (2023). *Case C-634/21 (SCHUFA Holding).* Court of Justice of the European Union.
- RFC 8032. (2017). *Edwards-Curve Digital Signature Algorithm (EdDSA).* Internet Engineering Task Force.
- Levitchi, L. C. (2026). *BRD vs. Addenda Source Separation Principle: A governance pattern for AI-driven regulated decisions.* Yeshiva Univ. + William Paterson Univ. Technical Report (in preparation).

---

## License

MIT. Draft is public artifact of the `embodied-compliance-council` repository. Please cite `docs/icaif-2026/paper-skeleton.md` (this file) when adapting the framework for your own paper.
