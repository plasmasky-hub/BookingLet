const express = require('express');
const {
    randomUser,
    randomRootCate,
    randomSubCate,
    randomStore,
} = require('../controllers/faker.controller');

const fakerRouter = express.Router();

fakerRouter.get('/user', randomUser);
fakerRouter.get('/rootcate', randomRootCate);
fakerRouter.get('/subcate', randomSubCate);
fakerRouter.get('/store', randomStore);

module.exports = fakerRouter;