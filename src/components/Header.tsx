import { useUserStore } from '@/store/userStore'
import { useUIStore } from '@/store/uiStore'
import { roadmapNodes } from '@/data/roadmap'
import { getCompletionPercentage } from '@/utils/recommend'

export default function Header() {
  const { completedNodes, completedProblems, streak } = useUserStore()
  const { theme, toggleTheme } = useUIStore()
  const percentage = getCompletionPercentage(completedNodes, roadmapNodes.length)

  return (
    <header className="h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700/50 flex items-center justify-between px-6 z-10 relative transition-colors">
      <div className="flex items-center gap-3">
        <div className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Algorithm Roadmap
        </div>
        <span className="text-xs text-gray-400 dark:text-slate-500">算法路线图</span>
      </div>

      <div className="flex items-center gap-6">
        {/* Streak */}
        {streak > 0 && (
          <div className="flex items-center gap-1.5">
            <span className="text-orange-400">🔥</span>
            <span className="text-sm text-gray-600 dark:text-slate-300">
              连续 <span className="text-orange-500 font-semibold">{streak}</span> 天
            </span>
          </div>
        )}

        {/* Problems done */}
        <div className="flex items-center gap-1.5">
          <span className="text-sm text-gray-500 dark:text-slate-400">已做题</span>
          <span className="text-sm text-green-500 dark:text-green-400 font-semibold">
            {completedProblems.length}
          </span>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2">
          <div className="w-24 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-sm text-gray-500 dark:text-slate-400">{percentage}%</span>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors text-sm"
          title={theme === 'dark' ? '切换到白天模式' : '切换到黑夜模式'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {/* Reset */}
        <button
          onClick={() => {
            if (window.confirm('确定要重置所有进度吗？')) {
              useUserStore.getState().reset()
            }
          }}
          className="text-xs text-gray-400 dark:text-slate-600 hover:text-gray-600 dark:hover:text-slate-400 transition-colors"
        >
          重置
        </button>
      </div>
    </header>
  )
}
