# Capstone Thesis Amendment — Email Draft for Prof. Michael Yang

**To**: michael.yang@yu.edu
**From**: xji1@mail.yu.edu (Xiaoyu / Alex Ji)
**Subject**: Capstone thesis scope clarification — extending from calibration core to "calibration as audit primitive for spatial pre-trade compliance"

---

Dear Prof. Yang,

Quick scope clarification I'd love your input on, in advance of our Week 4 meeting.

**Where the project stands.** The Week 1-2 thesis was *"From Paper to Production: Calibration Discipline in a Solo-Operated AI Trading Agent."* The Week 3 walk-forward result (out-of-sample Sharpe negative → my pre-registered "iff" gate triggered → held the $300 deployment) was a positive methodological result, not a failure. It also surfaced an opportunity I'd like to flag now rather than at midterm.

**What I'd like to extend.** Reading my own annotated bibliography back this week, I noticed a gap between two threads I'd cited but not yet connected:

1. Calibration discipline (Brier, Tetlock, Guo, Kadavath) — the *measurement* of whether forecasts deserve trust.
2. AI agents and self-improvement (Shinn / Reflexion, Sakana / Darwin-Gödel) — the *enforcement* layer that prevents unmeasured changes from sneaking into a production system.

I'd like to extend the thesis title to:

> **"Calibration Discipline as the Audit Primitive for Spatial Pre-Trade Compliance in Live Trading"**

The Brier-calibration core remains intact and is still the primary defended claim. The extension reframes the calibration metric explicitly as the *audit primitive* that distinguishes a meaningful pre-trade compliance approval (a gesture-vote attached to a calibrated probability) from compliance theater (a gesture-vote attached to no measurable epistemic commitment). The result is a single thesis covering both *measurement* (Brier, Expected Calibration Error, LLM self-calibration, structured Reflexion logs) and *enforcement* (cryptographically signed gesture-vote audit trails, optional spatial XR layer).

**Why this is natural, not scope creep.** I separate it into two phases tied to the existing course schedule:

- **Phase 1 — Calibration core (Weeks 4-6).** Six calibration upgrades drawn directly from sources in my annotated bibliography:
  - Expected Calibration Error + temperature scaling on LLM probabilities (Guo et al. 2017, ICML)
  - LLM second-order self-calibration pre-flight check (Kadavath et al. 2022, Anthropic)
  - Structured Reflexion JSON injected into daily prompt context (Shinn et al. 2023, NeurIPS)
  - Microstructure-aware information staleness tagging (O'Hara 1995)
  - Confidence-shrunk Kelly position sizing (Kelly 1956 + Guo 2017)
  - PR-gated agent self-modification (Sakana 2025, Darwin-Gödel Machine) with a mandatory Brier-improvement merge rule

  Each upgrade is measurement-first: no behavior change to position sizing until Phase 1 validation completes. The 14-day paper-trading reproduction of the new ATR-stops backtest (the rule I committed to following the Week 3 gate trigger) continues uninterrupted.

- **Phase 2 — Spatial enforcement layer (Weeks 7-10).** A WebXR app for Meta Quest 3S in which every pre-trade approval requires a physical gesture-vote signed by a SHA-256 hash chain (WebCrypto API), exportable in SEC FIX 5.0SP2 and FINRA OATS audit formats. This phase plugs into the Phase 1-validated Orallexa backend; if Phase 1 produces a null or negative calibration result, Phase 2 still ships as an independent prototype for my Dr. NGO XR Final Project class and contributes a "spatial audit primitive" submission to ICAIF 2027 separately.

**The defendable capstone claim by August 12 is Phase 1.** Phase 2 is "future work" if not completed; thesis defense rests on Phase 1's empirical claim. The combined claim is what I'd target for ICAIF 2027 (deadline ~2026-09-15).

**My ask.** Does this read as a natural sharpening of the Week 1-2 thesis, or as scope creep that I should pull back to the original framing? I'm prepared to defend either, but I'd rather know now than at midterm.

**One related item.** Paul Russo (Vice Provost / Dean, Katz School) issued an RFP on June 12 for the Katz School Faculty Research Initiative AY 2026-2027 (applications due August 15, awards $1K–$4K, work begins September 15). The priority areas explicitly include AI, Data Analytics, and "World Models" as a seed-grant emerging area, and the published evaluation criteria specifically reward publication path + external-funding potential + Katz graduate student engagement. The Embodied Compliance Council project scores 100/100 against those criteria on paper. I have a 2-page narrative drafted that positions Dr. NGO as primary PI on the banking vertical, you as co-PI on the trading vertical, and Loredana Levitchi as external risk-math collaborator on the IEEE banking paper. I'd like to ask whether you'd be willing to be named co-PI on a $3,000 single-year submission. Total faculty time commitment would be one annual presentation at the Katz faculty event + signing off on a one-page status report in spring 2027. I'd handle the proposal-writing and submission logistics. Drafts are at `docs/katz-rfp-2026/` in the project repo (cover page, narrative, budget, bios — all PDF for your review).

Open to a 15-minute call any day this week, or async via email — whichever works for your schedule.

Best regards,
Alex Ji
COM 6000-CP1
Yeshiva University MS in Computer Science

---

## Send checklist

- [ ] Capstone advisor signature is formalized (if not, ask in this email)
- [ ] Annotated Bibliography attached (PDF) for context
- [ ] CC: nobody by default (1:1 with Yang)
- [ ] Subject line matches above
- [ ] Send: Tuesday morning ET before his class
