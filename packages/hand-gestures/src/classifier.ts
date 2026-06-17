export type Gesture = "approve" | "block" | "escalate" | "none";

export interface Landmark {
  x: number;
  y: number;
  z: number;
}

const PINCH_THRESHOLD = 0.05;
const THUMB_UP_RISE = 0.15;

export function classify(landmarks: Landmark[]): Gesture {
  if (landmarks.length !== 21) return "none";

  const wrist = landmarks[0];
  const thumb_tip = landmarks[4];
  const index_tip = landmarks[8];
  const middle_tip = landmarks[12];
  const ring_tip = landmarks[16];
  const pinky_tip = landmarks[20];

  const index_curled = index_tip.y > wrist.y;
  const middle_curled = middle_tip.y > wrist.y;
  const ring_curled = ring_tip.y > wrist.y;
  const pinky_curled = pinky_tip.y > wrist.y;
  const non_thumb_curled = index_curled && middle_curled && ring_curled && pinky_curled;

  const thumb_extended_up = thumb_tip.y < wrist.y - THUMB_UP_RISE;

  if (thumb_extended_up && non_thumb_curled) return "approve";

  if (non_thumb_curled && thumb_tip.y > wrist.y - 0.05) return "block";

  const pinch_dist = Math.hypot(thumb_tip.x - index_tip.x, thumb_tip.y - index_tip.y);
  if (pinch_dist < PINCH_THRESHOLD && !middle_curled && !ring_curled && !pinky_curled) {
    return "escalate";
  }

  return "none";
}
