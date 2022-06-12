const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    rootCategory: {
        type: mongoose.Types.ObjectId,
        ref: 'RootCategory'
    },
    subCategories: [{
        type: mongoose.Types.ObjectId,
        ref: 'SubCategory'
    }],
    store: {
        type: mongoose.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    duration: {
        type: Number,
        required: true,
        min: 0.5,
        max: 5,
    },
    maxPersonPerSection: {
        type: Number,
        required: true,
        min: 1,
        max: 200,
    },
    maxServicePerSection: {
        type: Number,
        required: true,
        min: 1,
    },
    description: {
        type: String,
        maxlength: 200,
    },
    startTime: {
        Monday: { type: Array },
        Tuesday: { type: Array },
        Wednesday: { type: Array },
        Thursday: { type: Array },
        Friday: { type: Array },
        Saturday: { type: Array },
        Sunday: { type: Array }
        //default: { "Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [], "Friday": [], "Saturday": [], "Sunday": [] }
    }
},
    {
        toJSON: {
            virtuals: true,
        },
    })

const Model = mongoose.model('ServiceInfo', schema);
module.exports = Model;