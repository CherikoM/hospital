<template>
  <div class="hospital" v-loading="loading">
    <!-- 左侧导航 -->
    <div class="menu">
      <div class="top">
        <el-icon><HomeFilled /></el-icon>
        <span>/ 医院信息</span>
      </div>
      <el-menu 
        :default-active="route.path" 
        class="menu-main"
        >
        <el-menu-item index="/hospital/register" @click="changeActive('/hospital/register')">
          <el-icon><Calendar /></el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item index="/hospital/detail" @click="changeActive('/hospital/detail')">
          <el-icon><Document /></el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item index="/hospital/notice" @click="changeActive('/hospital/notice')">
          <el-icon><Bell /></el-icon>
          <span>预约须知</span>
        </el-menu-item>
        <el-menu-item index="/hospital/close" @click="changeActive('/hospital/close')">
          <el-icon><Warning /></el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item index="/hospital/search" @click="changeActive('/hospital/search')">
          <el-icon><Search /></el-icon>
          <span>查询/取消</span>
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
  name: 'Hospital',
})

import { ref, onMounted } from "vue"
import { useRouter, useRoute } from 'vue-router'
import useHospitalDetailStore from "@/store/modules/hospitalDetail"

import { Calendar, Document, Bell, Warning, Search, HomeFilled } from '@element-plus/icons-vue'

// 路由器
const router = useRouter()
// 当前路由信息
const route = useRoute()
// 仓库对象
let hospitalDetailStore = useHospitalDetailStore()

const loading = ref(true)

// 选项卡切换
const changeActive = (path: string)=> {
  router.push({path, query:{ hoscode: route.query.hoscode }})
}

// 挂载时获取数据，使用pinia仓库获取
onMounted(()=> {
  loading.value = true
  // 获取医院详情数据
  hospitalDetailStore.getHospitalDetail(route.query.hoscode as string)
  // 获取医院科室数据
  hospitalDetailStore.getHospitalDepartment(route.query.hoscode as string)
  loading.value = false
})
</script>

<style lang="scss" scoped>
.hospital {
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