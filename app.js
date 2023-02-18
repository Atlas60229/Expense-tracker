// require 
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

// 僅在非正式環境時使用 dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const app = express()
const PORT = 3000

//  use
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//設定template engine:
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(routes)

//啟動server
app.listen(PORT, () => {
    console.log(`success initiate Server localhost:${PORT}`)
})
