import type {
  logistics,
  OrderData,
  orderDetail,
  orderListRes,
  prePayOrderData,
} from '@/types/order'
import { http } from '@/utils/http'

export const reqOrderPrePayList = () =>
  http<prePayOrderData>({ url: '/member/order/pre', method: 'GET' })

export const reqOrderBuyNow = (skuId: number, count: number, addressId: number) =>
  http<prePayOrderData>({
    url: '/member/order/pre/now',
    method: 'GET',
    data: {
      skuId,
      count,
      addressId,
    },
  })
// 获取再次购买订单
export const reqOrderRepurchase = (id: number) =>
  http({ url: `/member/order/repurchase/${id}`, method: 'GET' })

export const reqSubmmitOrder = (data: OrderData) =>
  http<{ id: string }>({ url: '/member/order', method: 'POST', data })

export const reqOrderById = (id: string) =>
  http<orderDetail>({ url: `/member/order/${id}`, method: 'GET' })

//模拟发货
export const reqConsignment = (id: string) => http({ url: `/member/order/consignment/${id}` })

//确认收货
export const reqOrderReceipt = (id: string) =>
  http({ url: `/member/order/${id}/receipt`, method: 'PUT' })

// 获取订单物流
export const reqLogisticsList = (id: string) =>
  http<logistics>({ url: `/member/order/${id}/logistics`, method: 'GET' })

export const reqDelOrder = (ids: string[]) =>
  http({ url: '/member/order', method: 'DELETE', data: { ids } })

export const reqCancelOrder = (id: string, cancelReason: string) =>
  http({ url: `/member/order/${id}/cancel`, method: 'GET', data: { cancelReason } })

//获取订单列表
export const reqOrderList = (page: number, pageSize: number, orderState: number) =>
  http<orderListRes>({
    url: '/member/order',
    method: 'GET',
    data: {
      page,
      pageSize,
      orderState,
    },
  })

//模拟支付
export const reqPayOrder = (orderId: string) =>
  http({ url: `/pay/mock?orderId=${orderId}`, method: 'GET' })
