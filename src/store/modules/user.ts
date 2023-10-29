// 用户数据仓库
import { defineStore } from "pinia"
import type { UserState } from "@/store/modules/interface"
import { reqUserLogin } from "@/api/user"
import type { UserInfo, LoginData } from "@/api/user/type"
import { ElMessage } from "element-plus"
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from "@/utils/user"

const useUserStore = defineStore("User", {
  state:(): UserState=> {
    return {
      // 登录框是否显示
      dialogVisiable: false,
      userInfo: GET_TOKEN() || ({} as UserInfo)
    }
  },
  actions: {
    async userLogin(loginData: LoginData) {
      const result = await reqUserLogin(loginData)
      if(result.code === 200) {
        this.userInfo = result.data
        // 持久化
        SET_TOKEN(JSON.stringify(this.userInfo))
        return "ok"
      } else {
        ElMessage.error("登陆失败")
        return Promise.reject(new Error(result.message))
      }
    },
    userLogout() {
      // 清空用户数据
      this.userInfo = {} as UserInfo
      REMOVE_TOKEN()
    },
    // 查看本地存储是否有用户数据
    queryState() {
      // 开启定时器，轮询本地存储是否有用户信息
      let timer = setInterval(()=> {
        // 本地存储已有数据，用户已登录
        if(GET_TOKEN()) {
          this.dialogVisiable = false
          this.userInfo = GET_TOKEN()
          clearInterval(timer)
        }
      }, 1000)
    }
  },
  getters: {

  }
})

export default useUserStore