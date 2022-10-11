<template>
  <!-- 注册页面的整体盒子 -->
  <div class="container">
    <!-- 注册的盒子 -->
    <div class="box">
      <!-- 标题的盒子 -->
      <div class="title"></div>
      <!-- 1.标签样式 2.数据绑定 3.js交互 4.传给后端-->
      <!-- 注册的表单区域 -->
      <!-- 根据设计要求 需要3个输入框和1个注册按钮 1个登录按钮 -->
      <el-form ref="form" :model="form" :rules="rulesObj">
        <!--  //第一步:rules="校验规则对象" -->
        <el-form-item prop="username">
          <!-- 第二步:给每个需要校验的表单域来一个prop -->
          <!-- prop值和v-model绑定的这个属性一一对应 -->
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="form.repassword"
            placeholder="请再次输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="registerFn"
            >注册</el-button
          >
          <el-link type="info" @click="$router.push('/login')">去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 前端绑定数据对象"属性名" 可以直接给要调用的功能接口的"参数名"一致
// 好处：我可以直接把前端对象（带着同名属性和前端的值）发给后端
// import axios from "axios";
import { registerAPI } from '@/api'
export default {
  name: 'my-reg',
  data () {
    // 必须在data内部中定义箭头函数  才能确保this.form正常使用
    const samePwdFn = (rule, value, callback) => {
      if (value !== this.form.password) {
        // 如果验证失败 则调用回调函数 指定一个Error对象
        callback(new Error('两次密码验证输入不一致！'))
      } else {
        // 如果验证成功 则直接调用 callback回调函数即可
        callback()
      }
    }
    return {
      form: {
        // 表单数据对象
        username: '', // 用户名
        password: '', // 密码
        repassword: '' // 确认密码
      },
      rulesObj: {
        // 第三步-定义表单校验规则对对象 包括每一个表单校验的过程
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: '用户名必须是1-10的大小写字母数字',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15的非空字符',
            trigger: 'blur'
          }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15的非空字符',
            trigger: 'blur'
          },
          // 第四步  正则无法判断时 使用验证器 validator 自定义一个校验规则的函数
          { validator: samePwdFn, trigger: 'blur' }
        ]
      }
    }
  },
  // created(){
  //   axios({
  //     data: this.form,
  //   });
  // },
  methods: {
    // 注册的点击事件
    registerFn () {
      // JS兜底校验    内置validate的方法
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 通过校验  拿到v-model绑定的数据 form
          console.log(this.form)
          // 1. 调用注册接口
          // 解构赋值，把axios返回的数据对象里的data字段对应的值保存在res上
          const { data: res } = await registerAPI(this.form)
          console.log(res)
          // 2. 注册失败，提示用户
          if (res.code !== 0) return this.$message.error('用户名被占用，请更换其他用户名！')
          // 3. 注册成功，提示用户
          this.$message.success('注册成功')
          // 4. 跳转到登录页面
          this.$router.push('/login')
        } else {
          return false // 阻止默认提交行为 表单下面的红色提示会自动出现
          // 校验失败
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  background: url(../../assets/images/login_bg.jpg) center;
  background-size: cover;
  height: 100%;
  .box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;
    .title {
      height: 60px;
      background: url("../../assets/images/login_title.png") center no-repeat;
    }
    .btn {
      width: 100%;
    }
  }
}
</style>
