import * as THREE from "three";
import { buildScene } from "./scene.js";
import { AuditPanel } from "./audit-panel.js";
import { DataPanel } from "./data-panel.js";
import { BiasConstellation } from "./bias-constellation.js";
import {
  append_entry,
  semicircle_layout,
  type ChainEntry,
  type CouncilDecision,
} from "@embodied-compliance/spatial-gating-protocol";
import { HandTracker, XRHandTracker, type Gesture } from "@embodied-compliance/hand-gestures";

const VERTICAL = "trading" as const;

const canvas_root = document.getElementById("app")!;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
renderer.setClearColor(0x06080c);
canvas_root.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.6, 0);

const scene = buildScene(VERTICAL, semicircle_layout(VERTICAL));

const data_panel = new DataPanel();
scene.add(data_panel.mesh);

const bias_constellation = new BiasConstellation();
scene.add(bias_constellation.group);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

let yaw = 0;
let pitch = 0;
let dragging = false;
let last = { x: 0, y: 0 };
canvas_root.addEventListener("pointerdown", (e) => {
  dragging = true;
  last = { x: e.clientX, y: e.clientY };
});
window.addEventListener("pointerup", () => (dragging = false));
window.addEventListener("pointermove", (e) => {
  if (!dragging) return;
  yaw -= (e.clientX - last.x) * 0.005;
  pitch -= (e.clientY - last.y) * 0.005;
  pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
  last = { x: e.clientX, y: e.clientY };
});

const xr_hand_tracker = new XRHandTracker();
xr_hand_tracker.on((event) => {
  void fire_synthetic_decision(event.gesture);
});

renderer.setAnimationLoop((_time, frame) => {
  camera.rotation.order = "YXZ";
  camera.rotation.y = yaw;
  camera.rotation.x = pitch;
  if (frame && renderer.xr.isPresenting) {
    const session = renderer.xr.getSession();
    const ref_space = renderer.xr.getReferenceSpace();
    if (session && ref_space) {
      xr_hand_tracker.tick(frame as any, session as any, ref_space);
    }
  }
  renderer.render(scene, camera);
});

const xr_button = document.createElement("button");
xr_button.className = "xr-button";
xr_button.textContent = "Enter VR";
xr_button.addEventListener("click", async () => {
  if (!navigator.xr) {
    xr_button.textContent = "WebXR unavailable";
    return;
  }
  const supported = await navigator.xr.isSessionSupported("immersive-vr");
  if (!supported) {
    xr_button.textContent = "VR not supported";
    return;
  }
  const session = await navigator.xr.requestSession("immersive-vr", { optionalFeatures: ["local-floor", "hand-tracking"] });
  await renderer.xr.setSession(session);
  xr_button.textContent = "VR active";
});
document.body.appendChild(xr_button);

const audit_panel = new AuditPanel(document.getElementById("audit-entries")!);
const chain: ChainEntry[] = [];

function verdict_for_gesture(g: Gesture): "approve" | "block" | "escalate" | null {
  if (g === "approve") return "approve";
  if (g === "block") return "block";
  if (g === "escalate") return "escalate";
  return null;
}

const COUNCIL_SERVER_URL = "http://localhost:3030/api/deliberate";
let use_real_council = false;

async function fetch_real_decision(action: string): Promise<CouncilDecision | null> {
  try {
    const response = await fetch(COUNCIL_SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vertical: VERTICAL, proposed_action: action, provider: "mock" }),
    });
    const json = await response.json();
    if (!json.ok) {
      console.error("council-runner error:", json.error);
      return null;
    }
    return json.output as CouncilDecision;
  } catch (err) {
    console.error("council-runner unreachable:", err);
    return null;
  }
}

async function fire_synthetic_decision(gesture: Gesture = "none") {
  const action = "BUY 10 NVDA";
  let decision: CouncilDecision;
  if (use_real_council) {
    const real = await fetch_real_decision(action);
    if (real) {
      decision = real;
    } else {
      decision = build_local_decision(action, gesture);
    }
  } else {
    decision = build_local_decision(action, gesture);
  }
  const entry = await append_entry(chain, decision);
  chain.push(entry);
  audit_panel.render(chain);
  data_panel.update(chain);
  bias_constellation.update(chain);
}

function build_local_decision(action: string, gesture: Gesture): CouncilDecision {
  const verdict =
    verdict_for_gesture(gesture) ??
    (["approve", "block", "escalate"][chain.length % 3] as "approve" | "block" | "escalate");
  return {
    decision_id: `d${chain.length + 1}`,
    vertical: VERTICAL,
    proposed_action: action,
    aggregate_verdict: verdict,
    timestamp_iso: new Date().toISOString(),
    verdicts: semicircle_layout(VERTICAL).map((p) => ({
      voice_id: p.voice_id,
      verdict: "approve",
      rationale_short: `${p.voice_id} synthetic`,
      primary_concern: gesture === "none" ? "demo entry" : `gesture:${gesture}`,
      raw_json: {},
    })),
  };
}

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    void fire_synthetic_decision();
  }
});

const hand_button = document.createElement("button");
hand_button.className = "xr-button";
hand_button.style.left = "auto";
hand_button.style.right = "12px";
hand_button.style.bottom = "12px";
hand_button.textContent = "Enable hand tracking";
hand_button.addEventListener("click", async () => {
  hand_button.disabled = true;
  hand_button.textContent = "Loading MediaPipe...";
  try {
    const tracker = new HandTracker();
    await tracker.init();
    await tracker.start_webcam({ preview_corner: "top-right", preview_width_px: 180 });
    tracker.on((event) => {
      void fire_synthetic_decision(event.gesture);
    });
    hand_button.textContent = "Hand tracking ON";
  } catch (err) {
    console.error(err);
    hand_button.textContent = "Hand tracking failed";
    hand_button.disabled = false;
  }
});
document.body.appendChild(hand_button);

const council_button = document.createElement("button");
council_button.className = "xr-button";
council_button.style.left = "50%";
council_button.style.transform = "translateX(-50%)";
council_button.style.bottom = "12px";
council_button.textContent = "Council: mock";
council_button.addEventListener("click", async () => {
  use_real_council = !use_real_council;
  council_button.textContent = use_real_council ? "Council: live (mock provider via :3030)" : "Council: mock";
  if (use_real_council) {
    try {
      const health = await fetch("http://localhost:3030/health");
      if (!health.ok) throw new Error("server not healthy");
    } catch {
      council_button.textContent = "Council: server unreachable (run npm run council:server)";
      use_real_council = false;
    }
  }
});
document.body.appendChild(council_button);

const constellation_button = document.createElement("button");
constellation_button.className = "xr-button";
constellation_button.style.left = "12px";
constellation_button.style.bottom = "60px";
constellation_button.textContent = "Bias constellation: off";
let constellation_visible = false;
constellation_button.addEventListener("click", () => {
  constellation_visible = !constellation_visible;
  bias_constellation.set_visible(constellation_visible);
  constellation_button.textContent = constellation_visible
    ? "Bias constellation: on"
    : "Bias constellation: off";
});
document.body.appendChild(constellation_button);
