import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserProgress } from '@/types'

interface UserStore extends UserProgress {
  completeNode: (nodeId: string) => void
  completeProblem: (problemId: string) => void
  uncompleteProblem: (problemId: string) => void
  updateStreak: () => void
  reset: () => void
}

const initialState: UserProgress = {
  completedNodes: [],
  completedProblems: [],
  streak: 0,
  lastActiveAt: 0,
  problemNotes: {},
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      completeNode: (nodeId: string) => {
        const state = get()
        if (state.completedNodes.includes(nodeId)) return
        set({
          completedNodes: [...state.completedNodes, nodeId],
        })
        get().updateStreak()
      },

      completeProblem: (problemId: string) => {
        const state = get()
        if (state.completedProblems.includes(problemId)) return
        set({
          completedProblems: [...state.completedProblems, problemId],
        })
        get().updateStreak()
      },

      uncompleteProblem: (problemId: string) => {
        const state = get()
        set({
          completedProblems: state.completedProblems.filter(id => id !== problemId),
        })
      },

      updateStreak: () => {
        const now = Date.now()
        const state = get()
        const lastActive = state.lastActiveAt
        const oneDay = 24 * 60 * 60 * 1000

        if (now - lastActive > 2 * oneDay) {
          // 超过两天，streak 重置
          set({ streak: 1, lastActiveAt: now })
        } else if (now - lastActive > oneDay) {
          // 新的一天，streak +1
          set({ streak: state.streak + 1, lastActiveAt: now })
        } else {
          set({ lastActiveAt: now })
        }
      },

      reset: () => set(initialState),
    }),
    {
      name: 'algo-roadmap-progress',
    }
  )
)
