# Reply to Loredana — Flow Immersive integration verdict

**Status:** DRAFT. Alex review before send.
**Suggested send time:** 2026-06-17 evening or 2026-06-18 morning
**Subject:** Re: Flow DataViz on XReal Smartglasses with AI
**To:** loredana.levitchi@[domain]
**CC:** none (peer-to-peer)

---

Hi Loredana,

Thank you for sending the Flow Immersive write-up and the Version2 proposal — both useful. I spent the afternoon doing a structured technical evaluation against the four obvious integration architectures, and I want to be honest about what I found before we commit either of us to a path.

**Verified facts from docs.flow.gl FAQ (retrieved today):**

- Flow exposes exactly one public API — the Dataset API. The FAQ states verbatim: *"The Dataset API is the only API at this time. No business or administrative functionality is accessible through APIs."*
- Data ingestion is push-only, batch-per-call. No WebSocket, no SSE.
- Scene customization is template parameters in the no-code Editor. There is no documented Object3D / custom-shader hook to inject our council verdict podiums into a Flow scene.
- Supported headsets listed: Quest 2, Quest Pro, HoloLens 2, Magic Leap 2, Pico. Quest 3 / Quest 3S are not certified (they inherit generic WebXR support).
- Flow scenes run inside web.flow.gl as SaaS. There is no documented standalone `.html` export — the "Contained Web File" button on docs.flow.gl is BookStack's documentation-page exporter, not a Flow scene exporter.

**The 4 architectures I scored:**

1. *Flow as host scene with ECC embedded.* Infeasible without Flow shipping custom developer hooks. Editor is not Object3D-extensible.
2. *ECC as host scene with Flow embedded.* Best you can do is `<iframe src="web.flow.gl/...">` floating in WebXR, which breaks immersion and cannot share the XR session.
3. *Side-by-side switchable.* Trivial (4-8h) but gives nothing two browser tabs cannot.
4. *Headless / presentation tool.* Use Flow purely as a one-off output medium for the ICAIF demo video, the Katz faculty deck, and any regulator-facing executive flyovers. ECC's WebXR stays the runtime.

**Recommendation: Architecture 4 (presentation layer, not runtime component).**

The reason is methodological. Adopting Flow at runtime weakens our IEEE submission — reviewers will ask why a banking-compliance contribution depends on a 2-person SaaS vendor with one undocumented API. Adopting Flow as the presentation layer for the demo video strengthens it — it shows production-grade visual rigor without claiming Flow as a system component. The framing in the paper would be: *"We used Flow Immersive for executive presentation rendering; the runtime is independent WebXR."* That is defensible to reviewers and to the Katz committee.

**Two questions for Jason Marsh that decide it.** If you have a call scheduled, these are the two:

1. *Can a finished Flow scene be exported as a self-contained `.html` bundle that runs on Vercel without a flow.gl account or runtime license check — yes or no?* If yes, Architecture 4 is viable as a deliverable artifact at academic pricing. If no, Architecture 4 collapses to "we pay $1.5K-5K/yr for a hosted URL we link to from the paper," which is hard to justify.
2. *Does the Dataset API support push frequencies under 5 seconds, and what is the documented hard floor?* This confirms or kills any future upgrade path to runtime integration.

**The backup plan I am building in parallel.** Today I am sketching a small `DataPanel` primitive in the ECC trading-quest app — a Three.js textured-plane that renders our council verdict history as a chart inside the existing WebXR scene. The initial implementation is Canvas 2D into a `CanvasTexture` (zero extra dependencies), with a future swap path to Apache ECharts-GL (MIT, 60K stars, Baidu-backed) if we want polished 3D bars / globe / heatmap. This means: even if Flow says no to both questions above, we have a path to ship the visual storytelling layer ourselves with no vendor lock-in. Commit will be pushed tonight under `apps/trading-quest/src/data-panel.ts`.

**On the joint Dr. NGO Orallexa XR project.** The proposal you sent (Version2_Final) is excellent — the perception layer (YOLO-World + SAM2 + Depth Anything V2), the world model layer (financial digital twins), and the multi-agent reasoning layer (Bull / Bear / Judge / Critic / Auditor) line up cleanly with what I've already shipped in ECC's `packages/council-voices/` (5 trading + 5 banking) and `packages/council-runner/` (Promise.all fan-out + weighted aggregation). Where I want to make sure we are aligned: the ECC banking-quest I scaffolded last week uses Credit Fundamentals / Risk Officer / Fair Lending / Customer Advocate / Macro Contrarian voices for the regulated lending compliance angle (ECOA / Reg B). Your XR proposal uses Bull / Bear / Judge / Critic / Auditor for the spatial trading-floor angle. Are these two distinct deliverables (XR class = Orallexa XR app with your 5 voices, IEEE paper = ECC banking-quest with the 5 banking voices), or do you want to consolidate? Whichever you prefer, I can have the right voices wired before our next sync.

**One more useful pointer.** The proposal's Risk Intelligence Layer references the same primitives I have stubbed in `packages/orallexa-risk/` (VaR / ES / factor exposures / beta / concentration / sector exposure / correlation, 11/11 pytest green on the v0 textbook implementations). When you have the BR-document source for Phase B, I can productionize it inside this package — same API surface, no new infrastructure work.

Thanks again — the Flow research was worth doing properly, and the answer is more nuanced than a flat yes or no.

Alex

---

## Reviewer notes for Alex

1. Replace `[domain]` with Lora's real email.
2. The "Architecture 4" framing is the actual technical answer; the two Jason Marsh questions are real gates, not rhetorical.
3. The XR-class vs IEEE-paper voice question is the open clarification — Lora's reply will settle whether the banking-quest app should be renamed to orallexa-xr or stay as the IEEE paper deliverable.
4. The DataPanel backup POC will be pushed before this email goes out so the claim is real, not aspirational.
5. If you want this softer, cut paragraphs 6 ("recommendation") and 7 ("two questions") and just send the executive summary + the joint-project alignment question. Current draft assumes Lora is the right peer to receive the full technical verdict.
