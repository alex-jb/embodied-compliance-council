import { describe, it, expect } from "vitest";
import { classify, type Landmark } from "../src/classifier.js";

function pose(positions: Partial<Record<number, [number, number]>>): Landmark[] {
  const arr: Landmark[] = [];
  for (let i = 0; i < 21; i++) {
    const p = positions[i] ?? [0.5, 0.5];
    arr.push({ x: p[0], y: p[1], z: 0 });
  }
  return arr;
}

describe("classify", () => {
  it("returns none for empty landmarks", () => {
    expect(classify([])).toBe("none");
  });

  it("detects thumbs-up as approve", () => {
    const landmarks = pose({
      0: [0.5, 0.8],
      4: [0.5, 0.5],
      8: [0.6, 0.9],
      12: [0.55, 0.9],
      16: [0.5, 0.9],
      20: [0.45, 0.9],
    });
    expect(classify(landmarks)).toBe("approve");
  });

  it("detects fist as block", () => {
    const landmarks = pose({
      0: [0.5, 0.5],
      4: [0.5, 0.6],
      8: [0.5, 0.6],
      12: [0.5, 0.6],
      16: [0.5, 0.6],
      20: [0.5, 0.6],
    });
    expect(classify(landmarks)).toBe("block");
  });

  it("detects thumb-index pinch as escalate", () => {
    const landmarks = pose({
      0: [0.5, 0.8],
      4: [0.5, 0.5],
      8: [0.5, 0.5],
      12: [0.55, 0.3],
      16: [0.6, 0.3],
      20: [0.65, 0.3],
    });
    expect(classify(landmarks)).toBe("escalate");
  });

  it("returns none for an open palm", () => {
    const landmarks = pose({
      0: [0.5, 0.8],
      4: [0.3, 0.5],
      8: [0.4, 0.3],
      12: [0.5, 0.2],
      16: [0.6, 0.3],
      20: [0.7, 0.4],
    });
    expect(classify(landmarks)).toBe("none");
  });

  it("returns none when fewer than 21 landmarks", () => {
    const partial: Landmark[] = Array.from({ length: 10 }, () => ({ x: 0.5, y: 0.5, z: 0 }));
    expect(classify(partial)).toBe("none");
  });
});
