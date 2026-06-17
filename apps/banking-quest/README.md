# banking-quest

WebXR scene for the banking vertical of the Embodied Compliance Council.

## Run

```bash
npm install              # at repo root
npm run dev:banking      # or: npm run dev --workspace apps/banking-quest
```

Open `http://localhost:5174` in a desktop browser. Drag to look around. Press SPACE to fire a synthetic loan-origination decision through the 5-voice council and chain it.

## Quest 3S

Same flow as `apps/trading-quest`, but port 5174.

## Voices

1. Credit Fundamentals (Buffett-style through-cycle credit analyst)
2. Risk Officer (PD × LGD × EAD + stress scenarios)
3. Fair Lending (ECOA / Reg B disparate-impact reviewer)
4. Customer Advocate (adverse-action transparency + plain language)
5. Macro Contrarian (regime + sector cycle + recession proxies)

See `packages/council-voices/banking/` for full system prompts.

## Status

Phase 1 scaffold. Phase 2 will wire the synthetic decision generator to actual Anthropic calls against each banking voice and replace the placeholder `aggregate_verdict` cycler with the real adjudication logic.
