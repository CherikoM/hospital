import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import path from 'path'

// element+
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV==="production"?"./":"",
  plugins: [
    vue(),
    // element+
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
      ],
    }),
    DefineOptions()
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  },

  // 开发运行服务器
  server: {
    host: 'localhost',
    port: 11451,
    open: true,
    // 开发环境跨域
    proxy: {
      "/api": {
        target: "https://syt.atguigu.cn/",
        changeOrigin: true,
      }
    }
  }
})
