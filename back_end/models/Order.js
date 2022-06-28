const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    peopleNumber:{
        type : Number,
        min:1,
        max:100,
        default:1
    },
    orderTime:  {
        date:{type:Date, required:true},
        time:{type:String, required:true}
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
    tel : {
        type : String,
        required : true 
    },
    optionInfo:{
        type : String,
        maxlength:200
    },
    bookingTime:{
        type:Date, 
        default:Date.now
   
    }
    
})

const Model = mongoose.model('Order', Schema);

module.exports = Model;