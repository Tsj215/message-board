/*
* 路由配置
* */
var express = require('express');
var routerDb = express.Router();
var fs = require('fs');

var myDate = new Date();

//渲染首页
routerDb.get('/', function (req, res) {
    fs.readFile('./db.json', 'utf8', function (err, data) {
        if (err) {
            throw err
        } else {
            var db = JSON.parse(data);
            res.render('index.html', {
                comments: db.comments
            });
        }
    })
});

//留言页面
routerDb.get('/post', function (req, res) {
    res.render('post.html')
});

//添加留言
routerDb.post('/post', function (req, res) {
    //读物文件 db.json
    fs.readFile('./db.json', 'utf8', function (err, data) {
        if (err) {
            throw err
        } else {
            // 获取用户提交的数据并附上时间
            var comments = req.body;
            comments.dateTime = myDate.toLocaleString();

            //读取 db.json 文件的内容并转换成对象
            var updateFile = JSON.parse(data);

            //更新文件 将客户端提交的数据加入 db.json
            updateFile.comments.unshift(comments);

            //将更新后的文件转换成字符串类型
            var fileData = JSON.stringify(updateFile);

            //将文件重新写入 db.json
            fs.writeFile('./db.json', fileData, function (err) {
                if (err) {
                    throw err
                } else {
                    console.log("写入成功");
                }
            });
        }
    });
    //重定向到 / 页面
    res.redirect('/')
});

module.exports = routerDb;