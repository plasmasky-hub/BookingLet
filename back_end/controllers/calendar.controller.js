const Store = require('../models/store');
const ServiceInfo = require('../models/serviceInfo');
const Joi = require('joi');


async function getStoreBusinessTimeById(req, res) {
    const { id } = req.params;
    const store = await Store.findById(id).exec();
    res.json(store.businessHours)
}


//req.body: {dayOfWeek: String, openHour: String, closingHour: String}
async function addStoreBusinessTimeById(req, res) {
    const { id } = req.params;
    let { dayOfWeek, openHour, closingHour } = req.body;
    const store = await Store.findById(id).exec();

    openHour = parseInt(openHour);         //string转换为number。为了方便计算
    closingHour = parseInt(closingHour);

    for (let i = openHour; i < closingHour; i += 5) {   //将微分时间注入选定dayOfWeek中
        if (i % 100 < 60 && store.businessHours[dayOfWeek].indexOf(i) === -1) {  //分钟60进制+重复性检测
            store.businessHours[dayOfWeek].push(i)
        };
    };
    await store.save();
    res.json(store)
}


//req.body: {dayOfWeek: String, openHour: String, closingHour: String}
async function deleteStoreBusinessTimeById(req, res) {
    const { id } = req.params;
    let { dayOfWeek, openHour, closingHour } = req.body;
    const store = await Store.findById(id).exec();

    openHour = parseInt(openHour);         
    closingHour = parseInt(closingHour);

    for (let i = openHour; i < closingHour; i += 5) {   
        if (i % 100 < 60 && store.businessHours[dayOfWeek].indexOf(i) > -1) {  
            let j = store.businessHours[dayOfWeek].length;
            while(j--) {
                if (store.businessHours[dayOfWeek][j] === i) {
                    store.businessHours[dayOfWeek].splice(j, 1)
                }
            }
        };
    };
    await store.save();
    if(req.body.openHourBefore === undefined) {res.json(store)};
}


//req.body: {dayOfWeek: String, openHourBefore: String, closingHourBefore: String, openHourAfter: String, closingHourAfter: String}
async function updateStoreBusinessTimeById(req, res) {
    [req.body.openHour, req.body.closingHour] = [req.body.openHourBefore, req.body.closingHourBefore];
    await deleteStoreBusinessTimeById(req, res);

    [req.body.openHour, req.body.closingHour] = [req.body.openHourAfter, req.body.closingHourAfter];
    await addStoreBusinessTimeById(req, res);
}


async function SyncStoreCalendarToService(req, res) {
    //取store的calender
    //加工每一项
    //注入serviceInfo的calendar
    const { storeId, serviceInfoId } = req.params;
    const store = await Store.findById(storeId).exec();
    //检测serviceInfoId是否隶属storeId
    res.json(store.businessHours.Tuesday)
}







module.exports = {
    getStoreBusinessTimeById,
    addStoreBusinessTimeById,
    deleteStoreBusinessTimeById,
    updateStoreBusinessTimeById,
    SyncStoreCalendarToService,

}