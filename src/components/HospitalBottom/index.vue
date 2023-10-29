<template>
  <!-- 底部信息栏 -->
  <div class="bottom">
    <!-- 信息栏版心 -->
    <div class="content">
      <!-- 信息栏左侧 -->
      <div class="left">
        京ICP备 114514号 电话挂号810-1919364
      </div>
      <!-- 信息栏右侧 -->
      <div class="right">
        <span>联系我们</span>
        <span>合作伙伴</span>
        <span>用户协议</span>
        <span>隐私协议</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'HospitalBottom',
})
</script>

<style lang="scss" scoped>
.bottom {
  height: 50px;
  width: 100vw;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  .content {
    width: 95%;
    max-width: 1200px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: gray;
    font-size: 12px;
    .right {
      span {
        margin: 0 5px;
      }
    }
  }
}
</style>