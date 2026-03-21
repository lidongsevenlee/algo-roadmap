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
    hint: '用哈希表存储已遍历的值，一次遍历即可',
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
    hint: '用哈希表统计字符频率',
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
    hint: '排序后的字符串作为 key',
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
    hint: '用 Set 判断是否已存在',
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
    hint: '哑节点 + 双指针逐一比较',
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
    hint: '三指针：prev, curr, next',
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
    hint: '快慢指针，快指针每次走两步',
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
    hint: '遇到左括号入栈，右括号出栈匹配',
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
    hint: '辅助栈同步记录最小值',
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
    hint: 'Map 保持插入顺序，get 时删除再重新插入',
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
    hint: '快慢指针，非零元素往前移',
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
    hint: '慢指针记录不重复位置，快指针遍历',
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
    hint: '左右指针，移动较短的那边',
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
    hint: '排序 + 固定一个数 + 双指针',
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
    hint: 'Set + 滑动窗口，右指针扩展，左指针收缩',
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
    hint: '双 Map 计数 + 滑动窗口',
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
    hint: '单调递减队列',
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
    hint: '固定窗口大小的滑动窗口',
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
    hint: '左闭右闭区间，注意边界条件',
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
    hint: '先判断哪半段有序，再决定搜索方向',
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
    hint: '两次二分查找左右边界',
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
    hint: '回溯模板：做选择 → 递归 → 撤销选择',
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
    hint: '每个元素选或不选',
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
    hint: '回溯 + 可重复选择（start 不加 1）',
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
    hint: 'DFS + 标记访问过的格子',
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
    hint: '队列 + 记录每层节点数',
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
    hint: 'dp[i] = dp[i-1] + dp[i-2]',
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
    hint: 'dp[i] = max(dp[i-1], dp[i-2] + nums[i])',
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
    hint: 'dp[i] = max(dp[j] + 1)，其中 j < i 且 nums[j] < nums[i]',
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
    hint: '中心扩展法或 dp[i][j] 表示 s[i..j] 是否回文',
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
    hint: '左 → 根 → 右',
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
    hint: '递归：1 + max(左深度, 右深度)',
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
    hint: '中序遍历递增 或 递归传递上下界',
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
    hint: '递归查找，左右子树都找到则当前节点是 LCA',
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
    hint: '哈希计数 + 桶排序 或 小顶堆',
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
    hint: '快速选择算法 或 堆',
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
    hint: 'DFS/BFS 遍历，沉岛法',
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
    hint: '拓扑排序 (BFS) 或 DFS 检测环',
    functionName: 'canFinish',
    starterCode: `function canFinish(numCourses, prerequisites) {\n  // 在这里写你的代码\n  \n}`,
    testCases: [
      { input: [2, [[1,0]]], expected: true },
      { input: [2, [[1,0],[0,1]]], expected: false },
      { input: [3, [[1,0],[2,1]]], expected: true },
    ],
  },
}
