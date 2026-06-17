---
title: "Project Narrative"
subtitle: "Embodied Compliance Council — AY 2026-2027"
---

## Rationale

Production AI agents in regulated industries fail not because they are slow but because they are *confident-but-wrong*, leave no audit trail, and have no per-voice calibration history. Single-voice agentic systems propagate the confidence of the model with no measure of which voices were historically reliable. The Embodied Compliance Council (ECC) addresses this gap directly. Each consequential decision (trading-book change, loan origination, wealth-advisory recommendation) is debated by five disagreement-by-design AI voices, each restricted to a distinct subset of evidence tools (factor exposures, sector dynamics, fair-lending statistics, etc.) so the council achieves *epistemic diversity* rather than collapsing to the foundation model's default opinion. Every verdict is logged with confidence, then Brier-scored against the eventual outcome over weeks and months. Voices whose dissents proved load-bearing receive higher weight; voices whose certainty was noise receive lower weight.

The work answers two open research questions in regulated AI. First, **does calibration discipline materially improve the safety of agentic decisions under EU AI Act Article 14 (human oversight) and U.S. ECOA / Reg B (disparate-impact prevention)?** Second, **does spatial extended-reality presentation of a multi-voice council improve human oversight outcomes versus traditional dashboard surfaces?** Both questions have direct industrial relevance (regulated U.S. hedge funds, mid-market banks, AI-augmented wealth advisors) and clear academic publication paths (ICAIF 2027 for the trading-vertical findings, IEEE TIFS or IEEE CS&M for the banking-vertical work).

Results will be published at ICAIF 2027 (trading vertical, calibration-and-audit methodology paper) and submitted to an IEEE journal for the banking vertical (ECOA / Reg B disparate-impact detection via multi-voice fair-lending review). The open-source codebase remains at github.com/alex-jb/embodied-compliance-council under MIT license, providing the broader research community with a reproducible reference implementation.

## Design and Methodology

The project comprises three packages, all under active development as of June 2026:

1. **`council-voices`** — Ten production system prompts (5 trading + 5 banking voices) with tool restrictions defining each voice's allowed evidence subset and strict-JSON verdict schemas. Voices include Macro Analyst, Sector Specialist, Portfolio Manager, Growth-VC Contrarian, Activist Short (trading), and Credit Fundamentals Analyst, Risk Officer, Fair Lending Reviewer, Customer Advocate, Macro Contrarian (banking). Shipped 2026-06-16.

2. **`orallexa-risk`** — Seven risk primitives with Pydantic input/output schemas and Anthropic tool-call schemas. Trading-side primitives (VaR, Expected Shortfall, factor exposures, beta decomposition, concentration, sector exposure, correlation) currently scaffolded; banking-side risk math primitives integrated from Loredana Levitchi's 120-page banking-risk research document during the proposal period. Phase B merge planned 9-14 days after handoff.

3. **`spatial-gating-protocol`** and two consumer WebXR applications (`trading-quest`, `banking-quest`) — TypeScript + Three.js + WebXR scenes deployable to Meta Quest 3S devices. Each scene renders the five council voices as spatial podiums around the user, with a WebCrypto SHA-256 hash-chain audit panel logging every council decision tamper-evidently. Scaffold shipped 2026-06-17 with passing unit tests and verified production build.

The empirical phase (Sept 2026 – April 2027) will (a) collect production calibration data on at least 1,000 council decisions across the two verticals, (b) measure ECE (Expected Calibration Error) per voice with temperature-scaling correction, (c) run Reflexion-style retrospectives that update each voice's preamble with lessons learned, and (d) conduct a within-subjects user study comparing dashboard versus spatial XR presentation of the council on regulated decision outcomes. Success metrics: ECE reduction ≥ 0.01 absolute on Brier score, statistically significant (α=0.05) difference in human-override quality between dashboard and XR conditions, and at least one accepted publication.

## Outcomes and Benefits

Direct beneficiaries: (1) 1-2 Katz graduate students gain real research experience on a published codebase; (2) the broader regulated-AI research community gains an MIT-licensed reference implementation of multi-voice deliberation with calibration audit; (3) the Katz School gains visibility through ICAIF 2027 and IEEE publication acknowledgments. Indirect beneficiaries: enterprise compliance teams in U.S. banks and trading firms who can adopt the open-source primitives for internal regulated workflows under the EU AI Act and U.S. ECOA / Reg B compliance environments.

## Partners

- **Loredana C. Levitchi** — banking risk-math co-developer and IEEE paper co-author. Contributes Python implementations of VaR, Expected Shortfall, default probability, and loss-given-default models from her existing banking-risk research base.
- **github.com/alex-jb/embodied-compliance-council** — public monorepo under MIT license, providing reproducibility for reviewers.

## Results from Previous Support

This is a new application. No prior Katz Faculty Research Initiative funding. Related prior work by the graduate RA (Alex Ji) includes the open-source `council-diff` (TypeScript, 5-voice deliberation + Brier audit, npm v0.4.2 with 3,000+ stars) and `capstone-orallexa-calibration` (Python, ECE + temperature scaling + Reflexion + Kelly + Sakana DG self-modification, 64 unit tests). The current project extends these primitives into the regulated finance and banking domains with formal academic evaluation and an embodied spatial layer.
