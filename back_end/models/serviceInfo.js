const mongoose = require('mongoose');
const Joi = require('joi');
const { boolean } = require('joi');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        unique: true,
        dropDups: true
    },
    rootCategory: {
        type: mongoose.Types.ObjectId,
        ref: 'RootCategory',
        required: true
    },
    subCategories: [{
        type: mongoose.Types.ObjectId,
        ref: 'SubCategory'
    }],
    store: {
        type: mongoose.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    duration: {
        type: Number,
        required: true,
        min: 0.5,
        max: 5,
        default: 1
    },
    maxPersonPerSection: {
        type: Number,
        required: true,
        min: 1,
        max: 1000,
        default: 1
    },
    maxServicePerSection: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    price: {
        type: Number,
        min: 0,
        max: 9999
    },
    description: {
        type: String,
        maxlength: 300,
    },
    startTime: [{
        dayOfWeek: String,
        openHours: [String]
    }],
    calendarTemplate: {
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
    isDuration: {
        type: Boolean,
        default: true
    },
    latestAutoUpdate: Date,
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

const Model = mongoose.model('ServiceInfo', schema);
module.exports = Model;