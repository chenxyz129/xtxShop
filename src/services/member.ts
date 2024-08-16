import type { profile } from '@/types/login'
import { http } from '@/utils/http'

export const reqGetProfile = () => http<profile>({ url: '/member/profile', method: 'GET' })

export const reqSaveProfile = (data: profile) =>
  http<profile>({ url: '/member/profile', method: 'PUT', data })
