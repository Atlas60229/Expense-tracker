module.exports = {
    authenticator: (req,res,next) =>{   //  若發出的req需有認證用此函式檢查req中有無isAuthenticated
        if(req.isAuthenticated()) {
            return next()
        }else{
            req.flash('warning_msg',"請先登入再使用")
            res.redirect("/users/login")
        }
    }
}