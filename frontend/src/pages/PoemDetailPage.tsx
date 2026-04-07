import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ChevronLeft, ChevronRight, Heart, Share2, Volume2,
  Award, CheckCircle2, XCircle, Sparkles, BookOpen, User, Image,
  Star, Zap, Trophy, TrendingUp
} from 'lucide-react'
import { fetchPoemById, fetchAuthorById, fetchQuizByPoemId, fetchPoems } from '../lib/data'
import type { Poem, Author, QuizItem } from '../types'

// ─── Quiz Engine ────────────────────────────────────────────────────────────
function QuizEngine({ poemId, onComplete }: { poemId: string; onComplete: (correct: number) => void }) {
  const [quiz, setQuiz] = useState<QuizItem[]>([])
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [correct, setCorrect] = useState(0)
  const [combo, setCombo] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    fetchQuizByPoemId(poemId).then(q => { setQuiz(q); setDone(q.length === 0) })
  }, [poemId])

  const cur = quiz[idx]
  if (quiz.length === 0) {
    return (
      <div className="mt-4 p-4 bg-bg-secondary rounded-2xl border border-border text-center">
        <BookOpen className="w-8 h-8 mx-auto text-text-3 mb-2" />
        <p className="text-text-2 text-sm">暂无练习题</p>
      </div>
    )
  }
  if (done) {
    const pct = Math.round((correct / quiz.length) * 100)
    const xp = Math.round(correct * 10 + (pct === 100 ? 20 : 0) + (combo >= 5 ? 15 : 0))
    return (
      <div className="mt-4 bg-gradient-to-b from-gold/10 to-bg-secondary rounded-2xl border border-gold/20 p-6 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
          {pct === 100 ? (
            <Trophy className="w-12 h-12 mx-auto text-gold mb-2" />
          ) : pct >= 60 ? (
            <Sparkles className="w-12 h-12 mx-auto text-green-400 mb-2" />
          ) : (
            <Star className="w-12 h-12 mx-auto text-blue-400 mb-2" />
          )}
          <p className="text-gold font-display text-lg">{pct === 100 ? '满分！太棒了！🎉' : pct >= 60 ? '不错！继续加油！' : '再接再厉！'}</p>
          <p className="text-text-2 text-sm mt-1">{correct}/{quiz.length} 题正确 · 获得 {xp} XP</p>
          <div className="flex gap-2 mt-4 justify-center">
            <button onClick={() => { setIdx(0); setCorrect(0); setCombo(0); setDone(false); setSelected(null) }}
              className="px-4 py-2 bg-gold/10 text-gold rounded-full text-sm border border-gold/30 hover:bg-gold/20">
              再来一次
            </button>
            <button onClick={() => { onComplete(correct); setIdx(0); setCorrect(0); setCombo(0); setDone(false); setSelected(null) }}
              className="px-4 py-2 bg-gold text-ink-900 rounded-full text-sm font-bold hover:bg-gold/90">
              完成
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  const isCorrect = selected === cur.answer
  const showResult = selected !== null

  const handleSelect = (i: number) => {
    if (showResult) return
    setSelected(i)
    const ok = i === cur.answer
    if (ok) {
      const newCombo = combo + 1
      setCombo(newCombo)
      setCorrect(c => c + 1)
      const bonus = newCombo >= 5 ? '+5' : newCombo >= 3 ? '+2' : ''
      // XP
      const curXP = parseInt(localStorage.getItem('poetry_xp') || '0')
      localStorage.setItem('poetry_xp', String(curXP + 10 + (newCombo >= 5 ? 5 : newCombo >= 3 ? 2 : 0)))
      setTimeout(() => {
        if (idx + 1 < quiz.length) { setIdx(i => i + 1); setSelected(null) }
        else { setDone(true); onComplete(correct + 1) }
      }, 1200)
    } else {
      setCombo(0)
      setTimeout(() => setSelected(null), 1500)
    }
  }

  return (
    <div className="mt-4 space-y-3">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-text-2 whitespace-nowrap">{idx + 1}/{quiz.length}</span>
        <div className="flex-1 h-2 bg-bg rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gold rounded-full"
            animate={{ width: `${((idx + (showResult ? 1 : 0)) / quiz.length * 100}%` }}
          />
        </div>
        {combo >= 2 && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-xs text-orange-400 font-bold">
            ×{combo} COMBO
          </motion.span>
        )}
      </div>

      {/* Question */}
      <p className="text-text font-body text-sm">{cur.question}</p>

      {/* Options */}
      <div className="grid grid-cols-1 gap-2">
        {cur.options.map((opt, i) => {
          const state = showResult ? i === cur.answer ? 'correct' : i === selected ? 'wrong' : 'default' : 'default'
          return (
            <motion.button
              key={i}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(i)}
              animate={showResult && i === selected ? (isCorrect ? { x: [0, 8, -8, 8, -8, 0] } : { x: [0, 10, -10, 10, -10, 0] }) : {}}
              transition={{ duration: 0.4 }}
              className={`p-3 rounded-xl text-sm text-left border transition-all
                ${state === 'correct' ? 'bg-green-500/20 border-green-500/40 text-green-300' :
                  state === 'wrong' ? 'bg-red-500/20 border-red-500/40 text-red-300' :
                  'bg-bg-secondary border-border text-text-2 hover:border-gold/30 hover:text-text'}`}
            >
              <span className="mr-2">{['A', 'B', 'C', 'D'][i]}.</span>{opt}
            </motion.button>
          )
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-xl text-xs ${isCorrect ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}
          >
            <p className={`font-bold mb-1 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? `✓ 正确！${combo >= 3 ? ` +${combo >= 5 ? 5 : 2} XP COMBO奖励` : ''}` : '✗'}
            </p>
            {cur.explanation && (
              <p className="text-text-2 leading-relaxed">{cur.explanation}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function PoemDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [poem, setPoem] = useState<Poem | null>(null)
  const [author, setAuthor] = useState<Author | null>(null)
  const [allPoems, setAllPoems] = useState<Poem[]>([])
  const [tab, setTab] = useState<'原文' | '译文' | '注释' | '背景' | '练习'>('原文')
  const [loading, setLoading] = useState(true)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    Promise.all([fetchPoemById(id), fetchAuthorById(id?.split('-')[0] || ''), fetchPoems({ limit: 200 })])
      .then(([p, a, r]) => {
        setPoem(p)
        setAuthor(a)
        setAllPoems(r.poems)
        setLoading(false)
      })
      .catch(() => setLoading(false))
    window.scrollTo(0, 0)
  }, [id])

  const currentIdx = allPoems.findIndex(p => p.id === id)
  const prevPoem = currentIdx > 0 ? allPoems[currentIdx - 1] : null
  const nextPoem = currentIdx < allPoems.length - 1 ? allPoems[currentIdx + 1] : null

  const handlePrev = () => { if (prevPoem) navigate(`/poem/${prevPoem.id}`) }
  const handleNext = () => { if (nextPoem) navigate(`/poem/${nextPoem.id}`) }

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [prevPoem, nextPoem])

  if (loading || !poem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
      </div>
    )
  }

  const bgGradient = poem.category === 'ci'
    ? 'from-red-900/20 to-bg'
    : poem.category === 'prose'
    ? 'from-emerald-900/20 to-bg'
    : 'from-gold/10 to-bg'

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Image Area */}
      <div className={`relative h-52 bg-gradient-to-b ${bgGradient}`}>
        {/* Back + Nav */}
        <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-4 pt-12">
          <button onClick={() => navigate(-1)} className="w-9 h-9 bg-bg/60 backdrop-blur rounded-full flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-text" />
          </button>
          <div className="flex gap-1">
            <button onClick={handlePrev} disabled={!prevPoem}
              className="w-9 h-9 bg-bg/60 backdrop-blur rounded-full flex items-center justify-center disabled:opacity-30">
              <ChevronLeft className="w-5 h-5 text-text" />
            </button>
            <button onClick={handleNext} disabled={!nextPoem}
              className="w-9 h-9 bg-bg/60 backdrop-blur rounded-full flex items-center justify-center disabled:opacity-30">
              <ChevronRight className="w-5 h-5 text-text" />
            </button>
          </div>
        </div>
        {/* Category + Dynasty badge */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <span className="text-xs px-2 py-1 bg-gold/20 text-gold rounded-full backdrop-blur">{poem.dynasty}</span>
          <span className="text-xs px-2 py-1 bg-bg/40 text-text-2 rounded-full backdrop-blur">
            {poem.category === 'shi' ? '诗' : poem.category === 'ci' ? '词' : '文'}
          </span>
          {poem.difficulty >= 3 && (
            <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full">难点</span>
          )}
        </div>
        {/* Poem title on image */}
        <div className="absolute bottom-4 right-4 text-right">
          <h1 className="font-display text-2xl text-text drop-shadow-lg">{poem.title}</h1>
          <p className="text-xs text-text-2">{poem.author}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-10 bg-bg/90 backdrop-blur border-b border-border flex">
        {(['原文', '译文', '注释', '背景', '练习'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-3 text-xs text-center border-b-2 transition-colors ${
              tab === t ? 'border-gold text-gold' : 'border-transparent text-text-2 hover:text-text'
            }`}>
            {t}
          </button>
        ))}
      </div>

      <div className="px-5 py-4">
        {/* Poem Content */}
        <AnimatePresence mode="wait">
          {tab === '原文' && (
            <motion.div key="content" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              {/* Poem text */}
              <div className="text-center py-6">
                {poem.content.split('\n').map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.08 }}
                    className="font-display text-[2rem] leading-[2.8] text-text"
                  >{line}</motion.p>
                ))}
              </div>
              {/* Action buttons */}
              <div className="flex justify-center gap-3 mt-4">
                <button className="flex items-center gap-1.5 px-4 py-2 bg-bg-secondary rounded-full text-xs text-text-2 border border-border">
                  <Volume2 className="w-4 h-4" /> 朗读
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-bg-secondary rounded-full text-xs text-text-2 border border-border">
                  <Heart className="w-4 h-4" /> 收藏
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-bg-secondary rounded-full text-xs text-text-2 border border-border">
                  <Share2 className="w-4 h-4" /> 分享
                </button>
              </div>
            </motion.div>
          )}

          {tab === '译文' && (
            <motion.div key="translation" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="py-4">
              <p className="text-text leading-relaxed text-sm">{poem.translation || '暂无译文'}</p>
            </motion.div>
          )}

          {tab === '注释' && (
            <motion.div key="annotation" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="py-4">
              {poem.annotation ? (
                <p className="text-text-2 text-sm leading-relaxed">{poem.annotation}</p>
              ) : (
                <p className="text-text-3 text-sm">暂无注释</p>
              )}
            </motion.div>
          )}

          {tab === '背景' && (
            <motion.div key="background" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="py-4 space-y-4">
              {/* Author Card */}
              {author && (
                <div className="bg-bg-secondary rounded-2xl p-4 border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold font-display text-lg">
                      {author.name[0]}
                    </div>
                    <div>
                      <p className="font-display text-text text-sm">{author.name}</p>
                      <p className="text-xs text-text-2">{author.dynasty} · {author.nickname || '暂无号'}</p>
                    </div>
                  </div>
                  {author.bio && <p className="text-xs text-text-2 leading-relaxed">{author.bio}</p>}
                </div>
              )}
              {/* Poem Background */}
              {poem.background && (
                <div className="bg-bg-secondary rounded-2xl p-4 border border-border">
                  <p className="text-xs text-text-2 leading-relaxed">{poem.background}</p>
                </div>
              )}
              {/* Tags */}
              {poem.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {poem.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-gold/5 text-gold/80 rounded-full border border-gold/20">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              {/* School Info */}
              {poem.schoolLevel && (
                <div className="bg-bg-secondary rounded-xl p-3 border border-border">
                  <p className="text-xs text-text-2">📚 {poem.schoolTextbook || '语文教材'} · {poem.schoolLevel === 'primary' ? '小学' : poem.schoolLevel === 'middle' ? '初中' : '高中'}</p>
                </div>
              )}
            </motion.div>
          )}

          {tab === '练习' && (
            <motion.div key="quiz" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <QuizEngine poemId={poem.id} onComplete={(correct) => {
                const xp = correct * 10
                const cur = parseInt(localStorage.getItem('poetry_xp') || '0')
                localStorage.setItem('poetry_xp', String(cur + xp))
                if (correct >= 3 && !JSON.parse(localStorage.getItem('poetry_badges') || '[]').includes('答题达人')) {
                  const badges = JSON.parse(localStorage.getItem('poetry_badges') || '[]')
                  localStorage.setItem('poetry_badges', JSON.stringify([...badges, '答题达人']))
                }
              }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Related Poems */}
        {tab !== '练习' && poem.relatedPoemIds && poem.relatedPoemIds.length > 0 && (
          <div className="mt-6">
            <h3 className="font-display text-sm text-text-2 mb-3">相关诗词</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {poem.relatedPoemIds.map(rid => {
                const rp = allPoems.find(p => p.id === rid)
                if (!rp) return null
                return (
                  <button key={rid} onClick={() => navigate(`/poem/${rid}`)}
                    className="flex-shrink-0 bg-bg-secondary rounded-xl p-3 border border-border text-left min-w-[160px]">
                    <p className="text-xs text-gold">{rp.dynasty}</p>
                    <p className="font-display text-sm text-text truncate">{rp.title}</p>
                    <p className="text-xs text-text-3">{rp.author}</p>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
