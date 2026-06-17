# Phase 4 — EU AI Act Article 14 + ECOA / Reg B Compliance Evaluation Design

**Purpose:** Define the empirical evaluation that will appear in the capstone defense (trading vertical) and IEEE banking-vertical paper to support the claim "calibration discipline + spatial audit improves human oversight outcomes versus dashboard baselines."

**Status:** Year 2 (post-ICAIF 2027 acceptance). Not blocking 2026-08 capstone defense, but cited in the proposal as the natural follow-on.

---

## 1. Two regulatory frames

### EU AI Act Article 14 (Human Oversight)

Article 14 requires that "high-risk AI systems shall be designed and developed in such a way that they can be effectively overseen by natural persons during the period in which the AI system is in use." Specifically, the human overseer must be able to:

1. **Fully understand the capacities and limitations** of the system
2. **Remain aware of automation bias** (over-reliance)
3. **Correctly interpret the system's output** taking into account interpretation aids
4. **Decide not to use the system** or override its decision
5. **Intervene** in the operation of the system or interrupt the system

Council-style multi-voice systems and spatial audit interfaces are interpretation aids per (3) and (4). The empirical claim under test is whether they materially improve outcomes on (2), (3), and (4).

### U.S. ECOA / Regulation B

ECOA + Reg B prohibit discrimination on protected-class basis in credit decisions. Reg B §1002.9(b)(2) requires that an adverse-action notice cite the specific reasons that contributed to the decision. CFPB Circular 2022-03 reinforces this for AI/ML decisions. The banking-vertical Fair Lending Reviewer voice is designed to flag protected-class proxy variables in the decisioning rule before they propagate to adverse action notices.

The empirical claim under test is whether multi-voice review reduces (a) proxy variable propagation into final decisions, and (b) generic-boilerplate adverse-action notices.

---

## 2. Hypothesis statement

**H1 (Trading, EU AI Act 14):** Human overseers shown a 5-voice calibrated council with spatial XR presentation will exhibit fewer automation-bias errors (defined as "overrode the council's WAIT when WAIT proved correct ex-post") than overseers shown a single-voice baseline dashboard, after correcting for baseline forecast skill.

**H2 (Banking, ECOA / Reg B):** Loan-origination decisions reviewed by the 5-voice banking council with Fair Lending Reviewer enabled will have (a) lower disparate-impact ratio across protected classes and (b) higher adverse-action-notice specificity score than decisions made by the same overseer without the council, holding the loan distribution constant.

Both hypotheses are conservative — they predict directional, not necessarily large, effects. The capstone's defendable claim is "directionally better with adequate statistical power," not "10× better."

---

## 3. Experimental design

### Within-subjects, two-condition

Each participant overseer reviews N decisions in both conditions:

| Condition | Trading vertical | Banking vertical |
|---|---|---|
| **Baseline** | Single-voice dashboard, no calibration history shown | Single-reviewer loan decisioning UI |
| **Treatment** | 5-voice council + Brier-calibration-shrunk verdicts + WebXR spatial scene + Mediapipe Hands gesture verdict | 5-voice council with Fair Lending Reviewer; spatial XR optional toggle |

Order randomized to prevent learning effects. Decisions are real production cases (synthetic where confidentiality requires) with known ex-post resolution.

### Sample size

Power analysis at α=0.05, β=0.20, and **expected effect size d=0.35** (conservative Cohen's d):

- Per-vertical n ≈ 80 paired decisions per condition per participant
- Per-vertical recruit count ≥ 16 overseers
- Total participation: ≥ 32 overseers × 80 × 2 conditions = 5,120 decision-views

This is large but feasible because:
1. Each decision-view takes < 90 seconds
2. Participants are paid $50 + free Quest 3S session for time
3. Banking decisions can be drawn from a public CFPB synthetic dataset

### Pre-registration

Before participant 1, register on AsPredicted.org:
- Two primary outcomes (one per vertical)
- Three secondary outcomes (proxy detection rate, plain-language disclosure quality, audit-trail completeness)
- Stopping rule: hit pre-registered n or 90 days, whichever first
- Analysis plan: pre-specified linear mixed-effects model with participant as random effect

Pre-registration prevents p-hacking and is explicitly required by ICAIF 2027 submission guidelines.

---

## 4. Primary outcome measures

### Trading (EU AI Act 14)

1. **Automation-bias error rate** = number of decisions where the participant overrode the council's WAIT and the override was wrong / total override opportunities.
2. **Calibration-aware-decision quality** = Brier score of participant's final verdicts vs ex-post resolution, broken down by condition.
3. **Decision time** = seconds between decision-view start and final verdict.

### Banking (ECOA / Reg B)

1. **Disparate-impact ratio** for approval rates across protected classes (race, sex, age). Four-fifths rule violation = primary outcome.
2. **Adverse-action notice specificity** = expert-rated score on a 1-5 scale across 50 randomly sampled denials per condition. Generic boilerplate scores 1; specific feature-level reason scores 5.
3. **Protected-class proxy variable propagation** = number of features in the final decision rule with proxy_score > 0.6 against any protected class.

---

## 5. Secondary measures

- Hash-chain audit trail completeness: percentage of decisions with verifiable chain entry (target: 100%)
- Calibration drift over study window: per-voice Brier delta, week-over-week
- Time-to-intervention: in scenarios where the council is intentionally biased, how long until the participant notices and overrides
- Subjective overseer-confidence ratings (Likert 1-5) collected after each block

---

## 6. Ethics

- IRB review at Yeshiva University before participant 1. Likely exempt under 45 CFR 46.104(d)(3) (research using synthetic loan data and synthetic trading scenarios).
- Participants consent to recording of their voice-and-spatial-interaction stream during the WebXR session. Recordings are stored encrypted, accessible only to the PI, deleted after analysis.
- Pseudonymization at collection time; the participant_id maps to an opaque random string in the analysis dataset.

---

## 7. Timeline

| Phase | Calendar | Deliverable |
|---|---|---|
| 4.0 | 2026-09 → 2026-12 | Pilot study (n=4) on capstone codebase as it exists at ICAIF submission; refine UX and instrument timing |
| 4.1 | 2027-01 → 2027-03 | IRB submission + pre-registration + recruit participants (target n=16 per vertical) |
| 4.2 | 2027-04 → 2027-07 | Full study execution |
| 4.3 | 2027-08 → 2027-10 | Analysis + IEEE manuscript draft |
| 4.4 | 2027-11 → 2028-01 | IEEE submission + revisions |

---

## 8. What this design is NOT

- **Not** a head-to-head test of "AI alone vs human alone" — both arms include the same human decision authority. The test is whether interpretation aids change human behavior.
- **Not** a test of the underlying calibration math — that is the capstone thesis claim and is tested separately on the brier_audit data.
- **Not** a commercial product evaluation — synthetic CFPB data and sandbox trading scenarios are used precisely so the study can be done without bank IRB and SEC sign-off.
- **Not** generalizable to all regulated AI domains. The two verticals (trading + banking) are deliberately specific test cases for the more general claim.

---

## 8.5. Related work — OpenAI Deployment Simulation (2026-06)

OpenAI's [Deployment Simulation](https://openai.com/index/deployment-simulation) paper (2026-06) proposes using historical conversation data to predict a new model's deployment behavior *before* the model goes live. The methodology partially overlaps with this Phase 4 design and partially complements it.

**Overlap:** Both efforts treat pre-deployment behavior prediction as a calibration-and-audit primitive, not a marketing surface. Both produce structured artifacts (Brier-scored verdicts here, distributional predictions in OpenAI's case) that downstream regulators can interrogate.

**Difference:** Deployment Simulation is intra-model — same architecture, new weights, simulated against past prompts. Phase 4 is inter-architecture — single-voice baseline vs five-voice council against the same regulated decisions. The two methodologies are stackable: a council-of-simulations is a coherent research direction once both primitives exist.

**Phase 4 contribution after considering OpenAI's work:** the spatial XR presentation layer, the per-voice tool restriction structure, and the regulatory-frame motivation (Article 14 + Reg B specifically, not just "safety") remain unique. Cite OpenAI's work as related; do not pretend it does not exist; do not claim novelty on the parts that overlap.

## 9. Dependencies

- Phase 1 #1-#6 fully integrated and producing per-voice Brier histories (status as of 2026-06-17: #1-#2 production; #3-#6 wire-up scripts shipped, cron not yet installed)
- Phase 2.5 + 2.6 WebXR scenes with MediaPipe Hands (desktop) and XRHand (Quest 3S) working end-to-end (status: ✅ both shipped 2026-06-17)
- Phase 3 council-runner HTTP + Vercel adapter to serve real Anthropic deliberation to participant browsers (status: ✅ shipped 2026-06-17)
- Phase B Loredana risk-math integration for banking-side decisions to feel grounded (status: pending Loredana code share)
- ICAIF 2027 paper accepted (target: ~2026-12); paper sets the methodological context this study tests

---

## 10. Capstone defense framing

This is **future work** named explicitly in the August 2026 defense. The defense argues:

1. Phase 1 calibration discipline is the necessary methodology (Brier + ECE + temperature + Reflexion + Kelly + Sakana-DG)
2. Phase 2 spatial XR is the necessary surface (interpretation aid per Article 14)
3. The empirical proof that (1) + (2) actually improves Article 14 outcomes — Phase 4 — is the Year-2 follow-on the Katz Faculty Research Initiative seed grant explicitly supports

Without Phase 4 results, the defense rests on the methodological-soundness argument plus the construct-validity argument that the surface implements the legal requirements. With Phase 4 results in hand, the IEEE paper closes the loop with empirical evidence.
