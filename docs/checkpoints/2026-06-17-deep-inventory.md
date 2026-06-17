# Deep cross-stack inventory — 2026-06-17 (NY ~11:20)

**Audit scope:** every repo + every active project across Alex's stack. Goal: surface what is actually pending, not what is comfortable.

Rule: items that need Alex's hands separated from items I can execute solo. No "rest" suggestions. Ship what can ship, queue what cannot.

---

## A. BLOCKING — Alex's hands only, time-sensitive

| Item | Where | Deadline | Status |
|---|---|---|---|
| Send Yang capstone amendment + Katz P.S. | `docs/capstone-thesis/yang-amendment-email-2026-06-17.md` | Tuesday/Wednesday morning (6/18-6/19) | Drafted, awaiting send |
| Send Lora handoff + Katz P.S. | `docs/dr-ngo-final/lora-risk-module-handoff-email-2026-06-16.md` | Same window | Drafted, replace `[domain]` + `[deadline]` first |
| Send Dr. NGO primary-PI ask | `docs/dr-ngo-final/dr-ngo-katz-rfp-pi-ask-email-2026-06-17.md` | Wednesday | Drafted, verify her email |
| Record + upload Band of Agents Loom + submit Devpost | `~/Desktop/band-of-agents-2026/` | 2026-06-19 (2 days) | SUBMISSION-v2.md hallmark-polished, demo + slide + frames LIVE, abtop B-roll cue noted |
| IBM Bob 4-hour weekend spike | `docs/ibm-bob-spike/2026-06-20-weekend-guide.md` | 2026-06-20 (Saturday) | Guide written; verify BeMyApp accepts `xji1@mail.yu.edu` before Friday |
| Verify YU enrollment full-time status through 7/31 | (administrative) | Before any IBM spike investment | Per Alex this morning, "enrollment 还在"; double-check |
| Manual install conductor.dmg | https://github.com/zhengzizhe/conductor/releases/latest | Optional | Apple Silicon arm64.dmg |
| Decide on abtop StatusLine takeover | `~/.claude/settings.json` | Optional | claude-hud vs abtop |

## B. HIGH — Phase 3 / capstone main line, I can execute

| Item | Effort | Status |
|---|---|---|
| **Phase 3 Vercel function wrap of council-runner** — let WebXR apps call real Anthropic instead of synthetic cycler | 45-60 min | Designed in council-runner README; not built |
| **orallexa-risk Phase A primitives implementations** — replace 7 `NotImplementedError` with textbook baselines (VaR historical/parametric/Monte-Carlo, Expected Shortfall, factor exposures via OLS, concentration HHI, sector exposure, correlation matrix, beta decomposition). Phase B replaces with Loredana's BR-doc version | 90-120 min | All 7 Pydantic input/output schemas present + Anthropic tool schemas; only `calculate()` bodies missing |
| **Phase 2.6 Quest 3S WebXR `XRHand` API path** — current MediaPipe Hands is desktop-only; immersive-vr session needs `inputSourcesChange` listener for `XRHand` | 60-90 min | Hand-gestures package classifier is shape-compatible; need new tracker variant |
| **Phase 1 #3 wiring in capstone-orallexa-calibration** — Reflexion nightly retro pull into brier_audit cron context | 60-90 min | All 6 calibration modules exist (5efffb8); the cron-side wire-up is open |
| **Phase 1 #4 staleness audit script** | 30-45 min | `staleness.py` exists; needs CLI + first run |
| **Phase 1 #5 confidence-shrunk Kelly in paper-trading** | 45-60 min | `kelly.py` exists; needs wire-up to existing paper-trading harness |
| **Phase 1 #6 synthetic D-G self-modification proposal** | 60-90 min | `self_modification.py` exists; need to generate the first proposal end-to-end |

## C. MEDIUM — Polish / hygiene / supporting

| Item | Effort | Status |
|---|---|---|
| README.zh-CN.md for embodied-compliance-council | 30-40 min | Per the bilingual rule; English README LIVE, no zh-CN yet |
| Banking-quest gesture mapping clarity (block → decline) | 10-15 min | Working but could clarify in HUD |
| Visual polish — better Three.js materials, particle deliberation animation when SPACE/gesture fires | 60-90 min | Current scene is clean but understated; could pop more |
| GitHub repo description + website field + LinkedIn project link | 5-10 min | Topics set 2026-06-17; description blank |
| Commit-and-push capstone Week 4 project plan + Gantt | 5-10 min | 3 files (md + html + pdf) untracked in `capstone-orallexa-calibration/proposal/` |
| Triage 4 uncommitted vibex docs | 15-30 min | `docs/{custom-cursor,provider-abstraction,sound-vocab}-2026-06-14.md` + `docs/specs/` |
| Update resume — embodied-compliance-council line item | 20-30 min | Resume in `~/Downloads/2026-summer-apps/cover-letters/`; today's velocity worth a CV update |
| LinkedIn post draft — morning velocity, FDE recruiter visibility | 15-20 min | Marketing-agent could draft; per the "promote every new repo" rule |
| Update alex-brain index.md with today's 13 commits | 10-15 min | Index entries last updated 6/14 |
| PyPI Trusted Publisher follow-up — 6 OSS agents remaining | 5 min each | Per `me-todo-when-back.md` Tier 1 #2 |
| Memory audit — outdated entries from before 2026-06-15 | 30 min | Multiple references to old VibeX state |

## D. WORKFLOW INFRASTRUCTURE — different repo, focused

| Item | Repo | Effort | Status |
|---|---|---|---|
| 10am NY ET morning-deep-dive cron | `alex-brain/research/daily-brief-snapshot/` | 1-2 hours | Spec at `embodied-compliance-council/docs/daily-research-10am-cron-spec.md`; not implemented |
| Daily brief 12pm cron healthcheck — verify last 7 days fired | (launchd) | 10 min | `com.orallexa.daily-brief-healthcheck` is live but Alex hasn't seen its output |
| Markets cron post-vacation audit follow-up | (launchd) | 20 min | Per alex-brain index — markets cron 5/12 postmortem still open |
| skills.sh — `npx skills login` + publish 4 OSS repos | (CLI) | 20 min | Per alex-brain — Alex has not done this yet; 4 OSS waiting (council-diff, polymarket-brier, memory-wall-tracker, claude-md-directory) |
| Druckenmiller Q2 13F sync (6/15+ availability window) | `memory-wall-tracker` repo | 30 min | Per alex-brain — 6/15+ |

## E. VIBEXFORGE — open product line, separate session

| Item | Effort | Status |
|---|---|---|
| Soft launch — LinkedIn + HN Show (task #63 in_progress) | 30-45 min | Per task list, still in_progress since 5/13 |
| AI Side Project Funeral viral candidate | 1-2 weekends | Spec ready in `~/Desktop/Interview-Prep/Projects/alex-brain/research/projects-2026-06/` |
| Cracked Score viral candidate | 1-2 weekends | Spec ready |
| AI Cofounder Roast viral candidate | 1-2 weekends | Spec ready |
| LaunchKit Stripe paywall + landing | 2-3 weekends | Spec + lib code (commit 4b... in task list) shipped; needs wiring polish |
| PolyAlert Telegram bot foundation | Done already (commit `213`) | Per task list |
| SFOS-obs client lib + screenpipe stub | Done (commit `214`) | Per task list |

## F. HACKATHON CALENDAR — open windows

| Hackathon | Deadline | Status | Recommendation |
|---|---|---|---|
| **Band of Agents** | 2026-06-19 | 90% ready, hallmark polish applied | Record Loom 6/18, submit 6/19 morning |
| **IBM AI Builders Challenge** | 2026-07-31 monthly | CONDITIONAL GO | Sat 6/20 spike → decide GO/NO-GO |
| **Slack Agent Builder Challenge** | 2026-07-13 | Council-for-Slack already submitted | Plan v2 follow-up content |
| **Pokémon TCG (Kaggle)** | 8/9 + 9/6 | DEFER, spike weekend | Sat 6/21 (after IBM) for 8h Sim spike |
| **AMD Developer Hackathon Act II** | TBD | DEFER (no MI300X access) | OpenEnv wrapper is the only hook |
| **Katz Faculty Research Initiative** | 2026-08-15 | Submission packet drafted | Awaiting Dr. NGO PI yes/no by 6/25 |

## G. ACADEMIC TRACKS

| Deliverable | Deadline | Status |
|---|---|---|
| Capstone defense (COM 6000-CP1, Prof. Yang) | ~2026-08-12 | Phase 1 #1 shipped; #2-#6 wiring open; Phase 2 XR scaffold LIVE |
| ICAIF 2027 paper (trading vertical, calibration methodology) | ~2026-09-15 | Methodology code shipped; paper not started |
| Dr. NGO final project (banking vertical) | TBD by syllabus | Proposal v2 LIVE; awaiting Dr. NGO confirmation on Katz PI |
| IEEE banking paper (with Loredana) | TBD | Phase B pending Loredana code share + 9-14 days integration |

## H. WHAT I AM EXECUTING NOW

After committing this inventory document, I will execute in order:

1. Commit + push capstone Week 4 project plan + Gantt (already drafted, untracked) — 5 min
2. Phase 3 Vercel function wrap of council-runner — 45 min
3. orallexa-risk Phase A primitives v0 (textbook implementations + numpy/scipy tests) — 90 min

Then return for next direction.

---

End of inventory.
