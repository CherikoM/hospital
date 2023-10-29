<template>
  <div v-loading="loading">
    <el-card class="card">
      <!-- 标题 -->
      <template #header>
        <div class="title">挂号详情</div>
      </template>
      <!-- 头部 -->
      <div class="top">
        <!-- 左侧标签 -->
        <el-tag class="ml-2" :type="tagStatus[(order.orderStatus + 1)]">
          <div class="tag">
            <el-icon>
              <Check />
            </el-icon>
            <span>{{ order?.param?.orderStatusString }}</span>
          </div>
        </el-tag>
        <!-- 右侧二维码 -->
        <div class="right">
          <img src="@/assets/images/code_app.png" alt="">
          <div>
            <p>微信<WeChat :width="14" fill="green"></WeChat>关注“北京114预约挂号”</p>
            <p>“快速预约挂号”</p>
          </div>
        </div>
      </div>
      <div class="detail">
        <!-- 订单详情信息 -->
        <div class="left">
          <el-descriptions class="margin-top" :column="1" border>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  就诊人信息
                </div>
              </template>
              {{ order.patientName }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  就诊日期
                </div>
              </template>
              {{ order.reserveDate }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  就诊医院
                </div>
              </template>
              {{ order.hosname }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  就诊科室
                </div>
              </template>
              {{ order.depname }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  医生职称
                </div>
              </template>
              {{ order.title }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  医生服务费
                </div>
              </template>
              {{ order.amount }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  挂号单号
                </div>
              </template>
              {{ order.outTradeNo }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  挂号时间
                </div>
              </template>
              {{ order.createTime }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="right">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>注意事项</span>
              </div>
            </template>
            <p>
              1、请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；
            </p>
            <p style="color:red;">
              2、【取号】就诊当天需在{{ order.fetchTime }}在医院取号，未取号视为爽约，该号不退不换；
            </p>
            <p>
              3、【退号】在{{ order.quitTime }}前可在线退号 ，逾期将不可办理退号退费；
            </p>
            <p>
              4、北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；
            </p>
            <p>
              5、请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。
            </p>
          </el-card>
        </div>
      </div>
      <div class="confirm" v-if="order.orderStatus !== -1">
        <el-popconfirm title="确定要取消预约吗？" @confirm="cancel">
          <template #reference>
            <el-button>取消预约</el-button>
          </template>
        </el-popconfirm>
        <el-button type="primary" @click="startPay" v-if="order.orderStatus === 0">支付</el-button>
      </div>
    </el-card>
    <div class="dialog">
      <el-dialog 
        v-model="dialogVisible" 
        title="微信支付" 
        width="40%"
        @close="onCloseDialog">
        <!-- 对话框内容 -->
        <div class="timeout" v-if="timerCount > timeoutCount">
          支付请求已超时，请重试
        </div>
        <div class="content" v-else>
          <!-- 支付二维码 -->
          <img :src="qrCode" alt="">
          <p>请使用微信扫一扫</p>
          <p>扫描二维码支付</p>
        </div>
        <!-- 底部 -->
        <template #footer>
          <el-button type="primary" @click="dialogVisible = false">关闭窗口</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Detail',
})

import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { Check } from "@element-plus/icons-vue"
// 生成二维码的插件
// @ts-ignore
import QRCode from "qrcode"

import { reqOrderInfo, reqCancelOrder, reqOrderQrCode, reqOrderPayResult } from "@/api/order"
import type { UserOrderResponseData, UserOrder } from "@/api/order/type"

import WeChat from "@/svgs/wechat.vue"
import { ElMessage } from "element-plus"

const route = useRoute()

const loading = ref(true)

onMounted(() => {
  getOrderInfo()
})

// orderStstus -1：取消了预约   0：预约但未支付   1：预约且已支付
const order = ref<UserOrder>({} as UserOrder)
// 订单状态标签的样式
const tagStatus = ["danger", "", "success"]
// 订单显示情况
const dialogVisible = ref(false)
// 支付二维码
const qrCode = ref("")
// 定时器
let timer: ReturnType<typeof setInterval>
// 轮询次数
let timerCount = ref(0)
// 轮询超时次数
let timeoutCount = ref(20)

// 根据订单id获取订单详情
const getOrderInfo = async () => {
  loading.value = true
  const result: UserOrderResponseData = await reqOrderInfo(route.query.id as string)
  if (result.code === 200) {
    order.value = result.data
  } else {
    ElMessage.error(result.message)
  }
  loading.value = false
}

// 取消订单
const cancel = async () => {
  const result = await reqCancelOrder(route.query.id as string)
  if (result.code === 200) {
    // 取消成功，再次获取订单详情
    getOrderInfo()
  } else {
    ElMessage.error(result.message)
  }
}

// 进行支付
const startPay = async () => {
  dialogVisible.value = true
  const result = await reqOrderQrCode(route.query.id as string)
  if (result.code === 200) {
    // 根据服务器返回的二维码信息生成支付二维码图片
    qrCode.value = await QRCode.toDataURL(result.data.codeUrl)

    // 当已获取支付二维码后，轮询服务器是否支付成功
    timer = setInterval(async ()=> {
      // 如果超时，终止轮询
      timerCount.value++
      if(timerCount.value > timeoutCount.value) {
        clearInterval(timer)
      }

      // 查看支付结果
      const result = await reqOrderPayResult(route.query.id as string)
      // 如果支付成功，终止轮询
      if(result.data) {
        // 关闭对话框
        dialogVisible.value = false
        // 弹出提示
        ElMessage.success("支付成功！")
        // 清除定时器
        clearInterval(timer)
        // 刷新订单数据
        getOrderInfo()
      }
    },2000)
  } else {
    ElMessage.error(result.message)
  }
}

// 支付对话框关闭时
const onCloseDialog = ()=> {
  clearInterval(timer)
  timerCount.value = 0
}
</script>

<style lang="scss" scoped>
.card {
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--el-card-border-color);

    .tag {
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        margin-left: 3px;
      }
    }

    .right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;

      img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }

      div {
        height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        p {
          display: flex;
          align-items: center;
        }
      }

    }
  }

  .detail {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;

    .left {
      flex: 4;
    }

    .right {
      flex: 6;
      margin-left: 20px;

      p {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }

  .confirm {
    margin-top: 20px;
  }
}

.dialog {
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

  }

  .timeout {
    margin: 20px 0;
    text-align: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 50%;
      height: 50%;
      margin-bottom: 10px;
    }

    p {
      line-height: 20px;
    }
  }
}</style>