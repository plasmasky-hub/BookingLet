const express = require('express');
const userRouter = require('./user');
const serviceInfoRouter = require('./serviceInfo');

const mainRouter = express.Router();
const router = express.Router();

mainRouter.use('/user', userRouter);
router.use('/serviceInfo', serviceInfoRouter)

module.exports = {mainRouter, router};
