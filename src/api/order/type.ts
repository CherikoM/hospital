import { ResponseData } from "@/api/type"

// 接口返回提交订单后的返回数据
export interface SubmitOrderResponseData extends ResponseData {
  data: number
}

// 订单
export interface UserOrder {
  id: number,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {
    orderStatusString: string
  },
  userId: number,
  outTradeNo: string,
  hoscode: string,
  hosname: string,
  depcode: string,
  depname: string,
  scheduleId: string,
  title: string,
  reserveDate: string,
  reserveTime: number,
  patientId: number,
  patientName: string,
  patientPhone: string,
  hosRecordId: string,
  number: number,
  fetchTime: string,
  fetchAddress: string,
  amount: number,
  quitTime: string,
  orderStatus: number
}

// 订单列表
export type UserOrders = UserOrder[]

// 接口返回订单详情数据
export interface UserOrderResponseData extends ResponseData {
  data: UserOrder
}

// 接口返回订单列表数据
export interface UserOrdersResponseData extends ResponseData {
  data: {
    records: UserOrders,
    total: number,
    size: number,
    current: number,
    orders: [],
    hitCount: boolean,
    searchCount: boolean,
    pages: number
  }
}

// 接口返回取消订单后的返回数据
export interface CancelOrderResponseData extends ResponseData {
  data: {}
}

// 订单支付二维码
export interface OrderQrCode {
  codeUrl: string,
  orderId: number,
  totalFee: number,
  resultCode: string
}

// 接口返回订单支付二维码数据
export interface OrderQrCodeResponseData extends ResponseData {
  data: OrderQrCode
}

export interface OrderPayResult extends ResponseData {
  data: boolean
}

export interface OrderStatus {
  comment: string,
  status: number
}

export type OrderStatuses = OrderStatus[]

export interface OrderStatusResponseData extends ResponseData {
  data: OrderStatuses
}