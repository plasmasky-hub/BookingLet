const express = require('express');
const {
  getAllStores,
  getStoreById,
  addStore,
  updateStoreById,
  deleteStoreById,
  //addServiceInfoToStore,
  //removeServiceInfoToStore,
  addRootCategoryToStore,
  removeRootCategoryToStore,
  addSubCategoryToStore,
  removeSubCategoryToStore,
} = require('../controllers/store.controller');

const storeRouter = express.Router();

storeRouter.get('', getAllStores);
storeRouter.post('', addStore);
storeRouter.get('/:id', getStoreById);
storeRouter.put('/:id', updateStoreById);
storeRouter.delete('/:id', deleteStoreById);
//storeRouter.post('/:storeId/serviceInfo/:serviceInfoId', addServiceInfoToStore);
//storeRouter.delete('/:storeId/serviceInfo/:serviceInfoId', removeServiceInfoToStore);
storeRouter.post(
  '/:storeId/rootCategory/:rootCategoryId',
  addRootCategoryToStore
);
storeRouter.delete(
  '/:storeId/rootCategory/:rootCategoryId',
  removeRootCategoryToStore
);
storeRouter.post('/:storeId/subCategory/:subCategoryId', addSubCategoryToStore);
storeRouter.delete(
  '/:storeId/subCategory/:subCategoryId',
  removeSubCategoryToStore
);

module.exports = storeRouter;
