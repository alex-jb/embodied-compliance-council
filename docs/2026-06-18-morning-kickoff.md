# Tomorrow morning kickoff — 2026-06-18

**Purpose:** every action below is hands-only. Each one is small (under 5 minutes). The infrastructure to support them is already shipped. Work through this list in order.

> **🔥 IMPORTANT — read this BEFORE doing anything else:**
> **`~/Desktop/shadow-mentor/docs/shadow-product-proposal.pdf`** (canonical v1.0, shipped 23:30 NY 2026-06-17)
>
> This document supersedes all prior product framing. Shadow = one engine + 4 device clients + 5 persona packs. ECC stays academic and feeds Shadow. Reading this lockstep aligns the morning emails (Lora + Dr. NGO + Yang) with the canonical narrative; otherwise the emails go out using stale v2 framing.
>
> Companion: `proposal-v3.1.pdf` (academic version, aligned).

---

## 0. Read the canonical Shadow proposal (5 min)

```bash
open ~/Desktop/shadow-mentor/docs/shadow-product-proposal.pdf
open ~/Desktop/embodied-compliance-council/docs/dr-ngo-final/proposal-v3.1.pdf
```

Decide before sending any email:
- (A) Send Lora the v3.1 academic proposal + a 2-sentence note that the canonical Shadow proposal is the commercial wedge
- (B) Send Lora the canonical Shadow proposal v1.0 directly and let her see the full picture, then v3.1 as the academic carve-out

Recommend (B). She's a co-author; she should see the full canonical narrative.

---

## 1. Read what arrived overnight (1 min)

Open the new morning brief that the 10am cron will have produced:

```bash
open ~/Desktop/Interview-Prep/Projects/alex-brain/research/morning-deep-dive/$(date +%Y-%m-%d).md
```

Look at the 6th bucket — "🎯 集成 backlog" — that is where stack-fit + ranked actions for the day live.

## 2. Send three emails (10 min)

Open each draft, copy the body, send.

```bash
open ~/Desktop/embodied-compliance-council/docs/capstone-thesis/yang-amendment-email-2026-06-17.md
open ~/Desktop/embodied-compliance-council/docs/dr-ngo-final/lora-risk-module-handoff-email-2026-06-16.md
open ~/Desktop/embodied-compliance-council/docs/dr-ngo-final/dr-ngo-katz-rfp-pi-ask-email-2026-06-17.md
```

Lora email needs two find-replace before send: `[domain]` → her real email, `[deadline]` → Dr. NGO syllabus date.

## 3. Verify capstone Phase 1 cron fired overnight (2 min)

```bash
launchctl list | grep com.alexji.capstone
ls -lh /tmp/capstone-*.{out,err}
ls -lh ~/Desktop/capstone-orallexa-calibration/data-snapshots/{staleness,kelly}-$(date +%Y-%m-%d).json 2>/dev/null
```

Expected: each plist shows a recent exit code (0 if clean); JSON snapshots dated today.

## 4. Reload markets cron (2 min)

```bash
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.orallexa.markets.queue.plist
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.orallexa.markets.retro.plist
launchctl list | grep markets
```

Verifies the 36-day stale fix actually fires the 9am NY queue. curl_cffi already shipped per commit `4f9d845`.

## 5. Loom for Band of Agents (45 min)

Open the SUBMISSION-v2.md, record per the rehearsal script, upload to YouTube unlisted, paste URL in Devpost.

```bash
open ~/Desktop/band-of-agents-2026/SUBMISSION-v2.md
open ~/Desktop/band-of-agents-2026/LOOM-REHEARSAL.md
```

Submission deadline is 2026-06-19 8:30pm IST — you have ~30 hours.

## 6. Vercel deploy ECC council-runner (5 min)

Closes the production loop on Phase 3 — the WebXR apps can then fetch real council deliberations in the browser.

```bash
cd ~/Desktop/embodied-compliance-council
npm install -g vercel
vercel login
vercel link
vercel env add ANTHROPIC_API_KEY
vercel deploy --prod
```

Copy the production URL. Update `apps/{trading,banking}-quest/src/main.ts` `COUNCIL_SERVER_URL` constant in a follow-up commit.

## 7. (optional) skills.sh publish — 4 OSS repos (10 min)

If `npx skills login` works in your environment:

```bash
npx skills login
# then for each repo:
cd ~/Desktop/council-diff && npx skills publish
cd ~/Desktop/polymarket-brier-skill && npx skills publish
cd ~/Desktop/memory-wall-tracker && npx skills publish
cd ~/Desktop/claude-md-directory && npx skills publish
```

Each repo now has a SKILL.md per yesterday's commit. After publish, the skills are discoverable via `npx skills add alex-jb/<repo>`.

## 8. (optional) Memory archive committed (1 min)

The 9 stale session memories were moved into `_archive/`. The MEMORY.md index was cleaned in the same session. Commit the move so future sessions don't see drift:

```bash
cd ~/.claude/projects/-Users-alexji-Desktop-vibex/memory
git -C . status                    # if this directory is git-tracked
# If not under git, nothing to commit — the move is preserved in your home directory only.
```

---

That's it. Estimated total wall-clock if you do all 8: **75-90 minutes**, including the 45-minute Loom recording.

If you do 1-4 only (the time-sensitive ones), 20 minutes.

The 5/12 markets cron postmortem closes when step 4 runs successfully. The 36-day debt is paid the moment that plist fires the 9am queue.
