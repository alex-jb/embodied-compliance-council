# Email to Loredana — risk module handoff for orallexa-risk Phase B

**Status:** DRAFT. Alex review before send.
**Suggested send time:** 2026-06-17 morning (Tuesday)
**Subject:** Banking proposal v2 + next step on the risk module
**To:** loredana.levitchi@[domain]
**CC:** none (or Dr. NGO if you want her in the loop on coordination)

---

Hi Loredana,

Quick update + one ask.

**Status on the joint Dr. NGO project:**
- Proposal v2 is finalized (PDF in shared folder: `docs/dr-ngo-final/proposal-v2.pdf`). It positions the work as the Embodied Compliance Council for loan origination + wealth advisory, ECOA / Reg B framing, with the spatial / XR layer as Year 2.
- I scaffolded the public monorepo at github.com/alex-jb/embodied-compliance-council. The Python package `orallexa-risk` has 7 risk primitives (`var`, `expected_shortfall`, `factor_exposures`, `beta_decomposition`, `concentration`, `sector_exposure`, `correlation`) with Pydantic input/output schemas + Anthropic tool schemas already wired. Each one currently raises `NotImplementedError` — they are stubs waiting for the real math.
- I also wrote 10 council-voice system prompts (5 trading + 5 banking, including credit fundamentals / risk officer / fair lending / customer advocate / macro contrarian) that consume these risk primitives via tool restrictions. Pushed tonight, commit `27370a2`.

**The ask:**
When you have the bandwidth, could you share your Python implementations of the risk math from the 120-page BR doc? Specifically the modules that map to:
- VaR (historical / parametric / Monte Carlo — whichever you have)
- Expected Shortfall (CVaR)
- Factor exposures (Fama-French or equivalent)
- Beta decomposition (market vs sector vs idiosyncratic)
- Default probability + LGD models (for the banking-side voices)

I will handle the Python packaging, the test suite, and CI on the orallexa-risk side — you stay focused on the math. My target is 9-14 days from when you share to a fully wired + tested Phase B merge, with attribution on the IEEE paper as co-author on the risk math sections.

**Format that works for me:** a GitHub PR against `embodied-compliance-council` (you have write access), a tarball, or even a Jupyter notebook — whichever is fastest for you. Code does not need to be polished — I will productionize.

**Timeline check:** I am targeting the proposal v2 final submission to Dr. NGO by [check syllabus deadline]. The IEEE paper draft can come after that. Does that work on your side?

**Related — Katz Faculty Research Initiative.** Paul Russo (Vice Provost / Dean, Katz) issued an RFP June 12 for an AY 2026-2027 faculty research seed grant (applications due August 15, $1K–$4K range). The priority areas — AI, Data Analytics, World Models — fit the Embodied Compliance Council project almost too well. I'm preparing a submission with Dr. NGO as primary PI on the banking vertical (since she has the institutional standing at Katz to be PI). I'd like to name you as the external risk-math collaborator and IEEE-paper co-author on the proposal — no commitment from your side beyond what we're already discussing here, but it strengthens the proposal substantially. If you're comfortable, I'd just need a 100-word bio for the appendix. I'll forward the full draft (cover page + 2-page narrative + budget + bios — all PDF) once Dr. NGO confirms she's willing to be PI. No action needed from you right now, just flagging the timeline.

Thanks again for being on this — the joint framing makes both the academic and the technical contribution stronger.

Alex

---

## Reviewer notes for Alex

1. Replace `[domain]` with Lora's real email.
2. Replace `[check syllabus deadline]` with the Dr. NGO syllabus deadline (or the one on the proposal v2).
3. If Dr. NGO wants visibility, CC her — but maybe better to keep this a peer-to-peer ask first.
4. Send Tuesday morning so Lora has the work week to respond, not weekend pressure.
5. The "9-14 days from share to merge" commits you to a deliverable timeline — keep this only if you want it locked.
