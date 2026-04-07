import { motion } from 'framer-motion'
import { Heart, BookOpen, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Poem } from '../types'

// Demo progress data
const DEMO_PROGRESS: Array<{ poem: Poem; status: 'not_started' | 'in_progress' | 'mastered'; score: number }> = [
  { poem: { id: 'tang-001', title: '静夜思', author: '李白', dynasty: 'Tang', category: 'shi', difficulty: 1, content: '', translation: '', annotation: '', background: '', tags: [], source: '唐诗三百首', schoolLevel: 'primary', authorId: '', aiImageUrl: '', historicalImageUrls: [], calligraphyImageUrls: [], relatedPoemIds: [] }, status: 'mastered', score: 100 },
  { poem: { id: 'tang-004', title: '春晓', author: '孟浩然', dynasty: 'Tang', category: 'shi', difficulty: 1, content: '', translation: '', annotation: '', background: '', tags: [], source: '唐诗三百首', schoolLevel: 'primary', authorId: '', aiImageUrl: '', historicalImageUrls: [], calligraphyImageUrls: [], relatedPoemIds: [] }, status: 'in_progress', score: 60 },
  { poem: { id: 'tang-005', title: '登鹳雀楼', author: '王之涣', dynasty: 'Tang', category: 'shi', difficulty: 1, content: '', translation: '', annotation: '', background: '', tags: [], source: '唐诗三百首', schoolLevel: 'primary', authorId: '', aiImageUrl: '', historicalImageUrls: [], calligraphyImageUrls: [], relatedPoemIds: [] }, status: 'not_started', score: 0 },
]

export default function CollectionPage() {
  const stats = {
    total: DEMO_PROGRESS.length,
    mastered: DEMO_PROGRESS.filter(p => p.status === 'mastered').length,
    inProgress: DEMO_PROGRESS.filter(p => p.status === 'in_progress').length,
  }

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="w-6 h-6 text-coral" />
        <h1 className="text-2xl font-bold">我的收藏</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: '学习中', value: stats.inProgress, color: 'text-gold' },
          { label: '已掌握', value: stats.mastered, color: 'text-jade' },
          { label: '总计', value: stats.total, color: 'text-text' },
        ].map(s => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-4 bg-surface rounded-xl border border-border"
          >
            <div className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</div>
            <div className="text-xs text-text-3 mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Progress list */}
      <div className="space-y-3">
        {DEMO_PROGRESS.map((item, i) => (
          <motion.div
            key={item.poem.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              to={`/poem/${item.poem.id}`}
              className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border hover:border-gold/30 transition-all group"
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                item.status === 'mastered' ? 'bg-jade/20 text-jade' :
                item.status === 'in_progress' ? 'bg-gold/20 text-gold' : 'bg-surface-2 text-text-3'
              }`}>
                {item.status === 'mastered' ? '✓' : item.status === 'in_progress' ? '→' : '○'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-text text-sm group-hover:text-gold transition-colors">{item.poem.title}</div>
                <div className="text-xs text-text-2">{item.poem.author}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xs text-text-3">正确率</div>
                <div className={`text-sm font-mono font-bold ${
                  item.score >= 80 ? 'text-jade' : item.score >= 50 ? 'text-gold' : 'text-text-3'
                }`}>{item.score}%</div>
              </div>
              <ChevronRight className="w-4 h-4 text-text-3 flex-shrink-0" />
            </Link>
          </motion.div>
        ))}
      </div>

      {DEMO_PROGRESS.length === 0 && (
        <div className="text-center py-20 text-text-2">
          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>还没有收藏任何诗词</p>
          <p className="text-sm mt-2 text-text-3">开始学习后会自动添加到收藏</p>
        </div>
      )}
    </div>
  )
}
