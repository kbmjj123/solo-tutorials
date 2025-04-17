# Next.js Markdown Mermaid 项目

这是一个基于 Next.js 15.3.0 构建的 Markdown 和 Mermaid 图表渲染项目。项目提供了在线访问地址：https://nextjs-project-md-mermaid-52t71l0s9-kbmjj123s-projects.vercel.app/

## 项目特点

- 支持 Markdown 文档渲染
- 支持 Mermaid 图表渲染
- 使用 Next.js 15.3.0 最新版本
- 支持暗黑/亮色主题切换
- 使用 TypeScript 开发
- 采用 Tailwind CSS 进行样式管理

## 技术栈

- **前端框架**: Next.js 15.3.0
- **UI 框架**: React 18.3.1
- **样式处理**: Tailwind CSS 4
- **Markdown 处理**: 
  - remark 15.0.1
  - remark-gfm 4.0.1
  - remark-html 16.0.1
- **图表渲染**: Mermaid 11.6.0
- **主题切换**: next-themes 0.4.6
- **类型检查**: TypeScript 5
- **代码规范**: ESLint 9

## 项目结构

```
nextjs-project-md-mermaid/
├── src/
│   ├── app/          # Next.js 应用路由
│   └── components/   # 可复用组件
├── public/           # 静态资源
├── .env.local        # 环境变量
└── package.json      # 项目依赖配置
```

## 开发环境设置

1. 克隆项目
```bash
git clone [项目地址]
```

2. 安装依赖
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

3. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

4. 访问开发环境
打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 构建和部署

1. 构建生产版本
```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

2. 启动生产服务器
```bash
npm run start
# 或
yarn start
# 或
pnpm start
```

## 部署说明

项目已部署在 Vercel 平台，支持自动部署。每次推送到主分支时，Vercel 会自动构建和部署最新版本。

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

[MIT](LICENSE)
