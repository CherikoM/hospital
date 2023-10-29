<template>
  <el-config-provider :locale="locale">
    <div class="container">
      <!-- 顶部全局组件 -->
      <HospitalTop></HospitalTop>
      <!-- 展示路由组件 -->
      <div class="content">
        <router-view></router-view>
      </div>
      <HospitalBottom></HospitalBottom>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const locale = zhCn
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    width: 95%;
    max-width: 1200px;
    min-height: calc(100vh - 120px);
    margin-top: 70px;
  }
}
</style>
