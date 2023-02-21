if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const dataBase = require('../../config/mongoose')
const Category = require('../category')

const CATEGORY = {
    家居物業: '<i class="fa-solid fa-house "></i>',
    交通出行: '<i class="fa-solid fa-van-shuttle "></i>',
    休閒娛樂: '<i class="fa-solid fa-face-grin-beam "></i>',
    餐飲食品: '<i class="fa-solid fa-utensils "></i>',
    其他: '<i class="fa-solid fa-pen"></i>'
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