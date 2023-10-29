<template>
  <div v-loading="loading">
    <div v-if="scene" class="client-list">
      <Client @click="changeIndex(i)" v-for="(client, i) in clients" :key="client.id" :client="client"
        :canDelete="canDelete" @edit="onClientEdit(i)" @delete="emit('userDelete')" :choose="index === i">
      </Client>
    </div>
    <div v-else>
      <el-form ref="formEl" :model="form" :rules="rules" class="form" label-width="100px">
        <el-divider content-position="left" style="width: 100%;">就诊人信息</el-divider>
        <el-form-item prop="name" label="就诊人姓名">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item prop="certificatesType" label="证件类型">
          <el-select placeholder="请选择证件类型" style="width:100%;" v-model="form.certificatesType">
            <el-option v-for="certation in certations" :key="certation.id" :label="certation.name"
              :value="certation.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="certificatesNo" label="证件号码">
          <el-input placeholder="请输入证件号" v-model="form.certificatesNo"></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="就诊人性别">
          <el-radio-group v-model="form.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="birthdate" label="出生日期">
          <el-date-picker v-model="form.birthdate" type="date" placeholder="请选择日期" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item prop="phone" label="手机号码">
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-divider content-position="left">建档信息（完善后部分医院首次就诊不排队建档）</el-divider>
        <el-form-item prop="isMarry" label="婚姻状况">
          <el-radio-group v-model="form.isMarry">
            <el-radio :label="1">已婚</el-radio>
            <el-radio :label="0">未婚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="isInsure" label="自费/医保">
          <el-radio-group v-model="form.isInsure">
            <el-radio :label="1">自费</el-radio>
            <el-radio :label="0">医保</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="addressSelected" label="当前住址">
          <el-cascader v-model="form.addressSelected" :props="tags"></el-cascader>
        </el-form-item>
        <el-form-item prop="address" label="详细住址">
          <el-input v-model="form.address" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-divider content-position="left">联系人信息（选填）</el-divider>
        <el-form-item prop="contactsName" label="用户姓名">
          <el-input v-model="form.contactsName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item prop="contactsCertificatesType" label="证件类型">
          <el-select v-model="form.contactsCertificatesType" placeholder="请选择证件类型" style="width:100%;">
            <el-option v-for="certation in certations" :key="certation.id" :label="certation.name"
              :value="certation.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="contactsCertificatesNo" label="证件号码">
          <el-input v-model="form.contactsCertificatesNo" placeholder="请输入证件号"></el-input>
        </el-form-item>
        <el-form-item prop="contactsPhone" label="手机号码">
          <el-input v-model="form.contactsPhone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <div class="btn">
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button v-if="!(form.id && form.id !== '')" @click="reset">重写</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ClientList',
})

import { ref, reactive, onMounted, watch } from "vue"
import { CascaderProps, ElMessage, FormInstance, FormRules } from "element-plus"

import { reqHospitalTag } from "@/api/home"
import { HospitalTags } from "@/api/home/type"
import { reqAddress, reqChangeUserClient } from "@/api/user"
import { UserClients, UserClientForm } from "@/api/user/type"

import { certificatesTypeValidator, certificatesNoValidator } from "@/utils/certificates"

// scene：展示场景，如果是true展示就诊人，如果是false修改就诊人
const props = defineProps<{
  clients: UserClients,
  index?: number,
  selectable?: boolean,
  scene: boolean,
  canDelete?: boolean
}>()

// 双向绑定scene
const emit = defineEmits(["update:scene", "update:index", "submit", "userDelete"])

const loading = ref(false)

// 组件挂载时，获取证件类型标签
onMounted(() => {
  getCertationType()
})

// 改变当前选中的就诊人
const changeIndex = (index: number) => {
  emit("update:index", index)
}

// 证件类型
const certations = ref<HospitalTags>([])

// 就诊人表单
const form = reactive<UserClientForm>({
  id: "",
  name: "",
  certificatesType: "",
  certificatesNo: "",
  sex: 0,
  birthdate: "",
  phone: "",
  isMarry: 0,
  isInsure: 0,
  addressSelected: [],
  address: "",
  contactsName: "",
  contactsCertificatesType: "",
  contactsCertificatesNo: "",
  contactsPhone: ""
})

// 所有表单元素
const formEl = ref<FormInstance>()

// 监听sence展示情况
watch(() => props["scene"], async (newValue) => {
  if (newValue) {
    reset()
  }
})

// 点击修改按钮，对某一就诊人进行修改
const onClientEdit = async (index: number) => {
  const client = props.clients[index]
  console.log(client)
  Object.assign(form, {
    id: client.id,
    name: client.name,
    certificatesType: client.certificatesType,
    certificatesNo: client.certificatesNo,
    sex: client.sex,
    birthdate: client.birthdate,
    phone: client.phone,
    isMarry: client.isMarry,
    isInsure: client.isInsure,
    addressSelected: [
      client.provinceCode,
      client.cityCode,
      client.districtCode
    ],
    address: client.address,
    contactsName: client.contactsName,
    contactsCertificatesType: client.contactsCertificatesType,
    contactsCertificatesNo: client.contactsCertificatesNo,
    contactsPhone: client.contactsPhone
  })
  emit("update:scene", false)
  // reset()
}

// 获取证件类型
const getCertationType = async () => {
  const result = await reqHospitalTag("CertificatesType")
  if (result.code === 200) {
    certations.value = result.data
  } else {
    ElMessage.error(result.message)
  }
}

// 级联选择器获取数据
const tags: CascaderProps = {
  lazy: true,     // 懒加载
  // 加载级联选择器的数据
  async lazyLoad(node, resolve) {
    const result = await reqAddress((node?.data?.id as string) || "86")
    if (result.code === 200) {
      // 整理数据
      const showData = result.data.map((data) => {
        return {
          id: data.id,
          label: data.name,
          value: data.value,
          leaf: !data.hasChildren
        }
      })
      // 给组件注入需要展示的数据
      resolve(showData)
    } else {
      ElMessage.error(result.message)
    }

  }
}

// 提交表单
const submit = async () => {
  if (!formEl) return
  await formEl?.value?.validate(async (valid) => {
    if (valid) {
      console.log('submit!')
      // 要么新增就诊人，要么修改已有的就诊人
      const result = await reqChangeUserClient(form)
      if (result.code === 200) {
        ElMessage.success(form.id ? "更新成功" : "添加成功")
        emit("update:scene", true)
        emit("submit")
      } else {
        ElMessage.error(result.message)
      }
    } else {
      ElMessage.error("请检查填写")
    }
  })

}

// 清空表单数据，只有情况为添加时才能清空
const reset = () => {
  Object.assign(form, {
    id: "",
    name: "",
    certificatesType: "",
    certificatesNo: "",
    sex: 0,
    birthdate: "",
    phone: "",
    isMarry: 0,
    isInsure: 0,
    addressSelected: [],
    address: "",
    contactsName: "",
    contactsCertificatesType: "",
    contactsCertificatesNo: "",
    contactsPhone: ""
  })
}

// 表单校验---------------------
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入姓名', trigger: 'change' },
    {
      pattern: /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/,
      message: "请输入中文姓名", trigger: "change"
    }
  ],
  certificatesType: [
    {
      required: true, trigger: "change",
      validator: certificatesTypeValidator()
    },
  ],
  certificatesNo: [
    {
      required: true, trigger: "change",
      validator: certificatesNoValidator(form, "certificatesType")
    }
  ],
  sex: [
    { required: true, message: "请选择性别", trigger: "change" }
  ],
  birthdate: [
    { required: true, message: "请选择生日", trigger: "change" }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'change' },
    {
      pattern: /^1[34578]\d{9}$/,
      message: "请输入正确的手机号", trigger: "change"
    },
  ],
  isMarry: [
    { required: true, message: "请选择婚姻状况", trigger: "change" }
  ],
  isInsure: [
    { required: true, message: "请选择自费/医保", trigger: "change" }
  ],
  addressSelected: [
    { required: true, message: "请选择住址", trigger: "change" }
  ],
  address: [
    { required: true, message: "请输入详细住址", trigger: "change" },
  ],
  contactsName: [
    {
      pattern: /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/,
      required: false, message: "请输入中文姓名", trigger: "change"
    }
  ],
  contactsCertificatesType: [
    { required: false, validator: certificatesTypeValidator(false) },
  ],
  contactsCertificatesNo: [
    { required: false, validator: certificatesNoValidator(form, "contactsCertificatesType", false) }
  ],
  contactsPhone: [
    {
      required: false, pattern: /^1[34578]\d{9}$/,
      message: "请输入正确的手机号", trigger: "change"
    }
  ]
})


</script>

<style lang="scss" scoped>
.client-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}

.form {
  width: 90%;
  margin: 0 auto;

  :deep(.el-form-item) {
    width: 65%;
    margin: 15px auto;
  }
}

.btn {
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 1280px) {
  .client-list {
    grid-template-columns: 1fr 1fr !important;
  }
}

@media screen and (max-width: 800px) {
  .client-list {
    grid-template-columns: 1fr !important;
  }
}
</style>