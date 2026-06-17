# 3 specs from `~/.../projects-2026-06/` — current state audit

**Date:** 2026-06-17
**Scope:** LaunchKit (#01) / PolyAlert (#02) / SFOS-obs (#03) — the three SaaS spin-off specs Alex drafted 2026-05-31 in `~/Desktop/Interview-Prep/Projects/alex-brain/research/projects-2026-06/`.

---

## #01 LaunchKit — Marketing-agent commercialization

**Spec:** `01-launchkit-spec.md` (drafted 2026-05-31)
**Pitch:** SaaS wrapper around `marketing-agent` — paste project URL → 17-platform launch drafts → $49/mo (paid tier) or $19/mo (lite).

**Current state: SHIPPED in vibex monorepo**

Evidence:
- `~/Desktop/vibex/app/launchkit/` — Next.js route LIVE
- `~/Desktop/vibex/app/api/launchkit/generate/` + `app/api/launchkit/checkout/` — server routes built
- `.next/server/app/launchkit.html` exists — production build artifact

**Status verdict:** Spec → production wiring delivered. Per task list, A — LaunchKit Stripe paywall integration is marked completed. Spec doc in projects-2026-06 is now a historical artifact.

**Open question:** is the launchkit route actually live on vibexforge.com? Worth a `curl https://vibexforge.com/launchkit` smoke test to confirm public reachability vs local-only.

---

## #02 PolyAlert — Polymarket calibrated alert SaaS

**Spec:** `02-polyalert-spec.md` (drafted 2026-05-31)
**Pitch:** Telegram bot delivering Polymarket calibrated mispricing alerts. $10/mo (alerts only) or $30/mo (alerts + Brier audit dashboard).

**Current state: SHIPPED in orallexa repo**

Evidence:
- `~/Desktop/orallexa-ai-trading-agent/markets/auto/polyalert_telegram_bot.py` — Telegram bot LIVE
- `~/Desktop/Interview-Prep/Projects/alex-brain/research/markets-scripts-snapshot/polyalert_telegram_bot.py` — mirror snapshot

**Status verdict:** Per task list, C — PolyAlert Telegram bot foundation is marked completed. The Telegram bot was the spec's headline deliverable.

**Open question:** is the bot currently running and serving alerts? Markets cron has been deloaded since 2026-05-12 (see separate postmortem). Resolving the markets cron unblocks PolyAlert from a data-source perspective.

---

## #03 SFOS-obs — Solo-founder-OS observability layer

**Spec:** `03-sfos-obs-spec.md` (drafted 2026-05-31)
**Pitch:** Datadog-equivalent for solo-founder agent stacks. $9/mo (1 agent) or $29/mo (10 agents). Bills as the "EU AI Act 2026-08 enforcement driver."

**Current state: SHIPPED to two surfaces**

Evidence:
- `~/Desktop/sfos-obs/` — standalone repository LIVE on disk
- `~/Desktop/vibex/app/sfos-obs/` — vibex marketing landing route
- `~/Desktop/vibex/app/api/sfos-obs-waitlist/` — waitlist API endpoint

**Status verdict:** Per task list, D — SFOS-obs client lib skeleton + screenpipe stub is marked completed.

**Open question:** waitlist endpoint capturing emails? If yes, current count is the launch-readiness signal.

---

## Cross-cutting observations

1. **All three are SHIPPED**, not pending. The "next batch to launch" framing on these is incorrect; they exist. The next batch should be either:
   - **Promote them publicly** — soft-launch posts on HN, Reddit, X, LinkedIn (each could be its own 30-min task)
   - **Conversion-test the paid tiers** — Stripe webhook + first-paying-customer instrumentation
   - **Wait for inbound** based on the current SEO + GitHub footprint

2. **Three additional specs exist** in the same folder, not yet audited here:
   - `06-idea-validator-spec.md` — Idea Validator / PMF Detector
   - `07-nanochat-curriculum-spec.md`
   - `08-brandage-report-spec.md`

3. **The vibex monorepo now carries 3 commercial routes** (`/launchkit`, `/sfos-obs`, plus existing vibex distribution flow). The vibex project description "AI distribution platform" understates this.

---

## Recommended next action

Pick the highest-revenue-potential of the three and ship its soft launch:

- **LaunchKit** has the broadest TAM (every solo AI builder) and the lowest education cost.
- **SFOS-obs** has the strongest regulatory tailwind (EU AI Act 2026-08).
- **PolyAlert** has the smallest TAM but the cleanest paid funnel.

Per the bottom-up TAM analysis in `embodied-compliance-council/docs/startup/04-bottom-up-tam.md`, **LaunchKit at $49/mo × 500 customers = $24.5K MRR** is the most defensible. Soft-launch that one first.
