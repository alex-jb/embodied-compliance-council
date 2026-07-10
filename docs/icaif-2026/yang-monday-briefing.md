# ICAIF 2026 Milan — Monday call briefing for Yang

Prepared for the 2026-07-14 (Monday) call. Skim in 5 min; deep skeleton at `docs/icaif-2026/paper-skeleton.md` (20 KB) if you want the full argument.

---

## 1. What we are submitting

**Title (working):** *Calibration Discipline as the Audit Primitive for AI-Assisted Credit Decisions: A Per-Persona Brier Framework with Ed25519 Attestation*

**Venue:** ACM International Conference on AI in Finance (ICAIF) 2026, Milan

**Deadline:** 2026-08-02 (23 days out on Monday)

**Author line as drafted:** Alex Ji (Katz) · Michael Yang, PhD (Katz, capstone advisor + quant faculty) · Loredana Levitchi (YU + WPU, banking-domain regulatory citations).

**One-sentence framing.** LLM credit-decision literature evaluates accuracy; we argue accuracy is insufficient for a regulator, propose calibration discipline (per-persona Brier + Ed25519 attestation + governance-layer citation chain) as the audit primitive, and evaluate on a public reference implementation (Shadow, MIT, 707+ tests).

---

## 2. Contribution list (7 items)

1. Framing: calibration discipline as first-class audit primitive for credit decisioning.
2. Cryptographic attestation binding: Ed25519 (RFC 8032) with `dictionary_hash` + hash-chain.
3. Per-persona Brier decomposition framework on the 5-persona credit-decision council (Credit Fundamentals, Risk Officer, Fair Lending Compliance, Customer Advocate, Macro Contrarian) with optional AML/KYC opt-in sixth persona.
4. Reference implementation: Shadow (Node.js, MIT, 707+ tests, public repo).
5. Governance-layer citation chain: the BRD-vs-Addenda Source Separation Principle from Levitchi (2026).
6. 200-decision empirical calibration decomposition on labeled synthetic loan test set (baseline shipped 2026-07-10 at n=2,400 across 12 seeds; LLM-rationale layer to be added).
7. Portability evidence: Orallexa (Python, MIT) as sibling implementation for the trading vertical, demonstrating framework generalization.

---

## 3. Empirical anchor already shipped

The deterministic-layer baseline is committed to `shadow-mentor:benchmark/icaif-2026/` and reproducible from a fresh clone via `node scripts/icaif-batch-eval.mjs --seed <s>`. Zero LLM cost.

**n=2,400 decisions across 12 independent seeds:**

| Metric | Envelope |
|---|---|
| Verdict accuracy | 1.000 ± 0.000 (internal-consistency verification, not a novel claim) |
| Credit Fundamentals agreement with final | 0.969 ± 0.012 (dominant vote per policy) |
| Macro Contrarian agreement with final | 0.726 ± 0.034 |
| Risk Officer agreement with final | 0.675 ± 0.042 |
| Fair Lending agreement with final | 0.665 ± 0.045 |
| Customer Advocate agreement with final | 0.638 ± 0.044 |

**Story:** all voice std < 0.05 across independent seeds — persona diversity is a stable framework property, not an artifact of any single class-mixture draw. This is what a reviewer sees when they skim Section 5.

**AA-code distribution (mean per n=200 seed):** AA02 (DTI) ~59, AA01 (FICO) ~28, AA03 (LTV) ~17, AA04 (VaR) ~7, AA05 (Fair Lending) ~2. Realistic mid-tier bank flow shape. Signed dictionary check passes on all 2,400.

---

## 4. Three decisions I need from you on Monday

### D1 · Schema gap — Brier decomposition path

Section 3.2 of the skeleton claims per-persona Brier decomposition. The current Shadow output emits `confidence` as a per-persona constant (0.82 / 0.78 / 0.91 / 0.74 / 0.69). Two paths:

- **D1a. Extend the schema.** Personas emit `p_approve`, `p_escalate`, `p_block`. Refit temperature scaling per Guo et al. 2017. Report REL / RES / UNC decomposition. Roughly one week of engineering + LLM-rationale wiring.
- **D1b. Reframe as weighted-verdict Brier.** Use the constant per-persona confidence as a persona-level weight (`lib/confidence-weighted-verdict.js` already ships). Cheaper. Loses the per-persona reliability-curve claim; keeps the audit-primitive claim.

**My default without your input:** D1a. The reliability-curve claim is what separates this paper from a generic multi-agent debate report.

### D2 · Trading-side inclusion — depth vs risk

Section 4.2 currently cites Orallexa as portability evidence with the negative-Sharpe walk-forward as a *framework-catches-own-miscalibration* example. Two paths:

- **D2a. Keep as portability evidence** (current draft). Small paragraph, low ambition, low downside.
- **D2b. Elevate to co-headline.** Add a Section 5.4 with paper-trading Brier decomposition on the 90-day log. Higher upside, but exposes the paper to the "your trading agent lost money" reviewer angle.

**My default without your input:** D2a. Alex-brain records the trading-vertical negative Sharpe is the median outcome for OSS trading agents (LiveTradeBench 2025, TauricResearch 91k stars). Not something to lean the paper on.

### D3 · Author-line placement

Current draft: Ji / Yang / Levitchi in order. Two paths:

- **D3a. As drafted.** Capstone student first, capstone advisor second, external domain collaborator third.
- **D3b. Yang first if you want it.** No pushback — your Introduction-writing lens is quant-first, calibration-second and you may have opinions on how the abstract opens.

**My default:** D3a; happy to swap on your say-so.

---

## 5. Timeline to 8/2

| Date | Action |
|---|---|
| **Mon 2026-07-14** | This call. Close D1/D2/D3. Confirm banking-primary refocus. |
| **Wed 2026-07-16** | Katz capstone demo (separate deliverable, shares the credit-decision artifact). |
| **Sun 2026-07-20** | Sections 1, 2, 3 fully written. |
| **Thu 2026-07-24** | If D1a: schema extension + batch runner emitting P(class) per persona shipped. |
| **Sun 2026-07-27** | Sections 4, 6, 7 fully written. |
| **Wed 2026-07-30** | Section 5 populated with LLM-rationale-layer Brier decomposition on n=200 (or n=2,400 if compute allows). |
| **Fri 2026-08-01** | Full paper review by you + Lora. |
| **Sat 2026-08-02 EOD** | Submit. |

Slack of ~24 h before the deadline is intentional. Anthropic + OpenAI credit topup timing is the only external dependency; both providers have fallback paths wired.

---

## 6. Related concurrent tracks (context, not asks)

- **IEEE VR 2027** (deadline 2026-08-24, submits after ICAIF): companion paper on the spatial forensic replay of the same attestation records. Different venue, different novelty axis, same reference implementation.
- **Y.U. Katz capstone** (defense window per your semester schedule): the credit-decision demo Alex will show you on Wednesday. Shared engineering artifact; separate deliverable.
- **Shadow v2.0.0 shipped 2026-07-10:** attest-core kernel now lives in `packages/attest-core/` with a zero-LLM-dep transitive-import contract test. Ready to cite as the reference implementation in Section 4.1.

---

*Everything above is a working draft. Nothing is committed until you sign off on D1 / D2 / D3.*
