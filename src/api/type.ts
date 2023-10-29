export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}

export interface BookingRule {
  cycle: number,
  releaseTime: string,
  stopTime: string,
  quitDay: number,
  quitTime: string,
  rule: string[]
}

// 医院类型
export interface Hospital {
  id: string,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {
    hostypeString: string,
    fullAddress: string,
  }
  hoscode: string,
  hosname: string,
  hostype: string,
  provinceCode: string,
  cityCode: string,
  districtCode: string,
  address: string,
  logoData: string,
  intro: string,
  route: string,
  status: number,
  bookingRule: BookingRule
}