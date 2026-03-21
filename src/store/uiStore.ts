import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Problem } from '@/types'

type Theme = 'dark' | 'light'

interface UIStore {
  selectedNodeId: string | null
  showLearningPanel: boolean
  showToast: boolean
  toastMessage: string
  theme: Theme
  // Problem modal
  activeProblem: Problem | null

  selectNode: (nodeId: string | null) => void
  openLearningPanel: (nodeId: string) => void
  closeLearningPanel: () => void
  showToastMessage: (message: string) => void
  hideToast: () => void
  toggleTheme: () => void
  openProblemModal: (problem: Problem) => void
  closeProblemModal: () => void
}

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      selectedNodeId: null,
      showLearningPanel: false,
      showToast: false,
      toastMessage: '',
      theme: 'dark',
      activeProblem: null,

      selectNode: (nodeId) => set({ selectedNodeId: nodeId }),

      openLearningPanel: (nodeId) =>
        set({ selectedNodeId: nodeId, showLearningPanel: true }),

      closeLearningPanel: () =>
        set({ showLearningPanel: false }),

      showToastMessage: (message) => {
        set({ showToast: true, toastMessage: message })
        setTimeout(() => set({ showToast: false, toastMessage: '' }), 3000)
      },

      hideToast: () => set({ showToast: false, toastMessage: '' }),

      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark'
        set({ theme: next })
        // Sync class on <html>
        if (next === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },

      openProblemModal: (problem) => set({ activeProblem: problem }),
      closeProblemModal: () => set({ activeProblem: null }),
    }),
    {
      name: 'algo-roadmap-ui',
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        // Apply theme on load
        if (state?.theme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },
    }
  )
)
