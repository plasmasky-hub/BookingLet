const express = require('express');
const userRouter = require('./user');
const serviceInfoRouter = require('./serviceInfo');
const storeRouter = require('./store');
const rootCategoryRouter = require('./rootCategory');
const subCategoryRouter = require('./subCategory')


const mainRouter = express.Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/serviceInfo', serviceInfoRouter);
mainRouter.use('/store', storeRouter);
mainRouter.use('/rootCategory', rootCategoryRouter);
mainRouter.use('/subCategory', subCategoryRouter);

module.exports =mainRouter;
