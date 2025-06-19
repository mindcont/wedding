/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from 'fs';
import path from 'path';

// 动态获取图片路径
function getImages() {
  const imagesDir = path.resolve(__dirname, 'src/assets/img');
  const files = fs.readdirSync(imagesDir);
  
  // 过滤出图片文件，并生成导入路径
  return files
    .filter(file => /\.(png|jpe?g|gif|svg)$/.test(file)) // 根据需要添加其他扩展名
    .map(file => {
      const imagePath = path.join(imagesDir, file);
      return `import ${file.replace(/\.[^/.]+$/, "")} from '${imagePath}';`;
    })
    .join('\n');
}

// 生成图片导入语句
const imagesImports = getImages();

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
    // 将导入的图片路径注入到全局变量中
    __IMAGES__: imagesImports,
  },
});