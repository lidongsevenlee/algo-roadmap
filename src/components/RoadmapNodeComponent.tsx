import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { NodeStatus, NodeType } from '@/types'

interface RoadmapNodeData {
  label: string
  labelCN: string
  nodeType: NodeType
  difficulty: string
  status: NodeStatus
  isRecommended: boolean
  problemCount: number
  completedCount: number
}

const typeColors: Record<NodeType, string> = {
  'data-structure': '#3b82f6',
  'technique': '#a855f7',
  'algorithm': '#f59e0b',
  'advanced': '#ef4444',
}

const typeLabels: Record<NodeType, string> = {
  'data-structure': '数据结构',
  'technique': '技巧',
  'algorithm': '算法',
  'advanced': '进阶',
}

const statusStyles: Record<NodeStatus, string> = {
  completed: 'border-green-500 bg-green-500/10',
  available: 'border-blue-400 bg-slate-800',
  'in-progress': 'border-yellow-500 bg-yellow-500/10',
  locked: 'border-slate-600 bg-slate-900 opacity-50',
}

function RoadmapNodeComponent({ data }: { data: RoadmapNodeData }) {
  const color = typeColors[data.nodeType]
  const isLocked = data.status === 'locked'
  const isCompleted = data.status === 'completed'

  return (
    <div
      className={`
        relative px-4 py-3 rounded-xl border-2 min-w-[160px]
        transition-all duration-300 select-none
        ${statusStyles[data.status]}
        ${data.isRecommended ? 'node-glow' : ''}
        ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
      `}
      style={{
        borderColor: isCompleted ? '#22c55e' : isLocked ? undefined : color,
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-slate-500 !border-slate-400 !w-2 !h-2"
      />

      {/* Status indicator */}
      <div className="flex items-center justify-between mb-1">
        <span
          className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
          style={{ backgroundColor: `${color}30`, color }}
        >
          {typeLabels[data.nodeType]}
        </span>
        {isCompleted && (
          <span className="text-green-400 text-sm">✓</span>
        )}
        {data.isRecommended && !isCompleted && (
          <span className="text-blue-400 text-[10px] animate-pulse">推荐</span>
        )}
      </div>

      {/* Title */}
      <div className="text-sm font-semibold text-slate-100 mb-0.5">
        {data.labelCN}
      </div>
      <div className="text-[10px] text-slate-400 mb-2">
        {data.label}
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${data.problemCount > 0 ? (data.completedCount / data.problemCount) * 100 : 0}%`,
              backgroundColor: isCompleted ? '#22c55e' : color,
            }}
          />
        </div>
        <span className="text-[10px] text-slate-400">
          {data.completedCount}/{data.problemCount}
        </span>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-slate-500 !border-slate-400 !w-2 !h-2"
      />
    </div>
  )
}

export default memo(RoadmapNodeComponent)
