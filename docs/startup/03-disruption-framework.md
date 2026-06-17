# Christensen Disruption Framework — Embodied Compliance Council

**Date:** 2026-06-17 (late evening)
**Purpose:** Capstone defense armor. Position the project under Christensen's *Innovator's Dilemma* framework, decide the disruption type, and identify the structural reasons incumbents will not respond in time.
**Not:** A real go-to-market plan. Treat all customer-acquisition tactics in this document as *thought experiments* used to harden the academic defense.

---

## 1. Christensen's three disruption types

Christensen distinguishes three innovation modes:

| Mode | Definition | Who's at risk | Example |
|---|---|---|---|
| **Sustaining** | Better product for existing customers along incumbent's metrics | No one — incumbents win | Faster Intel CPU each year |
| **Low-end disruption** | Worse product on incumbent's metrics, but good-enough at a much lower price; attacks over-served low-end customers | Incumbents tolerate erosion until too late | Linux servers vs Sun/HP UNIX |
| **New-market disruption** | Brings product to *non-consumers* — people who couldn't use the existing product at all because of cost, complexity, or access | Incumbents have no motivation to compete (cannibalization risk) | Salesforce vs Siebel (SMB CRM never existed) |

The defendable capstone claim hinges on which mode this project fits. Let me argue the case.

---

## 2. The claim: this is **new-market disruption**, not sustaining and not low-end

### 2.1. Why not sustaining?

A sustaining innovation would mean *improving incumbents' pre-trade compliance products on the metric they already win on*: faster rule evaluation, more execution venues, deeper FIX-protocol integration with OMS. Our project does none of these. Eventus Validus already evaluates 10,000 rules per second per firm; Trillium already plugs into 40+ venues; Charles River IMS already integrates with every OMS. Building "Embodied Compliance Council" as a sustaining improvement would mean competing on rules-per-second and venue count — and losing.

We are not on the incumbent metric. We add a new dimension (multi-agent LLM deliberation with Brier-calibrated audit trail) that incumbents don't measure at all.

### 2.2. Why not low-end disruption?

Low-end disruption requires that incumbents *over-serve* existing customers and that we serve the same customers worse-but-cheap. Eventus Validus charges $200K-$500K/year per firm. Could we offer "Eventus-light" at $99/month to small AI-native funds and creep upmarket? On the surface, yes. But two facts kill the low-end story:

1. **Existing low-end is not over-served — it doesn't exist.** Solo quants and AI-native sub-$100M funds don't buy Eventus-light because they don't buy Eventus at all. They don't have the budget, the deployment team, or the regulatory complexity that justifies a six-figure compliance product. They're *non-customers*.
2. **The product we'd sell is not a "lite" version of Eventus.** Eventus is a rules engine. We are an audit primitive for LLM judgments. Those are different categories. A low-end disruptor of Eventus would build "rules-engine-as-a-service for $99/month" (an open-source clone, basically). That's not us.

### 2.3. Why is it new-market disruption?

Three structural conditions Christensen requires for new-market disruption all hold:

**(a) The target buyer is a non-consumer of incumbents.** Solo quants ($100K-$10M AUM), family offices, AI-native sub-$100M hedge funds — these *cannot* buy Eventus, Trillium, or Charles River. The check size is wrong (six-figure annual contract on a $5M AUM book is absurd), the deployment is wrong (no IT team to integrate FIX OMS), and the value-prop is wrong (incumbents validate rule firing, not LLM judgment quality).

**(b) The job to be done is novel.** Two years ago there were no LLMs in trading decisions. Today there are tens of thousands of independent operators using GPT-4, Claude, Gemini, or local Llamas to *generate* trading probabilities. The job "is my AI's confidence calibrated enough to size a position from it?" is a job that did not exist in 2022. It cannot have been served by incumbents because the question was not asked.

**(c) Incumbents are structurally disinclined to compete.** Eventus's bank customer pays $300K/year, has a four-person procurement committee, and a 12-month sales cycle. A $99/month solo-quant customer attracts zero attention from a $50M ARR incumbent's sales team — and worse, attracts *negative* attention from the bank customer's compliance officer, who would not like to learn that the same vendor that audits her institution is also serving family offices. The incumbent's incentive is to *avoid* this market.

This is textbook new-market disruption. The capstone defense story writes itself.

---

## 3. Two corollaries that strengthen the defense

### 3.1. The incumbents' window is real, not theoretical

Even if Eventus decided to enter the LLM-audit market tomorrow, they would face a three-year build:

- **Year 1: LLM evaluation infrastructure.** Brier scoring per-prediction, Expected Calibration Error monitoring, temperature scaling, self-consistency checks. Incumbents have no LLM evaluation discipline today.
- **Year 2: Multi-agent deliberation framework.** A debate engine that takes a trade proposal, generates 5 voice perspectives, and surfaces a calibrated aggregate. This needs a research team. council-diff exists; an incumbent has to build or acquire equivalent.
- **Year 3: Audit-trail format aligned to EU AI Act Article 14 and SEC 15c3-5.** Tamper-evident logs of the deliberation, exportable to regulator-specified formats. Real lawyers required.

By the time an incumbent ships, the EU AI Act has been in force for three years and a new entrant has owned the segment.

### 3.2. The capstone's two live findings *are* the disruption thesis

Tonight's `ece_audit.py` and `sc_audit.py` results — T\* = 5.474 over-confidence, 100% demote rate under self-calibration — are not just academic results. They are evidence that *the buyer's existing tools don't catch this*. The agent's probability stream looks fine on a Brier dashboard (0.255, the standard metric) but is systematically over-stated in ways that only ECE and self-calibration surface. An incumbent without these primitives cannot tell the customer this is happening. That asymmetric information is the wedge.

---

## 4. Where the framework gets uncomfortable

Honest tensions:

1. **Christensen's framework predicts the disruptor builds a real company.** This project is not building a real company (per the founder's explicit posture). The framework still applies to the *intellectual claim* — "an entrant with this approach would disrupt incumbents" — even when the entrant happens to be a capstone student. But the defense has to acknowledge the gap.

2. **Disruption requires distribution.** Christensen's case studies all involve real distribution flywheels (Honda dealers in the US, Salesforce inbound marketing). The OSS distribution (council-diff at 71 platforms, council-for-slack via Slack App Directory) is a real flywheel — but it's also pre-revenue, and pre-revenue flywheels can stall.

3. **Disruption requires asymmetric motivation.** The strongest version of asymmetric motivation in our story is *the incumbent doesn't want to serve solo quants because their bank customer wouldn't like it*. This is real but soft. A harder version — *the incumbent literally cannot compete because of a structural technology lock* — does not apply.

4. **Christensen's framework is descriptive, not predictive.** It says disruptors *win* in retrospect after they've already won. It does not say *this specific project* will win. The defense should claim the framework applies, not that the company is guaranteed to succeed.

---

## 5. Capstone defense one-liner using this framework

Use this verbatim or rewrite to your voice:

> *In Christensen's framework this work is a new-market disruption: it brings a calibration-and-audit primitive to a buyer that incumbents structurally cannot serve. The two live findings I shipped tonight — T\* = 5.474 fitted on production trading agent decisions, and 100% demote rate under second-order LLM self-calibration — show the gap in incumbent product capability that the disruption exploits. The contribution is the primitive itself: a probabilistically-attached compliance gesture that is **tamper-evident, regulator-defensible, and grounded in calibration metrics that incumbents do not measure**.*

---

## 6. Inputs to Capstone defense Q&A

**Q: "But Yang, this looks like a research project, not a startup."**
A: That's the right read. The framework is applied to argue *what kind of intellectual contribution this is*. The same calibration primitives could be built by a research lab, a startup, or a sole maintainer. The contribution is independent of which.

**Q: "Why doesn't an incumbent just acquire council-diff?"**
A: They can. council-diff is MIT-licensed; the code is the easy part. The harder asset is the operational discipline — calibration as a daily practice, Brier-and-ECE as a *primary* product surface, self-calibration as a gate. Operational disciplines transfer slowly across companies.

**Q: "Why won't a hedge fund just build this internally?"**
A: Most won't. Calibration infrastructure is unsexy work. Hedge fund engineers prefer to build alpha. The same way most banks don't roll their own compliance suite, most funds will not roll their own calibration suite — *once such a suite exists in a defensible form*. The job for this project is to make sure that defensible form exists.

**Q: "What's the moat once the incumbents catch up?"**
A: Three candidates, ranked by defensibility (see `docs/startup/02-research-synthesis.md` §7): (1) cross-customer calibration data flywheel, (2) operational know-how + playbook, (3) SR 11-7 model card templates pre-approved by Tier 1 model risk teams. None are infinite moats. All buy time.

---

## 7. Use this document in: capstone defense Q&A · IEEE paper intro · advisor sync prep · YC pitch (if ever)
