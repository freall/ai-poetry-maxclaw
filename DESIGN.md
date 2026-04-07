# DESIGN.md — 诗意山河视觉与交互设计规范

> 本文档定义了项目的所有设计标准，所有 UI 变更必须遵循本文档。

---

## 1. Design Principles

### 1.1 新宋式极简主义
- 以**留白**为核心——大量留白传达文人气质，内容自然成为视觉焦点
- **层次分明**：标题 > 诗词正文 > 翻译 > 注释，视觉权重递减
- **克制用色**：主色不超过 3 种，加1-2 种点缀色
- 装饰元素服务于内容，不喧宾夺主

### 1.2 移动优先
- 所有设计从 375px 宽度开始，向大屏扩展
- 触控优先：所有可点击元素 ≥ 44×44px
- 拇指区交互（底部导航、滑动切换）
- 内容密度在移动端更稀疏（减少阅读压力）

### 1.3 性能即设计
- 首屏加载 < 2s，LCP < 1.5s
- 图片懒加载 + CDN 加速
- 骨架屏替代 loading spinner

---

## 2. Color System

### 2.1 核心色板（Design Tokens）
```css
:root {
  /* 深色主题为主 */
  --color-bg:         #0f0f23;   /* 玄色 - 主背景 */
  --color-surface:    #1a1a2e;   /* 墨色 - 卡片背景 */
  --color-surface-2: #16213e;   /* 青墨 - 次级表面 */
  --color-border:     rgba(255,255,255,0.08);
  --color-border-2:  rgba(255,255,255,0.15);

  /* 文字 */
  --color-text:       #f5f0e8;   /* 素纸白 */
  --color-text-2:    #9ca3af;    /* 次级文字 */
  --color-text-3:    #6b7280;   /* 占位符文字 */
  --color-text-inv:  #0f0f23;   /* 反色文字 */

  /* 点缀色 */
  --color-gold:       #d4a843;   /* 古铜金 - 主强调色 */
  --color-coral:      #e07a5f;   /* 胭脂 - 错误/警告 */
  --color-jade:       #81b29a;   /* 青瓷 - 成功/进度 */
  --color-ink:       #4a5568;    /* 淡墨 - 边框/分割线 */

  /* 语义色 */
  --color-primary:    #d4a843;
  --color-success:    #4ade80;
  --color-warning:    #fbbf24;
  --color-error:      #f87171;
  --color-info:      #60a5fa;

  /* 渐变 */
  --grad-gold:   linear-gradient(135deg, #d4a843, #f4d03f);
  --grad-hero:   linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  --grad-card:   linear-gradient(180deg, rgba(255,255,255,0.04), transparent);

  /* 透明度 */
  --opacity-20: 0.2;
  --opacity-50: 0.5;
  --opacity-80: 0.8;
}
```

### 2.2 Typography Scale
```css
:root {
  /* 字体族 */
  --font-display:  "Ma Shan Zheng", "Noto Serif SC", "STKaiti", serif;
  --font-body:     "LXGW WenKai", "Noto Sans SC", system-ui, sans-serif;
  --font-mono:     "JetBrains Mono", "Fira Code", monospace;

  /* 字号 */
  --text-xs:   0.75rem;   /* 12px - 注释 */
  --text-sm:   0.875rem;  /* 14px - 次级文字 */
  --text-base: 1rem;       /* 16px - 正文 */
  --text-lg:   1.125rem;  /* 18px - 标题 */
  --text-xl:   1.25rem;   /* 20px - 副标题 */
  --text-2xl:  1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px - 诗词标题 */
  --text-4xl: 2.25rem;    /* 36px */
  --text-5xl: 3rem;       /* 48px - 诗词大字 */
  --text-6xl:  4rem;       /* 64px - 英雄标题 */

  /* 行高 */
  --leading-tight:  1.25;
  --leading-normal: 1.6;
  --leading-relaxed: 2;
  --leading-poem:   2.2; /* 诗词正文行高 */
}
```

### 2.3 Spacing System
```css
:root {
  --space-1:   4px;
  --space-2:   8px;
  --space-3:   12px;
  --space-4:   16px;
  --space-5:   20px;
  --space-6:   24px;
  --space-8:   32px;
  --space-10:  40px;
  --space-12:  48px;
  --space-16:  64px;
  --space-20:  80px;
  --space-24:  96px;
}
```

---

## 3. Component Design

### 3.1 Card（卡片）
```css
.poem-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: var(--space-4);
  transition: transform 150ms ease, box-shadow 150ms ease;
}
.poem-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(212,168,67,0.1);
}
```

### 3.2 Button（按钮）
```css
.btn-primary {
  background: var(--grad-gold);
  color: #0f0f23;
  font-weight: 700;
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: transform 150ms, box-shadow 150ms;
}
.btn-primary:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 20px rgba(212,168,67,0.3);
}
.btn-primary:active { transform: scale(0.98); }
```

### 3.3 诗词正文排版
```css
.poem-content {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  line-height: var(--leading-poem);
  text-align: center;
  color: var(--color-text);
  /* 竖排支持（未来可选）*/
  writing-mode: horizontal-tb; /* 暂时用横排 */
  letter-spacing: 0.1em; /* 诗词正文加大字间距 */
}
```

### 3.4 底部导航（移动端）
```css
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: rgba(15,15,35,0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
  padding-bottom: env(safe-area-inset-bottom);
}
```

---

## 4. Animation Specification

### 4.1 全局动画
```css
:root {
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);     /* 自然缓出 */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* 弹性 */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
}
```

### 4.2 页面过渡
```css
/* 前进：新页从右滑入 */
.page-enter { animation: slideInRight 250ms var(--ease-out); }
@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}

/* 后退：新页从左滑入 */
.page-back { animation: slideInLeft 250ms var(--ease-out); }
```

### 4.3 成功动画（答题）
```css
/* 礼花效果：60个彩色粒子，2.5s 散落 */
@keyframes confetti {
  0%   { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}

/* 弹跳 */
@keyframes bounce {
  0%,100% { transform: scale(1); }
  50%     { transform: scale(1.15); }
}
```

### 4.4 刷屏交互（移动端）
```css
.swipe-card {
  transition: transform 100ms var(--ease-out);
  touch-action: pan-y;
}
/* 滑动方向检测：滑动 30% 屏幕宽度触发切换 */
```

---

## 5. Responsive Breakpoints

```css
/* Mobile First */
.container { max-width: 100%; padding: 0 var(--space-4); }

@media (min-width: 640px) {
  .container { padding: 0 var(--space-6); }
  /* 诗词详情：左侧正文 + 右侧信息 */
  .poem-detail-layout { grid-template-columns: 2fr 1fr; }
}

@media (min-width: 1024px) {
  .container { max-width: 1200px; margin: 0 auto; }
  /* 桌面：左侧边栏导航 */
  .app-layout { display: grid; grid-template-columns: 240px 1fr; }
}
```

---

## 6. Accessibility

- 所有颜色对比度 ≥ 4.5:1（WCAG AA）
- 所有图片有 alt 文本
- 键盘可完全导航（Tab / Enter / Escape）
- Focus 状态明显可见：`outline: 2px solid var(--color-gold)`
- ARIA labels 用于图标按钮
- 支持 `prefers-reduced-motion`

---

## 7. Icon Guidelines

- 使用 **Lucide React** 图标库（一致 stroke width: 1.5）
- 自定义图标（印章、传统元素）使用 SVG 内联
- 图标颜色跟随文字色（`currentColor`）
- 尺寸：16/20/24/32px

---

## 8. Image Strategy

### 8.1 AI 生成配图
- 比例：16:9 横向（适合诗词意境展示）
- 风格：传统水墨 + 淡彩（符合诗词氛围）
- 存储：Supabase Storage `poetry-images/ai/{poem_id}.png`

### 8.2 历史名画
- 来源：故宫博物院公开资源、大英博物馆开放文物
- 优先使用无版权或 CC0 授权资源
- 存储：Supabase Storage `poetry-images/historical/`

### 8.3 书法作品
- 存储：Supabase Storage `poetry-images/calligraphy/`
- 作为诗词详情页的补充展示

### 8.4 图片加载
```html
<img src="..." loading="lazy" decoding="async" alt="..." />
<!-- 骨架屏 -->
<div class="skeleton shimmer" />
```

---

## 9. Decorative Elements

- **印章效果**：特定徽章使用红色印章样式（圆形 + 篆体字）
- **水墨边框**：card 边框使用微妙的渐变边框（模拟毛笔边缘）
- **云纹背景**：`/public/decorations/cloud-pattern.svg` 淡色平铺
- **粒子星空**：首页背景微小白点动画

---

*设计规范最后更新: 2026-04-07*
