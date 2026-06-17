import { classify, type Gesture, type Landmark } from "./classifier.js";
import type { GestureEvent, GestureListener } from "./tracker.js";

const MEDIAPIPE_JOINT_NAMES: readonly string[] = [
  "wrist",
  "thumb-metacarpal",
  "thumb-phalanx-proximal",
  "thumb-phalanx-distal",
  "thumb-tip",
  "index-finger-metacarpal",
  "index-finger-phalanx-proximal",
  "index-finger-phalanx-distal",
  "index-finger-phalanx-tip",
  "index-finger-tip",
  "middle-finger-metacarpal",
  "middle-finger-phalanx-proximal",
  "middle-finger-phalanx-distal",
  "middle-finger-tip",
  "ring-finger-metacarpal",
  "ring-finger-phalanx-proximal",
  "ring-finger-phalanx-distal",
  "ring-finger-tip",
  "pinky-finger-metacarpal",
  "pinky-finger-phalanx-proximal",
  "pinky-finger-tip",
];

const GESTURE_DEBOUNCE_MS = 800;

interface XRJointSpaceLike {}
interface XRPoseLike {
  transform: { position: { x: number; y: number; z: number } };
}
interface XRHandLike {
  get(jointName: string): XRJointSpaceLike | undefined;
}
interface XRInputSourceLike {
  hand?: XRHandLike;
  handedness?: "left" | "right" | "none";
}
interface XRFrameLike {
  getJointPose(joint: XRJointSpaceLike, referenceSpace: unknown): XRPoseLike | null;
}
interface XRSessionLike {
  inputSources: ReadonlyArray<XRInputSourceLike>;
  addEventListener(event: string, listener: () => void): void;
}

export class XRHandTracker {
  private listeners: GestureListener[] = [];
  private last_emit_ms: Record<"left" | "right", number> = { left: 0, right: 0 };
  private last_gesture: Record<"left" | "right", Gesture> = { left: "none", right: "none" };

  on(listener: GestureListener): void {
    this.listeners.push(listener);
  }

  tick(frame: XRFrameLike, session: XRSessionLike, reference_space: unknown): void {
    const ts = performance.now();
    for (const source of session.inputSources) {
      if (!source.hand) continue;
      const hand: "left" | "right" = source.handedness === "left" ? "left" : "right";
      const landmarks: Landmark[] = [];
      for (const jointName of MEDIAPIPE_JOINT_NAMES) {
        const joint = source.hand.get(jointName);
        if (!joint) {
          landmarks.length = 0;
          break;
        }
        const pose = frame.getJointPose(joint, reference_space);
        if (!pose) {
          landmarks.length = 0;
          break;
        }
        landmarks.push({
          x: pose.transform.position.x,
          y: -pose.transform.position.y,
          z: pose.transform.position.z,
        });
      }
      if (landmarks.length !== 21) continue;
      const gesture = classify(landmarks);
      if (gesture === "none") {
        this.last_gesture[hand] = "none";
        continue;
      }
      if (gesture === this.last_gesture[hand] && ts - this.last_emit_ms[hand] < GESTURE_DEBOUNCE_MS) continue;
      this.last_gesture[hand] = gesture;
      this.last_emit_ms[hand] = ts;
      const event: GestureEvent = { gesture, hand, timestamp_ms: ts };
      for (const listener of this.listeners) listener(event);
    }
  }
}
