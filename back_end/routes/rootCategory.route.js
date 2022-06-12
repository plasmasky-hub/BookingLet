const express = require('express');
const {
  getAllRootCategories,
  addRootCategory,
  updateRootCategoryById,
  deleteRootCategoryId,
} = require('../controllers/category.controller');

const rootCategoryRouter = express.Router();

rootCategoryRouter.get('', getAllRootCategories);
rootCategoryRouter.post('', addRootCategory);
rootCategoryRouter.put('/:id', updateRootCategoryById);
rootCategoryRouter.delete('/:id', deleteRootCategoryId);

module.exports = rootCategoryRouter;
