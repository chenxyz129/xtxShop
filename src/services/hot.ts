import { http } from '@/utils/http'
import type { hotRes } from '@/types/hot'
type data = {
  subType?: number
  pageSize: number
  page: number
}
export const reqHotSubItem = (url: string, data?: data) =>
  http<hotRes>({ url, method: 'GET', data })
