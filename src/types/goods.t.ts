export type goods = {
  id: string
  name: string
  spuCode: string
  desc: string
  price: string
  oldPrice: string
  discount: 0
  inventory: 0
  brand: {
    id: string
    name: string
    nameEn: string
    picture: string
    logo: string
    type: null
    desc: null
    place: null
  }
  salesCount: 0
  commentCount: 0
  collectCount: 0
  mainVideos: [string]
  videoScale: 0
  mainPictures: string[]
  specs: [
    {
      id: string
      name: string
      values: [
        {
          name: string
          picture: string
          available: true
          desc: string
        },
      ]
    },
  ]
  skus: [
    {
      id: string
      skuCode: string
      price: number
      oldPrice: string
      inventory: 0
      picture: string
      specs: [
        {
          name: string
          valueName: string
        },
      ]
    },
  ]
  categories: [
    {
      id: string
      name: string
      layer: 0
      parent: {
        id: string
        name: string
        layer: 0
        parent: null
      }
    },
  ]
  details: {
    properties: [
      {
        name: string
        value: string
      },
    ]
    pictures: [string]
  }
  isPreSale: true
  isCollect: null
  recommends: null
  userAddresses: null
  evaluationInfo: null
  similarProducts: [
    {
      id: string
      picture: string
      name: string
      price: string
      desc: string
      orderNum: 0
      discount: null
    },
  ]
  hotByDay: [
    {
      id: string
      picture: string
      name: string
      price: string
      desc: string
      orderNum: 0
      discount: null
    },
  ]
}
