// require 
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const usePassport = require('./config/passport') 
const flash = require('connect-flash')

// 僅在非正式環境時使用 dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const app = express()
const PORT = process.env.PORT || 3000 // PORT會由heroku自動提供到環境
require('./config/mongoose')

//  use
app.use(session({               
    secret: process.env.SESSION_SECRET,
    resave: false,              //  每次使用者發出request時，是否即使 Session 沒做變動，強制重新儲存進 Store。
    saveUninitialized: true     //  是否強制將未初始化的 Session 儲存至 Store。（新產生的 Session）
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(flash())
usePassport(app)

//設定template engine:
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use((req, res, next) => {       //  擺在use(routes)之前，以確定每次發出request給路由時均會通過此函式，看是否有認證過並找到user，若無則res.locals.isAuthenticated及res.locals.user均為undefined
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash("success_msg")
    res.locals.warning_msg = req.flash("warning_msg")
    // console.log(res.locals) 
    next()
})
app.use(routes)

//啟動server
app.listen(PORT, () => {
    console.log(`success initiate Server localhost:${PORT}`)
})
