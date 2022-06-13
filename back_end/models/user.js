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
    orders:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Order',
    }],
    role : {
        type : String,
        default : 'Customer'
    },
    stores : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'store'
    }]

})

const Model = mongoose.model('User', Schema);

module.exports = Model;