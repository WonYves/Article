// 封装的是具体的接口请求方法
// 注意 每个方法只负责一个url地址
import request from "@/utils/request";

// 导出接口方法， 为了在逻辑页面引入后调用
export const registerAPI = () => {
  // 原地是一个Promise对象 内部包含原生ajax请求
  // return 这个Promise对象到逻辑层面去 去那边对Promise对象提取结果
  return request({
    url: "/api/reg",
    method: "post",
    data: {
      username: "kerwin33",
      password: "111111",
      repassword: "111111",
    },
  });
};
