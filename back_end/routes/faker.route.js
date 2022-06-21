const express = require('express');
const {
    randomUser,
    randomRootCate,
    randomSubCate,
    randomStore,
    randomOder,
} = require('../controllers/faker.controller');

const fakerRouter = express.Router();

fakerRouter.get('/user', randomUser);
fakerRouter.get('/rootcate', randomRootCate);
fakerRouter.get('/subcate', randomSubCate);
fakerRouter.get('/store', randomStore);
fakerRouter.get('/order', randomOder);

module.exports = fakerRouter;