# trading-quest

WebXR scene for the trading vertical of the Embodied Compliance Council.

## Run

```bash
npm install              # at repo root
npm run dev:trading      # or: npm run dev --workspace apps/trading-quest
```

Open `http://localhost:5173` in a desktop browser (drag to look, press SPACE to fire a synthetic council decision).

## Quest 3S

1. Run `npm run build && npm run preview -- --host 0.0.0.0` from `apps/trading-quest/`.
2. From the Quest 3S browser, open `https://<dev-machine-ip>:5173` (you need an HTTPS reverse proxy or a self-signed cert — WebXR requires secure context).
3. Tap "Enter VR" in the bottom-left HUD.
4. You will be placed at the council semicircle, with the 5 trading voices arranged in front of you.

## Architecture

- Three.js scene with one podium per voice (`packages/spatial-gating-protocol/src/voice-layouts.ts` computes the semicircle).
- Hash-chain audit panel in the bottom-right uses `append_entry` / `verify_chain` from the shared protocol — every decision chains via WebCrypto SHA-256.
- WebXR session is optional; the scene also works in a plain browser for development.

## Status

Phase 1 scaffold. Phase 2 will wire MediaPipe Hands for spatial verdict gestures and connect the audit panel to live council outputs.
