import { HandLandmarker, FilesetResolver, type HandLandmarkerResult } from "@mediapipe/tasks-vision";
import { classify, type Gesture } from "./classifier.js";

const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

const WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm";

const GESTURE_DEBOUNCE_MS = 800;

export interface GestureEvent {
  gesture: Gesture;
  hand: "left" | "right";
  timestamp_ms: number;
}

export type GestureListener = (event: GestureEvent) => void;

export interface TrackerOptions {
  preview_corner?: "top-left" | "top-right" | "hidden";
  preview_width_px?: number;
}

export class HandTracker {
  private landmarker: HandLandmarker | null = null;
  private video: HTMLVideoElement | null = null;
  private stream: MediaStream | null = null;
  private listeners: GestureListener[] = [];
  private last_emit_ms = 0;
  private last_gesture: Gesture = "none";
  private running = false;

  async init(): Promise<void> {
    const fileset = await FilesetResolver.forVisionTasks(WASM_URL);
    this.landmarker = await HandLandmarker.createFromOptions(fileset, {
      baseOptions: { modelAssetPath: MODEL_URL, delegate: "GPU" },
      runningMode: "VIDEO",
      numHands: 2,
    });
  }

  async start_webcam(options: TrackerOptions = {}): Promise<void> {
    if (!this.landmarker) throw new Error("HandTracker.init() must be called before start_webcam()");
    this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
    this.video = document.createElement("video");
    this.video.srcObject = this.stream;
    this.video.autoplay = true;
    this.video.playsInline = true;
    this.video.muted = true;
    const corner = options.preview_corner ?? "top-right";
    if (corner !== "hidden") {
      const w = options.preview_width_px ?? 180;
      this.video.style.position = "fixed";
      this.video.style.top = "12px";
      this.video.style[corner === "top-right" ? "right" : "left"] = "12px";
      this.video.style.width = `${w}px`;
      this.video.style.borderRadius = "6px";
      this.video.style.border = "1px solid #2a3140";
      this.video.style.zIndex = "11";
      this.video.style.transform = "scaleX(-1)";
      document.body.appendChild(this.video);
    }
    await this.video.play();
    this.running = true;
    requestAnimationFrame(() => this.tick());
  }

  stop(): void {
    this.running = false;
    this.stream?.getTracks().forEach((t) => t.stop());
    if (this.video?.parentElement) this.video.parentElement.removeChild(this.video);
  }

  on(listener: GestureListener): void {
    this.listeners.push(listener);
  }

  private tick = (): void => {
    if (!this.running || !this.landmarker || !this.video) return;
    if (this.video.readyState >= 2) {
      const ts = performance.now();
      const result: HandLandmarkerResult = this.landmarker.detectForVideo(this.video, ts);
      this.process_result(result, ts);
    }
    requestAnimationFrame(this.tick);
  };

  private process_result(result: HandLandmarkerResult, ts_ms: number): void {
    if (result.landmarks.length === 0) {
      this.last_gesture = "none";
      return;
    }
    for (let i = 0; i < result.landmarks.length; i++) {
      const landmarks = result.landmarks[i];
      const gesture = classify(landmarks);
      if (gesture === "none") continue;
      if (gesture === this.last_gesture && ts_ms - this.last_emit_ms < GESTURE_DEBOUNCE_MS) continue;
      const handed = result.handedness?.[i]?.[0]?.categoryName?.toLowerCase() ?? "right";
      const hand: "left" | "right" = handed === "left" ? "left" : "right";
      this.last_gesture = gesture;
      this.last_emit_ms = ts_ms;
      for (const listener of this.listeners) listener({ gesture, hand, timestamp_ms: ts_ms });
    }
  }
}
