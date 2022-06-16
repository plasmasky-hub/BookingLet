const express = require('express');
const { 
    store,
    order,
} = require('../controllers/search.controller');

const searchRouter = express.Router();

searchRouter.get('/store', store);
searchRouter.get('/order', order);
module.exports = searchRouter;