const express = require('express');
const { 
    getAllInfos, 
    addInfo, 
    getInfoById, 
    updateInfoById, 
    discardInfoById,
} = require('../controllers/serviceInfo.controller');

const serviceInfoRouter = express.Router();

serviceInfoRouter.get('', getAllInfos);
serviceInfoRouter.post('', addInfo);
serviceInfoRouter.get('/:id', getInfoById);
serviceInfoRouter.put('/:id', updateInfoById);
serviceInfoRouter.delete('/:id', discardInfoById);

module.exports = serviceInfoRouter;