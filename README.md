## 【操作步骤】
1. `npm init`
2. `npm install express body-parser morgan --save`
3. 开启服务
```js
// server.js
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();
app.listen(3000,function(err){
    if(err){
        console.log(err);
    }else{
        console.log('监听端口3000');
    }
});
```
4. config.js设置
```js
module.exports = {
    "database": "数据库地址",
    "port": process.env.PORT || 3000,
    "secretKey": "你的密钥"
}
```
5. 导入参数
```js
// server.js
var config = require('./config');

app.listen(config.port,function(err){
    // ...省略
}
```
## 【git操作】
```javascript
git 分支：
1. 创建分支
git branch dev 创建一个分支
直接输入git branch，不加任何后续参数，就表示让git列出所有已存在的分支。
前面带“星号”的分支表示当前所在的分支。
切换分支到dev: git checkout dev

git commit -a 在分支上提交工作

2. git 打标签
git tag -a v1.0 -m "1.0版本" 或者 git tag v1.0-light
git版本控制文档V2.0  链接： https://git-scm.com/book/zh/v2
```
## 【云数据库MLab】
[云数据库](https://mlab.com)
这块内容在项目：Redux简单实例（增删改查）有提到，这里重新再更新一下。
```javascript
操作步骤：
第一步，注册登陆；
第二步，Create new；
第三步，选择亚马逊，sandBox，免费Free；
第四步，填写数据库名称；
第五步，确定完成；
第六步，点击用户 > Add database user > 会生成弹框 > 直接输入保存即可；
第七步，相关页面数据对接
备注：界面好像有更新 不过操作依旧简便。
云端数据库：
mongodb://<dbuser>:<dbpassword>@ds141175.mlab.com:41175/userstory
```
## 【开发说明】
1. Mongoose
`npm install mongoose --save`

[Mongoose简要API](http://www.cnblogs.com/winyh/p/6682039.html)

2. Schema与Model
> Schema ： 一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
> Model ： 由Schema发布生成的模型，具有抽象属性和行为的数据库操作对
[mongoose - 让node.js高效操作mongodb](http://www.cnblogs.com/aaronjs/p/4489354.html)

3. bcrypt-nodejs对密码加盐 hash
`npm install bcrypt-nodejs --save`

[使用bcrypt进行加密的简单实现](http://www.cnblogs.com/wx1993/p/5250275.html)

[基于Mongoose和bcrypt的密码验证](http://www.html-js.com/article/1522)

### hash密码校验原理
> 虽然对同一个密码，每次生成的hash不一样，但是hash中包含了salt（hash产生过程：先随机生成salt，salt跟password进行hash）；在下次校验时，从hash中取出salt，salt跟password进行hash；得到的结果跟保存在DB中的hash进行比对，compareSync中已经实现了这一过程：bcrypt.compareSync(password, hashFromDB)

4. Api生成
```js
// routes >> api.js
var User = require('../models/user');
var config = require('../../config');
var secretKey = config.secretKey;

module.exports = function(app,express){
    var api = express.Router();
    api.post('/signup',function(req,res){
        var user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });
        user.save(function(err){
            if(err){
                res.send(err);
                return;
            }
            res.json({message:'用户已经生成！'});
        });
    });
}

// server.js 加载解析api
var api = require('./app/routes/api')(app,express);
app.use('/api',api);
```
5. Postman使用

6. token
`npm install jsonwebtoken --save`

[使用json web token](http://www.haomou.net/2014/08/13/2014_web_token/)

[八幅漫画理解使用JSON Web Token设计单点登录系统](http://blog.leapoahead.com/2015/09/07/user-authentication-with-jwt/)

[Node.js+Mongoose的RestfulApi的用户token权限验证](https://github.com/Nicksapp/nAuth-restful-api)

## 备注：
> model.pre 可以是具体业务逻辑的一些数据验证,或者原始数据转换
> schema.pre 跟业务无关的数据操作