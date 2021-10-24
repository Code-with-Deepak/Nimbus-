const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    ctitle:{type:String},
    cdesc:{type:String},
    ccat:{type:String},
    cdur:{type:String},
    pr:{type:String},
})

module.exports = mongoose.model("course",Schema);