// 封装的是具体的接口请求方法
// 注意 每个方法只负责一个url地址
import request from "@/utils/request";

// 导出接口方法， 为了在逻辑页面引入后调用
export const registerAPI = (obj) => {
  // 原地是一个Promise对象 内部包含原生ajax请求
  // return 这个Promise对象到逻辑层面去 去那边对Promise对象提取结果
  return request({
    url: "/api/reg",
    method: "post",
    //axios 的参数 parmas data
    //parmas 的对象参数名和值 axios源码会把参数和值，拼接在url?后面给后台  (query 查询字符串)
    //data 的对象参数名和值 ，axios源码会把参数和值，拼接在请求体里(body参数)
    data: obj,
    // data:{username,
    // password,
    // repassword}

  });
};


