const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:2,
        maxlength:20,
    },
    storeCodes: {
        type: Array,
        required: true,
    },
    subclass: {
        type: Array,
        required: true,
    }
},
{
    toJSON: {
        virtuals: true,  
    },
})

const Model = mongoose.model('Category', schema);
module.exports = Model;