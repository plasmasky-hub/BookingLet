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
        type : mongoose.Types.ObjectId,
        required:true  
    },
    storeId:{
        type : mongoose.Types.ObjectId,
        required:true  
    },
    serviceInfoId:{
        type : mongoose.Types.ObjectId,
        required:true  
    },
    optionInfo:{
        type : String,
        maxlength:200
    }
    
})

const Model = mongoose.model('Order', Schema);

module.exports = Model;