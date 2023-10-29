<template>
  <el-card class="box-card" shadow="hover" @click="goDetail">
    <div class="content">
      <div class="left">
        <div class="hospital-name">
          {{ info.hosname }}
        </div>
        <div class="tip">
          <div class="level">
            <Good :width="12" fill="#7f7f7f"></Good>
            <span>{{ info.param.hostypeString }}</span>
          </div>
          <div class="time" v-if="info.bookingRule">
            <Clock :width="12" fill="#7f7f7f"></Clock>
            <span>每天{{ info.bookingRule.releaseTime }}放号</span>
          </div>
        </div>
      </div>
      <div class="right">
        <img :src="`data:image/jpeg;base64,${info.logoData}`">
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Card',
})

import { toRefs } from 'vue'
import { useRouter } from 'vue-router'

import Good from '@/svgs/good.vue'
import Clock from '@/svgs/clock.vue'

import { Hospital } from "@/api/type"

const router = useRouter()

const props = defineProps<{
  info: Hospital
}>()

const { info } = toRefs(props)

const goDetail = ()=> {
  console.log(info.value.hoscode)
  router.push({path:"/hospital/register", query:{hoscode:info.value.hoscode}})
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  .left {
    width: calc(100% - 70px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    // flex: 1;
    .hospital-name {
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      white-space: nowrap;
    }

    .tip {
      font-size: 12px;
      color: #7f7f7f;
      display: flex;

      .level,
      .time {
        flex: 1;
        display: flex;
        span {
          margin-left: 5px;
        }
      }
    }
  }

  .right {
    flex: none;

    img {
      width: 60px;
      height: 60px;
    }
  }
}</style>