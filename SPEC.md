# 诗意山河 — 全栈古诗词学习平台 SPEC

> Cover all Chinese classical poetry, Song lyrics, and classical prose for students.
> Gamified, modern, mobile-first design.

---

## 1. Concept & Vision

**诗意山河** — 一款让学生爱上古诗词的学习平台。不同于传统枯燥的诗词背诵工具，我们将游戏化设计注入每个交互细节：闯关、徽章、连击答题、诗词收集、每日打卡。视觉上借鉴宋代水墨美学与现代极简主义的融合，营造"诗中有画、画中有诗"的沉浸感。移动端采用"刷"的操作方式，让学习古诗词像刷抖音一样轻松上瘾。

---

## 2. Design Language

### Aesthetic Direction
**新宋式极简主义** — 以宋代文人审美为底色（留白、水墨淡彩、卷轴意象），融合现代 UI 的清晰层次感。深色主题为主（减少阅读疲劳），点缀传统中国色。

### Color Palette
```
Primary:        #1a1a2e  (墨色深夜)
Secondary:      #16213e  (青墨)
Accent Gold:    #d4a843  (古铜金 / 古籍金)
Accent Coral:   #e07a5f  (胭脂)
Accent Jade:    #81b29a  (青瓷)
Surface:        #0f0f23  (玄色)
Card:           #1e1e3f  (绀色)
Text Primary:   #f5f0e8  (素纸白)
Text Secondary: #9ca3af
Text Muted:     #6b7280
Success:       #4ade80
Error:         #f87171
Warning:       #fbbf24
```

### Typography
- **标题/诗词正文**: `"Ma Shan Zheng", "Noto Serif SC", serif` — 毛笔书法感
- **正文/UI**: `"LXGW WenKai", "Noto Sans SC", sans-serif` — 清晰可读
- **代码/数字**: `"JetBrains Mono", monospace`

### Spatial System
```
base: 4px
spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96
border-radius: 4 (sm), 8 (md), 16 (lg), 24 (xl), 9999 (pill)
max-content-width: 1200px
```

### Motion Philosophy
- **Entrance**: fade-in + translateY(-8px), 300ms ease-out
- **Page transitions**: slide-in from right (前进) / slide-in from left (后退), 250ms
- **Micro-interactions**: scale(1.02) on card hover, 150ms
- **Success/答题**: confetti burst + scale bounce, 400ms
- **Swipe (mobile)**: spring physics, 60fps
- **Ambient**: subtle floating animation on decorative elements

### Visual Assets
- **图标**: Lucide React (consistent stroke weight)
- **诗词配图**: AI 生成 + 历史名画双轨并行
- **装饰元素**: 水墨晕染边框、云纹底纹、印章图标
- **背景**: 微妙的山水渐变 + 粒子星空

---

## 3. Layout & Structure

### 信息架构
```
首页 (/)
├── 发现页 (/discover) — 分类浏览、搜索
├── 诗词详情页 (/poem/:id) — 全功能诗词学习页
├── 收藏页 (/collection) — 用户收藏进度
├── 闯关页 (/challenge) — 按主题/难度闯关
├── 排行榜 (/leaderboard) — 答题积分排行
└── 个人中心 (/profile) — 进度、徽章、设置
```

### 页面节奏
- **首页**: 全屏英雄区（动态诗词壁纸 + 搜索入口）→ 今日推荐 → 分类快捷入口 → 热门诗词
- **诗词详情页**: 配图区 → 诗词正文（大字居中）→ 作者信息 → 翻译/注释 tab → 相关诗词 → 答题区
- **移动端**: 单栏垂直流，支持左右滑动切换上/下一首

### 响应式断点
```
mobile:  < 640px
tablet:  640px - 1024px
desktop: > 1024px
```

---

## 4. Features & Interactions

### 4.1 首页
- 动态诗句背景（随机诗词逐字淡入）
- 全局搜索（标题/作者/诗句内容，实时联想）
- 分类卡片：唐诗 / 宋词 / 元曲 / 古文 / 楚辞 / 诗经
- 子分类：按朝代/题材/难度/教材章节
- 每日打卡入口 + 连续天数徽章

### 4.2 诗词详情页
- **顶部**: 配图（AI生成 + 历史名画可切换）with 淡入动画
- **诗词正文**: 书法风格大字居中，支持横屏古典排版
- **Tab 导航**: 翻译 / 注释 / 背景 / 作者
- **上一首 / 下一首**: 底部固定导航条 + 键盘方向键
- **收藏按钮**: 心形，收藏动画（放大+飘心）
- **答题按钮**: 进入测验模块
- **相关诗词**: 时间线相关 / 同作者 / 同题材（横向滚动卡片）

### 4.3 答题系统
- 每首诗 3-5 道测验题（选择/判断）
- 即时反馈：答对 → confetti + 积分动画；答错 → 正确解析
- 连续答对触发 combo 奖励（×1.5 / ×2 积分加成）
- 答题结束：总分 + 徽章奖励 + 下一首推荐

### 4.4 搜索
- 实时搜索（标题/作者/诗句内容/关键词）
- 搜索历史 + 热门搜索
- 按类型筛选（诗/词/文）+ 按朝代 + 按难度

### 4.5 收藏 & 进度
- 收藏 → 进度追踪（未学/在学/已掌握）
- 掌握条件：答题正确率 ≥ 80%
- 成就徽章：初识诗人 / 词林高手 / 文言大师 / 通关全套等

### 4.6 闯关模式
- 按主题分类闯关（一组诗词为一个关卡）
- 通关解锁下一个关卡
- 星星评分（1-3星，取决于答题正确率和时间）

### 4.7 随机探索
- "随机一首"入口
- "今日诗词"每日推送

---

## 5. Component Inventory

### Core Components
| 组件 | 状态 |
|------|------|
| `PoemCard` | default / hover (lift) / selected / mastered / locked |
| `SearchBar` | empty / typing / loading / results / no-results |
| `PoemDetail` | loading / loaded / error |
| `QuizCard` | unanswered / correct / wrong / disabled |
| `TabBar` | active tab indicator (slide animation) |
| `CategoryChip` | default / active |
| `BookmarkButton` | unbookmarked / bookmarked (pulse animation) |
| `ProgressRing` | 0-100% animated fill |
| `Badge` | locked / unlocked / new |
| `SwipeCard` | idle / swiping-left / swiping-right |
| `ConfettiEffect` | trigger on quiz success |

---

## 6. Technical Architecture

### 技术栈
```
Frontend:   Vite + React 18 + TypeScript + TailwindCSS
Backend:    Supabase (PostgreSQL + Auth + Storage + Edge Functions)
            Node.js API (可选自定义后端)
Deploy:     Vercel (Frontend) + Supabase Cloud (Backend)
Mobile:     响应式网页 + 后续扩展 PWA / React Native
```

### 数据架构
```
poems          — 诗词全文（元数据、内容、分类）
authors        — 作者生平、简介、头像
categories     — 分类体系（朝代/题材/难度/教材章节）
quiz_items     — 每首诗对应的测验题
user_progress  — 用户学习进度、答题记录
user_favorites — 用户收藏
user_badges    — 用户徽章
daily_poem     — 每日推送记录
```

### API 设计（Supabase REST + Edge Functions）
```
GET  /poems           — 列表（支持分页、筛选）
GET  /poems/:id       — 详情（含作者、相关诗词）
GET  /poems/search?q  — 全文搜索
GET  /authors/:id     — 作者详情
GET  /categories       — 分类列表
POST /quiz/submit      — 提交答题记录
GET  /progress         — 当前用户进度
PATCH /progress/:pid   — 更新进度
```

### 图片资源策略
```
AI 生成图片: 存储在 Supabase Storage (poetry-images/ai/)
历史名画:    存储在 Supabase Storage (poetry-images/historical/)
书法作品:    存储在 Supabase Storage (poetry-images/calligraphy/)
```

---

## 7. Content Scope

### 第一期内容清单（约 600 首/篇）
| 类别 | 数量 | 来源 |
|------|------|------|
| 唐诗三百首 | 300+ | 公开古诗词API + 手动补全 |
| 宋词三百首 | 300+ | 公开古诗词API + 手动补全 |
| 古文观止 | 88 | 完整收录 |
| 小学必背古诗 | ~75 | 语文教材 |
| 初中古诗文 | ~60 | 语文教材 |
| 高中古诗文 | ~40 | 语文教材 |

### 图片生成计划
- 每个诗词生成 1 张 AI 配图（符合诗词意境）
- 优先历史名画（故宫博物院等公开资源）
- 书法作品作为补充资源
- 使用 image_synthesize 工具批量生成

---

## 8. Roadmap

### Phase 1: 数据与基础设施（当前）
- [ ] 项目脚手架 + 规范文档
- [ ] Supabase 项目初始化 + 数据库 Schema
- [ ] 数据采集脚本（唐诗300首等）
- [ ] 基础 UI 组件库

### Phase 2: 核心功能
- [ ] 诗词列表页 + 分类浏览
- [ ] 诗词详情页（正文、翻译、注释）
- [ ] AI 图片生成（批量）
- [ ] 作者页

### Phase 3: 游戏化
- [ ] 答题系统
- [ ] 进度追踪 + 徽章系统
- [ ] 闯关模式
- [ ] 收藏系统

### Phase 4: 完善与扩展
- [ ] 搜索功能
- [ ] 历史名画 + 书法资源
- [ ] 移动端优化（刷屏交互）
- [ ] PWA 支持
