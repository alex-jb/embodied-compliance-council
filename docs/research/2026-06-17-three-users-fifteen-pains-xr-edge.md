---
tags: [research, ux, banking, quant, trader, xr, smart-glasses, user-pains]
date: 2026-06-17
status: empirical user research for ECC narrative pivot
---

# Three Users, Fifteen Real Pains, and Where XR Actually Wins

Deep research agent output. Concrete daily-workflow pains across banking compliance officer, quant/data engineer, and trader/PM, mapped to data structure, then ranked by whether XR actually solves them.

## Top finding

**6 of 15 pains have a real XR edge. 9 of 15, 2D is fine — don't shoehorn XR.**

## The two specific wedges where XR genuinely wins

### Immersive headset (Quest 3 / Vision Pro)
- **Counterparty / AML graph navigation** (50k nodes) — 2D hairballs above ~500 nodes, embodied 3D nav with body-memory clusters wins per Kraus CGF 2022
- **Fraud feature-space UMAP walkthrough** — quant walks around the manifold, misclassified points spatially cluster, drift becomes visible
- **Correlation surface across regimes** — 2007→2009 stress collapse visible as 3D deformation, not hidden in static heatmap
- **Liquidity surface** — position × stress × time-to-exit cliff visible from one angle, hidden from another

### Smart glasses (Even G2, no camera, $599)
- **Banking compliance "show me you reviewed this"** — always-on transcription + bone-conduction prompts create timestamped audit-grade record of *what analyst considered and rejected*
- **In-lens adverse-action prompt** — top-3 model-traceable ECOA-safe denial reasons surface while officer types notice
- **No-camera positioning is the regulatory moat** — Even G2's camera-free architecture is the wedge no monitor / tablet / Quest 3 can serve in client-facing regulated meetings

## The 9 pains where 2D wins

- Rubber-stamp fatigue (workflow problem, not viz)
- Manual data spreading (OCR + LLM extraction)
- Disparate-impact stats (Excel + Folium map fine)
- Stale data propagation (2D Sankey)
- Overnight batch authoritative book (architecture problem)
- PSI/KS drift attribution (SHAP waterfall 2D)
- Factor exposure decomposition (Barra X-Sigma-Rho 2D works)
- Kelly geometry (Plotly 3D in browser 80% as good)
- Multi-resolution time series (more monitors, not new representation)

## Vision Pro / Apple status (Oct 2025)

- Apple halted Vision Pro overhaul October 1, 2025 to focus on smart glasses
- US Vision Pro sales <1M units 1 year post-launch
- Bloomberg Pro for Vision shipped Feb 2024 but adoption "drip-by-drip frustrating"
- No disclosed JPM / Goldman / Citadel Vision Pro pilots
- **Realistic finance penetration**: years, possibly never
- **Likely 2026-2028 winner**: lightweight smart glasses (Meta Ray-Ban Display + Even-class), not headsets

## Even Realities G2 specifics

- $599, monocular green HUD, bone conduction, IP67, 1-2 day battery
- **Conversate mode**: ambient AI surfaces info during live conversation, generates meeting summaries
- Confirmed in-use: tech investor accessing real-time market info during live CNBC/Bloomberg TV interviews without breaking eye contact
- **Camera-free architecture explicitly positioned for "high-stakes environments — meetings, clinical settings, legal proceedings, negotiations"** — direct fit for compliance officer / wealth advisor
- Limit: monocular text-first, simple graphics only, no rich charts, no video

## Three user pitches if ECC pivots to user-pain hero (not council debate)

### Banking compliance officer
You review 40 loans/day. By 3pm you're rubber-stamping. OCC examiner asks you to prove you actually considered the alternative interpretation. **ECC = your verbal contrarian in Even G2 earpiece. AI voice raises the one objection a fair-lending examiner would raise. You answer aloud. Both challenge + your response transcribed + timestamped + filed under loan ID.** When examiner asks "show me," you don't show a memo, you show the transcript of you defending the decision against an OCC-trained model. XR wrapper = Even G2 (no camera, privacy-safe), not 3D headset, not 5 podiums.

### Quant / SR 11-7 model risk
Your fraud model PSI tripped. You know something drifted. You don't know which feature on which sub-population. Today: 90 min in a notebook. **ECC = 3D immersive UMAP projection of failure neighborhood. Put on Quest 3, walk around manifold, mis-classified points spatially clustered, regime shift literally visible** — last month's healthy cluster now a thin shell with a bulge of new mis-classifications next to it. Take headset off, report writes itself. AI council = smaller meta-layer: 5 risk personas sanity-check the explanation before model risk committee.

### PM / Trader
You think correlation assumptions are stress-tested. **Put on Vision Pro, see correlation surface deform across 2007→2009 regime. Doesn't gently rise — collapses into a spike at Lehman moment.** Drag current book onto surface, see exactly which 4/30 positions all become correlated to your hedge in stress. Liquidity surface shows 3D cliff where doubling vol makes 6 positions un-exitable together. **2D heatmaps you live with today HIDE this geometry**. AI council = post-mortem voice (5 personas: Buffett value / Soros reflexivity / Druckenmiller macro / Kelly geometric / Taleb tail) audits trade after fact. Hero = geometry visible only in spatial computing.

## Founder verdict

**Yes, pivot the hero — partially.**

Three structural problems with "5 AI voices debating in XR":
1. Council in front of the data. Users want data first, voice when stuck.
2. Implies user is *spectator*. Spectators don't pay. *Tools* get paid.
3. Uses XR for *show* (5 podiums) not for *information density gain* (3D manifold, embodied graph). Great submission artifact, weak user wedge.

**Recommended repositioning (ranked):**

1. **Lead with User 1 (banking compliance) + smart glasses.** Tightest narrative + camera-free regulatory moat. Council becomes "verbal contrarian in your ear, transcribed for the examiner" — not 5 podiums in VR.
2. **Lead with User 2 (quant / SR 11-7) + immersive headset.** Hero artifact: walk through fraud feature-space UMAP. AI council audits model's explanation.
3. **De-emphasize User 3 (trader/PM).** Vision Pro adoption stalled, Apple pivoted to glasses. Keep as stretch demo, not wedge.

**Do NOT abandon the council.** It IS right intellectual scaffolding for User 1 — single contrarian voice is council of 1; 5-voice scales to "different examiner perspectives" (OCC vs CFPB vs state AG vs internal audit vs plaintiff counsel). What's wrong is *staging*. Don't show 5 podiums. Show **one analyst, one file, one voice in their ear that asked the question they didn't**.

## Concrete next moves

1. Repaint banking-quest demo from "5 voices on podiums" to "loan officer + Even G2 + in-lens contrarian prompt during review"
2. Build smart-glasses-mock demo in browser (monocular green HUD overlay on Loom walkthrough of loan file) — cheaper than WebXR podium and tells the User-1 story more honestly
3. Keep trading-quest WebXR demo as User-2 wedge for immersive UMAP angle; reframe 5 podiums as "5 model-risk personas auditing drift explanation"
4. For Katz RFP narrative: lead "compliance-officer-in-the-loop XR" not "5-voice deliberation." Tighter academic story, Dr. NGO / Yang / Lora's banking-risk fit is sharper

## Evidence gaps

- No peer-reviewed RCT on immersive 3D for *financial* anomaly detection specifically. Kraus 2022 covers general 3D scatter. **ECC could be first published study here — real research contribution worth a paper**
- No disclosed JPM / Goldman / Citadel Vision Pro pilots
- No public Even G2 finance enterprise case study yet (CNBC anecdote is best evidence)
- CFPB Reg B / OCC disparate-impact regulatory turbulence (April 2025 EO 14281, OCC 2025-16, CFPB 2026 proposed rule) means User 1 pain 1.4 shrinking at federal level. State AGs + private litigation remain. Position carefully.

## Source index

[OCC Bulletin 2025-16](https://www.occ.gov/news-issuances/bulletins/2025/bulletin-2025-16.html) · [CFPB Reg B proposed overhaul](https://www.consumerfinancialserviceslawmonitor.com/2025/11/cfpbs-proposed-reg-b-overhaul-ending-ecoa-disparate-impact-narrowing-discouragement-and-reshaping-spcps/) · [Oliver Wyman 2024 CRO survey](https://www.oliverwyman.com/our-expertise/insights/2024/nov/risk-strategies-for-bank-cro-build-future-resilience.html) · [Kraus 2022 CGF immersive analytics survey](https://onlinelibrary.wiley.com/doi/abs/10.1111/cgf.14430) · [Even Realities G2](https://www.evenrealities.com/smart-glasses) · [Bloomberg Pro for Vision press](https://www.bloomberg.com/company/press/bloomberg-pro-for-vision-revolutionizes-financial-professionals-productivity-with-apple-vision-pro/) · [Apple halts Vision Pro overhaul](https://finance.yahoo.com/news/apple-halts-vision-pro-overhaul-214143343.html) · [Bloomberg Law smart glasses workplace risks](https://news.bloomberglaw.com/artificial-intelligence/ai-smart-glasses-promise-workplace-wonders-compliance-risks) · [TigerGraph AML graph analytics](https://www.tigergraph.com/blog/money-laundering-detection-with-aml-graph-analytics-structuring-and-layering/) · [Guardfolio correlation breakdown](https://www.guardfolio.ai/blog/correlation) · [Fulcrum correlation stress tests](https://fulcrumasset.com/insights/investment-insights/notes-on-correlation-stress-tests/)
