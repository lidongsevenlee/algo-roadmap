import { create } from 'zustand'

interface UIStore {
  selectedNodeId: string | null
  showLearningPanel: boolean
  showToast: boolean
  toastMessage: string

  selectNode: (nodeId: string | null) => void
  openLearningPanel: (nodeId: string) => void
  closeLearningPanel: () => void
  showToastMessage: (message: string) => void
  hideToast: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  selectedNodeId: null,
  showLearningPanel: false,
  showToast: false,
  toastMessage: '',

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
}))
