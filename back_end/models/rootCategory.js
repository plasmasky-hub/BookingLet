const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
    }
},
    {
        toJSON: {
            virtuals: true,
        },
    })

const Model = mongoose.model('RootCategory', schema);
module.exports = Model;