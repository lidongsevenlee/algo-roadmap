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

// Helper code injected for linked-list problems
const linkedListHelpers = `
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
function __arrayToList(arr) {
  if (!arr || !arr.length) return null;
  const dummy = new ListNode(0);
  let curr = dummy;
  for (const val of arr) {
    curr.next = new ListNode(val);
    curr = curr.next;
  }
  return dummy.next;
}
function __listToArray(head) {
  const result = [];
  let curr = head;
  let limit = 10000;
  while (curr && limit-- > 0) {
    result.push(curr.val);
    curr = curr.next;
  }
  return result;
}
function __arrayToListWithCycle(arr, pos) {
  if (!arr || !arr.length) return null;
  const dummy = new ListNode(0);
  let curr = dummy;
  const nodes = [];
  for (const val of arr) {
    curr.next = new ListNode(val);
    curr = curr.next;
    nodes.push(curr);
  }
  if (pos >= 0 && pos < nodes.length) {
    curr.next = nodes[pos];
  }
  return dummy.next;
}
`

// Helper code injected for binary-tree problems
const binaryTreeHelpers = `
class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
function __arrayToTree(arr) {
  if (!arr || !arr.length || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (i < arr.length) {
    const node = queue.shift();
    if (i < arr.length && arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}
function __treeToArray(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    if (node) {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      result.push(null);
    }
  }
  while (result.length && result[result.length - 1] === null) result.pop();
  return result;
}
function __findNode(root, val) {
  if (!root) return null;
  if (root.val === val) return root;
  return __findNode(root.left, val) || __findNode(root.right, val);
}
`

type DataStructureType = 'linked-list' | 'linked-list-cycle' | 'binary-tree' | 'binary-tree-lca' | 'class-ops' | undefined

function getHelperCode(ds: DataStructureType): string {
  if (ds === 'linked-list' || ds === 'linked-list-cycle') return linkedListHelpers
  if (ds === 'binary-tree' || ds === 'binary-tree-lca') return binaryTreeHelpers
  return ''
}

function convertInputs(inputs: unknown[], ds: DataStructureType): string {
  if (!ds) return inputs.map((v) => JSON.stringify(v)).join(', ')

  if (ds === 'linked-list-cycle') {
    // inputs: [arr, pos] → __arrayToListWithCycle(arr, pos)
    const arr = JSON.stringify(inputs[0])
    const pos = JSON.stringify(inputs[1])
    return `__arrayToListWithCycle(${arr}, ${pos})`
  }

  if (ds === 'linked-list') {
    return inputs.map((v) => {
      if (Array.isArray(v)) return `__arrayToList(${JSON.stringify(v)})`
      return JSON.stringify(v)
    }).join(', ')
  }

  if (ds === 'binary-tree-lca') {
    // inputs: [treeArr, pVal, qVal]
    const treeArr = JSON.stringify(inputs[0])
    const pVal = JSON.stringify(inputs[1])
    const qVal = JSON.stringify(inputs[2])
    return `(function(){ var __root = __arrayToTree(${treeArr}); return [__root, __findNode(__root, ${pVal}), __findNode(__root, ${qVal})]; })()`
  }

  if (ds === 'binary-tree') {
    return inputs.map((v) => {
      if (Array.isArray(v)) return `__arrayToTree(${JSON.stringify(v)})`
      return JSON.stringify(v)
    }).join(', ')
  }

  return inputs.map((v) => JSON.stringify(v)).join(', ')
}

function convertOutput(result: unknown, _expected: unknown, ds: DataStructureType): unknown {
  if (!ds) return result
  // linked-list-cycle returns boolean, no conversion needed
  if (ds === 'linked-list-cycle') return result
  // binary-tree-lca returns a TreeNode, extract its val
  if (ds === 'binary-tree-lca') {
    if (result && typeof result === 'object' && 'val' in (result as Record<string, unknown>)) {
      return (result as { val: unknown }).val
    }
    return result
  }
  // null means empty list/tree → return empty array
  if (result === null || result === undefined) {
    if (ds === 'linked-list' || ds === 'binary-tree') return []
    return result
  }
  // If result is an object (ListNode/TreeNode), convert
  if (typeof result === 'object' && !Array.isArray(result)) {
    if (ds === 'linked-list' && 'val' in (result as Record<string, unknown>)) {
      // Convert ListNode to array
      const arr: unknown[] = []
      let curr = result as { val: unknown; next: unknown } | null
      let limit = 10000
      while (curr && limit-- > 0) {
        arr.push(curr.val)
        curr = curr.next as { val: unknown; next: unknown } | null
      }
      return arr
    }
    if (ds === 'binary-tree' && 'val' in (result as Record<string, unknown>)) {
      // Convert TreeNode to array (level-order)
      const arr: (unknown)[] = []
      const queue: (unknown)[] = [result]
      while (queue.length) {
        const node = queue.shift() as { val: unknown; left: unknown; right: unknown } | null
        if (node) {
          arr.push(node.val)
          queue.push(node.left)
          queue.push(node.right)
        } else {
          arr.push(null)
        }
      }
      while (arr.length && arr[arr.length - 1] === null) arr.pop()
      return arr
    }
  }
  return result
}

export function runTests(
  code: string,
  functionName: string,
  testCases: TestCase[],
  dataStructure?: DataStructureType
): TestResult[] {
  const results: TestResult[] = []
  const helperCode = getHelperCode(dataStructure)

  // class-ops: execute a sequence of method calls on a user-defined class
  if (dataStructure === 'class-ops') {
    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i]
      const [ops, args] = tc.input as [string[], unknown[][]]
      const start = performance.now()

      try {
        // Build code that instantiates the class and calls methods in sequence
        const lines: string[] = [code, '']
        lines.push(`var __instance = new ${ops[0]}(${(args[0] as unknown[]).map(a => JSON.stringify(a)).join(', ')});`)
        lines.push('var __results = [null];')
        for (let j = 1; j < ops.length; j++) {
          const methodArgs = (args[j] as unknown[]).map(a => JSON.stringify(a)).join(', ')
          lines.push(`__results.push(__instance.${ops[j]}(${methodArgs}) ?? null);`)
        }
        lines.push('return __results;')
        const rawResult = new Function(lines.join('\n'))()
        const elapsed = performance.now() - start
        const passed = deepEqual(rawResult, tc.expected)

        results.push({
          index: i,
          passed,
          input: ops.join(', '),
          expected: JSON.stringify(tc.expected),
          actual: JSON.stringify(rawResult),
          time: Math.round(elapsed * 100) / 100,
        })
      } catch (err) {
        const elapsed = performance.now() - start
        results.push({
          index: i,
          passed: false,
          input: ops.join(', '),
          expected: JSON.stringify(tc.expected),
          actual: '',
          error: `运行错误: ${(err as Error).message}`,
          time: Math.round(elapsed * 100) / 100,
        })
      }
    }
    return results
  }

  // For data structure problems, we wrap differently to inject helpers and convert I/O
  if (dataStructure) {
    // Validate function exists first
    try {
      const wrapped = `${helperCode}\n${code}\nreturn typeof ${functionName};`
      const fnType = new Function(wrapped)()
      if (fnType !== 'function') {
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
      const start = performance.now()

      try {
        let fullWrapped: string
        if (dataStructure === 'binary-tree-lca') {
          // LCA: convertInputs returns an IIFE producing [root, p, q], spread into function call
          fullWrapped = `${helperCode}\n${code}\nvar __args = ${convertInputs(tc.input as unknown[], dataStructure)};\nreturn (${functionName})(__args[0], __args[1], __args[2]);`
        } else {
          fullWrapped = `${helperCode}\n${code}\nreturn (${functionName})(${convertInputs(tc.input as unknown[], dataStructure)});`
        }
        const rawResult = new Function(fullWrapped)()
        const elapsed = performance.now() - start
        const actual = convertOutput(rawResult, tc.expected, dataStructure)
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

  // Original logic for plain problems
  let fn: (...args: unknown[]) => unknown
  try {
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
