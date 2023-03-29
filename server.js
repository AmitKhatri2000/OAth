require("./db/mongodb");
require("./config/passport-config");
const express = require('express');
const parser = require('body-parser');
const path  = require('path');
const app = express();
const port = process.env.PORT||3000;
const authRoutes  = require('./routers/auth-routes');

const cors = require('cors');

app.use(cors({ origin: 'http://localhost:5173',
methods:"GET,PUT,POST,DELETE",
credentials: true}))

app.use(express.static(path.join(__dirname , "./client/dist")));
const cookieSession = require('cookie-session');
const passport = require("passport");
// parse application/x-www-form-urlencoded
app.use(parser.urlencoded({ extended: false }));
// parse application/json
app.use(parser.json());

app.use(cookieSession({
name:"session",    
maxAge:24*60*60*1000,
keys:[process.env.cookieKey]
}))

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth" , authRoutes);

app.get('*' , (req , res)=>{
res.sendFile(path.join(__dirname , "./client/dist/index.html"));

})

app.listen( port , ()=>console.log("connected to port:" + port ))