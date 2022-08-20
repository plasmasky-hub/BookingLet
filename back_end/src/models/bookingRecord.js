const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
    serviceInfoId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    storeId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    weekMonday: {
        type: Date,
        required: true
    },
    serviceHours: {
        Monday: [{
            timeSlice: {
                type: Number,
                max: 2355,
                min: 0
            },
            reservation: {
                type: Number,
                default: 0
            },
            availability: {
                type: Boolean,
                default: true
            }
        }],
        Tuesday: [{
            timeSlice: {
                type: Number,
                max: 2355,
                min: 0
            },
            reservation: {
                type: Number,
                default: 0
            },
            availability: {
                type: Boolean,
                default: true
            }
        }],
        Wednesday: [{
            timeSlice: {
                type: Number,
                max: 2355,
                min: 0
            },
            reservation: {
                type: Number,
                default: 0
            },
            availability: {
                type: Boolean,
                default: true
            }
        }],
        Thursday: [{
            timeSlice: {
                type: Number,
                max: 2355,
                min: 0
            },
            reservation: {
                type: Number,
                default: 0
            },
            availability: {
                type: Boolean,
                default: true
            }
        }],
        Friday: [{
            timeSlice: {
                type: Number,
                max: 2355,
                min: 0
            },
            reservation: {
                type: Number,
                default: 0
            },
            availability: {
                type: Boolean,
                default: true
            }
        }],
        Saturday: [{
            timeSlice: {
                type: Number,
                max: 2355,
                min: 0
            },
            reservation: {
                type: Number,
                default: 0
            },
            availability: {
                type: Boolean,
                default: true
            }
        }],
        Sunday: [{
            timeSlice: {
                type: Number,
                max: 2355,
                min: 0
            },
            reservation: {
                type: Number,
                default: 0
            },
            availability: {
                type: Boolean,
                default: true
            }
        }],

    },

},
    {
        toJSON: {
            virtuals: true,
        },
    })

const Model = mongoose.model('BookingRecord', schema);
module.exports = Model;