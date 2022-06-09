const ServiceInfo = require('../modules/serviceInfo');
const RootCategory = require('../modules/rootCategory');
const SubCategory = require('../modules/subCategory');
const Store = require('../modules/store');
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
        const serviceInfo = await ServiceInfo.findById(id)
        .populate('store','name').populate('rootCategory').populate('subCategories').exec();
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
            rootCategory,
            subCategories,
            store,  //required and need to verify ObjectId
            duration,
            maxPersonPerSection,
            maxServicePerSection,
            description
        } = req.body;

        Joi.object({
            name: Joi.string().required().min(2).max(20),
            duration: Joi.number().required().min(0.5).max(5),
            maxPersonPerSection: Joi.number().required().min(1).max(50),
            maxServicePerSection: Joi.number().required().min(1),
            description: Joi.string().max(200)
        });

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

        const storeInstance = await Store.findById(store).exec();
        storeInstance.serviceInfos.addToSet(serviceInfo._id); 
        await storeInstance.save()

        res.status(201).json({
            "serviceInfo": serviceInfo,
            "store": store
        });

    } catch (error) {
        console.log('Request error in addInfo, ', error);
        res.json('Service Info format incorrect!');
    }
}
async function updateInfoById(req, res) {
    try {
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
        } = req.body;
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

        await Store.updateMany({ serviceInfo: serviceInfo._id }, {
            $pull: {
                serviceInfo: serviceInfo._id
            }
        }).exec();

        res.sendStatus(204);
    } catch {
        res.json('Info delete incorrect!');
    }
}

async function addRootCategoryToServiceInfo(req, res){
    const {serviceInfoId, rootCategoryId} = req.params;
    const serviceInfo = await ServiceInfo.findById(serviceInfoId).exec();
    const rootCategory = await RootCategory.findById(rootCategoryId).exec();

    if (!serviceInfo || !rootCategory) {            
        return res.status(404).json({
            error: 'serviceInfo or rootCategory not found',
        });
    }

    serviceInfo.rootCategory = rootCategory._id;
    await serviceInfo.save();

    return res.json(serviceInfo);
}

async function removeRootCategoryToServiceInfo(req, res){
    const {serviceInfoId, rootCategoryId} = req.params;
    const serviceInfo = await ServiceInfo.findById(serviceInfoId).exec();
    const rootCategory = await RootCategory.findById(rootCategoryId).exec();

    if (!serviceInfo || !rootCategory) {            
        return res.status(404).json({
            error: 'serviceInfo or rootCategory not found',
        });
    }

    serviceInfo.rootCategory = undefined;
    await serviceInfo.save();

    return res.json(serviceInfo);
}

async function addSubCategoryToServiceInfo(req, res){
    const {serviceInfoId, subCategoryId} = req.params;
    const serviceInfo = await ServiceInfo.findById(serviceInfoId).exec();
    const subCategory = await SubCategory.findById(subCategoryId).exec();

    if (!serviceInfo || !subCategory) {            
        return res.status(404).json({
            error: 'serviceInfo or subCategory not found',
        });
    }

    serviceInfo.subCategories.addToSet(subCategory._id);
    await serviceInfo.save();

    return res.json(serviceInfo);
}

async function removeSubCategoryToServiceInfo(req, res){
    const {serviceInfoId, subCategoryId} = req.params;
    const serviceInfo = await ServiceInfo.findById(serviceInfoId).exec();
    const subCategory = await SubCategory.findById(subCategoryId).exec();

    if (!serviceInfo || !subCategory) {            
        return res.status(404).json({
            error: 'serviceInfo or subCategory not found',
        });
    }

    serviceInfo.subCategories.pull(subCategory._id);
    await serviceInfo.save();

    return res.json(serviceInfo);
}


module.exports = {
    getAllInfos,
    getInfoById,
    addInfo,
    updateInfoById,
    deleteInfoById,
    addSubCategoryToServiceInfo,
    removeSubCategoryToServiceInfo,
    addRootCategoryToServiceInfo,
    removeRootCategoryToServiceInfo,
}