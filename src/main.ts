import { createApp } from 'vue'
import '@/styles/reset.scss'
import App from './App.vue'

// vue-router
import router from "@/router"
import "@/router/permission"

// pinia
import pinia from "@/store"

// element+
import "element-plus/theme-chalk/el-message.css"

// 全局组件
import HospitalTop from "@/components/HospitalTop/index.vue"
import HospitalBottom from "@/components/HospitalBottom/index.vue"
import Login from "@/components/login/index.vue"
import ClientList from "@/components/clientList/index.vue"

const app = createApp(App)

// 挂载全局组件
app.component('HospitalTop', HospitalTop)
app.component('HospitalBottom', HospitalBottom)
app.component('Login', Login)
app.component('ClientList', ClientList)

app.use(router)
app.use(pinia)

app.mount('#app')
// @ts-ignore
console.log(process.env.NODE_ENV)