import Anthropic from "@anthropic-ai/sdk";
import type { VoiceVerdict, Verdict } from "@embodied-compliance/spatial-gating-protocol";
import type { Provider, VoicePrompt, DeliberationInput } from "./types.js";

const DEFAULT_MODEL = "claude-sonnet-4-6";
const DEFAULT_MAX_TOKENS = 1024;

export interface AnthropicLike {
  messages: {
    create: (params: {
      model: string;
      max_tokens: number;
      system: string;
      messages: Array<{ role: "user"; content: string }>;
    }) => Promise<{ content: Array<{ type: string; text?: string }> }>;
  };
}

export interface AnthropicProviderOptions {
  api_key?: string;
  model?: string;
  max_tokens?: number;
  client?: AnthropicLike;
}

export class AnthropicProvider implements Provider {
  private client: AnthropicLike;
  private model: string;
  private max_tokens: number;

  constructor(options: AnthropicProviderOptions = {}) {
    if (options.client) {
      this.client = options.client;
    } else {
      const api_key = options.api_key ?? process.env.ANTHROPIC_API_KEY;
      if (!api_key) {
        throw new Error(
          "AnthropicProvider requires api_key option or ANTHROPIC_API_KEY env var"
        );
      }
      this.client = new Anthropic({ apiKey: api_key }) as unknown as AnthropicLike;
    }
    this.model = options.model ?? DEFAULT_MODEL;
    this.max_tokens = options.max_tokens ?? DEFAULT_MAX_TOKENS;
  }

  async invoke(voice: VoicePrompt, input: DeliberationInput): Promise<VoiceVerdict> {
    const user_message = build_user_message(voice, input);
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: this.max_tokens,
      system: voice.system_prompt,
      messages: [{ role: "user", content: user_message }],
    });
    const text = extract_text(response);
    return parse_voice_response(text, voice);
  }
}

function build_user_message(voice: VoicePrompt, input: DeliberationInput): string {
  const ctx = Object.keys(input.context).length === 0 ? "(none provided)" : JSON.stringify(input.context, null, 2);
  return `Proposed action: ${input.proposed_action}

Context:
${ctx}

Tools available to you (call only these to gather evidence): ${voice.allowed_tools.join(", ")}

Respond with your verdict per the strict JSON schema defined at the end of your system prompt. Output ONLY the single-line JSON object — no markdown fences, no commentary, no preamble.`;
}

function extract_text(response: { content: Array<{ type: string; text?: string }> }): string {
  for (const block of response.content) {
    if (block.type === "text" && typeof block.text === "string") return block.text;
  }
  throw new Error("Anthropic response contains no text block");
}

export function parse_voice_response(text: string, voice: VoicePrompt): VoiceVerdict {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```$/, "").trim();
  }
  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(
      `${voice.voice_id} response was not valid JSON: ${cleaned.slice(0, 120)}${cleaned.length > 120 ? "..." : ""}`
    );
  }
  const verdict = parsed.verdict as Verdict;
  if (!voice.verdict_options.includes(verdict)) {
    throw new Error(
      `${voice.voice_id} returned invalid verdict "${verdict}" (allowed: ${voice.verdict_options.join("|")})`
    );
  }
  return {
    voice_id: voice.voice_id,
    verdict,
    rationale_short: String(parsed.rationale_short ?? ""),
    primary_concern: String(parsed.primary_concern ?? ""),
    raw_json: parsed,
  };
}
