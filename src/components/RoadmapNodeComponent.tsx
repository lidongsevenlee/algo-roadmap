import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { NodeStatus, NodeType } from '@/types'
import { useUIStore } from '@/store/uiStore'

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

function RoadmapNodeComponent({ data }: { data: RoadmapNodeData }) {
  const color = typeColors[data.nodeType]
  const isLocked = data.status === 'locked'
  const isCompleted = data.status === 'completed'
  const theme = useUIStore((s) => s.theme)
  const isDark = theme === 'dark'

  const getStatusStyle = () => {
    if (isDark) {
      switch (data.status) {
        case 'completed': return 'border-green-500 bg-green-500/10'
        case 'available': return 'border-blue-400 bg-slate-800'
        case 'in-progress': return 'border-yellow-500 bg-yellow-500/10'
        case 'locked': return 'border-slate-600 bg-slate-900 opacity-50'
      }
    } else {
      switch (data.status) {
        case 'completed': return 'border-green-500 bg-green-50'
        case 'available': return 'border-blue-400 bg-white'
        case 'in-progress': return 'border-yellow-500 bg-yellow-50'
        case 'locked': return 'border-gray-300 bg-gray-100 opacity-50'
      }
    }
  }

  return (
    <div
      className={`
        relative px-4 py-3 rounded-xl border-2 min-w-[160px]
        transition-all duration-300 select-none shadow-sm
        ${getStatusStyle()}
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
        className="!w-2 !h-2"
        style={{ background: isDark ? '#64748b' : '#9ca3af', borderColor: isDark ? '#94a3b8' : '#d1d5db' }}
      />

      {/* Status indicator */}
      <div className="flex items-center justify-between mb-1">
        <span
          className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {typeLabels[data.nodeType]}
        </span>
        {isCompleted && (
          <span className="text-green-500 text-sm">✓</span>
        )}
        {data.isRecommended && !isCompleted && (
          <span className="text-blue-500 text-[10px] animate-pulse">推荐</span>
        )}
      </div>

      {/* Title */}
      <div className={`text-sm font-semibold mb-0.5 ${isDark ? 'text-slate-100' : 'text-gray-800'}`}>
        {data.labelCN}
      </div>
      <div className={`text-[10px] mb-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
        {data.label}
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <div className={`flex-1 h-1 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${data.problemCount > 0 ? (data.completedCount / data.problemCount) * 100 : 0}%`,
              backgroundColor: isCompleted ? '#22c55e' : color,
            }}
          />
        </div>
        <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
          {data.completedCount}/{data.problemCount}
        </span>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2 !h-2"
        style={{ background: isDark ? '#64748b' : '#9ca3af', borderColor: isDark ? '#94a3b8' : '#d1d5db' }}
      />
    </div>
  )
}

export default memo(RoadmapNodeComponent)
