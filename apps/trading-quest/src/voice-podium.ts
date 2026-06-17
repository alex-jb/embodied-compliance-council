import * as THREE from "three";
import type { VoicePodium } from "@embodied-compliance/spatial-gating-protocol";

export function build_podium(podium: VoicePodium, tint: number): THREE.Group {
  const group = new THREE.Group();
  group.position.set(podium.position.x, podium.position.y, podium.position.z);
  group.rotation.y = podium.rotation_y_rad;

  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 0.55, 0.9, 32),
    new THREE.MeshStandardMaterial({ color: 0x1a2233, roughness: 0.7, metalness: 0.4 })
  );
  base.position.y = 0.45;
  group.add(base);

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(0.55, 0.03, 16, 64),
    new THREE.MeshBasicMaterial({ color: tint })
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.y = 0.92;
  group.add(halo);

  const label_canvas = document.createElement("canvas");
  label_canvas.width = 512;
  label_canvas.height = 128;
  const ctx = label_canvas.getContext("2d")!;
  ctx.fillStyle = `#${tint.toString(16).padStart(6, "0")}`;
  ctx.font = "bold 64px ui-monospace, Menlo, monospace";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(podium.voice_id.toUpperCase(), 256, 64);
  const texture = new THREE.CanvasTexture(label_canvas);
  const label = new THREE.Mesh(
    new THREE.PlaneGeometry(1.4, 0.35),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true })
  );
  label.position.y = 1.4;
  group.add(label);

  return group;
}
