import type { CouncilDecision } from "./types.js";

export interface ChainEntry {
  index: number;
  decision: CouncilDecision;
  prev_hash_hex: string;
  hash_hex: string;
}

const GENESIS_HASH = "0".repeat(64);

async function sha256_hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function canonical_serialize(decision: CouncilDecision, prev_hash: string, index: number): string {
  const payload = {
    index,
    prev_hash_hex: prev_hash,
    decision_id: decision.decision_id,
    vertical: decision.vertical,
    proposed_action: decision.proposed_action,
    aggregate_verdict: decision.aggregate_verdict,
    timestamp_iso: decision.timestamp_iso,
    verdicts: decision.verdicts
      .slice()
      .sort((a, b) => a.voice_id.localeCompare(b.voice_id))
      .map((v) => ({
        voice_id: v.voice_id,
        verdict: v.verdict,
        rationale_short: v.rationale_short,
        primary_concern: v.primary_concern,
      })),
  };
  return JSON.stringify(payload);
}

export async function append_entry(chain: ChainEntry[], decision: CouncilDecision): Promise<ChainEntry> {
  const index = chain.length;
  const prev_hash = chain.length === 0 ? GENESIS_HASH : chain[chain.length - 1].hash_hex;
  const serialized = canonical_serialize(decision, prev_hash, index);
  const hash_hex = await sha256_hex(serialized);
  return { index, decision, prev_hash_hex: prev_hash, hash_hex };
}

export async function verify_chain(chain: ChainEntry[]): Promise<{ valid: boolean; broken_at_index: number | null }> {
  let expected_prev = GENESIS_HASH;
  for (const entry of chain) {
    if (entry.prev_hash_hex !== expected_prev) {
      return { valid: false, broken_at_index: entry.index };
    }
    const serialized = canonical_serialize(entry.decision, entry.prev_hash_hex, entry.index);
    const recomputed = await sha256_hex(serialized);
    if (recomputed !== entry.hash_hex) {
      return { valid: false, broken_at_index: entry.index };
    }
    expected_prev = entry.hash_hex;
  }
  return { valid: true, broken_at_index: null };
}
