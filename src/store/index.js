import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getUserInfoAPI } from '@/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '', // 第一步 state中定义变量token  保存token字符串
    userInfo: {} // 保存用户信息 （id,username,nickname,email,user_pic）
  },
  getters: {
    // username:(state) =>{
    //   return state.userInfo.username
    // }
    nickname: state => state.userInfo.nickname, // 昵称
    username: state => state.userInfo.username, // 用户名
    user_pic: state => state.userInfo.user_pic // 用户头像
  },
  mutations: {
    // 第二步 定义一个函数  （state里面的，接收到的value值）
    // 用来保存 token
    // 第三步在Login中
    updateToken (state, value) {
      state.token = value
    },
    // 保存用户信息
    updateUserInfo (state, value) {
      state.userInfo = value
    }
  },
  actions: {
    // 请求用户信息
    // async getUserInfoActions (store) {
    //   const res = await getUserInfoAPI()
    //   console.log(res)
    //   store.commit('updateUserInfo', res.data.data)

    getUserInfoActions (store) {
      getUserInfoAPI().then(res => {
        store.commit('updateUserInfo', res.data.data)
      })
    }

  },
  modules: {},
  // 插件
  plugins: [
    createPersistedState() // 注入持久化的插件
  ]
})

// Vuex默认保存在内存中 所以刷新所有的值会回归初始化（无法做到持久存储）
