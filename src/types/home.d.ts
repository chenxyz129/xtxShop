export type BannerItem = {
  hrefUrl: string
  id: string
  imgUrl: string
  type: number
}
export type CategoryItem = {
  id: string
  name: string
  icon: string
}

export type HotIntroItem = {
  id: string
  alt: string
  pictures: string[]
  target: string
  title: string
  type: string
}
export type PageType<T> = {
  counts: number
  pageSize: number
  pages: number
  page: number
  items: T
}
export type guessLikeItem = {
  id: number
  name: string
  desc: string
  price: number
  picture: string
  dicount: number
  orderNum: number
}
