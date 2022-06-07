const express = require('express');
const { 
    getAllSubCategories,
    getSubCategoryById,
    addSubCategory,
    updateSubCategoryById,
    deleteSubCategoryId 
} = require('../controllers/subCategory');

const subCategoryRouter = express.Router();

subCategoryRouter.get('', getAllSubCategories);
subCategoryRouter.post('', addSubCategory);
subCategoryRouter.get('/:id', getSubCategoryById);
subCategoryRouter.put('/:id', updateSubCategoryById);
subCategoryRouter.delete('/:id', deleteSubCategoryId);

module.exports = subCategoryRouter;