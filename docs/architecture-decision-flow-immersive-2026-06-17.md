# ADR: Flow Immersive integration scope

**Date:** 2026-06-17
**Status:** Decided pending two clarifying questions to Jason Marsh (Flow Immersive CEO)
**Authors:** Alex Ji (with Loredana Levitchi input via 2026-06-17 email + "Project Proposal Version2_Final.pdf")
**Supersedes:** none

## Decision

Adopt **Architecture D: Headless / presentation tool** as the integration mode for Flow Immersive. Reject Architectures A (Flow host + ECC embed), B (ECC host + Flow embed), and C (side-by-side switchable).

## Why

Flow Immersive's documented public API surface cannot host the ECC runtime, and the ECC runtime cannot host Flow scenes without breaking XR session immersion.

Verbatim facts from `docs.flow.gl/books/flow-documentation/page/faq` (retrieved 2026-06-17):

- *"The Dataset API is the only API at this time. No business or administrative functionality is accessible through APIs."*
- *"The Dataset API expects a single dataset per call... we don't expect huge datasets to be sent to the client."* (No WebSocket / SSE / sub-5s push primitive documented.)
- *"Flow data story presentations are infinitely customizable by users of Flow. The UI used in the Flow Editor to generate Flows is not customizable at this time."* ("Infinitely customizable" = template parameters in the no-code Editor. No documented Object3D / shader / mesh injection hook.)
- Supported headsets listed: Quest 2, Quest Pro, HoloLens 2, Magic Leap 2, Pico. Quest 3 / 3S not certified.
- Flow scenes run as SaaS at web.flow.gl. The "Contained Web File .html" button on docs.flow.gl is BookStack's documentation-page exporter, not a Flow scene exporter.
- Funding: $100K total. Two named principals (Jason Marsh CEO, DiBenigno Head of Business). 6-month major release cadence.

## Architecture scoring

Higher = better, except vendor-lock-in column where higher = worse.

| Arch | Feasibility | Time to integrate | Maintenance | Flow's unique value | Vendor lock-in |
|---|---|---|---|---|---|
| A — Flow host, ECC embed | 1 | 80-200h + Flow eng partnership | 5 | 3 | 5 |
| B — ECC host, Flow embed | 2 | 20-40h iframe | 3 | 2 | 4 |
| C — Side-by-side switchable | 5 | 4-8h | 1 | 2 | 2 |
| **D — Headless presentation** | **5** | **2-4h per deliverable** | **1** | **4** | **1** |

## Two questions to Jason Marsh that finalize the GO

1. *Can a finished Flow scene be exported as a self-contained `.html` bundle that runs on Vercel without a flow.gl account or runtime license check — yes or no?* YES → D viable. NO → D collapses to "$1.5K-5K/yr for a hosted URL we link to from the IEEE paper," recommend walk-away.
2. *Does the Dataset API support push frequencies under 5 seconds, and what is the documented hard floor?* Kills any future upgrade path to runtime integration.

## Backup plan (Architecture E — internal)

Apache ECharts-GL (MIT, 60K+ stars, Baidu-backed) renders polished 3D bars / globe / heatmap / time-series. Pattern: render ECharts-GL into a hidden `<canvas>`, use as Three.js `CanvasTexture` on a plane mesh inside the existing ECC XR scene. Zero vendor lock-in.

POC committed today: `apps/trading-quest/src/data-panel.ts` — Canvas 2D primitive that renders the verdict chain as a textured plane in the trading-quest WebXR scene. Future swap path to ECharts-GL is a 1-day port (same `CanvasTexture` interface, swap the renderer).

## IEEE paper framing

Adopting Flow at runtime weakens the methodology section. Reviewers will ask why a banking-compliance contribution depends on a 2-person SaaS vendor with one undocumented API.

Adopting Flow as the presentation layer for the ICAIF 2027 demo video strengthens it. The paragraph reads: *"We used Flow Immersive for executive presentation rendering of audit-trail summaries; the council runtime is an independent WebXR application backed by the Anthropic API."*

## What does NOT change

- ECC `packages/council-runner/` Promise.all fan-out + weighted aggregation stays the runtime
- WebCrypto SHA-256 hash chain audit stays the tamper-evident record
- `packages/council-voices/` 10 system prompts unchanged
- `packages/orallexa-risk/` Phase B integration path unchanged
- Three.js + WebXR + MediaPipe Hands + XR Hand API stays the spatial gating UX

## Open downstream decisions (not part of this ADR)

- Orallexa XR vs ECC banking-quest naming alignment — pending Lora's reply on whether her XR-class deliverable shares the 5 banking voices or uses the Bull/Bear/Judge/Critic/Auditor set she proposed in Version2_Final.
- Perception Layer scope (YOLO-World + SAM2 + Depth Anything V2) — XR class deliverable per Version2_Final but not yet built in ECC.

## References

- docs.flow.gl FAQ + API docs (retrieved 2026-06-17)
- Crunchbase Flow Immersive funding profile
- "Project Proposal Version2_Final.pdf" (Loredana Levitchi, June 2026)
- WebXR Hands — Meta Horizon OS docs
