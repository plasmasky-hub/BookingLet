const express = require('express');
const userRouter = require('./user');
const orderRouter= require('./orders')

const mainRouter = express.Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/orders', orderRouter);


module.exports = mainRouter;