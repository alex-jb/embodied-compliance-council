import type { Vertical, VoiceId, VoicePodium } from "./types.js";

const TRADING_VOICES: VoiceId[] = [
  "macro",
  "sector",
  "portfolio",
  "growth_vc",
  "activist_short",
];

const BANKING_VOICES: VoiceId[] = [
  "credit_fundamentals",
  "risk_officer",
  "fair_lending",
  "customer_advocate",
  "macro_contrarian",
];

const RADIUS_METERS = 2.5;
const PODIUM_HEIGHT_Y = 0.0;
const ARC_DEG = 150;

export function voices_for_vertical(vertical: Vertical): VoiceId[] {
  return vertical === "trading" ? [...TRADING_VOICES] : [...BANKING_VOICES];
}

export function semicircle_layout(vertical: Vertical): VoicePodium[] {
  const voices = voices_for_vertical(vertical);
  const arc_rad = (ARC_DEG * Math.PI) / 180;
  const start = -arc_rad / 2;
  const step = arc_rad / (voices.length - 1);

  return voices.map((voice_id, i) => {
    const theta = start + step * i;
    return {
      voice_id,
      position: {
        x: RADIUS_METERS * Math.sin(theta),
        y: PODIUM_HEIGHT_Y,
        z: -RADIUS_METERS * Math.cos(theta),
      },
      rotation_y_rad: theta + Math.PI,
    };
  });
}
