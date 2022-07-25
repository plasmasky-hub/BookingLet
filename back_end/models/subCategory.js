const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        unique: true,
        dropDups: true
    },
    parentCategory: {
        type: mongoose.Types.ObjectId,
        ref: 'RootCategory',
        required: true
    },
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

const Model = mongoose.model('SubCategory', schema);
module.exports = Model;