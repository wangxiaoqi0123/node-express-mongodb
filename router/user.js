const express = require('express')

const userModle = require('../db/model/user.js')
const jwt = require('../utils/token.js')

//实例化
const router = express.Router()

// 普通登录验证
router.post('/register', (req, res) => {
  let {
    username,
    password
  } = req.body

  // 验证用户在数据库中存不存在
  userModle.find({
    username
  })
    .then((data) => {
      // 如果查询的数组为空 说明用户不存在
      if (data.length) {
        res.send({
          code: -1,
          msg: "账户已存在"
        })

      } else {
        return userModle.insertMany({
          username,
          password
        })
      }
    })
    .then((data) => {
      if (data) {
        res.send({
          code: 1,
          msg: "注册成功"
        })
      }
    })
    .catch((err) => {
      // console.log(err)
      res.send({
        code: -1,
        msg: "内部错误"
      })
    })
})

// 用户注册
router.post('/login', (req, res) => {
  let {
    username,
    password
  } = req.body
  userModle.find({
    username
  })
    .then((data) => {
      if (data.length) {
        if (data[0].password == password) {
          // 生成token
          let token = jwt.createToken({
            username,
            password
          })
          res.send({
            code: 1,
            msg: "登录成功",
            token
          })
        } else {
          res.send({
            code: -1,
            msg: "密码错误"
          })
        }
      } else {
        res.send({
          code: -1,
          msg: "用户不存在"
        })
      }
    })
    .catch((err) => {
      // console.log(err);
      res.send({
        code: -1,
        msg: "内部错误"
      })
    })
})



//模块导出
module.exports = router