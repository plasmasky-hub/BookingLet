const mongoose = require('mongoose');
const Joi = require('joi');
const { object, number } = require('joi');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
      unique: true,
      dropDups: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    location: {
      state: { type: String, required: true },
      city: { type: String, required: true },
      suburb: { type: String },
      street: { type: String, required: true },
      postcode: { type: Number, required: true },
    },
    description: {
      type: String,
      maxlength: 300,
    },
    rootCategories: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'RootCategory',
        required: true,
      },
    ],
    businessHours: {
      Monday: [Number],
      Tuesday: [Number],
      Wednesday: [Number],
      Thursday: [Number],
      Friday: [Number],
      Saturday: [Number],
      Sunday: [Number],
    },
    serviceInfos: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'ServiceInfo',
      },
    ],
    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Order',
      },
    ],
    orderSize: {
      type: Number,
      default: 0,
      min: 0
    },
    favoriteUsers: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    favoriteUsersSize: {
      type: Number,
      default: 0,
      min: 0
    },
    photo: [{
      type: String
    }],
    backgroundPhoto: {
      type: String,
      default: 'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/default.jpg'
    },
    menuPhoto: [{
      type: String
    }],
    isDiscard: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Model = mongoose.model('Store', schema);
module.exports = Model;
