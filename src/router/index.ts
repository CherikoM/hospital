import { createRouter, createWebHistory } from "vue-router"

export default createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/home",
      component: ()=> import("@/pages/home/index.vue"),
      meta: {
        title: "首页"
      }
    },
    {
      path: "/hospital",
      component: ()=> import("@/pages/hospital/index.vue"),
      children: [
        {
          path: "register",
          component: ()=> import("@/pages/hospital/register/index.vue"),
          meta: {
            title: "预约挂号"
          }
        },
        {
          path: "detail",
          component: ()=> import("@/pages/hospital/detail/index.vue"),
          meta: {
            title: "医院详情"
          }
        },
        {
          path: "notice",
          component: ()=> import("@/pages/hospital/notice/index.vue"),
          meta: {
            title: "预约通知"
          }
        },
        {
          path: "close",
          component: ()=> import("@/pages/hospital/close/index.vue"),
          meta: {
            title: "停诊信息"
          }
        },
        {
          path: "search",
          component: ()=> import("@/pages/hospital/search/index.vue"),
          meta: {
            title: "查询/取消"
          }
        },
        {
          path: "registration",
          component: ()=> import("@/pages/hospital/register/registration/index.vue"),
          meta: {
            title: "预约号源"
          }
        },
        {
          path: "confirm",
          component: ()=> import("@/pages/hospital/register/confirm/index.vue"),
          meta: {
            title: "确认订单"
          }
        },
      ]
    },
    {
      path: "/user",
      component: ()=> import("@/pages/user/index.vue"),
      children: [
        {
          path: "certification",
          component: ()=> import("@/pages/user/certification/index.vue"),
          meta: {
            title: "实名认证"
          }
        },
        {
          path: "order",
          component: ()=> import("@/pages/user/order/index.vue"),
          meta: {
            title: "挂号订单"
          }
        },
        {
          path: "patient",
          component: ()=> import("@/pages/user/patient/index.vue"),
          meta: {
            title: "就诊人管理"
          }
        },
        {
          path: "profile",
          component: ()=> import("@/pages/user/profile/index.vue"),
          meta: {
            title: "账号信息"
          }
        },
        {
          path: "feedback",
          component: ()=> import("@/pages/user/feedback/index.vue"),
          meta: {
            title: "意见反馈"
          }
        },
      ]
    },
    {
      path: "/wxlogin",
      component: ()=> import("@/pages/wxlogin/index.vue")
    },
    {
      path: "/",
      redirect: "/home"
    },
  ],

  // 每次路由跳转时页面滚至顶部
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  }
})