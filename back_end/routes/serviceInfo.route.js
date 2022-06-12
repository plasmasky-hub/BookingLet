const express = require('express');
const {
  getAllInfos,
  addInfo,
  getInfoById,
  updateInfoById,
  deleteInfoById,
  addSubCategoryToServiceInfo,
  removeSubCategoryToServiceInfo,
  addRootCategoryToServiceInfo,
  removeRootCategoryToServiceInfo,
} = require('../controllers/serviceInfo.controller');

const serviceInfoRouter = express.Router();

serviceInfoRouter.get('', getAllInfos);
serviceInfoRouter.post('', addInfo);
serviceInfoRouter.get('/:id', getInfoById);
serviceInfoRouter.put('/:id', updateInfoById);
serviceInfoRouter.delete('/:id', deleteInfoById);
serviceInfoRouter.post(
  '/:serviceInfoId/subCategory/:subCategoryId',
  addSubCategoryToServiceInfo
);
serviceInfoRouter.delete(
  '/:serviceInfoId/subCategory/:subCategoryId',
  removeSubCategoryToServiceInfo
);
serviceInfoRouter.post(
  '/:serviceInfoId/rootCategory/:rootCategoryId',
  addRootCategoryToServiceInfo
);
serviceInfoRouter.delete(
  '/:serviceInfoId/rootCategory/:rootCategoryId',
  removeRootCategoryToServiceInfo
);

module.exports = serviceInfoRouter;
