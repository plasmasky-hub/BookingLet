const express = require('express');
const userRouter = require('./user');
const orderRouter= require('./orders');
const serviceInfoRouter = require('./serviceInfo');

const mainRouter = express.Router();
const router = express.Router();

mainRouter.use('/user', userRouter);
router.use('/orders', orderRouter);
router.use('/serviceInfo', serviceInfoRouter)


module.exports = {mainRouter,router};