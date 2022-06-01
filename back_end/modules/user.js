const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    tel : {
        type : String,
        required : true // mongoose 校验
    },
    email : {
        type : String,
        required : true 
    },
})

const Model = mongoose.model('User', Schema);

module.exports = Model;