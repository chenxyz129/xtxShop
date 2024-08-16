import type { CartListItem } from '@/types/cart'
import { http } from '@/utils/http'

export const reqAddToCart = (skuId: number | string, count: number) =>
  http({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count,
    },
  })

export const reqCartList = () => http<CartListItem[]>({ url: '/member/cart', method: 'GET' })

export const reqDelCartItem = (ids: (string | number)[]) =>
  http({ url: '/member/cart', method: 'DELETE', data: { ids } })

export const reqUpdateCartItem = (skuId: number | string, selected?: boolean, count?: number) =>
  http({
    url: `/member/cart/${skuId}`,
    method: 'PUT',
    data: {
      selected,
      count,
    },
  })

export const reqSelectCartItem = (selected: boolean) =>
  http({ url: '/member/cart/selected', method: 'PUT', data: { selected } })
