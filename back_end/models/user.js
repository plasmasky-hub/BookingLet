const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    password : {
        type : String,
        min : 6,
        required: true,
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
        ref : 'Store'
    }],
    favouriteStores : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Store'
    }],

})

Schema.methods.hashPassword = async function(){
    this.password = await bcrypt.hashSync(this.password, 10);
}

Schema.methods.validatePassword = async function(password){
    return bcrypt.compare(password, this.password);
}
const Model = mongoose.model('User', Schema);

module.exports = Model;