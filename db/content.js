/* 此文件用来连接数据库 */
const mongoose = require('mongoose')

//1. 连接数据库
mongoose.connect('mongodb://localhost/project', {
  useNewUrlParser: true
})

//2. 获取连接对象
const connection = mongoose.connection

//3. 监听连接 , 判断是否成功
connection.once('open', () => {
  console.log("数据库连接成功")
})
connection.on('err', () => {
  console.log("数据库连接失败")
})
//把服务引入到主服务文件