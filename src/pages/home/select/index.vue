<template>
  <div>
    <!-- 医院等级 -->
    <Tag 
      :tags="levels" 
      v-model:active="props.levelActive"
      :name="TagEnum.LEVEL"
      :loading="loadingLevel"
      title="医院"
      @on-select-change="(value)=>handleSelectChange(value,TagEnum.LEVEL)"
      >
    </Tag>
    <!-- 医院地区 -->
    <Tag 
      :tags="regions" 
      v-model:active="props.regionActive" 
      :name="TagEnum.REGION"
      :loading="loadingRegion"
      @on-select-change="(value)=>handleSelectChange(value,TagEnum.REGION)"
      >
    </Tag>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Select',
})

import { ref, onMounted } from "vue"

import Tag from '@/pages/home/select/tag/index.vue'

import { reqHospitalTag } from "@/api/home"

import type { HospitalTagResponseData, HospitalTags } from "@/api/home/type"
import { Tag as TagEnum } from "@/api/home/type"
import { ElMessage } from "element-plus";

const props = defineProps<{
  // 组件v-model
  levelActive: string,
  regionActive: string
}>()

const emit = defineEmits(["update:levelActive", "update:regionActive", "onTagChange"])

onMounted(()=> {
  getLevel()
  getRegion()
})

const loadingLevel = ref(true)
const loadingRegion = ref(true)

// 医院等级
const levels = ref<HospitalTags>([])
// 获取医院等级
const getLevel = async ()=> {
  loadingLevel.value = true
  const result: HospitalTagResponseData = await reqHospitalTag("HosType")
  // 存储医院等级数据
  if(result.code === 200) {
    levels.value = result.data
  } else {
    ElMessage.error(result.message)
  }
  loadingLevel.value = false
}

// 医院地区
const regions = ref<HospitalTags>([])
// 获取医院地区
const getRegion = async ()=> {
  loadingRegion.value = true
  const result: HospitalTagResponseData = await reqHospitalTag("Beijin")
  if(result.code === 200) {
    regions.value = result.data
  } else {
    ElMessage.error(result.message)
  }
  loadingRegion.value = false
}

// 点击其他tag时
const handleSelectChange = (value: string, area: string)=> {
  if(area === TagEnum.LEVEL) {
    emit("update:levelActive", value)
    emit("onTagChange")
  } else if(area === TagEnum.REGION) {
    emit("update:regionActive", value)
    emit("onTagChange")
  }
}
</script>

<style scoped>
</style>