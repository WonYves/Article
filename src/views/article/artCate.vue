<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="handleAdd"
          >添加分类</el-button
        >
      </div>
      <el-table style="width: 100%" :data="catelist" :border="true" stripe>
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
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
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
import { userCateAPI, userCateAddAPI, updateArtCateAPI, deleteCateAPI } from '@/api'

export default {
  name: 'ArtCate',
  data () {
    return {
      // 接受数据列表
      catelist: [],
      // 默认关闭对话框
      dialogVisible: false,
      // from数据绑定
      addFrom: {
        cate_name: '',
        cate_alias: '',
        // 同一个按钮做状态区分
        isEdit: false, //  true 为编辑 false 为新增
        editId: '' // 作唯一区别的Id值
      },
      // 制定from校验规则
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
    // 获取数据进行页面渲染

    async getCate () {
      const res = await userCateAPI()
      // console.log(res)
      this.catelist = res.data.data
    },

    // getCate(){
    //   userCateAPI().then(res=>{
    //     this.catelist = res.data.data
    //   })
    // },

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

      // 让el-dialog第一次挂载el-from时 先用addform空字符串的初始值绑定到内部后续用作resetfields重置
      // 所以让真实DOM先创建 并在内部绑定好'复制'好初始值

      // 接着等数据绑定好了 再给数据回显
      this.$nextTick(() => {
        this.addFrom.cate_name = obj.cate_name
        this.addFrom.cate_alias = obj.cate_alias
      })
    },
    // 删除分类-按钮点击
    // async handleDelete(obj){
    //   const {data:res} = await deleteCateAPI(obj.id)
    //   if(res.code !==0) return this.$message.error(res.message)
    //   this.$message.success(res.message)
    //   //删除后再去后台调用最新的数据列表
    //   this.getCate()
    // },

    handleDelete (obj) {
      deleteCateAPI(obj.id).then(res => {
        if (res.data.code === 0) {
          this.$message.success(res.data.message)
        }
      }).then(res => {
        this.getCate()
      })
    }
  }
}

// 小bug
// 在第一次打开网页的时候 文章分类 先点击修改 再点击新增  发现输入框有值
// 原因 点击修改后 关闭对话框的时候 置空失效了
// 具体分析：resetFields有问题： 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
// 线索：Dialog 的内容是懒渲染的，即在第一次被打开之前，传入的默认 slot 不会被渲染到 DOM 上。因此，如果需要执行 DOM 操作，或通过 ref 获取相应组件，请在 open 事件回调中进行。
// vue数据改变（先执行同步所有代码） 再去更新DOM（异步代码）
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
