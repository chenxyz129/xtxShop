import type { categoryList } from '@/types/category'
import { http } from '@/utils/http'

export const reqCategroyList = () => http<categoryList>({ url: '/category/top', method: 'GET' })
