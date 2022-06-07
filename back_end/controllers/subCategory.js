const SubCategory = require('../modules/subCategory');
const RootCategory = require('../modules/rootCategory');
const Joi = require('joi');

async function getAllSubCategories(req, res) {
    const subCategories = await SubCategory.find().exec();
    res.json(subCategories);
}

async function getSubCategoryById(req, res) {
    const { id } = req.params;
    const subCategory = await SubCategory.findById(id).exec();
    if (!subCategory) {
        return res.status(404).json({
            error: 'Subcategory not found',
        });
    }
    res.json(subCategory);

}

async function addSubCategory(req, res) {
    const { name } = req.body;
    Joi.object({
        name: Joi.string().required().min(2).max(20),
    });
    const subCategory = new SubCategory({ name });
    await subCategory.save();
    res.status(201).json(subCategory);
}

async function updateSubCategoryById(req, res) {

    const { id } = req.params;
    const { name, parentCategory } = req.body;
    const subCategory = await SubCategory.findByIdAndUpdate(id, {
        name, parentCategory
    }, { new: true }).exec();
    if (!subCategory) {
        return res.status(404).json({
            error: 'Subcategory not found',
        });
    }
    res.json(subCategory);
}

async function deleteSubCategoryId(req, res) {
    const { id } = req.params;
    const subCategory = await SubCategory.findByIdAndDelete(id).exec();
    if (!subCategory) {
        return res.status(404).json({
            error: 'Subcategory info not found',
        });
    }
    res.sendStatus(204);
}

// POST  /v1/subCategories/:subCategoryId/rootCategory/:rootCategoryId   //即使是双向绑定，也只需要一个路径
async function addRootCategoryToSubCategory(req, res) {
    const { rootCategoryId, subCategoryId } = req.params;
    const subCategory = await SubCategory.findById(subCategoryId).exec();
    const rootCategory = await RootCategory.findById(rootCategoryId).exec();

    if (!subCategory || !rootCategory) {
        return res.status(404).json({
            error: 'Category or Subcategory not found',
        });
    }

    subCategory.parentCategory.addToSet(rootCategory._id);
    await subCategory.save();

    return res.json(subCategory);
}

module.exports = {
    getAllSubCategories,
    getSubCategoryById,
    addSubCategory,
    updateSubCategoryById,
    deleteSubCategoryId
}