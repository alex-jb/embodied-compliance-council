import * as THREE from "three";
import type { Vertical, VoicePodium } from "@embodied-compliance/spatial-gating-protocol";
import { build_podium } from "./voice-podium.js";

const VERTICAL_TINT: Record<Vertical, number> = {
  trading: 0x7dd3fc,
  banking: 0xfbbf24,
};

export function buildScene(vertical: Vertical, podiums: VoicePodium[]): THREE.Scene {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x06080c);
  scene.fog = new THREE.Fog(0x06080c, 8, 25);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(8, 64),
    new THREE.MeshStandardMaterial({ color: 0x101521, roughness: 0.9, metalness: 0.1 })
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const grid = new THREE.GridHelper(16, 32, 0x1f2937, 0x111827);
  scene.add(grid);

  const ambient = new THREE.AmbientLight(0xffffff, 0.25);
  scene.add(ambient);

  const accent = new THREE.PointLight(VERTICAL_TINT[vertical], 4, 12, 1.5);
  accent.position.set(0, 3.5, 0);
  scene.add(accent);

  for (const podium of podiums) {
    const mesh = build_podium(podium, VERTICAL_TINT[vertical]);
    scene.add(mesh);
  }

  return scene;
}
