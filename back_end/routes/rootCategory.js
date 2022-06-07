const express = require('express');
const { 
    getAllRootCategories,
    getRootCategoryById,
    addRootCategory,
    updateRootCategoryById,
    deleteRootCategoryId 
} = require('../controllers/rootCategory');

const rootCategoryRouter = express.Router();

rootCategoryRouter.get('', getAllRootCategories);
rootCategoryRouter.post('', addRootCategory);
rootCategoryRouter.get('/:id', getRootCategoryById);
rootCategoryRouter.put('/:id', updateRootCategoryById);
rootCategoryRouter.delete('/:id', deleteRootCategoryId);

module.exports = rootCategoryRouter;