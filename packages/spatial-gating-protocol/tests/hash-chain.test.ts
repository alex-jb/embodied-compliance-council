import { describe, it, expect } from "vitest";
import { append_entry, verify_chain, type ChainEntry } from "../src/hash-chain.js";
import type { CouncilDecision } from "../src/types.js";

function fake_decision(decision_id: string, action: string): CouncilDecision {
  return {
    decision_id,
    vertical: "trading",
    proposed_action: action,
    aggregate_verdict: "approve",
    timestamp_iso: "2026-06-17T10:00:00Z",
    verdicts: [
      {
        voice_id: "macro",
        verdict: "approve",
        rationale_short: "regime supportive",
        primary_concern: "none",
        raw_json: {},
      },
      {
        voice_id: "sector",
        verdict: "approve",
        rationale_short: "sector underweight",
        primary_concern: "none",
        raw_json: {},
      },
    ],
  };
}

describe("hash-chain", () => {
  it("chains entries with genesis prev hash", async () => {
    const chain: ChainEntry[] = [];
    const entry = await append_entry(chain, fake_decision("d1", "buy 10 NVDA"));
    expect(entry.index).toBe(0);
    expect(entry.prev_hash_hex).toBe("0".repeat(64));
    expect(entry.hash_hex).toHaveLength(64);
  });

  it("verifies an honestly built chain", async () => {
    const chain: ChainEntry[] = [];
    chain.push(await append_entry(chain, fake_decision("d1", "buy 10 NVDA")));
    chain.push(await append_entry(chain, fake_decision("d2", "sell 5 TSLA")));
    chain.push(await append_entry(chain, fake_decision("d3", "hold")));
    const result = await verify_chain(chain);
    expect(result.valid).toBe(true);
    expect(result.broken_at_index).toBeNull();
  });

  it("detects tampering with a decision payload", async () => {
    const chain: ChainEntry[] = [];
    chain.push(await append_entry(chain, fake_decision("d1", "buy 10 NVDA")));
    chain.push(await append_entry(chain, fake_decision("d2", "sell 5 TSLA")));
    chain[0].decision.proposed_action = "buy 100 NVDA";
    const result = await verify_chain(chain);
    expect(result.valid).toBe(false);
    expect(result.broken_at_index).toBe(0);
  });

  it("detects tampering with a chain link", async () => {
    const chain: ChainEntry[] = [];
    chain.push(await append_entry(chain, fake_decision("d1", "buy 10 NVDA")));
    chain.push(await append_entry(chain, fake_decision("d2", "sell 5 TSLA")));
    chain[1].prev_hash_hex = "f".repeat(64);
    const result = await verify_chain(chain);
    expect(result.valid).toBe(false);
    expect(result.broken_at_index).toBe(1);
  });
});
