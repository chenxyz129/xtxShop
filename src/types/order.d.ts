export type OrderData = {
  goods: {
    skuId: string
    count: number
  }[]

  addressId?: string | number
  deliveryTimeType: 1 | 2 | 3 //1为不限，2为工作日，3为双休或假日
  buyerMessage: string
  payType: 1 | 2 //1为在线支付，2为货到付款
  payChannel: number
}
export type prePayOrderData = {
  userAddresses: {
    id: string
    provinceCode: string
    cityCode: string
    countyCode: string
    address: string
    isDefault: 1 | number
    receiver: string
    contact: string
    fullLocation: string
    postalCode: string
  }[]

  goods: {
    id: string
    name: string
    picture: string
    count: number
    skuId: string
    attrsText: string
    price: number
    payPrice: number
    totalPrice: number
    totalPayPrice: number
  }[]
  summary: {
    goodsCount: number
    totalPrice: number
    totalPayPrice: number
    postFee: number
    discountPrice: number
  }
}

export type orderDetail = {
  id: string
  createTime: string
  payType: 1 | 2 //1为在线支付，2为货到付款
  orderState: 1 | 2 | 3 | 4 | 5 | 6 //1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消
  payLatestTime: number
  countdown: number
  postFee: string
  payMoney: string
  payChannel: 1 | 2 //支付渠道，1支付宝、2微信
  totalMoney: string
  totalNum: string
  deliveryTimeType: 1 | 2 | 3 //配送时间类型，1为不限，2为工作日，3为双休或假日
  receiverContact: string
  receiverMobile: string
  receiverAddress: string
  payTime: string
  consignTime: string
  arrivalEstimatedTime: string
  endTime: string
  closeTime: string
  evaluationTime: string
  skus: {
    id: string
    spuId: string
    attrsText: string
    name: string
    quantity: string
    image: string
    totalMoney: number
    realPay: number
    curPrice: number
    properties: {
      propertyMainName: string
      propertyValueName: string
    }[]
  }[]
}

export type logistics = {
  picture: string
  count: number
  company: {
    name: string
    number: string
    tel: string
  }
  list: {
    id: string
    text: string
    time: string
  }[]
}

export type orderListRes = {
  counts: number
  pageSize: number
  pages: number
  page: number
  items: orderList[]
}

export type orderList = {
  id: string
  createTime: string
  payType: number
  orderState: number
  payLatestTime: string
  countdown: number
  postFee: number
  payMoney: number
  totalMoney: number
  totalNum: string
  skus: {
    id: string
    spuId: string
    name: string
    quantity: number
    image: string
    curPrice: number
    realPay: number
    properties: {
      propertyMainName: string
      propertyValueName: string
    }[]
    attrsText: string
  }[]
}
