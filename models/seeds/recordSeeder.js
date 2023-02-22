if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const dataBase = require('../../config/mongoose')
const Category = require('../category')
const User = require('../user')
const Expense = require('../expense')
const bcrypt = require('bcryptjs')

const seedUser = [
    {
        name: '廣志',
        email: 'user1@example.com',
        password: '12345678',
        expensesIndexes: [0, 1, 2, 4],
    }, {
        name: '小新',
        email: 'user2@example.com',
        password: '12345678',
        expensesIndexes: [3]
    }
]

const seedExpenses = [
    {
      name: "午餐",
      date: "2019-04-23",
      category: "餐飲食品",
      amount: 60
    },
    {
      name: "晚餐",
      date: "2019-04-23",
      category: "餐飲食品",
      amount: 60
    },
    {
        name: "捷運",
        date: "2019-04-23",
        category: "交通出行",
        amount: 120
    },
    {
        name: "電影：驚奇隊長",
        date: "2019-04-23",
        category: "休閒娛樂",
        amount: 220
    },
    {
      name: "租金",
      date: "2019-04-01",
      category: "其他",
      amount: 25000
    }
  ]

dataBase.once('open', async () => {
    try {
        for (const user of seedUser) {
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(user.password, salt)
            const createdUser = await User.create({name: user.name, email: user.email, password: hash})
            const expensesIndexes = user.expensesIndexes
            for (const index of expensesIndexes){
                let seedExpense = seedExpenses[index]
                
                const expenseCategory = await Category.findOne({ name: seedExpense.category })
                await Expense.create({
                    name: seedExpense.name,
                    date: seedExpense.date,
                    amount: seedExpense.amount,
                    userId: createdUser._id,
                    categoryId: expenseCategory._id
                })
            }
            
        }
    } catch (err) {
        console.log(err)
    }
    process.exit()
})