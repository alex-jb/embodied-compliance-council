# Contributing to Embodied Compliance Council

This is an active research codebase backing a Yeshiva University capstone thesis (trading vertical), a Dr. NGO final project (banking vertical), an ICAIF 2027 paper submission, and an IEEE banking-vertical journal submission. PRs are welcome but the project is opinionated — please open an issue first to discuss scope changes.

## Quick start

```bash
git clone https://github.com/alex-jb/embodied-compliance-council.git
cd embodied-compliance-council
npm install
npm test --workspaces --if-present     # 18 tests across 3 packages
```

## Project layout

See [`README.md`](./README.md) for the full architecture map. The short version:

- `packages/council-voices/` — Markdown + YAML system prompts (the 10 voices).
- `packages/spatial-gating-protocol/` — Shared TypeScript types + WebCrypto hash chain.
- `packages/hand-gestures/` — MediaPipe Hands gesture classifier.
- `packages/council-runner/` — Node orchestrator (loads voices, fans out, aggregates).
- `apps/{trading,banking}-quest/` — Vite + Three.js + WebXR scenes.
- `docs/` — Capstone amendments, banking proposal, Katz RFP packet, checkpoints, deep research.

## Local checks before PR

```bash
npm run typecheck --workspaces --if-present
npm test --workspaces --if-present
npm run build --workspace apps/trading-quest
```

All three must pass.

## Commit messages

Conventional Commits, scoped per package or vertical:

```
feat(council-runner): anthropic provider
fix(hand-gestures): debounce gesture emit across hands
docs(katz-rfp): tighten 2-page narrative wording
```

## Code style

- TypeScript strict mode, ES2022 target. No implicit any.
- Snake_case for function and variable names (project convention).
- No `gray-matter` or other heavy deps where a 30-line parser will do.
- Test files alongside source under `tests/`. Vitest.

## Scope philosophy

This repository is the research instrument behind specific publications and academic deliverables. Two things follow:

1. **Scope creep that helps the publications is welcome.** Better calibration math, sharper voice prompts, additional verticals if there is a real research question behind them.
2. **Scope creep that does not help the publications is not welcome.** No "this would be cool" features. No CSS framework rewrites. No vendor lock-in pivots. The project ships when ICAIF 2027 and the IEEE banking paper are accepted, not when it is the prettiest dashboard.

## Reporting bugs

Open a GitHub issue with:
1. Which package + which file (e.g., `packages/council-runner/src/runner.ts`)
2. The command you ran and its observed output
3. The expected output
4. Your Node version and OS

For security issues, see [`SECURITY.md`](./SECURITY.md) — do not file public issues for security bugs.

## License

By contributing you agree your contributions are licensed under the same MIT license as the rest of the repository. See [`LICENSE`](./LICENSE).
