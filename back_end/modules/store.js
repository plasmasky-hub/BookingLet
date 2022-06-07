const mongoose = require('mongoose');
const Joi = require('joi');

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
    rootCategory: [{
        type: mongoose.Types.ObjectId,
        ref: 'RootCategory'
    }],
    subCategory: [{
        type: mongoose.Types.ObjectId,
        ref: 'SubCategory'
    }],
    serviceInfo: [{
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