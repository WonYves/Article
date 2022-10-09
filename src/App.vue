<template>
  <el-button>默认按钮</el-button>
</template>

<script>
import {registerAPI} from '@/api/index'   // 命名导入时引入加大括号  utils/request.js网络请求工具函数, api/index.js定义具体请求的接口方法和传参, 在任意组件调用接口方法请求拿到数据
export default {
  async created(){
    const res = await registerAPI()
    console.log(res);
  }
}
</script>

<style scoped>

</style>