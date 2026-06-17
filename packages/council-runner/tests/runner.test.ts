import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { load_voices_for_vertical } from "../src/loader.js";
import { MockProvider } from "../src/mock-provider.js";
import { deliberate } from "../src/runner.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const VOICES_DIR = resolve(HERE, "../../council-voices");

describe("deliberate", () => {
  it("returns 5 trading voice verdicts and a non-null aggregate", async () => {
    const voices = load_voices_for_vertical(VOICES_DIR, "trading");
    const out = await deliberate(voices, new MockProvider(), {
      vertical: "trading",
      proposed_action: "BUY 10 NVDA",
      context: {},
    });
    expect(out.voice_verdicts.length).toBe(5);
    expect(["approve", "block", "escalate"]).toContain(out.aggregate_verdict);
    expect(out.duration_ms).toBeGreaterThan(0);
    expect(out.decision_id).toMatch(/^d_/);
  });

  it("returns 5 banking voice verdicts and aggregates over banking verdict options", async () => {
    const voices = load_voices_for_vertical(VOICES_DIR, "banking");
    const out = await deliberate(voices, new MockProvider(), {
      vertical: "banking",
      proposed_action: "ORIGINATE $750K CRE loan, 7yr amort",
      context: {},
    });
    expect(out.voice_verdicts.length).toBe(5);
    expect(["approve", "decline", "escalate"]).toContain(out.aggregate_verdict);
  });

  it("is deterministic for the same input", async () => {
    const voices = load_voices_for_vertical(VOICES_DIR, "trading");
    const a = await deliberate(voices, new MockProvider(), {
      vertical: "trading",
      proposed_action: "BUY 10 NVDA",
      context: {},
    });
    const b = await deliberate(voices, new MockProvider(), {
      vertical: "trading",
      proposed_action: "BUY 10 NVDA",
      context: {},
    });
    expect(a.voice_verdicts.map((v) => v.verdict)).toEqual(b.voice_verdicts.map((v) => v.verdict));
    expect(a.aggregate_verdict).toBe(b.aggregate_verdict);
  });

  it("throws when no voices match the requested vertical", async () => {
    const voices = load_voices_for_vertical(VOICES_DIR, "trading");
    await expect(
      deliberate(voices, new MockProvider(), {
        vertical: "banking",
        proposed_action: "x",
        context: {},
      })
    ).rejects.toThrow(/no voices/);
  });
});
