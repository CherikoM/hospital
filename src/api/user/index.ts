import request from "@/utils/request"

import { UserCodeResponseData, LoginData, UserLoginResponseData, WxLoginResponseData, UserClientsResponseData, UserRealNameResponseData, UserCertification, AddressResponseData, UserClientForm } from "@/api/user/type"

enum API {
  // 用户请求验证码
  GET_USER_CODE = "/8204/api/sms/send/",
  // 用户登录
  USER_LOGIN_URL = "/8203/api/user/login",
  // 获取微信扫码登录参数
  WX_LOGIN_URL = "/8203/api/user/weixin/getLoginParam/",
  // 获取该账号的就诊人信息
  GET_USER_CLIENT_URL = "/8203/api/user/patient/auth/findAll",
  // 提交订单
  SUBMIT_ORDER_URL = "/8206/api/order/orderInfo/auth/submitOrder/",
  // 获取订单详情
  GET_ORDER_INFO_URL = "/8206/api/order/orderInfo/auth/getOrderInfo/",
  // 获取用户实名认证信息
  GET_USER_REAL_NAME_URL = "/8203/api/user/auth/getUserInfo/",
  // 用户实名认证
  USER_CERTATION_URL = "/8203/api/user/auth/userAuah/",
  // 获取省市县
  GET_ADDRESS_URL = "/8202/api/cmn/dict/findByParentId/",
  // 添加就诊人
  ADD_USER_CLIENT_URL = "/8203/api/user/patient/auth/save/",
  // 修改就诊人
  UPDATE_USER_CLIENT_URL = "/8203/api/user/patient/auth/update/",
  // 删除就诊人
  DELETE_USER_CLIENT_URL = "/8203/api/user/patient/auth/remove/"
}

export const reqUserCode = 
  (phone: string) => request.get<any, UserCodeResponseData>(API.GET_USER_CODE+phone)

export const reqUserLogin = 
  (data: LoginData)=> request.post<any, UserLoginResponseData>(API.USER_LOGIN_URL, data)

// 请求进行微信扫码登录，获取微信扫码登录页面参数
// 还需要携带一个参数，告诉服务器用户授权成功后重定向至哪个页面
export const reqWxLogin = 
  (wxRedirectUri:string)=> request.get<any, WxLoginResponseData>(API.WX_LOGIN_URL+`?wxRedirectUri=${wxRedirectUri}`)

// 获取账号下的就诊人信息
export const reqUserClient = 
  ()=> request.get<any, UserClientsResponseData>(API.GET_USER_CLIENT_URL)

// 获取用户实名认证信息
export const reqUserRealName = 
  ()=> request.get<any, UserRealNameResponseData>(API.GET_USER_REAL_NAME_URL)

// 提交实名认证
export const reqUserCertation = 
  (data: UserCertification)=> request.post<any, any>(API.USER_CERTATION_URL,data)

// 获取省市县
export const reqAddress = 
  (parentId: string)=> request.get<any,AddressResponseData>(API.GET_ADDRESS_URL+parentId)

// 添加或修改就诊人
export const reqChangeUserClient = (data: UserClientForm)=> {
  if(data.id && data.id !== "") {
    // 有id，修改
    console.log("修改")
    return request.put<any, any>(API.UPDATE_USER_CLIENT_URL, data)
  } else {
    // 没有id，添加
    console.log("添加")
    return request.post<any, any>(API.ADD_USER_CLIENT_URL, data)
  }
} 

// 删除就诊人
export const reqDeleteUserClient = (id: number)=> {
  return request.delete<any, any>(API.DELETE_USER_CLIENT_URL+id)
}