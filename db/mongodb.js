const mongoose = require('mongoose');

    mongoose.connect("mongodb+srv://amit_client:LKR4vptfznjU9qIG@cluster0.dfs0d.mongodb.net/passport?retryWrites=true&w=majority").then(()=>{
        console.log("connected to database");
    }).catch((err)=>{
        console.log(err);
    })


const userschema =  new mongoose.Schema({

    username: String,
    googleID: String,

})

exports.User = mongoose.model("User" , userschema);