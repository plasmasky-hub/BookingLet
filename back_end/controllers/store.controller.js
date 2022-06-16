const Store = require('../models/store');
const ServiceInfo = require('../models/serviceInfo');
const Joi = require('joi')

async function getAllStores(req, res) {
    const stores = await Store.find({ isDiscard: false }).exec();
    res.json(stores);
}

async function getStoreById(req, res) {
    const { id } = req.params;
    const store = await Store.findById(id).populate('owner').populate('serviceInfos')
        .populate('rootCategories').populate('subCategories').exec();
    if (!store) {
        return res.status(404).json({
            error: 'Store not found',
        });
    }
    res.json(store);
}

async function addStore(req, res) {
    const validatedData = await checkStore(req.body);
    if (validatedData.error !== undefined) { return res.status(404).json(validatedData.error) };

    const { name, owner, tel, location, description, rootCategories, subCategories }  = validatedData;  //= req.body;
    const store = new Store({ name, owner, tel, location, description, rootCategories, subCategories });
    await store.save();
    res.status(201).json(store);
}

async function updateStoreById(req, res) {
    const validatedData = await checkStore(req.body);
    if (validatedData.error !== undefined) { return res.status(404).json(validatedData.error) };
    
    const { id } = req.params;
    const { name, owner, tel, location, description, rootCategories, subCategories, serviceInfos, orders } = validatedData;  //= req.body;
    const store = await Store.findByIdAndUpdate(id, {
        name, owner, tel, location, description, rootCategories, subCategories, serviceInfos, orders
    }, { new: true }).exec();
    if (!store) {
        return res.status(404).json({
            error: 'Store not found',
        });
    }
    res.json(store);
}

async function discardStoreById(req, res) {
    const { id } = req.params;
    const store = await Store.findByIdAndUpdate(id, { isDiscard: true }, { new: true }).exec();
    if (!store) {
        return res.status(404).json({
            error: 'Store info not found',
        });
    }

    await ServiceInfo.updateMany({ store: store._id }, {
        $set: { 'isDiscard': true }
    }).exec();
    res.sendStatus(204);
}

async function getDiscardedStores(req, res) {
    const stores = await Store.find({ isDiscard: true }).exec();
    res.json(stores);
}

async function checkStore(data) {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(30),
        owner: Joi.required(),
        tel: Joi.string().regex(/^\d{2}\d{4}\d{4}$/).required(),
        location: {
            state: Joi.string().required(),
            city: Joi.string().required(),
            suburb: Joi.string().required(),
            street: Joi.string().required(),
            number: Joi.string().required(),
            postcode: Joi.string().regex(/^(?:(?:[2-8]\d|9[0-7]|0?[28]|0?9(?=09))(?:\d{2}))$/).required(),
        },
        description: Joi.string().max(300),
        rootCategories: Joi.array(),
        subCategories: Joi.array(),
        serviceInfos: Joi.array(),
        orders: Joi.array()
    });

    const validatedData = await schema.validateAsync(data, { allowUnknown: true, stripUnknown: true });
    return validatedData;
}

/*
Commented code: This feature is currently considered redundant, since serviceInfo is 
fixed in a ref of a store instance when it is created. This part of the functionality 
has been moved to controller -> serviceInfo.js -> getInfoById() & deleteInfoById().
*/
/* 
//storeRouter.post('/:storeId/serviceInfo/:serviceInfoId', addServiceInfoToStore);
async function addServiceInfoToStore(req, res) {
    const { storeId, serviceInfoId } = req.params;
    const serviceInfo = await ServiceInfo.findById(serviceInfoId).exec();
    const store = await Store.findById(storeId).exec();

    if (!serviceInfo || !store) {
        return res.status(404).json({
            error: 'serviceInfo or store not found',
        });
    }

    store.serviceInfos.addToSet(serviceInfo._id);
    serviceInfo.store = store._id;

    await store.save();
    await serviceInfo.save();
    return res.json({
        'store': store,
        'service info': serviceInfo
    });
}

async function removeServiceInfoToStore(req, res) {
    const { storeId, serviceInfoId } = req.params;
    const serviceInfo = await ServiceInfo.findById(serviceInfoId).exec();
    const store = await Store.findById(storeId).exec();

    if (!serviceInfo || !store) {
        return res.status(404).json({
            error: 'serviceInfo or store not found',
        });
    }

    store.serviceInfos.pull(serviceInfo._id);
    serviceInfo.store = undefined;

    await store.save();
    await serviceInfo.save();
    return res.json({
        'store': store,
        'service info': serviceInfo
    });
}
*/

module.exports = {
    getAllStores,
    getStoreById,
    addStore,
    updateStoreById,
    discardStoreById,
    getDiscardedStores,
    //addServiceInfoToStore,
    //removeServiceInfoToStore,
}