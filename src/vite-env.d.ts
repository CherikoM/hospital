/// <reference types="vite/client" />

// 声明.vue文件类型
declare module '*.vue' {
  import { ComponentOptions } from "vue"
  const componentOptions: ComponentOptions
  export default componentOptions
}
