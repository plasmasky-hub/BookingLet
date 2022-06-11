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
    bookingStatus: {
        type : Boolean,
        default:false
    },
    cancelStatus: {
        type : Boolean,
        default:false
    },
    userId:{
        type : String,
        required:true  
    },
    storeId:{
        type : String,
        required:true  
    },
    serviceInfoId:{
        type : String,
        required:true  
    },
    optionInfo:{
        type : String,
        maxlength:200
    }
    
})

const Model = mongoose.model('Order', Schema);

module.exports = Model;