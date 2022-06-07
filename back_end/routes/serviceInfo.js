const express = require('express');
const { 
    getAllInfos, 
    addInfo, 
    getInfoById, 
    updateInfoById, 
    deleteInfoById 
} = require('../controllers/serviceInfo');

const serviceInfoRouter = express.Router();

serviceInfoRouter.get('', getAllInfos);
serviceInfoRouter.post('', addInfo);
serviceInfoRouter.get('/:id', getInfoById);
serviceInfoRouter.put('/:id', updateInfoById);
serviceInfoRouter.delete('/:id', deleteInfoById);

module.exports = serviceInfoRouter;