const express = require('express');
const { 
    getStoreBusinessTimeById,
    addStoreBusinessTimeById,
    deleteStoreBusinessTimeById,
    updateStoreBusinessTimeById,
    SyncStoreCalendarToService,
    getServiceInfoCalendarById,
    addServiceInfoCalendarById,
    deleteServiceInfoCalendarById,
    updateServiceInfoCalendarById,
    checkTimeIntervalAndBook,

    getAllRecords,
    deleteAllRecords
} = require('../controllers/calendar.controller');

const calendarRouter = express.Router();

calendarRouter.get('/store/:id', getStoreBusinessTimeById);
calendarRouter.post('/store/:id', addStoreBusinessTimeById);
calendarRouter.delete('/store/:id', deleteStoreBusinessTimeById);
calendarRouter.put('/store/:id', updateStoreBusinessTimeById);
calendarRouter.post('/store/:storeId/serviceInfo/:serviceInfoId', SyncStoreCalendarToService);
calendarRouter.get('/serviceInfo/:id', getServiceInfoCalendarById);
calendarRouter.post('/serviceInfo/:id', addServiceInfoCalendarById);
calendarRouter.delete('/serviceInfo/:id', deleteServiceInfoCalendarById);
calendarRouter.put('/serviceInfo/:id', updateServiceInfoCalendarById);
calendarRouter.put('/checkTimeIntervalAndBook', checkTimeIntervalAndBook);

calendarRouter.get('/record', getAllRecords);
calendarRouter.delete('/record', deleteAllRecords);


module.exports = calendarRouter;