import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '' // 第一步 state中定义变量token  保存token字符串
  },
  getters: {},
  mutations: {
    // 第二步 定义一个函数  （state里面的，接收到的value值）
    // 用来保存 token
    // 第三步在Login中
    updateToken (state, value) {
      state.token = value
    }
  },
  actions: {},
  modules: {},
  // 插件
  plugins: [
    createPersistedState() // 注入持久化的插件
  ]
})

// Vuex默认保存在内存中 所以刷新所有的值会回归初始化（无法做到持久存储）
