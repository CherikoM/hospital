// 路由鉴权
import router from "@/router"
import pinia from "@/store"
import useUserStore from "@/store/modules/user"

import nprogress from "nprogress"
import "nprogress/nprogress.css"

const userStore = useUserStore(pinia)
nprogress.configure({ showSpinner:false })

// 未登录状态下允许访问的路径
const whiteList = ["/home", "/hospital/register", "/hospital/detail", "/hospital/notice", "/hospital/close", "/hospital/search"]

// 添加全局守卫
// 前置
router.beforeEach((to, from, next)=> {
  nprogress.start()
  const token = userStore.userInfo.token
  if(token && token !== "") {
    next()
  } else {
    if(whiteList.includes(to.path)) {
      next()
    } else {
      userStore.dialogVisiable = true
      if(to.path.indexOf("/user")>=0) {
        next({path:"/home"})
      } else {
        nprogress.done()
      }
    }
  }
})

// 后置
router.afterEach((to, from)=> {
  document.title = `京医通 ${to.meta.title as string}`
  nprogress.done()
})