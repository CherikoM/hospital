<template>
  <div class="detail">
    <HospitalInfo
      :hosname="hospitalDetailStore?.hospitalInfo?.hospital?.hosname"
      :hostype="hospitalDetailStore?.hospitalInfo?.hospital?.param.hostypeString"
      :img="hospitalDetailStore?.hospitalInfo?.hospital?.logoData"
      >
      <!-- 医院信息 -->
      <div class="content">
        <div class="icon">
          <el-icon>
            <Aim />
          </el-icon>
        </div>
        <div class="goto">
          <p class="address">
            具体地址：{{ hospitalDetailStore?.hospitalInfo?.hospital?.param?.fullAddress }}
          </p>
          <p class="route">
            规划路线：{{ hospitalDetailStore?.hospitalInfo?.hospital?.route }}
          </p>
        </div>
      </div>
    </HospitalInfo>
    <!-- 医院介绍 -->
    <div class="information">
      <h3>医院介绍</h3>
      <p>{{ hospitalDetailStore?.hospitalInfo?.hospital?.intro }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Detail',
})

import { Aim } from "@element-plus/icons-vue"
import HospitalInfo from "@/pages/hospital/hospitalInfo/index.vue"
import useHospitalDetailStore from "@/store/modules/hospitalDetail"

const hospitalDetailStore = useHospitalDetailStore()
</script>

<style lang="scss" scoped>
.content {
  color: #7f7f7f;
  font-size: 12px;
  display: flex;

  .icon {
    margin-right: 5px;
    margin-top: 3.5px;
  }

  p {
    margin-bottom: 5px;
    line-height: 1.5em;
  }
}
.information {
  margin-top: 30px;
  h3 {
    font-size: 14px;
    margin-bottom: 10px;
  }
  p {
    line-height: 1.5em;
    font-size: 12px;
    color: #7f7f7f;
  }
}
</style>