import { defineStore } from "pinia"
import { reqHospitalDetail, reqHospitalDepartment } from "@/api/hospital"
import type { HospitalDetailResponseData, HospitalDetail, HospitalDepartmentResponseData } from "@/api/hospital/type"
import type { HospitalDetailState } from "@/store/modules/interface"

const useHospitalDetailStore = defineStore("HospitalDetail", {
  state: (): HospitalDetailState=> {
    return {
      // 医院详情数据
      hospitalInfo: ({} as HospitalDetail),
      // 医院科室数据
      hospitalDepartment: []
    }
  },
  actions: {
    // 获取医院详情信息
    async getHospitalDetail(hoscode:string) {
      const result: HospitalDetailResponseData = await reqHospitalDetail(hoscode)
      if(result.code === 200) {
        this.hospitalInfo = result.data
      }
    },
    // 获取医院科室信息
    async getHospitalDepartment(hoscode: string) {
      const result: HospitalDepartmentResponseData = await reqHospitalDepartment(hoscode)
      if(result.code === 200) {
        this.hospitalDepartment = result.data
      }
    }
  },
  getters: {

  }
})

export default useHospitalDetailStore