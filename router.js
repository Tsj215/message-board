/*
路由模块
 */

const express = require('express')
const Msg = require('./model/message')
const router = express.Router()
//渲染首页
router.get('/', (req, res) => {
    Msg.find()
        .then(data => {
            console.log(data)
            res.render('index.html', {comments: data})
        })
        // .then(data => console.log(data))
        .catch(err => console.log(err))
})

//留言页面
router.get('/post', (req, res) => {
    res.render('post.html')
})

//添加留言
router.post('/post', (req, res) => {
    const myDate = new Date()
    const message = req.body
    message.dateTime = myDate.toLocaleString()
    console.log(message)
    new Msg(message).save()
        .then(res.redirect('/'))
        .catch(err => console.log(err))
})

//根据_id删除留言
router.get('/delete', (req, res) => {
    const id = req.query.id.replace(/"/g, '')
    Msg.findByIdAndRemove(id)
        .then(res.redirect('/'))
        .catch(err => console.log(err))
})

module.exports = router