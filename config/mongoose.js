const mongoose = require('mongoose')


// 資料庫設定

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB
const dataBase = mongoose.connection 


dataBase.on('error',()=>{
    console.log("mongoDB error")
})
dataBase.once('open',()=>{
    console.log('MongoDB connected!')
})

module.exports = dataBase