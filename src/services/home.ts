import { http } from '@/utils/http'
import type { BannerItem, CategoryItem, HotIntroItem, PageType, guessLikeItem } from '@/types/home'
export const reqHomeBanner = (distributionSite = 1) =>
  http<BannerItem[]>({
    url: '/home/banner',
    method: 'GET',
    data: {
      distributionSite,
    },
  })
export const reqHomeCategory = () =>
  http<CategoryItem[]>({
    url: '/home/category/mutli',
    method: 'GET',
  })
export const reqHotIntro = () =>
  http<HotIntroItem[]>({
    url: '/home/hot/mutli',
    method: 'GET',
  })

export const reqGuessLike = (page: number, pageSize: number) =>
  http<PageType<guessLikeItem[]>>({
    url: '/home/goods/guessLike',
    method: 'GET',
    data: {
      page,
      pageSize,
    },
  })
