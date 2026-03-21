import { useState } from 'react'
import { RoadmapNode, LearningState, Problem } from '@/types'
import { problems } from '@/data/problems'
import { useUserStore } from '@/store/userStore'
import { useUIStore } from '@/store/uiStore'

interface LearningPanelProps {
  node: RoadmapNode
}

export default function LearningPanel({ node }: LearningPanelProps) {
  const [learningState, setLearningState] = useState<LearningState>('idle')
  const [showTemplate, setShowTemplate] = useState(false)
  const { completedProblems, completeProblem, uncompleteProblem, completeNode } = useUserStore()
  const { closeLearningPanel, showToastMessage, openProblemModal } = useUIStore()

  const nodeProblems: Problem[] = node.problems
    .map((id) => problems[id])
    .filter(Boolean)

  const completedCount = nodeProblems.filter((p) =>
    completedProblems.includes(p.id)
  ).length

  const allCompleted = completedCount === nodeProblems.length && nodeProblems.length > 0

  const handleStartLearning = () => {
    setLearningState('learning')
  }

  const handleToggleProblem = (problemId: string) => {
    if (completedProblems.includes(problemId)) {
      uncompleteProblem(problemId)
    } else {
      completeProblem(problemId)
      showToastMessage('做得好！继续加油！')

      const newCompleted = completedProblems.filter(id => id !== problemId).length + 1
      const needed = nodeProblems.length
      if (newCompleted >= needed && needed > 0) {
        completeNode(node.id)
        showToastMessage(`恭喜完成「${node.titleCN}」节点！`)
        setLearningState('completed')
      } else {
        setLearningState('practicing')
      }
    }
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

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={closeLearningPanel}
      />

      {/* Panel */}
      <div className="relative ml-auto w-full max-w-4xl bg-white dark:bg-slate-900 border-l border-gray-200 dark:border-slate-700 overflow-y-auto flex transition-colors">
        {/* Left: Knowledge */}
        <div className="flex-1 p-6 border-r border-gray-200 dark:border-slate-700 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">
                {node.knowledge.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                {node.knowledge.description}
              </p>
            </div>
            <button
              onClick={closeLearningPanel}
              className="text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-slate-200 text-xl p-2"
            >
              ✕
            </button>
          </div>

          {/* Complexity */}
          {node.knowledge.complexity && (
            <div className="flex gap-4 mb-6">
              <div className="px-3 py-2 bg-gray-100 dark:bg-slate-800 rounded-lg">
                <div className="text-[10px] text-gray-400 dark:text-slate-500 uppercase">时间</div>
                <div className="text-sm text-blue-500 dark:text-blue-400 font-mono">
                  {node.knowledge.complexity.time}
                </div>
              </div>
              <div className="px-3 py-2 bg-gray-100 dark:bg-slate-800 rounded-lg">
                <div className="text-[10px] text-gray-400 dark:text-slate-500 uppercase">空间</div>
                <div className="text-sm text-purple-500 dark:text-purple-400 font-mono">
                  {node.knowledge.complexity.space}
                </div>
              </div>
            </div>
          )}

          {/* Key Points */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3">
              要点
            </h3>
            <ul className="space-y-2">
              {node.knowledge.keyPoints.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-600 dark:text-slate-300"
                >
                  <span className="text-blue-500 dark:text-blue-400 mt-0.5">▸</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Template */}
          {node.knowledge.template && (
            <div className="mb-6">
              <button
                onClick={() => setShowTemplate(!showTemplate)}
                className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3 flex items-center gap-2 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                <span>{showTemplate ? '▾' : '▸'}</span>
                代码模板
              </button>
              {showTemplate && (
                <pre className="bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-lg p-4 text-sm text-gray-700 dark:text-slate-300 overflow-x-auto font-mono leading-relaxed">
                  {node.knowledge.template}
                </pre>
              )}
            </div>
          )}

          {/* Learning state */}
          {learningState === 'idle' && (
            <button
              onClick={handleStartLearning}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
            >
              开始学习
            </button>
          )}
          {learningState === 'completed' && (
            <div className="text-center py-4">
              <div className="text-3xl mb-2">🎉</div>
              <div className="text-green-500 font-semibold">节点已完成！</div>
            </div>
          )}
        </div>

        {/* Right: Problems */}
        <div className="w-80 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
              练习题目
            </h3>
            <span className="text-sm text-gray-500 dark:text-slate-400">
              {completedCount}/{nodeProblems.length}
            </span>
          </div>

          {/* Progress */}
          <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{
                width: `${nodeProblems.length > 0 ? (completedCount / nodeProblems.length) * 100 : 0}%`,
              }}
            />
          </div>

          <div className="space-y-3">
            {nodeProblems.map((problem) => {
              const isCompleted = completedProblems.includes(problem.id)
              return (
                <div
                  key={problem.id}
                  className={`
                    p-3 rounded-lg border transition-all cursor-pointer
                    ${
                      isCompleted
                        ? 'border-green-300 dark:border-green-500/30 bg-green-50 dark:bg-green-500/5'
                        : 'border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 hover:border-blue-300 dark:hover:border-slate-500'
                    }
                  `}
                  onClick={() => openProblemModal(problem)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800 dark:text-slate-200">
                        {problem.titleCN}
                      </div>
                      <div className="text-[11px] text-gray-400 dark:text-slate-500">
                        {problem.title}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${difficultyColor[problem.difficulty]}`}
                    >
                      {difficultyLabel[problem.difficulty]}
                    </span>
                  </div>

                  {/* Pattern hint */}
                  <div className="text-[11px] text-blue-500 dark:text-blue-400 mb-2">
                    模式：{problem.pattern}
                  </div>

                  {/* Hint */}
                  {problem.hint && (
                    <div className="text-[11px] text-gray-400 dark:text-slate-500 mb-2">
                      💡 {problem.hint}
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300">
                      查看题目 →
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggleProblem(problem.id)
                      }}
                      className={`
                        ml-auto text-[11px] px-2 py-1 rounded transition-colors
                        ${
                          isCompleted
                            ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-red-100 dark:hover:bg-red-500/20 hover:text-red-600 dark:hover:text-red-400'
                            : 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-green-100 dark:hover:bg-green-500/20 hover:text-green-600 dark:hover:text-green-400'
                        }
                      `}
                    >
                      {isCompleted ? '✓ 已完成' : '标记完成'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {allCompleted && !completedProblems.includes('_node_' + node.id) && (
            <button
              onClick={() => {
                completeNode(node.id)
                showToastMessage(`「${node.titleCN}」已完成！`)
                setLearningState('completed')
              }}
              className="w-full mt-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-colors"
            >
              完成此节点
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
