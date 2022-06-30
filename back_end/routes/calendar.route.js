const express = require('express');
const { 
    getStoreBusinessTimeById,
    addStoreBusinessTimeById,
    deleteStoreBusinessTimeById,
    updateStoreBusinessTimeById,
    SyncStoreCalendarToService,
} = require('../controllers/calendar.controller');

const calendarRouter = express.Router();

calendarRouter.get('/store/:id', getStoreBusinessTimeById);
calendarRouter.post('/store/:id', addStoreBusinessTimeById);
calendarRouter.delete('/store/:id', deleteStoreBusinessTimeById);
calendarRouter.put('/store/:id', updateStoreBusinessTimeById);
calendarRouter.post('/store/:storeId/serviceInfo/:serviceInfoId', SyncStoreCalendarToService);


module.exports = calendarRouter;