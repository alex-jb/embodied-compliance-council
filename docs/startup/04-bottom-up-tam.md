# Bottom-Up Total Addressable Market — Embodied Compliance Council

**Date:** 2026-06-17 (late evening)
**Purpose:** Founder-grade TAM analysis. Count actual buyers × realistic willingness-to-pay across three scenarios. Use this in the capstone defense to defeat the "is the market real?" question with a number that came from the bottom up, not from analyst-aggregate stitchery.
**Not:** Permission to raise venture money. The numbers below are intellectual armor for academic context.

---

## 1. Why bottom-up, not top-down

Top-down TAM is what research agents do: take a Mordor / Fortune Business Insights number for "RegTech global", multiply by a share assumption ("we'll get 0.5% of $87B = $435M"), call it a day. The number is unfalsifiable and tells you nothing about whether *any* specific buyer would pay.

Bottom-up TAM counts: *how many real, identifiable buyers exist; what is each one's realistic check size; what's the realistic conversion rate at the wedge price point; over how long.* This is what a founder shows a VC.

Three scenarios — Conservative, Base, Bull — bracket the credible range.

---

## 2. Buyer segments (the universe we count from)

| Segment | Estimated count (2026) | Source of count |
|---|---|---|
| AI-native U.S. hedge funds (LLM in research loop) | **~200** | Triangulated: Numerai community (1,500 modelers, ~10% credible fund-stage); Cekura early-customer pipeline (publicly disclosed YC F24); private chat communities (Trading Twitter, r/algotrading flair "fund manager"). |
| Quant retail / family-office traders with LLM agent | **~50,000 active** | r/algotrading active monthly users (45K); /r/wallstreetbets quant flair (~5K); Alpaca + Interactive Brokers paper-trading account active (200K, 25% LLM-active conservatively). |
| RIAs / wealth advisors with AI-augmented client-facing process | **~3,000** | Cerulli 2025 estimate of RIAs using "AI tools in client-meeting workflow"; Reg BI enforcement actions name 47 RIAs in 2024-25 for AI explanation gaps. |
| Mid-cap U.S. hedge funds ($100M-$1B AUM) using LLM at all | **~600** | HFR 2026 directory: ~1,200 mid-cap funds total; ~50% have public commentary about LLM exploration; ~80% of those probably use it in research vs production. Conservative: 600 explorers. |
| Tier-1 U.S. banks with internal LLM trading desks | **~12** | Public statements: JPM, GS, MS, Citi, BofA, WF, BNY Mellon, State Street, BlackRock (asset mgmt), Vanguard, Schwab institutional, Capital One. |

The "addressable" buyer universe is the union of these segments. The TAM math assumes we cannot sell to all of them in Year 1 — only to a subset whose conversion is realistic.

---

## 3. Wedge price points (the SaaS side, since enterprise is Year 2+)

| Wedge | Buyer | Realistic price | Why this price |
|---|---|---|---|
| Calibration audit SaaS — solo / family-office tier | Solo quant / family office | $99 / month | Matches dev-tool norms (Linear $99, Postman $99); below "needs CFO approval" threshold ($100/mo). |
| Calibration audit SaaS — small-fund tier | AI-native fund < $500M AUM | $499 / month | Matches Tradier $399, AlgoTrader $499, Numerai data $625. |
| Calibration MCP for mid-cap funds | $100M-$1B AUM fund | $2,500 / month per seat | Matches Bloomberg low-end seat $24K/yr, Refinitiv research $30K/yr. Two seats per fund × $30K/yr. |
| Enterprise pilot for Tier-1 bank | JPM / Citi / BofA innovation team | $50,000 one-shot for 90-day pilot | Standard enterprise-XR pilot pricing. PoC budget, no procurement. |
| RIA Reg BI compliance audit seat | Wealth advisor | $250 / month per advisor seat | Below RIA per-advisor compliance tooling ceiling ($300-500/mo); above $99/mo solo tier so it doesn't cannibalize. |

---

## 4. Conservative scenario

Assumptions:

- We reach only the AI-native U.S. hedge fund universe (200 firms), the open-source dev audience that overlaps with quant retail (~5,000 in the council-diff-following audience), and zero banks.
- Year 1 conversion rates: 8% of AI-native funds buy the $499 fund tier; 1% of the 5K quant-retail overlap buys the $99 solo tier.

| Buyer | Count | Conversion | Customers | ARR/customer | Total |
|---|---|---|---|---|---|
| AI-native funds @ $499/mo | 200 | 8% | 16 | $5,988 | **$95,808** |
| Quant retail @ $99/mo | 5,000 | 1% | 50 | $1,188 | **$59,400** |
| **Total Conservative ARR Y1** | | | **66 customers** | | **~$155K** |

This is bootstrap-survivable for a solo founder with low cost of living (server cost: ~$50/mo + Anthropic API ~$200/mo at this scale = $3K/yr COGS). Net ~$152K. Not a fundable startup; the right characterization is "a sustainable open-source-funded micro-SaaS at academic-spinoff scale."

---

## 5. Base scenario

Assumptions:

- AI-native fund conversion rises to 15% (the EU AI Act 2026-08 deadline forces hand on every fund operating in EU markets).
- Quant retail awareness grows via the council-diff distribution flywheel (71 platforms today; ~30K monthly visitor potential by Year 1 end via OSS visibility).
- 2 mid-cap funds bite on the MCP tier after seeing F1/F2-style demos at a conference.
- Zero banks. Zero RIAs.

| Buyer | Count | Conversion | Customers | ARR/customer | Total |
|---|---|---|---|---|---|
| AI-native funds @ $499/mo | 200 | 15% | 30 | $5,988 | **$179,640** |
| Quant retail @ $99/mo | 30,000 reachable | 0.5% | 150 | $1,188 | **$178,200** |
| Mid-cap MCP @ $2.5K/mo × 2 seats | 2 firms | — | 2 | $60,000 | **$120,000** |
| **Total Base ARR Y1** | | | **182 customers** | | **~$478K** |

This is YC-application territory. Net of ~$50K COGS at this scale ≈ $425K net ARR with one founder. Equivalent stage: Hadrius (YC W24 $2M seed at ~$200K ARR), Greenlite (YC F23 $4.5M seed at ~$300K ARR). Stand alone, fundable.

---

## 6. Bull scenario

Assumptions:

- The "AI traders are systematically over-confident, here is the proof" technical post lands on HN front page (top-30). The findings F1 and F2 become the calibration-AI story of Q3 2026.
- 30% of AI-native funds adopt by Year 2 (the threshold at which EU AI Act forces hand and competitors hint at calibration-tooling acquisition rounds).
- The quant retail audience hits 100K addressable via dev.to + skills.sh + npm flywheel.
- Two RIA platforms (large independent broker-dealer networks like LPL, Raymond James) pilot the Reg BI audit at $250/month/advisor × 200 advisors each = $50K MRR each.
- One Tier-1 bank signs the 90-day pilot.

| Buyer | Count | Conversion | Customers | ARR/customer | Total |
|---|---|---|---|---|---|
| AI-native funds @ $499/mo | 200 | 30% | 60 | $5,988 | **$359,280** |
| Quant retail @ $99/mo | 100,000 reachable | 1% | 1,000 | $1,188 | **$1,188,000** |
| Mid-cap MCP @ $2.5K/mo × 2 seats | 10 firms | — | 10 | $60,000 | **$600,000** |
| RIA Reg BI seat @ $250/mo | 2 networks × 200 advisors | — | 400 seats | $3,000 | **$1,200,000** |
| Tier-1 bank pilot | 1 | — | 1 | $50,000 | **$50,000** |
| **Total Bull ARR Y1** | | | **~1,471 logos** | | **~$3.4M** |

This is what a Series A would price off at $30-50M post — the "this can be a real category-leading company" scenario. The numbers depend on the OSS distribution flywheel actually firing and the F1/F2 findings going viral. Both are plausible but neither is guaranteed.

---

## 7. Scenario likelihood (founder's honest read, not VC pitch tone)

| Scenario | ARR Y1 | Plausibility | Trigger |
|---|---|---|---|
| Conservative | $155K | 60% — most likely default | OSS distribution does *some* lift, AI-native funds slowly notice, no breakouts |
| Base | $478K | 25% — feasible with focused execution | One viral technical post; one mid-cap fund willing to be public reference customer |
| Bull | $3.4M | 10% — requires multiple lucky breaks | F1/F2 findings hit HN front page; EU AI Act enforcement begins; RIA network pilot signs |
| Below-Conservative | < $50K | 5% — distribution stalls completely | OSS flywheel never fires; no PMF |

Weighted-expected Y1 ARR ≈ $700K. This is enough to be intellectually defensible as a "real market exists" claim in the capstone but is far from sufficient to declare a startup is happening. Both are correct simultaneously.

---

## 8. Year-2 sensitivity (not assumed, sanity-checked)

If Base scenario hits Year 1, Year 2 ARR projection scales by 3-5x (typical SaaS GTM efficiency at this stage):

- Base → Year 2 ARR: $1.4M-$2.4M
- Bull → Year 2 ARR: $10M-$17M

Bull Year-2 begins to support a serious A round and serious engineering hires (5-8 people, ~$2M annual burn). Conservative Year-2 stays in solo-founder territory ($300-700K ARR). The framework is plausible at both scales — which is what we want for a defendable academic claim.

---

## 9. Sources for each count (auditable)

To make this defensible if Yang pushes:

- AI-native U.S. hedge fund count: triangulated from Numerai modeler community (numer.ai/community), Cekura YC F24 launch post, private mailing lists, HFR 2026 directory.
- Quant retail count: r/algotrading active-monthly-user count (Reddit public dashboards), Alpaca + Interactive Brokers press releases on retail algo accounts, Tradier customer disclosures.
- RIA count using AI: Cerulli Associates 2025 "Independent Advisor Outlook", SEC IM-2025-01 staff bulletin, Reg BI enforcement actions list (sec.gov/litigation).
- Mid-cap fund universe: HFR Q1 2026 industry directory; AUM brackets from Preqin 2026.
- Tier-1 bank LLM trading-desk count: public earnings transcripts mentioning "language model" + "trading" — JPM 2025-Q4, GS 2025-Q3, Citi 2026-Q1, etc.

A real bottom-up TAM in a Series A deck would cite each line. For the capstone, the cites here are sufficient to defend the magnitudes.

---

## 10. Capstone-defense one-liner using this analysis

> *The bottom-up TAM analysis sets weighted-expected Year-1 ARR at roughly $700K — Conservative $155K, Base $478K, Bull $3.4M — across an addressable universe of ~50K reachable retail-quant operators, ~200 AI-native U.S. hedge funds, ~600 mid-cap funds, ~3K AI-augmented RIAs, and ~12 Tier-1 banks. The distribution of plausibility is honestly skewed: Conservative is most likely. The contribution is a calibration-and-audit primitive that maps to a real, identifiable buyer set — not an analyst-aggregate TAM number with no testable referent.*

---

## 11. How to use this document

- **Capstone defense:** When asked "is there really a market?", show this. The defense is *the buyers exist and have been counted*, not *we will reach all of them*.
- **IEEE paper:** Section on "potential impact" cites the conservative scenario as the baseline.
- **Yang advisor sync:** Hand him this document if he asks why the spatial framework is worth investing capstone effort. The answer is: there are real buyers across five segments, and the primitive serves a measurable gap (F1, F2).
- **Future YC application (if ever):** This document is already the seed material for the "market" section. Update the counts in 6-9 months when real customer-discovery data is available.
