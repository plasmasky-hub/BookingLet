const RootCategory = require('../modules/rootCategory');
const SubCategory = require('../modules/subCategory');
const Joi = require('joi')

async function getAllRootCategories(req, res) {
    const rootCategories = await RootCategory.find().exec();
    res.json(rootCategories);
}

async function getRootCategoryById(req, res) {
    const { id } = req.params;
    const rootCategory = await RootCategory.findById(id).exec();
    if (!rootCategory) {
        return res.status(404).json({
            error: 'Category not found',
        });
    }
    res.json(rootCategory);

}

async function addRootCategory(req, res) {
    const { name } = req.body;
    Joi.object({
        name: Joi.string().required().min(2).max(20),
    });
    const rootCategory = new RootCategory({ name });
    await rootCategory.save();
    res.status(201).json(rootCategory);
}

async function updateRootCategoryById(req, res) {

    const { id } = req.params;
    const { name } = req.body;
    const rootCategory = await RootCategory.findByIdAndUpdate(id, { name }, { new: true }).exec();
    if (!rootCategory) {
        return res.status(404).json({
            error: 'Category not found',
        });
    }
    res.json(rootCategory);

}

async function deleteRootCategoryId(req, res) {
    const { id } = req.params;
    const rootCategory = await RootCategory.findByIdAndDelete(id).exec();
    if (!rootCategory) {
        return res.status(404).json({
            error: 'Category info not found',
        });
    }

   // await SubCategory.updateMany({parentCategory:id}, {
        //parentCategory : undefined
      //  $pull:{
       //     parentCategory:id
       // }
   // }).exec();

    res.sendStatus(204);

}

module.exports = {
    getAllRootCategories,
    getRootCategoryById,
    addRootCategory,
    updateRootCategoryById,
    deleteRootCategoryId
}