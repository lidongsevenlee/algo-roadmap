import { useMemo, useCallback, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  Node,
  Edge,
  NodeMouseHandler,
  BackgroundVariant,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { roadmapNodes, roadmapEdges } from '@/data/roadmap'
import { useUserStore } from '@/store/userStore'
import { useUIStore } from '@/store/uiStore'
import { getNodeStatus, getRecommendedNode } from '@/utils/recommend'
import RoadmapNodeComponent from './RoadmapNodeComponent'

const nodeTypes = {
  roadmapNode: RoadmapNodeComponent,
}

const statusEdgeColors: Record<string, string> = {
  completed: '#22c55e',
  available: '#475569',
  locked: '#1e293b',
}

const statusEdgeColorsLight: Record<string, string> = {
  completed: '#16a34a',
  available: '#64748b',
  locked: '#cbd5e1',
}

export default function RoadmapView() {
  const { completedNodes, completedProblems } = useUserStore()
  const { openLearningPanel, theme } = useUIStore()
  const isDark = theme === 'dark'
  const [isInteractive, setIsInteractive] = useState(true)

  const recommendedNode = useMemo(
    () => getRecommendedNode(roadmapNodes, completedNodes),
    [completedNodes]
  )

  const nodes: Node[] = useMemo(
    () =>
      roadmapNodes.map((rNode) => {
        const status = getNodeStatus(rNode, completedNodes, roadmapNodes)
        const completedCount = rNode.problems.filter((p) =>
          completedProblems.includes(p)
        ).length

        return {
          id: rNode.id,
          type: 'roadmapNode',
          position: rNode.position,
          data: {
            label: rNode.title,
            labelCN: rNode.titleCN,
            nodeType: rNode.type,
            difficulty: rNode.difficulty,
            status,
            isRecommended: recommendedNode?.id === rNode.id,
            problemCount: rNode.problems.length,
            completedCount,
          },
        }
      }),
    [completedNodes, completedProblems, recommendedNode]
  )

  const edgeColors = isDark ? statusEdgeColors : statusEdgeColorsLight

  const edges: Edge[] = useMemo(
    () =>
      roadmapEdges.map((e) => {
        const fromCompleted = completedNodes.includes(e.from)
        const toCompleted = completedNodes.includes(e.to)

        let color = edgeColors.locked
        if (fromCompleted && toCompleted) {
          color = edgeColors.completed
        } else if (fromCompleted) {
          color = edgeColors.available
        }

        return {
          id: `${e.from}-${e.to}`,
          source: e.from,
          target: e.to,
          style: { stroke: color, strokeWidth: isDark ? 2 : 2.5 },
          animated: fromCompleted && !toCompleted,
        }
      }),
    [completedNodes, edgeColors]
  )

  const handleNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      const rNode = roadmapNodes.find((n) => n.id === node.id)
      if (!rNode) return

      const status = getNodeStatus(rNode, completedNodes, roadmapNodes)
      if (status === 'locked') return

      openLearningPanel(node.id)
    },
    [completedNodes, openLearningPanel]
  )

  return (
    <div className={`flex-1 ${isDark ? 'bg-slate-950' : 'bg-gray-50'} transition-colors`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.3}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={isInteractive}
        nodesConnectable={false}
        elementsSelectable={isInteractive}
        panOnDrag={isInteractive}
        zoomOnScroll={isInteractive}
        zoomOnPinch={isInteractive}
        zoomOnDoubleClick={isInteractive}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color={isDark ? '#1e293b' : '#d1d5db'}
        />
        <Controls
          showInteractive={true}
          onInteractiveChange={(interactive) => setIsInteractive(interactive)}
          className={isDark
            ? '!bg-slate-800 !border-slate-600 !rounded-lg [&>button]:!bg-slate-800 [&>button]:!border-slate-600 [&>button]:!text-slate-300 [&>button:hover]:!bg-slate-700'
            : '!bg-white !border-gray-300 !rounded-lg [&>button]:!bg-white [&>button]:!border-gray-300 [&>button]:!text-gray-600 [&>button:hover]:!bg-gray-100'
          }
        />
      </ReactFlow>
    </div>
  )
}
