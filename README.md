# Vue2-文章后台管理系统

## 基于vue-cli 从0开始搭建的登录注册的业务实现流程的后台管理系统

### 下载依赖

```
yarn install
```

### 启动项目

```
yarn serve
```

### 接口文档:[http://m6z.cn/5BjqH8](http://m6z.cn/5BjqH8)

### 项目结构
```
src
├─ App.vue    根组件
├─ api 	
│    └─ index.js      封装请求接口的方法 方便复用  get post put patch delete
├─ assets	            一些默认的文件
├─ main.js  	项目入口文件
├─ router
│    └─ index.js     配置路由 
├─ store
│    └─ index.js	   vuex存储token信息和用户信息
├─ utils
│    └─ request.js   封装请求基地址  方便复用
└─ views
       ├─ article      文章
       │    ├─ artCate.vue    文章分类
       │    └─ artList.vue    文章列表 发布文章等功能
       ├─ home
       │    └─ index.vue      首页 - echarts 图表 
       ├─ layout	
       │    └─ index.vue      侧边栏和顶部区域
       ├─ login
       │    └─ index.vue      登录
       ├─ register
       │    └─ index.vue      注册
       └─ user
              ├─ userAvatar.vue  个人基本资料
              ├─ userInfo.vue     更换头像
              └─ userPwd.vue			重置密码
```
### 功能
```
登录
注册
退出
更换头像
修改邮箱 昵称
重置密码
文章分类 增删改查
文章列表筛选 重置 分页 
发表文章 -  富文本
```
### 展示
![4H}`W2V3RJ)HD3QAPLRA5EV.png](https://cdn.nlark.com/yuque/0/2022/png/32841606/1666076328422-0a58d5a3-c7d0-4fff-9c33-cbfe8514a7dd.png#clientId=u8155d9b4-6d6b-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u85fdcc73&margin=%5Bobject%20Object%5D&name=4H%7D%60W2V3RJ%29HD3QAPLRA5EV.png&originHeight=1048&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=150133&status=done&style=none&taskId=u69284f74-db21-4c83-a8a6-17f70e838f2&title=)![A2%IUV7}%X@4K[87TT980PU.png](https://cdn.nlark.com/yuque/0/2022/png/32841606/1666076328418-d2aae3fd-3898-4efe-a1ba-8f4cb71dd43a.png#clientId=u8155d9b4-6d6b-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u766db8c3&margin=%5Bobject%20Object%5D&name=A2%25IUV7%7D%25X%404K%5B87TT980PU.png&originHeight=1048&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=115336&status=done&style=none&taskId=u497b162c-f2c0-4aba-ae98-876c4df8d8a&title=)![DH$PLJVW8AP@V)]92IKME90.png](https://cdn.nlark.com/yuque/0/2022/png/32841606/1666076328870-2be20ed9-d801-4a4c-af34-3d4b47746bda.png#clientId=u8155d9b4-6d6b-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u61e0c987&margin=%5Bobject%20Object%5D&name=DH%24PLJVW8AP%40V%29%5D92IKME90.png&originHeight=1048&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=170233&status=done&style=none&taskId=u0995c9cf-48c8-4f16-ae09-46ebde3dcbd&title=)![HKY@)%EVQPUS){KT$KA2O_T.png](https://cdn.nlark.com/yuque/0/2022/png/32841606/1666076328386-eb41f6ba-b869-467b-8e03-b28437b9e054.png#clientId=u8155d9b4-6d6b-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u2d1f0704&margin=%5Bobject%20Object%5D&name=HKY%40%29%25EVQPUS%29%7BKT%24KA2O_T.png&originHeight=547&originWidth=943&originalType=binary&ratio=1&rotation=0&showTitle=false&size=54000&status=done&style=none&taskId=ufb29ed94-6da3-48cf-bfb2-8ea78829a40&title=)![LK17N6EY]{P`YE0472H8LMY.png](https://cdn.nlark.com/yuque/0/2022/png/32841606/1666076328498-45545011-6917-458e-95cf-4ab3d5996738.png#clientId=u8155d9b4-6d6b-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u967d8167&margin=%5Bobject%20Object%5D&name=LK17N6EY%5D%7BP%60YE0472H8LMY.png&originHeight=953&originWidth=1898&originalType=binary&ratio=1&rotation=0&showTitle=false&size=247189&status=done&style=none&taskId=ucb1155c5-4077-4879-872c-67bf8b0090f&title=)![V$7XG3DJMZMEC80[EHG8`~O.png](https://cdn.nlark.com/yuque/0/2022/png/32841606/1666076329058-5be71004-32ac-4601-b2fe-c1328987990c.png#clientId=u8155d9b4-6d6b-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u302df4fd&margin=%5Bobject%20Object%5D&name=V%247XG3DJMZMEC80%5BEHG8%60~O.png&originHeight=404&originWidth=464&originalType=binary&ratio=1&rotation=0&showTitle=false&size=44983&status=done&style=none&taskId=uead3f909-b90a-4c48-9a03-806447daa81&title=)![W@[1F8A7F3U]77I$SG@0AO9.png](https://cdn.nlark.com/yuque/0/2022/png/32841606/1666076329364-8203c14f-2518-4751-a4ab-498ed27fcd96.png#clientId=u8155d9b4-6d6b-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u07d0b655&margin=%5Bobject%20Object%5D&name=W%40%5B1F8A7F3U%5D77I%24SG%400AO9.png&originHeight=649&originWidth=912&originalType=binary&ratio=1&rotation=0&showTitle=false&size=58823&status=done&style=none&taskId=u04e5d802-ed17-4d0f-9508-89f403982d6&title=)![X%Z]GMP{S1CUSALL763)Y60.png](https://cdn.nlark.com/yuque/0/2022/png/32841606/1666076329509-94b19f9e-e9d2-42c8-a227-abab5223b117.png#clientId=u8155d9b4-6d6b-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u7293167e&margin=%5Bobject%20Object%5D&name=X%25Z%5DGMP%7BS1CUSALL763%29Y60.png&originHeight=1048&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=206524&status=done&style=none&taskId=ud5f1831f-41bd-46ed-803d-ba7b83e8a59&title=)
