const RootCategory = require('../models/rootCategory');
const SubCategory = require('../models/subCategory');
const ServiceInfo = require('../models/serviceInfo');
const Joi = require('joi')

async function getAllRootCategories(req, res) {
    const rootCategories = await RootCategory.find({ isDiscard: false }).exec();
    res.json(rootCategories);
}

/* async function getRootCategoryById(req, res) {
    const { id } = req.params;
    const rootCategory = await RootCategory.findById(id).exec();
    if (!rootCategory) {
        return res.status(404).json({
            error: 'Category not found',
        });
    }
    res.json(rootCategory);
}*/

async function addRootCategory(req, res) {
    const validatedData = await checkRootCategory(req.body);
    if (validatedData.error !== undefined) { return res.status(404).json(validatedData.error) };

    const { name } = validatedData;     //= req.body;
    Joi.object({
        name: Joi.string().required().min(2).max(20),
    });
    const rootCategory = new RootCategory({ name });
    await rootCategory.save();
    res.status(201).json(rootCategory);
}

//This function is used for renaming (and does not affect the association)
async function updateRootCategoryById(req, res) {
    const validatedData = await checkRootCategory(req.body);
    if (validatedData.error !== undefined) { return res.status(404).json(validatedData.error) };

    const { id } = req.params;
    const { name } = validatedData;     //= req.body;
    const rootCategory = await RootCategory.findByIdAndUpdate(id, { name }, { new: true }).exec();
    if (!rootCategory) {
        return res.status(404).json({
            error: 'Category not found',
        });
    }
    res.json(rootCategory);
}

async function discardRootCategoryById(req, res) {
    const { id } = req.params;
    const rootCategory = await RootCategory.findByIdAndUpdate(id, { isDiscard: true }, { new: true }).exec();
    if (!rootCategory) {
        return res.status(404).json({
            error: 'Category info not found',
        });
    }

    await SubCategory.updateMany({ parentCategory: rootCategory._id }, {
        $set: { 'isDiscard': true }
    }).exec()

    await ServiceInfo.updateMany({ rootCategory: rootCategory._id }, {
        $unset: {
            rootCategory: rootCategory._id
        }
    }).exec()

    res.sendStatus(204);
}

async function getDiscardedRootCategories(req, res) {
    const rootCategories = await RootCategory.find({ isDiscard: true }).exec();
    res.json(rootCategories);
}

async function getAllSubCategories(req, res) {
    const subCategories = await SubCategory.find({ isDiscard: false }).populate('parentCategory').exec();
    res.json(subCategories);
}

/*
async function getSubCategoryById(req, res) {
    const { id } = req.params;
    const subCategory = await SubCategory.findById(id).populate('parentCategory').exec();
    if (!subCategory) {
        return res.status(404).json({
            error: 'Subcategory not found',
        });
    }
    res.json(subCategory);
}
*/

async function addSubCategory(req, res) {
    const validatedData = await checkSubCategory(req.body);
    if (validatedData.error !== undefined) { return res.status(404).json(validatedData.error) };

    const { name, parentCategory } = validatedData;     //= req.body;
    const subCategory = new SubCategory({ name, parentCategory });
    subCategory.parentCategory = parentCategory;

    await subCategory.save();
    res.status(201).json(subCategory);
}

//This function is used to rename and change the parentCategory (and does not affect the association)
async function updateSubCategoryById(req, res) {
    const validatedData = await checkSubCategory(req.body);
    if (validatedData.error !== undefined) { return res.status(404).json(validatedData.error) };

    const { id } = req.params;
    const { name, parentCategory } = validatedData;     //= req.body;
    const subCategory = await SubCategory.findByIdAndUpdate(id, { name, parentCategory }, { new: true }).exec();
    if (!subCategory) {
        return res.status(404).json({
            error: 'Subcategory not found',
        });
    }
    res.json(subCategory);
}

async function discardSubCategoryById(req, res) {
    const { id } = req.params;
    const subCategory = await SubCategory.findByIdAndUpdate(id, { isDiscard: true }, { new: true }).exec();
    if (!subCategory) {
        return res.status(404).json({
            error: 'Subcategory info not found',
        });
    }

    await ServiceInfo.updateMany({ subCategories: subCategory._id }, {
        $pull: {
            subCategories: subCategory._id
        }
    }).exec()

    res.sendStatus(204);
}

async function checkRootCategory(data) {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(30),
    });

    const validatedData = await schema.validateAsync(data, { allowUnknown: true, stripUnknown: true });
    return validatedData;
}

async function checkSubCategory(data) {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(30),
        parentCategory: Joi.required()
    });

    const validatedData = await schema.validateAsync(data, { allowUnknown: true, stripUnknown: true });
    return validatedData;
}

async function getDiscardedSubCategories(req, res) {
    const subCategories = await SubCategory.find({ isDiscard: true }).populate('parentCategory').exec();
    res.json(subCategories);
}

module.exports = {
    getAllRootCategories,
    //getRootCategoryById,
    addRootCategory,
    updateRootCategoryById,
    discardRootCategoryById,
    getDiscardedRootCategories,
    
    getAllSubCategories,
    addSubCategory,
    updateSubCategoryById,
    discardSubCategoryById,
    getDiscardedSubCategories
}