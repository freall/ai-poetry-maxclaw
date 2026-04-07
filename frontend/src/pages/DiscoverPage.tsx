import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, Shuffle } from 'lucide-react'
import { fetchPoems, fetchCategories } from '../lib/data'
import type { Poem, Category } from '../types'
import clsx from 'clsx'

const DYNASTIES = ['Tang', 'Song', 'Yuan', 'Ming', 'Qing', 'Pre-Qin', 'Han']
const DYNASTY_NAMES: Record<string, string> = {
  Tang: '唐', Song: '宋', Yuan: '元', Ming: '明', Qing: '清', 'Pre-Qin': '先秦', Han: '汉'
}

export default function DiscoverPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [poems, setPoems] = useState<Poem[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [dynasty, setDynasty] = useState(searchParams.get('dynasty') || '')
  const [page, setPage] = useState(0)
  const LIMIT = 20

  useEffect(() => {
    setLoading(true)
    fetchPoems({ query: query || undefined, dynasty: dynasty || undefined, page, limit: LIMIT })
      .then(({ poems, total }) => { setPoems(poems); setTotal(total); setLoading(false) })
  }, [query, dynasty, page])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setPage(0)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-20">
      {/* Search */}
      <form onSubmit={handleSearch} className="sticky top-0 z-10 bg-bg pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-3" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="搜索诗词、作者..."
            className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-text placeholder:text-text-3 focus:outline-none focus:border-gold/40"
          />
        </div>
      </form>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        <button
          onClick={() => { setDynasty(''); setPage(0) }}
          className={clsx('flex-shrink-0 px-3 py-1.5 rounded-full text-xs transition-all',
            !dynasty ? 'bg-gold text-bg font-bold' : 'bg-surface text-text-2 border border-border'
          )}
        >
          全部
        </button>
        {DYNASTIES.map(d => (
          <button
            key={d}
            onClick={() => { setDynasty(d); setPage(0) }}
            className={clsx('flex-shrink-0 px-3 py-1.5 rounded-full text-xs transition-all',
              dynasty === d ? 'bg-gold text-bg font-bold' : 'bg-surface text-text-2 border border-border'
            )}
          >
            {DYNASTY_NAMES[d]}
          </button>
        ))}
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-text-3">
          {loading ? '...' : `${total} 首诗词`}
          {query && ` · 搜索: ${query}`}
          {dynasty && ` · ${DYNASTY_NAMES[dynasty] || dynasty}`}
        </p>
        <button
          onClick={() => {
            const random = poems[Math.floor(Math.random() * poems.length)]
            if (random) window.location.href = `/poem/${random.id}`
          }}
          className="text-xs text-gold flex items-center gap-1 hover:underline"
        >
          <Shuffle className="w-3 h-3" /> 随机
        </button>
      </div>

      {/* Poem List */}
      {loading ? (
        <div className="space-y-3">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-24 bg-surface rounded-xl animate-pulse border border-border" />
          ))}
        </div>
      ) : poems.length === 0 ? (
        <div className="text-center py-16 text-text-2">
          <div className="text-4xl mb-4">🔍</div>
          <p>没有找到相关诗词</p>
          <p className="text-sm mt-2">试试其他关键词或分类</p>
        </div>
      ) : (
        <div className="space-y-3">
          {poems.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                to={`/poem/${p.id}`}
                className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-border hover:border-gold/30 transition-all group"
              >
                {/* Poem preview thumbnail */}
                <div className="w-16 h-16 rounded-lg bg-surface-2 flex items-center justify-center text-2xl flex-shrink-0">
                  {p.dynasty === 'Tang' ? '🌙' : p.dynasty === 'Song' ? '🏮' : '📜'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display text-base text-text group-hover:text-gold transition-colors">{p.title}</h3>
                    <span className="text-xs px-1.5 py-0.5 bg-gold/10 text-gold rounded">{DYNASTY_NAMES[p.dynasty] || p.dynasty}</span>
                  </div>
                  <p className="text-xs text-text-2 mb-1.5">{p.author}</p>
                  <p className="text-xs text-text-3 font-display italic truncate leading-relaxed">{p.content.split('\n')[0]}</p>
                </div>
                <div className="text-xs text-text-3 flex-shrink-0 mt-1">
                  {p.category === 'shi' ? '诗' : p.category === 'ci' ? '词' : '文'}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {total > LIMIT && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-4 py-2 bg-surface border border-border rounded-xl text-sm disabled:opacity-30"
          >
            上一页
          </button>
          <span className="px-4 py-2 text-sm text-text-2">
            {page + 1} / {Math.ceil(total / LIMIT)}
          </span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={(page + 1) * LIMIT >= total}
            className="px-4 py-2 bg-surface border border-border rounded-xl text-sm disabled:opacity-30"
          >
            下一页
          </button>
        </div>
      )}
    </div>
  )
}
