# council-voices

The five persona system prompts that drive each vertical's deliberation council. Each voice is a typed Anthropic-compatible system prompt plus the subset of `orallexa-risk` tool calls that voice is allowed to invoke.

## Why voices have tool restrictions

A voice that can call every risk primitive becomes a generic assistant. The thesis of the system is that *distinct voices ground their reasoning in distinct subsets of evidence*. The Risk Officer voice calls VaR and Expected Shortfall before forming an opinion. The Macro Contrarian voice calls factor exposures and correlation. The Activist Short voice calls concentration limits and sector exposure. Limiting tool access is what gives the council *epistemic diversity*; if everyone could see everything they'd converge to the model's default opinion.

## Layout

```
council-voices/
├── trading/                            # Capstone vertical
│   ├── 01-macro.md                     # Macro analyst
│   ├── 02-sector.md                    # Sector specialist
│   ├── 03-portfolio.md                 # Portfolio manager
│   ├── 04-growth-vc.md                 # Growth-VC contrarian
│   └── 05-activist-short.md            # Activist short
└── banking/                            # Dr. NGO + Loredana joint
    ├── 01-credit-fundamentals.md       # Buffett-style credit analyst
    ├── 02-risk-officer.md              # Default + stress scenarios
    ├── 03-fair-lending.md              # ECOA / Reg B disparate-impact
    ├── 04-customer-advocate.md         # Transparency + adverse-action
    └── 05-macro-contrarian.md          # Recession + sector cycle
```

## Contract

Each voice prompt file uses YAML frontmatter:

```yaml
---
voice_id: macro
display_name: Macro Analyst
vertical: trading
allowed_tools:
  - factor_exposures
  - correlation_matrix
  - sector_exposure
verdict_options: [approve, block, escalate]
weight_in_aggregate_default: 0.20
---
```

Followed by the system prompt as plain markdown.

## Loading

```python
from council_voices import load_voice, load_council
voice = load_voice("trading/01-macro")  # → ParsedVoice with tools + system_prompt
council = load_council("trading")        # → list of 5 ParsedVoice in canonical order
```
