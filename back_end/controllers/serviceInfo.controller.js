const ServiceInfo = require('../models/serviceInfo');
const Store = require('../models/store');
const Joi = require('joi');

async function getAllInfos(req, res) {
    const Infos = await ServiceInfo.find({ isDiscard: false }).exec();
    res.json(Infos);
}

async function getInfoById(req, res) {
    const { id } = req.params;
    const serviceInfo = await ServiceInfo.findById(id)
        .populate('store', 'name').populate('rootCategory').populate('subCategories').exec();
    if (!serviceInfo) {
        return res.status(404).json({
            error: 'service info not found',
        });
    }
    res.json(serviceInfo);
}

async function addInfo(req, res) {

    const validatedData = await checkServiceInfo(req.body);  //Without await, promise status will be <pending>. 
    if (validatedData.error !== undefined) { return res.status(404).json(validatedData.error) };

    const {
        name,
        rootCategory,
        subCategories,
        store,
        duration,
        maxPersonPerSection,
        maxServicePerSection,
        description
        //} = req.body;
    } = validatedData;

    const serviceInfo = new ServiceInfo({
        name,
        rootCategory,
        subCategories,
        store,
        duration,
        maxPersonPerSection,
        maxServicePerSection,
        description
    });
    await serviceInfo.save();
    Store.findByIdAndUpdate(store, { $addToSet: { serviceInfos: serviceInfo._id } }).exec();

    res.status(201).json({
        "serviceInfo": serviceInfo
    });
}

async function updateInfoById(req, res) {
    const validatedData = await checkServiceInfo(req.body);
    if (validatedData.error !== undefined) { return res.status(404).json(validatedData.error) };

    const { id } = req.params;
    const {
        name,
        rootCategory,
        subCategories,
        store,
        duration,
        maxPersonPerSection,
        maxServicePerSection,
        description,
        startTime
        //} = req.body;
    } = validatedData;
    const serviceInfo = await ServiceInfo.findByIdAndUpdate(id, {
        name,
        rootCategory,
        subCategories,
        store,
        duration,
        maxPersonPerSection,
        maxServicePerSection,
        description,
        startTime
    }, { new: true }).exec();

    if (!serviceInfo) {
        return res.status(404).json({
            error: 'service info not found',
        });
    }
    res.json(serviceInfo);
}

async function discardInfoById(req, res) {
    const { id } = req.params;
    const serviceInfo = await ServiceInfo.findByIdAndUpdate(id, { isDiscard: true }, { new: true }).exec();
    if (!serviceInfo) {
        return res.status(404).json({
            error: 'service info not found',
        });
    }

    await Store.updateMany({ serviceInfo: serviceInfo._id }, {
        $pull: {
            serviceInfo: serviceInfo._id
        }
    }).exec();

    res.sendStatus(204);
}

async function getDiscardedInfos(req, res) {
    const Infos = await ServiceInfo.find({ isDiscard: true }).exec();
    res.json(Infos);
}

async function checkServiceInfo(data) {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(30),
        rootCategory: Joi.required(),
        subCategories: Joi.array(),
        store: Joi.required(),
        duration: Joi.number().required().min(0.5).max(5),
        maxPersonPerSection: Joi.number().required().min(1).max(200),
        maxServicePerSection: Joi.number().required().min(1),
        description: Joi.string().max(300),
        startTime: [{
            dayOfWeek: Joi.string(),
            openHours: [Joi.string()]
        }],
    });

    const validatedData = await schema.validateAsync(data, { allowUnknown: true, stripUnknown: true });
    return validatedData;
}


module.exports = {
    getAllInfos,
    getInfoById,
    addInfo,
    updateInfoById,
    discardInfoById,
    getDiscardedInfos
}