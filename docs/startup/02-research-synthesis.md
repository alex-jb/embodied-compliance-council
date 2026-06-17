# Research Synthesis — 真实市场数据 (2026-06-17)

研究 agent 平行扫了 8 个问题 (TAM / 竞品 / 客户分层 / 命名 / 融资信号 / wedge / 护城河 / 银行摩擦)。**核心 punchline 重新框架了战略**:

> 你现在不是 startup,是 **distribution-first OSS 项目 + 一个可计费的 SaaS wedge**。把它当 **LaunchKit 的姊妹品** 做,3-6 月看 MRR 决定要不要融资,**而不是反过来**。

---

## 🚨 关键 reframe: XR 不是 wedge,是 marketing

研究最大发现:

| 圈 | 单独大小 | 含义 |
|---|---|---|
| Calibration tools for finance | **类目不存在** | 校准是 ML team 内部工程,不是采购线 |
| XR 企业软件 in 金融 | **$200-400M** (金融占企业 XR <3%) | 太薄,独立融资不够 |
| Pre-trade risk/compliance | ~$3-4B,但 **嵌在 OMS/EMS 预算** + 12 家寡头 | 不能从空进 |
| 三者交叉 | 几乎为零 | **0 个竞品在做** → 但这不一定是机会,可能是没人要 |

**XR 的真实角色**: YC pitch deck 视觉锚 + marketing film,**不进 MVP roadmap**。Quest 3S 交易员审单这个画面好讲故事,但银行交易员实际不戴 headset 审单。Meta/Apple 一更新 SDK 你的 XR moat 就消失。

---

## 📊 真实市场尺寸 (real numbers)

| 类目 | TAM | 来源 |
|---|---|---|
| RegTech 全球 | $15.8B (2024) → $87B (2032), CAGR 23.6% | Fortune BI / Mordor 2025 |
| Pre-trade risk/compliance 软件 | ~$3-4B | Celent 2024 |
| EU AI Act compliance 工具 | $1.5-2.5B (2026 est) | Gartner 2025 |
| SEC 15c3-5 tools | ~$500M / 12 家寡头 | FIA |
| XR 企业 in 金融 | $200-400M (太薄) | IDC 2025 |
| Brier/calibration for finance | **类目不存在** | — |

---

## 🥊 真实竞品 (你不是孤立的)

| 层 | 玩家 | 价格 | 跟你的差 |
|---|---|---|---|
| Pre-trade 在位 | Eventus Validus / TT Score / Bloomberg AIM / Charles River / Trillium | $30K-$500K/firm/year | rule-based, **不审 LLM 决策** |
| LLM 多 agent 邻近 | Numerai / **Cekura (YC F24)** / TradingAgents (SSRN 2026) / Apex Quant | pre-revenue 或 fund 模式 | **0 个做 XR, 0 个做校准审计** |
| OSS / Brier 多 agent | **council-diff (你)** / LangSmith / Phoenix Arize | 免费/freemium | **你已是这条线第 1 名** |

---

## 💰 真实融资信号 (2025-26 RegTech / LLM)

| Comp | 轮 | 领投 |
|---|---|---|
| **Norm AI** | A $27M (2024) → B 谈中 | Coatue |
| **Greenlite** | seed $4.5M (2024) | Thomson Reuters Ventures |
| **Hadrius** | seed $2M (2025) | YC W24 |
| **Cekura** | YC F24 + FDE $100-180K 招人 | YC |
| Campfire (XR 企业, 不直接 comp) | A $30M (2024) | a16z |

**结论**: RegTech AI 钱在 (Norm AI $27M 是 strong signal), XR 钱也在, **但没人押 "XR + pre-trade" 同一笔** — 因为银行交易员不戴 Quest 审单。

**YC W26 申请**: Cekura / Hadrius / Norm AI 是直接 reference comps. 你已经 ahead of W24 cohort (council-diff 71-platform + production 2 findings).

---

## 🎯 客户分层 (真实可达性)

| 客户 | WTP | 周期 | Solo 可达性 | 总分 |
|---|---|---|---|---|
| **Solo / family office** | $50-200/mo | 1-2 周 | **高** | ★★★★★ |
| Mid-hedge $100M-$1B | $20-80K/year | 6-9 月 | 低 (需推荐人) | ★★ |
| Reg BI advisor seat | $500-2K/seat/year | 3 月 | 中 (RIA 渠道) | ★★★ |
| Reg ATS broker | $10-30K/year | 6 月 | 中 | ★★ |
| Tier 1 bank pre-trade | $200K-$1M/year | 12-24 月 | **极低** | ★ |
| Jane Street/Tower (自营) | 不外采 | — | 0 | ✗ |

**唯一现实 90 天起点**: Solo quants / family offices. **14 天内第一笔付费**目标。

---

## 🏰 真正护城河 ranked

1. **跨客户校准数据飞轮** — 越多 quant 提交他们 agent 的 prediction stream, 你 Brier benchmark 越准。类似 LangSmith 但金融垂直
2. **运营 know-how** — T* 校准 / Reflexion 模板 / Kelly shrinkage 落地手册 (你今晚已经开始建)
3. **SR 11-7 model card 模板** (12-18 月建) — 银行 vendor onboarding 必备
4. ~~XR~~ — **不是护城河**, Meta SDK 一更新就吃掉
5. ~~council-diff 代码本身~~ — MIT, **代码不是护城河**

---

## 🏦 银行卖给 = Year 2+ 不是 Year 1

| 关卡 | 时间 | 现金 |
|---|---|---|
| SOC 2 Type II | 6-9 月 | $30-60K |
| ISO 27001 | 9-12 月 | $20-40K |
| SR 11-7 model validation | 3-6 月 | $20K (律师) |
| Cyber/E&O 保险 $5M+ | 1 月 | $15-25K/year |
| 银行 vendor onboarding | 6-18 月 | 隐性 |

**总门槛 ~$100K 现金 + 18 月**. Solo 自费做不动. **不在 Year 1 路径上**.

---

## 🏷️ 命名 — Brierline 胜出

| 候选 | 域名 | 评估 |
|---|---|---|
| **Brierline.com** | **大概率可注** | **零冲突 google search, 校准 + 防线双关 (Calibrand voice)** ⭐ |
| Calibra Vault | calibravault.ai 大概率可注 | Meta Calibra 钱包已弃用, 不冲突但弱 |
| Quorum Pretrade | 待查 | 长, 弱 |
| Aegis Council | aegiscouncil.io 多被占 | 弱 |
| Stagecraft Compliance | — | 弱 |

**注册前 30 分钟**: whois Brierline.com + Brierline.ai + USPTO TESS 自查。

---

## 🎯 Wedge 锁定: A (Calibration Audit SaaS)

| 候选 | MRR 路径 | Alex 30 天可发 |
|---|---|---|
| **A. Calibration Audit SaaS** (T*=5.474 finding 自动化卖给跑 LLM 的 quant) | $99-499/mo × 20 = $5-10K MRR | ✅ |
| B. council-for-Slack pre-trade 插件 | $29-99/seat, **需 SOC2 (6-9 月)** | ⚠ Year 2 |
| C. Embodied Compliance XR (5 podium) | $0 MRR 12 月内 | ❌ demo film 不是产品 |

**Wedge A 是唯一现实 90 天起点**. B 和 C 转为 marketing / future work.

---

## 📋 30 天 5 actionable

1. **锁 Wedge A**: Calibration Audit SaaS targeting solo quants + family offices, **14 天内第一笔付费** (复用你 LaunchKit 21-day 北极星打法)
2. **XR 降级为 marketing-film**: Embodied Compliance demo 当 YC pitch 视觉锚, **不进 MVP**
3. **今晚 30 分钟内注 Brierline.com + Brierline.ai** ($30 total), 其他名字 abandon
4. **写 1 篇 "T*=5.474 on production LLM trading agent" 技术博客** 发 HN + dev.to + r/algotrading, 把 Orallexa F1+F2 公开 — **distribution moat 起点**
5. **YC W26 申请用 Wedge A** (不用 XR 主轴) - Cekura/Hadrius/Norm AI 是 reference comps. XR 放 demo video tab

---

## 💎 最大诚实 (paste 上面 too)

> 你现在不是 startup, 是 **distribution-first OSS 项目 + 一个可计费的 SaaS wedge**。把它当 **LaunchKit 的姊妹品** 做, 3-6 月看 MRR 决定要不要融资, **而不是反过来**。

LaunchKit 的姊妹品 = 同样 OSS + 同样付费 SaaS layer + 同样 indie distribution-first. **Brierline = LaunchKit for AI traders**. 这条 framing 比 "AI 银行 spatial compliance" 都强 10×, 因为它可被 30 天内被市场 falsify (有人付费 = yes, 无人付费 = no)。

---

## ❓ 你今晚 / 明早 4 个 strategic decision

1. **Brierline 名字接受?** (Brier 是你 capstone 主指标 + line = 防线, 是 capstone thesis 的自然延伸) — 接受我现在 trigger 注册指令 (你自己点)
2. **Wedge A SaaS 起步 — 14 天内 ship landing page + Stripe + 第一笔付费?** 我可以现在 ship 初版 landing page (Vercel) 草稿
3. **F1 + F2 technical blog 我现在 draft?** "T* = 5.474 on production LLM trading agent — and what we found when we asked Claude if it knew" (~1500 字), 周三发 HN
4. **YC W26 application draft 我现在写 outline?** 9 月开放, 提前 draft 你 review

回 4 个 字母 (Y/N) 例如 "Y Y Y N"。我立刻 ship。
