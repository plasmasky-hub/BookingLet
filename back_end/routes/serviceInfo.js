const express = require('express');
const { 
    getAllInfos, 
    addInfo, 
    getInfoById, 
    updateInfoById, 
    deleteInfoById,
    addSubCategoryToServiceInfo,
    removeSubCategoryToServiceInfo 
} = require('../controllers/serviceInfo');

const serviceInfoRouter = express.Router();

serviceInfoRouter.get('', getAllInfos);
serviceInfoRouter.post('', addInfo);
serviceInfoRouter.get('/:id', getInfoById);
serviceInfoRouter.put('/:id', updateInfoById);
serviceInfoRouter.delete('/:id', deleteInfoById);
serviceInfoRouter.post('/:serviceInfoId/subCategory/:subCategoryId', addSubCategoryToServiceInfo);
serviceInfoRouter.delete('/:serviceInfoId/subCategory/:subCategoryId',removeSubCategoryToServiceInfo);

module.exports = serviceInfoRouter;