const express = require('express');
const { 
    getAllRootCategories,
    //getRootCategoryById,
    addRootCategory,
    updateRootCategoryById,
    discardRootCategoryById 
} = require('../controllers/category.controller');

const rootCategoryRouter = express.Router();

rootCategoryRouter.get('', getAllRootCategories);
rootCategoryRouter.post('', addRootCategory);
//rootCategoryRouter.get('/:id', getRootCategoryById);
rootCategoryRouter.put('/:id', updateRootCategoryById);
rootCategoryRouter.delete('/:id', discardRootCategoryById);

module.exports = rootCategoryRouter;