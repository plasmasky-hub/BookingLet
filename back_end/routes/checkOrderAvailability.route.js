const express = require('express');
const {  repeatVerification } = require('../controllers/order.controller');

const orderRouter = express.Router();


orderRouter.get('', repeatVerification); //??


module.exports = orderRouter;