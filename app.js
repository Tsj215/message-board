/*
项目入口文件
 */
var express = require('express');
var bodyParser = require('body-parser');
var router = require('./router');
var app = express();


//开放 public node_modules 公共资源
app.use('/public/', express.static('./public/'));
app.use('/node_modules/',express.static('./node_modules'));

//配置 body.parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//配置使用 art-template
app.engine('html', require('express-art-template'));

//挂载路由
app.use(router);


app.listen(3000, function () {
    console.log('running at 3000 port')
});

module.exports = app;