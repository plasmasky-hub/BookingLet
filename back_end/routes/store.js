const express = require('express');
const { 
    getAllStores,
    getStoreById,
    addStore,
    updateStoreById,
    deleteStoreId
} = require('../controllers/store');

const storeRouter = express.Router();

storeRouter.get('', getAllStores);
storeRouter.post('', addStore);
storeRouter.get('/:id', getStoreById);
storeRouter.put('/:id', updateStoreById);
storeRouter.delete('/:id', deleteStoreId);

module.exports = storeRouter;