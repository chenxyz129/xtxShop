import type { addressItem } from '@/types/address'
import { http } from '@/utils/http'

export const reqAddAddressItem = (data: addressItem) =>
  http({ url: '/member/address', method: 'POST', data })

export const reqDelAddressItem = (id: string | number) =>
  http<{ id: string | number }>({
    url: `/member/address/${id}`,
    method: 'DELETE',
  })

export const reqUpdateAddressItem = (id: number | string) =>
  http({ url: `/member/address/${id}`, method: 'PUT' })

export const reqAddressItem = (id: number | string) =>
  http<addressItem>({ url: `/member/address/${id}`, method: 'GET' })

export const reqAddressList = () => http<addressItem[]>({ url: '/member/address', method: 'GET' })
