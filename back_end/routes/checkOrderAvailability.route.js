const express = require('express');
const {  callCheckTimeAvailability} = require('../controllers/order.controller');

const orderRouter = express.Router();


orderRouter.get('', callCheckTimeAvailability); //??


module.exports = orderRouter;