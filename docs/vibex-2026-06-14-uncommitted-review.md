# Vibex 2026-06-14 uncommitted docs — Ship/Stash review

**Audit scope:** 6 files on Alex's working tree in `~/Desktop/vibex/docs/` and `~/Desktop/vibex/docs/specs/`, all dated 2026-06-14 but never committed. Goal: per-file Ship / Stash / Convert-to-spec recommendation. Alex makes the final call.

---

## Working-tree docs (3 small)

### `docs/custom-cursor-2026-06-14.md` (4.8 KB)

**What:** Scaffold of Locomotive/Cuberto-style custom cursor for VibeXForge forge surface. Self-described as "uncommitted, sitting on the working tree for Alex's review (Splunk Loom recording 9pm same night — the vibex tree was kept clean)."

**Verdict: SHIP**

Reason: Cursor work is a *small* visual upgrade that touches limited surface area (probably one CSS file + a hook). 2 days have passed since the Splunk Loom block; the vibex-clean-tree concern that delayed it is gone. Committing this gets you back on the forge visual polish track and clears working-tree drift.

**Action:** `git add docs/custom-cursor-2026-06-14.md components/forge/ && git commit -m "docs(forge): custom cursor scaffold notes (2026-06-14)"`

### `docs/provider-abstraction-2026-06-14.md` (5.0 KB)

**What:** `lib/ai-provider.ts` shim that lets VibeXForge AI calls run on Claude default or OpenAI-compatible alternatives (Kimi K2 / DeepSeek V3 / GLM-4 / Qwen). One caller (`generateProjectReview`) already refactored as proof point.

**Verdict: SHIP**

Reason: The provider abstraction is a structural improvement that doesn't change user-facing behavior in default mode (Claude). Committing it freezes the design choice while the test case is still mentally fresh. Risk of leaving it on the tree is that you forget the design intent and have to re-derive it later.

**Action:** `git add docs/provider-abstraction-2026-06-14.md lib/ai-provider.ts lib/ai.ts && git commit -m "feat(ai): pluggable provider shim (Claude default; Kimi/DeepSeek/GLM/Qwen optional)"`

### `docs/sound-vocab-2026-06-14.md` (4.8 KB)

**What:** `lib/sound.ts` + `lib/haptics.ts` for procedural placeholder sounds + haptic vibration keyed to 5 event names. SSR-safe + `prefers-reduced-motion` honored. One proof-point wire-up on `/launch` submit.

**Verdict: SHIP, but tag as `placeholder`**

Reason: The procedural placeholder sounds are not the final audio asset; the doc itself notes "Alex to review and decide ship timing + Fiverr commission." Ship the scaffolding so the API is locked, then swap audio files later when Fiverr asset arrives. Don't block on perfect audio.

**Action:** `git add docs/sound-vocab-2026-06-14.md lib/sound.ts lib/haptics.ts app/launch/page.tsx && git commit -m "feat(sound): placeholder vocabulary + haptics, awaiting Fiverr audio assets"`

---

## Specs directory (3 large)

### `docs/specs/2026-06-14-funeral-visual-upgrade-spec.md` (18 KB)

**What:** Visual upgrade plan for the AI Side Project Funeral viral candidate.

**Verdict: SHIP as a spec (not as code)**

Reason: This is a design document for a viral candidate that's still pre-launch. Committing it as a spec gives you a single source of truth for when you do build it, and lets future-you reference the design intent. No production code change.

**Action:** `git add docs/specs/2026-06-14-funeral-visual-upgrade-spec.md && git commit -m "docs(specs): Funeral visual upgrade spec — pre-build design reference"`

### `docs/specs/2026-06-14-cracked-score-reveal-spec.md` (25 KB)

**What:** Spec for the Cracked Score reveal page (viral candidate #2).

**Verdict: SHIP as a spec**

Same logic as funeral — design reference, not code. Commit it.

### `docs/specs/2026-06-14-cofounder-roast-spec.md` (25 KB)

**What:** Spec for the AI Cofounder Roast viral candidate.

**Verdict: SHIP as a spec**

Same. Commit.

---

## Summary recommendation

**Ship all 6.** All three "scaffold" working-tree docs have code paired with them that should land too. All three specs are design references whose value lasts longer than the working tree they sit on.

**Risk of NOT shipping:** working-tree drift accumulates across machines; design intent rots; the Splunk-Loom-clean-tree justification expired 2 days ago.

**Total commit plan:** 6 separate commits to preserve atomic history. Estimated 10 minutes including the build-locally-before-push check from the VibeXForge AGENTS.md.

```bash
cd ~/Desktop/vibex
npm run build      # verify clean before each push
# then 6 atomic commits per the per-doc actions above
git push origin master
```

---

## What the review did NOT do

- Did not read every line of the three 18-25 KB specs. They are design documents whose internal decisions Alex made personally; my job here is the ship/stash framing, not the design critique.
- Did not commit anything on Alex's behalf. Working tree belongs to Alex.
- Did not test the code paths. The provider-abstraction shim claims tests exist in the doc; trust Alex's last test run.
