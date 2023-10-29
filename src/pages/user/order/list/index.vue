<template>
  <div>
    <el-card class="card">
      <!-- 标题 -->
      <template #header>
        <div class="title">挂号订单</div>
      </template>
      <!-- 筛选菜单 -->
      <el-form :inline="true">
        <el-form-item label="就诊人">
          <el-select 
            placeholder="请选择就诊人" 
            v-model="patientId"
            @change="getOrders">
            <el-option label="所有就诊人" value=""></el-option>
            <el-option 
              v-for="client in userClients" 
              :key="client.id"
              :label="client.name"
              :value="client.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select 
            placeholder="请选择订单状态"
            v-model="orderStatus"
            @change="getOrders"
            >
            <el-option label="所有状态" value=""></el-option>
            <el-option 
              v-for="(status, index) in orderStatuses"
              :key="index"
              :label="status.comment"
              :value="status.status"
              ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 表格体 -->
      <el-table style="margin: 10px 0;" :data="orderList"  v-loading="loading">
        <el-table-column label="就诊时间" prop="reserveDate"></el-table-column>
        <el-table-column label="医院" prop="hosname"></el-table-column>
        <el-table-column label="科室" prop="depname"></el-table-column>
        <el-table-column label="医生" prop="title"></el-table-column>
        <el-table-column label="服务费" prop="amount"></el-table-column>
        <el-table-column label="就诊人" prop="patientName"></el-table-column>
        <el-table-column label="订单状态" prop="param.orderStatusString"></el-table-column>
        <el-table-column label="操作">
          <template #="{row}">
            <div>
              <el-button type="text" @click="goDetail(row)">详情</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="getOrders"
        @current-change="getOrders"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'List',
})

import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { ElMessage } from "element-plus"

import { reqUserClient } from "@/api/user"
import { UserClients } from "@/api/user/type"
import { reqAllOrder, reqOrderStatus } from "@/api/order"
import { UserOrder, UserOrders, OrderStatuses } from "@/api/order/type"

const router = useRouter()

onMounted(()=> {
  getOrders()
  getTags()
})

const loading = ref(true)

// 当前页码
const pageNo = ref(1)
// 单页大小
const pageSize = ref(10)
// 就诊人id
const patientId = ref("")
// 订单状态
const orderStatus = ref("")
// 展示的订单列表
const orderList = ref<UserOrders>([])
// 订单总个数
const total = ref(0)
// 所有就诊人
const userClients = ref<UserClients>([])
// 所有订单状态
const orderStatuses = ref<OrderStatuses>([])

// 请求订单列表
const getOrders = async ()=> {
  loading.value = true
  const result = await reqAllOrder(
    pageNo.value,
    pageSize.value,
    patientId.value,
    orderStatus.value
  )
  if(result.code === 200) {
    orderList.value = result.data.records
    total.value = result.data.total
  } else {
    ElMessage.error(result.message)
  }
  loading.value = false
}

// 请求筛选标签
const getTags = async()=> {
  const uc = await reqUserClient()
  const os = await reqOrderStatus()
  if(uc.code === 200 && os.code === 200) {
    userClients.value = uc.data
    orderStatuses.value = os.data
  } else {
    if(uc.code !== 200) ElMessage.error(uc.message)
    if(os.code !== 200) ElMessage.error(os.message)
  }
}

// 跳转到订单详情
const goDetail = (row: UserOrder)=> {
  console.log(row)
  router.push({path:"/user/order",query:{id:row.id}})
}
</script>

<style scoped>

</style>