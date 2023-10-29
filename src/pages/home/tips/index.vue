<template>
  <div class="tips">
    <!-- 常见科室 -->
    <div class="deparment">
      <el-skeleton v-if="loading" :rows="4" animated />
      <div v-else class="content">
        <div class="header">
          <div class="left">
            <Deparment class="icon" :width="14" :fill="'red'"></Deparment>
            <span>常见科室</span>
          </div>
          <div class="right">
            <span>全部</span>
            <el-icon size="14" color="#7f7f7f">
              <ArrowRight />
            </el-icon>
          </div>
        </div>
        <div class="content">
          <ul>
            <li>神经内科</li>
            <li>消化内科</li>
            <li>呼吸内科</li>
            <li>内科</li>
            <li>神经外科</li>
            <li>妇科</li>
            <li>产科</li>
            <li>儿科</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 平台公告 -->
    <div class="notice">
      <el-skeleton v-if="loading" :rows="4" animated />
      <div v-else class="content">
        <div class="header">
          <div class="left">
            <LightBall :width="14" fill="blue"></LightBall>
            <span>平台公告</span>
          </div>
          <div class="right">
            <span>全部</span>
            <el-icon size="14" color="#7f7f7f">
              <ArrowRight />
            </el-icon>
          </div>
        </div>
        <div class="list">
          <ul>
            <li>关于延长北京大学国际医院放假的通知</li>
            <li>北京中医药大学东方医院部分科室医生门诊</li>
            <li>武警总医院号源暂停更新通知</li>
          </ul>
        </div>
      </div>

    </div>
    <!-- 停诊公告 -->
    <div class="notice">
      <el-skeleton v-if="loading" :rows="4" animated />
      <div v-else class="content">
        <div class="header">
          <div class="left">
            <el-icon color="orange" :size="14">
              <Bell />
            </el-icon>
            <span>停诊公告</span>
          </div>
          <div class="right">
            <span>全部</span>
            <el-icon size="14" color="#7f7f7f">
              <ArrowRight />
            </el-icon>
          </div>
        </div>
        <div class="list">
          <ul>
            <li>中国人民解放军总医院第六医学中心（原海军总医院）呼吸内科门诊停诊公告</li>
            <li>首都医科大学附属北京潞河医院老年医学科门诊停诊公告</li>
            <li>中日友好医院中西医结合心内科门诊停诊公告</li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Tips',
})

import { ref, onMounted } from "vue"
import { ArrowRight, Bell } from "@element-plus/icons-vue"
import Deparment from "@/svgs/deparment.vue"
import LightBall from "@/svgs/lightBall.vue"

import sleep from "@/utils/sleep"

const loading = ref(true)

onMounted(async () => {
  loading.value = true
  await sleep(500)
  loading.value = false
})
</script>

<style lang="scss" scoped>
.tips {
  color: #7f7f7f;
  font-size: 14px;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 30px;

  .header {
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    .left,
    .right {
      display: flex;

      span {
        margin: 0 3px;
      }
    }
  }

  .content {

    ul {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 5px;
      grid-row-gap: 10px;
    }
  }

  .list {
    ul {
      display: grid;
      grid-template-columns: 1fr;
      grid-row-gap: 10px;

      li {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}

@media screen and (max-width: 620px) {
  .tips {
    .header {
      height: 35px;
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;

      .left,
      .right {
        width: 100%;
      }

      .left {
        justify-content: start;
        white-space: nowrap;
      }

      .right {
        justify-content: end;
      }
    }

    .content {
      ul {
        grid-template-columns: 1fr;
        text-align: center;
      }
    }
  }
}
</style>