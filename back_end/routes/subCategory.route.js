const express = require('express');
const { 
    getAllSubCategories,
    addSubCategory,
    discardSubCategoryById,
    updateSubCategoryById,
} = require('../controllers/subCategory.controller');

const subCategoryRouter = express.Router();

subCategoryRouter.get('', getAllSubCategories);
subCategoryRouter.post('', addSubCategory);
subCategoryRouter.put('/:id', updateSubCategoryById);
subCategoryRouter.delete('/:id', discardSubCategoryById);

module.exports = subCategoryRouter;