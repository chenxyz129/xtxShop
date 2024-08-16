import type { profile } from '@/types/login'
import { http } from '@/utils/http'

export const reqLogin = (phoneNumber: number | string) =>
  http<profile>({
    url: '/login/wxMin/simple',
    method: 'POST',
    data: {
      phoneNumber,
    },
  })
