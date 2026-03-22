import { useState } from 'react'
import { Problem } from '@/types'
import { useUIStore } from '@/store/uiStore'
import { useUserStore } from '@/store/userStore'
import CodeEditor from './CodeEditor'

interface ProblemModalProps {
  problem: Problem
}

const difficultyColor = {
  easy: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-400/10',
  medium: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-400/10',
  hard: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-400/10',
}

const difficultyLabel = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
}

const patternLabels: Record<string, string> = {
  'hash-map': '哈希表',
  'linked-list': '链表',
  'stack': '栈',
  'queue': '队列',
  'two-pointers': '双指针',
  'sliding-window': '滑动窗口',
  'binary-search': '二分查找',
  'dfs': '深度优先搜索',
  'bfs': '广度优先搜索',
  'backtracking': '回溯',
  'dp': '动态规划',
  'tree': '树',
  'heap': '堆',
  'graph': '图',
}

export default function ProblemModal({ problem }: ProblemModalProps) {
  const { closeProblemModal, showToastMessage } = useUIStore()
  const { completedProblems, completeProblem, uncompleteProblem } = useUserStore()
  const isCompleted = completedProblems.includes(problem.id)
  const hasEditor = !!problem.starterCode && !!problem.testCases
  const [showHint, setShowHint] = useState(false)
  const [showTemplate, setShowTemplate] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const handleAnimatedClose = () => {
    setIsClosing(true)
    setTimeout(() => closeProblemModal(), 200)
  }

  const handleToggle = () => {
    if (isCompleted) {
      uncompleteProblem(problem.id)
    } else {
      completeProblem(problem.id)
      showToastMessage('做得好！继续加油！')
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm transition-opacity duration-200 ${isClosing ? 'opacity-0' : 'animate-fade-in'}`}
        onClick={handleAnimatedClose}
      />

      {/* Modal - wider when editor is present */}
      <div className={`relative w-full ${hasEditor ? 'max-w-6xl' : 'max-w-2xl'} h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden flex flex-col transition-all duration-200 ${isClosing ? 'opacity-0 scale-95' : 'animate-modal-in'}`}>
        {/* Header */}
        <div className="px-5 py-3 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-gray-900 dark:text-slate-100">
              {problem.titleCN}
            </h2>
            <span className="text-sm text-gray-400 dark:text-slate-500">{problem.title}</span>
            <span className={`text-xs px-2 py-0.5 rounded ${difficultyColor[problem.difficulty]}`}>
              {difficultyLabel[problem.difficulty]}
            </span>
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-400/10 px-2 py-0.5 rounded-full">
              {patternLabels[problem.pattern] || problem.pattern}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={problem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 dark:text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              LeetCode ↗
            </a>
            <button
              onClick={handleToggle}
              className={`
                text-xs px-3 py-1.5 rounded-md font-medium transition-colors
                ${isCompleted
                  ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 hover:bg-red-100 dark:hover:bg-red-500/20 hover:text-red-600 dark:hover:text-red-400'
                  : 'bg-blue-600 text-white hover:bg-blue-500'
                }
              `}
            >
              {isCompleted ? '✓ 已完成' : '标记完成'}
            </button>
            <button
              onClick={handleAnimatedClose}
              className="text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-slate-200 text-lg"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Problem description */}
          <div className={`${hasEditor ? 'w-[45%]' : 'w-full'} overflow-y-auto px-5 py-4 space-y-4 border-r border-gray-200 dark:border-slate-700`}>
            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">题目描述</h3>
              <div className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                {problem.description}
              </div>
            </div>

            {/* Examples */}
            {problem.examples && problem.examples.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">示例</h3>
                <div className="space-y-2">
                  {problem.examples.map((ex, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3 border border-gray-100 dark:border-slate-700">
                      <div className="text-xs font-medium text-gray-500 dark:text-slate-400 mb-1">示例 {i + 1}</div>
                      <div className="font-mono text-xs text-gray-700 dark:text-slate-300">
                        <div><span className="text-gray-400 dark:text-slate-500">输入：</span>{ex.input}</div>
                        <div><span className="text-gray-400 dark:text-slate-500">输出：</span>{ex.output}</div>
                        {ex.explanation && (
                          <div className="mt-1 text-gray-500 dark:text-slate-400 text-[11px]">
                            解释：{ex.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hint (collapsible) */}
            {problem.hint && (
              <div>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-sm font-semibold text-yellow-700 dark:text-yellow-400 flex items-center gap-1.5 hover:opacity-80"
                >
                  <span>{showHint ? '▾' : '▸'}</span>
                  💡 提示
                </button>
                {showHint && (
                  <div className="mt-2 bg-yellow-50 dark:bg-yellow-400/5 border border-yellow-200 dark:border-yellow-400/20 rounded-lg p-3">
                    <div className="text-sm text-yellow-800 dark:text-yellow-300">{problem.hint}</div>
                  </div>
                )}
              </div>
            )}

            {/* Template (collapsible) */}
            {problem.template && (
              <div>
                <button
                  onClick={() => setShowTemplate(!showTemplate)}
                  className="text-sm font-semibold text-gray-700 dark:text-slate-300 flex items-center gap-1.5 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  <span>{showTemplate ? '▾' : '▸'}</span>
                  参考模板
                </button>
                {showTemplate && (
                  <pre className="mt-2 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-lg p-3 text-xs text-gray-700 dark:text-slate-300 overflow-x-auto font-mono leading-relaxed">
                    {problem.template}
                  </pre>
                )}
              </div>
            )}
          </div>

          {/* Right: Code editor */}
          {hasEditor && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <CodeEditor problem={problem} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
