import { describe, it, expect } from "vitest";
import { handle_deliberation } from "../src/handler.js";
import { MockProvider } from "../src/mock-provider.js";

describe("handle_deliberation", () => {
  it("returns ok=true with a deliberation output for a valid request", async () => {
    const result = await handle_deliberation(
      {
        vertical: "trading",
        proposed_action: "BUY 10 NVDA",
        context: { last_close: 142.3 },
      },
      { provider_factory: () => new MockProvider() }
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output.voice_verdicts.length).toBe(5);
      expect(result.output.vertical).toBe("trading");
      expect(["approve", "block", "escalate"]).toContain(result.output.aggregate_verdict);
    }
  });

  it("returns ok=false when vertical is invalid", async () => {
    const result = await handle_deliberation({ vertical: "wat", proposed_action: "x" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/vertical/);
  });

  it("returns ok=false when proposed_action is missing", async () => {
    const result = await handle_deliberation({ vertical: "trading" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/proposed_action/);
  });

  it("returns ok=false when proposed_action exceeds 1000 chars", async () => {
    const result = await handle_deliberation({
      vertical: "trading",
      proposed_action: "x".repeat(1001),
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/1000/);
  });

  it("returns ok=false when body is not an object", async () => {
    const result = await handle_deliberation("not an object");
    expect(result.ok).toBe(false);
  });

  it("defaults context to an empty object", async () => {
    const result = await handle_deliberation(
      { vertical: "banking", proposed_action: "ORIGINATE $750K" },
      { provider_factory: () => new MockProvider() }
    );
    expect(result.ok).toBe(true);
  });
});
