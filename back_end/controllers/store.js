const Store = require('../modules/store');
const Joi = require('joi')

async function getAllStores(req, res) {
    const stores = await Store.find().exec();
    res.json(stores);
}

async function getStoreById(req, res) {
    const { id } = req.params;
    const store = await Store.findById(id).exec();
    if (!store) {
        return res.status(404).json({
            error: 'Store not found',
        });
    } S
    res.json(store);

}

async function addStore(req, res) {
    const { name, owner, rootCategory, subCategory } = req.body;
    Joi.object({
        name: Joi.string().required().min(2).max(20),
    });
    const store = new Store({ name, owner, rootCategory, subCategory });
    await store.save();
    res.status(201).json(store);
}

async function updateStoreById(req, res) {

    const { id } = req.params;
    const { name, owner, rootCategory, subCategory, serviceInfo } = req.body;
    const store = await Store.findByIdAndUpdate(id, {
        name, owner, rootCategory, subCategory, serviceInfo
    }, { new: true }).exec();
    if (!store) {
        return res.status(404).json({
            error: 'Store not found',
        });
    }
    res.json(store);

}

async function deleteStoreId(req, res) {
    const { id } = req.params;
    const store = await Store.findByIdAndDelete(id).exec();
    if (!store) {
        return res.status(404).json({
            error: 'Store info not found',
        });
    }
    res.sendStatus(204);

}

module.exports = {
    getAllStores,
    getStoreById,
    addStore,
    updateStoreById,
    deleteStoreId
}