import axios from 'axios'
import store from '@/store'

// 创建一个自定的axios方法(比原axios多了个基地址)
// axios函数请求的url地址前面会被拼接基地址, 然后axios请求baseURL+url后台完整地址
const myAxios = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})

// 导出自定义的axios方法, 供外面调用传参发请求

// 定义请求拦截器
// api里每次发起请求的时候 都会先走这个请求拦截器
myAxios.interceptors.request.use(function (config) {
  // config配置对象 要请求后台的参数都在这个对象上
  // 在发起时，统一携带请求头Authorization和token值
  // 判断 登录页面和注册页面vue里无token，而且登录接口和注册接口都不需要携带token（其他页面需要）
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
export default myAxios
