import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { visualizer } from 'rollup-plugin-visualizer'
export default defineConfig({
  plugins: [react(), visualizer(/* { open: true } */)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  publicDir: "static",
  build: {
    lib: {
      formats: ['es'],
      entry: {
        component: path.resolve(__dirname, "src", "components")
      },
    },
    outDir: 'lib',
    minify: false,
    rollupOptions: {
      external: ['react'],
      output: {
        manualChunks(id) {
          console.log(id)
          if (id.includes("node_modules")) {
            // 让每个插件都打包成独立的文件
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
          if (id.includes("Cascader")) {
            return "Cascader"
          }
          if (id.includes("Select")) {
            return "Select"
          }
        },
        chunkFileNames: '[name].js', // 引入文件名的名称
        entryFileNames: 'index.js', // 包的入口文件名称
        assetFileNames: '[ext]/[name].[ext]', // 资源文件像 字体，图片等
      }
    }
  },
});
