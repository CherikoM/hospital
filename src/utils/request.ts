// 二次封装axios
// ① 利用axios的请求、响应拦截器功能
// ② 可以在请求头中携带公共参数，例如token
// ③ 简化服务器返回的数据，处理http网络错误
import axios from "axios"
import { ElMessage } from "element-plus"

import useUserStore from "@/store/modules/user"

// 创建axios实例
const request = axios.create({
  // @ts-ignore
  baseURL: import.meta.env.NODE_ENV === "production"? "http://syt.atguigu.cn/api": "/api",   // 基础路径
  timeout: 5000   // 超时时间
})

// 请求拦截器
request.interceptors.request.use((config)=> {

  // config：请求拦截器回调注入的对象（配置对象），不返回就发不出请求
  // 配置对象上有headers属性，可以通过它携带公共参数（例如token）

  const userStore = useUserStore()
  // 请求携带token
  if(userStore.userInfo.token) {
    config.headers.token = userStore.userInfo.token
  }

  return config
})

// 响应拦截器
request.interceptors.response.use(
  // 成功回调
  (response)=> {
    // 简化数据
    return response.data
  }, 
  // 失败回调
  (error)=> {
    // 处理http网络错误
    let status = error.response?.status
    console.log(error, status)
    switch (status) {
      case 401:
        ElMessage.error(error.code + "，请求参数错误")
        break
      case 403:
        ElMessage.error(error.code + "，没有访问权限")
        break
      case 404:
        ElMessage.error(error.code + "，请求路径错误")
        break
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
      case 505:
        ElMessage.error(error.code + "，服务器错误")
        break
      default:
        break
    }
  }
)

export default request