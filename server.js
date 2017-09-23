var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');

var app = express();
// 此中中间件的作用是获得请求体字符串，然后转成对象赋值给req.body
app.use(bodyParser.urlencoded({ extended: true}));
// 判断请求体格式是不是json格式，如果是的话会调用JSON.parse方法把请求体字符串转成对象
app.use(bodyParser.json());
// 默认日志
app.use(morgan('dev'));

app.get('*', function(req,res){
    res.sendFile(__dirname + '/public/views/index.html');
});

app.listen(3001,function(err){
    if(err){
        console.log(err);
    }else{
        console.log("监听端口 3001");
    }
});