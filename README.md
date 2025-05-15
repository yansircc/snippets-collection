# 代码片段收集应用

一个优雅的代码片段管理工具，可以轻松收集、分享和管理你的代码片段。基于 JStack 全栈框架构建，前端部署在 Vercel，后端运行在 Cloudflare Workers。

## 项目特性

- **代码片段管理**：创建、编辑、分类和管理你的代码片段
- **简洁界面**：现代化设计，响应式布局，支持移动设备
- **一键复制**：轻松复制代码片段到剪贴板
- **分类管理**：对代码片段进行分类和排序
- **全栈架构**：
  - 前端：Next.js + React + TypeScript + Tailwind CSS
  - 后端：Cloudflare Workers + TypeScript

## 技术栈

- **前端**：Next.js、React、TypeScript、Tailwind CSS
- **后端**：Cloudflare Workers、TypeScript
- **全栈框架**：JStack（提供全链路类型安全）
- **部署**：Vercel (前端) + Cloudflare (后端)
- **数据库**：Cloudflare D1 (SQLite)

## 快速开始

1. 克隆仓库
   ```bash
   git clone https://github.com/yourusername/snippets-collection.git
   cd snippets-collection
   ```

2. 安装依赖
   ```bash
   bun install
   ```

3. 配置 `wrangler.jsonc`，绑定你自己的 Cloudflare 服务

4. 本地开发
   ```bash
   # 前端开发服务器
   bun dev
   
   # 后端开发服务器
   bun dev:worker
   ```

5. 构建和部署
   ```bash
   # 构建前端
   bun build
   
   # 部署到生产环境
   bun deploy
   ```

## 截图

![代码片段收集应用截图](/path/to/screenshot.png)

## 贡献

欢迎提交 Pull Request 或创建 Issue 来帮助改进这个项目！

## 许可证

MIT