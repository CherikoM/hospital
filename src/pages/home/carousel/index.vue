<template>
  <div>
    <!-- 轮播图 -->
    <el-carousel height="350px" trigger="click">
      <el-carousel-item v-for="item in 4" :key="item">
        <div class="image"></div>
        <!-- <img src="@/assets/images/web-banner-1.png"> -->
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Carousel',
})
</script>

<style lang="scss" scoped>
.image {
  width: 100%;
  height: 350px;
  background-image: url(@/assets/images/web-banner-1.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>