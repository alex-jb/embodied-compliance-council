# LinkedIn post draft — 2026-06-17 morning velocity

**Status:** DRAFT. Alex review before posting.
**Suggested post time:** evening NY ET (peak engagement window for tech/FDE audience)
**Tone:** confident, specific, no hype. Lead with the artifact, not the time spent.

---

## Option A — research-led framing (recommended for FDE / academic search)

Just shipped two days of work to github.com/alex-jb/embodied-compliance-council — a research codebase for multi-voice AI deliberation + calibration + spatial audit in regulated finance.

The argument: production AI agents in regulated industries fail not because they're slow, but because they're confident-but-wrong with no audit trail and no per-voice calibration history. Five disagreement-by-design voices, each tool-restricted to a distinct evidence subset, give epistemic diversity. Brier-scoring each voice's verdicts against eventual outcomes tells you which voices' dissents are load-bearing and which are noise. A WebXR scene with WebCrypto hash chain makes the audit trail physical and tamper-evident.

What's live:
• 5 TypeScript + 1 Python packages, 33 tests green
• Trading vertical (5 voices) and banking vertical (5 voices) — fair-lending reviewer is ECOA / Reg B specific
• WebXR Quest 3S scenes with MediaPipe Hands gesture input (thumbs-up approve, fist block, pinch escalate)
• Node HTTP server + Vercel adapter wrap Anthropic Sonnet 4.6 per voice
• 7 risk primitives (VaR, ES, factor exposures, beta decomp, concentration, sector exposure, correlation) — Phase A v0 textbook implementations; Phase B replaces with Loredana Levitchi's BR doc

Backs a Yeshiva University Katz capstone (Prof. Michael Yang), a banking joint project (Dr. NGO + Loredana Levitchi), an ICAIF 2027 submission, and an IEEE banking journal paper.

MIT licensed. Architecture and 10 voice prompts in the repo if regulated-AI compliance is your space.

---

## Option B — velocity framing (better for engineering peer audience)

Two days, 19 commits, 5 packages, 33/33 tests, 1 RFP submission packet, 1 working WebXR demo on Meta Quest 3S.

Open-source: github.com/alex-jb/embodied-compliance-council

Five-voice AI deliberation + calibration discipline + spatial audit for regulated finance. WebXR scenes with MediaPipe hand-tracking gesture input + WebCrypto hash-chain audit, plus a Node orchestrator that fans a proposed action out to Anthropic Sonnet 4.6 per voice. Banks the trading-vertical capstone (Prof. Michael Yang, Yeshiva University Katz) and a banking-vertical Dr. NGO joint project.

Each voice is tool-restricted to a distinct evidence subset — that's what gives the council epistemic diversity instead of collapsing to the foundation model's default opinion. Brier-scoring each voice against eventual outcomes tells you which dissents were load-bearing.

Architecture, voice prompts, and the 33 tests are all in the repo. MIT.

---

## Option C — hook on regulatory framing (highest reach for compliance audience)

The EU AI Act Article 14 needs "effective human oversight" of high-risk AI decisions. ECOA / Reg B needs auditable fair-lending decisions in banking. Both call for what most agent stacks don't have: per-voice calibration history, tamper-evident audit trail, and a UX that lets a human actually inspect what each voice said.

Spent two days building one: github.com/alex-jb/embodied-compliance-council

Five voices tool-restricted to distinct evidence subsets so they disagree by design. Brier-scoring each voice's verdicts over time. WebCrypto SHA-256 hash chain on every adjudication. WebXR scene on Meta Quest 3S where a human walks among five spatial podiums of voices and verdicts an action by gesture — thumbs-up approve, fist block, pinch escalate.

Trading vertical and banking vertical (with a fair-lending reviewer voice that explicitly cites ECOA / Reg B sections). MIT licensed. Backs an ICAIF 2027 paper, an IEEE banking paper, and a YU Katz capstone.

If "calibration as audit primitive" is a category you care about, the repo + 10 voice system prompts + 7 risk primitives + spatial scaffold are all in one place.

---

## Reviewer notes for Alex

- Option A is best for FDE / academic audiences (Palantir, Anthropic, Two Sigma, DRW recruiters who track GitHub).
- Option B is best for engineering peers.
- Option C is best if you want compliance buyers / regulated-AI thinkers (Norm AI / Hadrius / Cekura ecosystem) seeing it.
- Pick ONE. Multiple posts in one day on the same topic dilutes signal.
- Repo URL once. Don't link to specific commits or files in the post body.
- Posting time: 17:00-19:00 ET on a weekday for FDE recruiters; 09:00-11:00 ET if targeting Asia-Pacific compliance.
- Hashtags optional. If you use them: `#AISafety #RegTech #Anthropic #WebXR`. Skip if you want it to read more researcher-y.
