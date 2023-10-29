<template>
  <div>
    <!-- 轮播图 -->
    <Carousel></Carousel>
    <!-- 医院搜索 -->
    <Search></Search>
    <!-- 医院展示 -->
    <el-row gutter="20">
      <el-col :span="18">

        <!-- 医院标签选择 -->
        <Select 
          v-model:level-active="levelActive" 
          v-model:region-active="regionActive" 
        ></Select>
        
        <!-- 医院列表 -->
        <Hospitals :level="levelActive" :region="regionActive"></Hospitals>
        
      </el-col>
      <el-col :span="6">
        <Tips></Tips>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Home',
})

import { ref } from "vue"

// 组件
import Carousel from '@/pages/home/carousel/index.vue'
import Search from '@/pages/home/search/index.vue'
import Select from "@/pages/home/select/index.vue"
import Hospitals from "@/pages/home/hospitals/index.vue"
import Tips from "@/pages/home/tips/index.vue"

// 当前被选中的医院等级
const levelActive = ref("")
// 当前被选中的医院地区
const regionActive = ref("")

// #endregion
</script>

<style lang="scss" scoped>




</style>