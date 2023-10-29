import type { HospitalDepartments, HospitalDetail } from "@/api/hospital/type"
import type { UserInfo } from "@/api/user/type"

// 定义hospital state的类型
export interface HospitalDetailState {
  hospitalInfo: HospitalDetail,
  hospitalDepartment: HospitalDepartments
}

export interface UserState {
  dialogVisiable: boolean,
  userInfo: UserInfo
}