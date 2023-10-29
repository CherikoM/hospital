import request from "@/utils/request"

import { HospitalDepartmentResponseData, HospitalDetailResponseData, HospitalRegDoctorsResponseData, HospitalRegInfoResponseData, HospitalDoctorResponseData } from "@/api/hospital/type"

enum API {
  // 获取医院详情信息
  HOSPITAL_DETAIL_URL = "/hosp/hospital/",
  // 获取医院科室
  HOSPITAL_DEPARTMENT_URL = "/hosp/hospital/department/",
  // 获取医院科室挂号数据
  HOSPITAL_REG_INFO_URL = "/hosp/hospital/auth/getBookingScheduleRule/",
  // 获取医院某科室当日挂号医生数据
  HOSPITAL_REG_DOCTOR_URL = "/hosp/hospital/auth/findScheduleList/",
  // 获取挂号医生的信息
  HOSPITAL_DOCTOR_URL = "/hosp/hospital/getSchedule/"
}

export const reqHospitalDetail = 
  (hoscode: string) => request.get<any, HospitalDetailResponseData>(API.HOSPITAL_DETAIL_URL+hoscode)

export const reqHospitalDepartment = 
  (hoscode: string)=> request.get<any, HospitalDepartmentResponseData>(API.HOSPITAL_DEPARTMENT_URL + hoscode)

export const reqHospitalRegInfo = 
  (page:number,limit:number,hoscode:string,depcode:string)=> request.get<any,HospitalRegInfoResponseData>(API.HOSPITAL_REG_INFO_URL+`${page}/${limit}/${hoscode}/${depcode}`)

// 获取医生排班和号的数据
export const reqHospitalRegDoctor = 
  (hoscode:string, depcode:string, workDate:string)=> request.get<any, HospitalRegDoctorsResponseData>(API.HOSPITAL_REG_DOCTOR_URL+`${hoscode}/${depcode}/${workDate}`)

export const reqHospitalDoctor = 
  (scheduleId:string)=> request.get<any,HospitalDoctorResponseData>(API.HOSPITAL_DOCTOR_URL+scheduleId)