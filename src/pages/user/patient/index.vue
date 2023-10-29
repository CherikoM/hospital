<template>
  <div>
    <el-card class="card">
      <!-- 标题 -->
      <template #header>
        <div class="card-header">
          <div class="title">就诊人管理</div>
          <el-button v-if="scene" type="primary" :icon="User" text @click="scene = false">添加就诊人</el-button>
          <el-button v-else type="primary" :icon="User" text @click="scene = true">取消操作</el-button>
        </div>
      </template>
      <!-- 就诊人列表 -->
      <ClientList 
        :clients="clients" 
        v-model:scene="scene" 
        @submit="getUserClient" 
        :canDelete="true"
        @userDelete="getUserClient" v-loading="loading"></ClientList>
      <!-- <div class="client-list" v-if="scene">
        <Client v-for="client in clients" :key="client.id" :client="client" :canDelete="true" @edit="onClientEdit">
        </Client>
      </div> -->
      <!-- <div v-else>
        <el-divider content-position="left">就诊人信息</el-divider>
        <el-form class="form" label-width="100px">
          <el-form-item label="就诊人姓名">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select placeholder="请选择证件类型" style="width:100%;" v-model="form.certificatesType">
              <el-option 
                v-for="certation in certations" 
                :key="certation.id" 
                :label="certation.name"
                :value="certation.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input placeholder="请输入证件号" v-model="form.certificatesNo"></el-input>
          </el-form-item>
          <el-form-item label="就诊人性别">
            <el-radio-group v-model="form.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker 
              v-model="form.birthdate" 
              type="date" 
              placeholder="请选择日期"
              value-format="YYYY-MM-DD"
              />
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
        </el-form>
        <el-divider content-position="left">建档信息（完善后部分医院首次就诊不排队建档）</el-divider>
        <el-form class="form" label-width="100px">
          <el-form-item label="婚姻状况">
            <el-radio-group v-model="form.isMarry">
              <el-radio :label="1">已婚</el-radio>
              <el-radio :label="0">未婚</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="自费/医保">
            <el-radio-group v-model="form.isInsure">
              <el-radio :label="1">自费</el-radio>
              <el-radio :label="0">医保</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="当前住址">
            <el-cascader v-model="form.addressSelected" :props="props"></el-cascader>
          </el-form-item>
          <el-form-item label="详细住址">
            <el-input v-model="form.address" placeholder="请输入详细地址"></el-input>
          </el-form-item>
        </el-form>
        <el-divider content-position="left">联系人信息（选填）</el-divider>
        <el-form class="form" label-width="100px">
          <el-form-item label="用户姓名">
            <el-input v-model="form.contactsName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select v-model="form.contactsCertificatesType" placeholder="请选择证件类型" style="width:100%;">
              <el-option 
                v-for="certation in certations" 
                :key="certation.id" 
                :label="certation.name"
                :value="certation.value"
                ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input v-model="form.contactsCertificatesNo" placeholder="请输入证件号"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="form.contactsPhone" placeholder="请输入手机号"></el-input>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div class="btn">
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="reset">重写</el-button>
        </div>
      </div> -->
    </el-card>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Patient',
})

import { ref, onMounted } from "vue"
import { User } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus"

import { reqUserClient } from "@/api/user"
import { UserClients } from "@/api/user/type"

const loading = ref(true)

onMounted(() => {
  getUserClient()
})
// 就诊人
const clients = ref<UserClients>([])

// scene：展示场景，如果是true展示就诊人，如果是false修改就诊人
const scene = ref(true)

// 获取就诊人
const getUserClient = async () => {
  loading.value = true
  const result = await reqUserClient()
  if (result.code === 200) {
    clients.value = result.data
  } else {
    ElMessage.error(result.message)
  }
  loading.value = false
}
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>