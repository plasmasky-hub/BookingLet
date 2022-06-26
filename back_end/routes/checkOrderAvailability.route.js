const express = require('express');
const {  callRepeatVerification } = require('../controllers/order.controller');

const orderRouter = express.Router();


orderRouter.get('', callRepeatVerification); //??


module.exports = orderRouter;