# Startup Strategic Frame v0.1

**Date:** 2026-06-17 (late evening)
**Status:** Draft for Alex's decision making — not a deck, not a memo to investors
**Posture:** Treat the work as a startup, not a student project. Course deliverables become a byproduct of the company.

---

## 1. The one-sentence thesis

> **AI traders are systematically over-confident. We measure it, audit it, and gate it spatially — turning multi-agent LLM trade approval into probabilistically-attached, regulatorily-defensible compliance instead of a yes-button.**

**Sharper variant for institutional buyers:**

> **The pre-trade compliance system for AI-native trading firms — Brier-audited multi-agent deliberation gated by a tamper-evident spatial approval primitive. SEC 15c3-5, EU AI Act Article 14, FINRA OATS-ready out of the box.**

**Sharper variant for the OSS dev audience:**

> **The OSS Brier-audited multi-voice deliberation framework that already powers `council-diff` (17K stars adjacency, 71 AI agent platforms via skills.sh). Spatial layer is the enterprise wedge; the calibration engine stays open.**

---

## 2. Why the timing is real (not vibes)

Three independent forcing functions converging in the next 12 months:

- **EU AI Act Article 14 (human oversight) effective 2026-08.** Banks and asset managers using LLMs in trading decisions or credit scoring need *demonstrable* human-in-the-loop with audit trail. Hard regulatory deadline.
- **HoloLens discontinued 2024-10.** Citi and BofA AR banking deployments are stranded. Meta Quest 3S has replaced Quest 3 in enterprise fleets at 3:1 ratio (Q1 2026). JPMorgan's VR head left; they hired an AI scientist from Meta Reality Labs. The institutional appetite for "AI + spatial computing" is being explicitly signaled by the buyer.
- **Two live findings tonight (n=279 + n=8 from the production agent)** independently prove that *production-grade* LLM probability streams in trading are systematically over-confident at a level that traditional Brier doesn't surface (T\* = 5.474; 100% second-order demote rate). The calibration moat is empirically grounded, not theoretical.

---

## 3. Existing assets (already in the bag — not roadmap fiction)

| Asset | Status | Why it matters for the startup |
|---|---|---|
| `council-diff` v0.4.2 on npm (MIT) + 71-platform skills.sh distribution | Live, audit-clean, 0 vulns | The OSS distribution flywheel + the proven primitive. Already in 71 agent-platform installs. |
| `council-for-slack-2026` production Slack app | Live, OAuth distribution enabled | Production proof of multi-voice + Brier audit + spatial-Canvas surface in a non-trading domain. De-risks the "this works" question. |
| Orallexa multi-agent trading agent | Live cron, 14 ticker watchlist | The actual probabilistically-attached agent. Daily Brier-scored, publicly timestamped, audit trail on GitHub. |
| 6 calibration primitives + 64 tests | Live, committed, replayable | Embedded research → product. Each primitive has a literature citation. |
| Two live findings (F1: T\* = 5.47, F2: 100% demote) | Replayable from production data | Defendable empirical claims, not slides. Investors and customers can re-run the audit. |
| HoloFinanceXR 5-layer architecture (Loredana) | Drafted, 5-page IEEE | The XR client-side architecture for the enterprise wedge. Co-author available. |
| 120-page Aura Alexa risk BR (Loredana) | Drafted | Bank-grade risk primitives (VaR, ES, factor exposures, beta decomposition, concentration, sector exposure, correlation) lifted into Orallexa as `orallexa-risk`. |

---

## 4. Product layers (smallest paying wedge to fully built moat)

```
Layer 4 — INSTITUTIONAL SaaS                    ENTERPRISE SALE
       Quest 3S spatial pre-trade workspace + 
       SOC2/SR 11-7 + concierge integration
                          ↑
Layer 3 — HOSTED MCP / API                      MID-MARKET SaaS  
       calibrated-multi-voice deliberation as
       a service for AI trading firms;
       Brier + ECE dashboards built-in
                          ↑
Layer 2 — Council-as-a-Service (CaaS)           SOLO QUANT / FAMILY-OFFICE  
       paid usage of the council + audit
       layer; pay per audit/decision
                          ↑
Layer 1 — OSS council-diff + orallexa-risk      DEV / RESEARCHER
       free, MIT, distribution by skills.sh
       and npm. The flywheel.
```

The smallest paying customer is **Layer 2 → solo quants and family offices**.  
The enterprise wedge that funds the build is **Layer 3 → mid-market AI trading firms**.  
The defensible exit is **Layer 4 → Tier 1 banks and hedge funds** (long cycle, high seat price, regulatory moat).

---

## 5. Possible customer wedges (ranked by "the next 90 days")

(Pending live research from the parallel agent — placeholders below. Update when research returns.)

| Wedge | Buyer | Acute pain | Why now |
|---|---|---|---|
| **A — "Brier-audit-as-a-service" for solo quants** | Solo trader running their own AI agent | Their LLM lies about its confidence; they're sizing positions wrong | Lowest sales friction; Twitter / HN dev audience already follows Alex |
| **B — Pre-trade compliance MCP for AI trading firms** | $100M-$1B AI-native hedge fund (e.g. Numerai-adjacent) | EU AI Act compliance friction at fundraise | Article 14 deadline 2026-08 = forced buy by Q3 2026 |
| **C — Embodied compliance demo for Tier 1 banks** | JPM, Citi, BofA innovation team | Citi-HoloLens project killed by Microsoft discontinuation | They already publicly hired Meta Reality Labs talent. Wedge sale is a paid pilot. |
| **D — Reg BI fiduciary-duty audit for RIAs** | Mid-size RIA wealth advisor (Loredana's banking framing) | SEC enforcement priority 2025-2026 | Lora's existing 120-page BR doc maps directly |

Top-of-funnel sequence: **A** to build distribution + OSS surface area + revenue beachhead, **B** to fund the enterprise build by Q4 2026, **C/D** for 2027 ARR scaling.

---

## 6. Money math (rough, until research returns)

| Wedge | Seat / month | Realistic ARR/customer | Customers by Q3 2027 |
|---|---|---|---|
| A solo-quant | $29 - $99 | $500 | 100-300 ($50K-$150K ARR) |
| B AI-trading-firm MCP | $1,500 - $5,000 | $40K | 10-20 ($400K-$800K ARR) |
| C bank-pilot fee | $50,000 one-shot | $50K | 2-5 ($100K-$250K) |
| D RIA-compliance | $300 - $800 | $7K | 20-50 ($140K-$350K) |

A + B + small C path to $500K-$1M ARR by Q3 2027 from a solo founder + one collaborator is structurally plausible. The path is OSS-distribution-led, not enterprise-cold-outbound-led.

---

## 7. Naming candidates (pending research domain check)

Working candidates to evaluate:

1. **Bayes Console** — calibration-forward, evokes terminal/SRE aesthetic
2. **Embodied Council** — direct from the thesis; risk: too research-y
3. **Calibrand** — calibrated-brand, short, ownable
4. **Probate** ("probabilistic gate") — short, finance overtone, .com likely owned
5. **Allwise / Allwise.ai** — voice-council overtone, calibration-adjacent
6. **Compliance Counsel** — clear value-prop, dry, easy to spell

Decision pending the parallel research output (which is checking incumbent trademark conflicts).

---

## 8. Funding posture

- **Not raising yet.** Pre-product-revenue. OSS distribution is currently the flywheel.
- **YC W26 application window opens ~September 2026.** Application would point to: 2 OSS repos with adoption, 1 production Slack app, 2 live empirical findings, council-diff already in 71 agent-platform installs. Apply with 10-20 paying solo-quant customers = strong.
- **Pre-seed seed range** ($500K-$1.5M) plausible once Wedge B has 3-5 paying logos. Calendar target: Q1 2027.
- **Bootstrap-friendly.** Wedge A revenue covers cost of living + compute. No urgency to raise.

---

## 9. Open questions blocking decision (returning from research)

1. What's the real TAM for pre-trade compliance SW today? (incumbent revenue → addressable share)
2. Who's the closest competing startup? (Cekura, Apex Quant, others)
3. Does *any* incumbent currently sell a Brier-audited multi-voice pre-trade gate? (We expect no.)
4. What's the regulatory floor (SOC2 / SR 11-7 / model risk management) before a Tier 1 takes a meeting?
5. What's the cleanest domain name that's actually available?

Research agent fires in parallel and updates Sections 5–9 on return.

---

## 10. Decisions Alex can make this week (not next month)

1. **Pick the wedge:** A solo-quant, B AI-trading-firm MCP, or both A then B?
2. **Naming gate:** Lock the name once research returns the trademark/domain check.
3. **Open-vs-closed split:** Which parts of the stack stay MIT (council-diff is locked open by license; what about orallexa-risk, spatial gating protocol, calibration primitives)? Default: keep `council-diff` + `orallexa-risk` MIT; close the integration + enterprise hosting.
4. **Co-founder posture with Loredana:** Co-author on academic side already agreed. Co-founder on the company side is a separate decision — based on Wedge D fit (banking + RIA), her involvement is natural; based on Wedges A/B (quant trading), less so.
5. **Calendar of next 30 days for the company:**
   - W1: Wedge A landing page LIVE; Tier 1 OSS launch with the F1/F2 findings as the hook
   - W2: First 10 paying solo-quant pilots from Twitter/HN/Reddit
   - W3: Wedge B pricing page + a single AI-trading-firm reach-out
   - W4: Decide on YC W26 application timing + co-founder posture
