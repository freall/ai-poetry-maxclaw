import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart, BookOpen, CheckCircle, XCircle, ArrowLeft, Award } from 'lucide-react'
import { fetchPoemById, fetchQuizByPoemId, fetchAuthorById } from '../lib/data'
import type { Poem, Author, QuizItem } from '../types'
import clsx from 'clsx'

type Tab = 'translation' | 'annotation' | 'background' | 'author'
const TAB_LABELS: Record<Tab, string> = {
  translation: '翻译',
  annotation: '注释',
  background: '背景',
  author: '作者',
}

function Confetti() {
  const colors = ['#d4a843', '#e07a5f', '#81b29a', '#f4d03f', '#f87171']
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 9999 }}>
      {Array.from({ length: 60 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -20, x: `${Math.random() * 100}%`, opacity: 1 }}
          animate={{ y: '100vh', opacity: 0, rotate: Math.random() * 720 - 360 }}
          transition={{ duration: 2 + Math.random(), delay: Math.random() * 0.5, ease: 'easeIn' }}
          style={{
            position: 'absolute', width: 8, height: 8, borderRadius: 2,
            background: colors[i % colors.length],
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}

function QuizPanel({ poemId }: { poemId: string }) {
  const [quizzes, setQuizzes] = useState<QuizItem[]>([])
  const [idx, setIdx] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const [correct, setCorrect] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [done, setDone] = useState(false)
  const [combo, setCombo] = useState(0)

  useEffect(() => { fetchQuizByPoemId(poemId).then(setQuizzes) }, [poemId])

  if (!quizzes.length) return <div className="text-center py-8 text-text-2">暂无测验题</div>
  if (done) {
    const pct = Math.round((correct / quizzes.length) * 100)
    return (
      <>
        {pct >= 80 && <Confetti />}
        <div className="text-center py-8">
          <div className="text-6xl mb-4">{pct >= 80 ? '🌟' : pct >= 50 ? '👍' : '💪'}</div>
          <h3 className={clsx('text-2xl font-bold mb-2', pct >= 80 ? 'text-gold' : 'text-jade')}>
            {pct >= 80 ? '太棒了！全部答对！' : pct >= 50 ? '继续加油！' : '不要放弃！'}
          </h3>
          <p className="text-text-2 mb-4">正确率 {correct} / {quizzes.length} ({pct}%)</p>
          {pct >= 80 && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm mb-4">
              <Award className="w-4 h-4" /> 获得成就徽章！
            </div>
          )}
          <div className="flex gap-3 justify-center mt-4">
            <button onClick={() => { setIdx(0); setAnswered(false); setSelected(null); setCorrect(0); setDone(false); setCombo(0) }}
              className="px-5 py-2.5 bg-surface border border-border rounded-xl text-text-2 hover:border-gold/30 transition-all">
              再学一遍
            </button>
            <button onClick={() => window.history.forward()}
              className="px-5 py-2.5 bg-grad-gold text-bg font-bold rounded-xl hover:opacity-90 transition-all">
              下一首 →
            </button>
          </div>
        </div>
      </>
    )
  }

  const q = quizzes[idx]
  const isCorrect = selected === q.answer

  function handleSelect(i: number) {
    if (answered) return
    setSelected(i)
    setAnswered(true)
    if (i === q.answer) {
      setCombo(c => c + 1)
      setCorrect(c => c + 1)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2500)
    } else {
      setCombo(0)
    }
  }

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-2">第 {idx + 1} / {quizzes.length} 题</span>
          {combo >= 2 && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="px-3 py-1 bg-gold/10 border border-gold/30 rounded-full text-gold text-xs font-bold">
              COMBO ×{combo}
            </motion.span>
          )}
        </div>
        <p className="text-lg font-bold text-text leading-relaxed">{q.question}</p>
        <div className="space-y-2">
          {(q.options || []).map((opt, i) => {
            let cls = 'w-full px-4 py-3 rounded-xl text-left bg-surface-2 border-2 border-border text-text-2 transition-all hover:border-gold/50 hover:bg-gold/5 cursor-pointer'
            if (answered) {
              if (i === q.answer) cls = cls.replace('border-border', 'border-jade bg-jade/10 text-jade')
              else if (i === selected) cls = cls.replace('border-border', 'border-coral bg-coral/10 text-coral')
            }
            return (
              <motion.button key={i} whileTap={{ scale: answered ? 1 : 0.98 }}
                onClick={() => handleSelect(i)} disabled={answered} className={cls}>
                <span className={clsx('inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-3',
                  !answered && 'bg-surface-2' || i === q.answer && 'bg-jade' || i === selected && 'bg-coral' || 'bg-surface-2'
                )}>
                  {['A','B','C','D'][i]}
                </span>
                {opt}
              </motion.button>
            )
          })}
        </div>
        <AnimatePresence>
          {answered && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className={clsx('p-4 rounded-xl text-sm leading-relaxed',
                isCorrect ? 'bg-jade/10 border border-jade/20 text-jade' : 'bg-coral/10 border border-coral/20 text-coral'
              )}>
              <div className="flex items-center gap-2 font-bold mb-1">
                {isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {isCorrect ? '🎉 正确！' : '💡 答案解析'}
              </div>
              {q.explanation}
            </motion.div>
          )}
        </AnimatePresence>
        {answered && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
            <button onClick={() => {
              if (idx < quizzes.length - 1) { setIdx(i => i + 1); setAnswered(false); setSelected(null) }
              else { setDone(true) }
            }} className="px-5 py-2.5 bg-grad-gold text-bg font-bold rounded-xl hover:opacity-90 transition-all">
              {idx < quizzes.length - 1 ? '下一题 →' : '查看结果'}
            </button>
          </motion.div>
        )}
      </div>
    </>
  )
}

export default function PoemDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [poem, setPoem] = useState<Poem | null>(null)
  const [author, setAuthor] = useState<Author | null>(null)
  const [tab, setTab] = useState<Tab>('translation')
  const [quizMode, setQuizMode] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetchPoemById(id).then(p => {
      setPoem(p)
      if (p?.authorId) fetchAuthorById(p.authorId).then(setAuthor)
      setLoading(false)
    })
  }, [id])

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
    </div>
  )

  if (!poem) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p className="text-text-2">未找到该诗词</p>
      <button onClick={() => navigate(-1)} className="text-gold">返回</button>
    </div>
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pb-32">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-bg/95 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-text-2 hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-sm text-text-2 font-mono">
            {poem.dynasty} · {poem.category === 'shi' ? '诗' : poem.category === 'ci' ? '词' : '文'}
          </div>
          <button onClick={() => {}} className="p-2 text-text-2 hover:text-coral transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-6 space-y-6">
        {/* Title & Author */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-3xl font-display text-text text-center mb-2">{poem.title}</h1>
          <p className="text-center text-text-2">{poem.dynasty} · {poem.author}</p>
        </motion.div>

        {/* Poem Content */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="text-center py-6 px-4 bg-surface/50 rounded-2xl border border-border">
          <pre className="font-display text-2xl text-text leading-[2.2] whitespace-pre-wrap text-center">
            {poem.content}
          </pre>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 bg-surface rounded-xl p-1">
          {(Object.entries(TAB_LABELS) as [Tab, string][]).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className={clsx('flex-1 py-2 px-3 rounded-lg text-sm transition-all',
                tab === key ? 'bg-gold/10 text-gold font-bold' : 'text-text-2 hover:text-text'
              )}>
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }} className="min-h-[120px]">
            {tab === 'author' && author ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center text-2xl">
                    {poem.author[0]}
                  </div>
                  <div>
                    <p className="font-bold text-text">{author.name}</p>
                    <p className="text-xs text-text-2">{author.dynasty} · {author.nickname}</p>
                  </div>
                </div>
                <p className="text-sm text-text-2 leading-relaxed">{author.bio}</p>
              </div>
            ) : (
              <p className="text-sm text-text-2 leading-relaxed whitespace-pre-wrap">
                {tab === 'translation' && poem.translation}
                {tab === 'annotation' && (poem.annotation || '暂无注释')}
                {tab === 'background' && (poem.background || '暂无背景介绍')}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Quiz Toggle */}
        {!quizMode ? (
          <motion.button whileTap={{ scale: 0.98 }}
            onClick={() => setQuizMode(true)}
            className="w-full py-4 bg-grad-gold text-bg font-bold rounded-2xl hover:opacity-90 transition-all text-lg flex items-center justify-center gap-2">
            <Award className="w-5 h-5" />
            开始答题测验
          </motion.button>
        ) : (
          <div className="bg-surface rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-text flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gold" />
                答题测验
              </h3>
              <button onClick={() => setQuizMode(false)} className="text-text-3 text-sm hover:text-text">收起</button>
            </div>
            <QuizPanel poemId={poem.id} />
          </div>
        )}
      </div>

      {/* Prev / Next */}
      <div className="fixed bottom-0 left-0 right-0 bg-bg/95 backdrop-blur-md border-t border-border px-4 py-3 z-30">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button className="flex items-center gap-2 text-text-2 hover:text-gold transition-colors disabled:opacity-30" disabled>
            <ChevronLeft className="w-5 h-5" /><span className="text-sm hidden sm:inline">上一首</span>
          </button>
          <button className="flex items-center gap-2 text-text-2 hover:text-gold transition-colors" onClick={() => navigate(1)}>
            <span className="text-sm hidden sm:inline">下一首</span><ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
