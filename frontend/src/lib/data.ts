/**
 * Data Layer — reads from Supabase when configured, falls back to local JSON
 * Works offline (local) and online (Supabase) seamlessly
 */
import type { Poem, Author, QuizItem, Category } from '../types'
import { supabase, isSupabaseConfigured } from './supabase'
import localPoemsData from '../data/poems.json'
import localAuthorsData from '../data/authors.json'
import localQuizData from '../data/quizzes.json'

const POEMS_PER_PAGE = 20

// ─── Public API ────────────────────────────────────────────────────────────

export async function fetchPoems(params?: {
  page?: number; category?: string; dynasty?: string; query?: string; limit?: number
}): Promise<{ poems: Poem[]; total: number }> {
  if (isSupabaseConfigured && supabase) {
    return fetchPoemsFromSupabase(params)
  }
  return fetchPoemsLocal(params)
}

export async function fetchPoemById(id: string): Promise<Poem | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('poems').select('*').eq('id', id).single()
    if (error || !data) return fetchPoemLocalById(id)
    return normalizePoem(data)
  }
  return fetchPoemLocalById(id)
}

export async function fetchAuthorById(id: string): Promise<Author | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('authors').select('*').eq('id', id).single()
    if (error || !data) return fetchAuthorLocalById(id)
    return normalizeAuthor(data)
  }
  return fetchAuthorLocalById(id)
}

export async function fetchQuizByPoemId(poemId: string): Promise<QuizItem[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('quiz_items').select('*').eq('poem_id', poemId)
    if (error || !data) return fetchQuizLocalByPoemId(poemId)
    return data.map(normalizeQuizItem)
  }
  return fetchQuizLocalByPoemId(poemId)
}

export async function fetchCategories(): Promise<Category[]> {
  return [
    { id: 'shi', name: '唐诗', icon: '🌙', poemCount: 26, description: '唐代诗歌精品' },
    { id: 'ci', name: '宋词', icon: '🏮', poemCount: 5, description: '宋代词作精选' },
    { id: 'prose', name: '古文', icon: '📜', poemCount: 4, description: '古文观止名篇' },
    { id: 'primary', name: '小学必背', icon: '📗', poemCount: 15, description: '小学生必背古诗词' },
    { id: 'middle', name: '初中古诗文', icon: '📘', poemCount: 10, description: '初中语文教材' },
    { id: 'high', name: '高中古诗文', icon: '📕', poemCount: 8, description: '高中语文教材' },
  ]
}

// ─── Supabase implementation ────────────────────────────────────────────────

async function fetchPoemsFromSupabase(params?: {
  page?: number; category?: string; dynasty?: string; query?: string; limit?: number
}): Promise<{ poems: Poem[]; total: number }> {
  if (!supabase) return fetchPoemsLocal(params)
  let query = supabase.from('poems').select('*', { count: 'exact' })
  if (params?.category && ['shi','ci','prose'].includes(params.category))
    query = query.eq('category', params.category)
  else if (params?.category)
    query = query.eq('school_level', params.category)
  if (params?.dynasty) query = query.eq('dynasty', params.dynasty)
  if (params?.query) {
    query = query.or(`title.ilike.%${params.query}%,author.ilike.%${params.query}%`)
  }
  const limit = params?.limit ?? POEMS_PER_PAGE
  const page = params?.page ?? 0
  query = query.range(page * limit, (page + 1) * limit - 1)
  const { data, error, count } = await query
  if (error) { console.error('Supabase error:', error); return fetchPoemsLocal(params) }
  return { poems: (data ?? []).map(normalizePoem), total: count ?? 0 }
}

// ─── Local fallback ────────────────────────────────────────────────────────

async function fetchPoemsLocal(params?: {
  page?: number; category?: string; dynasty?: string; query?: string; limit?: number
}): Promise<{ poems: Poem[]; total: number }> {
  let poems = [...(localPoemsData as Poem[])]
  if (params?.category) {
    if (['shi','ci','prose'].includes(params.category))
      poems = poems.filter(p => p.category === params.category)
    else
      poems = poems.filter(p => p.schoolLevel === params.category)
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

async function fetchPoemLocalById(id: string): Promise<Poem | null> {
  return (localPoemsData as Poem[]).find(p => p.id === id) ?? null
}

async function fetchAuthorLocalById(id: string): Promise<Author | null> {
  return (localAuthorsData as Author[]).find(a => a.id === id) ?? null
}

async function fetchQuizLocalByPoemId(poemId: string): Promise<QuizItem[]> {
  return (localQuizData as QuizItem[]).filter(q => q.poemId === poemId)
}

// ─── Normalizers ───────────────────────────────────────────────────────────

function normalizePoem(r: any): Poem {
  return {
    id: r.id, title: r.title, author: r.author, authorId: r.author_id ?? r.authorId ?? '',
    dynasty: r.dynasty, category: r.category, difficulty: r.difficulty ?? 1,
    content: r.content, translation: r.translation ?? '',
    annotation: r.annotation ?? '', background: r.background ?? '',
    aiImageUrl: r.ai_image_url ?? r.aiImageUrl ?? '',
    historicalImageUrls: r.historical_image_urls ?? r.historicalImageUrls ?? [],
    calligraphyImageUrls: r.calligraphy_image_urls ?? r.calligraphyImageUrls ?? [],
    relatedPoemIds: r.related_poem_ids ?? r.relatedPoemIds ?? [],
    tags: r.tags ?? [], source: r.source ?? '', schoolLevel: r.school_level ?? r.schoolLevel ?? '',
  }
}

function normalizeAuthor(r: any): Author {
  return {
    id: r.id, name: r.name, nickname: r.nickname ?? '',
    dynasty: r.dynasty,
    birthYear: r.birth_year ?? r.birthYear,
    deathYear: r.death_year ?? r.deathYear,
    bio: r.bio ?? '', portraitUrl: r.portrait_url ?? r.portraitUrl ?? '',
    representativeWorks: r.representative_works ?? r.representativeWorks ?? [],
  }
}

function normalizeQuizItem(r: any): QuizItem {
  return {
    id: r.id, poemId: r.poem_id ?? r.poemId ?? '',
    question: r.question, options: r.options ?? [],
    answer: r.answer ?? 0, explanation: r.explanation ?? '', type: r.type ?? 'choice',
  }
}
