import { useUIStore } from '@/store/uiStore'

export default function Toast() {
  const { showToast, toastMessage } = useUIStore()

  if (!showToast) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-bounce-in">
      <div className="px-6 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl shadow-2xl text-sm text-gray-800 dark:text-slate-100 font-medium transition-colors">
        {toastMessage}
      </div>
    </div>
  )
}
