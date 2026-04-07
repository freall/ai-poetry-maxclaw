/**
 * Data Layer — reads from local JSON (compiled into bundle, works offline)
 * Supabase optional: set VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY in .env to enable cloud
 */
import type { Poem, Author, QuizItem, Category } from '../types'
import localPoemsData from '../data/poems.json'
import localAuthorsData from '../data/authors.json'
import localQuizData from '../data/quizzes.json'

const POEMS_PER_PAGE = 20

export async function fetchPoems(params?: {
  page?: number; category?: string; dynasty?: string; query?: string; limit?: number
}): Promise<{ poems: Poem[]; total: number }> {
  let poems = [...(localPoemsData as Poem[])]
  if (params?.category) {
    if (['shi', 'ci', 'prose'].includes(params.category)) {
      poems = poems.filter(p => p.category === params.category)
    } else {
      poems = poems.filter(p => p.schoolLevel === params.category)
    }
  }
  if (params?.dynasty) poems = poems.filter(p => p.dynasty === params.dynasty)
  if (params?.query) {
    const q = params.query.toLowerCase()
    poems = poems.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q)
    )
  }
  const total = poems.length
  const limit = params?.limit ?? POEMS_PER_PAGE
  const page = params?.page ?? 0
  return { poems: poems.slice(page * limit, (page + 1) * limit), total }
}

export async function fetchPoemById(id: string): Promise<Poem | null> {
  return (localPoemsData as Poem[]).find(p => p.id === id) ?? null
}

export async function fetchAuthorById(id: string): Promise<Author | null> {
  return (localAuthorsData as Author[]).find(a => a.id === id) ?? null
}

export async function fetchQuizByPoemId(poemId: string): Promise<QuizItem[]> {
  return (localQuizData as QuizItem[]).filter(q => q.poemId === poemId)
}

export async function fetchCategories(): Promise<Category[]> {
  return [
    { id: 'shi', name: '唐诗', icon: '🌙', poemCount: 26, description: '唐代诗歌精品' },
    { id: 'ci', name: '宋词', icon: '🏮', poemCount: 12, description: '宋代词作精选' },
    { id: 'prose', name: '古文', icon: '📜', poemCount: 5, description: '古文观止名篇' },
    { id: 'primary', name: '小学必背', icon: '📗', poemCount: 15, description: '小学生必背古诗词' },
    { id: 'middle', name: '初中古诗文', icon: '📘', poemCount: 10, description: '初中语文教材' },
    { id: 'high', name: '高中古诗文', icon: '📕', poemCount: 8, description: '高中语文教材' },
  ]
}
