import { ResponseData } from "@/api/type"
import { Hospital, BookingRule } from "@/api/type"

export interface HospitalDetail {
  bookingRule: BookingRule,
  hospital: Hospital
}

export interface HospitalDetailResponseData extends ResponseData {
  data: HospitalDetail,
}

export interface HospitalDepartment {
  depcode: string,
  depname: string,
  children?: HospitalDepartments | null
}

export type HospitalDepartments = HospitalDepartment[]

export interface HospitalDepartmentResponseData extends ResponseData {
  data: HospitalDepartments
}

// 每一天的医院挂号信息
export interface DailyHospitalRegInfo {
  workDate: string,
  workDateMd: string,
  dayOfWeek: string,
  docCount: number,
  reservedNumber: number,
  availableNumber: number,
  status: number
}

// 许多天的挂号信息
export type BookingScheduleList = DailyHospitalRegInfo[]

// 挂号医院的信息
export interface HospitalBaseMap {
  workDateString: string,
  releaseTime: string,
  bigname: string,
  stopTime: string,
  depname: string,
  hosname: string
}

export interface HospitalRegInfo {
  total: 11,
  bookingScheduleList: BookingScheduleList,
  baseMap: HospitalBaseMap
}

export interface HospitalRegInfoResponseData extends ResponseData {
  data: HospitalRegInfo
}

// 放号的医生
export interface HospitalRegDoctor {
  id: string,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {
    dayOfWeek: string,
    depname: string,
    hosname: string
  },
  hoscode: string,
  depcode: string,
  title: string,
  docname: string,
  skill: string,
  workDate: string,
  workTime: number,
  reservedNumber: number,
  availableNumber: number,
  amount: number,
  status: number,
  hosScheduleId: string
}

// 放号的医生列表
export type HospitalRegDoctors = HospitalRegDoctor[]

// 接口返回医生排班数据
export interface HospitalRegDoctorsResponseData extends ResponseData {
  data: HospitalRegDoctors
}

// 接口返回医生数据
export interface HospitalDoctorResponseData extends ResponseData {
  data: HospitalRegDoctor
}