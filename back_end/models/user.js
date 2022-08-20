const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true // mongoose 校验
    },
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
    },
    password: {
        type: String,
        min: 6,
        required: true,
    },
    photo: {
        type: String,
        default: 'https://jr-bookinglet-2.s3.ap-southeast-2.amazonaws.com/user-avatar/BookingletDefaultUser.png'
    },
    location: {
        state: { type: String },
        city: { type: String },
        postcode: { type: Number },
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    }],
    role: {
        type: String,
        enum: ['Customer', 'Business owner', 'Administrator'],
        default: 'Customer'
    },
    stores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    }],
    favoriteStores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    }],

})

Schema.methods.hashPassword = async function () {
    this.password = await bcrypt.hashSync(this.password, 10);
}

Schema.methods.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}
const Model = mongoose.model('User', Schema);

module.exports = Model;