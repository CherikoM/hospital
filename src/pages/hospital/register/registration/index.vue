<template>
  <div class="wrap" v-loading="loadingReg">
    <!-- 顶部，医院信息 -->
    <div class="top">
      <div class="hosname">{{ regData.baseMap?.hosname }}</div>
      <div class="line"></div>
      <div class="type">{{ regData.baseMap?.bigname }}</div>
      <div class="dot">·</div>
      <div class="dep">{{ regData.baseMap?.depname }}</div>
    </div>
    <!-- 中间，选择挂号日 -->
    <div class="center">
      <!-- 时间 -->
      <h3>{{ regData.baseMap?.workDateString }}</h3>
      <div class="container">
        <div 
          @click="changeTime(item)"
          class="item" 
          :class="{ 
            gray: item.status == -1 || item.availableNumber == -1,
            cur: item.workDate == workTimeReg?.workDate }"
          v-for="(item, index) in regData.bookingScheduleList" 
          :key="index">
          <div class="time">{{ item.workDate }} {{ item.dayOfWeek }}</div>
          <div class="have">
            <span v-if="item.status == -1">停止挂号</span>
            <span v-else-if="item.status == 0">
              {{ item.availableNumber == -1 ? "无号" : `有号（${item.availableNumber}）` }}
            </span>
            <span v-else-if="item.status == 1">即将放号</span>
          </div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination v-model:current-page="pageNo" @current-change="handlePageChange" :total="regData.total"
          layout="prev, pager, next" />
      </div>
    </div>
    <!-- 底部，当日医生信息 -->
    <div class="bottom" v-loading="loadingBottom">
      <!-- 即将放号的时间 -->
      <div class="will" v-if="workTimeReg.status === 1">
        <span class="time">2023年6月3日08:00</span>
        <span>&nbsp;放号</span>
      </div>
      <!-- 可供预约的医生 -->
      <div class="doctor" v-else-if="workTimeReg.status === 0">
        <div class="morning doc_list">
          <!-- 时间文字提示 -->
          <div class="tip">
            <Morning :width="20" fill="deepskyblue"></Morning>
            <span>上午号源</span>
          </div>
          <!-- 医生信息 -->
          <div 
            class="doc_info"
            v-for="doctor in morningDoctors"
            :key="doctor.id">
            <!-- 医生的名字/技能 -->
            <div class="left">
              <div class="info">
                <span>{{ doctor.title }}</span>
                <span>|</span>
                <span>{{ doctor.docname }}</span>
              </div>
              <div class="skill">
                {{ doctor.skill }}
              </div>
            </div>
            <!-- 该医生号的价格和余量 -->
            <div class="right">
              <div class="money">￥{{ doctor.amount }}</div>
              <el-button @click="goConfirm(doctor)" type="primary">{{ doctor.availableNumber }}</el-button>
            </div>
          </div>
        </div>
        <div class="afternoon doc_list">
          <!-- 时间文字提示 -->
          <div class="tip">
            <Morning :width="20" fill="deepskyblue"></Morning>
            <span>下午号源</span>
          </div>
          <!-- 医生信息 -->
          <div 
            class="doc_info"
            v-for="doctor in afternoonDoctors"
            :key="doctor.id">
            <!-- 医生的名字/技能 -->
            <div class="left">
              <div class="info">
                <span>{{ doctor.title }}</span>
                <span>|</span>
                <span>{{ doctor.docname }}</span>
              </div>
              <div class="skill">
                {{ doctor.skill }}
              </div>
            </div>
            <!-- 该医生号的价格和余量 -->
            <div class="right">
              <div class="money">￥{{ doctor.amount }}</div>
              <el-button @click="goConfirm(doctor)" type="primary">{{ doctor.availableNumber }}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Registration',
})

import { onMounted, ref, computed } from "vue"
import { useRoute, useRouter } from "vue-router"

import Morning from "@/svgs/morning.vue"

import { reqHospitalRegDoctor, reqHospitalRegInfo } from "@/api/hospital"
import type { DailyHospitalRegInfo, HospitalRegDoctor, HospitalRegDoctors, HospitalRegDoctorsResponseData, HospitalRegInfo, HospitalRegInfoResponseData } from "@/api/hospital/type"
import { ElMessage } from "element-plus"

const route = useRoute()
const router = useRouter()

// 组件挂载时发送一次请求
onMounted(() => {
  fetchRegData()
})

const loadingReg = ref(true)
const loadingBottom = ref(false)

// 当前页数
const pageNo = ref(1)
// 每页数据量
const limit = ref(6)
// 展示的日期挂号数据
const regData = ref<HospitalRegInfo>({} as HospitalRegInfo)
// 当前工作日信息
const workTimeReg = ref<DailyHospitalRegInfo>({} as DailyHospitalRegInfo)
// 当日所有号源
const regDoctors = ref<HospitalRegDoctors>([])
// 当日上午所有号源
const morningDoctors = computed(()=> {
  return regDoctors.value.filter((doc)=> {
    return doc.workTime === 0
  })
})
// 当日下午所有号源
const afternoonDoctors = computed(()=> {
  return regDoctors.value.filter((doc)=> {
    return doc.workTime === 1
  })
})

// 页码变化时获取挂号数据
const handlePageChange = () => {
  fetchRegData()
  getDoctorWorkData()
}

// 获取科室挂号日数据
const fetchRegData = async () => {
  loadingReg.value = true
  const result: HospitalRegInfoResponseData = await reqHospitalRegInfo(
    pageNo.value,
    limit.value,
    route.query.hoscode as string,
    route.query.depcode as string
  )
  console.log(result)
  if (result.code === 200) {
    regData.value = result.data
    workTimeReg.value = regData.value.bookingScheduleList[0]
  } else {
    ElMessage.error(result.message)
  }
  loadingReg.value = false
}

// 获取当前挂号日的医生号数据
const getDoctorWorkData = async ()=> {
  loadingBottom.value = true
  const result: HospitalRegDoctorsResponseData = await reqHospitalRegDoctor(
    route.query.hoscode as string,
    route.query.depcode as string,
    workTimeReg.value.workDate
  )
  if(result.code === 200) {
    regDoctors.value = result.data
  } else {
    ElMessage.error(result.message)
  }
  loadingBottom.value = false
}

// 更改显示日期
const changeTime = (item: DailyHospitalRegInfo)=> {
  // 存储当前选择日期
  workTimeReg.value = item
  // 再次获取当日号数据
  getDoctorWorkData()
}

// 选择就诊人
const goConfirm = (doctor: HospitalRegDoctor)=> {
  router.push({path:"/hospital/confirm",query:{docId:doctor.id}})
}
</script>

<style lang="scss" scoped>
.wrap {
  .top {
    display: flex;
    align-items: center;
    color: #7f7f7f;
    font-size: 12px;
    flex-wrap: wrap;

    &>div {
      line-height: 16px;
      margin-left: 5px;
      flex: none;
    }

    .line {
      width: 0.5px;
      height: 12px;
      margin-left: 10px;
      margin-right: 5px;
      background-color: #7f7f7f;
    }
  }

  .center {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-column-gap: 10px;
      grid-row-gap: 10px;
      width: 100%;
      margin: 30px 0;

      .item {
        border: 1px solid skyblue;
        font-size: 12px;
        color: #444;
        transition: 0.2s all;
        cursor: pointer;

        .time {
          background-color: #e8f2ff;
          height: 30px;
          line-height: 30px;
          font-weight: 700;
          text-align: center;
        }

        .have {
          height: 50px;
          line-height: 50px;
          text-align: center;
        }

        &.gray {
          border-color: #ccc;

          .time {
            background-color: #ccc;
          }
        }

        &.cur {
          transform: scale(1.1);
        }
      }
    }
  }

  .bottom {
    margin-top: 30px;

    .will {
      text-align: center;
      align-content: center;

      .time {
        color: deepskyblue;
        font-size: 20px;
      }
    }

    .doctor {
      .doc_list {
        margin-top: 50px;
        .tip {
          display: flex;
          align-items: center;
          font-size: 18px;
          margin-bottom: 10px;

          span {
            color: #555
          }
        }

        .doc_info {
          display: flex;
          justify-content: space-between;
          margin: 10px 0px;
          border-bottom: 1px solid #ccc;

          .left {
            .info {
              display: flex;
              align-items: center;
              color: deepskyblue;
              margin: 10px 0;

              span {
                margin-right: 5px;
                font-size: 14px;
              }
            }

            .skill {
              margin: 20px 0px;
              color: #7f7f7f;
              font-size: 12px;
            }
          }

          .right {
            width: 110px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .money {
              color: #7f7f7f;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 920px) {
  .center {
    .container {
      grid-template-columns: 1fr 1fr 1fr !important;
    }
  }
}

@media screen and (max-width: 550px) {
  .center {
    .container {
      grid-template-columns: 1fr 1fr !important;
    }
  }
}
</style>