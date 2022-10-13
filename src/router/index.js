import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'user-info',
        component: () => import('@/views/user/userInfo.vue')
      }
    ]
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
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 1.浏览器第一次打开项目的时候 会触发一次全局路由守卫函数
// 2.有token就登录了 没token就没登录
// 3.next()方法强制切换路由地址，会再次走路由守卫再次去匹配路由表
// 全局路由前置守卫 形参(
// 1.to:要去的下一个路由的信息对象
// 2.from:当前要离开的页面路由信息对象
// 3.next方法)
const whiteList = ['/login', '/reg'] // 白名单 (无需登录可以访问的路由地址)
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    // 已登录
    if (!store.state.userInfo.username) {
      // 你现在本地有token的值 才去请求用户的信息
      store.dispatch('getUserInfoActions')
    }
    next()
  } else {
    // 未登录
    // 数组.includes(值)， 作用：判断是否在数组里出现过，出现过就返回true
    if (whiteList.includes(to.path)) {
      // 未登录 可以访问的路由地址 则放行
      next()
    } else {
    // next强制切换到登录的路径上
      next('/login')
    }
  }
})

export default router
