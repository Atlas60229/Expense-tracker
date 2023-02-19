const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/facebook', passport.authenticate('facebook', {
    scope: ["email", "public_profile"]
    
}))
// 可要求的權限：https://developers.facebook.com/docs/permissions/reference#reference-business_management

router.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/users/login'
}), (req,res)=>{
    res.redirect('/')
    
})

module.exports = router