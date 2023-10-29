// 首页相关接口
import request from "@/utils/request"
import type { HospitalResponseData, HospitalSearchResponseData, HospitalTagResponseData } from "./type"

// 枚举管理首页接口地址
enum API {
  // 医院列表（分页）
  HOSPITAL_URL = "/8201/api/hosp/hospital/",
  // 医院标签筛选
  HOSPITAL_TAG_URL = "/8202/api/cmn/dict/findByDictCode/",
  // 根据关键字获取医院名
  HOSPITAL_SEARCH_URL = "/8201/api/hosp/hospital/findByHosname/"
}

// 获取医院数据
export const reqHospital = 
  (page: number, limit: number, hostype="", districtCode="")=> {
    return request.get<any, HospitalResponseData>(API.HOSPITAL_URL+`${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)
  }

// 获取医院筛选标签
export const reqHospitalTag = 
  (dictCode: string)=> request.get<any, HospitalTagResponseData>(API.HOSPITAL_TAG_URL+dictCode)

// 根据关键字搜索医院
export const reqHospitalSearch = 
  (keyword: string)=> request.get<any, HospitalSearchResponseData>(API.HOSPITAL_SEARCH_URL+keyword)