// ─── Poetry Types ──────────────────────────────────────────────────────────────

export interface Poem {
  id: string
  title: string
  author: string
  authorId: string
  dynasty: 'Tang' | 'Song' | 'Yuan' | 'Ming' | 'Qing' | 'Pre-Qin' | 'Han' | 'Wei' | 'Jin' | 'Modern'
  category: 'shi' | 'ci' | 'fu' | 'prose' | 'songyun'
  content: string        // 原文（如：床前明月光...）
  translation: string    // 现代汉语翻译
  annotation?: string    // 注释
  background?: string    // 创作背景
  audioUrl?: string      // 朗读音频

  // 资源
  aiImageUrl?: string
  historicalImageUrls?: string[]
  calligraphyImageUrls?: string[]

  // 关联
  relatedPoemIds?: string[]
  tags?: string[]        // 主题标签：思乡/送别/山水/战争/...

  // 元数据
  difficulty?: 1 | 2 | 3  // 难度：1=简单/小学 2=中等/初中 3=困难/高中
  source?: string        // 来源：语文教材/古文观止/唐诗三百...
  schoolLevel?: 'primary' | 'middle' | 'high' | 'optional'
}

export interface Author {
  id: string
  name: string
  nickname?: string
  dynasty: Poem['dynasty']
  birthYear?: number
  deathYear?: number
  bio: string           // 生平简介
  portraitUrl?: string
  representativeWorks?: string[]  // 代表作（诗词ID列表）
}

export interface Category {
  id: string
  name: string
  icon: string           // emoji or Lucide icon name
  description?: string
  poemCount?: number
  children?: Category[]
}

export interface QuizItem {
  id: string
  poemId: string
  question: string
  options?: string[]    // 选择题选项
  answer: number        // 正确答案索引（0-based）
  explanation: string    // 解析
  type: 'choice' | 'true-false' | 'fill'
}

// ─── User Types ───────────────────────────────────────────────────────────────

export type PoemProgress = 'not_started' | 'in_progress' | 'mastered'

export interface UserProgress {
  poemId: string
  status: PoemProgress
  quizScore?: number     // 0-100
  quizAttempts?: number
  lastStudiedAt?: string
  masteredAt?: string
}

export interface UserBadge {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: string
  category: 'learning' | 'mastery' | 'streak' | 'special'
}

export interface DailyRecord {
  date: string           // YYYY-MM-DD
  poemsStudied: number
  correctRate: number
  streak: number
}

// ─── UI Types ─────────────────────────────────────────────────────────────────

export type TabId = 'translation' | 'annotation' | 'background' | 'author'

export interface SearchFilters {
  query?: string
  category?: Poem['category']
  dynasty?: Poem['dynasty']
  difficulty?: Poem['difficulty']
  schoolLevel?: Poem['schoolLevel']
  tags?: string[]
}

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
  duration?: number
}
