import * as THREE from "three";
import { buildScene } from "./scene.js";
import { AuditPanel } from "./audit-panel.js";
import {
  append_entry,
  semicircle_layout,
  type ChainEntry,
  type CouncilDecision,
} from "@embodied-compliance/spatial-gating-protocol";

const VERTICAL = "banking" as const;

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

renderer.setAnimationLoop(() => {
  camera.rotation.order = "YXZ";
  camera.rotation.y = yaw;
  camera.rotation.x = pitch;
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

async function fire_synthetic_decision() {
  const decision: CouncilDecision = {
    decision_id: `loan_${chain.length + 1}`,
    vertical: VERTICAL,
    proposed_action: "ORIGINATE $750K CRE loan, 7yr amort",
    aggregate_verdict: ["approve", "decline", "escalate"][chain.length % 3] as
      | "approve"
      | "decline"
      | "escalate",
    timestamp_iso: new Date().toISOString(),
    verdicts: semicircle_layout(VERTICAL).map((p) => ({
      voice_id: p.voice_id,
      verdict: "approve",
      rationale_short: `${p.voice_id} synthetic`,
      primary_concern: "demo entry",
      raw_json: {},
    })),
  };
  const entry = await append_entry(chain, decision);
  chain.push(entry);
  audit_panel.render(chain);
}

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    void fire_synthetic_decision();
  }
});
