import { useEffect, useRef, useState, useCallback } from 'react'
import { EditorView, keymap } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { basicSetup } from 'codemirror'
import { useUIStore } from '@/store/uiStore'
import { Problem } from '@/types'
import { runTests, TestResult } from '@/utils/testRunner'

interface CodeEditorProps {
  problem: Problem
}

// Light theme
const lightTheme = EditorView.theme({
  '&': { backgroundColor: '#ffffff' },
  '.cm-gutters': { backgroundColor: '#f8fafc', borderRight: '1px solid #e2e8f0', color: '#94a3b8' },
  '.cm-activeLineGutter': { backgroundColor: '#f1f5f9' },
  '.cm-activeLine': { backgroundColor: '#f8fafc' },
})

export default function CodeEditor({ problem }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const [results, setResults] = useState<TestResult[] | null>(null)
  const [running, setRunning] = useState(false)
  const theme = useUIStore((s) => s.theme)
  const isDark = theme === 'dark'

  const starterCode = problem.starterCode || `function solution() {\n  // 在这里写你的代码\n  \n}`

  // Load saved code or use starter
  const savedKey = `algo-code-${problem.id}`
  const initialCode = localStorage.getItem(savedKey) || starterCode

  useEffect(() => {
    if (!editorRef.current) return

    const state = EditorState.create({
      doc: initialCode,
      extensions: [
        basicSetup,
        javascript(),
        isDark ? oneDark : lightTheme,
        keymap.of([]),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            localStorage.setItem(savedKey, update.state.doc.toString())
          }
        }),
      ],
    })

    const view = new EditorView({
      state,
      parent: editorRef.current,
    })

    viewRef.current = view

    return () => {
      view.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problem.id, isDark])

  const handleRun = useCallback(() => {
    if (!viewRef.current || !problem.testCases || !problem.functionName) return

    setRunning(true)
    const code = viewRef.current.state.doc.toString()

    // Run async to let UI update
    setTimeout(() => {
      const testResults = runTests(code, problem.functionName!, problem.testCases!)
      setResults(testResults)
      setRunning(false)
    }, 50)
  }, [problem])

  const handleReset = useCallback(() => {
    if (!viewRef.current || !editorRef.current) return
    localStorage.removeItem(savedKey)
    setResults(null)
    // Destroy and recreate
    viewRef.current.destroy()
    const newState = EditorState.create({
      doc: starterCode,
      extensions: [
        basicSetup,
        javascript(),
        isDark ? oneDark : lightTheme,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            localStorage.setItem(savedKey, update.state.doc.toString())
          }
        }),
      ],
    })
    viewRef.current = new EditorView({ state: newState, parent: editorRef.current })
  }, [starterCode, savedKey, isDark])

  const passedCount = results?.filter((r) => r.passed).length ?? 0
  const totalCount = results?.length ?? 0
  const allPassed = results && passedCount === totalCount

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500 dark:text-slate-400">JavaScript</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="text-xs px-2 py-1 rounded text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            重置
          </button>
          <button
            onClick={handleRun}
            disabled={running || !problem.testCases}
            className={`
              text-xs px-3 py-1.5 rounded-md font-medium transition-colors
              ${running
                ? 'bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-slate-400 cursor-wait'
                : 'bg-green-600 hover:bg-green-500 text-white'
              }
              ${!problem.testCases ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {running ? '运行中...' : '▶ 运行'}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        className="flex-1 overflow-auto text-sm [&_.cm-editor]:h-full [&_.cm-scroller]:!overflow-auto"
      />

      {/* Results */}
      {results && (
        <div className="border-t border-gray-200 dark:border-slate-700 max-h-[200px] overflow-y-auto">
          <div className={`px-3 py-2 text-xs font-medium ${allPassed ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/5' : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/5'}`}>
            {allPassed ? `全部通过 ${passedCount}/${totalCount}` : `通过 ${passedCount}/${totalCount}`}
          </div>
          <div className="divide-y divide-gray-100 dark:divide-slate-800">
            {results.map((r) => (
              <div key={r.index} className="px-3 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium ${r.passed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {r.passed ? '✓' : '✗'} 测试 {r.index + 1}
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-slate-500">{r.time}ms</span>
                </div>
                {!r.passed && (
                  <div className="text-[11px] font-mono space-y-0.5">
                    <div className="text-gray-500 dark:text-slate-400">
                      <span className="text-gray-400 dark:text-slate-500">输入: </span>
                      {r.input}
                    </div>
                    <div className="text-green-600 dark:text-green-400">
                      <span className="text-gray-400 dark:text-slate-500">期望: </span>
                      {r.expected}
                    </div>
                    {r.error ? (
                      <div className="text-red-500">{r.error}</div>
                    ) : (
                      <div className="text-red-500 dark:text-red-400">
                        <span className="text-gray-400 dark:text-slate-500">实际: </span>
                        {r.actual}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
