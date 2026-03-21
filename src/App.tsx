import { roadmapNodes } from '@/data/roadmap'
import { useUIStore } from '@/store/uiStore'
import Header from '@/components/Header'
import RoadmapView from '@/components/RoadmapView'
import LearningPanel from '@/components/LearningPanel'
import ProblemModal from '@/components/ProblemModal'
import Toast from '@/components/Toast'

export default function App() {
  const { selectedNodeId, showLearningPanel, activeProblem } = useUIStore()

  const selectedNode = selectedNodeId
    ? roadmapNodes.find((n) => n.id === selectedNodeId)
    : null

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-slate-950 transition-colors">
      <Header />
      <RoadmapView />
      {showLearningPanel && selectedNode && (
        <LearningPanel node={selectedNode} />
      )}
      {activeProblem && <ProblemModal problem={activeProblem} />}
      <Toast />
    </div>
  )
}
