<template>
  <div>
    <h3>{{ hospitalDetailStore?.hospitalInfo?.hospital?.hosname }}查询</h3>
    <el-empty description="暂无信息"></el-empty>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Search',
})

import useHospitalDetailStore from "@/store/modules/hospitalDetail"

const hospitalDetailStore = useHospitalDetailStore()
</script>

<style lang="scss" scoped>
h3 {
  text-align: center;
  font-size: 24px;
}
</style>