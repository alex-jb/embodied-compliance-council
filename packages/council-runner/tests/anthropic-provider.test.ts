import { describe, it, expect, vi } from "vitest";
import { AnthropicProvider, parse_voice_response, type AnthropicLike } from "../src/anthropic-provider.js";
import type { VoicePrompt } from "../src/types.js";

function fake_voice(): VoicePrompt {
  return {
    voice_id: "macro",
    display_name: "Macro Analyst",
    vertical: "trading",
    allowed_tools: ["factor_exposures", "correlation_matrix", "sector_exposure"],
    verdict_options: ["approve", "block", "escalate"],
    weight_in_aggregate_default: 0.2,
    system_prompt: "You are the Macro Analyst voice.",
  };
}

describe("parse_voice_response", () => {
  it("parses a strict JSON object", () => {
    const text = JSON.stringify({
      verdict: "approve",
      rationale_short: "regime supportive",
      primary_concern: "none",
      factor_reading: { mkt: 0.5 },
    });
    const result = parse_voice_response(text, fake_voice());
    expect(result.verdict).toBe("approve");
    expect(result.rationale_short).toBe("regime supportive");
    expect(result.raw_json.factor_reading).toEqual({ mkt: 0.5 });
  });

  it("strips ```json fences if the model adds them defensively", () => {
    const text = '```json\n{"verdict": "block", "rationale_short": "concentrated", "primary_concern": "var step"}\n```';
    const result = parse_voice_response(text, fake_voice());
    expect(result.verdict).toBe("block");
  });

  it("throws if the verdict is not in voice.verdict_options", () => {
    const text = JSON.stringify({ verdict: "yolo", rationale_short: "x", primary_concern: "x" });
    expect(() => parse_voice_response(text, fake_voice())).toThrow(/invalid verdict/);
  });

  it("throws on non-JSON text", () => {
    expect(() => parse_voice_response("definitely not json", fake_voice())).toThrow(/not valid JSON/);
  });
});

describe("AnthropicProvider", () => {
  it("calls messages.create with the voice system prompt and parses the response", async () => {
    const create = vi.fn().mockResolvedValue({
      content: [
        {
          type: "text",
          text: JSON.stringify({
            verdict: "escalate",
            rationale_short: "regime ambiguous",
            primary_concern: "factor crowding",
          }),
        },
      ],
    });
    const client: AnthropicLike = { messages: { create } };
    const provider = new AnthropicProvider({ client });
    const voice = fake_voice();
    const result = await provider.invoke(voice, {
      vertical: "trading",
      proposed_action: "BUY 10 NVDA",
      context: { last_close: 142.3 },
    });
    expect(result.verdict).toBe("escalate");
    expect(create).toHaveBeenCalledOnce();
    const call_args = create.mock.calls[0][0];
    expect(call_args.system).toBe(voice.system_prompt);
    expect(call_args.messages[0].content).toContain("BUY 10 NVDA");
    expect(call_args.messages[0].content).toContain("factor_exposures");
  });

  it("throws when no api_key, env var, or client is provided", () => {
    const original = process.env.ANTHROPIC_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;
    try {
      expect(() => new AnthropicProvider({})).toThrow(/api_key/);
    } finally {
      if (original !== undefined) process.env.ANTHROPIC_API_KEY = original;
    }
  });
});
