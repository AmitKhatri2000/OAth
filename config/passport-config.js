const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const {User} = require("../db/mongodb");

passport.serializeUser((user , done)=>{

 done(null , user.id)   

})

passport.deserializeUser( async(id , done)=>{
const user = await User.findById(id)
done(null , user)  
})

passport.use( new GoogleStrategy({
callbackURL:"/auth/google/redirect",
clientID: process.env.clientID,
clientSecret: process.env.clientSecret

}, async (accessToken , refreshToken , profile , done)=>{

let reg_data = {
username : profile.displayName,  
googleID : profile.id
} 
    
try {
let user = await User.findOne({googleID : profile.id })    
if (user) {    
done(null , user)  
}else{
    user = await User.create(reg_data);
    done(null , user);
}
} catch (error) {
    done(error , null);
}

})
)                       