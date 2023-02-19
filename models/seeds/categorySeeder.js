if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const dataBase = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const Category = require('../category')

const CATEGORY = {
    家居物業: "https://fontawesome.com/icons/home?style=solid",
    交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
    休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
    餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
    其他: "https://fontawesome.com/icons/pen?style=solid"
}

dataBase.once('open', async () => {
    try {
        for (const category in CATEGORY) {
            await Category.create({name: category, icon: CATEGORY[category]})
        }
    } catch (err) {
        console.log(err)
    }
    process.exit()
})