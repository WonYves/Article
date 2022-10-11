import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // redirect: '/login'
    component: () => import('@/views/home')
  },
  {
    path: '/login',
    component: () => import('@/views/login')
    // webpack提供的让import函数来路由懒加载导入组件
    // 路由懒加载 当切换到login时  才加载对应组件的代码
    // 好处是为了让首页体积更小 打开的时候更快
  },
  {
    path: '/reg',
    component: () => import('@/views/register')
  }
  //   {
  //     path: '/home',
  //     component: () => import('@/views/home')
  //   }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局路由前置守卫 形参(
// 1.to:要去的下一个路由的信息对象
// 2.from:当前要离开的页面路由信息对象
// 3.next方法)
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token && !store.state.userInfo.username) {
    // 你现在本地有token的值 才去请求用户的信息
    store.dispatch('getUserInfoActions')
  }
  next()
})
export default router
