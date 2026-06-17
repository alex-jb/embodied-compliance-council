# Security Policy

## Supported versions

This is an active research codebase, not a stable library. Only the `main` branch receives security fixes.

| Branch | Supported |
|---|---|
| `main` | ✅ |
| `feature/*` | ❌ (rebased frequently) |
| Tagged releases | ❌ (none yet) |

## Reporting a vulnerability

If you find a security issue — for example, a way to forge a hash-chain audit entry, bypass voice tool restrictions, expose an Anthropic API key, or escalate privileges through the WebXR scene — **please do not open a public GitHub issue.** Instead, email **alex@vibexforge.com** with:

1. A description of the vulnerability
2. The package(s) and file(s) affected (e.g., `packages/spatial-gating-protocol/src/hash-chain.ts`)
3. Steps to reproduce, ideally with a minimal failing test case
4. Your assessment of severity and impact

You will receive an acknowledgment within 72 hours. A fix or detailed mitigation plan typically follows within 14 days. Credit will be given in the `CHANGELOG.md` and any subsequent publication unless you request anonymity.

## Out of scope

The following are **not** considered security vulnerabilities for this repository:

- The `MockProvider` in `@embodied-compliance/council-runner` returns deterministic verdicts based on a hash of the input. This is by design for testing and offline development; it is not a real council and produces no audit value.
- The WebXR scenes (`apps/trading-quest`, `apps/banking-quest`) currently log to a per-tab in-memory hash chain that is lost on page reload. Server-side persistence is roadmap; missing persistence is not a bug.
- The Anthropic API key handling expects users to set `ANTHROPIC_API_KEY` in their own environment. Leaks of personal API keys due to user misconfiguration are not vulnerabilities in this codebase.

## Coordinated disclosure

If the vulnerability affects users of the open-source code beyond Yeshiva University, a coordinated disclosure schedule will be agreed in writing between the reporter and the maintainers before public disclosure.
