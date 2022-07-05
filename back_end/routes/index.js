const express = require('express');
const userRouter = require('./user.route');
const orderRouter = require('./order.route');
const serviceInfoRouter = require('./serviceInfo.route');
const storeRouter = require('./store.route');
const rootCategoryRouter = require('./rootCategory.route');
const subCategoryRouter = require('./subCategory.route');
const checkOrderAvailabilityRouter =require('./checkOrderAvailability.route');

const mainRouter = express.Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/serviceInfo', serviceInfoRouter);
mainRouter.use('/store', storeRouter);
mainRouter.use('/rootCategory', rootCategoryRouter);
mainRouter.use('/subCategory', subCategoryRouter);
mainRouter.use('/orders', orderRouter);
mainRouter.use('/checkOrderAvailability', checkOrderAvailabilityRouter);

module.exports = mainRouter;
