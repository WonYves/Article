import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
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

export default router
