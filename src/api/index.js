// 封装的是具体的接口请求方法
// 注意 每个方法只负责一个url地址
import request from '@/utils/request'
// 导出接口方法， 为了在逻辑页面引入后调用
export const registerAPI = (obj) => {
  // 原地是一个Promise对象 内部包含原生ajax请求
  // return 这个Promise对象到逻辑层面去 去那边对Promise对象提取结果
  return request({
    url: '/api/reg',
    method: 'POST',
    // axios 的参数 parmas data
    // parmas 的对象参数名和值 axios源码会把参数和值，拼接在url?后面给后台  (query 查询字符串)
    // data 的对象参数名和值 ，axios源码会把参数和值，拼接在请求体里(body参数)
    data: obj
    // data:{username,
    // password,
    // repassword}
  })
}
/**
 *
 * @param {*} param0 {username:用户名 password:密码}
 * @returns
 */
export const loginAPI = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

/**
 *
 * @returns 获取用户信息
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/my/userinfo'
    // 传参给后台  parmas传的是查询字符串query data传的是body请求体 header传的请求头
  })
}

/**
 * 获取侧边栏数据
 */

export const getNavAPI = () => {
  return request({
    url: '/my/menus'
  })
}

/**
 *
 * @param {*} param0
 * @returns 更新基本资料
 */
export const upDateInfoAPI = ({ id, username, nickname, email, user_pic }) => {
  return request({
    url: '/my/userinfo',
    method: 'PUT',
    data: {
      id,
      username,
      nickname,
      email,
      user_pic
    }
  })
}

/**
 *
 * @param {*} avatar
 * @returns 更新用户头像
 */

export const updateAvatarAPI = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'PATCH',
    data: {
      avatar
    }
  })
}

/**
 * 更改密码
 * @param {*} param0
 * @returns  promise对象
 */
export const userPwdAPI = ({ old_pwd, new_pwd, re_pwd }) => {
  return request({
    url: '/my/updatepwd',
    method: 'PATCH',
    data: {
      old_pwd,
      new_pwd,
      re_pwd
    }
  })
}

/**
 * 获取-文章分类
 * @returns
 */
export const userCateAPI = () => {
  return request({
    url: '/my/cate/list'
  })
}

/**
 * 增加-文章分类
 * @param {*} param0
 * @returns
 */
export const userCateAddAPI = ({ cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/add',
    method: 'post',
    data: {
      cate_name,
      cate_alias
    }
  })
}

/**
 * 更新-文章分类
 * @param {*} param0   {id:文章分类id，cate_name：文章分类名称, cate_alias：文章分类别名}
 * @returns   promise对象
 */
export const updateArtCateAPI = ({ id, cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/info',
    method: 'PUT',
    data: {
      id,
      cate_name,
      cate_alias
    }
  })
}

/**
 * 删除-文章分类
 * @param {*} id   文章分类id
 * @returns  promise对象
 */
export const deleteCateAPI = (id) => {
  return request({
    url: '/my/cate/del',
    method: 'DELETE',
    params: {
      id
    }
  })
}

/**
 * // 发布文章
 * @param {*} fd   表单数据对象
 * @returns  promise对象
 */
export const articleAddAPI = (fd) => {
  return request({
    url: '/my/article/add',
    method: 'post',
    data: fd
    // {} 如果是一个普通对象 axios会把他转成json的字符串在请求体里交给后台
    // 这边后端需求是form-data 类型 表单数据对象 携带文件给后端
  })
}

/**
 * 获取-文章列表
 * @param {*} param0  {pagenum 当前页码,pagesize 当前需要的数据条数,cate_id 文章分类id,state 文章状态}
 * @returns promiese对象
 */
export const getArtListAPI = ({ pagenum, pagesize, cate_id, state }) => {
  return request({
    url: '/my/article/list',
    params: {
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })
}

/**
 * 获取-文章详情
 * @param {*} id 文章id
 * @returns Promise对象
 */
export const getArticleDetailFn = (id) => {
  return request({
    url: '/my/article/info',
    params: {
      id
    }
  })
}

/**
 * 删除-文章
 * @param {*} id 文章详情的id
 * @returns
 */
export const delArticleAPI = (id) => {
  return request({
    url: '/my/article/info',
    method: 'DELETE',
    params: {
      id
    }
  })
}
