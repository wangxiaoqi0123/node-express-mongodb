const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')

const user = require('./router/user.js')
const jwt = require('./utils/token.js')

// 实例化 一个app
const app = express()

// 跨域
app.use(cors())

// 连接数据库
require("./db/content.js")

//处理post请求的数据格式
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//调用静态资源
app.use('/static', express.static(path.join(__dirname, './static')))
app.use(express.static(path.join(__dirname, './dist')))


// 用户
app.use('/user', user)

// 身份验证
// 拦截路由
// app.use('/identity', (req, res, next) => {
//     //身份验证 token 是否有
//     let {
//         token
//     } = req.body

//     jwt.checkToken(token).then(() => {
//         //token 校验成功就放行/*  */
//         next()
//     }).catch(() => {
//         //没有成功就 
//         res.send({
//             msg: "还没登录",
//             code: -2
//         })
//     })
// }, identity)

// 监听端口
app.listen('8181', () => {
    console.log('your server is running')
})