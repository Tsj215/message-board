const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/message', {useNewUrlParser: true})

const connection = mongoose.connection

connection.on('connected', function () {
    console.log('mongodb连接成功')
})

const Schema = mongoose.Schema

const msgSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    dateTime: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Message', msgSchema)


