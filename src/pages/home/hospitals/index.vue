<template>
  <div class="hospitals" v-loading="loading">
    <!-- 卡片列表 -->
    <div class="card-list" v-if="hospitalList.length > 0">
      <!-- 卡片 -->
      <Card v-for="(item, index) in hospitalList" :key="index" :info="item">
      </Card>
    </div>
    <el-empty description="暂时没找到数据" v-if="hospitalList.length <= 0" />
    <!-- 分页器 -->
    <el-pagination class="pagination" v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20]"
      layout="prev, pager, next, jumper, ->, total, sizes" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Hospitals',
})

import { ref, toRefs, onMounted, watch } from "vue"

import Card from '@/pages/home/hospitals/card/index.vue'

// API
import { reqHospital } from "@/api/home"

// 类型
import type { Hospitals, HospitalResponseData } from "@/api/home/type.ts"
import { ElMessage } from "element-plus";

const props = defineProps<{
  level: string,
  region: string
}>()
const { level, region } = toRefs(props)

onMounted(() => {
  // 页面首次加载时默认发一次请求
  getHospitalInfo()
})

const loading = ref(true)

/**
 * 医院列表
 */
// #region 
// 页码数
const pageNo = ref(1)
// 单页数据量
const pageSize = ref(10)
// 医院列表
const hospitalList = ref<Hospitals>([])
// 医院总数
const total = ref(0)

// 获取医院列表
const getHospitalInfo = async () => {
  loading.value = true
  // 获取医院数据，默认一页十个
  const result: HospitalResponseData = await reqHospital(pageNo.value, pageSize.value, level.value, region.value)
  console.log(result)
  // 请求成功，存储数据
  if (result.code === 200) {
    hospitalList.value = result.data.content
    total.value = result.data.totalElements
  } else {
    ElMessage.error(result.message)
  }
  loading.value = false
}

// 单页数据量变化时的回调
const handleSizeChange = () => {
  pageNo.value = 1
  getHospitalInfo()
}

// 页码变化时的回调
const handleCurrentChange = () => {
  getHospitalInfo()
}

// 筛选标签发生变化
watch([level, region], () => {
  getHospitalInfo()
})
</script>

<style lang="scss" scoped>
.hospitals {
  margin: 20px 0;

  .card-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }

  .pagination {
    width: 100%;
    margin: 10px 0;
  }
}

@media screen and (max-width: 900px) {
  .hospitals {
    .card-list {
      display: grid;
      grid-template-columns: 1fr;
    }
  }
}
</style>