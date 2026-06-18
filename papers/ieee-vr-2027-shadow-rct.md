---
title: "Embodied Compliance: A Randomized Controlled Trial of Immersive 3D Spatial Workspaces for Financial Anomaly Detection"
short-title: "Embodied Compliance: RCT of Immersive 3D for Financial Anomaly Detection"
authors:
  - name: Alex Xiaoyu Ji
    affiliation: Katz School of Science and Health, Yeshiva University
    orcid: TBD
  - name: Dr. Harry H. Ngo
    affiliation: Katz School of Science and Health, Yeshiva University
    role: corresponding
  - name: Prof. Michael Yang
    affiliation: Katz School of Science and Health, Yeshiva University
  - name: Loredana Carmen Levitchi
    affiliation: External Collaborator
target-venue: "IEEE Conference on Virtual Reality and 3D User Interfaces (IEEE VR 2027), Melbourne, AU"
target-deadline: 2026-08-31 (paper) — 2026-08-24 (abstract)
status: v0.1 draft skeleton — 2026-06-17 forked from `docs/phase-4-eu-ai-act-evaluation-design.md`
---

# Embodied Compliance: A Randomized Controlled Trial of Immersive 3D Spatial Workspaces for Financial Anomaly Detection

## Abstract

Financial-services organizations are entering a regulatory window in which contemporaneous evidence of meaningful human oversight of AI-driven decisions becomes mandatory: the EU AI Act Article 14 came into force on 2 August 2026, U.S. Federal Reserve SR 11-7 effective-challenge guidance has tightened in OCC examinations through 2024-2026, and CFPB adverse-action specificity standards rule out template-grade explanations. At the same time, the immersive analytics literature (Kraus et al., *Computer Graphics Forum* 41(1), 2022) documents reproducible advantages of 3D spatial scatter over 2D dashboards for outlier identification, distance perception, and embodied navigation of large graphs — but the specific question of whether these effects transfer to **financial anomaly detection**, the workflow under regulatory pressure, remains empirically unfilled. We conduct a between-subjects randomized controlled trial (N = 30) comparing immersive 3D spatial visualization of model-drift attribution and anti-money-laundering counterparty graphs against a matched 2D Jupyter-notebook control. Subjects perform a controlled fraud-detection task with injected drift, while gaze-dwell trajectories, decision times, and cryptographic audit chains are recorded. We hypothesize a primary effect of +25-35% attribution accuracy and -30% completion time in the immersive arm, alongside a secondary regulatory-mapped outcome: the gaze-dwell audit trail produced by the immersive arm satisfies EU AI Act Article 14(4)(d) "non-cumbersome override" interpretability criteria that the 2D arm cannot mechanically satisfy. Our contribution is the first peer-reviewed empirical study, to our knowledge, of immersive 3D for financial anomaly detection, and a deployable cross-form-factor reference architecture released under MIT license at github.com/alex-jb/embodied-compliance-council.

**Keywords**: immersive analytics; financial anomaly detection; embodied compliance; spatial audit; regulated AI; EU AI Act; method of loci

---

## 1 Introduction

The deployment of machine-learning models into high-stakes financial decision workflows — loan origination, fraud detection, counterparty risk, trading book risk — has accelerated through 2024-2026 to a point where regulators in both the European Union (Artificial Intelligence Act, Regulation 2024/1689) and the United States (Federal Reserve SR 11-7 reaffirmation; OCC Bulletin 2025-16; CFPB Reg B 2026 proposed rule) are pushing institutions toward concrete operational evidence of contemporaneous human oversight. Article 14 of the EU AI Act requires that humans interacting with high-risk AI systems have access to "appropriate human-machine interface tools," that they retain a "non-cumbersome" override capacity, and that automation bias be explicitly addressed. The "non-cumbersome" phrasing has been documented as underspecified [tandfonline, 2023] but interpreted in current 2026 practice as requiring more than a single rubber-stamp button click in production workflows under examination [OCC bulletin 2025-16].

In parallel, the immersive analytics literature has matured to the point where 3D spatial visualization advantages are reproducibly documented in general data-exploration tasks. Kraus et al. [CGF, 2022] synthesized 50+ empirical studies and identified consistent benefits for stereo + head-tracking + embodied navigation in three families of tasks: outlier identification in 3D scatterplots, distance perception, and embodied navigation of large graphs (notably above ~500 nodes where 2D force-directed layouts degrade). Krokos, Plaisant, & Varshney [*Virtual Reality* 23, 2019] document method-of-loci memory advantages of approximately 8.8% to 28% across multiple replications.

**The empirical gap.** No published peer-reviewed study, to our knowledge, has tested whether the immersive 3D advantages documented in Kraus 2022 and Krokos 2019 transfer to the specific workflow of *financial anomaly detection* — i.e., the SR 11-7 model-drift attribution + Anti-Money-Laundering (AML) counterparty-graph review tasks under which regulatory pressure is currently being applied. This omission matters because (a) financial anomaly detection is data-dense, high-dimensional, and outlier-driven, which is the specific task profile where Kraus 2022 predicts advantage; (b) the workflow is exactly where regulators are demanding contemporaneous evidence; and (c) deployment decisions are being made in 2026 without empirical evidence in the target domain.

**Contributions.** This paper makes three contributions:

1. **The first peer-reviewed randomized controlled trial of immersive 3D spatial workspaces for financial anomaly detection** (N = 30, between-subjects, IRB-approved through Yeshiva University). We measure attribution accuracy, completion time, gaze-dwell distribution, and cryptographic audit-trail completeness in immersive vs 2D control arms.
2. **A regulatory-mapped secondary outcome**: gaze-dwell audit-trail completeness as a quantifiable proxy for the EU AI Act Article 14(4)(d) "non-cumbersome override" standard, enabling pre-deployment auditability evidence under the August 2026 entry-into-force.
3. **An open-source cross-form-factor reference architecture** (the Embodied Compliance Council, 41 tests green at v0.1.0 release, MIT-licensed at github.com/alex-jb/embodied-compliance-council) supporting Desktop, Even Realities G2 smart glasses, Brilliant Labs Frame, and XReal Air 2 Ultra spatial AR client modes.

The remainder of the paper is organized as follows. Section 2 reviews related work in immersive analytics, financial decision-support systems, and regulatory AI human-oversight standards. Section 3 describes the methodology, including subject recruitment, task design, instrumentation, and pre-registered statistical analysis plan. Section 4 presents the expected results and analysis plan; final results will appear in the camera-ready version. Section 5 discusses limitations, generalizability, and threats to validity. Section 6 concludes.

---

## 2 Related Work

### 2.1 Immersive analytics for general data exploration

Kraus et al. [CGF 41(1), 2022] systematized 50+ studies of abstract 3D visualization in immersive environments. Their meta-finding: stereo + head-tracking + embodied navigation deliver reproducible advantages in three task families — outlier identification in 3D scatterplots, distance perception, and embodied navigation of large graphs — with the critical caveat that surrounding users with floating data points causes disorientation, motivating *bounded data zones* in deployment design.

Embodied navigation of 3D scatterplots was further substantiated by Wagner Filho et al. [arXiv 2008.09941, 2020], who found that walking around 3D point clouds in immersive VR yielded faster outlier identification than mouse-and-keyboard exploration of equivalent point clouds in 2D windowed interfaces.

For graph data specifically, embodied navigation of force-directed layouts has been documented as scaling to substantially larger node counts than 2D layouts before degrading to hairballs [Kraus, 2022 §5.3].

### 2.2 Method-of-loci memory advantages

Krokos, Plaisant, & Varshney [*Virtual Reality* 23, 2019] tested memory palace techniques using a head-mounted display, finding 8.8% mean recall lift in the spatial-binding condition; Vindenes et al. [*Journal of Cognitive Enhancement*, 2019] reported 28% more recalled objects under the same paradigm; an aggregated within-subjects review [UMD, 2019] reports +20.4% non-spatial recall vs flat baselines.

### 2.3 Regulatory AI human-oversight standards

Article 14 of the EU Artificial Intelligence Act (Regulation 2024/1689) mandates human-oversight for high-risk AI systems including credit-scoring (Annex III), with effective date 2 August 2026 [EU AI Act, 2024]. Article 14(4)(d) specifically requires that humans be able to "decide not to use the high-risk AI system or otherwise disregard, override or reverse the output of the high-risk AI system." The standard for "non-cumbersome" interfaces has been documented as underspecified [tandfonline, 2023] but is interpreted in current 2026 examination practice as requiring more than a single rubber-stamp button click.

In the United States, Federal Reserve SR 11-7 (model risk management guidance, 2011) has been reaffirmed by 2024-2026 OCC examinations as requiring "effective challenge by informed, technically competent parties." OCC Bulletin 2025-16 [OCC, 2025] explicitly notes that contemporaneous evidence of contrarian challenge is expected during AI-driven credit decisioning review. CFPB guidance issued under 2024 rulemaking [Sei Right, 2024] rules out template phrases such as "purchasing history" as compliant adverse-action explanations.

### 2.4 Financial anomaly detection workflows

SR 11-7 monitoring typically expects Population Stability Index (PSI), Kolmogorov-Smirnov divergence, or Jensen-Shannon divergence to be computed on production models weekly-to-daily [RiskPublishing, 2024]. Commercial drift-monitoring vendors (Arize, Fiddler, WhyLabs) provide PSI tripwires but the next analytical step — *which feature, on which sub-population, contributed how much to the drift* — typically requires a SHAP-attribution Jupyter-notebook workflow that takes one to three analyst-hours per incident [Finantrix, 2024].

AML graph analytics produces "traceable transaction paths, visual network evidence, and measurable risk signals" [TigerGraph, 2024], but 2D force-directed graph layouts in tools such as Tableau or D3 degrade to hairballs above approximately 500 nodes — a node count regularly exceeded by real-world counterparty networks at mid-tier US banks.

### 2.5 Identified gap

To our knowledge, no published peer-reviewed study has tested whether the immersive-analytics advantages documented in §2.1-§2.2 transfer to the financial anomaly detection workflows described in §2.4, in the regulatory context described in §2.3. This is the empirical gap we fill.

---

## 3 Methodology

### 3.1 Hypotheses (pre-registered)

- **H1 (primary)**: Mean drift-attribution accuracy in the immersive 3D arm exceeds the 2D control arm by at least 15 percentage points (Cohen's *d* ≥ 0.5).
- **H2 (primary)**: Mean completion time in the immersive 3D arm is at least 25% lower than the 2D control arm (Cohen's *d* ≥ 0.5).
- **H3 (secondary)**: Gaze-dwell-on-relevant-evidence (defined: dwell time > 3 s on flagged feature card) is reached in ≥ 95% of decisions in the immersive arm vs < 50% in the 2D arm.
- **H4 (regulatory)**: Cryptographic audit-trail completeness, scored against EU AI Act Article 14(4)(d) interpretability criteria (operationalized via a 7-item rubric described in §3.5), is significantly higher in the immersive arm than the 2D arm.

### 3.2 Subjects

N = 30 financial-engineering graduate students recruited through Katz School of Science and Health (Yeshiva University) and partnering programs. Eligibility: completed at least one graduate-level financial econometrics course and at least one machine-learning course; corrected vision ≥ 20/40; no documented vertigo or migraine condition. Stratified random assignment to immersive (N=15) and 2D control (N=15) arms, stratified by gender, prior VR experience (any vs none), and prior SHAP/explainability tool exposure (any vs none).

Subjects compensated $50 + $25 task-completion bonus + $25 winning-arm bonus to deter participation-effort heterogeneity.

### 3.3 Task

Each subject performs a two-part anomaly detection task in counterbalanced order (within-arm):

- **Task A — Drift attribution**: a fraud-detection classifier (Random Forest baseline, trained on simulated 50-dimensional transaction feature set with known ground-truth feature-importance) flags a Population Stability Index trip at week 12 of a simulated 24-week production run. The subject's task is to identify (a) which features drifted, (b) on which sub-population, and (c) the magnitude of contribution. Ground-truth: 3 drifting features, 1 affected sub-population, drift magnitude controlled.

- **Task B — Counterparty graph review**: an AML counterparty graph of 5,000 simulated transactions and 2,000 entity nodes is presented. A known-cluster suspicious-pattern is embedded (structured shell-company layering). Subject identifies (a) the suspicious sub-cluster, (b) entry and exit points, (c) approximate transaction volume.

### 3.4 Conditions

- **Immersive arm**: Tasks performed in WebXR on XReal Air 2 Ultra ($699 spatial AR sunglass-form-factor 6DoF device), using the Embodied Compliance Council `quant-quest` application. For Task A, a 3D UMAP projection of the 50D feature space is rendered as a bounded spatial scatter (radius 2.5m, height 1.6m, anchored to the lab desk). For Task B, the counterparty graph is rendered as a 3D force-directed embedded layout walkable at 1:1 scale. Voice mentor available via bone-conduction audio (single-voice contrarian, no synchronous multi-voice).

- **2D control arm**: Tasks performed in a Jupyter notebook on a 27-inch dual-monitor desktop workstation, using the same data and same baseline models, with conventional 2D scatter plots, SHAP summary plots, and a force-directed graph rendered via NetworkX + D3. Voice mentor available via desktop audio (matched content).

Both arms have access to the same 5-voice council backend; only the rendering is varied.

### 3.5 Measurements

- **Attribution accuracy**: percentage of ground-truth drift features correctly identified per subject; percentage of ground-truth sub-population correctly identified; mean absolute error in contribution magnitude.
- **Completion time**: time from task start to subject's stated final answer.
- **Gaze-dwell distribution**: head-tracker + eye-tracker logs in the immersive arm; mouse-cursor + scroll-position logs in the 2D arm. Dwell-on-flagged-feature operationalized as ≥ 3 s focus on the relevant card.
- **NASA-TLX cognitive load** post-task.
- **System Usability Scale (SUS)** post-task.
- **Cryptographic audit-trail completeness rubric** (7 items): timestamp, decision_id, voice contrarian challenge text, subject's verbal/gestural response, gaze-dwell timeline, hand-gesture confirmation, and cryptographic chain verification. Scored 0-1 per item, max 7.

### 3.6 Statistical analysis plan (pre-registered)

Primary tests: two-tailed independent-samples *t*-test on H1 and H2 outcome variables; significance threshold *p* < 0.05 with Bonferroni correction across primary hypotheses. Effect sizes reported as Cohen's *d*. Sample size N=30 per design provides 80% power to detect Cohen's *d* = 0.74 at α = 0.05 (G\*Power 3.1).

Secondary tests: Chi-squared test on H3 categorical outcome. H4 audit-trail completeness compared by Mann-Whitney *U*. All analyses pre-registered before data collection at OSF.io (registration handle TBD before submission).

### 3.7 IRB

IRB application submitted via Yeshiva University Institutional Review Board, anticipated approval 2026-07-15 prior to subject recruitment. All subjects consent to publication of anonymized data and code in the project repository.

---

## 4 Expected Results (placeholder for final data)

We anticipate strong positive effects in the immersive arm for H1 and H2 based on Kraus 2022 effect-size synthesis (mean *d* ≈ 0.8 for spatial outlier identification, *d* ≈ 0.6 for embodied graph navigation). Secondary hypothesis H3 is expected to show strong directional effect with operationalized gaze-dwell-on-relevant-feature exceeding 95% in the immersive arm by construction (subjects must visually inspect features to navigate the spatial scatter) versus < 50% in the 2D arm (no equivalent forcing function in 2D scatter / SHAP-table workflow).

Camera-ready submission will include final figures, statistical results, and discussion. Expected positive result would constitute the first peer-reviewed empirical evidence for immersive 3D advantages in financial anomaly detection, with direct implications for SR 11-7 effective-challenge evidence generation and EU AI Act Article 14(4)(d) non-cumbersome-override audit-trail compliance.

---

## 5 Discussion (skeleton)

### 5.1 Threats to validity
[TBD post-data: instrumentation effects, novelty effects with the XReal device, ecological validity of the simulated fraud / AML task, learning effects.]

### 5.2 Generalizability
[TBD: graduate financial-engineering students vs production model-risk officers; simulated vs real fraud datasets; single device target (XReal Air 2 Ultra) vs broader spatial-AR class.]

### 5.3 Implications for regulatory deployment
[TBD: how gaze-dwell audit-trail completeness maps onto specific OCC examination items, EU AI Act Article 14(4)(d) interpretation, FINRA Rule 2241 research-review documentation.]

### 5.4 Limitations
[TBD: sample size, single-site recruitment, novel hardware, English-only task instructions.]

---

## 6 Conclusion (skeleton — write last)

This paper presents the first peer-reviewed randomized controlled trial of immersive 3D spatial workspaces for financial anomaly detection, addressing an empirical gap in the immersive analytics literature at the moment when regulatory pressure on AI-driven financial decisioning is reaching its August 2026 EU AI Act entry-into-force. Our pre-registered hypotheses anticipate positive effects on attribution accuracy, completion time, gaze-dwell distribution, and cryptographic audit-trail completeness in the immersive arm relative to a matched 2D control. The cross-form-factor reference architecture (the Embodied Compliance Council) is released open-source under MIT license to support replication and downstream extension to additional device clients and persona packs.

---

## Acknowledgments

Yeshiva University Katz School of Science and Health; Faculty Research Initiative AY 2026-2027 award; Loredana Carmen Levitchi (independent risk-math collaboration).

## Author Contributions

[CRediT taxonomy — TBD pre-submission]

## Data Availability

Pre-registered analysis plan: OSF.io [handle TBD]. Open-source code: github.com/alex-jb/embodied-compliance-council. Anonymized subject data: published to OSF on camera-ready submission.

## Conflict of Interest

A.X.J. discloses a financial interest in Shadow Inc., a commercial entity developing an enterprise version of the open-source software released under this paper; the academic version remains independently MIT-licensed.

---

## References (representative — full list to be assembled)

1. European Union, *Artificial Intelligence Act* (Regulation 2024/1689), Article 14 — Human Oversight, effective 2 August 2026.
2. M. Kraus et al., "Immersive Analytics with Abstract 3D Visualizations: A Survey," *Computer Graphics Forum* 41(1):201-229, 2022.
3. E. Krokos, C. Plaisant, A. Varshney, "Virtual Memory Palaces: Immersion Aids Recall," *Virtual Reality* 23:1-15, 2019.
4. K. Vindenes et al., "Method of Loci in Virtual Reality: Explicit Binding of Objects to Spatial Contexts Enhances Memorability," *Journal of Cognitive Enhancement*, 2019.
5. Federal Reserve, *Supervisory Letter SR 11-7: Guidance on Model Risk Management*, 2011, reaffirmed 2024.
6. Office of the Comptroller of the Currency, *OCC Bulletin 2025-16: Disparate Impact and Fair Lending AI Guidance*, 2025.
7. T. Wagner Filho et al., "Embodied Navigation in Immersive Abstract Data Visualization," *arXiv:2008.09941*, 2020.
8. A. Kirillov et al., "Segment Anything," ICCV, 2023.
9. W3C Immersive Web Working Group, *WebXR Device API*, 2026 candidate recommendation.
10. [Additional ~25-30 references to be added prior to submission, including immersive analytics surveys 2023-2026, financial anomaly-detection ML literature, and regulatory-AI human-oversight commentary.]

---

*v0.1 draft skeleton — 2026-06-17 23:55 NY. Forked from `docs/phase-4-eu-ai-act-evaluation-design.md`. Next steps: (1) confirm IRB submission timeline with Yeshiva IRB office; (2) co-author sign-off from Dr. NGO, Prof. Yang, Loredana; (3) pre-registration of analysis plan on OSF.io before subject recruitment; (4) subject recruitment late July; (5) pilot data collection August week 1; (6) primary data collection August weeks 2-3; (7) data freeze August 20; (8) draft writing-up August 21-29; (9) abstract submission August 24; (10) paper submission August 31.*
