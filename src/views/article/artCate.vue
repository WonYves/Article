<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="handleAdd"
          >添加分类</el-button
        >
      </div>
      <el-table style="width: 100%" :data="catelist" border stripe>
        <el-table-column
          label="序号"
          width="100"
          type="index"
        ></el-table-column>
        <el-table-column label="分类名称" prop="cate_name"></el-table-column>
        <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleUpDate(scope.row)"
              >修改</el-button
            >
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      title="添加文章分类"
      :visible.sync="dialogVisible"
      width="30%"
      @close="onAddClosedFn"
    >
      <el-form
        :rules="addRules"
        ref="addRef"
        label-width="80px"
        :model="addFrom"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="addFrom.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="addFrom.cate_alias"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handlecancel">取 消</el-button>
        <el-button type="primary" @click="handleconfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userCateAPI, userCateAddAPI, updateArtCateAPI } from '@/api'

export default {
  name: 'ArtCate',
  data () {
    return {
      catelist: [],
      dialogVisible: false,
      addFrom: {
        cate_name: '',
        cate_alias: '',
        // 同一个按钮做状态区分
        isEdit: false, //  true 为编辑 false 为新增
        editId: '' // 作唯一区别的Id值
      },
      addRules: {
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          {
            pattern: /^\S{1,10}$/,
            message: '分类名必须是1-10位的非空字符',
            trigger: 'blur'
          }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,15}$/,
            message: '分类别名必须是1-15位的字母数字',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {
    this.getCate()
  },
  methods: {
    async getCate () {
      const res = await userCateAPI()
      console.log(res)
      this.catelist = res.data.data
    },
    // 关闭对话框时候重置对话框数据
    onAddClosedFn () {
      this.$refs.addRef.resetFields()
    },
    // 添加分类弹出对话框
    handleAdd () {
      this.isEdit = false // 变回新增状态标记
      this.editId = '' // id置空
      this.dialogVisible = true
    },
    // 点击取消状态
    handlecancel () {
      this.dialogVisible = false
    },
    // 点击确定添加文章  对话框确定按钮
    handleconfirm () {
      this.$refs.addRef.validate(async (valid) => {
        if (valid) {
          if (this.isEdit) {
            updateArtCateAPI({ id: this.editId, ...this.addFrom })
              .then(res => {
                this.$message.success(res.data.message)
              })
              .catch(err => {
                this.$message.error(err.data.message)
              }
              )
          } else {
            const { data: res } = await userCateAddAPI(this.addFrom)
            if (res.code !== 0) return this.$message.error(res.message)
            this.$message.success(res.message)
          }
          // 重新请求一次文章列表 拿到最新数据 使视图更新
          this.getCate()
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    // 修改分类按钮
    handleUpDate (obj) {
      // obj:{
      //   id,
      //   cate_name,
      //   cate_alias
      // }
      // 变量做状态区分
      this.isEdit = true
      this.editId = obj.id
      console.log(obj)
      // 让弹窗出现
      this.dialogVisible = true
      // 数据回显
      this.addFrom.cate_name = obj.cate_name
      this.addFrom.cate_alias = obj.cate_alias
    }
  }
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
