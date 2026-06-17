# Deployment

The `council-runner` HTTP handler ships as both a local Node server (for development) and a Vercel function (for production). This file documents the production path.

## Vercel — one-shot deployment

```bash
# from repo root
npm install -g vercel              # if not already installed
vercel login                       # one-time browser auth
vercel link                        # link to a Vercel project (creates if new)
vercel env add ANTHROPIC_API_KEY   # paste your sk-ant-... key, scope=Production+Preview+Development
vercel deploy --prod               # ships to a public URL
```

After the first `vercel deploy --prod`, the endpoint is at:

```
https://<your-project>.vercel.app/api/deliberate
```

POST a JSON body to that URL:

```json
{
  "vertical": "trading",
  "proposed_action": "BUY 10 NVDA",
  "provider": "anthropic"
}
```

The function streams back a `DeliberationOutput` JSON containing 5 voice verdicts + the aggregate. The `apps/{trading,banking}-quest` WebXR scenes can swap their `COUNCIL_SERVER_URL` constant from `http://localhost:3030/api/deliberate` to the deployed Vercel URL to read real Anthropic verdicts in the browser.

## Cost ceiling

Each `/api/deliberate` invocation issues 5 parallel Anthropic Sonnet 4.6 calls. Approximate cost:

- ~1,200 input tokens × 5 voices × $3/M = $0.018
- ~400 output tokens × 5 voices × $15/M = $0.030
- **Per-decision cost ≈ $0.05** at default settings.

At 100 decisions/day, that is ~$5/day in Anthropic spend on top of Vercel's compute (free tier comfortably covers it). Set a hard limit in the Anthropic dashboard before shipping the public URL.

## CORS

`vercel-handler.ts` sets `Access-Control-Allow-Origin: *` so the WebXR apps deployed elsewhere (or running on `localhost:5173/5174` in dev) can fetch directly. Tighten this when the surface stops being a research prototype.

## Local development is unchanged

```bash
npm run council:server             # http://localhost:3030
```

The local server uses the same `handle_deliberation()` function the Vercel handler wraps. There is no production-only path; what you test locally is exactly what runs in the cloud.
