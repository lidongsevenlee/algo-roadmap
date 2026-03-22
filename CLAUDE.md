# CLAUDE.md - 算法路线图项目指南

## 项目概述
算法认知训练系统（Algorithm Roadmap），一个前端算法学习平台，包含可视化路线图、知识卡片、题目练习和在线代码编辑器。

- **仓库**: github.com/lidongsevenlee/algo-roadmap
- **部署**: GitHub Pages，自动部署（push main → Actions → Pages）
- **访问路径**: `/algo-roadmap/`

## 技术栈
- **框架**: React 18 + TypeScript + Vite 6
- **图可视化**: @xyflow/react (React Flow)
- **代码编辑器**: CodeMirror 6 (@codemirror/*)
- **状态管理**: Zustand 5 (persist middleware → localStorage)
- **样式**: TailwindCSS 3 (`darkMode: 'class'`)
- **路径别名**: `@` → `./src`

## 关键架构决策

### 主题切换
- `darkMode: 'class'` 模式，通过 `<html>` 元素的 class 控制
- `main.tsx` 在 React 渲染前读取 localStorage 设置 class，避免闪烁
- `index.css` 中用 `.dark body {}` 常规 CSS（不用 `@apply dark:`，因为后者编译时确定）
- 组件中用 `useUIStore(s => s.theme)` 获取主题（不要用 `document.classList` 判断，在 memo 组件中不响应式）

### 状态持久化
- UI 状态（主题）: localStorage key `algo-roadmap-ui`，只持久化 theme 字段
- 用户进度: localStorage key `algo-roadmap-progress`，持久化 completedNodes/completedProblems/streak/lastActiveAt
- 代码编辑器: localStorage key `algo-code-{problem.id}`，每道题独立保存

### 代码执行（沙箱）
- 使用 `new Function()` 执行用户代码
- `testRunner.ts` 支持 5 种数据结构模式:
  - 默认（纯函数）
  - `linked-list`（数组 ↔ ListNode 转换）
  - `linked-list-cycle`（构造环形链表）
  - `binary-tree`（数组 ↔ TreeNode 转换，含 LCA 变体）
  - `class-ops`（类实例化 + 方法调用序列）

### React Flow
- 自定义节点组件 `RoadmapNodeComponent`（memo + zustand 主题）
- Controls 锁定按钮通过 `onInteractiveChange` + state 控制 `nodesDraggable/panOnDrag/zoomOnScroll`
- 边颜色根据深色/浅色主题分别定义

## 重要文件

| 文件 | 作用 |
|------|------|
| `src/data/problems.ts` | 35 道题目数据（描述、模板、测试用例、starter代码） |
| `src/data/roadmap.ts` | 13 个路线图节点（知识卡片、位置、依赖关系） |
| `src/utils/testRunner.ts` | 代码沙箱执行引擎 |
| `src/utils/recommend.ts` | 推荐算法（找前置已完成的第一个可用节点） |
| `src/store/uiStore.ts` | UI 状态（主题、面板、弹窗） |
| `src/store/userStore.ts` | 用户进度（完成记录、连续天数） |
| `src/components/CodeEditor.tsx` | CodeMirror 编辑器（暗/亮主题、运行、重置） |
| `src/components/ProblemModal.tsx` | 题目弹窗（左描述 + 右编辑器） |
| `src/components/LearningPanel.tsx` | 知识面板（左知识卡 + 右题目列表） |

## 开发注意事项

### npm 安装
- 公司网络可能无法访问默认 npm registry
- 使用 `--registry https://registry.npmmirror.com` 安装依赖

### Tailwind 配置变更
- 修改 `tailwind.config.js` 后需要重启 Vite 开发服务器（HMR 不会自动应用）

### 测试用例验证
- 所有 35 道题 × 2-3 测试用例 = 110 个用例已通过验证
- 新增题目时确保 template 代码能通过所有 testCases
- 可用 `node verify-templates.mjs` 批量验证（脚本需要时可重新生成）

### 部署
- `vite.config.ts` 中 `base: '/algo-roadmap/'` 必须与 GitHub 仓库名一致
- 推送到 main 分支自动触发 `.github/workflows/deploy.yml`

## 用户语言偏好
- 用户使用中文沟通
- UI 界面中文为主，标题英文辅助
