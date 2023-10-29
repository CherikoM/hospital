<template>
  <div>

  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'WXLogin',
})

import { useRoute } from 'vue-router'
// import 

import { SET_TOKEN } from "@/utils/user"

const route = useRoute()

SET_TOKEN(JSON.stringify(route.query))

// 如果此路由组件的代码被执行，说明已经授权登录成功
let html: HTMLElement = document.querySelector("html") as HTMLElement
html.style.display = "none"
</script>

<style scoped>

</style>