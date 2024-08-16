import type { goods } from '@/types/goods.t'
import { http } from '@/utils/http'

export const reqGoodsById = (id: number) =>
  http<goods>({ url: '/goods', method: 'GET', data: { id } })
