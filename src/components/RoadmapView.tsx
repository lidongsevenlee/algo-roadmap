import { useMemo, useCallback } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
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

export default function RoadmapView() {
  const { completedNodes, completedProblems } = useUserStore()
  const { openLearningPanel } = useUIStore()

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

  const edges: Edge[] = useMemo(
    () =>
      roadmapEdges.map((e) => {
        const fromCompleted = completedNodes.includes(e.from)
        const toCompleted = completedNodes.includes(e.to)

        let color = statusEdgeColors.locked
        if (fromCompleted && toCompleted) {
          color = statusEdgeColors.completed
        } else if (fromCompleted) {
          color = statusEdgeColors.available
        }

        return {
          id: `${e.from}-${e.to}`,
          source: e.from,
          target: e.to,
          style: { stroke: color, strokeWidth: 2 },
          animated: fromCompleted && !toCompleted,
        }
      }),
    [completedNodes]
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
    <div className="flex-1">
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
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#1e293b"
        />
        <Controls
          className="!bg-slate-800 !border-slate-600 !rounded-lg [&>button]:!bg-slate-800 [&>button]:!border-slate-600 [&>button]:!text-slate-300 [&>button:hover]:!bg-slate-700"
        />
        <MiniMap
          className="!bg-slate-900 !border-slate-700"
          nodeColor={(node) => {
            const status = (node.data as { status: string })?.status
            if (status === 'completed') return '#22c55e'
            if (status === 'available') return '#3b82f6'
            return '#334155'
          }}
          maskColor="rgba(15, 23, 42, 0.8)"
        />
      </ReactFlow>
    </div>
  )
}
