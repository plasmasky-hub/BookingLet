const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    peopleNumber:{
        type : Number,
        default:1
    },
    orderTime: {
        type : String,
        required : true
    },
    status: {
        type : Boolean,
        default:false
    },
    // userId:{
    //     type : String,
    //     required : true
    // },
    // storeId:{
    //     type : String,
    //     required : true
    // },
    // serviceId:{
    //     type : String,
    //     required : true
    // }
    // optionInfo:{
    //     type : String,
    //     maxLength:
    // }
    //
})

const Model = mongoose.model('Order', Schema);

module.exports = Model;