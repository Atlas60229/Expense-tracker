const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const Category = require('../../models/category')

//  新增
router.get('/new', (req, res) => {
    res.render('new')
})

router.post('/new', async (req, res) => {
    try {
        const userId = req.user._id
        const { name, date, amount, category } = req.body
        const categoryId = await Category.findOne({ name: category }) //用name搜尋category,然後create資料
        await Expense.create({
            name, date, amount, categoryId: categoryId._id, userId
        })
        res.redirect('/')
    }
    catch (error) {
        console.log(error)
    }
})

// edit
router.get('/:_id/edit', async (req, res) => {
    const userID = req.user._id
    const _id = req.params._id
    const expense = await Expense.findOne({ _id, userID }).lean()

    const category = await Category.findOne({ _id: expense.categoryId })

    expense.categoryName = category.name
    expense.date = expense.date.toISOString().slice(0, 10)


    res.render('edit', { expense })
})

router.put('/:_id', async (req, res) => {
    try {
        const userID = req.user._id
        const _id = req.params._id
        const { name, date, amount, category } = req.body
        const categoryId = await Category.findOne({ name: category })
        const expense = await Expense.findOne({ _id, userID })
        expense.name = name
        expense.categoryId = categoryId._id
        expense.amount = amount
        expense.date = date
        req.flash('success_msg', '修改完成')
        expense.save(

        )
        res.redirect(`/`)
    } catch (err) {
        console.log(err)
    }
})

// delete
router.delete('/:_id', (req, res) => {
    const userID = req.user._id
    const _id = req.params._id
    return Expense.findOne({ _id, userID })
        .then(expense => expense.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

module.exports = router