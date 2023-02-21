const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {  // 執行passport中的 local strategy認證
    successRedirect: '/',
    failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (!name || !email || !password || !confirmPassword) {
        errors.push({ message: '所有欄位都是必填。' })
    }
    if (password !== confirmPassword) {
        errors.push({ message: '密碼與確認密碼不相符！' })
    }
    if (errors.length) {
        return res.render('register', {
            errors,
            name,
            email,
            password,
            confirmPassword
        })
    }
    try {
        let user = await User.findOne({ email })
        if (user) {
            errors.push({ message: '這個 Email 已經註冊過了。' })
            return res.render('register', {
                errors,
                name,
                email,
                password,
                confirmPassword
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        user = await User.create({
            name,
            email,
            password: hash,
        })
        res.redirect('/')
    }catch{
        (err => console.log(err))
    } 

})


router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return next(err)
        }
        req.flash('success_msg', "已成功登出")
        res.redirect('/users/login')
    })
})

module.exports = router
