const RootCategory = require('../models/rootCategory');
const SubCategory = require('../models/subCategory');
const ServiceInfo = require('../models/serviceInfo');
const Joi = require('joi');

async function getAllRootCategories(req, res) {
  const rootCategories = await RootCategory.find().exec();
  res.json(rootCategories);
}

async function getAllSubCategories(req, res) {
  const subCategories = await SubCategory.find().exec();
  res.json(subCategories);
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

async function getSubCategoryById(req, res) {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id)
    .populate('parentCategory')
    .exec();
  if (!subCategory) {
    return res.status(404).json({
      error: 'Subcategory not found',
    });
  }
  res.json(subCategory);
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

async function addSubCategory(req, res) {
  const { name } = req.body;
  Joi.object({
    name: Joi.string().required().min(2).max(20),
  });
  const subCategory = new SubCategory({ name });
  await subCategory.save();
  res.status(201).json(subCategory);
}

async function updateRootCategoryById(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const rootCategory = await RootCategory.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  ).exec();
  if (!rootCategory) {
    return res.status(404).json({
      error: 'Category not found',
    });
  }
  res.json(rootCategory);
}

async function updateSubCategoryById(req, res) {
  const { id } = req.params;
  const { name, parentCategory } = req.body;
  const subCategory = await SubCategory.findByIdAndUpdate(
    id,
    {
      name,
      parentCategory,
    },
    { new: true }
  ).exec();
  if (!subCategory) {
    return res.status(404).json({
      error: 'Subcategory not found',
    });
  }
  res.json(subCategory);
}

async function deleteRootCategoryId(req, res) {
  const { id } = req.params;
  const rootCategory = await RootCategory.findByIdAndDelete(id).exec();
  if (!rootCategory) {
    return res.status(404).json({
      error: 'Category info not found',
    });
  }

  await SubCategory.updateMany(
    { parentCategory: rootCategory._id },
    {
      $unset: {
        parentCategory: rootCategory._id,
      },
    }
  ).exec();

  await ServiceInfo.updateMany(
    { rootCategory: rootCategory._id },
    {
      $unset: {
        rootCategory: rootCategory._id,
      },
    }
  ).exec();

  res.sendStatus(204);
}

async function deleteSubCategoryId(req, res) {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete(id).exec();
  if (!subCategory) {
    return res.status(404).json({
      error: 'Subcategory info not found',
    });
  }

  await ServiceInfo.updateMany(
    { subCategories: subCategory._id },
    {
      $pull: {
        subCategories: subCategory._id,
      },
    }
  ).exec();

  res.sendStatus(204);
}

async function addRootCategoryToSubCategory(req, res) {
  const { subCategoryId, rootCategoryId } = req.params;
  const subCategory = await SubCategory.findById(subCategoryId).exec();
  const rootCategory = await RootCategory.findById(rootCategoryId).exec();

  if (!subCategory || !rootCategory) {
    return res.status(404).json({
      error: 'Category or Subcategory not found',
    });
  }

  subCategory.parentCategory = rootCategory._id;
  await subCategory.save();

  return res.json(subCategory);
}

async function removeRootCategoryToSubCategory(req, res) {
  const { subCategoryId, rootCategoryId } = req.params;
  const subCategory = await SubCategory.findById(subCategoryId).exec();
  const rootCategory = await RootCategory.findById(rootCategoryId).exec();

  if (!subCategory || !rootCategory) {
    return res.status(404).json({
      error: 'Category or Subcategory not found',
    });
  }

  //await subCategory.update({subCategory},{$pull:{parentCategory:rootCategoryId}})
  subCategory.parentCategory = undefined;
  await subCategory.save();

  return res.json(subCategory);
}

module.exports = {
  getAllRootCategories,
  //getRootCategoryById,
  addRootCategory,
  updateRootCategoryById,
  deleteRootCategoryId,
  getAllSubCategories,
  getSubCategoryById,
  addSubCategory,
  updateSubCategoryById,
  deleteSubCategoryId,
  addRootCategoryToSubCategory,
  removeRootCategoryToSubCategory,
};
