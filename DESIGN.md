# 诗意山河 - 设计规范 (Design Specification)

> Design Language: Modern Chinese Classical · Gamified Learning · Mobile-First

---

## 1. Design Principles

### 1.1 Core Philosophy
- **国风现代化** — 保留中国古典美学（书法、水墨、金色点缀），用现代 UI 技法表达
- **游戏化学习** — 每一个正确操作都有即时反馈，连击/徽章/成就让学习上瘾
- **无摩擦交互** — 3岁到高三都能用，零学习成本

### 1.2 Design Meta
参考 Apple Human Interface + Figma Design Systems + Duolingo gamification

---

## 2. Color Palette

### 2.1 Primary Colors (玄色系统)
```
--ink-950:   #05050F   // 最深背景
--ink-900:   #0A0A1A   // 深色背景
--ink-800:   #0F0F23   // 主背景 (暗色)
--ink-700:   #1A1A2E   // 卡片背景
--ink-600:   #252540   // 悬浮卡片
--ink-500:   #2E2E50   // 边框线
```

### 2.2 Accent Colors (金色系统)
```
--gold-500:  #D4A843   // 主金色 (品牌色)
--gold-400:  #E8C06A   // 亮金色 (hover)
--gold-300:  #F0D48A   // 浅金色 (文字)
--gold-600:  #A8852E   // 深金色 (强调)
--gold-gradient: linear-gradient(135deg, #D4A843 0%, #F0D48A 50%, #D4A843 100%)
```

### 2.3 Semantic Colors
```
--jade-500:  #4ADE80   // 正确/成功
--rose-500:  #F87171   // 错误/警告
--cyan-500:  #22D3EE   // 提示/信息
--purple-500: #A78BFA  // 成就/奖励
```

### 2.4 Light Mode Overrides
```
--bg-primary:   #FAFAF8   // 米白背景
--bg-secondary: #F5F0E8   // 暖白卡片
--text-primary: #1C1C1E   // 深墨文字
--text-secondary:#6E6E73  // 灰色辅助文字
```

---

## 3. Typography

### 3.1 Font Stack
```css
/* 英文/UI文字 */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* 诗词正文 — Ma Shan Zheng (Google Fonts) */
font-family: 'Ma Shan Zheng', 'STKaiti', 'KaiTi', serif;

/* 标题装饰 */
font-family: 'Noto Serif SC', 'STHeiti', serif;
```

### 3.2 Type Scale
```
--text-xs:   0.75rem  / 12px  — 标签、徽章
--text-sm:   0.875rem / 14px  — 辅助说明
--text-base: 1rem     / 16px  — 正文
--text-lg:   1.125rem / 18px  — 大正文
--text-xl:   1.25rem  / 20px  — 小标题
--text-2xl:  1.5rem   / 24px  — 章节标题
--text-3xl:  1.875rem / 30px  — 页面标题
--text-4xl:  2.25rem  / 36px  — 大标题
--text-5xl:  3rem     / 48px  — 诗词大字
--text-hero: 4rem     / 64px  — 封面诗词
```

### 3.3 Poem Display
- 诗词正文: `text-4xl` ~ `text-5xl`，行高 `2.2`，字间距 `0.1em`
- 译文: `text-base`，颜色 `text-secondary`
- 注释: `text-sm`，左侧竖线装饰

---

## 4. Spacing System

```css
--space-1:  4px    --space-2:  8px    --space-3:  12px
--space-4:  16px   --space-5:  20px   --space-6:  24px
--space-8:  32px   --space-10: 40px   --space-12: 48px
--space-16: 64px   --space-20: 80px   --space-24: 96px

/* 页面内边距 */
--page-padding:  clamp(16px, 4vw, 48px)
--card-padding:  20px ~ 24px
--section-gap:  32px ~ 48px
```

---

## 5. Motion & Animation

### 5.1 Core Principles
- **Entrance**: fade + slide-up, 300-400ms, ease-out
- **Exit**: fade + slide-down, 200ms, ease-in
- **Micro-interactions**: 150-200ms, spring/bounce easing
- **Page transitions**: 350ms, shared element transitions
- **Quiz celebrations**: 600-1200ms, particle effects

### 5.2 Animation Tokens
```css
--ease-bounce:   cubic-bezier(0.34, 1.56, 0.64, 1)   // 弹性
--ease-smooth:   cubic-bezier(0.4, 0, 0.2, 1)         // 平滑
--ease-out:      cubic-bezier(0, 0, 0.2, 1)            // 退出
--duration-fast:   150ms
--duration-base:  300ms
--duration-slow:  500ms
--duration-celebration: 1200ms
```

### 5.3 Gamification Animations
- **Correct answer**: 绿色波纹扩散 + 数字 +100 向上飘动
- **Wrong answer**: 红色左右摇晃 + 正确答案高亮
- **连击 (Combo)**: 随 combo 数增长的粒子喷射
- **徽章获得**: 全屏金光 + 徽章掉落动画
- **随机诗词卡片**: 3D 翻书效果

---

## 6. Layout System

### 6.1 Grid
```css
/* 移动端: 单列流 */
grid-template-columns: 1fr

/* 平板: 2列 */
@media (min-width: 640px)
  grid-template-columns: repeat(2, 1fr)

/* 桌面: 3列+ */
@media (min-width: 1024px)
  grid-template-columns: repeat(3, 1fr)
  sidebar: 280px
```

### 6.2 Page Structure

**首页 (Home)**
```
┌─────────────────────────────┐
│  Logo + 搜索框 + 用户头像  │  ← 顶部栏 56px
├─────────────────────────────┤
│  🎯 今日目标 / 连续天数    │  ← 状态卡片
├─────────────────────────────┤
│  📖 继续学习 (横向滚动)    │  ← 最近阅读
├─────────────────────────────┤
│  🌟 本周挑战 / 成就进度    │
├─────────────────────────────┤
│  🔥 推荐诗词 (卡片网格)    │
├─────────────────────────────┤
│  📚 分类浏览               │  ← 分类入口
└─────────────────────────────┘
```

**诗词详情页 (Poem Detail)**
```
┌─────────────────────────────┐
│ ← 返回   [上一首][下一首]  │  ← 顶部导航
├─────────────────────────────┤
│   [AI 意境图 / 历史名画]    │  ← 主图区 40vh
│   [ Tab: 原文 | 译文 | 注释 | 背景 | 习题 ] │
├─────────────────────────────┤
│   诗词正文 (大字居中)       │
│   作者: 王维  朝代: 唐      │  ← 作者信息条
├─────────────────────────────┤
│   译文区域 (可折叠)         │
├─────────────────────────────┤
│   注释区域 (可折叠)         │
├─────────────────────────────┤
│   相关诗词 (横向卡片)       │
├─────────────────────────────┤
│   练习题 (互动答题)         │
└─────────────────────────────┘
```

**发现页 (Discover)**
```
┌─────────────────────────────┐
│  🔍 搜索 / 热搜词          │
├─────────────────────────────┤
│  [全部] [唐诗] [宋词] [古文] [小学] [初中] [高中] │ ← 筛选标签
├─────────────────────────────┤
│  ⚡ 随机来一首              │  ← 快捷入口
├─────────────────────────────┤
│  📋 分类列表 (流式瀑布)    │
│   ┌────┐ ┌────┐            │
│   │  诗 │ │  词 │            │
│   └────┘ └────┘            │
└─────────────────────────────┘
```

**挑战页 (Challenge)**
```
┌─────────────────────────────┐
│  ⏱️ 计时挑战 / 正确率      │
│  [████████░░] 8/10         │
├─────────────────────────────┤
│  题目: 这句诗的意思是?     │
│  选项 A / B / C / D        │
│  ✓ 正确！+10 xp            │
├─────────────────────────────┤
│  🏆 本次获得: 徽章碎片 x3  │
└─────────────────────────────┘
```

### 6.3 Mobile Gestures
- **滑动翻页**: 诗词详情页支持上下/左右滑动翻页
- **长按收藏**: 长按任意诗词卡片弹出菜单（收藏/分享/背诵）
- **下拉刷新**: 发现页下拉刷新推荐内容
- **双击点赞**: 双击诗词正文区域触发❤️动画

---

## 7. Component Library

### 7.1 PoemCard
- 状态: default / hover / active / completed / locked
- 显示: 标题 + 作者 + 朝代 + 难度星标 + AI缩略图
- 悬浮: 卡片微微上浮 + 金色边框光晕

### 7.2 SwipeCard
- TikTok/Douyin 全屏滑动体验
- 向上滑动 → 下一首 + 3D翻页动画
- 显示: 全屏背景图 + 诗词叠加 + 底部操作栏

### 7.3 QuizCard
- 选择题: A/B/C/D 大按钮，hover 放大
- 正确: 绿色扩散 + ✓动画
- 错误: 红色摇晃 + 显示正确答案
- 连击条: combo x N 显示 + 进度条

### 7.4 BadgeCard
- 状态: locked / unlocked / new
- 获得时: 全屏金光 + 徽章掉落
- 显示: 图标 + 名称 + 进度

### 7.5 ProgressRing
- 圆形进度环，显示学习完成度
- 中心显示数字/百分比
- 动画: 顺时针填充

### 7.6 AIImageCard
- 16:9 或 4:3 比例
- 左下: 诗词标题
- 右下: 来源标签 (AI生成/历史名画/书法)
- 悬浮: 放大预览 + 下载按钮

---

## 8. Gamification System

### 8.1 XP & Level
```javascript
const XP_REWARDS = {
  read_poem: 5,        // 阅读一首诗词
  complete_quiz: 10,   // 完成一套练习
  perfect_quiz: 25,    // 满分练习
  streak_day: 15,      // 每日连续
  first_try: 5,       // 首次答对
  combo_3: 10,         // 3连击
  combo_5: 25,         // 5连击
  combo_10: 50,        // 10连击
}
```

### 8.2 Badges
| 徽章 | 名称 | 条件 |
|------|------|------|
| 🌱 | 诗路新手 | 完成第一首诗词 |
| 📚 | 诗书饱读 | 学习50首诗词 |
| 🎯 | 百发百中 | 连续答对10题 |
| 🔥 | 一日千里 | 一天学习20首 |
| ⭐ | 诗仙 | 集齐所有分类徽章 |
| 🏆 | 诗圣 | 完成所有诗词 |
| 💎 | 满分大师 | 10次满分答题 |
| 🌙 | 夜读人 | 深夜学习（22:00后） |
| 🎰 | 幸运诗人 | 随机抽到李白诗词 |

### 8.3 Streak System
- 连续学习 N 天: 奖励翻倍
- 断签提醒: 推送通知
- 补签卡: 可用 XP 购买

---

## 9. Data Architecture

### 9.1 Content Schema
```typescript
interface Poem {
  id: string
  title: string
  author: string
  authorId: string
  dynasty: 'Tang' | 'Song' | 'Yuan' | 'Ming' | 'Qing' | 'Modern' | 'Pre-Qin' | 'Han' | 'Wei' | 'Jin'
  category: 'shi' | 'ci' | 'prose' | 'yuefu' | 'ci_excerpt'
  difficulty: 1 | 2 | 3 | 4 | 5
  content: string        // 原文
  translation: string    // 全文翻译
  annotation: string     // 注释
  background: string     // 创作背景
  audioUrl?: string      // 朗诵音频

  // 多媒体
  aiImagePrompt: string  // AI图片生成Prompt
  aiImageUrl?: string    // AI生成图
  historicalPaintings: { url: string; title: string; artist: string; year: string }[]
  calligraphyUrls: { url: string; title: string; artist: string }[]

  // 关联
  relatedPoemIds: string[]
  tags: string[]
  theme: string[]        // 主题标签: ['思乡', '山水', '爱国']

  // 教学
  schoolLevel?: 'primary' | 'middle' | 'high' | 'exam'
  schoolTextbook?: string
  memo?: string          // 背诵提示

  quizIds: string[]
}
```

---

## 10. Responsive Breakpoints

```css
/* Mobile First */
--mobile:   max-width: 480px
--phablet:  min-width: 481px
--tablet:   min-width: 768px
--desktop:  min-width: 1024px
--wide:     min-width: 1280px
--ultra:    min-width: 1536px

/* Touch Targets: min 44px */
```

---

## 11. Accessibility

- 所有图片有 alt 描述
- 颜色对比度 ≥ 4.5:1
- 键盘导航支持
- 减小动作（prefers-reduced-motion）
- ARIA labels on interactive elements
