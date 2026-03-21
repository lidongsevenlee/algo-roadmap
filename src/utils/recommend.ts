import { RoadmapNode, NodeStatus } from '@/types'

export function getNodeStatus(
  node: RoadmapNode,
  completedNodes: string[],
  _allNodes?: RoadmapNode[]
): NodeStatus {
  if (completedNodes.includes(node.id)) return 'completed'

  const prerequisitesMet = node.prerequisites.every((preId) =>
    completedNodes.includes(preId)
  )

  // If node has no prerequisites, it's always available
  if (node.prerequisites.length === 0) return 'available'

  return prerequisitesMet ? 'available' : 'locked'
}

export function getRecommendedNode(
  nodes: RoadmapNode[],
  completedNodes: string[]
): RoadmapNode | null {
  // Find the first available node that hasn't been completed
  // Prioritize by: no prerequisites first, then by difficulty
  const available = nodes
    .filter((n) => {
      if (completedNodes.includes(n.id)) return false
      return n.prerequisites.every((p) => completedNodes.includes(p)) || n.prerequisites.length === 0
    })
    .sort((a, b) => {
      const diffOrder = { easy: 0, medium: 1, hard: 2 }
      return diffOrder[a.difficulty] - diffOrder[b.difficulty]
    })

  return available[0] || null
}

export function getCompletionPercentage(
  completedNodes: string[],
  totalNodes: number
): number {
  if (totalNodes === 0) return 0
  return Math.round((completedNodes.length / totalNodes) * 100)
}
