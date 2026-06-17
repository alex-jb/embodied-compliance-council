import type { Vertical, VoiceId, Verdict, VoiceVerdict } from "@embodied-compliance/spatial-gating-protocol";

export interface VoicePrompt {
  voice_id: VoiceId;
  display_name: string;
  vertical: Vertical;
  allowed_tools: string[];
  verdict_options: Verdict[];
  weight_in_aggregate_default: number;
  system_prompt: string;
}

export interface DeliberationInput {
  vertical: Vertical;
  proposed_action: string;
  context: Record<string, unknown>;
}

export interface DeliberationOutput {
  decision_id: string;
  vertical: Vertical;
  proposed_action: string;
  voice_verdicts: VoiceVerdict[];
  aggregate_verdict: Verdict;
  aggregate_weights: Record<VoiceId, number>;
  duration_ms: number;
  timestamp_iso: string;
}

export interface Provider {
  invoke(voice: VoicePrompt, input: DeliberationInput): Promise<VoiceVerdict>;
}
