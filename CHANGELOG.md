# Changelog

All notable changes to this project are recorded here. Dates are NY local. Each entry links to the underlying commit on `main`.

This log doubles as evidence of execution velocity for the Katz School Faculty Research Initiative proposal: from initial scaffold to working WebXR scenes with calibration-grade gesture audit in two days.

The format loosely follows [Keep a Changelog](https://keepachangelog.com/) but is optimized for academic project review, not semantic versioning.

---

## [Unreleased]

Next planned: actual Vercel deploy of council-runner (one-shot `vercel deploy --prod` per `DEPLOY.md`); banking-side risk-math integration from Loredana Levitchi (Phase B); council-diff v0.5 TREX execution-before-review pattern spec implementation; IEEE VR 2027 paper data collection (abstract 2026-08-24, paper 2026-08-31, see `papers/ieee-vr-2027-shadow-rct.md`); ICAIF 2026 Milan paper (2026-08-02 deadline).

---

## 2026-06-17 late evening / 2026-06-18 early morning — Shadow canonical product pivot + ECC v3.1 + IEEE VR 2027 paper skeleton

### Added

- **`docs/research/2026-06-17-three-users-fifteen-pains-xr-edge.md`** — Deep agent research memo documenting 15 specific workflow pains across banking compliance officer + quant / data engineer + trader, ranked by whether XR genuinely solves them (6 of 15 win; 9 of 15, 2D is fine). 30+ sourced citations. Identifies Even G2 + XReal Air 2 Ultra as the wedge devices, not Quest 3S ([`af02f1d`](https://github.com/alex-jb/embodied-compliance-council/commit/af02f1d)).
- **`apps/trading-quest/src/bias-constellation.ts`** — 3D scatter scene element rendering verdict-chain history as a bounded constellation (radius 2.4m). Per-point scatter encodes inverse council agreement; recency drives radius + height. Toggleable, hidden by default per Kraus 2022 CGF bounded-zone advisory ([`3e8b24c`](https://github.com/alex-jb/embodied-compliance-council/commit/3e8b24c)).
- **`docs/dr-ngo-final/proposal-v3.1.{md,pdf,html}`** — ECC academic proposal v3.1 aligned with the canonical Shadow product proposal. Drops Quest 3S, adds XReal Air 2 Ultra spatial AR, adds new `quant-quest` academic app (5th persona = Quant / Data Scientist). PDF is 392KB ready to send Loredana / Dr. NGO. The new quant-quest app opens the first peer-reviewed RCT on immersive 3D for *financial* anomaly detection — fills the Kraus 2022 financial-specific gap ([`9c1a630`](https://github.com/alex-jb/embodied-compliance-council/commit/9c1a630)).
- **`papers/ieee-vr-2027-shadow-rct.md`** — IEEE VR 2027 paper v0.1 skeleton (~3,700 words). Abstract complete, Section 1 (Introduction) with 3 contributions articulated, Section 2 (Related Work) 5 subsections, Section 3 (Methodology) with pre-registered H1-H4 hypotheses + N=30 between-subjects design + 7-item cryptographic audit-trail completeness rubric + pre-registered statistical analysis plan. Sections 4-6 skeletons for camera-ready ([`353f28f`](https://github.com/alex-jb/embodied-compliance-council/commit/353f28f)).
- **`docs/dr-ngo-final/lora-flow-immersive-reply-2026-06-18-shadow-aligned.md`** — Rewrite of Sunday Flow reply incorporating Shadow canonical framing + ECC v3.1. Two questions to Jason Marsh preserved; broader product reframe articulated; IEEE VR 2027 paper invitation to Loredana as co-author included ([`353f28f`](https://github.com/alex-jb/embodied-compliance-council/commit/353f28f)).
- **`docs/dr-ngo-final/dr-ngo-katz-rfp-pi-ask-email-2026-06-18-v2.md`** — Rewrite of Katz PI ask with material upgrade: two papers (ICAIF Aug 2 + IEEE VR Aug 24) instead of one. Strengthens publication-path + external-funding-potential evaluation criteria. Includes Shadow canonical proposal as commercialization-path context ([`353f28f`](https://github.com/alex-jb/embodied-compliance-council/commit/353f28f)).
- **`docs/research/2026-06-17-three-users-fifteen-pains-xr-edge.md`** + earlier **`docs/research/2026-06-17-xr-vs-2d-empirical-memo.md`** + **`docs/architecture-decision-flow-immersive-2026-06-17.md`** — three research memos triggering the late-evening pivot.

### Changed

- **`docs/2026-06-18-morning-kickoff.md`** — prepended Section 0 directing Alex to read the Shadow canonical proposal v1.0 + ECC v3.1 PDF before sending any morning emails ([`8f8a1c2`](https://github.com/alex-jb/embodied-compliance-council/commit/8f8a1c2)).
- **`README.md`** — tests badge bumped 33 → 41 passing; release badge added linking to v0.1.0 tag.

### Decisions and research verdicts (non-code)

- **Quest 3S permanently dropped** as primary academic / commercial device. Replaced with XReal Air 2 Ultra (sunglass-form-factor 6DoF spatial AR, $699). Decision driver: Apple paused Vision Pro overhaul 2025-10-01 to reallocate to smart glasses; immersive headsets are not 2026-2028 daily-wear form factor for regulated finance.
- **Council debate is no longer the hero** in any external communication. Verbal contrarian + spatial memory + gaze-as-non-cumbersome-override = the hero. Council is plumbing.
- **Shadow canonical product proposal v1.0** at `~/Desktop/shadow-mentor/docs/shadow-product-proposal.pdf` is the single source of truth for product framing going forward. ECC proposal v3.1 is the academic-deliverable version of the same architecture.

---

## v0.1.0 — Day 1 monorepo milestone (2026-06-17 evening)

First internal version anchor. Marks the end of the launch-day push from empty `.gitkeep` placeholders to a working 6-package + 2-app stack with **41 tests green** (23 council-runner TS + 11 orallexa-risk Py + 7 perception Py). Annotated tag `v0.1.0`. Not a public release announcement; PyPI / npm publishing deferred until specific packages have user-facing surfaces.

---

## 2026-06-17 (late afternoon — Flow Immersive verdict + Perception Layer scaffold)

### Added

- **`docs/architecture-decision-flow-immersive-2026-06-17.md`** — ADR locks Architecture D (Flow Immersive as presentation layer for ICAIF demo + Katz deck, NOT runtime component). Rejects A/B/C with verbatim facts from `docs.flow.gl` FAQ: Dataset API is the only public API, push is batch-per-call with no sub-5s floor, Editor not Object3D-extensible, no standalone `.html` export, Quest 3/3S not certified, 2-principal SaaS with 6-month release cadence. Two questions for Jason Marsh finalize the GO ([`003c526`](https://github.com/alex-jb/embodied-compliance-council/commit/003c526)).
- **`apps/trading-quest/src/data-panel.ts`** — Canvas2D textured-plane mesh inside the WebXR scene renders the verdict chain as a stacked bar + recent-5 list. Zero external dependencies. Same `CanvasTexture` interface accepts a 1-day swap to Apache ECharts-GL or three-globe. This is the Architecture E backup so the ECC story holds even if Flow says no to both Jason questions ([`003c526`](https://github.com/alex-jb/embodied-compliance-council/commit/003c526)).
- **`docs/dr-ngo-final/lora-flow-immersive-reply-2026-06-17.md`** — Reply draft to Loredana Levitchi positioning Flow as presentation layer, including IEEE methodology framing and the Orallexa XR vs banking-quest scope alignment question ([`003c526`](https://github.com/alex-jb/embodied-compliance-council/commit/003c526)).
- **`packages/perception/`** — Perception Layer scaffolding per Loredana's Version2 proposal. Typed Provider protocols for YOLO-World (open-vocab detection), SAM2 (promptable segmentation), Depth Anything V2 (monocular depth) + deterministic `MockProvider` per primitive + `SceneGrounder` composing the three into `PerceptionResult` with pixel-box → Three.js camera-space projection. 7/7 pytest tests green covering API contract + projection invariants. Real model adapters live behind `[yolo_world]` / `[sam2]` / `[depth_anything]` / `[all]` optional dependency extras, stubbed pending Phase 2 ([`012e912`](https://github.com/alex-jb/embodied-compliance-council/commit/012e912)).

### Changed

- **`apps/trading-quest/src/main.ts`** — wires `DataPanel` into the scene; each `fire_synthetic_decision` chain update calls `data_panel.update(chain)` so the texture refreshes inline with the audit panel ([`003c526`](https://github.com/alex-jb/embodied-compliance-council/commit/003c526)).

### Decisions and research verdicts (non-code)

- **Flow Immersive integration verdict: Architecture D only**, conditional GO pending Jason Marsh's answers on standalone `.html` export + Dataset API sub-5s push floor. Best non-Flow alternative if Architecture D collapses: Apache ECharts-GL via `CanvasTexture`. POC committed today (see Added section).

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
