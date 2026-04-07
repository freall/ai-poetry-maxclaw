import { motion } from 'framer-motion'
import { Trophy, Lock, Star, ChevronRight } from 'lucide-react'

const challenges = [
  { id: 'tang-basic', name: '唐诗入门', icon: '🌙', desc: '10首基础唐诗', poems: 10, completed: 0, stars: 0, unlocked: true },
  { id: 'song-ci-basic', name: '宋词初体验', icon: '🏮', desc: '10首经典宋词', poems: 10, completed: 3, stars: 1, unlocked: true },
  { id: 'prose-basic', name: '古文小试', icon: '📜', desc: '5篇古文经典', poems: 5, completed: 0, stars: 0, unlocked: false },
  { id: 'tang-advance', name: '唐诗进阶', icon: '⚔️', desc: '20首进阶唐诗', poems: 20, completed: 0, stars: 0, unlocked: false },
  { id: 'master', name: '诗词大师', icon: '🏆', desc: '全部诗词大挑战', poems: 100, completed: 0, stars: 0, unlocked: false },
]

export default function ChallengePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 pt-6">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-6 h-6 text-gold" />
        <h1 className="text-2xl font-bold">闯关挑战</h1>
      </div>

      {/* Total stars */}
      <div className="bg-surface rounded-2xl border border-border p-5 mb-6 text-center">
        <div className="text-4xl mb-2">
          {challenges.reduce((s, c) => s + c.stars, 0)} ⭐
        </div>
        <p className="text-sm text-text-2">当前获得星星</p>
      </div>

      <div className="space-y-3">
        {challenges.map((ch, i) => (
          <motion.div
            key={ch.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div
              className={`relative overflow-hidden rounded-2xl border transition-all ${
                ch.unlocked
                  ? 'bg-surface border-border hover:border-gold/30 cursor-pointer'
                  : 'bg-surface/50 border-border/50 cursor-not-allowed opacity-60'
              }`}
            >
              {!ch.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <Lock className="w-8 h-8 text-text-3" />
                </div>
              )}
              <div className="flex items-center gap-4 p-5">
                <div className="text-4xl">{ch.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-text">{ch.name}</h3>
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {[0,1,2].map(s => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${s < ch.stars ? 'text-gold fill-gold' : 'text-text-3'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-text-2 mb-2">{ch.desc}</p>
                  {/* Progress bar */}
                  {ch.unlocked && (
                    <div>
                      <div className="flex justify-between text-xs text-text-3 mb-1">
                        <span>进度</span>
                        <span>{ch.completed}/{ch.poems}</span>
                      </div>
                      <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold rounded-full transition-all"
                          style={{ width: `${(ch.completed / ch.poems) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                {ch.unlocked && (
                  <ChevronRight className="w-5 h-5 text-text-3" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
