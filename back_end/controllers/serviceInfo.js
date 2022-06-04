const ServiceInfo = require('../models/serviceInfo');
const Joi = require('joi')

async function getAllInfos(req, res) {
    try {
        const Infos = await ServiceInfo.find().exec();
        res.json(Infos);
    } catch {
        res.json('Service info incorrect!');
    }

}

async function getInfoById(req, res) {
    try {
        const { id } = req.params;
        const serviceInfo = await ServiceInfo.findById(id).exec();
        if (!serviceInfo) {
            return res.status(404).json({
                error: 'service info not found',
            });
        }
        res.json(serviceInfo);
    } catch {
        res.json('ID format incorrect!');
    }
}

async function addInfo(req, res) {
    try {
        const {
            name,
            category,
            storeCode,
            duration,
            personLimit,
            serviceQuantity,
            description,
            staff
        } = req.body;

        Joi.object({
            name: Joi.string().required().min(2).min(20),
            category: Joi.string().required().min(2).min(20),
            storeCode: Joi.string().required(),
            duration: Joi.number().required().min(0.5).max(5),
            personLimit: Joi.number().required().min(1).max(50),
            serviceQuantity: Joi.number().required().min(1),
            description: Joi.string().max(200),
            staff: Joi.string().min(1).min(20)
        });

        const serviceInfo = new ServiceInfo({
            name,
            category,
            storeCode,
            duration,
            personLimit,
            serviceQuantity,
            description,
            staff
        });
        await serviceInfo.save();
        res.status(201).json(serviceInfo);

    } catch (error) {
        console.log('request error in addInfo, ', error);
        res.json('Service Info format incorrect!');
    }
}
async function updateInfoById(req, res) {
    try {
        const { id } = req.params;
        const {
            name,
            category,
            storeCode,
            duration,
            personLimit,
            serviceQuantity,
            description,
            staff,
            startTime
        } = req.body;
        const serviceInfo = await ServiceInfo.findByIdAndUpdate(id, {
            name,
            category,
            storeCode,
            duration,
            personLimit,
            serviceQuantity,
            description,
            staff,
            startTime
        }, { new: true }).exec();
        if (!serviceInfo) {
            return res.status(404).json({
                error: 'service info not found',
            });
        }
        res.json(serviceInfo);
    } catch {
        res.json('Service Info update incorrect!');
    }
}

async function deleteInfoById(req, res) {
    try {
        const { id } = req.params;
        const serviceInfo = await ServiceInfo.findByIdAndDelete(id).exec();
        if (!serviceInfo) {
            return res.status(404).json({
                error: 'service info not found',
            });
        }
        res.sendStatus(204);
    } catch {
        res.json('Info delete incorrect!');
    }
}

module.exports = {
    getAllInfos,
    getInfoById,
    addInfo,
    updateInfoById,
    deleteInfoById
}