# 婚礼专属网站

项目编号: 7516003813338284068

本项目是由 [网站开发专家](https://space.coze.cn/) 创建.

[**项目地址**](https://space.coze.cn/task/7516003813338284068)

## 本地开发

### 环境准备

- 安装 [Node.js](https://nodejs.org/en)
- 安装 [pnpm](https://pnpm.io/installation)

### 操作步骤

- 安装依赖

```sh
pnpm install
```

- 启动 Dev Server

```sh
pnpm run dev
```

- 在浏览器访问 http://localhost:3000

## 🚀 部署

### 1. Set runtime environment

[Create a supabase project](https://supabase.io/docs/guides/with-nextjs) and add `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` /`VITE_AMAP_KEY` environment variables to the next.js project.

### 2. Edit Contents

- Update `public/assets/data/wedding.ts` with your information.
- Add your contents image to `public/img`

### 3. Publish with Vercel

Deploy your wedding log using [Vercel](https://vercel.com/):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/mindcont/wedding)
