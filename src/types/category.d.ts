export type categoryItem = {
  id: number
  name: string
  picture: string
  imageBanners: string
  children: children[]
}
export type children = {
  id: number
  name: string
  picture: string
  parentId: number
  parentName: string
  goods: good[]
  categories: null
  brands: null
  saleProperties: null
}
export type good = {
  id: number
  name: string
  desc: string
  price: string
  picture: string
  discount: string
  orderNum: string
}
