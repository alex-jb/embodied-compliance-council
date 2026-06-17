import * as THREE from "three";
import type { ChainEntry } from "@embodied-compliance/spatial-gating-protocol";

const VERDICT_COLORS: Record<string, number> = {
  approve: 0x34d399,
  block: 0xf87171,
  escalate: 0xfbbf24,
};

const RING_RADIUS_M = 2.4;
const SHELL_THICKNESS_M = 0.6;
const POINT_RADIUS_M = 0.05;

export class BiasConstellation {
  readonly group: THREE.Group;
  private readonly anchor: THREE.Mesh;
  private points: THREE.Mesh[] = [];

  constructor() {
    this.group = new THREE.Group();
    this.group.position.set(-3.4, 1.6, -1.6);

    const anchor_geom = new THREE.TorusGeometry(RING_RADIUS_M, 0.015, 8, 64);
    const anchor_mat = new THREE.MeshBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.6 });
    this.anchor = new THREE.Mesh(anchor_geom, anchor_mat);
    this.anchor.rotation.x = Math.PI / 2;
    this.group.add(this.anchor);

    const axis_mat = new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.4 });
    for (const axis of [
      [new THREE.Vector3(-RING_RADIUS_M, 0, 0), new THREE.Vector3(RING_RADIUS_M, 0, 0)],
      [new THREE.Vector3(0, -RING_RADIUS_M, 0), new THREE.Vector3(0, RING_RADIUS_M, 0)],
      [new THREE.Vector3(0, 0, -RING_RADIUS_M), new THREE.Vector3(0, 0, RING_RADIUS_M)],
    ]) {
      const geo = new THREE.BufferGeometry().setFromPoints(axis);
      this.group.add(new THREE.Line(geo, axis_mat));
    }

    this.group.visible = false;
  }

  set_visible(visible: boolean): void {
    this.group.visible = visible;
  }

  update(chain: ChainEntry[]): void {
    for (const p of this.points) {
      this.group.remove(p);
      p.geometry.dispose();
      (p.material as THREE.Material).dispose();
    }
    this.points = [];

    if (chain.length === 0) return;

    const N = chain.length;
    for (let i = 0; i < N; i++) {
      const entry = chain[i];
      const verdict = entry.decision.aggregate_verdict;
      const color = VERDICT_COLORS[verdict] ?? 0x9ca3af;
      const agreement = compute_agreement(entry);
      const recency = N === 1 ? 1.0 : (i + 1) / N;

      const position = project_to_constellation(verdict, agreement, recency);
      const point = new THREE.Mesh(
        new THREE.SphereGeometry(POINT_RADIUS_M, 12, 12),
        new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity: 0.55,
          roughness: 0.35,
        })
      );
      point.position.copy(position);
      this.group.add(point);
      this.points.push(point);
    }
  }
}

function compute_agreement(entry: ChainEntry): number {
  const verdicts = entry.decision.verdicts;
  if (verdicts.length === 0) return 0.5;
  const counts: Record<string, number> = {};
  for (const v of verdicts) {
    counts[v.verdict] = (counts[v.verdict] ?? 0) + 1;
  }
  const max_count = Math.max(...Object.values(counts));
  return max_count / verdicts.length;
}

function project_to_constellation(
  verdict: string,
  agreement: number,
  recency: number
): THREE.Vector3 {
  const verdict_angle: Record<string, number> = {
    approve: 0,
    block: (2 * Math.PI) / 3,
    escalate: (4 * Math.PI) / 3,
  };
  const base_theta = verdict_angle[verdict] ?? 0;

  const scatter = (1 - agreement) * 0.9;
  const theta = base_theta + (Math.random() - 0.5) * scatter;

  const r = RING_RADIUS_M - SHELL_THICKNESS_M * (1 - recency);
  const x = r * Math.cos(theta);
  const z = r * Math.sin(theta);

  const y = (recency - 0.5) * 1.2;

  return new THREE.Vector3(x, y, z);
}
