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
            while (j--) {
                if (store.businessHours[dayOfWeek][j] === i) {
                    store.businessHours[dayOfWeek].splice(j, 1)
                }
            }
        };
    };
    await store.save();
    if (req.body.openHourBefore === undefined) { res.json(store) };
}


//req.body: {dayOfWeek: String, openHourBefore: String, closingHourBefore: String, openHourAfter: String, closingHourAfter: String}
async function updateStoreBusinessTimeById(req, res) {
    [req.body.openHour, req.body.closingHour] = [req.body.openHourBefore, req.body.closingHourBefore];
    await deleteStoreBusinessTimeById(req, res);

    [req.body.openHour, req.body.closingHour] = [req.body.openHourAfter, req.body.closingHourAfter];
    await addStoreBusinessTimeById(req, res);
}


async function SyncStoreCalendarToService(req, res) {
    const { storeId, serviceInfoId } = req.params;
    const store = await Store.findById(storeId).exec();
    const serviceInfo = await ServiceInfo.findById(serviceInfoId).exec();
    if (serviceInfo.store._id != storeId) { res.json({ Error: 'Store and serviceInfo do not match!' }) };

    Object.keys(serviceInfo.businessHours).forEach((key) => {   //验证serviceInfo.businessHours是否全为空，如果不为空无法同步并报错。
        if (serviceInfo.businessHours[key].length > 0) {
            res.json({ Error: 'Could not sync because serviceInfo.businessHours is not null!' })
        }
    })

    Object.keys(store.businessHours).forEach((key) => {   //将改装后的store.businessHours数组注入serviceInfo.BusinessHours
        let serviceInfoBusinessHours = store.businessHours[key].map((element) => {
            return { differentialTime: element, reservations: new Array(13).fill(0) }
        });
        serviceInfo.businessHours[key].push(...serviceInfoBusinessHours);
    })
    serviceInfo.save();

    res.json(serviceInfo);
}







module.exports = {
    getStoreBusinessTimeById,
    addStoreBusinessTimeById,
    deleteStoreBusinessTimeById,
    updateStoreBusinessTimeById,
    SyncStoreCalendarToService,

}