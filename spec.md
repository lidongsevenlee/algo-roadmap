# 🧭 1. 产品定义（Product Definition）

## 1.1 产品目标

构建一个：

> **以学习路径为核心、强化交互反馈、支持进度管理的算法学习系统**

---

## 1.2 核心用户

* 前端工程师（主目标）
* 准备面试的开发者
* 需要体系化刷题的人

---

## 1.3 核心价值

* 路径驱动（不是题库驱动）
* 强交互（强化记忆）
* 可追踪（学习闭环）

---

# 🧩 2. 信息架构（IA）

```ts
type App = {
  roadmap: RoadmapGraph
  problemSet: Problem[]
  progress: UserProgress
  knowledge: KnowledgeNode[]
}
```

---

## 2.1 模块划分

### 1️⃣ 路线图（核心）

* 可视化 graph
* 节点可点击
* 路径推荐

### 2️⃣ 题库

* 按节点关联题目
* 难度分类

### 3️⃣ 进度系统

* 打卡
* 完成率
* 学习轨迹

### 4️⃣ 知识卡片

* 每个算法的解释 + 模板

---

# 🗺️ 3. 路线图模型（核心数据结构）

```ts
type NodeType =
  | 'data-structure'
  | 'technique'
  | 'algorithm'
  | 'advanced'

type RoadmapNode = {
  id: string
  title: string
  type: NodeType
  difficulty: 'easy' | 'medium' | 'hard'
  prerequisites: string[]
  problems: string[]
  position: { x: number; y: number }
}

type RoadmapGraph = {
  nodes: RoadmapNode[]
  edges: { from: string; to: string }[]
}
```

---

# ⚙️ 4. 核心交互设计（重点）

## 4.1 路线图交互（Graph Interaction）

### 必须支持

#### ✅ 节点交互

* hover → 高亮路径
* click → 展开详情 panel
* double click → 进入学习页

---

#### ✅ 路径引导（关键差异点）

```ts
function getNextNode(userProgress) {}
```

行为：

* 当前推荐节点高亮（glow）
* 未解锁节点灰化
* 完成节点打勾

---

#### ✅ 拖拽 & 缩放

* zoom（wheel）
* drag canvas
* minimap（可选）

---

## 4.2 学习态交互（Learning Mode）

进入节点后：

### 状态机设计

```ts
type LearningState =
  | 'idle'
  | 'learning'
  | 'practicing'
  | 'completed'
```

---

### 页面结构

* 左：知识讲解
* 右：题目列表
* 底部：进度条

---

### 行为

* 点击“开始学习” → state = learning
* 做题 → state = practicing
* 完成 → state = completed

---

## 4.3 强交互设计（你要重点做的）

这是你产品的“护城河”

---

### 🔥 1️⃣ 模式识别提示（核心）

用户点开题目：

👉 系统提示：

> “这题属于：滑动窗口”

实现：

```ts
type ProblemMeta = {
  pattern: 'sliding-window' | 'dp' | 'dfs'
}
```

---

### 🔥 2️⃣ 解题模板辅助

展示：

```js
// 滑动窗口模板
for (right) {
  while (条件不满足) left++
}
```

---

### 🔥 3️⃣ 动画演示（加分项）

比如：

* 滑动窗口移动动画
* DFS搜索路径动画

👉 技术：

* canvas / svg
* requestAnimationFrame

---

### 🔥 4️⃣ 即时反馈（重要）

* 做题完成 → toast
* 连续完成 → streak
* 错题 → 标记 + 重做

---

# 📊 5. 进度系统设计

```ts
type UserProgress = {
  completedNodes: string[]
  completedProblems: string[]
  streak: number
  lastActiveAt: number
}
```

---

## 可视化

* 节点打勾 ✔
* 进度条 %
* 连续打卡 🔥

---

# 🧠 6. 推荐算法（核心逻辑）

```ts
function recommendNextNode(graph, progress) {
  return graph.nodes.find(
    n =>
      !progress.completedNodes.includes(n.id) &&
      n.prerequisites.every(p =>
        progress.completedNodes.includes(p)
      )
  )
}
```

---

# 🖥️ 7. 前端技术架构（重点）

结合你背景，建议这样设计：

---

## 7.1 技术栈

* React / Next.js
* TypeScript
* Zustand（轻量状态管理）
* React Flow / D3（图结构）
* TailwindCSS

---

## 7.2 状态分层

```ts
// UI状态
uiStore

// 路线图状态
roadmapStore

// 用户状态
userStore
```

---

## 7.3 Graph 渲染

推荐：

### 方案1（快速）

* React Flow

### 方案2（高自由度）

* D3 + 自定义渲染

---

# 📦 8. API 设计（后端 or mock）

```ts
GET /roadmap
GET /problems?nodeId=xxx
POST /progress
GET /progress
```

---

# 🎨 9. UI / 体验关键点

* 深色主题（参考当前页面）
* 节点颜色区分：

  * 绿色：已完成
  * 黄色：进行中
  * 灰色：未解锁
* 动效：

  * hover glow
  * 路径流动动画

---

# 🚀 10. MVP 开发优先级（非常关键）

## 第一阶段（3天能做完）

* 路线图展示（静态）
* 节点点击
* 简单进度记录

---

## 第二阶段（核心）

* 推荐路径
* 题目绑定
* 完成状态

---

## 第三阶段（差异化）

* 模式识别提示
* 动画演示
* streak系统

---

# 🧠 11. 关键设计理念（你必须记住）

这个产品不是：

> ❌ “算法题网站”

而是：

> ✅ **“算法认知训练系统”**

---
