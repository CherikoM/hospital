<template>
  <div class="search">
    <el-autocomplete 
      clearable 
      class="form"
      placeholder="请输入医院名称"
      v-model="keyword"
      :fetch-suggestions="fetchSuggestionData"
      :trigger-on-focus="false"
      @select="goDetail"
      />
    <el-button type="primary" :icon="Search"></el-button>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Search',
})

import { ref } from "vue"
import { useRouter } from "vue-router"

// @ts-ignore
import { Search } from "@element-plus/icons-vue/dist/index"

import { reqHospitalSearch } from "@/api/home"
import type { HospitalSearchResponseData } from "@/api/home/type"

// 创建路由器对象
const router = useRouter()

// 搜索关键字
const keyword = ref("")

// 搜索框获取搜索结果
const fetchSuggestionData = async (keyword: string, cb: Function)=> {
  // 用户输入关键字时，发请求获取需要展示的数据
  const result: HospitalSearchResponseData = await reqHospitalSearch(keyword)
  // 整理数据
  const showData = result.data.map((item)=> ({
    value: item.hosname,
    hoscode: item.hoscode
  }) )
  // 进行数据展示
  cb(showData)
}

// 搜索框点击搜索结果去往详情
const goDetail = (item:{hoscode:string,value:string})=> {
  router.push({path:"/hospital/register", query:{hoscode:item.hoscode}})
}
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  :deep(.form) {
    width: 400px;
    margin-right: 10px;
  }
}

</style>