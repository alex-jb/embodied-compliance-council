import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { load_voice_from_file, load_voices_for_vertical } from "../src/loader.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const VOICES_DIR = resolve(HERE, "../../council-voices");

describe("load_voice_from_file", () => {
  it("parses YAML frontmatter and body from a real voice file", () => {
    const path = resolve(VOICES_DIR, "trading/01-macro.md");
    const voice = load_voice_from_file(path);
    expect(voice.voice_id).toBe("macro");
    expect(voice.display_name).toBe("Macro Analyst");
    expect(voice.vertical).toBe("trading");
    expect(voice.allowed_tools).toContain("factor_exposures");
    expect(voice.verdict_options).toEqual(["approve", "block", "escalate"]);
    expect(voice.weight_in_aggregate_default).toBeCloseTo(0.2);
    expect(voice.system_prompt.length).toBeGreaterThan(200);
  });

  it("throws on missing frontmatter", () => {
    expect(() => load_voice_from_file(resolve(HERE, "../package.json"))).toThrow(/frontmatter/);
  });
});

describe("load_voices_for_vertical", () => {
  it("loads all 5 trading voices in canonical order", () => {
    const voices = load_voices_for_vertical(VOICES_DIR, "trading");
    expect(voices.length).toBe(5);
    expect(voices.map((v) => v.voice_id)).toEqual([
      "macro",
      "sector",
      "portfolio",
      "growth_vc",
      "activist_short",
    ]);
  });

  it("loads all 5 banking voices in canonical order", () => {
    const voices = load_voices_for_vertical(VOICES_DIR, "banking");
    expect(voices.length).toBe(5);
    expect(voices.map((v) => v.voice_id)).toEqual([
      "credit_fundamentals",
      "risk_officer",
      "fair_lending",
      "customer_advocate",
      "macro_contrarian",
    ]);
  });
});
