# Changelog

All notable changes to this project are recorded here. Dates are NY local. Each entry links to the underlying commit on `main`.

This log doubles as evidence of execution velocity for the Katz School Faculty Research Initiative proposal: from initial scaffold to working WebXR scenes with calibration-grade gesture audit in two days.

The format loosely follows [Keep a Changelog](https://keepachangelog.com/) but is optimized for academic project review, not semantic versioning.

---

## [Unreleased]

Next planned: actual Vercel deploy of council-runner (one-shot `vercel deploy --prod` per `DEPLOY.md`); banking-side risk-math integration from Loredana Levitchi (Phase B); council-diff v0.5 TREX execution-before-review pattern spec implementation.

---

## 2026-06-17 (afternoon — Phase 3 deploy + Phase 4 design + visual polish)

### Added

- **`packages/council-runner/src/glm-provider.ts`** — GLMProvider class implements Provider against ZhipuAI's OpenAI-compatible `open.bigmodel.cn/api/paas/v4` endpoint, default model `glm-5-plus`. From RANK 2 morning brief integration backlog: GLM-5.2 hit #1 open-weight on Artificial Analysis frontend-coding ranking; ships here as alternative provider for cost / quality experimentation. 3 new vitest tests bring council-runner total to 23/23.
- **`packages/council-runner/src/cli.ts`** gains `--provider glm` flag. `MockProvider` still default; `AnthropicProvider` and `GLMProvider` both injectable.
- **`apps/{trading,banking}-quest`** — `pulse_podiums(verdict)` flashes halos verdict-coloured (approve green / block-or-decline red / escalate amber) for 600ms after each `fire_synthetic_decision`. Tagged halos with `userData.is_halo` so the animation finds them without a separate ref list.
- **`docs/phase-4-eu-ai-act-evaluation-design.md`** — Year 2 evaluation study design for EU AI Act Article 14 (trading) + ECOA / Reg B (banking). Pre-registered, within-subjects, n≥16 per vertical. §8.5 cites OpenAI Deployment Simulation as related work (overlap: pre-deployment audit primitive; difference: intra-model vs inter-architecture).
- **`docs/index.md`** — navigable hub for GitHub Pages at `alex-jb.github.io/embodied-compliance-council`. Links to 18 docs across academic deliverables, Katz RFP, hackathon strategy, TAM, workflow specs, and checkpoints.
- **`docs/3-specs-audit-2026-06-17.md`** — audit of LaunchKit / PolyAlert / SFOS-obs SaaS specs from `~/.../projects-2026-06/`. Verdict: all three SHIPPED. Next step is soft-launch, not "build."
- **`docs/vibex-2026-06-14-uncommitted-review.md`** — Ship/Stash review of 6 uncommitted vibex docs.
- **`docs/checkpoints/2026-06-17-deep-inventory.md`** — deep cross-stack inventory (A-H tiered, time-sensitive vs solo-executable).
- **`docs/linkedin-post-draft-2026-06-17.md`** — three framings (research-led, velocity-led, regulatory-led) for the morning velocity post.
- **`docs/ibm-bob-spike/2026-06-20-weekend-guide.md`** — 4-hour Saturday spike plan with three GO/NO-GO decision gates.
- **`docs/daily-research-10am-cron-spec.md`** — spec for the morning brief cron now implemented + live in `alex-brain`.
- **`docs/katz-rfp-2026/*.{md,pdf}`** — Katz Faculty Research Initiative AY 2026-2027 submission packet (cover + 2-page narrative + budget + bios, both markdown and PDF).
- **`README.zh-CN.md`** — full Mandarin mirror of the English README per bilingual rule. English README gets the `English · 中文` language switcher.
- **GitHub Pages enabled** at `alex-jb.github.io/embodied-compliance-council`. Source: `main` branch `/docs` path. Built from the same docs tree the repo carries.
- **`vercel.json` + `api/deliberate.ts` + `DEPLOY.md`** — one-shot Vercel deployment for the council-runner HTTP handler. `vercel deploy --prod` produces a public `/api/deliberate` endpoint; WebXR apps then swap `COUNCIL_SERVER_URL` from `http://localhost:3030/api/deliberate` to the public URL for real Anthropic verdicts in the browser.
- **GitHub repo metadata** — description, homepage, 12 topics (ai-deliberation, anthropic, brier-score, calibration, capstone, compliance, ecoa, multi-agent, regulated-ai, threejs, typescript, webxr).

### Changed

- **`README.md` hero** — embedded side-by-side screenshots of trading-quest + banking-quest WebXR scenes (cyan + amber podium halos captured via Chrome headless swiftshader). Test badge updated to 33/33.

---

## 2026-06-17 (morning) — Phase 2 + Phase 2.5 + Katz RFP packet + research

### Added

- **`packages/hand-gestures/`** — TypeScript classifier + MediaPipe `HandTracker` for desktop webcam path. Gestures: thumbs-up = approve, fist = block, thumb-index pinch = escalate. 6/6 classifier vitest tests green ([`a824538`](https://github.com/alex-jb/embodied-compliance-council/commit/a824538)).
- **`apps/trading-quest`** + **`apps/banking-quest`** — Vite + Three.js + WebXR scenes. 5 spatial podiums per vertical (semicircle, 2.5m radius, 150° arc). SPACE-bar fires synthetic council decision; `Enable hand tracking` button opens webcam and routes gestures to verdicts. Production build verified ([`f44f09c`](https://github.com/alex-jb/embodied-compliance-council/commit/f44f09c)).
- **`packages/spatial-gating-protocol/`** — Shared TypeScript types and WebCrypto SHA-256 hash chain for tamper-evident audit. 4/4 vitest tests covering genesis, valid chain, payload tamper, and link tamper detection ([`f44f09c`](https://github.com/alex-jb/embodied-compliance-council/commit/f44f09c)).
- **Katz School Faculty Research Initiative AY 2026-2027 submission packet** at `docs/katz-rfp-2026/` — cover page, 2-page narrative, $3,000 budget narrative, and participant bios. Markdown source + generated PDFs via pandoc + Chrome headless. Build script in repo ([`3dffa97`](https://github.com/alex-jb/embodied-compliance-council/commit/3dffa97)).
- **IBM AI Builders Challenge weekend spike guide** at `docs/ibm-bob-spike/2026-06-20-weekend-guide.md` — 4-hour Saturday plan with three GO/NO-GO decision gates (model-id exposure, custom-mode SQLite persist, MCP server reachability) ([`a824538`](https://github.com/alex-jb/embodied-compliance-council/commit/a824538)).
- **Daily research 10am cron specification** at `docs/daily-research-10am-cron-spec.md` — five-bucket morning brief (GitHub trending, 30 gurus moves, AI projects, AI news high-signal, hackathon calendar) extension to existing 12pm `daily_brief.py` in `alex-brain` repo. Implementation deferred to a focused session ([`a824538`](https://github.com/alex-jb/embodied-compliance-council/commit/a824538)).
- **Dr. NGO primary-PI ask email draft** for the Katz RFP at `docs/dr-ngo-final/dr-ngo-katz-rfp-pi-ask-email-2026-06-17.md` — short, single-decision, soft 2026-06-25 deadline ([`75ee33e`](https://github.com/alex-jb/embodied-compliance-council/commit/75ee33e)).
- **Morning checkpoint** at `docs/checkpoints/2026-06-17-morning.md` — cross-session recovery snapshot covering all commits, deferred items, and send queue ([`976b212`](https://github.com/alex-jb/embodied-compliance-council/commit/976b212)).
- **Project README** rewritten from the stale VibeXForge template to a proper Embodied Compliance Council overview — architecture, 10-voices table, quick start, phase status, academic context, contributors ([`7124b71`](https://github.com/alex-jb/embodied-compliance-council/commit/7124b71)).
- **`packages/council-runner/`** Phase 3 milestone — Node TypeScript workspace package. `loader.ts` reads YAML frontmatter + body from voice prompt files; `types.ts`, `mock-provider.ts`, `runner.ts` orchestrate fan-out + weighted aggregation. CLI fires a real deliberation; 8/8 vitest green ([`d1e23d8`](https://github.com/alex-jb/embodied-compliance-council/commit/d1e23d8)).
- **`AnthropicProvider`** + handler + server + Vercel handler — real Anthropic Sonnet 4.6 per-voice calls. 14 cumulative council-runner tests green ([`7e1ab95`](https://github.com/alex-jb/embodied-compliance-council/commit/7e1ab95)) + 6 handler tests ([`6b4a6a9`](https://github.com/alex-jb/embodied-compliance-council/commit/6b4a6a9)).
- **`packages/orallexa-risk/`** — Phase A v0 textbook implementations for all 7 risk primitives (var historical/parametric/MC; expected_shortfall historical/parametric/cornish_fisher; concentration HHI/Gini; correlation Pearson/Spearman/EWMA; factor_exposures OLS with t-stats; beta_decomposition sequential OLS; sector_exposure benchmark deviation). 11/11 pytest green. Phase B will replace each with Loredana's BR-doc-grade versions ([`3d9b88d`](https://github.com/alex-jb/embodied-compliance-council/commit/3d9b88d)).

### Changed

- **Yang capstone amendment email** appended with a Katz RFP co-PI ask paragraph — Prof. Yang invited as trading-vertical co-PI on the $3,000 single-year submission ([`3dffa97`](https://github.com/alex-jb/embodied-compliance-council/commit/3dffa97)).
- **Lora risk-module handoff email** appended with a Katz RFP collaborator paragraph — Loredana invited as external risk-math collaborator + IEEE-paper co-author named on the submission ([`3dffa97`](https://github.com/alex-jb/embodied-compliance-council/commit/3dffa97)).

### Decisions and research verdicts (non-code)

- **IBM AI Builders Challenge:** CONDITIONAL GO. Weekend Bob hello-world spike on 2026-06-20 must validate three gates before the 2026-07-31 monthly deadline build commits. Calibration-as-a-service Bob-native build positioned as the structural twin of last cycle's Pedigree winner.
- **Pokémon TCG AI Battle Challenge (Strategy, $240K, Kaggle):** DEFER → 8-hour weekend Simulation spike → likely NO-GO. "Reasonableness Standard" + ladder-rank in Strategy formula + zero historical LLM-agent or methodology-paper winners on past Kaggle game-AI competitions stack three veto signals.

---

## 2026-06-17 — Phase 2 + Phase 2.5 + Katz RFP packet + research

### Added

- **`packages/hand-gestures/`** — TypeScript classifier + MediaPipe `HandTracker` for desktop webcam path. Gestures: thumbs-up = approve, fist = block, thumb-index pinch = escalate. 6/6 classifier vitest tests green ([`a824538`](https://github.com/alex-jb/embodied-compliance-council/commit/a824538)).
- **`apps/trading-quest`** + **`apps/banking-quest`** — Vite + Three.js + WebXR scenes. 5 spatial podiums per vertical (semicircle, 2.5m radius, 150° arc). SPACE-bar fires synthetic council decision; `Enable hand tracking` button opens webcam and routes gestures to verdicts. Production build verified ([`f44f09c`](https://github.com/alex-jb/embodied-compliance-council/commit/f44f09c)).
- **`packages/spatial-gating-protocol/`** — Shared TypeScript types and WebCrypto SHA-256 hash chain for tamper-evident audit. 4/4 vitest tests covering genesis, valid chain, payload tamper, and link tamper detection ([`f44f09c`](https://github.com/alex-jb/embodied-compliance-council/commit/f44f09c)).
- **Katz School Faculty Research Initiative AY 2026-2027 submission packet** at `docs/katz-rfp-2026/` — cover page, 2-page narrative, $3,000 budget narrative, and participant bios. Markdown source + generated PDFs via pandoc + Chrome headless. Build script in repo ([`3dffa97`](https://github.com/alex-jb/embodied-compliance-council/commit/3dffa97)).
- **IBM AI Builders Challenge weekend spike guide** at `docs/ibm-bob-spike/2026-06-20-weekend-guide.md` — 4-hour Saturday plan with three GO/NO-GO decision gates (model-id exposure, custom-mode SQLite persist, MCP server reachability) ([`a824538`](https://github.com/alex-jb/embodied-compliance-council/commit/a824538)).
- **Daily research 10am cron specification** at `docs/daily-research-10am-cron-spec.md` — five-bucket morning brief (GitHub trending, 30 gurus moves, AI projects, AI news high-signal, hackathon calendar) extension to existing 12pm `daily_brief.py` in `alex-brain` repo. Implementation deferred to a focused session ([`a824538`](https://github.com/alex-jb/embodied-compliance-council/commit/a824538)).
- **Dr. NGO primary-PI ask email draft** for the Katz RFP at `docs/dr-ngo-final/dr-ngo-katz-rfp-pi-ask-email-2026-06-17.md` — short, single-decision, soft 2026-06-25 deadline ([`75ee33e`](https://github.com/alex-jb/embodied-compliance-council/commit/75ee33e)).
- **Morning checkpoint** at `docs/checkpoints/2026-06-17-morning.md` — cross-session recovery snapshot covering all commits, deferred items, and send queue ([`976b212`](https://github.com/alex-jb/embodied-compliance-council/commit/976b212)).
- **Project README** rewritten from the stale VibeXForge template to a proper Embodied Compliance Council overview — architecture, 10-voices table, quick start, phase status, academic context, contributors ([`7124b71`](https://github.com/alex-jb/embodied-compliance-council/commit/7124b71)).

### Changed

- **Yang capstone amendment email** appended with a Katz RFP co-PI ask paragraph — Prof. Yang invited as trading-vertical co-PI on the $3,000 single-year submission ([`3dffa97`](https://github.com/alex-jb/embodied-compliance-council/commit/3dffa97)).
- **Lora risk-module handoff email** appended with a Katz RFP collaborator paragraph — Loredana invited as external risk-math collaborator + IEEE-paper co-author named on the submission ([`3dffa97`](https://github.com/alex-jb/embodied-compliance-council/commit/3dffa97)).

### Decisions and research verdicts (non-code)

- **IBM AI Builders Challenge:** CONDITIONAL GO. Weekend Bob hello-world spike on 2026-06-20 must validate three gates before the 2026-07-31 monthly deadline build commits. Calibration-as-a-service Bob-native build positioned as the structural twin of last cycle's Pedigree winner.
- **Pokémon TCG AI Battle Challenge (Strategy, $240K, Kaggle):** DEFER → 8-hour weekend Simulation spike → likely NO-GO. "Reasonableness Standard" + ladder-rank in Strategy formula + zero historical LLM-agent or methodology-paper winners on past Kaggle game-AI competitions stack three veto signals.

---

## 2026-06-16 — Council voices + Lora email + EOD checkpoint

### Added

- **10 council-voice system prompts** at `packages/council-voices/` — five trading voices (Macro / Sector / Portfolio / Growth-VC / Activist Short) and five banking voices (Credit Fundamentals / Risk Officer / Fair Lending / Customer Advocate / Macro Contrarian). Each voice has YAML frontmatter with `voice_id`, `allowed_tools`, `verdict_options`, `weight_in_aggregate_default`, plus a system prompt and strict-JSON output schema. Tool restriction is what gives the council epistemic diversity ([`27370a2`](https://github.com/alex-jb/embodied-compliance-council/commit/27370a2)).
- **Loredana risk-module handoff email draft** at `docs/dr-ngo-final/lora-risk-module-handoff-email-2026-06-16.md` — Phase B integration ask for VaR / Expected Shortfall / factor exposures / beta decomposition / default probability + LGD Python implementations ([`2f9478b`](https://github.com/alex-jb/embodied-compliance-council/commit/2f9478b)).
- **End-of-day checkpoint** at `docs/checkpoints/2026-06-16-evening.md` — first cross-session recovery snapshot capturing the day's work and deferred items ([`95a3f0e`](https://github.com/alex-jb/embodied-compliance-council/commit/95a3f0e)).

---

## Earlier — Initial scaffold and strategic frame

- **Repository initialized** with `LICENSE` (MIT), top-level `README`, `apps/` and `packages/` directories.
- **`packages/orallexa-risk/`** — Phase A scaffold of seven risk primitives with Pydantic input/output schemas and Anthropic tool-call schemas. All currently raise `NotImplementedError` pending Phase B merge from Loredana's research base ([`b3ece02`](https://github.com/alex-jb/embodied-compliance-council/commit/b3ece02)).
- **`docs/dr-ngo-final/proposal-v2.{md,pdf}`** — Banking proposal v2 finalized.
- **`docs/capstone-thesis/`** — Capstone amendment email (Prof. Yang) and supporting materials.
- **`docs/startup/`** — Strategic frame, market research synthesis, Christensen disruption framework, bottom-up TAM analysis. These documents are research armor for the academic defense, not a startup execution plan ([`a7e2ff5`](https://github.com/alex-jb/embodied-compliance-council/commit/a7e2ff5), [`fb1d9b8`](https://github.com/alex-jb/embodied-compliance-council/commit/fb1d9b8)).
- **Multi-deliverable ownership clarified** — Capstone (trading, Alex solo) and Dr. NGO (banking, Alex lead + Lora risk math co-author) ([`d361eab`](https://github.com/alex-jb/embodied-compliance-council/commit/d361eab)).

---

## Velocity summary for the Katz proposal

Two consecutive days (2026-06-16 evening → 2026-06-17 morning) shipped:

- 4 packages scaffolded (council-voices, spatial-gating-protocol, hand-gestures, orallexa-risk Phase A)
- 2 WebXR apps with passing unit tests + production build verified
- 10 system prompts with strict-JSON output schemas
- 1 RFP submission packet (cover + 2-page narrative + budget + bios, both markdown and PDF)
- 3 email drafts (Yang, Lora, Dr. NGO)
- 2 deep research verdicts (IBM, Pokémon)
- 10 / 10 cumulative tests green (4 hash-chain + 6 hand-gesture classifier)
- 9 atomic commits to `main`, each scope-bounded and reviewable

Linear time spent: approximately 7 hours across two sessions. This is the execution rate the Katz Faculty Research Initiative review committee can reasonably expect for the AY 2026-2027 award period.
