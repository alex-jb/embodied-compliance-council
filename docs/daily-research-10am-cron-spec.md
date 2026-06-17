# Daily research 10am NY ET cron — extension spec

**Status:** SPEC ONLY. Implementation deferred to a focused 1-2 hour session in the `alex-brain` repo (different repository from `embodied-compliance-council`).

**Author intent:** Alex confirmed Option A on 2026-06-17 morning — extend the existing 12pm NY `daily_brief.py` (1,075 LOC) with a `--mode morning-deep-dive` flag and add a new launchd plist that fires at 10am NY ET. Do NOT build a parallel second system.

---

## Current state (verified 2026-06-17)

- `~/Desktop/Interview-Prep/Projects/alex-brain/research/daily-brief-snapshot/daily_brief.py` exists, 1,075 lines
- Launchd job `com.orallexa.daily-brief` runs nightly, producing `research/daily-brief/YYYY-MM-DD.md` and an HTML version
- Today's brief (2026-06-17) was generated at 00:02 UTC (8 PM ET 6/16) and includes 9 sections: AI 人物动态, AI 新闻摘要, SpaceX 跟踪, curriculum, stack, strategic, audit, future book material, etc.
- Healthcheck launchd job `com.orallexa.daily-brief-healthcheck` is also live

## What the morning extension must add

The 10am NY ET brief should NOT duplicate the 12pm brief content. It should focus on five buckets the 12pm brief covers shallowly or not at all:

### Five buckets

1. **GitHub trending — 7-day delta** — Top 20 trending repos in language=any, with one-line "is this useful for Alex's stack" verdict against the curated trending repos memory (`reference_trending_repos_2026_06_16.md`). Skip already-evaluated repos. Highlight new ones with ⭐.

2. **30 大神 individual moves** — For each of the 30 base layer people (10 AI + 10 finance + 10 design), pull their last 24 hours of public activity (X posts, GitHub releases, paper drops, podcast appearances). Only surface those with at least one new artifact. Aim for 5-10 people per day, not all 30.

3. **AI projects / market structure** — Funding rounds, new product launches by 5 treasure sources (Stratechery / 晚点聊 / 张小珺 / Dwarkesh / 海外独角兽). One-line summary per item, max 8 items.

4. **AI news — high signal only** — Filter the 12pm AI news long list down to items where Alex angle has changed since yesterday. Cite the prior position. If position unchanged, do not include.

5. **Hackathon + grant calendar** — Pull from `~/.config/hackathon-monitor` queue. List anything with deadline within 14 days. Include current draft status from `embodied-compliance-council/docs/` (Katz RFP, IBM AI Builders, Pokémon TCG, Band of Agents, Slack Agent Builder).

### Output format

- Markdown file at `research/morning-deep-dive/YYYY-MM-DD.md`
- HTML file at `research/morning-deep-dive/YYYY-MM-DD.html`
- Resend email to `xixiaichiyu09@gmail.com` with HTML inline + markdown attached
- Subject line: `🌅 Morning Deep Dive 2026-06-17 — Day 37 · {1-sentence punchline}`

### CLI flag

```bash
python3 daily_brief.py --mode morning-deep-dive
```

The existing 12pm cron continues to call `daily_brief.py` with no flag (default `--mode evening-synthesis`).

### Launchd plist

`~/Library/LaunchAgents/com.alexji.morning-deep-dive.plist`

- StartCalendarInterval: Hour 10, Minute 0 (NY local)
- WorkingDirectory: `~/Desktop/Interview-Prep/Projects/alex-brain/research/daily-brief-snapshot/`
- ProgramArguments: `python3 daily_brief.py --mode morning-deep-dive`
- StandardErrorPath / StandardOutPath: `~/.solo-founder-os/logs/morning-deep-dive.{err,out}`
- KeepAlive: false
- RunAtLoad: false

### Healthcheck

Extend the existing `com.orallexa.daily-brief-healthcheck` plist to also verify the morning-deep-dive output exists for today. Stale → send Resend alert.

## Estimated implementation time

- Read existing `daily_brief.py` structure: 15 min
- Refactor `main()` to dispatch on `--mode`: 20 min
- Implement `morning_deep_dive()` function with the 5 buckets: 45 min
- Write the new launchd plist + load it: 10 min
- Test by running with `--mode morning-deep-dive` manually: 10 min
- Update healthcheck: 10 min
- Total: **~2 hours focused work**

## Why this is deferred from 2026-06-17 main-line session

- Different repository (`alex-brain`) — requires cwd switch + context-loading on the 1075-line script
- Sensitive to existing Resend / launchd integration patterns — must not break the 12pm cron
- Needs focused single-task attention, not interleaved with XR build / Katz RFP / hackathon research that already filled the morning

## When to do this

- 2026-06-18 evening or 2026-06-19 if Alex wants the 10am cron live by 2026-06-19 morning
- Or 2026-06-21 (Saturday afternoon) after the IBM Bob spike (Sat morning), so it's the second focused block of the weekend

Decision belongs to Alex.
