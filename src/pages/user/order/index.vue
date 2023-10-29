<template>
  <div>
    <Detail class="order" v-if="route.query.id">订单详情</Detail>
    <List class="order-list" v-else>订单列表</List>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Order',
})

import { useRoute } from 'vue-router'

import Detail from "@/pages/user/order/detail/index.vue"
import List from "@/pages/user/order/list/index.vue"

const route = useRoute()
</script>

<style scoped>

</style>