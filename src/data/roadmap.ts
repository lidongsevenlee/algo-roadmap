import { RoadmapNode, RoadmapEdge } from '@/types'

export const roadmapNodes: RoadmapNode[] = [
  // ===== Phase 1: 基础结构 =====
  {
    id: 'hash-map',
    title: 'Hash Map',
    titleCN: '哈希表',
    type: 'data-structure',
    difficulty: 'easy',
    prerequisites: [],
    problems: ['two-sum', 'valid-anagram', 'group-anagrams', 'contains-duplicate'],
    position: { x: 0, y: 0 },
    knowledge: {
      title: '哈希表 Hash Map',
      description: '哈希表通过键值对存储数据，提供 O(1) 的查找、插入和删除操作。在 JavaScript 中，Map 和普通对象都可以用作哈希表。',
      template: `// 使用 Map
const map = new Map()
map.set(key, value)
map.get(key)
map.has(key)
map.delete(key)

// 常见模式：计数
const count = new Map()
for (const item of arr) {
  count.set(item, (count.get(item) || 0) + 1)
}`,
      complexity: { time: 'O(1) 平均', space: 'O(n)' },
      keyPoints: [
        'Map vs Object: Map 支持任意类型的 key',
        '哈希冲突：链地址法 / 开放寻址法',
        '常用于：计数、去重、查找配对',
        '前端应用：缓存、数据索引',
      ],
    },
  },
  {
    id: 'linked-list',
    title: 'Linked List',
    titleCN: '链表',
    type: 'data-structure',
    difficulty: 'easy',
    prerequisites: [],
    problems: ['merge-two-sorted-lists', 'reverse-linked-list', 'linked-list-cycle'],
    position: { x: 300, y: 0 },
    knowledge: {
      title: '链表 Linked List',
      description: '链表是一种线性数据结构，元素通过指针连接。与数组不同，链表的插入和删除是 O(1)，但访问是 O(n)。',
      template: `// 链表节点
class ListNode {
  constructor(val, next = null) {
    this.val = val
    this.next = next
  }
}

// 哑节点技巧
const dummy = new ListNode(0)
dummy.next = head
// ... 操作后
return dummy.next`,
      complexity: { time: '访问 O(n), 插入/删除 O(1)', space: 'O(n)' },
      keyPoints: [
        '哑节点（dummy node）简化边界处理',
        '快慢指针：检测环、找中点',
        '反转链表：三指针 prev/curr/next',
        '前端应用：React Fiber 链表、事件链',
      ],
    },
  },
  {
    id: 'stack-queue',
    title: 'Stack & Queue',
    titleCN: '栈与队列',
    type: 'data-structure',
    difficulty: 'easy',
    prerequisites: [],
    problems: ['valid-parentheses', 'min-stack'],
    position: { x: 600, y: 0 },
    knowledge: {
      title: '栈与队列',
      description: '栈（LIFO）和队列（FIFO）是两种基本的线性数据结构。JavaScript 数组天然支持栈和队列操作。',
      template: `// 栈：后进先出
const stack = []
stack.push(item)  // 入栈
stack.pop()       // 出栈
stack[stack.length - 1] // 栈顶

// 队列：先进先出
const queue = []
queue.push(item)  // 入队
queue.shift()     // 出队`,
      complexity: { time: 'push/pop O(1)', space: 'O(n)' },
      keyPoints: [
        '栈：括号匹配、表达式求值、DFS',
        '队列：BFS、任务调度',
        '单调栈：下一个更大元素',
        '前端应用：浏览器历史栈、微任务队列',
      ],
    },
  },
  {
    id: 'lru',
    title: 'LRU Cache',
    titleCN: 'LRU 缓存',
    type: 'data-structure',
    difficulty: 'medium',
    prerequisites: ['hash-map', 'linked-list'],
    problems: ['lru-cache'],
    position: { x: 150, y: 150 },
    knowledge: {
      title: 'LRU 缓存',
      description: 'LRU（Least Recently Used）缓存淘汰最近最少使用的数据。是面试超高频题，也是实际工程中常用的缓存策略。',
      template: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.cache = new Map() // Map 保持插入顺序
  }
  get(key) {
    if (!this.cache.has(key)) return -1
    const val = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key, val) // 移到最新
    return val
  }
  put(key, value) {
    this.cache.delete(key)
    this.cache.set(key, value)
    if (this.cache.size > this.capacity) {
      // 删除最旧的（第一个）
      this.cache.delete(this.cache.keys().next().value)
    }
  }
}`,
      complexity: { time: 'O(1) get/put', space: 'O(capacity)' },
      keyPoints: [
        'Map 保持插入顺序是关键',
        '经典实现：哈希表 + 双向链表',
        'JS 中可直接用 Map 简化',
        '前端应用：组件缓存、API 请求缓存',
      ],
    },
  },

  // ===== Phase 2: 高频技巧 =====
  {
    id: 'two-pointers',
    title: 'Two Pointers',
    titleCN: '双指针',
    type: 'technique',
    difficulty: 'easy',
    prerequisites: ['hash-map'],
    problems: ['move-zeroes', 'remove-duplicates', 'container-with-most-water', 'three-sum'],
    position: { x: 0, y: 300 },
    knowledge: {
      title: '双指针',
      description: '双指针是一种在有序数组或链表中高效遍历的技巧。通过两个指针的协同移动减少时间复杂度。',
      template: `// 对撞指针（有序数组）
let left = 0, right = arr.length - 1
while (left < right) {
  if (条件满足) return result
  if (需要更大) left++
  else right--
}

// 快慢指针
let slow = 0
for (let fast = 0; fast < arr.length; fast++) {
  if (满足条件) {
    arr[slow] = arr[fast]
    slow++
  }
}`,
      complexity: { time: 'O(n)', space: 'O(1)' },
      keyPoints: [
        '对撞指针：有序数组求和、容器盛水',
        '快慢指针：原地修改、去重、移除元素',
        '前提通常是数组有序',
        '将 O(n²) 降到 O(n)',
      ],
    },
  },
  {
    id: 'sliding-window',
    title: 'Sliding Window',
    titleCN: '滑动窗口',
    type: 'technique',
    difficulty: 'medium',
    prerequisites: ['two-pointers', 'hash-map'],
    problems: ['longest-substring-without-repeating', 'minimum-window-substring', 'max-sliding-window', 'find-all-anagrams'],
    position: { x: 0, y: 450 },
    knowledge: {
      title: '滑动窗口',
      description: '滑动窗口是双指针的进阶应用，通过维护一个可变大小的窗口来解决子串/子数组问题。这是前端工程师最应该掌握的算法技巧之一。',
      template: `// 滑动窗口模板
function slidingWindow(s) {
  const window = new Map()
  let left = 0, result = 0

  for (let right = 0; right < s.length; right++) {
    // 1. 扩大窗口
    const c = s[right]
    window.set(c, (window.get(c) || 0) + 1)

    // 2. 收缩窗口
    while (窗口需要收缩) {
      const d = s[left]
      window.set(d, window.get(d) - 1)
      left++
    }

    // 3. 更新结果
    result = Math.max(result, right - left + 1)
  }
  return result
}`,
      complexity: { time: 'O(n)', space: 'O(k)' },
      keyPoints: [
        '核心：右指针扩展，左指针收缩',
        '适用场景：连续子串/子数组的最值问题',
        '常与 Map/Set 配合记录窗口状态',
        '前端应用：搜索输入优化、流量控制',
      ],
    },
  },
  {
    id: 'binary-search-node',
    title: 'Binary Search',
    titleCN: '二分查找',
    type: 'technique',
    difficulty: 'medium',
    prerequisites: ['two-pointers'],
    problems: ['binary-search', 'search-rotated-sorted-array', 'find-first-and-last'],
    position: { x: 300, y: 300 },
    knowledge: {
      title: '二分查找',
      description: '二分查找在有序数组中以 O(log n) 的时间复杂度查找目标值。关键在于正确处理边界条件。',
      template: `// 标准二分（左闭右闭）
function binarySearch(nums, target) {
  let left = 0, right = nums.length - 1
  while (left <= right) {
    const mid = left + ((right - left) >> 1)
    if (nums[mid] === target) return mid
    if (nums[mid] < target) left = mid + 1
    else right = mid - 1
  }
  return -1
}

// 查找左边界
function leftBound(nums, target) {
  let left = 0, right = nums.length - 1
  while (left <= right) {
    const mid = left + ((right - left) >> 1)
    if (nums[mid] >= target) right = mid - 1
    else left = mid + 1
  }
  return left
}`,
      complexity: { time: 'O(log n)', space: 'O(1)' },
      keyPoints: [
        '注意区间定义：左闭右闭 vs 左闭右开',
        'mid 计算避免溢出：left + (right - left) / 2',
        '变体：查找左/右边界',
        '前端应用：虚拟列表定位、大数据搜索',
      ],
    },
  },

  // ===== Phase 3: 算法思想 =====
  {
    id: 'backtracking',
    title: 'Backtracking',
    titleCN: '回溯',
    type: 'algorithm',
    difficulty: 'medium',
    prerequisites: ['stack-queue'],
    problems: ['permutations', 'subsets', 'combination-sum', 'word-search'],
    position: { x: 600, y: 300 },
    knowledge: {
      title: '回溯算法',
      description: '回溯是 DFS 的一种形式，通过"做选择 → 递归 → 撤销选择"来穷举所有可能的解。适用于排列、组合、子集等问题。',
      template: `function backtrack(路径, 选择列表) {
  if (满足结束条件) {
    result.push([...路径])
    return
  }

  for (const 选择 of 选择列表) {
    // 做选择
    路径.push(选择)
    // 递归
    backtrack(路径, 选择列表)
    // 撤销选择
    路径.pop()
  }
}`,
      complexity: { time: 'O(n!) 或 O(2^n)', space: 'O(n) 递归栈' },
      keyPoints: [
        '核心：做选择 → 递归 → 撤销选择',
        '排列问题：用 used 数组标记',
        '组合问题：用 start 控制起点避免重复',
        '剪枝：提前终止不可能的分支',
      ],
    },
  },
  {
    id: 'bfs-node',
    title: 'BFS',
    titleCN: '广度优先搜索',
    type: 'algorithm',
    difficulty: 'medium',
    prerequisites: ['stack-queue'],
    problems: ['binary-tree-level-order'],
    position: { x: 600, y: 450 },
    knowledge: {
      title: 'BFS 广度优先搜索',
      description: 'BFS 使用队列按层遍历，适合求最短路径、层序遍历等问题。',
      template: `function bfs(root) {
  const queue = [root]
  const result = []

  while (queue.length) {
    const size = queue.length
    const level = []

    for (let i = 0; i < size; i++) {
      const node = queue.shift()
      level.push(node.val)

      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    result.push(level)
  }
  return result
}`,
      complexity: { time: 'O(V + E)', space: 'O(V)' },
      keyPoints: [
        '使用队列实现',
        '按层遍历：记录每层节点数',
        '最短路径：无权图中 BFS 保证最短',
        '前端应用：DOM 层级遍历',
      ],
    },
  },
  {
    id: 'dp',
    title: 'Dynamic Programming',
    titleCN: '动态规划',
    type: 'algorithm',
    difficulty: 'hard',
    prerequisites: ['binary-search-node', 'backtracking'],
    problems: ['climbing-stairs', 'house-robber', 'longest-increasing-subsequence', 'longest-palindromic-substring'],
    position: { x: 300, y: 450 },
    knowledge: {
      title: '动态规划',
      description: '动态规划通过将大问题分解为重叠子问题，利用记忆化避免重复计算。核心是找到状态定义和状态转移方程。',
      template: `// DP 模板
function dp(n) {
  // 1. 定义 dp 数组（状态）
  const dp = new Array(n + 1).fill(0)

  // 2. base case
  dp[0] = ...
  dp[1] = ...

  // 3. 状态转移
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2]  // 转移方程
  }

  return dp[n]
}

// 空间优化：滚动变量
let a = 0, b = 1
for (let i = 2; i <= n; i++) {
  [a, b] = [b, a + b]
}`,
      complexity: { time: 'O(n) ~ O(n²)', space: 'O(n) 可优化到 O(1)' },
      keyPoints: [
        '三要素：状态 + 转移方程 + base case',
        '线性 DP：爬楼梯、打家劫舍',
        '子序列 DP：LIS、LCS',
        '空间优化：滚动数组/变量',
      ],
    },
  },

  // ===== Phase 4: 面试强化 =====
  {
    id: 'tree',
    title: 'Tree',
    titleCN: '树',
    type: 'advanced',
    difficulty: 'medium',
    prerequisites: ['backtracking', 'bfs-node'],
    problems: ['inorder-traversal', 'max-depth-binary-tree', 'validate-bst', 'lowest-common-ancestor'],
    position: { x: 600, y: 600 },
    knowledge: {
      title: '树',
      description: '树是最常考的数据结构之一。掌握前/中/后序遍历、递归思维和常见题型是面试的基本功。',
      template: `// 递归遍历
function traverse(root) {
  if (!root) return

  // 前序：根 → 左 → 右
  console.log(root.val)
  traverse(root.left)
  traverse(root.right)

  // 中序：左 → 根 → 右（BST 有序）
  // 后序：左 → 右 → 根
}

// 递归思维模板
function solve(root) {
  if (!root) return baseCase

  const left = solve(root.left)
  const right = solve(root.right)

  return combine(root.val, left, right)
}`,
      complexity: { time: 'O(n)', space: 'O(h) 递归栈' },
      keyPoints: [
        '递归三要素：终止条件、单层逻辑、返回值',
        'BST 性质：中序遍历有序',
        'LCA：左右子树递归查找',
        '前端应用：虚拟 DOM 树 diff、组件树',
      ],
    },
  },
  {
    id: 'heap-node',
    title: 'Heap / Priority Queue',
    titleCN: '堆 / 优先队列',
    type: 'advanced',
    difficulty: 'medium',
    prerequisites: ['tree'],
    problems: ['top-k-frequent', 'kth-largest'],
    position: { x: 450, y: 700 },
    knowledge: {
      title: '堆 / 优先队列',
      description: '堆是一种特殊的完全二叉树，可以在 O(log n) 时间内插入和取出最值。常用于 Top K 问题。',
      template: `// JS 中没有原生堆，可用排序替代简单场景
// Top K 问题的桶排序解法
function topKFrequent(nums, k) {
  const count = new Map()
  for (const n of nums) {
    count.set(n, (count.get(n) || 0) + 1)
  }

  const buckets = new Array(nums.length + 1).fill(null).map(() => [])
  for (const [num, freq] of count) {
    buckets[freq].push(num)
  }

  const result = []
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i])
  }
  return result.slice(0, k)
}`,
      complexity: { time: '插入/删除 O(log n), 取最值 O(1)', space: 'O(n)' },
      keyPoints: [
        'JS 中需要手写或用排序替代',
        'Top K 问题：小顶堆 or 桶排序',
        '快速选择算法：O(n) 平均',
        '前端应用：任务优先级调度',
      ],
    },
  },
  {
    id: 'graph-node',
    title: 'Graph',
    titleCN: '图',
    type: 'advanced',
    difficulty: 'hard',
    prerequisites: ['bfs-node', 'backtracking'],
    problems: ['number-of-islands', 'course-schedule'],
    position: { x: 750, y: 600 },
    knowledge: {
      title: '图',
      description: '图由节点和边组成，是最通用的数据结构。面试中常考连通性、最短路径和拓扑排序。',
      template: `// 邻接表表示
const graph = new Map()
for (const [u, v] of edges) {
  if (!graph.has(u)) graph.set(u, [])
  graph.get(u).push(v)
}

// DFS 遍历（岛屿问题）
function dfs(grid, i, j) {
  if (i < 0 || j < 0 || i >= grid.length
    || j >= grid[0].length || grid[i][j] === '0') return
  grid[i][j] = '0' // 标记已访问
  dfs(grid, i+1, j)
  dfs(grid, i-1, j)
  dfs(grid, i, j+1)
  dfs(grid, i, j-1)
}`,
      complexity: { time: 'O(V + E)', space: 'O(V + E)' },
      keyPoints: [
        '表示方法：邻接表 vs 邻接矩阵',
        'DFS/BFS 遍历：注意标记已访问',
        '拓扑排序：检测环 + 排序',
        '前端应用：依赖分析、模块打包',
      ],
    },
  },
]

export const roadmapEdges: RoadmapEdge[] = [
  // Phase 1 内部
  { from: 'hash-map', to: 'lru' },
  { from: 'linked-list', to: 'lru' },

  // Phase 1 → Phase 2
  { from: 'hash-map', to: 'two-pointers' },
  { from: 'two-pointers', to: 'sliding-window' },
  { from: 'two-pointers', to: 'binary-search-node' },
  { from: 'hash-map', to: 'sliding-window' },

  // Phase 2 → Phase 3
  { from: 'stack-queue', to: 'backtracking' },
  { from: 'stack-queue', to: 'bfs-node' },
  { from: 'binary-search-node', to: 'dp' },
  { from: 'backtracking', to: 'dp' },

  // Phase 3 → Phase 4
  { from: 'backtracking', to: 'tree' },
  { from: 'bfs-node', to: 'tree' },
  { from: 'tree', to: 'heap-node' },
  { from: 'bfs-node', to: 'graph-node' },
  { from: 'backtracking', to: 'graph-node' },
]
