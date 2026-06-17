#!/usr/bin/env node
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { load_voices_for_vertical } from "./loader.js";
import { MockProvider } from "./mock-provider.js";
import { deliberate } from "./runner.js";
import type { Vertical } from "@embodied-compliance/spatial-gating-protocol";

interface Args {
  vertical: Vertical;
  action: string;
  voices_dir: string;
}

function parse_args(argv: string[]): Args {
  const args: Partial<Args> = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--vertical") args.vertical = argv[++i] as Vertical;
    else if (a === "--action") args.action = argv[++i];
    else if (a === "--voices-dir") args.voices_dir = argv[++i];
    else if (a === "--help" || a === "-h") {
      print_help();
      process.exit(0);
    }
  }
  if (!args.vertical) throw new Error("missing required --vertical (trading|banking)");
  if (!args.action) throw new Error("missing required --action <text>");
  if (!args.voices_dir) {
    const here = dirname(fileURLToPath(import.meta.url));
    args.voices_dir = resolve(here, "../../council-voices");
  }
  return args as Args;
}

function print_help(): void {
  console.log(`council-runner — fan out a proposed action to 5 voices and aggregate

Usage:
  council-runner --vertical <trading|banking> --action "<text>" [--voices-dir <path>]

Example:
  council-runner --vertical trading --action "BUY 10 NVDA"
  council-runner --vertical banking --action "ORIGINATE \$750K CRE loan, 7yr amort"

The mock provider is used by default. Set ANTHROPIC_API_KEY and wire the
anthropic-provider (next milestone) to drive real council deliberation.
`);
}

async function main(): Promise<void> {
  const args = parse_args(process.argv.slice(2));
  const voices = load_voices_for_vertical(args.voices_dir, args.vertical);
  const provider = new MockProvider();
  const output = await deliberate(voices, provider, {
    vertical: args.vertical,
    proposed_action: args.action,
    context: {},
  });
  console.log(JSON.stringify(output, null, 2));
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
