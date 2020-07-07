const jwt = require('jsonwebtoken')

//1. 定义一个私钥
//东西随便写
const secret = "xiaobu66"

//生成 token 的函数
function createToken(data) {
    return jwt.sign(data, secret)
}

//验证 token 的函数
function checkToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, data) => {
            if (err) {
                reject("校验失败")
            } else {
                resolve(data)
            }
        })
    })
}

module.exports = {
    createToken,
    checkToken
}