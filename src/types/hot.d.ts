export type hotRes = {
  bannerPicture: string
  id: string
  subTypes: subTypeItem[]
  title: string
}
export type subTypeItem = {
  goodsItems: goodsItems
  id: number
  title: string
  isDown?: boolean
}
export type goodsItems = {
  counts: number
  items: Item[]
  page: number
  pageSize: number
  pages: number
}
export type Item = {
  desc: string
  id: number
  name: string
  orderNum: number
  picture: string
  price: string
}
