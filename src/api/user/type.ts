import { ResponseData } from "@/api/type"

export interface UserCodeResponseData extends ResponseData {
  data: string
}

// 用户登录时需要携带的参数
export interface LoginData {
  phone: string,
  code: string
}

// 用户信息
export interface UserInfo {
  name: string,
  token: string
}

// 接口返回用户信息
export interface UserLoginResponseData extends ResponseData {
  data: UserInfo
}

// 微信扫码登陆相关信息
export interface WxLogin {
  redirectUri: string,
  appid: string,
  scope: string,
  state: string,
}

// 接口返回微信扫码登陆相关信息
export interface WxLoginResponseData extends ResponseData {
  data: WxLogin
}

// 居住地址
export interface UserAddress {
  certificatesTypeString: string,
  contactsCertificatesTypeString: null,
  cityString: string,
  fullAddress: string,
  districtString: string,
  provinceString: string
}

// 就诊人
export interface UserClient {
  id?: number,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: UserAddress,
  userId: number,
  name: string,
  certificatesType: string,
  certificatesNo: string,
  sex: number,
  birthdate: string,
  phone: string,
  isMarry: number,
  provinceCode: string,
  cityCode: string,
  districtCode: string,
  address: string,
  contactsName: string,
  contactsCertificatesType: string,
  contactsCertificatesNo: string,
  contactsPhone: string,
  isInsure: number,
  cardNo: null,
  status: string
}

export type UserClients = UserClient[]

export interface UserClientsResponseData extends ResponseData {
  data: UserClients
}

// 用户实名信息
export interface UserRealName {
  id: number,
  createTime: string,
  updateTime: string,
  isDeleted: 0,
  param: {},
  openid: string | null,
  nickName: string | null,
  phone: string,
  name: string,
  certificatesType: string,
  certificatesNo: string,
  certificatesUrl: string | null,
  authStatus: number,
  status: number
}

// 接口返回用户实名信息
export interface UserRealNameResponseData extends ResponseData {
  data: UserRealName
}

export interface UserCertification {
  certificatesNo: string,
  certificatesType: string,
  certificatesUrl: string,
  name: string,
}

// 地址
export interface Address {
  id: number,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {},
  parentId: number,
  name: string,
  value: string,
  dictCode: null,
  hasChildren: boolean
}

export type Addresses = Address[]

export interface AddressResponseData extends ResponseData {
  data: Addresses
}

export interface UserClientForm {
  id?: string,
  name: string,
  certificatesType: string,
  certificatesNo: string,
  sex: number,
  birthdate: string,
  phone: string,
  isMarry: number,
  isInsure: number,
  addressSelected: string[],
  address: string,
  contactsName: string,
  contactsCertificatesType: string,
  contactsCertificatesNo: string,
  contactsPhone: string
}