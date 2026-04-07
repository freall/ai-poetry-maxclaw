import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trophy, Clock, ChevronRight } from 'lucide-react'
import { fetchPoems, fetchQuizByPoemId } from '../lib/data'
import type { Poem, QuizItem } from '../types'

function getXP() { return parseInt(localStorage.getItem('poetry_xp') || '0') }
function addXP(n: number) { localStorage.setItem('poetry_xp', String(getXP() + n)) }

function QuizItem({ q, onAnswer, idx }: { q: QuizItem; onAnswer: (correct: boolean) => void; idx: number }) {
  const [sel, setSel] = useState<number | null>(null)
  const done = sel !== null
  const ok = sel === q.answer
  return (
    <div className="bg-bg-secondary rounded-2xl border border-border p-5">
      <p className="text-text text-sm mb-4 leading-relaxed">Q{idx + 1}. {q.question}</p>
      <div className="space-y-2">
        {q.options.map((opt, i) => {
          let cls = 'bg-bg border-border text-text-2 hover:border-gold/30'
          if (done) {
            if (i === q.answer) cls = 'bg-green-500/15 border-green-500/30 text-green-300'
            else if (i === sel) cls = 'bg-red-500/15 border-red-500/30 text-red-300'
            else cls = 'opacity-50'
          }
          return (
            <button key={i} onClick={() => { if (!done) { setSel(i); setTimeout(() => onAnswer(i === q.answer), 800) }}
              className={'w-full p-3 rounded-xl text-sm text-left border transition-all ' + cls}>
            {['A','B','C','D'][i]}. {opt}
          </button>
          )
        })}
      </div>
      {done && (
        <motion.div initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }}
          className={'mt-3 p-3 rounded-xl text-xs ' + (ok ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20')}>
          {ok ? (
            <p className="text-green-400 font-bold">+10 XP ✓ 正确！</p>
          ) : (
            <p className="text-red-400 font-bold">错误，正确答案：{q.options[q.answer]}</p>
          )}
          {q.explanation && <p className="text-text-2 mt-1 leading-relaxed">{q.explanation}</p>}
        </motion.div>
      )}
    </div>
  )
}

export default function ChallengePage() {
  const navigate = useNavigate()
  const [poems, setPoems] = useState<Poem[]>([])
  const [quizzes, setQuizzes] = useState<QuizItem[]>([])
  const [qIdx, setQIdx] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(10)
  const TOTAL = 10

  useEffect(() => {
    fetchPoems({ limit: 200 }).then(r => setPoems(r.poems.slice(0, 50)))
  }, [])

  useEffect(() => {
    if (!started || finished) return
    const id = setInterval(() => setTimeLeft(t => {
      if (t <= 1) { clearInterval(id); return 0 }
      return t - 1
    }), 1000)
    return () => clearInterval(id)
  }, [started, finished])

  const start = () => {
    setStarted(true); setCorrect(0); setQIdx(0); setFinished(false); setTimeLeft(10)
    setQuizzes([])
    const shuffled = [...poems].sort(() => Math.random() - 0.5).slice(0, TOTAL)
    setPoems(shuffled)
  }

  useEffect(() => {
    if (!started || finished || qIdx >= poems.length) return
    const poem = poems[qIdx % poems.length]
    if (!poem) return
    fetchQuizByPoemId(poem.id).then(qs => {
      if (qs.length > 0) setQuizzes(qs.slice(0, 3))
      else setQIdx(i => Math.min(i + 1, TOTAL - 1))
    }).catch(() => {})
  }, [started, qIdx, poems])

  const handleAnswer = (correct: boolean) => {
    if (correct) { setCorrect(c => c + 1); addXP(10) }
    if (qIdx + 1 >= TOTAL) setFinished(true)
    else setTimeout(() => setQIdx(i => i + 1), 1000)
  }

  if (!started) {
    const xp = getXP()
    const pct = Math.min(100, Math.round(xp / 10))
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <Trophy className="w-16 h-16 text-gold mb-6" />
        <h1 className="font-display text-2xl text-text mb-2">诗词挑战</h1>
        <p className="text-text-2 text-sm mb-6 text-center">随机10题，每题10 XP<br/>满分更有额外奖励</p>
        <div className="w-full bg-bg-secondary rounded-2xl p-4 mb-6 border border-border text-center">
          <p className="text-gold font-display text-3xl">{xp} XP</p>
          <p className="text-xs text-text-3 mt-1">当前经验值</p>
          <div className="mt-2 h-1.5 bg-bg rounded-full overflow-hidden">
            <div className="h-full bg-gold rounded-full" style={{width: pct+'%'}} />
          </div>
        </div>
        <button onClick={start}
          className="w-full py-3 bg-gold text-ink-900 font-bold rounded-xl hover:bg-gold/90">
          开始挑战
        </button>
        <button onClick={() => navigate('/')} className="mt-3 text-text-3 text-xs">返回首页</button>
      </div>
    )
  }

  if (finished) {
    const pct = Math.round((correct / TOTAL) * 100)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <Trophy className="w-16 h-16 mx-auto text-gold mb-4" />
          <p className="font-display text-2xl text-text text-center">{correct}/{TOTAL} 题正确</p>
          <p className="text-gold font-display text-lg text-center mt-1">+{correct * 10} XP</p>
          <p className="text-text-3 text-xs text-center mt-1">{pct >= 80 ? '太棒了！' : pct >= 50 ? '不错！' : '继续加油！'}</p>
        </motion.div>
        <div className="flex gap-2 mt-8 w-full">
          <button onClick={() => { setStarted(false); setStarted(true) }}
            className="flex-1 py-3 bg-gold/10 text-gold font-bold rounded-xl border border-gold/30">
            再来一轮
          </button>
          <button onClick={() => navigate('/')}
            className="flex-1 py-3 bg-bg-secondary text-text-2 rounded-xl border border-border">
            返回首页
          </button>
        </div>
      </div>
    )
  }

  const curQ = quizzes[0]
  if (!curQ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-10 bg-bg/95 backdrop-blur border-b border-border px-4 pt-12 pb-2">
        <div className="flex items-center justify-between text-xs text-text-2 mb-1">
          <span>第 {qIdx + 1}/{TOTAL} 题 · {correct} 正确</span>
          <Clock className="inline w-3 h-3 mr-1" />
          <span className={timeLeft <= 3 ? 'text-red-400' : 'text-cyan-400'}>{timeLeft}s</span>
        </div>
        <div className="h-1.5 bg-bg-secondary rounded-full overflow-hidden">
          <motion.div className="h-full bg-gold rounded-full" animate={{ width: ((qIdx + 1) / TOTAL * 100 + '%' }} />
        </div>
      </div>
      <div className="p-4">
        <QuizItem key={qIdx} q={curQ} idx={qIdx} onAnswer={handleAnswer} />
      </div>
    </div>
  )
}
