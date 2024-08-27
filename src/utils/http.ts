const baseUrl = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
import { useMemberStore } from '@/stores'
const memberStore = useMemberStore()

const httpInterceptor = {
  invoke(args: UniApp.RequestOptions) {
    const token = memberStore.profile?.token
    args.url = baseUrl + args.url
    args.timeout = 15000
    args.header = {
      ...args.header,
      'source-client': 'miniapp',
      Authorization: token || '',
    }
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

interface resData<T> {
  code: number
  msg: string
  result: T
}
export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<resData<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as resData<T>)
        } else if (res.statusCode == 401) {
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          uni.showToast({
            title: '请先登录！',
            icon: 'none',
          })
          reject((res.data as resData<T>).msg)
        } else {
          uni.showToast({
            title: '请求错误',
            icon: 'none',
          })
          reject((res.data as resData<T>).msg)
        }
      },
      fail(err) {
        uni.showToast({
          title: '网络错误，请检查网络！',
          icon: 'none',
        })
        reject(err)
      },
    })
  })
}
