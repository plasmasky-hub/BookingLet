const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    peopleNumber:{
        type : Number,
        default:1
    },
    orderTime: {
        type : String,
        // required : true
    },
    status: {
        type : Boolean,
        default:false
    },
    userId:{
        // type : mongoose.Schema.Types.ObjectId,
        // ref:"User",
        type : String,
       
    },
    storeCode:{
        // type : mongoose.Schema.Types.ObjectId,
        // ref:"Store" 
        type : String,
    },
    serviceInfoId:{
        // type : mongoose.Schema.Types.ObjectId,
        // ref:"ServiceInfo"
        type : String,
       
    },
    optionInfo:{
        type : String,
        maxlength:200
    }
    
})

const Model = mongoose.model('Order', Schema);

module.exports = Model;