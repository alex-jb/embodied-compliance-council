import * as THREE from "three";
import type { ChainEntry } from "@embodied-compliance/spatial-gating-protocol";

const PANEL_WIDTH_M = 1.6;
const PANEL_HEIGHT_M = 0.9;
const CANVAS_W = 1024;
const CANVAS_H = 576;

const VERDICT_COLORS: Record<string, string> = {
  approve: "#34d399",
  block: "#f87171",
  escalate: "#fbbf24",
};

export class DataPanel {
  readonly mesh: THREE.Mesh;
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly texture: THREE.CanvasTexture;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = CANVAS_W;
    this.canvas.height = CANVAS_H;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("DataPanel: 2D context unavailable");
    this.ctx = ctx;

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;

    const geometry = new THREE.PlaneGeometry(PANEL_WIDTH_M, PANEL_HEIGHT_M);
    const material = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, 2.4, -3.2);

    this.renderEmpty();
  }

  update(chain: ChainEntry[]): void {
    if (chain.length === 0) {
      this.renderEmpty();
    } else {
      this.renderChain(chain);
    }
    this.texture.needsUpdate = true;
  }

  private renderEmpty(): void {
    const { ctx } = this;
    ctx.fillStyle = "rgba(6, 8, 12, 0.92)";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.strokeStyle = "#1f2937";
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, CANVAS_W - 16, CANVAS_H - 16);

    ctx.fillStyle = "#e5e7eb";
    ctx.font = "bold 36px system-ui, sans-serif";
    ctx.fillText("Verdict Stream", 32, 64);

    ctx.fillStyle = "#9ca3af";
    ctx.font = "20px system-ui, sans-serif";
    ctx.fillText("Awaiting first decision...", 32, 104);

    ctx.fillStyle = "#6b7280";
    ctx.font = "16px system-ui, sans-serif";
    ctx.fillText("(Canvas2D backup primitive — swap path to ECharts-GL CanvasTexture or three-globe)", 32, CANVAS_H - 32);
  }

  private renderChain(chain: ChainEntry[]): void {
    const { ctx } = this;
    ctx.fillStyle = "rgba(6, 8, 12, 0.92)";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.strokeStyle = "#1f2937";
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, CANVAS_W - 16, CANVAS_H - 16);

    ctx.fillStyle = "#e5e7eb";
    ctx.font = "bold 36px system-ui, sans-serif";
    ctx.fillText("Verdict Stream", 32, 64);
    ctx.fillStyle = "#9ca3af";
    ctx.font = "18px system-ui, sans-serif";
    ctx.fillText(`n=${chain.length} · tamper-evident chain`, 32, 90);

    const counts = { approve: 0, block: 0, escalate: 0 };
    for (const entry of chain) {
      const v = entry.decision.aggregate_verdict;
      if (v in counts) counts[v as keyof typeof counts] += 1;
    }

    const bar_x = 32;
    const bar_y = 140;
    const bar_w = CANVAS_W - 64;
    const bar_h = 80;
    const total = chain.length;

    let offset = 0;
    for (const verdict of ["approve", "block", "escalate"] as const) {
      const w = (counts[verdict] / total) * bar_w;
      ctx.fillStyle = VERDICT_COLORS[verdict];
      ctx.fillRect(bar_x + offset, bar_y, w, bar_h);
      offset += w;
    }

    ctx.font = "20px system-ui, sans-serif";
    let label_x = 32;
    for (const verdict of ["approve", "block", "escalate"] as const) {
      ctx.fillStyle = VERDICT_COLORS[verdict];
      ctx.fillRect(label_x, bar_y + bar_h + 24, 16, 16);
      ctx.fillStyle = "#e5e7eb";
      ctx.fillText(`${verdict}: ${counts[verdict]}`, label_x + 24, bar_y + bar_h + 39);
      label_x += 200;
    }

    ctx.fillStyle = "#e5e7eb";
    ctx.font = "bold 22px system-ui, sans-serif";
    ctx.fillText("Recent decisions", 32, 320);

    const recent = chain.slice(-5).reverse();
    let row_y = 354;
    ctx.font = "16px ui-monospace, monospace";
    for (const entry of recent) {
      const verdict = entry.decision.aggregate_verdict;
      ctx.fillStyle = VERDICT_COLORS[verdict] ?? "#9ca3af";
      ctx.fillRect(32, row_y - 14, 12, 12);
      ctx.fillStyle = "#e5e7eb";
      const action = entry.decision.proposed_action.slice(0, 42);
      const stamp = entry.decision.timestamp_iso.slice(11, 19);
      ctx.fillText(`${stamp}  ${verdict.padEnd(10)}  ${action}`, 52, row_y);
      row_y += 26;
    }

    ctx.fillStyle = "#6b7280";
    ctx.font = "14px system-ui, sans-serif";
    ctx.fillText("Canvas2D backup primitive · swap-ready for ECharts-GL or three-globe", 32, CANVAS_H - 20);
  }
}
