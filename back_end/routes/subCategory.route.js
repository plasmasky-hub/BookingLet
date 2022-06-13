const express = require('express');
const {
  getAllSubCategories,
  getSubCategoryById,
  addSubCategory,
  updateSubCategoryById,
  deleteSubCategoryId,
  addRootCategoryToSubCategory,
  removeRootCategoryToSubCategory,
} = require('../controllers/category.controller');

const subCategoryRouter = express.Router();

subCategoryRouter.get('', getAllSubCategories);
subCategoryRouter.post('', addSubCategory);
subCategoryRouter.get('/:id', getSubCategoryById);
subCategoryRouter.put('/:id', updateSubCategoryById);
subCategoryRouter.delete('/:id', deleteSubCategoryId);
subCategoryRouter.post(
  '/:subCategoryId/rootCategory/:rootCategoryId',
  addRootCategoryToSubCategory
);
subCategoryRouter.delete(
  '/:subCategoryId/rootCategory/:rootCategoryId',
  removeRootCategoryToSubCategory
);

module.exports = subCategoryRouter;
