const express = require('express');

const mainRouter = express.Router();
const userRouter = require('./user.route');
const orderRouter = require('./orders.route');
const serviceInfoRouter = require('./serviceInfo.route');
const storeRouter = require('./store.route');
const rootCategoryRouter = require('./rootCategory.route');
const subCategoryRouter = require('./subCategory.route')

mainRouter.use('/user', userRouter);
mainRouter.use('/serviceInfo', serviceInfoRouter);
mainRouter.use('/store', storeRouter);
mainRouter.use('/rootCategory', rootCategoryRouter);
mainRouter.use('/subCategory', subCategoryRouter);
mainRouter.use('/orders', orderRouter);

module.exports = mainRouter;

