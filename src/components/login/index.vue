<template>
  <div class="login">
    <el-dialog width="75%" v-model="userStore.dialogVisiable" title="用户登录" @close="handleClose">
      <!-- 对话框内容 -->
      <el-row>
        <!-- 左侧，手机或微信登录 -->
        <el-col class="left" :span="12">
          <div class="log">
            <div class="phone_log" v-show="logMethod">
              <el-form :model="form" :rules="rules" ref="ruleFormRef" @validate="onValidate">
                <el-form-item prop="phone">
                  <el-input v-model="form.phone" placeholder="请输入手机号码" :prefix-icon="User"
                    :disabled="time > 0"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <el-input v-model="form.code" placeholder="请输入手机验证码" :prefix-icon="Lock"
                    :disabled="cantInputCode"></el-input>
                </el-form-item>
                <el-form-item label="">
                  <el-button :disabled="cantGetCode" @click="getCode">
                    {{ text }}
                  </el-button>
                </el-form-item>
              </el-form>
              <div class="bottom">
                <el-button style="width: 100%" type="primary" @click="submitForm">用户登录</el-button>
                <div class="login wechat" @click="switchLogin">
                  <p>微信扫码登陆</p>
                  <div class="ico">
                    <Wechat class="icon" :width="30" fill="white"></Wechat>
                  </div>
                </div>
              </div>
            </div>
            <div class="wechat_log" v-show="!logMethod">
              <!-- 微信开放平台 -->
              <!-- 官网：https://open.weixin.qq.com/ -->
              <!-- 文档：https://developers.weixin.qq.com/doc/ -->
              <!-- 让网站能使用微信账号登录、微信分享、微信支付等 -->
              <!-- 在这个容器中显示微信扫码页面 -->
              <div id="wx_container">

              </div>

              <div class="bottom">
                <div class="login phone" @click="logMethod = true">
                  <p>手机短信验证码登陆</p>
                  <div class="ico">
                    <el-icon class="icon" :size="30" color="white"><Iphone /></el-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </el-col>
        <el-col class="right" :span="12">
          <div class="qr">
            <div class="wechat">
              <img src="@/assets/images/code_app.png">
              <Wechat class="icon" :width="14" fill="#7f7f7f"></Wechat>
              <p>微信扫一扫关注</p>
              <p>“快速预约挂号”</p>
            </div>
            <div class="phone">
              <img src="@/assets/images/code_app.png">
              <el-icon class="icon" :size="14" color="#7f7f7f">
                <Iphone />
              </el-icon>
              <p>扫一扫下载</p>
              <p>“预约挂号”APP</p>
            </div>
          </div>
          <div class="content">
            <p>xxxxx官方指定平台</p>
            <p>快速挂号 安全放心</p>
          </div>
        </el-col>
      </el-row>
      <template #footer>
        <el-button @click="userStore.dialogVisiable = false">
          关闭窗口
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Login',
})

import { ref, reactive, watch } from "vue"
import { User, Lock, Iphone } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus"
import type { FormRules, FormInstance, FormItemProp } from 'element-plus'

import { reqUserCode, reqWxLogin } from "@/api/user/index"

import Wechat from "@/svgs/wechat.vue"

import useUserStore from "@/store/modules/user"
import { WxLoginResponseData } from "@/api/user/type"

const userStore = useUserStore()

// -----------------------------------------
// 控制验证码按钮
// #region
// 展示在发送验证码按钮的文字
const text = ref("发送验证码")

// 是否可以获取验证码
const cantGetCode = ref(true)

let timer: any = null

// 验证码重获剩余时间，为了防止刷新需要存储
let time = ref(Number(localStorage.getItem("time")))
if (isNaN(time.value)) {
  time.value = 0
}
// 初始化判断剩余时间
if (time.value && time.value > 0) {
  text.value = time.value + "s后重新发送"
  runClock()
}
// 剩余时间计时
function runClock() {
  cantGetCode.value = true
  text.value = time.value + "s后重新发送"
  localStorage.setItem("time", time.value + "")
  timer = setInterval(() => {
    if (time.value > 1) {
      time.value--
      localStorage.setItem("time", time.value + "")
      text.value = time.value + "s后重新发送"
    } else {
      time.value = 0
      localStorage.setItem("time", time.value + "")
      cantGetCode.value = false
      text.value = "重新发送"
      clearInterval(timer)
      timer = null
    }
  }, 1000)
}
// #endregion
// -------------------------------------
// 表单控制内容
// #region
// 如果是true，手机登录；如果是false，微信扫码登陆
const logMethod = ref(true)

// 表单元素
const ruleFormRef = ref<FormInstance>()

// 是否可以输入验证码
const cantInputCode = ref(true)

// 表单数据
const form = reactive({
  phone: "",
  code: ""
})

// 表单校验规则
const rules = reactive<FormRules>({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'change' },
    {
      pattern: /^1[34578]\d{9}$/,
      message: "请输入正确的手机号", trigger: "change"
    },
  ],
  code: [
    { required: true, message: "请输入验证码", trigger: "change" },
    {
      pattern: /^\d{6}$/,
      message: "请输入六位数字验证码", trigger: "change"
    },
  ]
})

// 当手机号填写正确且没有计时时，允许获取验证码
const onValidate = (prop: FormItemProp, isValid: boolean) => {
  if (prop === "phone" && isValid) {
    cantInputCode.value = false
    if (!timer) {
      cantGetCode.value = false
    }
  } else if (prop === "phone" && !isValid) {
    cantInputCode.value = true
    cantGetCode.value = true
  }
}

// 发请求获取验证码
const getCode = async () => {
  const code = await reqUserCode(form.phone)
  if (code.code === 200) {
    form.code = code.data
    time.value = 30
    runClock()
  } else {
    ElMessage.error(code.code + code.message)
  }
}

// 点击登录，提交表单
const submitForm = async () => {
  const formEl = ruleFormRef.value
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        // 登陆成功
        await userStore.userLogin(form)
        userStore.dialogVisiable = false
        time.value = 0
        localStorage.removeItem("time")
      } catch (error) {
        ElMessage.error(error as Error)
      }
    } else {
      ElMessage.error("请检查输入")
    }
  })
}

// 关闭对话框时
const handleClose = () => {
  // 清除数据
  Object.assign(form, { phone: "", code: "" })
}
// #endregion
// -------------------------------
// 登陆方式
// #region
// 切换成微信登陆
const switchLogin = async () => {
  logMethod.value = false

  // url需要编码
  const redirect_URL = encodeURIComponent(window.location.origin + "/wxlogin")
  const result: WxLoginResponseData = await reqWxLogin(redirect_URL)

  if (result.code === 200) {
    // @ts-ignore
    new WxLogin({
      // 是否进行重定向，如果是true，手机点击确认登陆后可以在iframe内跳转到redirect_uri
      self_redirect: true,
      // 用于显示二维码的容器的id
      id: "wx_container",
      // 应用唯一标识，在微信开放平台提交应用审核通过后获得
      appid: result.data.appid,
      // 应用授权作用域，如果有多个作用域用逗号,隔开，网页应用写snsapi_login即可
      scope: result.data.scope,
      // 重定向地址，需要进行url_encoded，就是授权回调域路径，用户授权成功后，微信服务器需要为项目后台推送code
      redirect_uri: result.data.redirectUri,
      // 后端服务器重定向的地址，后台工作完成后将用户信息给前台
      state: result.data.state,
      // 二维码风格，可选black或white
      style: "black",
      // 自定义样式链接，可以改变二维码页面的样式
      // href: ""
    })
  } else {
    ElMessage.error("请求二维码错误")
  }
}

// 监听登陆方式的值
watch(()=>logMethod.value, (val: boolean)=> {
  // 如果val是false，说明使用微信登陆
  if(!val) {
    userStore.queryState()
  }
})
// #endregion
</script>

<style lang="scss" scoped>
.login {
  :deep(.el-dialog__body) {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      height: 0.5px;
      width: 95%;
      transform: translateX(-50%);
      background-color: #bbb;
    }

    &:after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: 0;
      height: 0.5px;
      width: 95%;
      transform: translateX(-50%);
      background-color: #bbb;
    }

    // border-top: 1px solid #ccc;
  }

  .left {
    .log {
      padding: 20px;
      border: 0.5px solid #bbb;
      border-radius: 5px;

      .bottom {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .login {
          margin-top: 10px;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;

          .ico {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-top: 5px;
            display: flex;
            align-items: center;
            justify-content: center;

          }

          &.wechat {
            .ico {
              background-color: green;
            }
          }

          &.phone {
            .ico {
              background-color: orange;
            }
          }
        }
      }

      .wechat_log {
        #wx_container {
          display: flex;
          justify-content: center;
        }
      }
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .qr {
      display: flex;
      justify-content: space-around;

      .wechat,
      .phone {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          width: 130px;
          height: 130px;
        }

        .icon {
          margin: 5px 0;
        }

        p {
          font-size: 12px;
          line-height: 1.5em;
        }
      }
    }

    .content {
      font-size: 20px;

      p {
        text-align: center;
        line-height: 2em;
        font-style: italic;
      }
    }
  }

}
</style>