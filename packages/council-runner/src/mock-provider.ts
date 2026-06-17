import type { VoiceVerdict, Verdict } from "@embodied-compliance/spatial-gating-protocol";
import type { Provider, VoicePrompt, DeliberationInput } from "./types.js";

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export class MockProvider implements Provider {
  async invoke(voice: VoicePrompt, input: DeliberationInput): Promise<VoiceVerdict> {
    const seed = hash(`${voice.voice_id}|${input.proposed_action}`);
    const verdict = voice.verdict_options[seed % voice.verdict_options.length] as Verdict;
    return {
      voice_id: voice.voice_id,
      verdict,
      rationale_short: `mock:${voice.voice_id} ${verdict} based on synthetic seed ${seed % 1000}`,
      primary_concern: `mock concern from ${voice.display_name}`,
      raw_json: { mock: true, seed_mod: seed % 1000, allowed_tools: voice.allowed_tools },
    };
  }
}
