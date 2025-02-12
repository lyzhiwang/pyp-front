import axios from 'axios'
import { getToken, removeToken } from '@/utils/auth'
import store from '@/store'
import router from '../router'
import { Toast , Dialog} from 'vant-green';

// http响应状态码
const resPoseCode = {
  '301': '请求需要重定向',
  '400': '请求错误',
  '401': '请求受保护，需要填写用户名字/密码',
  '403': '资源不可用',
  '404': '无法找到指定资源',
  '405': '请求方法错误',
  '406': '页面请求头不兼容',
  '407': '服务器授权后方可使用',
  '408': '请求超时，请重试',
  '409': '当前资源被占用',
  '410': '请求资源已过期',
  '413': '请求文件过大',
  '423': '当前资源被锁定',
  '424': '请求关联错误',
  '500': '服务器错误',
  '501': '服务器不支持您的请求',
  '502': '上游服务器无法响应',
  '503': '服务器维护中，请稍后再试',
  '504': '上游服务器未及时应答',
  '510': '策略未满足',
  '600': '响应头未返回'
}

// 是否测试
// const isDEBUG = false

// 设置全局的请求次数，请求的间隙
// axios.defaults.retry = 0
// axios.defaults.retryDelay = 1000
// 创建axios实例
const service = axios.create({
  // api 的 base_url | 开发中需要切换主域| 线上使用当前域
  baseURL: (process.env.VUE_APP_IS_OEM === '1' && process.env.NODE_ENV !== 'development') 
  ? (window.location.protocol + `//` + window.location.host.replace('front', 'api')) 
  : process.env.VUE_APP_BASE_API,
  timeout: 30000, // 请求超时时间
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// request拦截器
service.interceptors.request.use(
  config => {
    const needLoad = config.loading !== false
    if (needLoad) Toast.loading()
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // if (store.state.user.oemid)config.headers['oemid'] = store.state.user.oemid
    return config
  },
  error => {
    // Do something with request error
    Toast.clear()
    Promise.reject(error)
  }
)
// response 拦截器
service.interceptors.response.use(
  response => {
    Toast.clear()
    const res = response.data
    const status = response.status
    // if (isDEBUG) console.log(response)
    if (res) {
      // 提示错误信息
      if (res.message && ![0, 700003].includes(res.code)) {
        // Toast.fail(res.message)
        Dialog.alert({
          title: '提示',
          message: res.message
        })
      }
      if (res.code === 0) { // code 为0请求正常
        return res
      } else {
        /**
         * '700003' => '认证失败',
         * '300005' => '活动扫码次数用尽'
         * '300010' => '活动只可参与一次'
         */
        if (res.code === 700003) {
          store.commit('SET_TOKEN', '')
          removeToken()
          router.push('/510')
        }
        // 活动发布失败
        // if (res.code === 300005 || res.code === 300010) {
        //   window.location.replace(window.location.origin + '/500?message=' + res.message)
        // }
        return Promise.reject(res)
      }
    } else {
      Toast.fail(resPoseCode[status] || '请求成功，返回值错误')
      return Promise.reject('error', response)
    }
  },
  error => {
    Toast.clear()
    console.log(response)
    // if (isDEBUG) console.error('error' + error) // for debug
    const response = error.response || { status: 408 }
    const status = response.status
    if (status === 503) {
      router.push({ path: '/503', query: { message: response.data.message }})
    } else if (status === 408) {
      router.push({ path: '/408' })
    }
    Toast.fail(resPoseCode[status] || '网络错误，请重新尝试')
    return Promise.reject(error)
  }
)

export default service
