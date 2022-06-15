const express = require('express');
const { 
    getAllStores,
    getStoreById,
    addStore,
    updateStoreById,
    discardStoreById,
    search,
} = require('../controllers/store.controller');

const storeRouter = express.Router();

storeRouter.get('', getAllStores);
storeRouter.post('', addStore);
storeRouter.post('/search', search);
storeRouter.get('/:id', getStoreById);
storeRouter.put('/:id', updateStoreById);
storeRouter.delete('/:id', discardStoreById);

module.exports = storeRouter;