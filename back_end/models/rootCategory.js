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
    photo: {
        type: String
    },
    backgroundPhoto: {
        type: String,
        default: 'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/rachel-park-hrlvr2ZlUNk-unsplash.jpg'
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

const Model = mongoose.model('RootCategory', schema);
module.exports = Model;