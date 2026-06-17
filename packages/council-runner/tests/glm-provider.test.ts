import { describe, it, expect, vi } from "vitest";
import { GLMProvider, type OpenAILike } from "../src/glm-provider.js";
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

describe("GLMProvider", () => {
  it("calls chat.completions.create with system prompt + user message and parses verdict", async () => {
    const create = vi.fn().mockResolvedValue({
      choices: [
        {
          message: {
            content: JSON.stringify({
              verdict: "approve",
              rationale_short: "regime supportive",
              primary_concern: "none",
              factor_reading: { mkt: 0.5 },
            }),
          },
        },
      ],
    });
    const client: OpenAILike = { chat: { completions: { create } } };
    const provider = new GLMProvider({ client });
    const voice = fake_voice();
    const result = await provider.invoke(voice, {
      vertical: "trading",
      proposed_action: "BUY 10 NVDA",
      context: { last_close: 142.3 },
    });
    expect(result.verdict).toBe("approve");
    expect(result.voice_id).toBe("macro");
    expect(create).toHaveBeenCalledOnce();
    const call = create.mock.calls[0][0];
    expect(call.messages[0]).toEqual({ role: "system", content: voice.system_prompt });
    expect(call.messages[1].content).toContain("BUY 10 NVDA");
    expect(call.messages[1].content).toContain("factor_exposures");
  });

  it("throws when neither api_key nor env var nor client is provided", () => {
    const original = process.env.GLM_API_KEY;
    delete process.env.GLM_API_KEY;
    try {
      expect(() => new GLMProvider({})).toThrow(/api_key/);
    } finally {
      if (original !== undefined) process.env.GLM_API_KEY = original;
    }
  });

  it("throws when GLM returns empty content", async () => {
    const create = vi.fn().mockResolvedValue({ choices: [{ message: { content: null } }] });
    const client: OpenAILike = { chat: { completions: { create } } };
    const provider = new GLMProvider({ client });
    await expect(
      provider.invoke(fake_voice(), { vertical: "trading", proposed_action: "x", context: {} })
    ).rejects.toThrow(/no text content/);
  });
});
