# `@embodied-compliance/council-runner`

Node-side orchestrator that loads the 10 voice prompts from `packages/council-voices/` and fans a proposed action out to 5 voices in parallel, then aggregates by weighted verdict count.

Phase 3 milestone — currently ships with a deterministic `MockProvider` for tests + offline development. The `AnthropicProvider` (real per-voice Sonnet 4.6 calls with the tool-restricted JSON schema) lands next.

## Quick start

```bash
npm install
npm run typecheck --workspace packages/council-runner
npm run test --workspace packages/council-runner
```

Then run the CLI:

```bash
node packages/council-runner/src/cli.ts \
  --vertical trading \
  --action "BUY 10 NVDA"
```

Output is a single JSON `DeliberationOutput`:

```json
{
  "decision_id": "d_l4c1...",
  "vertical": "trading",
  "proposed_action": "BUY 10 NVDA",
  "voice_verdicts": [
    { "voice_id": "macro", "verdict": "approve", ... },
    { "voice_id": "sector", "verdict": "escalate", ... },
    ...
  ],
  "aggregate_verdict": "approve",
  "aggregate_weights": { "macro": 0.2, "sector": 0.2, ... },
  "duration_ms": 4.12,
  "timestamp_iso": "2026-06-17T15:30:00.000Z"
}
```

## Architecture

- `loader.ts` — parses the Markdown + YAML frontmatter voice prompts. Hand-rolled YAML parser (no `gray-matter` dep) supports the subset used by the council-voices format: scalars, inline lists `[a, b]`, and indented bullet lists.
- `types.ts` — `VoicePrompt`, `DeliberationInput`, `DeliberationOutput`, `Provider` interface.
- `mock-provider.ts` — hashes `(voice_id, proposed_action)` to pick a deterministic verdict from the voice's `verdict_options`. Stable for tests, useful for offline runs.
- `runner.ts` — `deliberate()` filters voices to the requested vertical, calls `provider.invoke()` per voice in parallel via `Promise.all`, then aggregates by weighted verdict count. Aggregation respects each voice's `weight_in_aggregate_default`.
- `cli.ts` — minimal argv parser (no `commander` dep).

## Tests

- `tests/loader.test.ts` — verifies frontmatter parsing on real voice files and canonical voice ordering for both verticals.
- `tests/runner.test.ts` — verifies fan-out, determinism, vertical filtering, and verdict-options consistency.

## Next milestone

`AnthropicProvider` — real per-voice calls. Each voice's `allowed_tools` becomes the `tools` array on the Sonnet 4.6 request; the system prompt is the voice's body; the user message is the proposed action + context. The provider parses the strict-JSON output schema declared at the bottom of each voice prompt.

Once shipped, the `apps/{trading,banking}-quest` WebXR scenes can call this runner via a thin Vercel function instead of using their current `fire_synthetic_decision` cycler.
