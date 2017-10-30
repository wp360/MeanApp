var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');

var app = express();

//mongoose.connect() 版本更新 http://mongoosejs.com/docs/connections.html#use-mongo-client
mongoose.connection.openUri(config.database,function(err){
    if(err){
        console.log(err);
    }else{
        console.log('数据库已经连接成功！');
    }
});

// 此中中间件的作用是获得请求体字符串，然后转成对象赋值给req.body
app.use(bodyParser.urlencoded({ extended: true}));
// 判断请求体格式是不是json格式，如果是的话会调用JSON.parse方法把请求体字符串转成对象
app.use(bodyParser.json());
// 默认日志
app.use(morgan('dev'));

var api = require('./app/routes/api')(app,express);
app.use('/api',api);

app.get('*', function(req,res){
    res.sendFile(__dirname + '/public/views/index.html');
});

app.listen(config.port,function(err){
    if(err){
        console.log(err);
    }else{
        console.log("监听端口 3000");
    }
});