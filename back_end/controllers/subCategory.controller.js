const SubCategory = require('../models/subCategory.model');
const RootCategory = require('../models/rootCategory.model');
const ServiceInfo = require('../models/serviceInfo.model');
const Joi = require('joi');

async function getAllSubCategories(req, res) {
    const subCategories = await SubCategory.find().populate('parentCategory').exec();
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
    const { name, parentCategory } = req.body;
    const subCategory = new SubCategory({ name, parentCategory });
    subCategory.parentCategory = parentCategory;

    await subCategory.save();
    res.status(201).json(subCategory);
}

//This function is used to rename and change the parentCategory (and does not affect the association)
async function updateSubCategoryById(req, res) {
    const { id } = req.params;
    const { name, parentCategory } = req.body;
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

module.exports = {
    getAllSubCategories,
    addSubCategory,
    updateSubCategoryById,
    discardSubCategoryById,
}