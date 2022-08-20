const express = require('express');
const { 
    getAllStores,
    getStoreById,
    addStore,
    updateStoreById,
    discardStoreById,
    addPhotoToStore
} = require('../controllers/store.controller');

const storeRouter = express.Router();

storeRouter.get('', getAllStores);
storeRouter.post('', addStore);
storeRouter.get('/:id', getStoreById);
storeRouter.put('/:id', updateStoreById);
storeRouter.delete('/:id', discardStoreById);
storeRouter.post('/photo', addPhotoToStore);

module.exports = storeRouter;