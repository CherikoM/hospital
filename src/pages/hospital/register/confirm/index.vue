<template>
  <div class="container">
    <div class="tip">确定挂号信息</div>
    <!-- 展示就诊人信息 -->
    <el-card class="client-card" v-loading="loadingClient">
      <template #header>
        <div class="card-header">
          <span>请选择就诊人</span>
          <el-button v-if="scene" type="primary" :icon="User" text @click="scene=false">添加就诊人</el-button>
          <el-button v-else type="primary" :icon="User" text @click="scene = true">取消操作</el-button>
        </div>
      </template>
      <ClientList :clients="clients" v-model:scene="scene" v-model:index="currentClients" @submit="fetchUserClientsData"></ClientList>
    </el-card>
    <!-- 展示医生信息 -->
    <el-card class="doctor-card" v-show="scene" v-loading="loadingDoc">
      <template #header>
        <div class="card-header">
          <span>挂号信息</span>
        </div>
      </template>
      <el-descriptions class="margin-top" :column="2" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              就诊日期：
            </div>
          </template>
          {{ doctor.workDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              就诊医院：
            </div>
          </template>
          {{ doctor.param?.hosname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              就诊科室：
            </div>
          </template>
          {{ doctor.param?.depname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              医生姓名：
            </div>
          </template>
          {{ doctor.docname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              医生职称：
            </div>
          </template>
          {{ doctor.title }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              医生专长：
            </div>
          </template>
          {{ doctor.skill }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              挂号费用：
            </div>
          </template>
          <span style="color:red;">{{ doctor.amount }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- 确认挂号 -->
    <div class="confirm" v-show="scene">
      <el-button 
        class="btn" 
        type="primary" 
        size="default" 
        :disabled="currentClients==-1"
        @click="submitOrder">确认挂号</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Confirm',
})

import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

import { User } from "@element-plus/icons-vue"
import { reqHospitalDoctor } from "@/api/hospital"
import { reqUserClient } from "@/api/user"
import { reqSubmitOrder } from "@/api/order"
import type { UserClients, UserClientsResponseData } from "@/api/user/type"
import type { SubmitOrderResponseData } from "@/api/order/type"
import { HospitalDoctorResponseData, HospitalRegDoctor } from "@/api/hospital/type"
import { ElMessage } from "element-plus"

const route = useRoute()
const router = useRouter()

const loadingClient = ref(true)
const loadingDoc = ref(true)

onMounted(()=> {
  fetchUserClientsData()
  fetchDoctorData()
})

// 就诊人信息
const clients = ref<UserClients>([])
// 当前选中的就诊人
const currentClients = ref(-1)
// 医生信息
const doctor = ref<HospitalRegDoctor>({} as HospitalRegDoctor)
// 就诊人展示
const scene = ref(true)

// 获取就诊人列表
const fetchUserClientsData = async ()=> {
  loadingClient.value = true
  const result: UserClientsResponseData = await reqUserClient()
  if(result.code===200) {
    clients.value = result.data
  } else {
    ElMessage.error(result.message)
  }
  loadingClient.value = false
}

// 获取当前医生
const fetchDoctorData = async()=> {
  loadingDoc.value = true
  const result: HospitalDoctorResponseData = await reqHospitalDoctor(
    route.query.docId as string
  )
  if(result.code === 200) {
    doctor.value = result.data
  } else {
    ElMessage.error(result.message)
  }
  loadingDoc.value = false
}

// 提交订单，发送请求
const submitOrder = async ()=> {
  const result: SubmitOrderResponseData = await reqSubmitOrder(
    doctor.value.hoscode, 
    doctor.value.id, 
    clients.value[currentClients.value].id as number
  )
  if(result.code===200) {
    router.push({path:"/user/order", query: {id: result.data}})
  } else {
    ElMessage.error(result.message)
  }
}
</script>

<style lang="scss" scoped>
.container {
  .tip {
    color: #444;
    font-size: 24px;
    margin-bottom: 30px;
  }

  .client-card {
    margin-bottom: 30px;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .confirm {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    .btn {
      width: 200px;
      letter-spacing: 1px;
    }
  }
}
</style>