export type Vertical = "trading" | "banking";

export type Verdict = "approve" | "block" | "decline" | "escalate";

export type VoiceId =
  | "macro"
  | "sector"
  | "portfolio"
  | "growth_vc"
  | "activist_short"
  | "credit_fundamentals"
  | "risk_officer"
  | "fair_lending"
  | "customer_advocate"
  | "macro_contrarian";

export interface VoiceMeta {
  id: VoiceId;
  display_name: string;
  vertical: Vertical;
  allowed_tools: string[];
}

export interface VoiceVerdict {
  voice_id: VoiceId;
  verdict: Verdict;
  rationale_short: string;
  primary_concern: string;
  raw_json: Record<string, unknown>;
}

export interface SpatialPosition {
  x: number;
  y: number;
  z: number;
}

export interface VoicePodium {
  voice_id: VoiceId;
  position: SpatialPosition;
  rotation_y_rad: number;
}

export interface CouncilDecision {
  decision_id: string;
  vertical: Vertical;
  proposed_action: string;
  verdicts: VoiceVerdict[];
  aggregate_verdict: Verdict;
  timestamp_iso: string;
}
