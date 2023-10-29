<template>
  <div class="user">
    <!-- 左侧导航 -->
    <div class="menu">
      <div class="top">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <span>/ 会员中心</span>
      </div>
      <el-menu :default-active="route.path" class="menu-main">
        <el-menu-item index="/user/certification" @click="changeActive('/user/certification')">
          <el-icon>
            <Postcard />
          </el-icon>
          <span>实名认证</span>
        </el-menu-item>
        <el-menu-item index="/user/order" @click="changeActive('/user/order')">
          <el-icon>
            <Memo />
          </el-icon>
          <span>挂号订单</span>
        </el-menu-item>
        <el-menu-item index="/user/patient" @click="changeActive('/user/patient')">
          <el-icon>
            <User />
          </el-icon>
          <span>就诊人管理</span>
        </el-menu-item>
        <el-menu-item index="/user/profile" @click="changeActive('/user/profile')">
          <el-icon>
            <Document />
          </el-icon>
          <span>账号信息</span>
        </el-menu-item>
        <el-menu-item index="/user/feedback" @click="changeActive('/user/feedback')">
          <el-icon>
            <ChatLineRound />
          </el-icon>
          <span>意见反馈</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 右侧内容展示区 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'User',
})

import { useRouter, useRoute } from "vue-router"
import { Postcard, Memo, User, Document, ChatLineRound, HomeFilled } from '@element-plus/icons-vue'


const router = useRouter()
const route = useRoute()

const changeActive = (path: string) => {
  router.push({ path })
}
</script>

<style lang="scss" scoped>
.user {
  display: flex;

  .menu {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;

    .top {
      width: 100%;
      color: #7f7f7f;
      font-size: 14px;
      margin: 10px 0;
    }

    .menu-main {
      width: 100%;
    }
  }

  .content {
    flex: 8;
    padding: 40px 20px;
  }
}
</style>