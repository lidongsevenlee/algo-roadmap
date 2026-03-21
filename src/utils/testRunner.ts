import { TestCase } from '@/types'

export interface TestResult {
  index: number
  passed: boolean
  input: string
  expected: string
  actual: string
  error?: string
  time: number
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true
  if (a == null || b == null) return false
  if (typeof a !== typeof b) return false

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    return a.every((v, i) => deepEqual(v, b[i]))
  }

  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a as Record<string, unknown>)
    const keysB = Object.keys(b as Record<string, unknown>)
    if (keysA.length !== keysB.length) return false
    return keysA.every((key) =>
      deepEqual(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key]
      )
    )
  }

  return false
}

export function runTests(
  code: string,
  functionName: string,
  testCases: TestCase[]
): TestResult[] {
  const results: TestResult[] = []

  let fn: (...args: unknown[]) => unknown
  try {
    // Create function from user code
    const wrapped = `${code}\nreturn ${functionName};`
    fn = new Function(wrapped)() as (...args: unknown[]) => unknown

    if (typeof fn !== 'function') {
      return testCases.map((tc, i) => ({
        index: i,
        passed: false,
        input: JSON.stringify(tc.input),
        expected: JSON.stringify(tc.expected),
        actual: '',
        error: `函数 "${functionName}" 未定义或不是函数`,
        time: 0,
      }))
    }
  } catch (err) {
    return testCases.map((tc, i) => ({
      index: i,
      passed: false,
      input: JSON.stringify(tc.input),
      expected: JSON.stringify(tc.expected),
      actual: '',
      error: `语法错误: ${(err as Error).message}`,
      time: 0,
    }))
  }

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i]
    // Deep clone inputs to avoid mutation
    const inputCopy = JSON.parse(JSON.stringify(tc.input))
    const start = performance.now()

    try {
      const actual = fn(...inputCopy)
      const elapsed = performance.now() - start
      const passed = deepEqual(actual, tc.expected)

      results.push({
        index: i,
        passed,
        input: JSON.stringify(tc.input),
        expected: JSON.stringify(tc.expected),
        actual: JSON.stringify(actual),
        time: Math.round(elapsed * 100) / 100,
      })
    } catch (err) {
      const elapsed = performance.now() - start
      results.push({
        index: i,
        passed: false,
        input: JSON.stringify(tc.input),
        expected: JSON.stringify(tc.expected),
        actual: '',
        error: `运行错误: ${(err as Error).message}`,
        time: Math.round(elapsed * 100) / 100,
      })
    }
  }

  return results
}
