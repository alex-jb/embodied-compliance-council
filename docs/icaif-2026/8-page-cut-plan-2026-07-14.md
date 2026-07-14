# ICAIF 2026 · 8-page cut plan (v0.5 skeleton → submission)

**Target:** 7.5 pages in ACM sigconf 2-column format. **Hard limit: 8 pages.** Over = desk-reject.

**Current state:** skeleton v0.5 = 294 lines markdown ≈ 2,940 words ≈ ~5.5 pages of body copy + ~1 page references = **~6.5 pages**. Under target but skeleton is telegraphed; real prose expansion will inflate.

**Rule of thumb** for sigconf 8pt double-column: **~550 words/page** for body copy, **~800 words/page** for references.

---

## Per-section word budget

| Section | Target lines | Target words | Actionable |
|---|---:|---:|---|
| Abstract | 20 | **180** | KEEP exact — camera-ready |
| §1 Introduction | 55 | **550-800** | 1 page. Cut motivating anecdote if over |
| §2 Related Work | 45 | **550-650** | 1 page. Cut Wang GAICF + Kurshan paragraph in half if over (from 200 → 100 words combined) |
| §3 Framework | 90 | **1000-1200** | 2 pages. THE core. Do NOT cut. Grow to 2.2 if needed by borrowing from §4 |
| §4 Reference impls | 55 | **700-800** | 1.5 pages. §4.1 Shadow keep at 350 words, §4.2 Orallexa cut to 200 (currently 210 — fine), §4.3 cross-impl invariants cut to 150 words |
| §5 Evaluation | 65 | **900-1000** | 1.5 pages. §5.1 datasets tight, §5.2 metrics tight, §5.3 results is the pages that MUST have real numbers by 7/25 |
| §6 Discussion | 40 | **450-550** | 0.5-0.75 page. **Aggressive cut candidate** — see below |
| §7 Conclusion | 15 | **150-200** | 0.25 page |
| References | 40 | **500-800** | Fits ~35 refs at ACM sigconf |
| **Total** | **425** | **~4,700** | **~7.5 pages** ✓ |

---

## The 4 cut-safe sections (do NOT touch anything else)

### Cut 1 · §6 Discussion — targeted at 450-550 words

Current §6 skeleton has 5 subsections (6.1-6.5). Cut to 3:

- **KEEP:** §6.1 Threat model (what Shadow does NOT defend against — honesty as procurement signal)
- **KEEP:** §6.2 Limitations of the 200-decision synthetic dataset — turn into positioning claim per Agent D
- **KEEP:** §6.3 Future work as ONE paragraph, 3 bullets max: (a) larger-scale bank-private dataset evaluation, (b) formal-methods binding of iff-gate logic, (c) IEEE VR 2027 spatial audit companion paper
- **CUT:** §6.4 (whatever it is) — move to Related Work or drop
- **CUT:** §6.5 — same

**Save:** ~200 words.

### Cut 2 · §4.3 Cross-implementation invariants — cut from ~250 to 150 words

Current bullet list has 5 items. Cut to 3 sharpest:
- **KEEP:** HITL-by-code-level-invariant (Reflexion iff-gate)
- **KEEP:** Hash-chain audit trail
- **KEEP:** Provider diversity primitive
- **CUT:** Dual-tier LLM cost routing (nice-to-have not framework-load-bearing)
- **CUT:** Structured JSON outputs at every persona boundary (implicit)

**Save:** ~100 words.

### Cut 3 · §2 Related Work — trim competitor paragraphs

Current has 12 bullets. Rich, but reviewers skim. Trim strategy:
- Combine **Wang GAICF + Kurshan Agentic Regulator** into one 3-sentence paragraph acknowledging both, differentiating in one sentence combined
- Move **Tian 2023 + Xiong 2024 + Liu 2025 survey** into one "verbalized-confidence lineage" one-sentence citation cluster
- **KEEP full paragraphs** for: Wang 2024 (direct competitor), Ravikiran Pramāṇa (direct competitor), Bellamy AIF360 (canonical anchor)

**Save:** ~200 words.

### Cut 4 · §1 Introduction — cut motivating anecdote

Current §1 opens with "The literature on AI-assisted credit decisions treats..." — that's actually the abstract, not §1. §1 currently has "Argument to defend" + "Concrete anchor to cite" + "Contribution list" scaffolding. In final prose:
- **KEEP:** contribution list (7 items) — reviewer cheat sheet
- **KEEP:** one legal-anchor paragraph citing CFPB Circular 2022-03 as motivating example
- **CUT:** any redundant framing that abstract already covers

**Save:** ~150 words.

---

## Total savings budget: ~650 words = ~1.2 pages of buffer

At 6.5-page current skeleton + ~0.5 page for real §5.3 numbers when they land = **7.0 pages** with 1 page buffer. Comfortable.

## Do NOT cut

- §3 Framework — THE contribution, grow if needed
- §5.3 Results — REVIEWER-critical
- Abstract — camera-ready length constraint
- §5.1 Sonnet 5 baseline paragraph — preempts reviewer objection
- §5.1 IRB one-liner — 20 words, preempts ethics question
- Any BibTeX in references.bib — cuts here hurt Related Work coverage

---

## Compile timeline

| When | What |
|---|---|
| Fri 7/17 | Send Yang draft PDF (skeleton polished, cuts NOT yet applied — acceptable) |
| Sun 7/27 | Real §5.3 numbers landed OR defer decision |
| Wed 7/30 | LaTeX compile · target 7.5 pages · apply cuts 1-4 as needed |
| Fri 8/1 | Anonymization sweep · Google-search-de-anonymization test |
| Sat 8/2 | Final compile · check page-count · submit before 23:59 AOE |

## Verify page count during LaTeX compile

```bash
# In LaTeX build:
pdftotext -layout paper.pdf - | wc -w   # word count
pdfinfo paper.pdf | grep Pages           # page count
```

If page count > 8, apply cuts 1-4 in that order. Each cut is independent — apply just enough to hit 7.5.
