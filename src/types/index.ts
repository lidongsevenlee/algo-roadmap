export type NodeType = 'data-structure' | 'technique' | 'algorithm' | 'advanced'

export type Difficulty = 'easy' | 'medium' | 'hard'

export type LearningState = 'idle' | 'learning' | 'practicing' | 'completed'

export type NodeStatus = 'locked' | 'available' | 'in-progress' | 'completed'

export type PatternType =
  | 'hash-map'
  | 'linked-list'
  | 'stack'
  | 'queue'
  | 'two-pointers'
  | 'sliding-window'
  | 'binary-search'
  | 'dfs'
  | 'bfs'
  | 'backtracking'
  | 'dp'
  | 'tree'
  | 'heap'
  | 'graph'

export interface Problem {
  id: string
  title: string
  titleCN: string
  difficulty: Difficulty
  pattern: PatternType
  link: string
  description: string
  examples?: { input: string; output: string; explanation?: string }[]
  template?: string
  hint?: string
}

export interface KnowledgeCard {
  title: string
  description: string
  template?: string
  complexity?: { time: string; space: string }
  keyPoints: string[]
}

export interface RoadmapNode {
  id: string
  title: string
  titleCN: string
  type: NodeType
  difficulty: Difficulty
  prerequisites: string[]
  problems: string[]
  knowledge: KnowledgeCard
  position: { x: number; y: number }
}

export interface RoadmapEdge {
  from: string
  to: string
}

export interface RoadmapGraph {
  nodes: RoadmapNode[]
  edges: RoadmapEdge[]
}

export interface UserProgress {
  completedNodes: string[]
  completedProblems: string[]
  streak: number
  lastActiveAt: number
  problemNotes: Record<string, string>
}
