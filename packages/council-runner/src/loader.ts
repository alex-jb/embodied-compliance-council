import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type { Vertical, VoiceId, Verdict } from "@embodied-compliance/spatial-gating-protocol";
import type { VoicePrompt } from "./types.js";

const FRONTMATTER_RE = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;

function parse_frontmatter(content: string): { frontmatter: Record<string, unknown>; body: string } {
  const match = content.match(FRONTMATTER_RE);
  if (!match) throw new Error("File missing YAML frontmatter delimited by '---'");
  const yaml = match[1];
  const body = match[2];
  const fm: Record<string, unknown> = {};
  const lines = yaml.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("#")) {
      i++;
      continue;
    }
    const m = line.match(/^([a-z_][a-z0-9_]*):\s*(.*)$/i);
    if (!m) {
      i++;
      continue;
    }
    const key = m[1];
    let value: unknown = m[2].trim();
    if (value === "") {
      const list: string[] = [];
      i++;
      while (i < lines.length && lines[i].match(/^\s+-\s+/)) {
        list.push(lines[i].replace(/^\s+-\s+/, "").trim());
        i++;
      }
      fm[key] = list;
      continue;
    }
    const inline_list = (value as string).match(/^\[(.*)\]$/);
    if (inline_list) {
      fm[key] = inline_list[1]
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      i++;
      continue;
    }
    const num = Number(value);
    if (!Number.isNaN(num) && (value as string).match(/^-?\d+(\.\d+)?$/)) {
      fm[key] = num;
    } else {
      fm[key] = value;
    }
    i++;
  }
  return { frontmatter: fm, body: body.trim() };
}

export function load_voice_from_file(path: string): VoicePrompt {
  const raw = readFileSync(path, "utf-8");
  const { frontmatter, body } = parse_frontmatter(raw);
  const required = ["voice_id", "display_name", "vertical", "allowed_tools", "verdict_options", "weight_in_aggregate_default"];
  for (const key of required) {
    if (!(key in frontmatter)) throw new Error(`${path}: missing required frontmatter key "${key}"`);
  }
  return {
    voice_id: frontmatter.voice_id as VoiceId,
    display_name: frontmatter.display_name as string,
    vertical: frontmatter.vertical as Vertical,
    allowed_tools: frontmatter.allowed_tools as string[],
    verdict_options: frontmatter.verdict_options as Verdict[],
    weight_in_aggregate_default: frontmatter.weight_in_aggregate_default as number,
    system_prompt: body,
  };
}

export function load_voices_for_vertical(voices_dir: string, vertical: Vertical): VoicePrompt[] {
  const dir = join(voices_dir, vertical);
  const files = readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort();
  return files.map((f) => load_voice_from_file(join(dir, f)));
}
