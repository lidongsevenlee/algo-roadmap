import { Problem } from '@/types'

export const problems: Record<string, Problem> = {
  // Phase 1: 基础结构
  'two-sum': {
    id: 'two-sum',
    title: 'Two Sum',
    titleCN: '两数之和',
    difficulty: 'easy',
    pattern: 'hash-map',
    link: 'https://leetcode.cn/problems/two-sum/',
    template: `function twoSum(nums, target) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]
    if (map.has(complement)) {
      return [map.get(complement), i]
    }
    map.set(nums[i], i)
  }
}`,
    hint: '用哈希表存储已遍历的值，一次遍历即可',
  },
  'valid-anagram': {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    titleCN: '有效的字母异位词',
    difficulty: 'easy',
    pattern: 'hash-map',
    link: 'https://leetcode.cn/problems/valid-anagram/',
    hint: '用哈希表统计字符频率',
  },
  'group-anagrams': {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    titleCN: '字母异位词分组',
    difficulty: 'medium',
    pattern: 'hash-map',
    link: 'https://leetcode.cn/problems/group-anagrams/',
    hint: '排序后的字符串作为 key',
  },
  'contains-duplicate': {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    titleCN: '存在重复元素',
    difficulty: 'easy',
    pattern: 'hash-map',
    link: 'https://leetcode.cn/problems/contains-duplicate/',
    hint: '用 Set 判断是否已存在',
  },
  'merge-two-sorted-lists': {
    id: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    titleCN: '合并两个有序链表',
    difficulty: 'easy',
    pattern: 'linked-list',
    link: 'https://leetcode.cn/problems/merge-two-sorted-lists/',
    template: `function mergeTwoLists(l1, l2) {
  const dummy = { next: null }
  let curr = dummy
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      curr.next = l1; l1 = l1.next
    } else {
      curr.next = l2; l2 = l2.next
    }
    curr = curr.next
  }
  curr.next = l1 || l2
  return dummy.next
}`,
    hint: '哑节点 + 双指针逐一比较',
  },
  'reverse-linked-list': {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    titleCN: '反转链表',
    difficulty: 'easy',
    pattern: 'linked-list',
    link: 'https://leetcode.cn/problems/reverse-linked-list/',
    template: `function reverseList(head) {
  let prev = null, curr = head
  while (curr) {
    const next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }
  return prev
}`,
    hint: '三指针：prev, curr, next',
  },
  'linked-list-cycle': {
    id: 'linked-list-cycle',
    title: 'Linked List Cycle',
    titleCN: '环形链表',
    difficulty: 'easy',
    pattern: 'linked-list',
    link: 'https://leetcode.cn/problems/linked-list-cycle/',
    hint: '快慢指针，快指针每次走两步',
  },
  'valid-parentheses': {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    titleCN: '有效的括号',
    difficulty: 'easy',
    pattern: 'stack',
    link: 'https://leetcode.cn/problems/valid-parentheses/',
    template: `function isValid(s) {
  const stack = []
  const map = { ')': '(', ']': '[', '}': '{' }
  for (const c of s) {
    if (!map[c]) {
      stack.push(c)
    } else if (stack.pop() !== map[c]) {
      return false
    }
  }
  return stack.length === 0
}`,
    hint: '遇到左括号入栈，右括号出栈匹配',
  },
  'min-stack': {
    id: 'min-stack',
    title: 'Min Stack',
    titleCN: '最小栈',
    difficulty: 'medium',
    pattern: 'stack',
    link: 'https://leetcode.cn/problems/min-stack/',
    hint: '辅助栈同步记录最小值',
  },
  'lru-cache': {
    id: 'lru-cache',
    title: 'LRU Cache',
    titleCN: 'LRU 缓存',
    difficulty: 'medium',
    pattern: 'hash-map',
    link: 'https://leetcode.cn/problems/lru-cache/',
    template: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.cache = new Map()
  }
  get(key) {
    if (!this.cache.has(key)) return -1
    const val = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key, val)
    return val
  }
  put(key, value) {
    this.cache.delete(key)
    this.cache.set(key, value)
    if (this.cache.size > this.capacity) {
      this.cache.delete(this.cache.keys().next().value)
    }
  }
}`,
    hint: 'Map 保持插入顺序，get 时删除再重新插入',
  },

  // Phase 2: 高频技巧
  'move-zeroes': {
    id: 'move-zeroes',
    title: 'Move Zeroes',
    titleCN: '移动零',
    difficulty: 'easy',
    pattern: 'two-pointers',
    link: 'https://leetcode.cn/problems/move-zeroes/',
    hint: '快慢指针，非零元素往前移',
  },
  'remove-duplicates': {
    id: 'remove-duplicates',
    title: 'Remove Duplicates from Sorted Array',
    titleCN: '删除有序数组中的重复项',
    difficulty: 'easy',
    pattern: 'two-pointers',
    link: 'https://leetcode.cn/problems/remove-duplicates-from-sorted-array/',
    hint: '慢指针记录不重复位置，快指针遍历',
  },
  'container-with-most-water': {
    id: 'container-with-most-water',
    title: 'Container With Most Water',
    titleCN: '盛最多水的容器',
    difficulty: 'medium',
    pattern: 'two-pointers',
    link: 'https://leetcode.cn/problems/container-with-most-water/',
    hint: '左右指针，移动较短的那边',
  },
  'three-sum': {
    id: 'three-sum',
    title: '3Sum',
    titleCN: '三数之和',
    difficulty: 'medium',
    pattern: 'two-pointers',
    link: 'https://leetcode.cn/problems/3sum/',
    hint: '排序 + 固定一个数 + 双指针',
  },
  'longest-substring-without-repeating': {
    id: 'longest-substring-without-repeating',
    title: 'Longest Substring Without Repeating Characters',
    titleCN: '无重复字符的最长子串',
    difficulty: 'medium',
    pattern: 'sliding-window',
    link: 'https://leetcode.cn/problems/longest-substring-without-repeating-characters/',
    template: `function lengthOfLongestSubstring(s) {
  const set = new Set()
  let left = 0, maxLen = 0
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left])
      left++
    }
    set.add(s[right])
    maxLen = Math.max(maxLen, right - left + 1)
  }
  return maxLen
}`,
    hint: 'Set + 滑动窗口，右指针扩展，左指针收缩',
  },
  'minimum-window-substring': {
    id: 'minimum-window-substring',
    title: 'Minimum Window Substring',
    titleCN: '最小覆盖子串',
    difficulty: 'hard',
    pattern: 'sliding-window',
    link: 'https://leetcode.cn/problems/minimum-window-substring/',
    hint: '双 Map 计数 + 滑动窗口',
  },
  'max-sliding-window': {
    id: 'max-sliding-window',
    title: 'Sliding Window Maximum',
    titleCN: '滑动窗口最大值',
    difficulty: 'hard',
    pattern: 'sliding-window',
    link: 'https://leetcode.cn/problems/sliding-window-maximum/',
    hint: '单调递减队列',
  },
  'find-all-anagrams': {
    id: 'find-all-anagrams',
    title: 'Find All Anagrams in a String',
    titleCN: '找到字符串中所有字母异位词',
    difficulty: 'medium',
    pattern: 'sliding-window',
    link: 'https://leetcode.cn/problems/find-all-anagrams-in-a-string/',
    hint: '固定窗口大小的滑动窗口',
  },
  'binary-search': {
    id: 'binary-search',
    title: 'Binary Search',
    titleCN: '二分查找',
    difficulty: 'easy',
    pattern: 'binary-search',
    link: 'https://leetcode.cn/problems/binary-search/',
    template: `function binarySearch(nums, target) {
  let left = 0, right = nums.length - 1
  while (left <= right) {
    const mid = left + ((right - left) >> 1)
    if (nums[mid] === target) return mid
    if (nums[mid] < target) left = mid + 1
    else right = mid - 1
  }
  return -1
}`,
    hint: '左闭右闭区间，注意边界条件',
  },
  'search-rotated-sorted-array': {
    id: 'search-rotated-sorted-array',
    title: 'Search in Rotated Sorted Array',
    titleCN: '搜索旋转排序数组',
    difficulty: 'medium',
    pattern: 'binary-search',
    link: 'https://leetcode.cn/problems/search-in-rotated-sorted-array/',
    hint: '先判断哪半段有序，再决定搜索方向',
  },
  'find-first-and-last': {
    id: 'find-first-and-last',
    title: 'Find First and Last Position',
    titleCN: '在排序数组中查找元素的第一个和最后一个位置',
    difficulty: 'medium',
    pattern: 'binary-search',
    link: 'https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/',
    hint: '两次二分查找左右边界',
  },

  // Phase 3: 算法思想
  'permutations': {
    id: 'permutations',
    title: 'Permutations',
    titleCN: '全排列',
    difficulty: 'medium',
    pattern: 'backtracking',
    link: 'https://leetcode.cn/problems/permutations/',
    template: `function permute(nums) {
  const result = []
  function backtrack(path, used) {
    if (path.length === nums.length) {
      result.push([...path])
      return
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue
      path.push(nums[i])
      used[i] = true
      backtrack(path, used)
      path.pop()
      used[i] = false
    }
  }
  backtrack([], new Array(nums.length).fill(false))
  return result
}`,
    hint: '回溯模板：做选择 → 递归 → 撤销选择',
  },
  'subsets': {
    id: 'subsets',
    title: 'Subsets',
    titleCN: '子集',
    difficulty: 'medium',
    pattern: 'backtracking',
    link: 'https://leetcode.cn/problems/subsets/',
    hint: '每个元素选或不选',
  },
  'combination-sum': {
    id: 'combination-sum',
    title: 'Combination Sum',
    titleCN: '组合总和',
    difficulty: 'medium',
    pattern: 'backtracking',
    link: 'https://leetcode.cn/problems/combination-sum/',
    hint: '回溯 + 可重复选择（start 不加 1）',
  },
  'word-search': {
    id: 'word-search',
    title: 'Word Search',
    titleCN: '单词搜索',
    difficulty: 'medium',
    pattern: 'dfs',
    link: 'https://leetcode.cn/problems/word-search/',
    hint: 'DFS + 标记访问过的格子',
  },
  'binary-tree-level-order': {
    id: 'binary-tree-level-order',
    title: 'Binary Tree Level Order Traversal',
    titleCN: '二叉树的层序遍历',
    difficulty: 'medium',
    pattern: 'bfs',
    link: 'https://leetcode.cn/problems/binary-tree-level-order-traversal/',
    template: `function levelOrder(root) {
  if (!root) return []
  const result = [], queue = [root]
  while (queue.length) {
    const level = [], size = queue.length
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
    hint: '队列 + 记录每层节点数',
  },
  'climbing-stairs': {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    titleCN: '爬楼梯',
    difficulty: 'easy',
    pattern: 'dp',
    link: 'https://leetcode.cn/problems/climbing-stairs/',
    template: `function climbStairs(n) {
  if (n <= 2) return n
  let a = 1, b = 2
  for (let i = 3; i <= n; i++) {
    [a, b] = [b, a + b]
  }
  return b
}`,
    hint: 'dp[i] = dp[i-1] + dp[i-2]',
  },
  'house-robber': {
    id: 'house-robber',
    title: 'House Robber',
    titleCN: '打家劫舍',
    difficulty: 'medium',
    pattern: 'dp',
    link: 'https://leetcode.cn/problems/house-robber/',
    hint: 'dp[i] = max(dp[i-1], dp[i-2] + nums[i])',
  },
  'longest-increasing-subsequence': {
    id: 'longest-increasing-subsequence',
    title: 'Longest Increasing Subsequence',
    titleCN: '最长递增子序列',
    difficulty: 'medium',
    pattern: 'dp',
    link: 'https://leetcode.cn/problems/longest-increasing-subsequence/',
    hint: 'dp[i] = max(dp[j] + 1)，其中 j < i 且 nums[j] < nums[i]',
  },
  'longest-palindromic-substring': {
    id: 'longest-palindromic-substring',
    title: 'Longest Palindromic Substring',
    titleCN: '最长回文子串',
    difficulty: 'medium',
    pattern: 'dp',
    link: 'https://leetcode.cn/problems/longest-palindromic-substring/',
    hint: '中心扩展法或 dp[i][j] 表示 s[i..j] 是否回文',
  },

  // Phase 4: 面试强化
  'inorder-traversal': {
    id: 'inorder-traversal',
    title: 'Binary Tree Inorder Traversal',
    titleCN: '二叉树的中序遍历',
    difficulty: 'easy',
    pattern: 'tree',
    link: 'https://leetcode.cn/problems/binary-tree-inorder-traversal/',
    hint: '左 → 根 → 右',
  },
  'max-depth-binary-tree': {
    id: 'max-depth-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    titleCN: '二叉树的最大深度',
    difficulty: 'easy',
    pattern: 'tree',
    link: 'https://leetcode.cn/problems/maximum-depth-of-binary-tree/',
    hint: '递归：1 + max(左深度, 右深度)',
  },
  'validate-bst': {
    id: 'validate-bst',
    title: 'Validate Binary Search Tree',
    titleCN: '验证二叉搜索树',
    difficulty: 'medium',
    pattern: 'tree',
    link: 'https://leetcode.cn/problems/validate-binary-search-tree/',
    hint: '中序遍历递增 或 递归传递上下界',
  },
  'lowest-common-ancestor': {
    id: 'lowest-common-ancestor',
    title: 'Lowest Common Ancestor of a Binary Tree',
    titleCN: '二叉树的最近公共祖先',
    difficulty: 'medium',
    pattern: 'tree',
    link: 'https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/',
    hint: '递归查找，左右子树都找到则当前节点是 LCA',
  },
  'top-k-frequent': {
    id: 'top-k-frequent',
    title: 'Top K Frequent Elements',
    titleCN: '前 K 个高频元素',
    difficulty: 'medium',
    pattern: 'heap',
    link: 'https://leetcode.cn/problems/top-k-frequent-elements/',
    hint: '哈希计数 + 桶排序 或 小顶堆',
  },
  'kth-largest': {
    id: 'kth-largest',
    title: 'Kth Largest Element in an Array',
    titleCN: '数组中的第K个最大元素',
    difficulty: 'medium',
    pattern: 'heap',
    link: 'https://leetcode.cn/problems/kth-largest-element-in-an-array/',
    hint: '快速选择算法 或 堆',
  },
  'number-of-islands': {
    id: 'number-of-islands',
    title: 'Number of Islands',
    titleCN: '岛屿数量',
    difficulty: 'medium',
    pattern: 'graph',
    link: 'https://leetcode.cn/problems/number-of-islands/',
    hint: 'DFS/BFS 遍历，沉岛法',
  },
  'course-schedule': {
    id: 'course-schedule',
    title: 'Course Schedule',
    titleCN: '课程表',
    difficulty: 'medium',
    pattern: 'graph',
    link: 'https://leetcode.cn/problems/course-schedule/',
    hint: '拓扑排序 (BFS) 或 DFS 检测环',
  },
}
