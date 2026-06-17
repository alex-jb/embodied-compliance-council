import type { VoiceVerdict, Verdict } from "@embodied-compliance/spatial-gating-protocol";
import type { Provider, VoicePrompt, DeliberationInput } from "./types.js";
import { parse_voice_response } from "./anthropic-provider.js";

const DEFAULT_BASE_URL = "https://open.bigmodel.cn/api/paas/v4";
const DEFAULT_MODEL = "glm-5-plus";
const DEFAULT_MAX_TOKENS = 1024;

export interface OpenAILike {
  chat: {
    completions: {
      create: (params: {
        model: string;
        max_tokens: number;
        messages: Array<{ role: "system" | "user"; content: string }>;
      }) => Promise<{ choices: Array<{ message: { content: string | null } }> }>;
    };
  };
}

export interface GLMProviderOptions {
  api_key?: string;
  model?: string;
  max_tokens?: number;
  base_url?: string;
  client?: OpenAILike;
}

export class GLMProvider implements Provider {
  private client: OpenAILike;
  private model: string;
  private max_tokens: number;

  constructor(options: GLMProviderOptions = {}) {
    if (options.client) {
      this.client = options.client;
    } else {
      const api_key = options.api_key ?? process.env.GLM_API_KEY;
      if (!api_key) {
        throw new Error(
          "GLMProvider requires api_key option or GLM_API_KEY env var"
        );
      }
      const base_url = options.base_url ?? DEFAULT_BASE_URL;
      this.client = make_openai_like_client(api_key, base_url);
    }
    this.model = options.model ?? DEFAULT_MODEL;
    this.max_tokens = options.max_tokens ?? DEFAULT_MAX_TOKENS;
  }

  async invoke(voice: VoicePrompt, input: DeliberationInput): Promise<VoiceVerdict> {
    const user_message = build_user_message(voice, input);
    const response = await this.client.chat.completions.create({
      model: this.model,
      max_tokens: this.max_tokens,
      messages: [
        { role: "system", content: voice.system_prompt },
        { role: "user", content: user_message },
      ],
    });
    const text = response.choices?.[0]?.message?.content;
    if (typeof text !== "string" || text.length === 0) {
      throw new Error("GLM response contained no text content");
    }
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

function make_openai_like_client(api_key: string, base_url: string): OpenAILike {
  return {
    chat: {
      completions: {
        create: async (params) => {
          const response = await fetch(`${base_url}/chat/completions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${api_key}`,
            },
            body: JSON.stringify(params),
          });
          if (!response.ok) {
            const detail = await response.text();
            throw new Error(`GLM API error ${response.status}: ${detail.slice(0, 200)}`);
          }
          return (await response.json()) as { choices: Array<{ message: { content: string | null } }> };
        },
      },
    },
  };
}
