const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  peopleNumber: {
    type: Number,
    min: 1,
    max: 100,
    default: 1,
  },
  orderTime: {
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    timestamp: { type: Date, required: true }
  },
  bookingStatus: {
    type: Boolean,
    default: false,
  },
  cancelStatus: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  storeId: {
    type: mongoose.Types.ObjectId, //可删
    ref: 'Store',
    // required:true
  },
  serviceInfoId: {
    type: mongoose.Types.ObjectId,
    ref: 'ServiceInfo',
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  optionInfo: {
    type: String,
    maxlength: 200,
  },
  bookingTime: {
    type: Date,
    default: Date.now,
  },
});

const Model = mongoose.model('Order', Schema);

module.exports = Model;
