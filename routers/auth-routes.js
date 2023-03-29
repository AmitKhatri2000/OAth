const passport = require('passport');
const router = require('express').Router();


    router.get('/google' , passport.authenticate('google' , {
     scope:['profile']
    }))


    router.get('/login/status' , (req, res)=>{
        if (req.user){
        res.status(200).json({
            error: false,
            message: "successfull login",
            user : req.user}) 
        }else{
            res.status(403).json({error: true , message: "not authorized"})    
        } 
    })

    router.get('/login/failed' , (req, res)=>{
        res.status(401).json({
            error:true,
            message:"login failed"
         })
    })

    router.get('/google/redirect' , passport.authenticate('google' , {
        successRedirect:process.env.Client_Url,
        failureRedirect:"/login/failed",
    }))  
        

    router.get('/logout' , (req , res)=>{
        req.logout();   
        res.redirect(process.env.Client_Url)
   
    })  
        
module.exports = router;        