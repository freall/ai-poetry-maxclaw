# AGENTS.md — 诗意山河开发团队规范

> 所有参与此项目的 AI agent 必须遵循本文档的所有规则。

---

## 一、核心原则

### 1.1 安全第一
- **永远不要将任何密钥、Token、API Key、密码、Secret 提交到代码仓库**
- 包括但不限于：`SUPABASE_URL`、`SUPABASE_KEY`、`ANTHROPIC_API_KEY`、GitHub Token 等
- 所有敏感信息存储在 `.env.local`（不提交），通过 `import.meta.env` 读取
- 若发现任何敏感信息泄露到代码中，立即重置并通知用户

### 1.2 开源优先
- **禁止使用任何闭源 SDK**（如腾讯云闭源 SDK、百度 AI 闭源 SDK 等）
- 允许使用：Supabase（开源）、TailwindCSS（开源）、React（开源）、Vite（开源）
- AI 能力使用平台提供的 MCP 工具，不使用第三方付费闭源 API

### 1.3 代码质量
- 所有 commit message 使用 **英文**
- 所有代码注释使用 **英文**
- 变量/函数命名遵循英文驼峰或下划线
- TypeScript 严格模式，禁止 `any` 滥用
- 每次 PR/commit 附带简短的变更说明

---

## 二、开发规范

### 2.1 Git 工作流
```
main 分支: 稳定可部署代码
开发分支: feature/xxx, fix/xxx, data/xxx
提交前:    git diff --stat 检查变更范围
提交信息:  参考 Angular commit convention
  feat:     新功能
  fix:      Bug 修复
  data:     数据更新
  design:   设计变更
  perf:     性能优化
  refactor: 重构
  docs:     文档更新
```

### 2.2 项目结构
```
poetry-master/
├── SPEC.md           # 项目规范（必须先读）
├── AGENTS.md         # 本文档
├── DESIGN.md         # 设计规范
├── README.md         # 项目说明
├── frontend/         # Vite + React 前端
│   ├── src/
│   │   ├── components/   # React 组件
│   │   ├── pages/         # 页面组件
│   │   ├── hooks/         # 自定义 hooks
│   │   ├── lib/            # 工具函数、API 客户端
│   │   ├── stores/         # 状态管理
│   │   └── types/          # TypeScript 类型
│   └── public/
├── backend/          # 后端（Supabase Edge Functions 或 Express）
│   └── functions/   # Edge Functions
├── scripts/          # 数据采集/处理脚本
│   ├── scrapers/     # 诗词数据采集
│   └── generators/   # AI 图片生成
├── data/             # 本地数据文件（JSON/SQL）
│   ├── poems/        # 诗词原始数据
│   ├── authors/      # 作者数据
│   └── seed/         # 数据库种子数据
└── .env.example      # 环境变量示例（不包含真实值）
```

### 2.3 环境变量规范
```bash
# .env.example（提交到仓库，无真实值）
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # 仅后端使用，不暴露到前端
```

### 2.4 数据库 Schema 规范
- 所有表名使用英文单数或复数：`poems`, `authors`, `quiz_items`
- 字段名使用 snake_case：`created_at`, `poem_id`
- 必须包含 `created_at`, `updated_at` 时间戳字段
- RLS（行级安全）必须为所有用户数据表启用

---

## 三、协 作 流 程

### 3.1 任务分解
1. 理解需求 → 写 SPEC.md 对应章节（如尚无）
2. 评估工作量 → 拆分为 < 2 小时的小任务
3. 实现 → 测试 → commit → push
4. 每日提交进度到 `DAILY_DEV_LOG.md`

### 3.2 遇到问题
- **先尝试解决**：查阅文档、搜索网络、检查日志
- **无法解决**：记录到 `ISSUES.md`，说明尝试过程和错误信息，附上错误截图/日志
- **需要用户决策**：用列表呈现选项 + 明确的问题，不带倾向

### 3.3 代码审查自检清单
- [ ] 是否有任何 API Key / Token / Secret 硬编码？
- [ ] 所有 `console.log` 是否已移除或改为条件日志？
- [ ] TypeScript 类型是否完整，无 `any` 泄漏？
- [ ] 是否有未处理的 Promise rejection？
- [ ] 响应式布局是否在 320px / 768px / 1440px 下测试过？
- [ ] 图片是否有 alt 文本？
- [ ] 移动端触控区域是否 ≥ 44×44px？

---

## 四、日志记录

### 4.1 每日日志 (DAILY_DEV_LOG.md)
```markdown
## YYYY-MM-DD

### 今日完成
- [ ] 功能 A
- [ ] Bug 修复 B

### 明日计划
- [ ] 功能 C
- [ ] 数据采集 D

### 问题与解决
- 问题描述 → 解决方法

### 学习/发现
- 有价值的技术发现或设计参考
```

### 4.2 问题记录 (ISSUES.md)
```markdown
## Issue #N: [简短描述]
状态: Open / In Progress / Resolved / Won't Fix

**环境**: Node v22, npm 10, ...
**复现步骤**:
1. ...
2. ...

**错误日志**:
```
[粘贴错误信息]
```

**尝试的解决方案**:
- 方案1: [结果]
- 方案2: [结果]

**最终解决方案**:
```

---

## 五、安全检查

### 5.1 提交前必须检查
```bash
# 运行安全检查
grep -rn "ghp_\|sk-\|sk_live_\|TENCENT_SECRET\|SECRET_KEY\|PRIVATE_KEY" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.json" .

# 确保 .env.local 不在 git 追踪中
git status | grep ".env"
```

### 5.2 依赖安全
```bash
# 定期检查漏洞
npm audit
npm outdated
```

---

## 六、沟通规范

- 复杂任务开始前，先汇报计划（包括预计时间和步骤）
- 进度变更立即通知（不是等完成才汇报）
- 涉及用户数据的操作（删除、修改）必须明确告知用户
- 用户询问进展时，优先展示实际效果（截图/URL）而非描述

---

*最后更新: 2026-04-07*
