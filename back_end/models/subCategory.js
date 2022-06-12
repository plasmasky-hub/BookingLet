const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
    },
    parentCategory: {
        type: mongoose.Types.ObjectId,
        ref: 'RootCategory'
    }
},
    {
        toJSON: {
            virtuals: true,
        },
    })

const Model = mongoose.model('SubCategory', schema);
module.exports = Model;