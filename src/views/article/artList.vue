<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true" :model="q">
          <el-form-item label="文章分类">
            <el-select
              v-model="q.cate_id"
              placeholder="请选择分类"
              size="small"
            >
              <el-option
                v-for="data in cateList"
                :key="data.id"
                :label="data.cate_name"
                :value="data.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px">
            <el-select v-model="q.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="choseFn"
              >筛选</el-button
            >
            <el-button type="info" size="small" @click="resetFn"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button
          type="primary"
          size="small"
          class="btn-pub"
          @click="showPubDialogFn"
          >发表文章</el-button
        >
      </div>

      <!-- 文章表格区域 -->
      <!-- 文章表格区域 -->
      <el-table :data="artList" style="width: 100%" :border="true" stripe>
        <el-table-column label="文章标题" prop="title">
          <template v-slot="scope">
            <el-link type="primary" @click="handleShowData(scope.row.id)">{{
              scope.row.title
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="分类" prop="cate_name"></el-table-column>
        <el-table-column label="发表时间" prop="pub_date">
          <template v-slot="scope">
            <span>{{ $formatDate(scope.row.pub_date) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="danger" size="mini" @click="removeFn(row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChangeFn"
        @current-change="handleCurrentChangeFn"
        :current-page.sync="q.pagenum"
        :page-sizes="[2, 3, 5, 10]"
        :page-size.sync="q.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 发表文章的 Dialog 对话框 -->
    <el-dialog
      title="发表文章"
      :visible.sync="pubDialogVisible"
      fullscreen
      :before-close="handleClose"
      @close="dialogClose"
    >
      <!-- 发布文章的对话框 -->
      <el-form
        :model="pubForm"
        :rules="pubFormRules"
        ref="pubFormRef"
        label-width="100px"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="pubForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
          <el-select
            v-model="pubForm.cate_id"
            placeholder="请选择分类"
            style="width: 100%"
          >
            <el-option
              v-for="data in cateList"
              :key="data.id"
              :label="data.cate_name"
              :value="data.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <quill-editor
            v-model="pubForm.content"
            @blur="contentChange"
          ></quill-editor>
          <!-- 富文本 -->
        </el-form-item>

        <el-form-item label="文章封面" prop="cover_img">
          <!-- 用来显示封面的图片 -->
          <img
            src="../../assets/images/cover.jpg"
            alt=""
            class="cover-img"
            ref="imgRef"
          />
          <br />
          <!-- 文件选择框，默认被隐藏 -->
          <input
            type="file"
            style="display: none"
            accept="image/*"
            ref="iptFileRef"
            @change="handleChange"
          />
          <!-- 选择封面的按钮 -->
          <el-button type="text" @click="selCoverFn">+ 选择封面</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="pubArticleFn('已发布')"
            >发布</el-button
          >
          <el-button type="info" @click="pubArticleFn('草稿')"
            >存为草稿</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 查看文章详情的对话框 -->
    <el-dialog title="文章预览" :visible.sync="detailVisible" width="80%">
      <h1 class="title">{{ artDetail.title }}</h1>

      <div class="info">
        <span>作者：{{ artDetail.nickname || artDetail.username }}</span>
        <span>发布时间：{{ $formatDate(artDetail.pub_date) }}</span>
        <span>所属分类：{{ artDetail.cate_name }}</span>
        <span>状态：{{ artDetail.state }}</span>
      </div>

      <!-- 分割线 -->
      <el-divider></el-divider>

      <!-- 文章的封面 -->
      <img
        v-if="artDetail.cover_img"
        :src="baseURLR + artDetail.cover_img"
        alt=""
      />

      <!-- 文章的详情 -->
      <div v-html="artDetail.content" class="detail-box"></div>
    </el-dialog>
  </div>
</template>

<script>
import {
  userCateAPI,
  articleAddAPI,
  getArtListAPI,
  getArticleDetailFn,
  delArticleAPI
} from '@/api'

import { baseURL } from '@/utils/request'

// 在标签和css 中引入图片可以写路径 在js中只能通过import方式导入
// 在webpack中会把图片变为一个base64字符串/在打包后的图片临时地址
import myImg from '@/assets/images/cover.jpg'
export default {
  name: 'ArtList',
  data () {
    return {
      baseURLR: baseURL,
      detailVisible: false, // 控制文章详情对话框显示隐藏
      artDetail: [],
      artList: [], // 保存文章列表
      cateList: [], // 保存分类列表
      total: 0, // 保存现有文章的总数
      // 查询参数对象
      q: {
        pagenum: 1, // 默认拿第一页的数据
        pagesize: 2, // 默认当前页需要几条数据(传递给后台后台就返回几个数据)
        cate_id: '', // 文章分类id
        state: '' // 状态
      },
      pubDialogVisible: false, // 控制发布文章对话框出现 / 隐藏
      // 表单数据//
      pubForm: {
        // 表单的数据对象
        title: '', // 文章的名称
        cate_id: '', // 文章分类的id
        content: '', // 文章的内容
        cover_img: '', // 封面图片（保存的是个文件）
        state: '' // 文章的发布状态，可选值有两个：草稿、已发布
      },
      // 表单验证规则
      pubFormRules: {
        // 表单的验证规则对象
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          {
            min: 1,
            max: 30,
            message: '文章标题的长度为1-30个字符',
            trigger: 'blur'
          }
        ],
        cate_id: [
          { required: true, message: '请选择文章标题', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'change' }
        ],
        cover_img: [{ required: true, message: '请选择封面', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 点击事件->让添加文章对话框出现
    showPubDialogFn () {
      this.pubDialogVisible = true
    },
    // 对话框关闭前的回调
    async handleClose (done) {
      // 询问用户是否确认关闭对话框
      const confirmResult = await this.$confirm(
        '此操作将导致文章信息丢失, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)

      // 取消了关闭-阻止住, 什么都不干
      if (confirmResult === 'cancel') return
      // 确认关闭
      done()
    },
    // 获取所有分类
    getList () {
      userCateAPI().then((res) => {
        // console.log(res.data.data);
        this.cateList = res.data.data
      })
    },
    // 获取所有文章列表
    async getartList () {
      const { data: res } = await getArtListAPI(this.q)
      this.artList = res.data // 保存当前获取的文章列表(有分页不是所有的数据)
      this.total = res.total // 保存当前文章的总数
    },
    // 选择封面点击事件  让文件选择窗口出现
    selCoverFn () {
      this.$refs.iptFileRef.click() // js来模拟一次点击事件
    },
    // 用户选择了封面文件
    handleChange (evt) {
      // console.log(evt.target.files);
      const files = evt.target.files
      if (files.length === 0) {
        // 用户没有选择图片 那么把cover_img 置空
        this.pubForm.cover_img = null
        // img 要显示回默认的图片
        this.$refs.imgRef.setAttribute('src', myImg)
      } else {
        // 用户选择了图片 把文件直接保存到表单对象的属性里
        this.pubForm.cover_img = files[0]
        // 把图片文件显示到img标签里
        const url = URL.createObjectURL(files[0])
        //              setAttribute 内置的方法（'属性名'，'赋予的值'）
        this.$refs.imgRef.setAttribute('src', url)

        // 封面的校验
        this.$refs.pubFormRef.validateField('cover_img')
      }
    },
    // 表单里面（点击发布/存为草稿） 点击按钮事件
    pubArticleFn (state) {
      // state 的值 "已发布"，或者 "草稿"（后端要求的参数值）
      this.pubForm.state = state
      this.$refs.pubFormRef.validate((valid) => {
        if (valid) {
          // 都通过
          // console.log(this.pubForm)
          // 准备一个表单数据容器的对象 formdata是h5新出的为了装文件内容和其他参数的一个容器
          const fd = new FormData()
          // 方法 .append("参数名"，值)
          fd.append('title', this.pubForm.title)
          fd.append('cate_id', this.pubForm.cate_id)
          fd.append('content', this.pubForm.content)
          fd.append('cover_img', this.pubForm.cover_img)
          fd.append('state', this.pubForm.state)

          articleAddAPI(fd)
            .then((res) => {
              console.log(res)
              this.$message.success(res.data.message)
              this.getartList()
            })
            .catch((err) => {
              this.$message.error(err.data.message)
            })
        } else {
          // 阻止默认行为
          return false
        }
      })
      // console.log(this.pubForm)
    },
    // 富文本编辑器改变触发事件
    contentChange () {
      this.$refs.pubFormRef.validateField('content')
    },
    // 关闭发布文章时候的事件
    dialogClose () {
      this.$refs.pubFormRef.resetFields()
      this.$refs.imgRef.setAttribute('src', myImg)
    },
    // 分页- 每页条数改变触发
    handleSizeChangeFn (size) {
      // size:当前需要每页显示的条数
      this.q.pagesize = size
      this.q.pagenum = 1
      this.getartList()
    },
    // 当前页码改变时触发
    handleCurrentChangeFn (nowPage) {
      this.q.pagenum = nowPage
      this.getartList()
    },
    // 筛选点击按钮事件
    choseFn () {
      this.q.pagenum = 1
      this.q.pagesize = 2
      this.getartList()
    },
    // 重置点击事件
    resetFn () {
      this.q.pagenum = 1
      this.q.pagesize = 2
      this.q.cate_id = ''
      this.q.state = ''
      this.getartList()
    },
    // 文章标题的点击事件
    async handleShowData (artId) {
      // art:文章的id值
      const res = await getArticleDetailFn(artId)
      this.artDetail = res.data.data
      // console.log(this.artDetail);
      this.detailVisible = true
    },
    // 删除文章按钮的点击事件
    async removeFn (id) {
    // 1. 询问用户是否要删除
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 2. 取消了删除
      if (confirmResult === 'cancel') return

      // 执行删除的操作
      const { data: res } = await delArticleAPI(id)

      if (res.code !== 0) return this.$message.error('删除失败!')
      this.$message.success('删除成功!')
      // 刷新列表数据
      this.getartList()
      if (this.artList.length === 1) {
        if (this.q.pagenum > 1) {
          this.q.pagenum--
        }
      }
    }
  },
  created () {
    this.getList()
    this.getartList()
  }
}
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
}
// 设置图片封面的宽高
.cover-img {
  width: 400px;
  height: 280px;
  object-fit: cover;
}
// 设置富文本编辑器的默认最小高度
// ::v-deep作用: 穿透选择, 正常style上加了scope的话, 会给.ql-editor[data-v-hash]属性, 只能选择当前页面标签或者组件的根标签
// 如果想要选择组件内的标签(那些标签没有data-v-hash值)所以正常选择选不中, 加了::v-deep空格前置的话, 选择器就会变成如下形式
// [data-v-hash] .ql-editor 这样就能选中组件内的标签的class类名了
// Vue提供了一个 ::v-deep样式语法 设置后 可以把属性选择器被自动添加到左侧
::v-deep .ql-editor {
  min-height: 400px;
}

//文章详情
.title {
  font-size: 24px;
  text-align: center;
  font-weight: normal;
  color: #000;
  margin: 0 0 10px 0;
}

.info {
  font-size: 12px;
  span {
    margin-right: 20px;
  }
}

// 修改 dialog 内部元素的样式，需要添加样式穿透
::v-deep .detail-box {
  img {
    width: 500px;
  }
}
</style>
