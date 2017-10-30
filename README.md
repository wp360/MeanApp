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

4. Api生成

5. Postman使用

6. token
`npm install jsonwebtoken --save`

[使用json web token](http://www.haomou.net/2014/08/13/2014_web_token/)