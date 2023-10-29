<template>
  <!-- 顶部导航栏 -->
  <div class="top">
    <!-- 导航栏版心 -->
    <div class="content">
      <!-- 导航栏左侧 -->
      <div class="left" @click="goHome">
        <img src="../../assets/images/logo.jpg" alt="">
        <p>京医通 预约挂号统一平台</p>
      </div>
      <!-- 导航栏右侧 -->
      <div class="right">
        <p class="help">帮助中心</p>
        <!-- 没登陆看到的 -->
        <p class="login" @click="login" v-if="!userStore.userInfo.name">登录/注册</p>
        <!-- 登陆了看到的 -->
        <el-dropdown v-else class="dropdown" @command="onDropdownCommand">
          <span class="el-dropdown-link">
            {{ userStore.userInfo.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="/user/certification">实名认证</el-dropdown-item>
              <el-dropdown-item command="/user/order">挂号订单</el-dropdown-item>
              <el-dropdown-item command="/user/patient">就诊人管理</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <Login></Login>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'HospitalTop',
})

import { useRouter } from "vue-router"
import { ArrowDown } from "@element-plus/icons-vue"

import Login from "@/components/login/index.vue"

import useUserStore from "@/store/modules/user"
const userStore = useUserStore()

const router = useRouter()

const goHome = () => {
  router.push({ path: "/home" })
}

// 登录
const login = () => {
  userStore.dialogVisiable = true
}

// 退出登录
const logout = ()=> {
  // 清除用户信息
  userStore.userLogout()
  // 跳转到首页
  router.push({path: "/home"})
}

// 下拉选择框
const onDropdownCommand = (path:string)=> {
  router.push({path})
}
</script>

<style lang="scss" scoped>
.top {
  position: fixed;
  z-index: 999;
  width: 100vw;
  height: 70px;
  background-color: #fff;
  display: flex;
  justify-content: center;

  .content {
    width: 95%;
    max-width: 1200px;
    height: 70px;
    background-color: white;
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }

      p {
        font-size: 20px;
        color: #55a6fe;
      }
    }

    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: gray;

      .help {
        margin-right: 10px;
      }

      .login {
        cursor: pointer;
      }
      .dropdown {
        font-size: 14px;
        color: gray;
      }
    }
  }
}</style>