import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import type { Vertical } from "@embodied-compliance/spatial-gating-protocol";
import { load_voices_for_vertical } from "./loader.js";
import { MockProvider } from "./mock-provider.js";
import { AnthropicProvider } from "./anthropic-provider.js";
import { deliberate } from "./runner.js";
import type { Provider, DeliberationOutput } from "./types.js";

export interface DeliberateRequest {
  vertical: Vertical;
  proposed_action: string;
  context?: Record<string, unknown>;
  provider?: "mock" | "anthropic";
}

export interface DeliberateResponse {
  ok: true;
  output: DeliberationOutput;
}

export interface DeliberateError {
  ok: false;
  error: string;
}

const DEFAULT_VOICES_DIR = (() => {
  const here = dirname(fileURLToPath(import.meta.url));
  return resolve(here, "../../council-voices");
})();

export interface HandlerOptions {
  voices_dir?: string;
  provider_factory?: (kind: "mock" | "anthropic") => Provider;
}

function default_provider_factory(kind: "mock" | "anthropic"): Provider {
  return kind === "anthropic" ? new AnthropicProvider() : new MockProvider();
}

function validate_request(body: unknown): DeliberateRequest {
  if (typeof body !== "object" || body === null) {
    throw new Error("request body must be a JSON object");
  }
  const b = body as Record<string, unknown>;
  const vertical = b.vertical;
  if (vertical !== "trading" && vertical !== "banking") {
    throw new Error("vertical must be 'trading' or 'banking'");
  }
  if (typeof b.proposed_action !== "string" || b.proposed_action.length === 0) {
    throw new Error("proposed_action must be a non-empty string");
  }
  if (b.proposed_action.length > 1000) {
    throw new Error("proposed_action must be at most 1000 characters");
  }
  const provider = b.provider;
  if (provider !== undefined && provider !== "mock" && provider !== "anthropic") {
    throw new Error("provider must be 'mock' or 'anthropic'");
  }
  return {
    vertical,
    proposed_action: b.proposed_action,
    context: typeof b.context === "object" && b.context !== null ? (b.context as Record<string, unknown>) : {},
    provider: provider as "mock" | "anthropic" | undefined,
  };
}

export async function handle_deliberation(
  body: unknown,
  options: HandlerOptions = {}
): Promise<DeliberateResponse | DeliberateError> {
  try {
    const request = validate_request(body);
    const voices_dir = options.voices_dir ?? DEFAULT_VOICES_DIR;
    const voices = load_voices_for_vertical(voices_dir, request.vertical);
    const factory = options.provider_factory ?? default_provider_factory;
    const provider = factory(request.provider ?? "mock");
    const output = await deliberate(voices, provider, {
      vertical: request.vertical,
      proposed_action: request.proposed_action,
      context: request.context ?? {},
    });
    return { ok: true, output };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
