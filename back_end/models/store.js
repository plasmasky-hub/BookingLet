const mongoose = require('mongoose');
const Joi = require('joi');
const { object, number } = require('joi');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tel: {
        type: String,
        required: true,
    },
    location: {
        state: { type: String, required: true },
        city: { type: String, required: true },
        suburb: { type: String, required: true },
        street: { type: String, required: true },
        number: { type: String, required: true },
        postcode: { type: Number, required: true }
    },
    description: {
        type: String,
        maxlength: 300,
    },
    rootCategories: [{
        type: mongoose.Types.ObjectId,
        ref: 'RootCategory',
        required: true
    }],
    subCategories: [{
        type: mongoose.Types.ObjectId,
        ref: 'SubCategory'
    }],
    serviceInfos: [{
        type: mongoose.Types.ObjectId,
        ref: 'ServiceInfo'
    }],
    orders: [{
        type: mongoose.Types.ObjectId,
        ref: 'Order'
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

const Model = mongoose.model('Store', schema);
module.exports = Model;