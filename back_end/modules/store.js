const mongoose = require('mongoose');
const Joi = require('joi');
const { object, number } = require('joi');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
    },
    owner: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
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
        maxlength: 200,
    },
    rootCategories: [{
        type: mongoose.Types.ObjectId,
        ref: 'RootCategory'
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
        ref: 'ServiceInfo'
    }]


},
    {
        toJSON: {
            virtuals: true,
        },
    })

const Model = mongoose.model('Store', schema);
module.exports = Model;