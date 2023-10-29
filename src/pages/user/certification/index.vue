<template>
  <div v-loading="loading">
    <el-card class="box-card">
      <!-- 卡片头部 -->
      <template #header>
        <div class="card-header">
          实名信息
        </div>
      </template>
      <div class="content">
        <p><el-icon>
            <InfoFilled />
          </el-icon><span>完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。</span></p>
        <!-- 用户已实名认证，展示实名信息 -->
        <el-descriptions v-if="userRealName.authStatus===1" class="table margin-top" :column="1" size="small" border>
          <el-descriptions-item width="20" label-align="center">
            <template #label>
              <div class="cell-item">
                用户姓名
              </div>
            </template>
            {{ userRealName.name }}
          </el-descriptions-item>
          <el-descriptions-item label-align="center">
            <template #label>
              <div class="cell-item">
                证件类型
              </div>
            </template>
            {{ userRealName.certificatesType==="10"? "身份证": "户口本" }}
          </el-descriptions-item>
          <el-descriptions-item label-align="center">
            <template #label>
              <div class="cell-item">
                证件号码
              </div>
            </template>
            {{ userRealName.certificatesNo }}
          </el-descriptions-item>
        </el-descriptions>
        <!-- 用户未实名认证，展示实名表单 -->
        <el-form 
          v-if="userRealName.authStatus===0" 
          class="form" 
          style="width: 60%; margin: 0 auto;" 
          label-width="80px"
          :model="form"
          :rules="rules"
          ref="formEl"
          >
          <el-form-item label="用户姓名" prop="name">
            <el-input placeholder="请输入用户姓名" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="证件类型" prop="certificatesType">
            <el-select 
              style="width: 100%;" 
              placeholder="请选择证件类型"
              v-model="form.certificatesType"
              >
              <el-option 
                :label="item.name"
                :value="item.value"
                v-for="(item,index) in tags"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="certificatesNo">
            <el-input placeholder="请输入证件号码" v-model="form.certificatesNo"></el-input>
          </el-form-item>
          <el-form-item label="上传证件" prop="certificatesUrl">
            <el-upload 
              ref="uploader"
              list-type="picture-card"
              action="/8205/api/oss/file/fileUpload?fileHost=userAuah"
              :limit="1"
              accept=".jpg, .png"
              :on-exceed="handlePicExceed"
              :on-success="handleUploadSuccess"
              :on-preview="handlePicPreview"
              :on-remove="handlePicRemove"
              >
              <img style="width: 100%;" src="@/assets/images/auth_example.png" alt="">
            </el-upload>
            <el-dialog v-model="imgDialogVisible">
              <img 
                v-if="form.certificatesUrl"
                :src="form.certificatesUrl" 
                style="width: 100%;"
                w-full 
                alt="Preview Image" />
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button @click="reset">重写</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Certification',
})

import { ref, reactive, onMounted } from "vue"
import { InfoFilled } from "@element-plus/icons-vue"
import { ElMessage, FormRules } from "element-plus"

import { reqUserRealName, reqUserCertation } from "@/api/user"
import { reqHospitalTag } from "@/api/home"
import { UserRealName, UserCertification } from "@/api/user/type"
import { HospitalTags } from "@/api/home/type"

import { certificatesTypeValidator, certificatesNoValidator, ingUrlValidator } from "@/utils/certificates"

onMounted(()=> {
  getUserRealName()
})

const loading = ref(true)

// 用户信息
const userRealName = ref<UserRealName>({} as UserRealName)
// 标签
const tags = ref<HospitalTags>([])
// form组件
const formEl = ref()
// 表单
const form = reactive<UserCertification>({
  certificatesNo: "",
  certificatesType: "",
  certificatesUrl: "",
  name: ""
})
// 表单校验
const rules = reactive<FormRules>({
  certificatesNo: [
    { required: true, validator: certificatesNoValidator(form, "certificatesType") }
  ],
  certificatesType: [
    { required: true, validator: certificatesTypeValidator() },
  ],
  certificatesUrl: [
    { required: true, validator: ingUrlValidator }
  ],
  name: [
    { required: true, message: "请输入姓名", trigger: "change" },
    {
      pattern: /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/,
      message: "请输入中文姓名", trigger: "change"
    }
  ]
})
// 图片框能否可见
const imgDialogVisible = ref(false)
// 上传文件组件实例
const uploader = ref()

// 获取用户实名信息
const getUserRealName = async ()=> {
  loading.value = true
  const result = await reqUserRealName()
  if(result.code === 200) {
    userRealName.value = result.data
    if(result.data.authStatus===0) {
      // 需要展示表单，其中包括请求标签
      const res = await reqHospitalTag("certificatesType")
      if(result.code === 200) {
        tags.value = res.data
      } else {
        ElMessage.error(res.message)
      }
    }
  } else {
    ElMessage.error(result.message)
  }
  loading.value = false
}

// 图片上传成功
const handleUploadSuccess = (response: any)=> {
  form.certificatesUrl = response.data
  formEl.value.clearValidate("certificatesUrl")
}

// 预览图片
const handlePicPreview = ()=> {
  imgDialogVisible.value = true
}

// 图片数量超出
const handlePicExceed = ()=> {
  ElMessage.error("只能上传一张图片")
}

// 删除图片
const handlePicRemove = ()=> {
  form.certificatesUrl = ""
}

// 重写
const reset = ()=> {
  // 清除图片墙
  uploader.value.clearFiles()
  Object.assign(form, {
    certificatesNo: "",
    certificatesType: "",
    certificatesUrl: "",
    name: ""
  })
}

// 提交
const submit = async ()=> {
  const validate = await formEl.value.validate()
  if(validate) {
    const result = await reqUserCertation(form)
    if(result.code === 200) {
      ElMessage.success("认证成功")
      getUserRealName()
    } else {
      ElMessage.error(result.message)
    }
  }
  
}
</script>

<style lang="scss" scoped>
.content {
  p {
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #7f7f7f;
    margin-bottom: 20px;

    span {
      margin-left: 3px;
    }
  }
}
</style>