<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img src="../../assets/images/logo.png" alt="" />
      <!-- 右侧的菜单 -->
      <el-menu
        class="el-menu-top"
        mode="horizontal"
        background-color="#23262E"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-submenu index="1">
          <template slot="title">
            <!-- 头像 -->
            <img src="../../assets/images/logo.png" alt="" class="avatar" />
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1"
            ><i class="el-icon-s-operation"></i>基本资料</el-menu-item
          >
          <el-menu-item index="1-2"
            ><i class="el-icon-camera"></i>更换头像</el-menu-item
          >
          <el-menu-item index="1-3"
            ><i class="el-icon-key"></i>重置密码</el-menu-item
          >
        </el-submenu>
        <el-menu-item index="2" @click="handleQuit"
          ><i class="el-icon-switch-button"></i>退出</el-menu-item
        >
      </el-menu>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">
        <div class="user-box">
          <img :src="user_pic" alt="" v-if="user_pic" />
          <img src="../../assets/images/logo.png" alt="" v-else />
          <span>欢迎 {{ nickname || username }}</span>
        </div>
        <!-- 导航菜单
          default-active	当前激活菜单的 index
          open	sub-menu 展开的回调
          close	sub-menu 收起的回调
          active-text-color 哪项index的值和default-active一致  就会设置动态文字颜色

          子标签 如果有嵌套先写el-submenu 里面template的title设置当前展示内容 子用 el-menu-item显示
          如果没有嵌套 直接写 el-menu-item
        -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#23262E"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <template v-for="item in menulist">
            <el-menu-item
              v-if="!item.children" :index="item.indexPath" :key="item.indexPath">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
            <el-submenu v-else :index="item.indexPath" :key="item.indexPath+'1'">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item v-for="(data,index) in item.children" :index="data.indexPath" :key="index">
                <i :class="data.icon"></i>
                <span slot="title">{{data.title}}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 页面主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 底部 footer 区域 -->
        <el-footer
          ><a href="https://github.com/WonYves" target="_black"
            >https://github.com/WonYves - EV</a
          ></el-footer
        >
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { getNavAPI } from '@/api'
import { mapMutations, mapGetters } from 'vuex'
export default {
  // 在组件标签上绑定的事件(包括原生事件的名字click，input等等)
  // 都是自定义事件  都需要组件内用$emit 来触发才行
  // 万一这组件内不支持这个原生事件名字
  // 解决： @事件名.native = "methods里方法名"
  // .native 给组件内根标签，绑定这个原生事件
  name: 'my-layout',
  data () {
    return {
      menulist: []
    }
  },
  created () {
    getNavAPI().then((res) => {
      console.log(res.data)
      this.menulist = res.data.data
    })
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },

    ...mapMutations(['updateToken', 'updateUserInfo']),
    // 退出登录 清除vuex 强制跳转页面
    handleQuit () {
      this.$confirm('这就走了吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 选择了确定
          // 清除vuex
          this.updateToken('')
          this.updateUserInfo('')
          // 强制跳转页面
          this.$router.push('/login')
        })
        .catch(() => {
          // 选择了取消
        })
    }
    // async getNavList(){
    //  const res = await getNavAPI() }
  },
  computed: {
    ...mapGetters(['nickname', 'username', 'user_pic'])
  }
}
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #f2f2f2;
  }
  .el-footer {
    background: #d3d7d4;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      text-decoration: none;
      color: black;
    }
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
}
</style>
