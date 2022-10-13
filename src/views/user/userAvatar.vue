<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <div>
      <!-- 图片，用来展示用户选择的头像 -->
      <img
        v-if="!avatar"
        class="the_img"
        src="../../assets/images/avatar.jpg"
        alt=""
      />
      <img v-else :src="avatar" class="the_img" />
      <!-- 按钮区域 -->
      <div class="btn-box">
        <input
          type="file"
          accept="image/*"
          style="display: none"
          ref="iptRef"
          @change="onFileChange"
        />
        <el-button type="primary" icon="el-icon-plus" @click="chooseImg"
          >选择图片</el-button
        >
        <el-button type="success" icon="el-icon-upload" :disabled="avatar === ''" @click="handleLoad">上传头像</el-button
        >
      </div>
    </div>
  </el-card>
</template>

<script>
import { updateAvatarAPI } from '@/api'
export default {
  name: 'UserAvatar',
  data () {
    return {
      avatar: ''
    }
  },
  methods: {
    // 选择图片->点击事件->让选择框出现
    chooseImg () {
      // 模拟点击行为
      this.$refs.iptRef.click()
    },
    // 在选择框中选择图片后触发的改变事件
    onFileChange (e) {
      // 获取用户选择的文件列表（伪数组）
      const files = e.target.files
      if (files.length === 0) {
        // 没有选择图片
        this.avatar = ''
      } else {
        // 选择了图片
        console.log(files[0])
        // 1.使用URL.createObjectURL方法, 把File类型文件, 转成一个Blob类型的纯前端本地的链接

        //  this.avatar =  URL.createObjectURL(files[0])

        // 2. 文件 => base64字符串（此字符串是可以发给后台的）

        // 1. 创建 FileReader 对象
        const fr = new FileReader()
        // 2. 调用 readAsDataURL 函数，读取文件内容
        fr.readAsDataURL(files[0])
        // 3. onload等待把文件读成base64字符串后会触发onload事件函数
        fr.onload = (e) => {
          // 4. 通过 e.target.result 获取到读取的结果，值是字符串（base64 格式的字符串）
          this.avatar = e.target.result
        }
      }
    },

    // async handleLoad(){
    //     const res = await updateAvatarAPI(this.avatar)
    //     console.log(res);
    //     if(res.data.code!==0) return this.$message.error(res.data.message)
    //     this.$message.success(res.data.message)
    //     this.$store.dispatch("getUserInfoActions")
    // }

    handleLoad () {
      updateAvatarAPI(this.avatar).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          this.$message.success(res.data.message)
          this.$store.dispatch('getUserInfoActions')
        }
      }).catch(err => {
        if (err.data.code === 0) {
          this.$message.error(err.data.message)
        }
      })
    }

  }
}
</script>

<style lang="less" scoped>
.btn-box {
  margin-top: 10px;
}
.preview {
  object-fit: cover;
}
.the_img {
  width: 350px;
  height: 350px;
}
</style>
