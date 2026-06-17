# 具身合规议会 (Embodied Compliance Council)

[![CI](https://github.com/alex-jb/embodied-compliance-council/actions/workflows/ci.yml/badge.svg)](https://github.com/alex-jb/embodied-compliance-council/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE) [![Tests](https://img.shields.io/badge/tests-33%2F33%20passing-brightgreen)](./packages)

> [English](./README.md) · **中文**

**多声音审议 + 校准纪律 + 空间审计,服务受监管 AI 工作流。**

一个为受监管决策场景生产开源 AI 基础设施的研究单仓库 —— 交易簿调整、贷款发放、财富顾问推荐,以及其他"AI 自信但错误、无审计痕迹、无校准历史"会出大问题的工作流。每个决策都由五个"为分歧而生"的 AI 声音辩论,经裁决、长期 Brier 校准审计,并通过空间扩展现实场景呈现 —— 配以防篡改的哈希链审计追踪。

**状态:** 活跃研究代码库。资本科技顶点项目(交易方向,Michael Yang 教授指导)、银行合规联合项目(NGO 博士 + Loredana C. Levitchi 外部风险数学协作者)。投稿目标:ICAIF 2027(交易)、IEEE 期刊(银行)。

**许可证:** MIT。

---

## 为什么存在

受监管行业的生产级 AI 代理失败,不是因为慢,而是因为**自信但错**、**无审计痕迹**、**每个声音都没有自己的校准历史**。单声音代理系统把基础模型的"自信"原封不动传到决策,却从未度量这个模型在这类决策上**过去**是不是对的。

具身合规议会直接处理三个空白:

1. **认知多样性优先于单模型自信。** 五个声音被严格限定在**不同**的证据子集(因子暴露、行业动态、公平贷款统计等),议会就不会塌缩为基础模型的默认意见。
2. **校准是审计原语。** 每个声音的判决都记录置信度,事后对结果做 Brier 评分。**反对意见证明承担风险**的声音获得更高权重;**自信而错**的声音逐步降权。
3. **空间化、防篡改的审计。** WebXR 场景将议会渲染为围绕用户的实体讲台,每次裁决通过 WebCrypto SHA-256 哈希链向前递推 —— 在同一原语上同时满足欧盟 AI 法案第 14 条(人类监督)和美国 ECOA / Reg B(可审计决策)。

---

## 架构

```
embodied-compliance-council/
├── packages/
│   ├── council-voices/              # 10 个系统提示声音 (Markdown + YAML)
│   │   ├── trading/                 #   交易方向 5 个声音 (顶点项目)
│   │   └── banking/                 #   银行方向 5 个声音 (NGO 博士项目)
│   ├── orallexa-risk/               # 7 个 Python 风险原语 (Phase A v0 已实现)
│   ├── spatial-gating-protocol/     # 共享 TS 类型 + WebCrypto 哈希链
│   ├── hand-gestures/               # MediaPipe Hands 手势分类器 (Phase 2.5)
│   └── council-runner/              # Node 调度器 + HTTP 服务 + Vercel 适配
├── apps/
│   ├── trading-quest/               # 交易方向 WebXR 场景
│   └── banking-quest/               # 银行方向 WebXR 场景
├── docs/
│   ├── capstone-thesis/             # 顶点项目 (Yang 教授) 修订 + 材料
│   ├── dr-ngo-final/                # 银行提案 v2 + Lora 交接邮件
│   ├── katz-rfp-2026/               # Katz 教师研究计划申请包
│   ├── ibm-bob-spike/               # IBM AI Builders 周末 spike 指南
│   ├── checkpoints/                 # 跨 session 恢复快照
│   └── startup/                     # 自下而上 TAM + Christensen 颠覆框架 (学术防御)
└── README.zh-CN.md (本文件)
```

---

## 十个声音

每个声音有 YAML frontmatter (`voice_id`、`allowed_tools`、`verdict_options`、`weight_in_aggregate_default`),正文是系统提示,末尾是严格 JSON 输出 schema。**工具限制是认知多样性的来源** —— 如果每个声音都能看到一切,它们会收敛到基础模型的默认意见。

### 交易方向 (顶点项目,Yang 教授)

| 声音 | 视角 | 允许工具 |
|---|---|---|
| 宏观分析师 | 因子体制 + 相关历史 | `factor_exposures`、`correlation_matrix`、`sector_exposure` |
| 行业专家 | GICS 子行业催化 + 共动 | `beta_decomposition`、`sector_exposure` |
| 组合经理 | NAV 集中度 + VaR 阶跃 | `concentration`、`var`、`correlation_matrix` |
| 增长 VC 反对派 | 3 年护城河 + 价值/成长倾向漂移 | `factor_exposures`、`beta_decomposition` |
| 激进做空 | 拥挤交易检测 + 非对称破位 | `concentration`、`sector_exposure` |

### 银行方向 (NGO 博士 + Loredana Levitchi)

| 声音 | 视角 | 允许工具 |
|---|---|---|
| 信用基本面分析师 | 巴菲特式贯穿周期偿付能力 | `cash_flow_coverage`、`debt_service_history`、`through_cycle_earnings` |
| 风险官员 | PD × LGD × EAD + 压力测试 | `default_probability`、`expected_loss`、`stress_scenario` |
| 公平贷款审查员 | ECOA / Reg B 差别影响 + 代理变量检测 | `disparate_impact_test`、`protected_class_proxy_detection`、`decisioning_variable_audit` |
| 客户倡导者 | 不利行动通知具体性 + 通俗语言披露 | `adverse_action_codes`、`disclosure_quality_check`、`plain_language_score` |
| 宏观反对派 | 贯穿周期宏观 + 行业周期 + 衰退代理 | `macro_regime_classifier`、`sector_cycle_phase`、`recession_proxies` |

---

## 快速开始

```bash
git clone https://github.com/alex-jb/embodied-compliance-council.git
cd embodied-compliance-council
npm install
npm test --workspaces --if-present     # 5 个 TS 包共 33+ 测试全绿

# 交易方向 WebXR 场景
npm run dev:trading                     # http://localhost:5173

# 银行方向 WebXR 场景
npm run dev:banking                     # http://localhost:5174

# 议会服务 (HTTP + WebXR app 可调用)
npm run council:server                  # http://localhost:3030

# 命令行议会调用 (mock provider)
npm run council -- --vertical trading --action "BUY 10 NVDA"

# 真实 Anthropic Sonnet 4.6 议会调用
ANTHROPIC_API_KEY=sk-ant-... npm run council -- --vertical banking \
  --provider anthropic --action "ORIGINATE \$750K CRE loan"
```

**操作 (WebXR 场景):**
- 鼠标拖动环视(你站在议会中心)
- **空格键** 触发一次合成议会决策 → 右下角哈希链面板追加一条
- **"Enable hand tracking"** 启用摄像头 + MediaPipe → 大拇指 = approve, 握拳 = block/decline, 拇指食指捏 = escalate
- **"Council: mock / live"** 切换合成 vs 真实议会服务(需启动 `npm run council:server`)
- **"Enter VR"**(Quest 3S 浏览器)进入沉浸式 VR

---

## 阶段状态

| 阶段 | 内容 | 状态 |
|---|---|---|
| Phase 1 | 议会声音系统提示 + 工具限制 | ✅ 2026-06-16 |
| Phase 1 校准 | Brier + ECE + temperature + Reflexion + Kelly + Sakana DG | ✅ 已 ship 于 `capstone-orallexa-calibration` (姊妹仓库,64 测试绿) |
| Phase 2 | WebXR 场景 + 空间门控协议 + 哈希链审计 | ✅ 2026-06-17 |
| Phase 2.5 | MediaPipe Hands 手势输入 (桌面摄像头 + Quest 3S `XRHand`) | ✅ 桌面已 ship;Quest 路径下一步 |
| Phase 3 | Anthropic 真实调用 + Node 调度 + HTTP 服务 + Vercel 适配 | ✅ 2026-06-17 |
| Phase A 风险原语 | 7 个原语 v0 实现 (numpy/scipy 教材级) | ✅ 2026-06-17 |
| Phase B 银行风险数学 | 集成 Loredana BR 文档实现 | 等待 Loredana 代码 |
| Phase 4 | 欧盟 AI 法案 + ECOA / Reg B 合规评估实验 | Year 2 |

---

## 学术语境

此代码库支撑四个学术交付物:

1. **资本科技顶点论文** (COM 6000-CP1,Michael Yang 教授) — *《校准纪律作为现场交易空间预交易合规的审计原语》*。交易方向,2026 年 8 月答辩。
2. **NGO 博士最终项目** — 银行方向具身合规,服务贷款发放 + 财富顾问,ECOA / Reg B 框架。
3. **ICAIF 2027 论文** — 交易方向的校准纪律 + 多声音方法论。截稿约 2026-09-15。
4. **IEEE 银行论文** (与 Loredana C. Levitchi 合作) — 通过多声音公平贷款审查检测差别影响。目标期刊:IEEE TIFS 或 IEEE 计算机。

学术答辩背后的策略与 TAM 分析在 `docs/startup/` —— 这些文档是为答辩服务的研究装备,**不是**创业执行计划。

---

## 相关开源

- [`council-diff`](https://github.com/alex-jb/council-diff) — TypeScript / npm 包,实现 5 声音议事模式的独立库 (Slack 与 CLI 表面消费)。
- [`capstone-orallexa-calibration`](https://github.com/alex-jb/capstone-orallexa-calibration) — Python 校准工具包 (ECE、temperature scaling、Reflexion、Kelly sizing、Sakana DG self-modification)。
- [`memory-wall-tracker`](https://github.com/alex-jb/memory-wall-tracker) — Druckenmiller AI inference 篮子的 Brier 审计日报。

---

## 贡献者

- **Alex Xiaoyu Ji** — 主开发者 (耶史瓦大学 Katz 科学健康学院,研究生)
- **Michael Yang 教授** — 顶点项目导师,交易方向
- **NGO 博士** — 银行方向联合 PI
- **Loredana C. Levitchi** — 银行风险数学协作者,IEEE 论文合著

欢迎 PR,但请先开 issue 讨论范围 —— 这是活跃的研究代码库,不是稳定库。

---

## 许可证

MIT。见 [`LICENSE`](./LICENSE)。
