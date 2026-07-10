---
title: "Calibration Discipline as the Audit Primitive for AI-Assisted Credit Decisions: A Per-Persona Brier Framework with Ed25519 Attestation"
authors:
  - Alex Xiaoyu Ji (Yeshiva Katz School)
  - Michael Yang, PhD (Yeshiva Katz School, capstone advisor, quant research faculty)
  - Loredana Carmen Levitchi (Yeshiva University · William Paterson University) [co-author on banking-domain regulatory citations]
venue: "ACM International Conference on AI in Finance (ICAIF) 2026, Milan"
abstract_deadline: 2026-08-02
paper_deadline: 2026-08-02 (same as abstract for full papers)
draft_version: skeleton v0.2 (2026-07-10, refocused to banking credit-decision per Yang alignment email)
status: skeleton for Yang review — do not submit without Yang's co-author sign-off
license: MIT (Shadow reference implementation is MIT + public; Orallexa trading vertical cited as sibling evidence of framework portability)
target_page_count: 8-10 pages ACM double-column format
scope_note: |
  v0.1 (2026-07-06) drafted trading + banking as parallel co-headlines. v0.2 (2026-07-10)
  refocuses on banking credit-decision as the primary reference implementation, per Alex's
  2026-07-10 email to Yang. Rationale: (1) the banking vertical has a real Y.U. faculty
  domain collaborator (Levitchi) whose BRD-vs-Addenda source-separation contribution
  grounds the governance-layer citation chain; (2) 707+ tests + Ed25519 attestation +
  hash-chain integrity constitute a defensible empirical anchor; (3) the trading vertical
  does not currently have live-audited multi-quarter P&L history and would weaken the
  paper. Orallexa remains cited in Section 4 as portability evidence for the framework.
---

# Calibration Discipline as the Audit Primitive for AI-Assisted Credit Decisions

## Structure (skeleton for Yang review)

Each section below is a placeholder with (a) the argument the section defends and (b) the specific artifact / dataset / equation the section will cite. Prose to be written in the final draft; skeleton makes the argument structure legible before we spend the 27 days writing.

---

## Abstract (~180 words, camera-ready target)

The literature on AI-assisted credit decisions treats verdict accuracy (F1, approval-rate parity, disparate-impact ratios) as the primary evaluation metric. We argue that accuracy is a necessary but insufficient guarantee for regulated deployment: an accurate but miscalibrated model is a compliance liability under Reg B §1002.9, CFPB Circular 2026-03, ECOA, and SR 26-2, because *the model's confidence in each decision cannot be defended to a regulator*. We propose **calibration discipline as the audit primitive** — a framework where every credit decision emits (i) a probability estimate with a known Brier-score reliability curve per persona, (ii) an Ed25519 cryptographic attestation binding that probability to the model version and the reason-code dictionary that produced it, and (iii) a governance-layer citation chain that maps every threshold used in the decision to its correct source document (institutional risk framework, product-line policy, benchmark calibration parameter, or regulatory framework). We instantiate the framework in **Shadow**, a Node.js open-source multi-persona credit-decision council (MIT, 707+ tests, Reg B / ECOA / SR 26-2 / GDPR Art. 22 / Schufa coverage in `docs/CITATION_MAP.md`). We evaluate on a 200-decision held-out labeled loan-decision test set and report Brier decomposition (reliability, resolution, uncertainty) per persona, without prompt-tuning, alongside verdict accuracy. We cite Orallexa (Python quantitative trading agent, MIT, sibling repository) as portability evidence that the framework generalizes across financial verticals.

---

## 1. Introduction (~1.5 pages)

**Argument to defend:** the AI-in-finance literature has consolidated on accuracy metrics that are silently *conditional on the model's confidence being well-calibrated*. Section 1 argues that (a) that assumption is empirically false for LLM-based credit decisioning at production scale, (b) miscalibration is not neutral — it is a regulatory liability under Reg B §1002.9, ECOA, CFPB Circular 2026-03, and SR 26-2 (Federal Reserve, 2026-04-17), and (c) calibration discipline can be treated as a first-class engineering primitive (measurable, testable, deterministically bound to the model version via cryptographic attestation) rather than a post-hoc analytical exercise.

**Concrete anchor to cite:** CFPB Circular 2026-03 (2026-05-05) requires that adverse-action explanations cite the specific principal reason applicable to the applicant. An LLM-based compliance decision that emits a generic template phrase is a Reg B violation regardless of verdict accuracy. Calibration extends this argument: an LLM-based credit decision that emits a probability with no verifiable calibration curve is a governance-layer failure regardless of verdict accuracy, because the reviewer cannot defend the threshold at which the model chose approve/escalate/block.

**Contribution list:**

1. Framing: calibration discipline as first-class audit primitive for credit decisioning
2. Cryptographic attestation binding: Ed25519 (RFC 8032) with dictionary-hash + hash-chain
3. Per-persona Brier decomposition framework applied to the 5-persona credit-decision council (Credit Fundamentals, Risk Officer, Fair Lending Compliance, Customer Advocate, Macro Contrarian) with optional AML/KYC opt-in sixth persona
4. Reference implementation: Shadow (Node.js, MIT, 707+ tests)
5. Governance-layer citation chain: the BRD vs. Addenda Source Separation Principle from Levitchi (2026)
6. 200-decision empirical calibration decomposition on labeled synthetic loan test set
7. Portability evidence: Orallexa (Python, MIT) as sibling implementation for the trading vertical, demonstrating the framework generalizes beyond the primary credit-decision reference

---

## 2. Related Work (~1 page)

**Threads to review:**

- **LLM calibration in general:** Guo, Pleiss, Sun, Weinberger (2017) — temperature scaling. Kadavath et al. (2022, Anthropic) — LLM self-calibration second-order probability. Zhao, Naik, Peng, Cotterell (2021) — calibration under distribution shift.
- **LLM credit decisioning:** Yang et al. (2024) FinGPT. Wu et al. (2023) BloombergGPT. Wang et al. (2023) Alpaca / DeepFinance. FinLoRA and related fine-tuning literature. Highlight the accuracy-only evaluation posture.
- **Reflexion / self-improvement:** Shinn et al. (2023) NeurIPS. Sakana Darwin-Gödel Machine (2025). Reference the *measurement-first* prior we require before any self-modification is merged.
- **Cryptographic provenance for AI systems:** Attar et al. (2025) — model watermarking. RFC 8032 (Ed25519). NIST FIPS 186-5 (2023). No prior work binds attestation to the *reason-code dictionary* rather than the model weights, which is our contribution's specific gap.
- **Regulatory literature:** Federal Reserve SR 26-2 (2026-04-17); CFPB Circular 2026-03 (2026-05-05); Reg B §1002.9 (12 CFR 1002); ECOA (15 USC 1691 et seq.); GDPR Art. 22 and the ECJ Schufa ruling C-634/21 (2023); NIST AI 600-1.

**Argument this section makes:** the calibration + attestation + governance-layer separation combination is novel. Any single one has prior art; the *product* is what we are introducing.

---

## 3. Framework (~2 pages)

### 3.1 Persona typing and probability emission

Each persona in the credit-decision council (Credit Fundamentals, Risk Officer, Fair Lending Compliance, Customer Advocate, Macro Contrarian, plus an optional AML/KYC investigator sixth persona) emits a *signed confidence value* on every decision, drawn from a bounded probability space with explicit calibration curve refit on a monthly schedule. The trading-side sibling implementation (Orallexa: Bull, Bear, Judge, Critic, Polyseer) mirrors the contract at Section 4.2 as portability evidence.

Signed confidence contract:
- **Range:** [0, 1] with explicit lower and upper bounds enforced in the runtime schema
- **Calibration:** post-hoc temperature scaling per Guo et al. (2017), refit monthly on realized outcomes
- **Provenance:** signed via Ed25519 attestation over the concatenated (model_version, reason_code_dictionary_hash, decision_features) payload

### 3.2 Brier decomposition per persona

For a binary event with predicted probability p and observed outcome o ∈ {0, 1}, the Brier score is BS = (p − o)². Over N predictions, mean Brier decomposes into:

    BS̄ = REL − RES + UNC

where REL (reliability) is the average squared distance between forecasted probability and empirical frequency binned by k, RES (resolution) is how far each bin's empirical frequency deviates from the overall base rate, and UNC (uncertainty) is the base-rate randomness. The decomposition is *orthogonal* per persona: a persona with high REL is *unreliable* independent of RES; a persona with low RES is *uninformative* independent of REL.

The credit-decision roster (Credit / Risk / Fair Lending / Customer Advocate / Macro Contrarian) emits probability estimates on the following event classes:
- P(applicant meets the institution's credit floor as documented in the Risk Appetite Note)
- P(loan fits portfolio VaR under the applicable Addendum)
- P(fair-lending review clean; no protected-class proxy detected in the feature vector)
- P(adverse-action explanation cites a specific principal reason consistent with CFPB Circular 2026-03)
- P(macro scenario allows the loan to close within the current rate regime)

The trading sibling (Section 4.2) emits parallel probability estimates over 5 market-facing event classes: price direction, volatility regime, macro headwind, technical validity, and consensus confidence. Section 4.3 notes the invariants that hold across both rosters.

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

### 4.1 Shadow (primary reference implementation — Node.js, MIT)

Repository: `github.com/alex-jb/shadow-mentor`. 5-voice compliance council (Credit Fundamentals / Risk Officer / Fair Lending Compliance / Customer Advocate / Macro Contrarian) plus AML/KYC opt-in sixth voice. 707+ tests. 9 MCP tools shipped for Claude Desktop / Cursor / OpenCode integration. Deterministic verdict resolver (block > escalate > approve). Ed25519 attestation with `dictionary_hash` binding, hash-chain integrity, cross-language Node ↔ Python verifier, and per-decision + batched attestation modes. Regulatory coverage documented in `docs/CITATION_MAP.md`: Reg B §1002.9, ECOA, CFPB Circular 2026-03, SR 26-2, BSA §5318(g)(2), USA PATRIOT §326, FinCEN CDD (31 CFR 1010.230), GDPR Art. 22, ECJ Schufa C-634/21. The BRD-vs-Addenda source-separation principle from Levitchi (2026) is enforced inline via `lib/traceability.js` and 14 contract tests.

### 4.2 Orallexa (sibling implementation, portability evidence — Python, MIT)

Repository: `github.com/alex-jb/orallexa-ai-trading-agent`. 5-voice LangGraph debate (Bull / Bear / Judge / Critic / Polyseer) plus FinPos risk-sizer voice (arXiv 2510.27251) that consumes direction as input and returns only sizing. 1300+ tests. Walk-forward validation gate is enforced (Sharpe ≥ 0.5 required for real-money deployment; the pre-registered `iff` gate held the paper-to-real transition during the negative-Sharpe cycle, demonstrating that the calibration-discipline framework catches its own miscalibration). The Polyseer voice implements a Critic pattern auditing the other four for same-source bias, missing base rates, unverifiable claims, and confirmation drift. Orallexa is cited in this paper as *portability evidence for the calibration-discipline framework* rather than as a co-headline result; the primary empirical anchor is the Shadow credit-decision test set.

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

- **Primary — Shadow credit-decision test set:** 200-decision synthetic loan test set with labeled ground truth per the Addenda A/B/C framework. Verdict lattice (approve / escalate / block × 2 distinct block paths) extended to 200 synthetic loans with realistic feature distributions covering FICO, DTI, LTV, occupancy, and macro-scenario columns. Labels derived from the Risk Appetite Note thresholds documented in `LOAN_DEFAULTS`.
- **Sibling — Orallexa paper-trading log:** 90-day paper-trading decision log (2026-04-13 → 2026-07-13), approximately 200 decisions across the SpaceX equity basket (RKLB, ASTS, LUNR, BKSY, PL, RDW, LMT, LIN). Cited only in the portability evidence subsection; not the primary empirical anchor of the paper.

### 5.2 Metrics

- **Primary accuracy:** verdict correctness on gold-labeled loans, F1 by verdict class, per-persona agreement, approval-rate parity across synthetic-protected-class strata.
- **Calibration metrics:** Brier score, reliability (REL), resolution (RES), uncertainty (UNC), reliability curve, expected calibration error (ECE) per persona, ECE post-recalibration.
- **Attestation metrics:** verification success rate at auditor SIEM ingestion boundary, hash-chain integrity check pass rate, `dictionary_hash` binding regression detection rate on deliberately-tampered inputs.
- **Governance-layer metrics:** citation-chain misattribution rate on 200 test decisions, measured against the Traceability Matrix.
- **Sibling accuracy (Section 4.2):** Sharpe, information ratio, hit rate (Orallexa), reported briefly to establish portability.

### 5.3 Results (to be filled from live data 2026-07-13 to 2026-07-30)

Preliminary numbers as of 2026-07-10:
- Shadow: Agentic Capability Benchmark 87 ± 3 (n=6). Ed25519 attestation verification 100% success rate on the 4-case verdict lattice. Zero regressions across 707+ tests. Per-persona Brier decomposition to be filled from the 200-decision labeled set.
- Orallexa: paper-trading Sharpe negative on latest walk-forward, correctly held real-money deployment via `iff` gate. Cited as portability evidence that the calibration-discipline framework catches its own miscalibration when applied outside the primary vertical.

Final results block reserved for the camera-ready draft. The 200-decision empirical decomposition is the empirical anchor of the paper and must be regenerated with the final model + dictionary versions the day before submission.

### 5.4 Ablations

- With and without post-hoc temperature scaling per persona
- With and without hash-chain (single attestation only)
- With and without `dictionary_hash` binding (attestation is model-only)
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

## Skeleton reviewer notes (for Alex before Monday Yang call)

**Before Monday call with Yang:**

1. Yang's 2026-07-09 email confirmed the ICAIF submission framing. Alex's 2026-07-10 reply committed to focusing on the credit-decision vertical + calibration discipline framing rather than an umbrella paper. Section 1 should read Yang-natural: open with the credit-underwriting adverse-action framing (procurement-grade audience, Yang's own quant lens applied inward) then bring calibration in as the diagnostic that makes the verdict defensible under Reg B examiner review.
2. Section 5.3 (Results) is *the* section a reviewer will read. It must be fully populated by 2026-07-30, giving 3 days to iterate. Blocker: 200 clean labeled loan decisions run through Shadow with per-persona probabilities recorded. Feature-distribution generator + gold labels already exist in Shadow's `test/loan-fixture-*.js` suite; need a batch runner script (~1 day of work) to emit the 200-row eval bundle.
3. Section 3.4 (Governance-layer citation chain) leans on Lora's authority. Her 2026-06-19 confirmations already commit her as co-first-author on the IEEE VR track; Section 3.4 of the ICAIF paper is a shorter carve-out and should be confirmed with her before Yang call.
4. Section 5.1 sibling dataset — the Orallexa paper-trading log — cited only in the portability subsection. No publication constraint since it's Alex's own paper-trading log on a public repo.
5. Monday Yang call agenda: (a) confirm banking-primary refocus, (b) walk Sections 3.1 – 3.4 as the technical core, (c) discuss whether the paper positions the trading-vertical negative-Sharpe as a positive framework demonstration (calibration caught its own miscalibration) or omits it.

**Skeleton timeline for Alex:**

| Date | Action |
|---|---|
| **2026-07-14 Mon** | Yang call — confirm banking refocus, agree Sections 3.1 – 3.4 as core |
| **2026-07-16 Wed** | Katz capstone demo (not ICAIF blocker but shares the credit-decision demo artifact) |
| **2026-07-20 Sun** | Sections 1, 2, 3 fully written |
| **2026-07-24 Thu** | Batch runner + n=200 eval bundle generated; per-persona Brier decomposition committed to repo |
| **2026-07-27 Sun** | Sections 4, 6, 7 fully written |
| **2026-07-30 Wed** | Section 5 (evaluation) written with actual n=200 numbers |
| **2026-08-01 Fri** | Full paper review by Yang + Lora, iterate |
| **2026-08-02 Sat EOD** | Submit |

---

## References (partial — to be expanded)

- Brier, G. W. (1950). Verification of forecasts expressed in terms of probability. *Monthly Weather Review*, 78(1), 1-3.
- Murphy, A. H. (1973). A new vector partition of the probability score. *Journal of Applied Meteorology*, 12(4), 595-600.
- Guo, C., Pleiss, G., Sun, Y., & Weinberger, K. Q. (2017). On calibration of modern neural networks. *ICML 2017.*
- Kadavath, S., et al. (2022). Language models (mostly) know what they know. Anthropic technical report.
- Shinn, N., et al. (2023). Reflexion: Language agents with verbal reinforcement learning. *NeurIPS 2023.*
- Federal Reserve. (2026). *SR 26-2 Supervisory Guidance on Model Risk Management.* Board of Governors of the Federal Reserve System.
- CFPB. (2026). *Circular 2026-03: Specificity requirements for adverse-action reason codes under Reg B §1002.9.* Consumer Financial Protection Bureau (2026-05-05).
- 12 CFR 1002 (Reg B / ECOA). *Equal Credit Opportunity Act — Regulation B.* Consumer Financial Protection Bureau.
- ECJ. (2023). *Case C-634/21 (SCHUFA Holding).* Court of Justice of the European Union.
- RFC 8032. (2017). *Edwards-Curve Digital Signature Algorithm (EdDSA).* Internet Engineering Task Force.
- Levitchi, L. C. (2026). *BRD vs. Addenda Source Separation Principle: A governance pattern for AI-driven regulated decisions.* Yeshiva Univ. + William Paterson Univ. Technical Report (in preparation).

---

## License

MIT. Draft is public artifact of the `embodied-compliance-council` repository. Please cite `docs/icaif-2026/paper-skeleton.md` (this file) when adapting the framework for your own paper.
