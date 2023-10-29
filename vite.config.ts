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
  base: process.env.NODE_ENV==="production"?"/hospital/":"",
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
      "/8201": {
        target: "http://139.198.34.216:8201",
        changeOrigin: true,
        rewrite: (path)=> path.replace(/^\/8201/, "")
      },
      "/8202": {
        target: "http://139.198.34.216:8202",
        changeOrigin: true,
        rewrite: (path)=> path.replace(/^\/8202/, "")
      },
      "/8203": {
        target: "http://139.198.34.216:8203",
        changeOrigin: true,
        rewrite: (path)=> path.replace(/^\/8203/, "")
      },
      "/8204": {
        target: "http://139.198.34.216:8204",
        changeOrigin: true,
        rewrite: (path)=> path.replace(/^\/8204/, "")
      },
      "/8205": {
        target: "http://139.198.34.216:8205",
        changeOrigin: true,
        rewrite: (path)=> path.replace(/^\/8205/, "")
      },
      "/8206": {
        target: "http://139.198.34.216:8206",
        changeOrigin: true,
        rewrite: (path)=> path.replace(/^\/8206/, "")
      },
    }
  }
})
