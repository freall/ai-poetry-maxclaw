import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Sparkles, BookOpen, Trophy, ChevronRight, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { fetchPoems, fetchCategories } from '../lib/data'
import type { Poem, Category } from '../types'

const featuredPoems = [
  { id: 'tang-001', title: '静夜思', author: '李白', dynasty: '唐', category: 'shi', preview: '床前明月光，疑是地上霜。' },
  { id: 'song-ci-001', title: '水调歌头', author: '苏轼', dynasty: '宋', category: 'ci', preview: '明月几时有，把酒问青天。' },
  { id: 'prose-001', title: '陋室铭', author: '刘禹锡', dynasty: '唐', category: 'prose', preview: '山不在高，有仙则名。' },
  { id: 'tang-007', title: '黄鹤楼送孟浩然之广陵', author: '崔颢', dynasty: '唐', category: 'shi', preview: '昔人已乘黄鹤去，此地空余黄鹤楼。' },
]

const heroLines = [
  '床前明月光，疑是地上霜',
  '明月几时有，把酒问青天',
  '大江东去，浪淘尽千古风流人物',
  '山不在高，有仙则名',
  '采菊东篱下，悠然见南山',
  '春眠不觉晓，处处闻啼鸟',
]

function Confetti() {
  const colors = ['#d4a843', '#e07a5f', '#81b29a', '#f4d03f', '#f87171']
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            background: colors[i % colors.length],
            left: `${Math.random() * 100}%`,
            top: '-10px',
            animation: `confettiFall ${1.5 + Math.random() * 2}s ease-in ${Math.random() * 1}s forwards`,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  )
}

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [poems, setPoems] = useState<Poem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [heroLine, setHeroLine] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchPoems({ limit: 6 }).then(({ poems }) => setPoems(poems))
    fetchCategories().then(setCategories)
    let i = 0
    const tick = () => {
      setHeroLine(heroLines[i % heroLines.length])
      i++
    }
    tick()
    const id = setInterval(tick, 4000)
    return () => clearInterval(id)
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/discover?q=${encodeURIComponent(query.trim())}`)
    }
  }

  function quickSearch(dynasty: string) {
    navigate(`/discover?dynasty=${dynasty}`)
  }

  return (
    <div className="min-h-screen bg-bg">
      {showConfetti && <Confetti />}
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-surface to-bg opacity-80" />
          {/* Floating particles */}
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-display text-text mb-4"
          >
            📜 诗意山河
          </motion.h1>

          {/* Hero animated poem line */}
          <div className="h-12 flex items-center justify-center mb-8">
            <motion.p
              key={heroLine}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              className="text-xl md:text-2xl text-gold/80 font-display italic"
            >
              {heroLine}
            </motion.p>
          </div>

          {/* Search */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            onSubmit={handleSearch}
            className="relative max-w-md mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-3" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="搜索诗词、作者或句子..."
                className="w-full pl-12 pr-32 py-4 bg-surface border border-border rounded-full text-text placeholder:text-text-3 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-base"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-grad-gold text-bg font-bold rounded-full hover:opacity-90 transition-opacity text-sm"
              >
                搜索
              </button>
            </div>
          </motion.form>

          {/* Quick access chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {['唐诗', '宋词', '古文', '诗经', '楚辞'].map(cat => (
              <button
                key={cat}
                onClick={() => quickSearch(cat === '唐诗' ? 'Tang' : cat === '宋词' ? 'Song' : cat)}
                className="px-4 py-2 bg-surface border border-border rounded-full text-sm text-text-2 hover:border-gold/50 hover:text-gold transition-all cursor-pointer"
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-text-3 rounded-full flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-text-3 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="px-4 pb-16 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-gold" />
            分类浏览
          </h2>
          <Link to="/discover" className="text-gold text-sm flex items-center gap-1 hover:underline">
            查看全部 <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.slice(0, 10).map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl p-5 cursor-pointer"
              style={{ background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)` }}
              onClick={() => navigate(`/discover?category=${cat.id}`)}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="font-bold text-text text-sm">{cat.name}</div>
              {cat.poemCount && (
                <div className="text-text-3 text-xs mt-1">{cat.poemCount}首</div>
              )}
              <div className="absolute inset-0 border border-transparent group-hover:border-gold/30 rounded-2xl transition-all" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Poems */}
      <section className="px-4 pb-20 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text flex items-center gap-2">
            <Star className="w-6 h-6 text-gold" />
            精选诗词
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredPoems.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/poem/${p.id}`}
                className="block group p-5 bg-surface rounded-2xl border border-border hover:border-gold/40 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-0.5 bg-gold/10 text-gold rounded-full">{p.dynasty}</span>
                  <span className="text-xs text-text-3">{p.category === 'shi' ? '诗' : p.category === 'ci' ? '词' : '文'}</span>
                </div>
                <h3 className="font-display text-xl text-text mb-1">{p.title}</h3>
                <p className="text-sm text-text-2 mb-3">{p.author}</p>
                <p className="text-xs text-text-3 font-display leading-relaxed line-clamp-2 italic">
                  {p.preview}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Banner */}
      <section className="px-4 pb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: '首诗词', value: '1,200+', icon: '📜' },
            { label: '位诗人', value: '300+', icon: '👤' },
            { label: '道测验', value: '5,000+', icon: '✏️' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 bg-surface rounded-2xl border border-border"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gold font-mono">{stat.value}</div>
              <div className="text-sm text-text-3 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
