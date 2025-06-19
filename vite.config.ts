/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from 'fs';
import path from 'path';

function getImages() {
  const imagesDir = path.resolve(__dirname, 'public/assets/img');
  const files = fs.readdirSync(imagesDir);
  
  return files
    .filter(file => /\.(png|jpe?g|gif|svg)$/.test(file))
    .map(file => `/assets/img/${file}`); // 注意这里的路径
}

// 生成图片路径数组
const imagesPaths = getImages();

// 将图片路径转换为全局变量
const imagesImports = imagesPaths.reduce((acc, path) => {
  const fileName = path.split('/').pop(); // 获取文件名
  acc[fileName] = path; // 将文件名作为键，路径作为值
  return acc;
}, {});

function getPlugins() {
  const plugins = [react(), tsconfigPaths()];
  return plugins;
}

export default defineConfig({
  plugins: [
    react(), // 添加 React 插件
    ...getPlugins(), // 使用扩展运算符将 getPlugins() 返回的插件数组展开
  ],
  define: {
  // 将图片路径数组注入到全局变量中
    __IMAGES__: JSON.stringify(imagesPaths),
  },
});