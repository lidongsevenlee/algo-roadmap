import { Problem } from '@/types'

export const problems: Record<string, Problem> = {
  // ===== Phase 1: 基础结构 =====
  'two-sum': {
    id: 'two-sum',
    title: 'Two Sum',
    titleCN: '两数之和',
    difficulty: 'easy',
    pattern: 'hash-map',
    link: 'https://leetcode.cn/problems/two-sum/',
    description: '给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值 target 的那两个整数，并返回它们的数组下标。\n\n你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。你可以按任意顺序返回答案。',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: '因为 nums[0] + nums[1] == 9，返回 [0, 1]' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
    ],
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
    hint: '核心思路：遍历数组时，用哈希表存储 {值: 下标}。对每个元素计算 complement = target - nums[i]，若 complement 已在哈希表中则找到答案。时间 O(n)，空间 O(n)，一次遍历即可。',
    functionName: 'twoSum',
    starterCode: `function twoSum(nums, target) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      { input: [[2,7,11,15], 9], expected: [0,1] },
      { input: [[3,2,4], 6], expected: [1,2] },
      { input: [[3,3], 6], expected: [0,1] },
    ],
  },
  'valid-anagram': {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    titleCN: '有效的字母异位词',
    difficulty: 'easy',
    pattern: 'hash-map',
    link: 'https://leetcode.cn/problems/valid-anagram/',
    description: '给定两个字符串 s 和 t，编写一个函数来判断 t 是否是 s 的字母异位词。\n\n若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。',
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true' },
      { input: 's = "rat", t = "car"', output: 'false' },
    ],
    hint: '核心思路：先判断长度是否相等。用一个对象计数：遍历 s 时 count[c]++，遍历 t 时 count[c]--，若出现负数说明 t 中某字符多于 s。时间 O(n)，空间 O(1)（字母表固定 26 个）。',
    template: `function isAnagram(s, t) {
  if (s.length !== t.length) return false
  const count = {}
  for (const c of s) count[c] = (count[c] || 0) + 1
  for (const c of t) {
    count[c] = (count[c] || 0) - 1
    if (count[c] < 0) return false
  }
  return true
}`,
    functionName: 'isAnagram',
    starterCode: `function isAnagram(s, t) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      { input: ['anagram', 'nagaram'], expected: true },
      { input: ['rat', 'car'], expected: false },
      { input: ['', ''], expected: true },
    ],
  },
  'group-anagrams': {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    titleCN: '字母异位词分组',
    difficulty: 'medium',
    pattern: 'hash-map',
    link: 'https://leetcode.cn/problems/group-anagrams/',
    description: '给你一个字符串数组，请你将字母异位词组合在一起。可以按任意顺序返回结果列表。\n\n字母异位词是由重新排列源单词的所有字母得到的一个新单词。',
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
    ],
    hint: '核心思路：异位词排序后相同，所以将每个字符串排序后作为哈希表的 key，值为对应的字符串数组。遍历一遍，按 key 分组即可。时间 O(n·k·log k)，k 为字符串平均长度。',
    template: `function groupAnagrams(strs) {
  const map = new Map()
  for (const s of strs) {
    const key = [...s].sort().join('')
    if (!map.has(key)) map.set(key, [])
    map.get(key).push(s)
  }
  return [...map.values()]
}`,
    functionName: 'groupAnagrams',
    starterCode: `function groupAnagrams(strs) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      // Note: order of groups and order within groups may vary
      { input: [['eat','tea','tan','ate','nat','bat']], expected: [['eat','tea','ate'],['tan','nat'],['bat']] },
      { input: [['']], expected: [['']] },
      { input: [['a']], expected: [['a']] },
    ],
  },
  'contains-duplicate': {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    titleCN: '存在重复元素',
    difficulty: 'easy',
    pattern: 'hash-map',
    link: 'https://leetcode.cn/problems/contains-duplicate/',
    description: '给你一个整数数组 nums。如果任一值在数组中出现至少两次，返回 true；如果数组中每个元素互不相同，返回 false。',
    examples: [
      { input: 'nums = [1,2,3,1]', output: 'true' },
      { input: 'nums = [1,2,3,4]', output: 'false' },
    ],
    hint: '核心思路：将数组转为 Set，如果 Set 的大小小于数组长度，说明有重复。一行代码搞定。时间 O(n)，空间 O(n)。也可以排序后检查相邻元素。',
    template: `function containsDuplicate(nums) {
  return new Set(nums).size !== nums.length
}`,
    functionName: 'containsDuplicate',
    starterCode: `function containsDuplicate(nums) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      { input: [[1,2,3,1]], expected: true },
      { input: [[1,2,3,4]], expected: false },
      { input: [[1,1,1,3,3,4,3,2,4,2]], expected: true },
    ],
  },
  'merge-two-sorted-lists': {
    id: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    titleCN: '合并两个有序链表',
    difficulty: 'easy',
    pattern: 'linked-list',
    link: 'https://leetcode.cn/problems/merge-two-sorted-lists/',
    description: '将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。',
    examples: [
      { input: 'l1 = [1,2,4], l2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
    ],
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
    hint: '核心思路：创建哑节点（dummy），双指针分别指向两个链表头。比较当前节点值，较小的接到结果链表后面，指针前进。最后将未遍历完的链表直接接上。时间 O(m+n)，空间 O(1)。',
    dataStructure: 'linked-list',
    functionName: 'mergeTwoLists',
    starterCode: `function mergeTwoLists(l1, l2) {\n  // l1, l2 是 ListNode 链表\n  // ListNode: { val, next }\n  \n}`,
    testCases: [
      { input: [[1,2,4], [1,3,4]], expected: [1,1,2,3,4,4] },
      { input: [[], []], expected: [] },
      { input: [[], [0]], expected: [0] },
    ],
  },
  'reverse-linked-list': {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    titleCN: '反转链表',
    difficulty: 'easy',
    pattern: 'linked-list',
    link: 'https://leetcode.cn/problems/reverse-linked-list/',
    description: '给你单链表的头节点 head，请你反转链表，并返回反转后的链表。',
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
    ],
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
    hint: '核心思路：迭代法用三个指针 prev、curr、next。每步将 curr.next 指向 prev（反转），然后三个指针各前进一步。最终 prev 就是新头节点。时间 O(n)，空间 O(1)。也可递归实现。',
    dataStructure: 'linked-list',
    functionName: 'reverseList',
    starterCode: `function reverseList(head) {\n  // head 是 ListNode 链表\n  // ListNode: { val, next }\n  \n}`,
    testCases: [
      { input: [[1,2,3,4,5]], expected: [5,4,3,2,1] },
      { input: [[1,2]], expected: [2,1] },
      { input: [[]], expected: [] },
    ],
  },
  'linked-list-cycle': {
    id: 'linked-list-cycle',
    title: 'Linked List Cycle',
    titleCN: '环形链表',
    difficulty: 'easy',
    pattern: 'linked-list',
    link: 'https://leetcode.cn/problems/linked-list-cycle/',
    description: '给你一个链表的头节点 head，判断链表中是否有环。\n\n如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。如果链表中存在环，则返回 true；否则返回 false。',
    examples: [
      { input: 'head = [3,2,0,-4], pos = 1', output: 'true', explanation: '链表中有一个环，其尾部连接到第二个节点' },
    ],
    template: `function hasCycle(head) {
  let slow = head, fast = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) return true
  }
  return false
}`,
    hint: '核心思路：快慢指针法（Floyd 判圈）。慢指针每次走一步，快指针每次走两步。如果有环，快指针终将追上慢指针（相遇）；如果无环，快指针先到 null。时间 O(n)，空间 O(1)。',
    dataStructure: 'linked-list-cycle',
    functionName: 'hasCycle',
    starterCode: `function hasCycle(head) {\n  // head 是 ListNode 链表（可能有环）\n  // ListNode: { val, next }\n  // 返回 true/false\n  \n}`,
    testCases: [
      { input: [[3,2,0,-4], 1], expected: true },
      { input: [[1,2], 0], expected: true },
      { input: [[1], -1], expected: false },
    ],
  },
  'valid-parentheses': {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    titleCN: '有效的括号',
    difficulty: 'easy',
    pattern: 'stack',
    link: 'https://leetcode.cn/problems/valid-parentheses/',
    description: '给定一个只包括 \'(\'，\')\'，\'{\'，\'}\'，\'[\'，\']\' 的字符串 s，判断字符串是否有效。\n\n有效字符串需满足：\n1. 左括号必须用相同类型的右括号闭合。\n2. 左括号必须以正确的顺序闭合。\n3. 每个右括号都有一个对应的相同类型的左括号。',
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
    ],
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
    hint: '核心思路：用栈匹配括号。遇到左括号入栈，遇到右括号弹出栈顶检查是否匹配。最终栈为空说明全部匹配。用哈希表 {")":"(", "]":"[", "}":"{"} 简化匹配逻辑。时间 O(n)。',
    functionName: 'isValid',
    starterCode: `function isValid(s) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      { input: ['()'], expected: true },
      { input: ['()[]{}'], expected: true },
      { input: ['(]'], expected: false },
    ],
  },
  'min-stack': {
    id: 'min-stack',
    title: 'Min Stack',
    titleCN: '最小栈',
    difficulty: 'medium',
    pattern: 'stack',
    link: 'https://leetcode.cn/problems/min-stack/',
    description: '设计一个支持 push、pop、top 操作，并能在常数时间内检索到最小元素的栈。\n\n实现 MinStack 类：\n- MinStack() 初始化堆栈对象\n- void push(int val) 将元素 val 推入堆栈\n- void pop() 删除堆栈顶部的元素\n- int top() 获取堆栈顶部的元素\n- int getMin() 获取堆栈中的最小元素',
    examples: [
      { input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]', output: '[null,null,null,null,-3,null,0,-2]' },
    ],
    template: `class MinStack {
  constructor() {
    this.stack = []
    this.minStack = []
  }
  push(val) {
    this.stack.push(val)
    this.minStack.push(Math.min(val, this.minStack.length ? this.minStack[this.minStack.length - 1] : val))
  }
  pop() {
    this.stack.pop()
    this.minStack.pop()
  }
  top() {
    return this.stack[this.stack.length - 1]
  }
  getMin() {
    return this.minStack[this.minStack.length - 1]
  }
}`,
    hint: '核心思路：用一个辅助栈 minStack 与主栈同步操作。每次 push 时，minStack 压入当前最小值 min(val, minStack.top)。pop 时两栈同步弹出。getMin 直接返回 minStack 栈顶。所有操作 O(1)。',
    dataStructure: 'class-ops',
    functionName: 'MinStack',
    starterCode: `class MinStack {\n  constructor() {\n    // 初始化\n  }\n  push(val) {\n    \n  }\n  pop() {\n    \n  }\n  top() {\n    \n  }\n  getMin() {\n    \n  }\n}`,
    testCases: [
      {
        input: [
          ['MinStack','push','push','push','getMin','pop','top','getMin'],
          [[],[-2],[0],[-3],[],[],[],[]]
        ],
        expected: [null,null,null,null,-3,null,0,-2],
      },
      {
        input: [
          ['MinStack','push','push','getMin','top','pop','getMin'],
          [[],[1],[2],[],[],[],[]]
        ],
        expected: [null,null,null,1,2,null,1],
      },
    ],
  },
  'lru-cache': {
    id: 'lru-cache',
    title: 'LRU Cache',
    titleCN: 'LRU 缓存',
    difficulty: 'medium',
    pattern: 'hash-map',
    link: 'https://leetcode.cn/problems/lru-cache/',
    description: '请你设计并实现一个满足 LRU（最近最少使用）缓存约束的数据结构。\n\n实现 LRUCache 类：\n- LRUCache(int capacity) 以正整数作为容量 capacity 初始化 LRU 缓存\n- int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1\n- void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value；如果不存在，则向缓存中插入该组 key-value。如果插入操作导致关键字数量超过 capacity，则应该逐出最久未使用的关键字。\n\n函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。',
    examples: [
      { input: '["LRUCache","put","put","get","put","get","put","get","get","get"]\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]', output: '[null,null,null,1,null,-1,null,-1,3,4]' },
    ],
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
    hint: '核心思路：利用 JS Map 的插入顺序特性。get 时先删除再重新插入（刷新顺序）。put 时也先删除（如果存在），再插入。超容量时删除 Map 的第一个键（最久未使用）。所有操作 O(1)。',
    dataStructure: 'class-ops',
    functionName: 'LRUCache',
    starterCode: `class LRUCache {\n  constructor(capacity) {\n    // 初始化\n  }\n  get(key) {\n    \n  }\n  put(key, value) {\n    \n  }\n}`,
    testCases: [
      {
        input: [
          ['LRUCache','put','put','get','put','get','put','get','get','get'],
          [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]
        ],
        expected: [null,null,null,1,null,-1,null,-1,3,4],
      },
    ],
  },

  // ===== Phase 2: 高频技巧 =====
  'move-zeroes': {
    id: 'move-zeroes',
    title: 'Move Zeroes',
    titleCN: '移动零',
    difficulty: 'easy',
    pattern: 'two-pointers',
    link: 'https://leetcode.cn/problems/move-zeroes/',
    description: '给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。\n\n请注意，必须在不复制数组的情况下原地对数组进行操作。',
    examples: [
      { input: 'nums = [0,1,0,3,12]', output: '[1,3,12,0,0]' },
      { input: 'nums = [0]', output: '[0]' },
    ],
    template: `function moveZeroes(nums) {
  let slow = 0
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]]
      slow++
    }
  }
  return nums
}`,
    hint: '核心思路：快慢双指针。slow 指向下一个非零元素应放置的位置，fast 遍历数组。遇到非零元素时交换 nums[slow] 和 nums[fast]，slow 前进。所有非零元素被移到前面，零自然被交换到后面。时间 O(n)，空间 O(1)。',
    functionName: 'moveZeroes',
    starterCode: `function moveZeroes(nums) {\n  // 在这里写你的代码（原地修改 nums）\n  \n}`,
    testCases: [
      { input: [[0,1,0,3,12]], expected: [1,3,12,0,0] },
      { input: [[0]], expected: [0] },
      { input: [[1,2,3]], expected: [1,2,3] },
    ],
  },
  'remove-duplicates': {
    id: 'remove-duplicates',
    title: 'Remove Duplicates from Sorted Array',
    titleCN: '删除有序数组中的重复项',
    difficulty: 'easy',
    pattern: 'two-pointers',
    link: 'https://leetcode.cn/problems/remove-duplicates-from-sorted-array/',
    description: '给你一个非严格递增排列的数组 nums，请你原地删除重复出现的元素，使每个元素只出现一次，返回删除后数组的新长度。元素的相对顺序应该保持一致。',
    examples: [
      { input: 'nums = [1,1,2]', output: '2, nums = [1,2,_]' },
      { input: 'nums = [0,0,1,1,1,2,2,3,3,4]', output: '5, nums = [0,1,2,3,4,_,_,_,_,_]' },
    ],
    template: `function removeDuplicates(nums) {
  if (!nums.length) return 0
  let slow = 0
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++
      nums[slow] = nums[fast]
    }
  }
  return slow + 1
}`,
    hint: '核心思路：快慢双指针。slow 记录不重复序列的末尾，fast 向前扫描。当 nums[fast] ≠ nums[slow] 时，slow 前进一步并赋值。最终 slow + 1 就是不重复元素的数量。时间 O(n)，空间 O(1)。',
    functionName: 'removeDuplicates',
    starterCode: `function removeDuplicates(nums) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      { input: [[1,1,2]], expected: 2 },
      { input: [[0,0,1,1,1,2,2,3,3,4]], expected: 5 },
      { input: [[1]], expected: 1 },
    ],
  },
  'container-with-most-water': {
    id: 'container-with-most-water',
    title: 'Container With Most Water',
    titleCN: '盛最多水的容器',
    difficulty: 'medium',
    pattern: 'two-pointers',
    link: 'https://leetcode.cn/problems/container-with-most-water/',
    description: '给定一个长度为 n 的整数数组 height。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i])。\n\n找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。返回容器可以储存的最大水量。',
    examples: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49' },
    ],
    template: `function maxArea(height) {
  let left = 0, right = height.length - 1, max = 0
  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left)
    max = Math.max(max, area)
    if (height[left] < height[right]) left++
    else right--
  }
  return max
}`,
    hint: '核心思路：左右双指针从两端向中间收缩。每次计算当前面积，然后移动较矮的一边（因为移动较高的一边面积只会更小）。贪心策略保证不会错过最优解。时间 O(n)，空间 O(1)。',
    functionName: 'maxArea',
    starterCode: `function maxArea(height) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      { input: [[1,8,6,2,5,4,8,3,7]], expected: 49 },
      { input: [[1,1]], expected: 1 },
      { input: [[4,3,2,1,4]], expected: 16 },
    ],
  },
  'three-sum': {
    id: 'three-sum',
    title: '3Sum',
    titleCN: '三数之和',
    difficulty: 'medium',
    pattern: 'two-pointers',
    link: 'https://leetcode.cn/problems/3sum/',
    description: '给你一个整数数组 nums，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k，同时还满足 nums[i] + nums[j] + nums[k] == 0。\n\n请你返回所有和为 0 且不重复的三元组。答案中不可以包含重复的三元组。',
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
    ],
    template: `function threeSum(nums) {
  nums.sort((a, b) => a - b)
  const result = []
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue
    let left = i + 1, right = nums.length - 1
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right]
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]])
        while (left < right && nums[left] === nums[left + 1]) left++
        while (left < right && nums[right] === nums[right - 1]) right--
        left++; right--
      } else if (sum < 0) left++
      else right--
    }
  }
  return result
}`,
    hint: '核心思路：先排序数组。固定第一个数 nums[i]，在剩余区间用双指针找两数之和为 -nums[i]。跳过重复元素避免重复三元组。排序 O(n log n) + 遍历 O(n²) = 总时间 O(n²)。',
    functionName: 'threeSum',
    starterCode: `function threeSum(nums) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      { input: [[-1,0,1,2,-1,-4]], expected: [[-1,-1,2],[-1,0,1]] },
      { input: [[0,1,1]], expected: [] },
      { input: [[0,0,0]], expected: [[0,0,0]] },
    ],
  },
  'longest-substring-without-repeating': {
    id: 'longest-substring-without-repeating',
    title: 'Longest Substring Without Repeating Characters',
    titleCN: '无重复字符的最长子串',
    difficulty: 'medium',
    pattern: 'sliding-window',
    link: 'https://leetcode.cn/problems/longest-substring-without-repeating-characters/',
    description: '给定一个字符串 s，请你找出其中不含有重复字符的最长子串的长度。',
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: '无重复字符的最长子串是 "abc"，其长度为 3' },
      { input: 's = "bbbbb"', output: '1', explanation: '无重复字符的最长子串是 "b"，其长度为 1' },
    ],
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
    hint: '核心思路：滑动窗口 + Set。右指针不断扩展窗口，将字符加入 Set。遇到重复字符时，左指针收缩窗口并从 Set 中移除字符，直到窗口内无重复。维护 maxLen 记录最大窗口大小。时间 O(n)。',
    functionName: 'lengthOfLongestSubstring',
    starterCode: `function lengthOfLongestSubstring(s) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      { input: ['abcabcbb'], expected: 3 },
      { input: ['bbbbb'], expected: 1 },
      { input: ['pwwkew'], expected: 3 },
    ],
  },
  'minimum-window-substring': {
    id: 'minimum-window-substring',
    title: 'Minimum Window Substring',
    titleCN: '最小覆盖子串',
    difficulty: 'hard',
    pattern: 'sliding-window',
    link: 'https://leetcode.cn/problems/minimum-window-substring/',
    description: '给你一个字符串 s、一个字符串 t。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 ""。\n\n对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。',
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
      { input: 's = "a", t = "a"', output: '"a"' },
    ],
    template: `function minWindow(s, t) {
  const need = new Map()
  for (const c of t) need.set(c, (need.get(c) || 0) + 1)
  let left = 0, matched = 0, start = 0, minLen = Infinity
  for (let right = 0; right < s.length; right++) {
    const c = s[right]
    if (need.has(c)) {
      need.set(c, need.get(c) - 1)
      if (need.get(c) === 0) matched++
    }
    while (matched === need.size) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1
        start = left
      }
      const d = s[left]
      if (need.has(d)) {
        if (need.get(d) === 0) matched--
        need.set(d, need.get(d) + 1)
      }
      left++
    }
  }
  return minLen === Infinity ? '' : s.slice(start, start + minLen)
}`,
    hint: '核心思路：滑动窗口 + 哈希表计数。用 need Map 记录 t 中每个字符的需求量，matched 记录已满足的字符种数。右指针扩展窗口直到包含 t 的所有字符，左指针收缩窗口寻找最小覆盖。时间 O(n)。',
    functionName: 'minWindow',
    starterCode: `function minWindow(s, t) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      { input: ['ADOBECODEBANC', 'ABC'], expected: 'BANC' },
      { input: ['a', 'a'], expected: 'a' },
      { input: ['a', 'aa'], expected: '' },
    ],
  },
  'max-sliding-window': {
    id: 'max-sliding-window',
    title: 'Sliding Window Maximum',
    titleCN: '滑动窗口最大值',
    difficulty: 'hard',
    pattern: 'sliding-window',
    link: 'https://leetcode.cn/problems/sliding-window-maximum/',
    description: '给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。\n\n返回滑动窗口中的最大值。',
    examples: [
      { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]' },
    ],
    template: `function maxSlidingWindow(nums, k) {
  const deque = [], result = []
  for (let i = 0; i < nums.length; i++) {
    while (deque.length && deque[0] < i - k + 1) deque.shift()
    while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) deque.pop()
    deque.push(i)
    if (i >= k - 1) result.push(nums[deque[0]])
  }
  return result
}`,
    hint: '核心思路：维护一个单调递减的双端队列（存下标）。队首始终是当前窗口最大值的下标。新元素入队前，弹出所有比它小的元素（它们不可能成为后续窗口的最大值）。队首过期时也要弹出。时间 O(n)。',
    functionName: 'maxSlidingWindow',
    starterCode: `function maxSlidingWindow(nums, k) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      { input: [[1,3,-1,-3,5,3,6,7], 3], expected: [3,3,5,5,6,7] },
      { input: [[1], 1], expected: [1] },
      { input: [[1,-1], 1], expected: [1,-1] },
    ],
  },
  'find-all-anagrams': {
    id: 'find-all-anagrams',
    title: 'Find All Anagrams in a String',
    titleCN: '找到字符串中所有字母异位词',
    difficulty: 'medium',
    pattern: 'sliding-window',
    link: 'https://leetcode.cn/problems/find-all-anagrams-in-a-string/',
    description: '给定两个字符串 s 和 p，找到 s 中所有 p 的异位词的子串，返回这些子串的起始索引。不考虑答案输出的顺序。',
    examples: [
      { input: 's = "cbaebabacd", p = "abc"', output: '[0,6]', explanation: '起始索引等于 0 的子串是 "cba"，它是 "abc" 的异位词。起始索引等于 6 的子串是 "bac"，它是 "abc" 的异位词。' },
    ],
    template: `function findAnagrams(s, p) {
  const result = [], need = new Array(26).fill(0)
  const aCode = 'a'.charCodeAt(0)
  for (const c of p) need[c.charCodeAt(0) - aCode]++
  const window = new Array(26).fill(0)
  for (let i = 0; i < s.length; i++) {
    window[s.charCodeAt(i) - aCode]++
    if (i >= p.length) window[s.charCodeAt(i - p.length) - aCode]--
    if (window.every((v, j) => v === need[j])) result.push(i - p.length + 1)
  }
  return result
}`,
    hint: '核心思路：固定窗口大小为 p.length 的滑动窗口。维护窗口内字符频率数组，与 p 的字符频率比较。窗口每次右移一位，加入新字符、移除旧字符。频率完全匹配时记录起始索引。时间 O(n×26)。',
    functionName: 'findAnagrams',
    starterCode: `function findAnagrams(s, p) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      { input: ['cbaebabacd', 'abc'], expected: [0,6] },
      { input: ['abab', 'ab'], expected: [0,1,2] },
      { input: ['af', 'be'], expected: [] },
    ],
  },
  'binary-search': {
    id: 'binary-search',
    title: 'Binary Search',
    titleCN: '二分查找',
    difficulty: 'easy',
    pattern: 'binary-search',
    link: 'https://leetcode.cn/problems/binary-search/',
    description: '给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。',
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1' },
    ],
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
    hint: '核心思路：左闭右闭区间 [left, right]。取中点 mid，与 target 比较：相等则返回；小了则搜索右半段 left = mid + 1；大了则搜索左半段 right = mid - 1。注意用 left + (right-left)/2 防溢出。时间 O(log n)。',
    functionName: 'binarySearch',
    starterCode: `function binarySearch(nums, target) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      { input: [[-1,0,3,5,9,12], 9], expected: 4 },
      { input: [[-1,0,3,5,9,12], 2], expected: -1 },
      { input: [[5], 5], expected: 0 },
    ],
  },
  'search-rotated-sorted-array': {
    id: 'search-rotated-sorted-array',
    title: 'Search in Rotated Sorted Array',
    titleCN: '搜索旋转排序数组',
    difficulty: 'medium',
    pattern: 'binary-search',
    link: 'https://leetcode.cn/problems/search-in-rotated-sorted-array/',
    description: '整数数组 nums 按升序排列，数组中的值互不相同。在传递给函数之前，nums 在预先未知的某个下标 k 上进行了旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]。\n\n给你旋转后的数组 nums 和一个整数 target，如果 nums 中存在这个目标值，则返回它的下标，否则返回 -1。你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。',
    examples: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' },
    ],
    template: `function search(nums, target) {
  let left = 0, right = nums.length - 1
  while (left <= right) {
    const mid = left + ((right - left) >> 1)
    if (nums[mid] === target) return mid
    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) right = mid - 1
      else left = mid + 1
    } else {
      if (target > nums[mid] && target <= nums[right]) left = mid + 1
      else right = mid - 1
    }
  }
  return -1
}`,
    hint: '核心思路：二分查找的变体。每次取 mid 后，判断哪半段是有序的（比较 nums[left] 和 nums[mid]）。如果 target 在有序半段的范围内则搜索该半段，否则搜索另一半。时间 O(log n)。',
    functionName: 'search',
    starterCode: `function search(nums, target) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      { input: [[4,5,6,7,0,1,2], 0], expected: 4 },
      { input: [[4,5,6,7,0,1,2], 3], expected: -1 },
      { input: [[1], 0], expected: -1 },
    ],
  },
  'find-first-and-last': {
    id: 'find-first-and-last',
    title: 'Find First and Last Position',
    titleCN: '在排序数组中查找元素的第一个和最后一个位置',
    difficulty: 'medium',
    pattern: 'binary-search',
    link: 'https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/',
    description: '给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。\n\n如果数组中不存在目标值 target，返回 [-1, -1]。你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。',
    examples: [
      { input: 'nums = [5,7,7,8,8,10], target = 8', output: '[3,4]' },
      { input: 'nums = [5,7,7,8,8,10], target = 6', output: '[-1,-1]' },
    ],
    template: `function searchRange(nums, target) {
  function findLeft() {
    let left = 0, right = nums.length - 1, result = -1
    while (left <= right) {
      const mid = left + ((right - left) >> 1)
      if (nums[mid] === target) { result = mid; right = mid - 1 }
      else if (nums[mid] < target) left = mid + 1
      else right = mid - 1
    }
    return result
  }
  function findRight() {
    let left = 0, right = nums.length - 1, result = -1
    while (left <= right) {
      const mid = left + ((right - left) >> 1)
      if (nums[mid] === target) { result = mid; left = mid + 1 }
      else if (nums[mid] < target) left = mid + 1
      else right = mid - 1
    }
    return result
  }
  return [findLeft(), findRight()]
}`,
    hint: '核心思路：两次二分查找分别定位左右边界。找左边界时：命中 target 后继续向左搜索（right = mid - 1）。找右边界时：命中后继续向右搜索（left = mid + 1）。时间 O(log n)。',
    functionName: 'searchRange',
    starterCode: `function searchRange(nums, target) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      { input: [[5,7,7,8,8,10], 8], expected: [3,4] },
      { input: [[5,7,7,8,8,10], 6], expected: [-1,-1] },
      { input: [[], 0], expected: [-1,-1] },
    ],
  },

  // ===== Phase 3: 算法思想 =====
  'permutations': {
    id: 'permutations',
    title: 'Permutations',
    titleCN: '全排列',
    difficulty: 'medium',
    pattern: 'backtracking',
    link: 'https://leetcode.cn/problems/permutations/',
    description: '给定一个不含重复数字的数组 nums，返回其所有可能的全排列。你可以按任意顺序返回答案。',
    examples: [
      { input: 'nums = [1,2,3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' },
    ],
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
    hint: '核心思路：经典回溯模板。维护 path（当前排列）和 used 数组（标记已使用的元素）。每层遍历所有未使用的元素，做选择 → 递归 → 撤销选择。path.length === nums.length 时收集结果。时间 O(n×n!)。',
    functionName: 'permute',
    starterCode: `function permute(nums) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      { input: [[1,2,3]], expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] },
      { input: [[0,1]], expected: [[0,1],[1,0]] },
      { input: [[1]], expected: [[1]] },
    ],
  },
  'subsets': {
    id: 'subsets',
    title: 'Subsets',
    titleCN: '子集',
    difficulty: 'medium',
    pattern: 'backtracking',
    link: 'https://leetcode.cn/problems/subsets/',
    description: '给你一个整数数组 nums，数组中的元素互不相同。返回该数组所有可能的子集（幂集）。解集不能包含重复的子集。你可以按任意顺序返回解集。',
    examples: [
      { input: 'nums = [1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' },
    ],
    template: `function subsets(nums) {
  const result = []
  function backtrack(start, path) {
    result.push([...path])
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i])
      backtrack(i + 1, path)
      path.pop()
    }
  }
  backtrack(0, [])
  return result
}`,
    hint: '核心思路：回溯法。每层递归从 start 开始选元素，选完后递归下一层（start+1 避免重复）。每个递归节点的 path 都是一个有效子集，直接加入结果。共 2^n 个子集。',
    functionName: 'subsets',
    starterCode: `function subsets(nums) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      // Note: order of subsets may vary
      { input: [[1,2,3]], expected: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]] },
      { input: [[0]], expected: [[],[0]] },
    ],
  },
  'combination-sum': {
    id: 'combination-sum',
    title: 'Combination Sum',
    titleCN: '组合总和',
    difficulty: 'medium',
    pattern: 'backtracking',
    link: 'https://leetcode.cn/problems/combination-sum/',
    description: '给你一个无重复元素的整数数组 candidates 和一个目标整数 target，找出 candidates 中可以使数字和为目标数 target 的所有不同组合，并以列表形式返回。你可以按任意顺序返回这些组合。\n\ncandidates 中的同一个数字可以无限制重复被选取。如果至少一个数字的被选数量不同，则两种组合是不同的。',
    examples: [
      { input: 'candidates = [2,3,6,7], target = 7', output: '[[2,2,3],[7]]' },
    ],
    template: `function combinationSum(candidates, target) {
  const result = []
  function backtrack(start, path, remain) {
    if (remain === 0) { result.push([...path]); return }
    if (remain < 0) return
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i])
      backtrack(i, path, remain - candidates[i])
      path.pop()
    }
  }
  backtrack(0, [], target)
  return result
}`,
    hint: '核心思路：回溯法，与普通组合不同的是元素可重复选取。递归时 start 不加 1（传 i 而非 i+1），允许同一元素多次使用。当 remain=0 时找到一组解，remain<0 时剪枝回退。',
    functionName: 'combinationSum',
    starterCode: `function combinationSum(candidates, target) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      // Note: order of combinations may vary
      { input: [[2,3,6,7], 7], expected: [[2,2,3],[7]] },
      { input: [[2,3,5], 8], expected: [[2,2,2,2],[2,3,3],[3,5]] },
      { input: [[2], 1], expected: [] },
    ],
  },
  'word-search': {
    id: 'word-search',
    title: 'Word Search',
    titleCN: '单词搜索',
    difficulty: 'medium',
    pattern: 'dfs',
    link: 'https://leetcode.cn/problems/word-search/',
    description: '给定一个 m x n 二维字符网格 board 和一个字符串单词 word。如果 word 存在于网格中，返回 true；否则返回 false。\n\n单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中"相邻"单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。',
    examples: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true' },
    ],
    template: `function exist(board, word) {
  const m = board.length, n = board[0].length
  function dfs(i, j, k) {
    if (k === word.length) return true
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== word[k]) return false
    const temp = board[i][j]
    board[i][j] = '#'
    const found = dfs(i+1,j,k+1) || dfs(i-1,j,k+1) || dfs(i,j+1,k+1) || dfs(i,j-1,k+1)
    board[i][j] = temp
    return found
  }
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++)
      if (dfs(i, j, 0)) return true
  return false
}`,
    hint: '核心思路：DFS 回溯。从每个格子出发尝试匹配 word。访问过的格子临时标记为 "#" 防止重复访问，回溯时恢复。匹配到 word.length 时返回 true。时间 O(m×n×4^L)，L 为单词长度。',
    functionName: 'exist',
    starterCode: `function exist(board, word) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      { input: [[['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], 'ABCCED'], expected: true },
      { input: [[['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], 'SEE'], expected: true },
      { input: [[['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], 'ABCB'], expected: false },
    ],
  },
  'binary-tree-level-order': {
    id: 'binary-tree-level-order',
    title: 'Binary Tree Level Order Traversal',
    titleCN: '二叉树的层序遍历',
    difficulty: 'medium',
    pattern: 'bfs',
    link: 'https://leetcode.cn/problems/binary-tree-level-order-traversal/',
    description: '给你二叉树的根节点 root，返回其节点值的层序遍历（即逐层地，从左到右访问所有节点）。',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
    ],
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
    hint: '核心思路：BFS 层序遍历。用队列存储待访问节点，每轮处理一层：先记录当前队列长度 size，连续出队 size 个节点（同一层），将它们的子节点入队。每层的值收集为一个数组。时间 O(n)。',
    dataStructure: 'binary-tree',
    functionName: 'levelOrder',
    starterCode: `function levelOrder(root) {\n  // root 是 TreeNode 二叉树\n  // TreeNode: { val, left, right }\n  \n}`,
    testCases: [
      { input: [[3,9,20,null,null,15,7]], expected: [[3],[9,20],[15,7]] },
      { input: [[1]], expected: [[1]] },
      { input: [[]], expected: [] },
    ],
  },
  'climbing-stairs': {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    titleCN: '爬楼梯',
    difficulty: 'easy',
    pattern: 'dp',
    link: 'https://leetcode.cn/problems/climbing-stairs/',
    description: '假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？',
    examples: [
      { input: 'n = 2', output: '2', explanation: '有两种方法：1+1 和 2' },
      { input: 'n = 3', output: '3', explanation: '有三种方法：1+1+1、1+2 和 2+1' },
    ],
    template: `function climbStairs(n) {
  if (n <= 2) return n
  let a = 1, b = 2
  for (let i = 3; i <= n; i++) {
    [a, b] = [b, a + b]
  }
  return b
}`,
    hint: '核心思路：动态规划，本质是斐波那契数列。到第 i 阶的方法数 = 到第 i-1 阶 + 到第 i-2 阶（最后一步走 1 或 2 阶）。用两个变量滚动计算，不需要数组。时间 O(n)，空间 O(1)。',
    functionName: 'climbStairs',
    starterCode: `function climbStairs(n) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      { input: [2], expected: 2 },
      { input: [3], expected: 3 },
      { input: [5], expected: 8 },
    ],
  },
  'house-robber': {
    id: 'house-robber',
    title: 'House Robber',
    titleCN: '打家劫舍',
    difficulty: 'medium',
    pattern: 'dp',
    link: 'https://leetcode.cn/problems/house-robber/',
    description: '你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。\n\n给定一个代表每个房屋存放金额的非负整数数组，计算你不触动警报装置的情况下，一夜之内能够偷窃到的最高金额。',
    examples: [
      { input: 'nums = [1,2,3,1]', output: '4', explanation: '偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。偷窃到的最高金额 = 1 + 3 = 4' },
      { input: 'nums = [2,7,9,3,1]', output: '12' },
    ],
    template: `function rob(nums) {
  if (nums.length === 1) return nums[0]
  let prev2 = 0, prev1 = 0
  for (const num of nums) {
    const curr = Math.max(prev1, prev2 + num)
    prev2 = prev1
    prev1 = curr
  }
  return prev1
}`,
    hint: '核心思路：动态规划。对每间房有两种选择：偷（加上前前间的最大值）或不偷（取前一间的最大值）。状态转移：dp[i] = max(dp[i-1], dp[i-2] + nums[i])。用两个变量滚动优化空间到 O(1)。',
    functionName: 'rob',
    starterCode: `function rob(nums) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      { input: [[1,2,3,1]], expected: 4 },
      { input: [[2,7,9,3,1]], expected: 12 },
      { input: [[2,1,1,2]], expected: 4 },
    ],
  },
  'longest-increasing-subsequence': {
    id: 'longest-increasing-subsequence',
    title: 'Longest Increasing Subsequence',
    titleCN: '最长递增子序列',
    difficulty: 'medium',
    pattern: 'dp',
    link: 'https://leetcode.cn/problems/longest-increasing-subsequence/',
    description: '给你一个整数数组 nums，找到其中最长严格递增子序列的长度。\n\n子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。',
    examples: [
      { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4', explanation: '最长递增子序列是 [2,3,7,101]，因此长度为 4' },
    ],
    template: `function lengthOfLIS(nums) {
  const dp = new Array(nums.length).fill(1)
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1)
    }
  }
  return Math.max(...dp)
}`,
    hint: '核心思路：动态规划。dp[i] 表示以 nums[i] 结尾的最长递增子序列长度。对每个 i，遍历 j < i，若 nums[j] < nums[i] 则 dp[i] = max(dp[i], dp[j]+1)。最终取 dp 数组最大值。时间 O(n²)，可用二分优化到 O(n log n)。',
    functionName: 'lengthOfLIS',
    starterCode: `function lengthOfLIS(nums) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      { input: [[10,9,2,5,3,7,101,18]], expected: 4 },
      { input: [[0,1,0,3,2,3]], expected: 4 },
      { input: [[7,7,7,7,7,7,7]], expected: 1 },
    ],
  },
  'longest-palindromic-substring': {
    id: 'longest-palindromic-substring',
    title: 'Longest Palindromic Substring',
    titleCN: '最长回文子串',
    difficulty: 'medium',
    pattern: 'dp',
    link: 'https://leetcode.cn/problems/longest-palindromic-substring/',
    description: '给你一个字符串 s，找到 s 中最长的回文子串。如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。',
    examples: [
      { input: 's = "babad"', output: '"bab"', explanation: '"aba" 同样是符合题意的答案' },
      { input: 's = "cbbd"', output: '"bb"' },
    ],
    template: `function longestPalindrome(s) {
  let start = 0, maxLen = 1
  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++ }
    if (r - l - 1 > maxLen) {
      maxLen = r - l - 1
      start = l + 1
    }
  }
  for (let i = 0; i < s.length; i++) {
    expand(i, i)
    expand(i, i + 1)
  }
  return s.slice(start, start + maxLen)
}`,
    hint: '核心思路：中心扩展法。回文串从中心向两边对称，因此遍历每个位置作为中心，分别尝试奇数长度（单字符中心）和偶数长度（双字符中心）向两边扩展。记录最长回文的起始位置和长度。时间 O(n²)，空间 O(1)。',
    functionName: 'longestPalindrome',
    starterCode: `function longestPalindrome(s) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      // Note: "bab" and "aba" are both valid for "babad"
      { input: ['babad'], expected: 'bab' },
      { input: ['cbbd'], expected: 'bb' },
      { input: ['a'], expected: 'a' },
    ],
  },

  // ===== Phase 4: 面试强化 =====
  'inorder-traversal': {
    id: 'inorder-traversal',
    title: 'Binary Tree Inorder Traversal',
    titleCN: '二叉树的中序遍历',
    difficulty: 'easy',
    pattern: 'tree',
    link: 'https://leetcode.cn/problems/binary-tree-inorder-traversal/',
    description: '给定一个二叉树的根节点 root，返回它的中序遍历。\n\n中序遍历顺序：左子树 → 根节点 → 右子树。',
    examples: [
      { input: 'root = [1,null,2,3]', output: '[1,3,2]' },
    ],
    template: `function inorderTraversal(root) {
  const result = []
  function dfs(node) {
    if (!node) return
    dfs(node.left)
    result.push(node.val)
    dfs(node.right)
  }
  dfs(root)
  return result
}`,
    hint: '核心思路：递归实现中序遍历：先递归左子树 → 访问当前节点 → 递归右子树。也可用栈迭代实现：不断将左子节点入栈，弹出时访问并转向右子树。时间 O(n)，空间 O(h)，h 为树高。',
    dataStructure: 'binary-tree',
    functionName: 'inorderTraversal',
    starterCode: `function inorderTraversal(root) {\n  // root 是 TreeNode 二叉树\n  // TreeNode: { val, left, right }\n  \n}`,
    testCases: [
      { input: [[1,null,2,3]], expected: [1,3,2] },
      { input: [[]], expected: [] },
      { input: [[1]], expected: [1] },
    ],
  },
  'max-depth-binary-tree': {
    id: 'max-depth-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    titleCN: '二叉树的最大深度',
    difficulty: 'easy',
    pattern: 'tree',
    link: 'https://leetcode.cn/problems/maximum-depth-of-binary-tree/',
    description: '给定一个二叉树 root，返回其最大深度。\n\n二叉树的最大深度是指从根节点到最远叶子节点的最长路径上的节点数。',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '3' },
    ],
    template: `function maxDepth(root) {
  if (!root) return 0
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
}`,
    hint: '核心思路：递归。空节点深度为 0，非空节点深度 = 1 + max(左子树深度, 右子树深度)。这是最经典的树递归模板，一行代码即可实现。时间 O(n)，空间 O(h)。',
    dataStructure: 'binary-tree',
    functionName: 'maxDepth',
    starterCode: `function maxDepth(root) {\n  // root 是 TreeNode 二叉树\n  // TreeNode: { val, left, right }\n  \n}`,
    testCases: [
      { input: [[3,9,20,null,null,15,7]], expected: 3 },
      { input: [[1,null,2]], expected: 2 },
      { input: [[]], expected: 0 },
    ],
  },
  'validate-bst': {
    id: 'validate-bst',
    title: 'Validate Binary Search Tree',
    titleCN: '验证二叉搜索树',
    difficulty: 'medium',
    pattern: 'tree',
    link: 'https://leetcode.cn/problems/validate-binary-search-tree/',
    description: '给你一个二叉树的根节点 root，判断其是否是一个有效的二叉搜索树。\n\n有效二叉搜索树定义如下：\n- 节点的左子树只包含小于当前节点的数。\n- 节点的右子树只包含大于当前节点的数。\n- 所有左子树和右子树自身必须也是二叉搜索树。',
    examples: [
      { input: 'root = [2,1,3]', output: 'true' },
      { input: 'root = [5,1,4,null,null,3,6]', output: 'false' },
    ],
    template: `function isValidBST(root) {
  function validate(node, min, max) {
    if (!node) return true
    if (node.val <= min || node.val >= max) return false
    return validate(node.left, min, node.val) && validate(node.right, node.val, max)
  }
  return validate(root, -Infinity, Infinity)
}`,
    hint: '核心思路：递归传递上下界。每个节点的值必须在 (min, max) 区间内。左子树的上界更新为当前节点值，右子树的下界更新为当前节点值。也可用中序遍历，验证序列严格递增。时间 O(n)。',
    dataStructure: 'binary-tree',
    functionName: 'isValidBST',
    starterCode: `function isValidBST(root) {\n  // root 是 TreeNode 二叉树\n  // TreeNode: { val, left, right }\n  \n}`,
    testCases: [
      { input: [[2,1,3]], expected: true },
      { input: [[5,1,4,null,null,3,6]], expected: false },
      { input: [[1]], expected: true },
    ],
  },
  'lowest-common-ancestor': {
    id: 'lowest-common-ancestor',
    title: 'Lowest Common Ancestor of a Binary Tree',
    titleCN: '二叉树的最近公共祖先',
    difficulty: 'medium',
    pattern: 'tree',
    link: 'https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/',
    description: '给定一个二叉树，找到该树中两个指定节点的最近公共祖先。\n\n最近公共祖先的定义为：对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。',
    examples: [
      { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1', output: '3' },
      { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4', output: '5' },
    ],
    template: `function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root
  const left = lowestCommonAncestor(root.left, p, q)
  const right = lowestCommonAncestor(root.right, p, q)
  if (left && right) return root
  return left || right
}`,
    hint: '核心思路：后序遍历递归。如果当前节点是 p 或 q 则返回自身。分别在左右子树查找，若左右都找到则当前节点就是 LCA；若只有一边找到则返回那一边。时间 O(n)，空间 O(h)。',
    dataStructure: 'binary-tree-lca',
    functionName: 'lowestCommonAncestor',
    starterCode: `function lowestCommonAncestor(root, p, q) {\n  // root, p, q 都是 TreeNode\n  // TreeNode: { val, left, right }\n  // 返回 p 和 q 的最近公共祖先节点\n  \n}`,
    testCases: [
      { input: [[3,5,1,6,2,0,8,null,null,7,4], 5, 1], expected: 3 },
      { input: [[3,5,1,6,2,0,8,null,null,7,4], 5, 4], expected: 5 },
      { input: [[1,2], 1, 2], expected: 1 },
    ],
  },
  'top-k-frequent': {
    id: 'top-k-frequent',
    title: 'Top K Frequent Elements',
    titleCN: '前 K 个高频元素',
    difficulty: 'medium',
    pattern: 'heap',
    link: 'https://leetcode.cn/problems/top-k-frequent-elements/',
    description: '给你一个整数数组 nums 和一个整数 k，请你返回其中出现频率前 k 高的元素。你可以按任意顺序返回答案。',
    examples: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
    ],
    template: `function topKFrequent(nums, k) {
  const map = new Map()
  for (const n of nums) map.set(n, (map.get(n) || 0) + 1)
  const buckets = new Array(nums.length + 1).fill(null).map(() => [])
  for (const [num, freq] of map) buckets[freq].push(num)
  const result = []
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i])
  }
  return result.slice(0, k)
}`,
    hint: '核心思路：桶排序法。先用哈希表统计每个元素出现频率，然后以频率为下标放入桶中。从高频桶到低频桶遍历，取前 k 个元素。时间 O(n)，比堆排序 O(n log k) 更优。',
    functionName: 'topKFrequent',
    starterCode: `function topKFrequent(nums, k) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      // Note: order of result may vary
      { input: [[1,1,1,2,2,3], 2], expected: [1,2] },
      { input: [[1], 1], expected: [1] },
      { input: [[4,1,-1,2,-1,2,3], 2], expected: [-1,2] },
    ],
  },
  'kth-largest': {
    id: 'kth-largest',
    title: 'Kth Largest Element in an Array',
    titleCN: '数组中的第K个最大元素',
    difficulty: 'medium',
    pattern: 'heap',
    link: 'https://leetcode.cn/problems/kth-largest-element-in-an-array/',
    description: '给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。\n\n请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。',
    examples: [
      { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
      { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4' },
    ],
    template: `function findKthLargest(nums, k) {
  function quickSelect(left, right) {
    const pivot = nums[right]
    let p = left
    for (let i = left; i < right; i++) {
      if (nums[i] >= pivot) {
        [nums[i], nums[p]] = [nums[p], nums[i]]
        p++
      }
    }
    [nums[p], nums[right]] = [nums[right], nums[p]]
    if (p === k - 1) return nums[p]
    if (p < k - 1) return quickSelect(p + 1, right)
    return quickSelect(left, p - 1)
  }
  return quickSelect(0, nums.length - 1)
}`,
    hint: '核心思路：快速选择算法（QuickSelect）。类似快排的 partition，每次将数组分为大于和小于 pivot 两部分。根据 pivot 位置与 k 的关系决定只递归一边。平均时间 O(n)，最坏 O(n²)。也可用排序 O(n log n) 解决。',
    functionName: 'findKthLargest',
    starterCode: `function findKthLargest(nums, k) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      { input: [[3,2,1,5,6,4], 2], expected: 5 },
      { input: [[3,2,3,1,2,4,5,5,6], 4], expected: 4 },
      { input: [[1], 1], expected: 1 },
    ],
  },
  'number-of-islands': {
    id: 'number-of-islands',
    title: 'Number of Islands',
    titleCN: '岛屿数量',
    difficulty: 'medium',
    pattern: 'graph',
    link: 'https://leetcode.cn/problems/number-of-islands/',
    description: '给你一个由 \'1\'（陆地）和 \'0\'（水）组成的的二维网格，请你计算网格中岛屿的数量。\n\n岛屿总是被水包围，并且每座岛屿只能由水平方向和/或垂直方向上相邻的陆地连接形成。此外，你可以假设该网格的四条边均被水包围。',
    examples: [
      { input: 'grid = [\n  ["1","1","1","1","0"],\n  ["1","1","0","1","0"],\n  ["1","1","0","0","0"],\n  ["0","0","0","0","0"]\n]', output: '1' },
      { input: 'grid = [\n  ["1","1","0","0","0"],\n  ["1","1","0","0","0"],\n  ["0","0","1","0","0"],\n  ["0","0","0","1","1"]\n]', output: '3' },
    ],
    template: `function numIslands(grid) {
  let count = 0
  const m = grid.length, n = grid[0].length
  function dfs(i, j) {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] !== '1') return
    grid[i][j] = '0'
    dfs(i+1, j); dfs(i-1, j); dfs(i, j+1); dfs(i, j-1)
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        count++
        dfs(i, j)
      }
    }
  }
  return count
}`,
    hint: '核心思路：DFS 沉岛法。遍历网格，遇到 "1" 时岛屿计数 +1，然后 DFS 将整个岛屿（所有相连的 "1"）标记为 "0"（沉没），避免重复计数。四个方向递归扩展。时间 O(m×n)。',
    functionName: 'numIslands',
    starterCode: `function numIslands(grid) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      { input: [[['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]], expected: 1 },
      { input: [[['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]], expected: 3 },
      { input: [[['0']]], expected: 0 },
    ],
  },
  'course-schedule': {
    id: 'course-schedule',
    title: 'Course Schedule',
    titleCN: '课程表',
    difficulty: 'medium',
    pattern: 'graph',
    link: 'https://leetcode.cn/problems/course-schedule/',
    description: '你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1。在选修某些课程之前需要一些先修课程。先修课程按数组 prerequisites 给出，其中 prerequisites[i] = [ai, bi] 表示如果要学习课程 ai 则必须先学习课程 bi。\n\n请你判断是否可能完成所有课程的学习？如果可以，返回 true；否则返回 false。',
    examples: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false', explanation: '总共有 2 门课程。学习课程 1 之前，你需要先完成课程 0；并且学习课程 0 之前，你还应先完成课程 1。这是不可能的。' },
    ],
    template: `function canFinish(numCourses, prerequisites) {
  const graph = Array.from({length: numCourses}, () => [])
  const inDegree = new Array(numCourses).fill(0)
  for (const [a, b] of prerequisites) {
    graph[b].push(a)
    inDegree[a]++
  }
  const queue = []
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i)
  }
  let count = 0
  while (queue.length) {
    const course = queue.shift()
    count++
    for (const next of graph[course]) {
      inDegree[next]--
      if (inDegree[next] === 0) queue.push(next)
    }
  }
  return count === numCourses
}`,
    hint: '核心思路：BFS 拓扑排序。建立邻接表和入度数组，将入度为 0 的节点入队。每次出队一个节点（表示可学习），将其邻居入度 -1，降为 0 时入队。最终如果出队节点数等于课程总数，说明无环。时间 O(V+E)。',
    functionName: 'canFinish',
    starterCode: `function canFinish(numCourses, prerequisites) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      { input: [2, [[1,0]]], expected: true },
      { input: [2, [[1,0],[0,1]]], expected: false },
      { input: [3, [[1,0],[2,1]]], expected: true },
    ],
  },
}
