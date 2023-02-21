const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const Category = require('../../models/category')



router.get('/', async (req, res) => {
    try {
        let totalAmount = 0
        const userId = req.user._id
        const datas = await Expense.find({ userId, }).lean().sort({ date: "desc" })

        const expenses = await Promise.all((datas.map(async data => {
            totalAmount += data.amount
            const category = await Category.findOne({ _id: data.categoryId })
            data.categoryIcon = category.icon
            data.date = data.date.toISOString().slice(0, 10)
            return data
        })))
        expenses.totalAmount = totalAmount
        res.render('index', { expenses })
    } catch (err) {
        console.log(err)
    }

})

module.exports = router


//計算總金額


//瀏覽首頁
router.post('/search', async (req, res) => {
    try {
        let totalAmount = 0
        const userId = req.user._id
        const allExpenses = await Expense.find({ userId }).lean().sort({ date: 'desc' })
        const search = req.body.search

        if (search === '全部') {
            // search all
            const expenses = await Promise.all(allExpenses.map(async (expense) => {
                const category = await Category.findOne({ _id: expense.categoryId })
                expense.categoryIcon = category.icon
                expense.date = expense.date.toISOString().slice(0, 10)
                totalAmount += expense.amount
                return expense
            }))
            expenses.totalAmount = totalAmount
            res.render('index', { expenses })
        } else {
            // search one
            const categoryItem = await Category.findOne({ name: search })
            const categoryId = categoryItem._id
            const filteredExpenses = allExpenses.filter(expense => { //filter篩選
                return (JSON.stringify(expense.categoryId)) === (JSON.stringify(categoryId))
            })
            const expenses = filteredExpenses.map(expense => {
                expense.categoryIcon = categoryItem.icon
                expense.date = expense.date.toISOString().slice(0, 10)
                totalAmount += expense.amount
                return expense
            })
            expenses.totalAmount = totalAmount
            expenses.categoryName = categoryItem.name
            res.render('index', { expenses })
        }
    }
    catch (error) {
        console.log(error)
    }
})
