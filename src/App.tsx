import { roadmapNodes } from '@/data/roadmap'
import { useUIStore } from '@/store/uiStore'
import Header from '@/components/Header'
import RoadmapView from '@/components/RoadmapView'
import LearningPanel from '@/components/LearningPanel'
import Toast from '@/components/Toast'

export default function App() {
  const { selectedNodeId, showLearningPanel } = useUIStore()

  const selectedNode = selectedNodeId
    ? roadmapNodes.find((n) => n.id === selectedNodeId)
    : null

  return (
    <div className="h-screen flex flex-col bg-slate-950">
      <Header />
      <RoadmapView />
      {showLearningPanel && selectedNode && (
        <LearningPanel node={selectedNode} />
      )}
      <Toast />
    </div>
  )
}
