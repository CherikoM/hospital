<template>
  <div class="register">
    <!-- 医院名 -->
    <HospitalInfo :hosname="hospitalDetailStore?.hospitalInfo?.hospital?.hosname"
      :hostype="hospitalDetailStore?.hospitalInfo?.hospital?.param.hostypeString"
      :img="hospitalDetailStore?.hospitalInfo?.hospital?.logoData">
      <!-- 医院文字信息 -->
      <div class="content">
        <h4>挂号规则</h4>
        <p class="time">
          <span class="period">预约周期：{{ hospitalDetailStore?.hospitalInfo?.hospital?.bookingRule?.cycle }}天</span>&nbsp;
          <span class="open">放号时间：{{ hospitalDetailStore?.hospitalInfo?.hospital?.bookingRule?.releaseTime }}</span>&nbsp;
          <span class="close">停挂时间：{{ hospitalDetailStore?.hospitalInfo?.hospital?.bookingRule?.stopTime }}</span>
        </p>
        <p class="address">
          具体地址：{{ hospitalDetailStore?.hospitalInfo?.hospital?.param?.fullAddress }}
        </p>
        <p class="route">
          规划路线：{{ hospitalDetailStore?.hospitalInfo?.hospital?.route }}
        </p>
        <p class="cancel">
          退号时间：就诊前一工作日{{ hospitalDetailStore?.hospitalInfo?.hospital?.bookingRule?.quitTime }}前取消
        </p>
        <div class="rule">
          <div class="rule-title">
            医院预约规则
          </div>
          <p v-for="(item, index) in hospitalDetailStore?.hospitalInfo?.bookingRule?.rule" :key="index">
            {{ index + 1 }}. {{ item }}
          </p>
        </div>
      </div>
    </HospitalInfo>
    <!-- 医院科室信息 -->
    <div class="department">
      <div class="left-nav">
        <ul>
          <li v-for="(department, index) in hospitalDetailStore.hospitalDepartment" :key="department.depcode"
            :class="{ 'active': index === activeDep }" @click="changeActiveDep(index)">
            {{ department.depname }}
          </li>
        </ul>
      </div>
      <div ref="dep" class="right-dep" @scroll="depScroll">
        <div class="dep-container">
          <div ref="subdep" class="subdep" v-for="department in hospitalDetailStore.hospitalDepartment" :key="department.depcode">
            <h4>{{ department.depname }}</h4>
            <!-- 小科室 -->
            <ul v-if="department.children && department.children.length > 0">
              <li v-for="subdep in department.children" :key="subdep.depcode" @click="checkDep(subdep)">
                {{ subdep.depname }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Register',
})

import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"

import HospitalInfo from "@/pages/hospital/hospitalInfo/index.vue"
import useHospitalDetailStore from "@/store/modules/hospitalDetail"

// import useUserStore from "@/store/modules/user"
import debounce from '@/utils/debounce'

import type { HospitalDepartment } from "@/api/hospital/type"

const route = useRoute()
const router = useRouter()

// const userStore = useUserStore()

const hospitalDetailStore = useHospitalDetailStore()

// 被选中的科室
const activeDep = ref(0)

// 科室列表容器
const dep = ref()

// 所有科室标题
const subdep = ref()

// 更改选中科室
const changeActiveDep = (index: number) => {
  activeDep.value = index
  // 点击导航获得对应科室标题
  const currentDep = subdep.value[index]
  // 滚动至对应内容区
  dep.value.scroll({
    top: currentDep.offsetTop,
    behavior: "smooth"
  })
}

// 滚动科室列表
const depScroll = debounce((e:Event)=> {
  if(e) {
    // @ts-ignore
    const sTop = e.target.scrollTop
    const subdeps = subdep.value
    for(let i = 0; i < subdep.value.length; i++) {
      if((subdeps[i].offsetTop <= sTop) && (sTop < (subdeps[i].offsetTop+subdeps[i].offsetHeight))) {
        activeDep.value = i
        break
      }
    }
  }
},500)

// 点击科室后
const checkDep = (item: HospitalDepartment) => {
  // 如果没有登录，应该弹出登录框
  // userStore.dialogVisiable = true

  // 如果登录，应该开始挂号
  router.push({
    path: "/hospital/registration",
    query:{
      hoscode: route.query.hoscode,
      depcode: item.depcode
    }
  })
}



</script>

<style lang="scss" scoped>
.content {
  color: #7f7f7f;
  font-size: 12px;

  h4 {
    color: black;
    font-size: 16px;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 5px;
    line-height: 1.5em;
  }

  .rule {
    margin-top: 10px;

    .rule-title {
      color: black;
      margin-bottom: 5px;
    }
  }
}

.department {
  width: 100%;
  height: min-content;
  margin-top: 20px;
  display: flex;
  font-size: 12px;
  color: #555;

  .left-nav {
    width: 80px;
    background-color: red;

    ul {
      width: 100%;
      height: 100%;
      background-color: rgb(248, 248, 248);
      display: flex;
      flex-direction: column;

      li {
        // flex: 1;
        box-sizing: border-box;
        line-height: 2.5rem;
        text-align: center;
        cursor: pointer;

        &.active {
          background-color: #fff;
          color: red;
          border-left: 2px solid red;
        }
      }
    }
  }

  .right-dep {
    flex: 1;
    position: relative;
    padding-left: 0;
    display: flex;
    flex-direction: column;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    .dep-container {
      // height: 100%;
      position: absolute;
      .subdep {
        h4 {
          margin: 0;
          background-color: rgb(248, 248, 248);
          color: #555;
          font-size: 12px;
          line-height: 2em;
          text-indent: 1em;
        }

        ul {
          padding: 10px;
          font-size: 10px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-row-gap: 10px;
          grid-column-gap: 10px;

          li {
            height: 2em;
            line-height: 2em;
            cursor: pointer;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            white-space: nowrap;

            &:hover {
              color: red;
            }
          }
        }
      }
    }

  }
}
</style>@/utils/throttle