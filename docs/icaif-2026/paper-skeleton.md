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

- **LLM calibration in general:** Guo, Pleiss, Sun, Weinberger (2017) — temperature scaling. Kadavath et al. (2022, Anthropic) — LLM self-calibration second-order probability. Tian, Mitchell, Zhou, Sharma, Rafailov, Yao, Finn, Manning (2023, EMNLP) — "Just Ask for Calibration" verbalized confidence from RLHF models. Xiong, Hu, Lu, Li, Fu, He, Hooi (2024, ICLR) — systematic framework prompting × sampling × aggregation; consistency-based ensembles outperform single-shot elicitation. Liu et al. (2025, KDD) — canonical uncertainty-quantification survey. Steyvers et al. (2024, *Nature Machine Intelligence*) — the "calibration gap" between user perception and LLM confidence, our motivation for treating miscalibration as a governance-layer failure.
- **Multi-agent LLM calibration (direct competitor):** Wang, Zhang, Yu, Hooi (2024, arXiv:2404.09127) show multi-agent deliberation improves LLM confidence calibration on general open-domain QA. We extend this mechanism to a regulated-domain audit primitive: (a) domain-specific persona schemas grounded in ECOA / SR 26-2 rather than general QA prompts, (b) coupling to a hash-chain audit primitive Wang et al. do not consider, and (c) empirical Brier decomposition on a credit-decision corpus rather than general QA.
- **Protocol-layer claim attestation (direct competitor):** Ravikiran (2026, arXiv:2605.20312) proposes *Pramāṇa*, a domain-agnostic ClaimAttestation protocol with re-executable `verify()` semantics formally checked in TLA+. Shadow is a *domain-specialized instantiation*: banking-council personas with a Reg B reason-code dictionary bound into the Ed25519 signature. Where Pramāṇa specifies the wire format, we specify the regulatory grounding.
- **Concurrent 2026 governance frameworks (adjacent, not competing):** Two July-2026 arXiv releases propose adjacent AI-in-banking governance architectures that do not overlap with our per-decision measurement primitive and should be cited to preempt reviewer overlap concerns. **Wang, Kang, Lin, Mao (2026, arXiv:2607.04103)** propose the *Generative AI Control Framework (GAICF)*, an SR 26-2-compatible risk-control taxonomy for generative AI in regulated banking. The contribution is at the governance-process layer (non-empirical, 15 pages, one figure); ours is at the per-decision measurement layer with cryptographic binding to the reason-code dictionary. The two frameworks compose cleanly: GAICF specifies *what* governance controls a bank should apply; Shadow specifies *how* each controlled decision emits verifiable evidence. **Kurshan, Balch, Byrd (2025, arXiv:2512.11933)** propose *The Agentic Regulator*, a four-layer modular monitoring architecture (self-regulation modules → firm-level aggregation → regulator-hosted agents → independent audit blocks) with a case study on emergent spoofing detection in multi-agent trading. Their measurement primitive is real-time multi-scale detection of collusive behavior across firms; ours is per-decision Ed25519 attestation binding a calibrated probability to a signed reason-code dictionary at the individual credit-decision boundary. Different primitive, different threat model, different vertical (trading collusion vs. credit adverse-action).
- **LLM credit decisioning:** Yang et al. (2024) FinGPT. Wu et al. (2023) BloombergGPT. Wang et al. (2023) Alpaca / DeepFinance. FinLoRA and related fine-tuning literature. Highlight the accuracy-only evaluation posture.
- **OSS trading agents with calibration:** TauricResearch/TradingAgents (2025) publishes Brier reliability diagrams for recommender `success_probability`. HKUDS/Vibe-Trading (2026, `pip install vibe-trading-ai`) ships a 30-preset swarm with `investment_committee` deliberation at production scale. Neither publishes *per-persona* calibration decomposition (reliability, resolution, uncertainty in the sense of Brier 1950) nor binds each decision to a cryptographic attestation over the model version and reason-code dictionary. Our contribution is not "Brier-audited multi-agent trading" (prior art exists); it is *per-persona decomposition + attestation binding + governance-layer citation chain*, cited in Section 4 as portability evidence rather than co-headline result.
- **Reflexion / self-improvement:** Shinn et al. (2023) NeurIPS. Sakana Darwin-Gödel Machine (2025). Reference the *measurement-first* prior we require before any self-modification is merged.
- **Cryptographic provenance for AI systems:** Attar et al. (2025) — model watermarking. RFC 8032 (Ed25519). NIST FIPS 186-5 (2023). No prior work binds attestation to the *reason-code dictionary* rather than the model weights, which is our contribution's specific gap.
- **Fair-lending OSS tooling:** Bellamy et al. (2018, arXiv:1810.01943) AI Fairness 360. Weerts et al. (2023, JMLR 24) Fairlearn. Aequitas (Saleiro et al., DSSG CMU). These libraries measure *trained model* fairness metrics; Shadow governs the *decision's rationale chain* — orthogonal contribution.
- **Calibration for subgroups (SOTA moved past aggregate ECE):** Hébert-Johnson, Kim, Reingold, Rothblum (2018, arXiv:1805.12317) Multicalibration; Deng et al. (2025, NeurIPS, arXiv:2505.17435) discretization-free extension. Load-bearing for the Reg B / ECOA framing: a lender who is aggregate-calibrated but subgroup-miscalibrated on protected classes violates fair-lending. Section 3.3 reports Brier per Reg B protected-class proxy and worst-subgroup Brier.
- **Modern calibration metrics:** Błasiok & Nakkiran (2023, arXiv:2309.12236) Smooth ECE — continuous, binning-free reliability metric. Section 3.5 reports both binned ECE (for MRM-tooling compatibility) and smECE (for reviewer-grade rigor).
- **Distribution-free abstention (considered, not adopted):** Quach, Fisch, Schuster, Yala, Sohn, Jaakkola, Barzilay (2024, ICLR) Conformal Language Modeling. Section 3.4 documents why we prefer verbalized-confidence aggregation over conformal for the small-labeled-set + AA-notice-interpretability constraints of credit deployment.
- **Regulatory literature:** Federal Reserve SR 26-2 (2026-04-17); CFPB Circular 2022-03 (2022-05-26, adverse-action reason-code specificity — the legal hook for miscalibration as ECOA liability); CFPB Circular 2026-03 (2026-05-05); Reg B §1002.9 (12 CFR 1002); ECOA (15 USC 1691 et seq.); GDPR Art. 22 and the ECJ Schufa ruling C-634/21 (2023); NIST AI 600-1 (Generative AI Profile, July 2024); ISO/IEC 42001:2023 (AI Management Systems); EBA CP/2025/20 revised Internal Governance under CRD VI.

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

Orallexa (`github.com/alex-jb/orallexa-ai-trading-agent`) is a 5-voice LangGraph debate framework (Bull / Bear / Judge / Critic / Polyseer) with an opt-in FinPos risk-sizer voice (arXiv:2510.27251) that receives direction as input and returns only sizing. It exists as portability evidence for the calibration-discipline framework of Section 3, not as a competing trading system. We are explicit about the boundary. HKUDS/Vibe-Trading [HKUDS 2026], a concurrent open-source multi-agent trading workspace with 461 pre-built alphas, 10 broker connectors, and 12k+ GitHub stars, occupies the system-completeness frontier for OSS trading agents. TauricResearch/TradingAgents [TauricResearch 2025] already reports Brier and reliability diagrams for its recommender's success probability. Orallexa's contribution is orthogonal to both: a publicly timestamped per-ticker Brier reliability corpus (N=905 resolved decisions across 20 SpaceX-adjacent tickers as of 2026-07-13; weekly aggregate BS = 0.2556, per-ticker range [0.163 RDW, 0.311 PL]), and a pre-registered `iff` gate that structurally blocked a real-money SPCX IPO purchase on 2026-06-09 despite unanimous LLM consensus, when the walk-forward Sharpe verdict failed at −3.08. The heterogeneity across per-ticker Brier is itself the framework finding: a system-level Brier near the 0.25 coin-flip baseline hides ticker-level informative and anti-informative signals that only a per-ticker decomposition surfaces. This is the portability claim the framework of Section 3 makes actionable — the same primitive (persona → probability → REL/RES/UNC → attestation) applies across verticals; Orallexa is the second reference implementation cited in one paragraph, not the empirical anchor of the paper.

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

- **Primary — Shadow credit-decision test set:** 200-decision synthetic loan test set with labeled ground truth per the Addenda A/B/C framework. Verdict lattice (approve / escalate / block × 2 distinct block paths) extended to 200 synthetic loans with realistic feature distributions covering FICO, DTI, LTV, occupancy, and macro-scenario columns. Labels derived from the Risk Appetite Note thresholds documented in `LOAN_DEFAULTS`. The 200-decision evaluation set is synthetic, generated from the fixture distributions committed in the anonymized artifact repository; no human-subjects data is involved and no IRB review was required.
- **Sibling — Orallexa paper-trading log:** 90-day paper-trading decision log (2026-04-13 → 2026-07-13), approximately 200 decisions across the SpaceX equity basket (RKLB, ASTS, LUNR, BKSY, PL, RDW, LMT, LIN). Cited only in the portability evidence subsection; not the primary empirical anchor of the paper.

**Model baseline discipline.** All results below use Anthropic Claude Sonnet 4.6 (`claude-sonnet-4-5-20250929`) as the persona-council backbone and Claude Haiku 4.5 for the deterministic layer. Claude Sonnet 5 shipped 2026-06-30, ~4 weeks before the 4-seed variance window used here closed on 2026-07-10; the model is documented but not used in the reported numbers, because switching backbones mid-window would invalidate the seed-variance claim. A Sonnet 5 rerun is committed to the reproducibility bundle as `benchmark/icaif-2026/sonnet-5-followup.jsonl` for readers who want the direct-comparison numbers; the framework itself is model-agnostic and any calibration deltas would apply symmetrically.

### 5.2 Metrics

- **Primary accuracy:** verdict correctness on gold-labeled loans, F1 by verdict class, per-persona agreement, approval-rate parity across synthetic-protected-class strata.
- **Calibration metrics:** Brier score, reliability (REL), resolution (RES), uncertainty (UNC), reliability curve, expected calibration error (ECE) per persona, ECE post-recalibration.
- **Attestation metrics:** verification success rate at auditor SIEM ingestion boundary, hash-chain integrity check pass rate, `dictionary_hash` binding regression detection rate on deliberately-tampered inputs.
- **Governance-layer metrics:** citation-chain misattribution rate on 200 test decisions, measured against the Traceability Matrix.
- **Sibling accuracy (Section 4.2):** Sharpe, information ratio, hit rate (Orallexa), reported briefly to establish portability.

### 5.3 Results

**Deterministic-layer baseline (n=800 decisions across 4 independent seeds, 2026-07-10).** Bundle at `shadow-mentor:benchmark/icaif-2026/`, reproducible via `node scripts/icaif-batch-eval.mjs --n 200 --seed <s>` and `node scripts/icaif-variance-summary.mjs`.

- Verdict accuracy: **1.000 ± 0.000** across seeds 20260710/20260711/20260712/20260713.
  Constant-by-construction: gold labels derive from the same `LOAN_DEFAULTS` thresholds the council uses. This is the **internal-consistency verification** of the deterministic verdict layer, not a novel accuracy claim.
- Per-voice agreement with final verdict (mean ± std across 4 seeds):

  | Voice | Agreement | Interpretation |
  |---|---:|---|
  | Credit Fundamentals | 0.964 ± 0.017 | Dominant vote per Levitchi 2026-06-19 policy (FICO/DTI gate drives most block/escalate outcomes) |
  | Macro Contrarian | 0.714 ± 0.029 | Sector-driven independence; escalates CRE regardless of other signals |
  | Risk Officer | 0.652 ± 0.040 | VaR-driven independence; sometimes escalates on VaR while other voices approve |
  | Fair Lending | 0.644 ± 0.054 | Flag-driven independence; blocks on flag regardless of other signals |
  | Customer Advocate | 0.619 ± 0.049 | AA-quality-driven independence; escalates when adverse-action list needs review |

  The tight std < 0.06 on per-voice agreement across independent seeds shows the persona-diversity pattern is a stable framework property, not an artifact of any single class-mixture draw.

- Adverse-action code coverage (mean count per n=200 seed): AA02 (DTI) ~59, AA01 (FICO) ~28, AA03 (LTV) ~17, AA04 (VaR) ~7, AA05 (Fair Lending) ~2. Signed reason-code dictionary check passed on 800/800 decisions.

- Shadow Agentic Capability Benchmark on LLM-rationale layer: 87 ± 3 (n=6, from 2026-06-18 sweep; distinct from the deterministic Section 5.3 baseline above).

**LLM-rationale-layer results (to be filled 2026-07-24 → 2026-07-30).** Extending the eval bundle to include per-class probability emission (see schema-gap note below) and re-running against Sonnet 4.6 + Haiku 4.5. Full Brier decomposition per persona, temperature scaling per Guo et al. 2017, ECE pre/post recalibration.

**Sibling implementation (Orallexa portability evidence).** Paper-trading Sharpe negative on latest walk-forward, correctly held real-money deployment via the pre-registered `iff` gate. Framework-catches-own-miscalibration example, not a positive-P&L claim.

### 5.3.1 Schema gap flagged for camera-ready

`confidence` values in the current Shadow output are per-persona constants (0.82 / 0.78 / 0.91 / 0.74 / 0.69). The Section 3.2 per-persona Brier decomposition requires each persona to emit `P(class) ∈ [0, 1]` per event class, not a fixed confidence in the persona's own verdict. Two options for the camera-ready draft:

1. **Extend the schema** to emit `p_approve`, `p_escalate`, `p_block` per persona; refit temperature scaling per Guo et al. 2017; report REL / RES / UNC decomposition. Roughly one week of engineering + LLM-rationale wiring cost.
2. **Reframe as weighted-verdict Brier** using the constant per-persona confidence as a persona-level weight (already shipped in `lib/confidence-weighted-verdict.js`). Cheaper. Loses the per-persona reliability-curve claim; keeps the audit-primitive claim.

Yang call 2026-07-14 (Monday) agenda item.

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
