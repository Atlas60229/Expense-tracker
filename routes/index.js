// const
const express = require('express')
const router = express.Router()
const home = require('./modules/home')

router.use('/', home)       // 將網址結構符合 / 字串的 request 導向 home 模組 

module.exports = router