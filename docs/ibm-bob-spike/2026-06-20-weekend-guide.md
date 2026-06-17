# IBM Bob hello-world spike — weekend execution guide

**When:** 2026-06-20 (Saturday) morning, 4-hour focused block
**Purpose:** Validate three GO/NO-GO conditions before committing to the IBM AI Builders Challenge weekend build. Outcome of this spike decides whether Alex enters the July 31 monthly competition.

---

## Pre-spike (Friday evening, 15 min)

- [ ] Open browser tab: https://bob.ibm.com/pricing — confirm 40 free Bobcoins on trial (no card)
- [ ] Open browser tab: https://bob.ibm.com/docs — bookmark for reference during the spike
- [ ] Open `~/Desktop/capstone-orallexa-calibration/src/calibration/` — locate the existing temperature scaling + ECE module that will be the math foundation
- [ ] Confirm YU enrollment recognized by BeMyApp: visit https://aibuilderschallenge-bob.bemyapp.com/ and check the registration form — does it accept `xji1@mail.yu.edu` without rejection? If rejected, the entire track is dead before the spike starts.

## Spike — 4 hours

### Hour 1: Bob signup + IDE install + hello-world (60 min budget)

- [ ] Sign up at bob.ibm.com, claim 40 free Bobcoins
- [ ] Install the IBM Bob IDE extension (VS Code or JetBrains, whichever you use)
- [ ] Run the documented hello-world: have Bob write a small Python function and observe the output
- [ ] **Decision gate #1:** Does Bob expose, in the IDE response payload or via API, which underlying model (Claude / Granite / Mistral / Llama) wrote each suggestion?
  - YES → proceed to Hour 2
  - NO → calibration-per-model angle dies. Aggregate Brier still works but loses the differentiation. Note this and continue to Hour 2 with reduced scope.
  - NOT FINDABLE in 30 min → spike fails the docs-quality test; ABORT.

### Hour 2: Custom Mode + Building Blocks (60 min budget)

- [ ] Follow the Bob Modes quickstart: https://ibm-self-serve-assets.github.io/building-blocks-docs/ibm-bob/
- [ ] Write a custom mode named "Calibrator" — `mode.yaml` style — that wraps Bob's response and asks Bob's own model: "On a 0-1 scale, what is your confidence this code will pass the existing test suite?"
- [ ] **Decision gate #2:** Can the custom mode persist a structured response (confidence score + model-id + suggestion-id) to a local SQLite file?
  - YES → proceed to Hour 3
  - NO → the audit-trail angle has friction; note workaround (write to stdout, parse externally) and continue.

### Hour 3: MCP server scaffold (60 min budget)

- [ ] Follow MCP Builder + Agent Utils guide: https://alain-airom.medium.com/building-smarter-agents-a-guide-to-ibm-bobs-mcp-builder-with-agent-utils-1acedd76c3fa
- [ ] Scaffold `bob-brier-audit` MCP server — Python — that exposes a single tool: `record_suggestion(suggestion_id: str, model: str, confidence: float, outcome: bool)`. Outcome is set later when tests pass/fail.
- [ ] Wire the Calibrator custom mode to call this MCP tool every time Bob proposes code.
- [ ] **Decision gate #3:** Is the MCP server reachable from Bob, and does the tool call complete end-to-end (suggestion → confidence → SQLite row inserted)?
  - YES → ALL GO. Commit to the weekend build.
  - NO → MCP integration not mature enough. NO-GO.

### Hour 4: Verdict write-up (60 min budget)

- [ ] Write a 1-page verdict at `docs/ibm-bob-spike/2026-06-20-verdict.md` covering:
  - Which of the 3 decision gates passed
  - Estimated remaining build time if GO (was 16-20 hrs, revise after spike)
  - Any blocker risks for the weekend build
  - Final GO / NO-GO with one-line rationale

---

## What "GO" enables (the weekend build, 16-20 hours, two weekends)

If the spike result is GO, the weekend build is:

1. **Polish Calibrator custom mode** — add Kadavath-style second-order self-calibration ("Are you confident? Y/N. If Y, what's your numeric confidence?")
2. **Persist (suggestion, model, confidence, pass/fail) tuples** at scale — 50+ Bob suggestions across mixed task types (refactor, test, doc, bug fix)
3. **Compute per-model rolling Brier + ECE** — port from existing `capstone-orallexa-calibration/src/calibration/ece.py`
4. **Temperature scaling fit** — post-hoc one-parameter correction
5. **Instana / Concert dashboard** — reuse Bob's documented observability template, render "model X is overconfident by Y%" panel
6. **90-second Loom demo** — show Bob writing code → Calibrator scoring → dashboard updating → temperature scaling applied → ECE drops on hold-out

Submission target: 2026-07-31 monthly deadline.

---

## What "NO-GO" enables (redirect those 16-20 hours)

If the spike result is NO-GO, those hours are better spent on:

- **Phase 2.5 MediaPipe Hands** in the Embodied Compliance Council (capstone main line, immediate ROI)
- **Lora's risk-math integration** into `orallexa-risk` (if she has shared code by then)
- **Pokémon TCG Sim spike** (the other open weekend question)

Do not chase the IBM cash if the gates fail. EV was already low ($50-70/submission); only the resume bullet and the Calibrator pattern justified it. Without working integration, neither materializes.

---

## Bobcoin budget plan

- 40 free Bobcoins on the trial. Each Bob suggestion costs 1-3 coins depending on context size.
- Hour-1 hello-world: 5-10 coins.
- Hour-2 Custom Mode iteration: 10-15 coins (multiple test prompts).
- Hour-3 MCP server: 5-10 coins.
- Buffer: 5-10 coins.
- Total spike budget: ~30-40 coins, within trial allowance.
- If Bob runs out of trial coins mid-spike → buy $20 Pro Base, continue.
