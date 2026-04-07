import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Sparkles, Flame, Trophy, ChevronRight, Shuffle, Star, Zap, Target, TrendingUp } from 'lucide-react'
import { fetchPoems, fetchCategories } from '../lib/data'
import type { Poem, Category } from '../types'

// ── Gamification State ──────────────────────────────────────────────────────
function getXP(): number { return parseInt(localStorage.getItem('poetry_xp') || '0') }
function getStreak(): number { return parseInt(localStorage.getItem('poetry_streak') || '0') }
function getBadges(): string[] { return JSON.parse(localStorage.getItem('poetry_badges') || '[]') }
function addXP(n: number) {
  const cur = getXP()
  localStorage.setItem('poetry_xp', String(cur + n))
  if (cur + n >= 50 && !getBadges().includes('新手')) {
    localStorage.setItem('poetry_badges', JSON.stringify([...getBadges(), '新手']))
  }
}

const LEVELS = [
  { min: 0,   name: '诗童',    emoji: '📗', color: 'text-green-400' },
  { min: 100,  name: '诗童',    emoji: '📘', color: 'text-blue-400' },
  { min: 300,  name: '诗童',    emoji: '📙', color: 'text-yellow-400' },
  { min: 600,  name: '诗生',    emoji: '🎓', color: 'text-orange-400' },
  { min: 1000, name: '诗士',    emoji: '📜', color: 'text-red-400' },
  { min: 2000, name: '诗狂',    emoji: '🎭', color: 'text-purple-400' },
  { min: 5000, name: '诗仙',    emoji: '🌟', color: 'text-gold' },
]

function getLevel(xp: number) {
  return [...LEVELS].reverse().find(l => xp >= l.min) || LEVELS[0]
}

// ── Components ────────────────────────────────────────────────────────────

function XPBar({ xp }: { xp: number }) {
  const level = getLevel(xp)
  const next = LEVELS.find(l => l.min > xp)
  const pct = next ? Math.round((xp / next.min) * 100) : 100
  return (
    <div className="bg-bg-secondary rounded-2xl p-4 border border-border">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-text-2">等级 {level.name}</span>
        <span className="text-xs text-gold font-bold">{xp} XP</span>
      </div>
      <div className="h-2 bg-ink-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-gold to-yellow-300 rounded-full"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </div>
  )
}

function StreakBadge({ streak }: { streak: number }) {
  return (
    <motion.div
      initial={{ scale: 0 }} animate={{ scale: 1 }}
      className="flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-4"
    >
      <Flame className="w-6 h-6 text-orange-400" />
      <div>
        <p className="text-orange-400 font-bold text-lg">{streak}天</p>
        <p className="text-xs text-text-2">连续学习</p>
      </div>
    </motion.div>
  )
}

function CategoryCard({ cat, onClick }: { cat: Category; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="flex-shrink-0 bg-bg-secondary rounded-2xl p-4 border border-border hover:border-gold/40 transition-all text-left min-w-[140px]"
    >
      <span className="text-3xl">{cat.icon}</span>
      <p className="font-display text-sm text-text mt-1">{cat.name}</p>
      <p className="text-xs text-text-3 mt-0.5">{cat.poemCount}篇</p>
    </motion.button>
  )
}

function PoemCard({ poem, onClick, index }: { poem: Poem; onClick: () => void; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-bg-secondary rounded-2xl border border-border hover:border-gold/40 transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="h-32 bg-gradient-to-br from-gold/10 to-jade-500/5 rounded-t-2xl flex items-center justify-center">
        <span className="text-4xl opacity-30 group-hover:opacity-60 transition-opacity">{poem.category === 'ci' ? '🏮' : poem.category === 'prose' ? '📜' : '🌙'}</span>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs px-2 py-0.5 bg-gold/10 text-gold rounded-full">{poem.dynasty}</span>
          {poem.difficulty >= 3 && <span className="text-xs text-red-400">难点</span>}
        </div>
        <h3 className="font-display text-text text-base truncate">{poem.title}</h3>
        <p className="text-xs text-text-2 mt-0.5">{poem.author}</p>
        <p className="text-xs text-text-3 mt-1 line-clamp-2">{poem.content.split('\n')[0]}</p>
      </div>
    </motion.div>
  )
}

function RandomPoemCard({ onRoll }: { onRoll: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
      onClick={onRoll}
      className="w-full bg-gradient-to-r from-gold/20 to-amber-500/10 border border-gold/30 rounded-2xl p-5 flex items-center gap-4"
    >
      <Shuffle className="w-8 h-8 text-gold flex-shrink-0" />
      <div className="text-left">
        <p className="text-gold font-display text-sm">随机来一首</p>
        <p className="text-text-2 text-xs mt-0.5">随机抽取一篇诗词开始学习</p>
      </div>
      <ChevronRight className="w-5 h-5 text-gold ml-auto" />
    </motion.button>
  )
}

function QuickAction({ icon: Icon, label, value, color, onClick }: {
  icon: React.ElementType; label: string; value: string; color: string; onClick: () => void
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex-1 bg-bg-secondary rounded-xl p-3 flex flex-col items-center gap-1 border border-border"
    >
      <Icon className={`w-5 h-5 ${color}`} />
      <p className="text-xs text-text-2">{label}</p>
      <p className={`text-sm font-bold ${color}`}>{value}</p>
    </motion.button>
  )
}

export default function HomePage() {
  const navigate = useNavigate()
  const [poems, setPoems] = useState<Poem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [xp, setXP] = useState(0)
  const [streak, setStreak] = useState(0)
  const [dice, setDice] = useState(false)

  useEffect(() => {
    setXP(getXP())
    setStreak(getStreak())
    fetchPoems({ limit: 50 })
      .then(r => { setPoems(r.poems.slice(0, 20)); setLoading(false) })
      .catch(() => setLoading(false))
    fetchCategories().then(setCategories).catch(() => {})
  }, [])

  const handleRandom = () => {
    if (poems.length === 0) return
    const rand = poems[Math.floor(Math.random() * poems.length)]
    navigate(`/poem/${rand.id}`)
  }

  const handlePoemClick = (id: string) => navigate(`/poem/${id}`)

  const catClick = (id: string) => navigate(`/discover?cat=${id}`)

  const featured = poems.slice(0, 6)
  const streak_ = getStreak()

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-gold/5 to-transparent px-5 pt-12 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl text-gold">诗意山河</h1>
            <p className="text-xs text-text-2 mt-0.5">诗韵悠长 · 学无止境</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-xs text-gold font-bold">{getLevel(xp).emoji} {getLevel(xp).name}</p>
              <p className="text-xs text-text-2">{xp} XP</p>
            </div>
          </div>
        </div>
        <XPBar xp={xp} />
      </div>

      <div className="px-5 space-y-5 -mt-3">
        {/* Streak + Stats */}
        <div className="grid grid-cols-2 gap-3">
          <StreakBadge streak={streak_} />
          <div className="bg-bg-secondary rounded-2xl p-4 border border-border flex items-center gap-3">
            <Trophy className="w-6 h-6 text-gold" />
            <div>
              <p className="text-gold font-bold">{getBadges().length}枚</p>
              <p className="text-xs text-text-2">已获徽章</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          <QuickAction icon={Zap} label="今日已学" value={`${Math.floor(xp/10)}首`} color="text-yellow-400" onClick={() => navigate('/discover')} />
          <QuickAction icon={Target} label="本周目标" value={`${Math.min(100, xp)}%`} color="text-green-400" onClick={() => navigate('/challenge')} />
          <QuickAction icon={TrendingUp} label="完成度" value={`${Math.min(100, Math.round(xp/5))}%`} color="text-cyan-400" onClick={() => navigate('/discover')} />
        </div>

        {/* Random */}
        <RandomPoemCard onRoll={handleRandom} />

        {/* Categories */}
        <div>
          <h2 className="font-display text-sm text-text-2 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> 诗词分类
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
            {categories.map(c => (
              <CategoryCard key={c.id} cat={c} onClick={() => catClick(c.id)} />
            ))}
          </div>
        </div>

        {/* Featured Poems */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-sm text-text-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" /> 精选诗词
            </h2>
            <button onClick={() => navigate('/discover')} className="text-xs text-gold flex items-center gap-1">
              查看全部 <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 gap-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-40 bg-bg-secondary rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {featured.map((p, i) => (
                <PoemCard key={p.id} poem={p} index={i} onClick={() => handlePoemClick(p.id)} />
              ))}
            </div>
          )}
        </div>

        {/* Challenge CTA */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="bg-gradient-to-r from-gold/10 to-amber-500/5 rounded-2xl border border-gold/20 p-5 text-center"
        >
          <p className="text-gold font-display mb-1">📜 诗词挑战</p>
          <p className="text-text-2 text-xs mb-3">每天10题，测试你的诗词功底</p>
          <button
            onClick={() => navigate('/challenge')}
            className="px-6 py-2 bg-gold text-ink-900 rounded-full text-sm font-bold hover:bg-gold/90 transition-colors"
          >
            开始挑战
          </button>
        </motion.div>
      </div>
    </div>
  )
}
