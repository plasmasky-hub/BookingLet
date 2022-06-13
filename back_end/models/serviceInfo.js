const mongoose = require('mongoose');
const Joi = require('joi');
const { boolean } = require('joi');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    rootCategory: {
        type: mongoose.Types.ObjectId,
        ref: 'RootCategory',
        required: true
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
        default: 1
    },
    maxPersonPerSection: {
        type: Number,
        required: true,
        min: 1,
        max: 1000,
        default: 1
    },
    maxServicePerSection: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    description: {
        type: String,
        maxlength: 300,
    },
    startTime: [{
        dayOfWeek: String,
        openHours: [String]
    }],
    isDiscard: {
        type: Boolean,
        default: false
    }

},
    {
        toJSON: {
            virtuals: true,
        },
    })

const Model = mongoose.model('ServiceInfo', schema);
module.exports = Model;