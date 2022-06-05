const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:2,
        maxlength:20,
    },
    category: {
        type: String,
        required: true,
        minlength:2,
        maxlength:20,
    },
    storeCode: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true,
        min:0.5,
        max:5,
    },
    maxPersonPerSection: {
        type: Number,
        required: true,
        min:1,
        max:50,
    },
    maxServicePerSection: {
        type: Number,
        required: true,
        min:1,
    },
    description: {
        type: String,
        maxlength:200,
    },
    startTime: {
        type: Object,
        //type: Array,   
        //default: [{"Monday":[]},{"Tuesday":[]},{"Wednesday":[]},{"Thursday":[]},{"Friday":[]},{"Saturday":[]},{"Sunday":[]},
        default: {"Monday":[],"Tuesday":[],"Wednesday":[],"Thursday":[],"Friday":[],"Saturday":[],"Sunday":[]}
    }
},
{
    toJSON: {
        virtuals: true,  
    },
})

const Model = mongoose.model('ServiceInfo', schema);
module.exports = Model;