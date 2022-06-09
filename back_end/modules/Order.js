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
        // type : mongoose.Schema.Types.ObjectId,
        type : String,
        ref:'User',
        // required:true
       
    },
    storeId:{
        // type : mongoose.Schema.Types.ObjectId,
        type : String,
        ref:"Store", 
        // required:true
    },
    serviceInfoId:{
        // type : mongoose.Schema.Types.ObjectId,
        type : String,
        ref:"ServiceInfo",
        // required:true
       
    },
    optionInfo:{
        type : String,
        maxlength:200
    }
    
})

const Model = mongoose.model('Order', Schema);

module.exports = Model;