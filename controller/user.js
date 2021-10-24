const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    first_name:{type:String,default:null},
    last_name:{type:String,default:null},
    email:{type:String,unique:true},
    mobile:{type:String,default:null},
    password:{type:String,default:null},
    country:{type:String,default:null},
    token:{type:String,default:null},
})

module.exports = mongoose.model("user",Schema);