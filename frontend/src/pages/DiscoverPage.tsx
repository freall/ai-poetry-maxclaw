import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Shuffle, SlidersHorizontal } from 'lucide-react'
import { fetchPoems, fetchCategories } from '../lib/data'
import type { Poem, Category } from '../types'

const DYNASTIES = ['全部', '唐', '宋', '魏晋', '南北朝', '汉', '先秦']
const SCHOOL_LEVELS = ['全部', '小学必背', '初中古诗文', '高中古诗文']
const CATS = ['全部', '诗', '词', '文']
const DIFFICULTIES = ['全部', '简单', '中等', '困难']

const DYNASTY_MAP: Record<string, string> = {
  '唐': 'Tang', '宋': 'Song', '魏晋': 'Jin', '南北朝': 'Southern', '汉': 'Han', '先秦': 'Pre-Qin'
}
const LEVEL_MAP: Record<string, string> = { '小学必背': 'primary', '初中古诗文': 'middle', '高中古诗文': 'high' }
const CAT_MAP: Record<string, string> = { '诗': 'shi', '词': 'ci', '文': 'prose' }
const DIFF_MAP: Record<string, number> = { '简单': 1, '中等': 2, '困难': 3 }

function PoemGridItem({ poem, onClick }: { poem: Poem; onClick: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="bg-bg-secondary rounded-2xl border border-border text-left overflow-hidden hover:border-gold/30 transition-all group"
    >
      <div className="relative h-24 overflow-hidden rounded-t-2xl">
        {poem.imageUrl ? (
          <img src={poem.imageUrl} alt={poem.title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
            onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gold/8 to-transparent" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary to-transparent opacity-40" />
        <span className="absolute top-2 right-2 text-xs opacity-40">
          {poem.imageType==='historical'?'🏛':'✨'}
        </span>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-xs text-gold/70">{poem.dynasty}</span>
          <span className="text-xs text-text-3">·</span>
          <span className="text-xs text-text-3">{poem.category === 'shi' ? '诗' : poem.category === 'ci' ? '词' : '文'}</span>
          {[3,4,5].includes(poem.difficulty) && (
            <span className="ml-auto text-xs text-red-400">难点</span>
          )}
        </div>
        <h3 className="font-display text-sm text-text truncate">{poem.title}</h3>
        <p className="text-xs text-text-3 mt-0.5 truncate">{poem.author}</p>
        <p className="text-xs text-text-2 mt-1 line-clamp-2 leading-relaxed">{poem.content.split('\n')[0]}</p>
        {poem.schoolLevel && (
          <div className="mt-2 flex gap-1 flex-wrap">
            {poem.schoolLevel === 'primary' && <span className="text-xs px-1.5 py-0.5 bg-green-500/10 text-green-400 rounded">小</span>}
            {poem.schoolLevel === 'middle' && <span className="text-xs px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded">初</span>}
            {poem.schoolLevel === 'high' && <span className="text-xs px-1.5 py-0.5 bg-purple-500/10 text-purple-400 rounded">高</span>}
          </div>
        )}
      </div>
    </motion.button>
  )
}

export default function DiscoverPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initCat = searchParams.get('cat') || ''
  const [query, setQuery] = useState('')
  const [dynasty, setDynasty] = useState('全部')
  const [level, setLevel] = useState('全部')
  const [cat, setCat] = useState(initCat || '全部')
  const [difficulty, setDifficulty] = useState('全部')
  const [poems, setPoems] = useState<Poem[]>([])
  const [all, setAll] = useState<Poem[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const PER_PAGE = 30

  useEffect(() => {
    fetchPoems({ limit: 300 })
      .then(r => { setAll(r.poems); setPoems(r.poems.slice(0, PER_PAGE)); setLoading(false); setPage(1) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = all.filter(p => {
    if (dynasty !== '全部' && p.dynasty !== DYNASTY_MAP[dynasty] && !(dynasty === '魏晋' && p.dynasty === 'Jin'))
      return false
    if (level !== '全部' && p.schoolLevel !== LEVEL_MAP[level]) return false
    if (cat !== '全部' && p.category !== CAT_MAP[cat]) return false
    if (difficulty !== '全部' && p.difficulty !== DIFF_MAP[difficulty]) return false
    if (query) {
      const q = query.toLowerCase()
      if (!p.title.toLowerCase().includes(q) && !p.author.toLowerCase().includes(q) && !p.content.toLowerCase().includes(q))
        return false
    }
    return true
  })

  const visible = filtered.slice(0, page * PER_PAGE)
  const hasMore = filtered.length > visible.length

  const handleRandom = () => {
    if (filtered.length === 0) return
    const rand = filtered[Math.floor(Math.random() * filtered.length)]
    navigate(`/poem/${rand.id}`)
  }

  const clearFilters = () => { setDynasty('全部'); setLevel('全部'); setCat('全部'); setDifficulty('全部'); setQuery('') }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-bg/95 backdrop-blur border-b border-border px-4 pt-12 pb-3">
        <h1 className="font-display text-lg text-gold mb-3">发现诗词</h1>
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-3" />
          <input
            value={query} onChange={e => setQuery(e.target.value)}
            placeholder="搜索诗词、作者..."
            className="w-full pl-10 pr-10 py-2.5 bg-bg-secondary rounded-xl text-sm text-text placeholder-text-3 border border-border focus:outline-none focus:border-gold/40"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-text-3" />
            </button>
          )}
        </div>
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button onClick={handleRandom}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 text-gold text-xs rounded-full border border-gold/20 hover:bg-gold/20">
            <Shuffle className="w-3 h-3" /> 随机
          </button>
          <button onClick={clearFilters}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-bg-secondary text-text-2 text-xs rounded-full border border-border">
            <SlidersHorizontal className="w-3 h-3" /> 重置
          </button>
          {DYNASTIES.slice(1).map(d => (
            <button key={d} onClick={() => setDynasty(dynasty === d ? '全部' : d)}
              className={`flex-shrink-0 px-3 py-1.5 text-xs rounded-full border transition-all
                ${dynasty === d ? 'bg-gold/15 text-gold border-gold/30' : 'bg-bg-secondary text-text-2 border-border hover:border-gold/20'}`}>
              {d}
            </button>
          ))}
        </div>
        <div className="flex gap-2 mt-2 overflow-x-auto pb-1 scrollbar-hide">
          {['全部', '小学必背', '初中古诗文', '高中古诗文'].map(l => (
            <button key={l} onClick={() => setLevel(level === l ? '全部' : l)}
              className={`flex-shrink-0 px-3 py-1 text-xs rounded-full border transition-all
                ${level === l ? 'bg-gold/15 text-gold border-gold/30' : 'bg-bg-secondary text-text-2 border-border'}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="px-4 py-2 flex items-center justify-between">
        <p className="text-xs text-text-3">
          {loading ? '加载中...' : `${filtered.length} 首诗词`}
        </p>
        <div className="flex gap-1">
          {['诗', '词', '文'].map(c => (
            <button key={c} onClick={() => setCat(cat === c ? '全部' : c)}
              className={`px-2 py-0.5 text-xs rounded-full transition-all ${cat === c ? 'bg-gold/15 text-gold border-gold/30' : 'text-text-3 border border-transparent'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-44 bg-bg-secondary rounded-2xl animate-pulse" />
          ))
        ) : visible.length === 0 ? (
          <div className="col-span-2 text-center py-16 text-text-3 text-sm">没有找到相关诗词</div>
        ) : (
          visible.map((poem, i) => (
            <motion.div key={poem.id} initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.02, 0.3) }}>
              <PoemGridItem poem={poem} onClick={() => navigate(`/poem/${poem.id}`)} />
            </motion.div>
          ))
        )}
      </div>

      {/* Load More */}
      {hasMore && !loading && (
        <div className="px-4 mt-4">
          <button onClick={() => setPage(p => p + 1)}
            className="w-full py-3 bg-bg-secondary rounded-xl text-sm text-text-2 border border-border hover:border-gold/30">
            加载更多 ({filtered.length - visible.length} 首)
          </button>
        </div>
      )}
    </div>
  )
}
