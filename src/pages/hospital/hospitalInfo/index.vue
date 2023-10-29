<template>
  <div>
    <div class="top">
      <h3 class="title">
        {{ props.hosname }}
      </h3>
      <div class="level">
        <Good :width="14" fill="#7f7f7f"></Good>
        <span>
          {{ props.hostype }}
        </span>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <img :src="`data:image/jpeg;base64,${props.img}`" alt="">
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'HospitalInfo',
})

import Good from "@/svgs/good.vue"
const props = defineProps<{
  hosname: string,
  hostype: string,
  img: string
}>()
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  align-items: end;

  .title {
    font-size: 20px;
  }

  .level {
    font-size: 12px;
    margin-left: 10px;
    color: #7f7f7f;
    display: flex;
    align-items: center;
  }
}

.content {
  margin-top: 20px;
  display: flex;

  .left {
    width: 100px;
    height: 100px;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
}
</style>
