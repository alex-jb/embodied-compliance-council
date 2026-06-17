import type { VoiceId, Verdict, VoiceVerdict } from "@embodied-compliance/spatial-gating-protocol";
import type { Provider, VoicePrompt, DeliberationInput, DeliberationOutput } from "./types.js";

function aggregate(verdicts: VoiceVerdict[], weights: Record<VoiceId, number>): Verdict {
  const tally: Record<string, number> = {};
  for (const v of verdicts) {
    const w = weights[v.voice_id] ?? 0.2;
    tally[v.verdict] = (tally[v.verdict] ?? 0) + w;
  }
  let best_verdict: Verdict = verdicts[0]?.verdict ?? "escalate";
  let best_score = -Infinity;
  for (const [verdict, score] of Object.entries(tally)) {
    if (score > best_score) {
      best_score = score;
      best_verdict = verdict as Verdict;
    }
  }
  return best_verdict;
}

export async function deliberate(
  voices: VoicePrompt[],
  provider: Provider,
  input: DeliberationInput
): Promise<DeliberationOutput> {
  const started = performance.now();
  const filtered = voices.filter((v) => v.vertical === input.vertical);
  if (filtered.length === 0) throw new Error(`no voices loaded for vertical "${input.vertical}"`);

  const verdicts = await Promise.all(filtered.map((voice) => provider.invoke(voice, input)));

  const weights: Record<VoiceId, number> = {} as Record<VoiceId, number>;
  for (const v of filtered) weights[v.voice_id] = v.weight_in_aggregate_default;

  const aggregate_verdict = aggregate(verdicts, weights);
  const duration_ms = performance.now() - started;

  return {
    decision_id: `d_${Date.now().toString(36)}`,
    vertical: input.vertical,
    proposed_action: input.proposed_action,
    voice_verdicts: verdicts,
    aggregate_verdict,
    aggregate_weights: weights,
    duration_ms,
    timestamp_iso: new Date().toISOString(),
  };
}
