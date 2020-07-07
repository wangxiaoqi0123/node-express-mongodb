/* 此文件用来写账号密码数据库 的集合 */
const mongoose = require('mongoose')
//设定表单
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        //必填字段
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//创建一个集合
//                      指定 表单(没有就自动创建)
const User = mongoose.model("user", userSchema)

module.exports = User