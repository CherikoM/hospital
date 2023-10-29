import request from "@/utils/request"

import { SubmitOrderResponseData, UserOrderResponseData, CancelOrderResponseData, OrderQrCodeResponseData, OrderPayResult, UserOrdersResponseData, OrderStatusResponseData } from "@/api/order/type"

enum API {
  // 提交订单
  SUBMIT_ORDER_URL = "/8206/api/order/orderInfo/auth/submitOrder/",
  // 获取订单详情
  GET_ORDER_INFO_URL = "/8206/api/order/orderInfo/auth/getOrderInfo/",
  // 取消订单
  CANCEL_ORDER_URL = "/8206/api/order/orderInfo/auth/cancelOrder/",
  // 获取订单支付二维码
  GET_ORDER_QR_CODE_URL = "/8206/api/order/weixin/createNative/",
  // 查询订单支付结果
  GET_ORDER_PAY_RESULT_URL = "/8206/api/order/weixin/queryPayStatus/",
  // 查询所有订单
  GET_ALL_ORDER_URL = "/8206/api/order/orderInfo/auth/",
  // 查询所有订单中包含的订单状态
  GET_ORDER_STATUS_URL = "/8206/api/order/orderInfo/auth/getStatusList/"
}

// 提交订单
export const reqSubmitOrder = 
  (hoscode:string,scheduleId:string,patientId:number)=> request.post<any,SubmitOrderResponseData>(API.SUBMIT_ORDER_URL+`${hoscode}/${scheduleId}/${patientId}`)

// 获取订单详情
export const reqOrderInfo = 
  (id: string)=> request.get<any,UserOrderResponseData>(API.GET_ORDER_INFO_URL+id)

// 取消订单
export const reqCancelOrder =
  (id: string)=> request.get<any, CancelOrderResponseData>(API.CANCEL_ORDER_URL+id)

// 获取订单支付二维码
export const reqOrderQrCode = 
  (id: string)=> request.get<any, OrderQrCodeResponseData>(API.GET_ORDER_QR_CODE_URL+id)

// 查询订单支付结果
export const reqOrderPayResult = 
  (id: string)=> request.get<any, OrderPayResult>(API.GET_ORDER_PAY_RESULT_URL+id)

// 查询所有订单
export const reqAllOrder = 
  (page: number, limit: number, patientId: string, orderStatus: string)=> request.get<any, UserOrdersResponseData>(API.GET_ALL_ORDER_URL+`${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)

export const reqOrderStatus = 
  () => request.get<any, OrderStatusResponseData>(API.GET_ORDER_STATUS_URL)