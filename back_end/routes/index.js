const express = require('express');
const userRouter = require('./user');
const serviceInfoRouter = require('./serviceInfo');

const mainRouter = express.Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/serviceInfo', serviceInfoRouter)

module.exports =mainRouter;
