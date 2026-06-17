import type { ChainEntry } from "@embodied-compliance/spatial-gating-protocol";

export class AuditPanel {
  constructor(private readonly root: HTMLElement) {}

  render(chain: ChainEntry[]): void {
    if (chain.length === 0) {
      this.root.textContent = "no decisions yet — press space";
      return;
    }
    const html = chain
      .slice(-10)
      .reverse()
      .map((entry) => {
        const v = entry.decision.aggregate_verdict;
        return `<div class="entry">
          <div><b>#${entry.index}</b> ${entry.decision.decision_id} • <span class="verdict-${v}">${v.toUpperCase()}</span></div>
          <div style="color:#cbd5e1;">${entry.decision.proposed_action}</div>
          <div class="hash">${entry.hash_hex.slice(0, 32)}…</div>
        </div>`;
      })
      .join("");
    this.root.innerHTML = html;
  }
}
