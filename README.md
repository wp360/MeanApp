## 【开发步骤】
1. 安装依赖
`npm install express body-parser morgan --save`

2. 新建server.js 服务构建

3. 默认数据保存于config.js
```js
module.exports = {
    "database": "",
    "port": process.env.PORT || 3000,
    "secretKey": "你的密钥"
}
```

## 【知识点】

### extended布尔值说明
`app.use(bodyParser.urlencoded({ extended: true}));`
> 解析：返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
### Node 进阶：express 默认日志组件 morgan 从入门使用到源码剖析
[参考链接](http://www.cnblogs.com/chyingp/p/node-learning-guide-express-morgan.html)