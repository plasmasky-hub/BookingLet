const Store = require('../models/store');
const ServiceInfo = require('../models/serviceInfo');
const BookingRecord = require('../models/bookingRecord');
const { get } = require('mongoose');


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
    if (serviceInfo.store._id != storeId) { res.json({ Error: 'Store and serviceInfo do not match!' }) };   //先查store和service是否有从属关系

    let deletePermission = true;
    Object.keys(serviceInfo.calendarTemplate).forEach((key) => {   //验证serviceInfo.calendarTemplate是否全为空，如果不为空无法同步并报错。
        if (serviceInfo.calendarTemplate[key].length > 0) {
            deletePermission = false;
            res.json({ Error: 'Could not sync because serviceInfo.calendarTemplate is not null!' })
        }
    })

    if (deletePermission) {
        Object.keys(store.businessHours).forEach((key) => {   //将改装后的store.businessHours数组注入serviceInfo.calendarTemplate
            let serviceCalendarTemplate = store.businessHours[key].map((element) => {
                return { timeSlice: element, reservation: 0, availability: true }
            });
            serviceInfo.calendarTemplate[key].push(...serviceCalendarTemplate);
        })
        serviceInfo.save();
    }
    res.json(serviceInfo);
}


async function getServiceInfoCalendarById(req, res) {
    const { id } = req.params;
    const serviceInfo = await ServiceInfo.findById(id).exec();
    res.json(serviceInfo.calendarTemplate)
}


async function addServiceInfoCalendarById(req, res) {
    const { id } = req.params;
    let { dayOfWeek, openHour, closingHour } = req.body;
    const serviceInfo = await ServiceInfo.findById(id).exec();

    openHour = parseInt(openHour);
    closingHour = parseInt(closingHour);
    let timeSliceArr = [];
    for (let i = openHour; i < closingHour; i += 5) {
        if (i % 100 < 60) { timeSliceArr.push(i); };
    }

    let dbDayOfWeekArray = serviceInfo.calendarTemplate[dayOfWeek];  //由于数据库的数组中每一项都是{}，无法直接对比，所以先存下来再拆
    let dbDifferentialTimeArray = dbDayOfWeekArray.map((element) => {   //把对象数组重组为微分时间数组
        return element.timeSlice;
    });

    for (let i = 0; i < timeSliceArr.length; i++) {
        if (dbDifferentialTimeArray.indexOf(timeSliceArr[i]) === -1) {
            serviceInfo.calendarTemplate[dayOfWeek].push({
                timeSlice: timeSliceArr[i],
                reservation: 0,
                availability: true
            })
        };
    }

    await serviceInfo.save();

    /** Sync the added time interval to related documents in bookingRecord.
    /*  1. 当添加营业时间interval时，添加后遍历bookingRecord表中所有(serviceInfoId相同 && 创建时间码 >= 当前时间码 )的documents。
    /*  2. 为documents添加同样的时间interval。
    */
    let currentDateTime = new Date();
    let currentDate = new Date(currentDateTime.toLocaleDateString());
    let currentWeekMonday = getWeekMonday(currentDate);

    const bookingRecordArr = await BookingRecord.find({ serviceInfoId: id, weekMonday: { $gte: currentWeekMonday } }).exec();
    const matchedArrQty = bookingRecordArr.length;

    for (let i = 0; i < matchedArrQty; i++) {
        for (let j = 0; j < timeSliceArr.length; j++) {
            if (bookingRecordArr[i].serviceHours[dayOfWeek].findIndex((element) => element.timeSlice === timeSliceArr[j]) === -1) { //这里检测的是[如果timeSliceArr里的元素在db数组中不存在]。
                bookingRecordArr[i].serviceHours[dayOfWeek].push({
                    timeSlice: timeSliceArr[j],
                    reservation: 0,
                    availability: true
                })
            };
        }
        await bookingRecordArr[i].save();
    }

    if (req.body.statistic === undefined) {
        res.json({ serviceInfo, 'matched bookingRecord Qty': matchedArrQty });
    } else {
        req.body.statistic.addStage = matchedArrQty;
        let updateStatistic = req.body.statistic;
        res.json({ serviceInfo, updateStatistic });
    }

}


async function deleteServiceInfoCalendarById(req, res) {
    const { id } = req.params;
    let { dayOfWeek, openHour, closingHour } = req.body;
    const serviceInfo = await ServiceInfo.findById(id).exec();

    openHour = parseInt(openHour);
    closingHour = parseInt(closingHour);
    let timeSliceArr = [];
    for (let i = openHour; i < closingHour; i += 5) {
        if (i % 100 < 60) { timeSliceArr.push(i); };
    }

    let dbDayOfWeekArray = serviceInfo.calendarTemplate[dayOfWeek];
    let dbDifferentialTimeArray = dbDayOfWeekArray.map((element) => {
        return element.timeSlice;
    });

    for (let i = 0; i < timeSliceArr.length; i++) {
        if (dbDifferentialTimeArray.indexOf(timeSliceArr[i]) > -1) {
            let j = dbDifferentialTimeArray.length;
            while (j--) {
                if (dbDifferentialTimeArray[j] === timeSliceArr[i]) {
                    dbDifferentialTimeArray.splice(j, 1);  //这里写两个数组的原因是，db中的{}数组无法直接遍历其{}中某属性。因此把之前存下来
                    serviceInfo.calendarTemplate[dayOfWeek].splice(j, 1);  //的本地数组作为删除索引对照组，本地数组与数据库数组同步删除元素。
                }
            }
        }
    };

    await serviceInfo.save();

    /** Sync the deleted time interval to related documents in bookingRecord.
    /*  1. 当删除营业时间interval时，添加后遍历bookingRecord表中所有(serviceInfoId相同 && 创建时间码 >= 当前时间码 )的documents。
    /*  2. 遍历所得documents。对于每一个document，如果timeSlice数组中的任何timeSlice对应的时间 reservation > 0，此document就无法进行删除操作。
    /*  3. 如果timeSlice数组中的任何timeSlice对应的时间 reservation === 0，此document进行删除操作
    */
    let currentDateTime = new Date();
    let currentDate = new Date(currentDateTime.toLocaleDateString());
    let currentWeekMonday = getWeekMonday(currentDate);

    const bookingRecordArr = await BookingRecord.find({ serviceInfoId: id, weekMonday: { $gte: currentWeekMonday } }).exec();
    const matchedArrQty = bookingRecordArr.length;

    let matchedRecordStatistic = [];
    for (let i = 0; i < matchedArrQty; i++) {
        let deletePermission = true;
        for (let j = 0; j < timeSliceArr.length; j++) {
            let index = bookingRecordArr[i].serviceHours[dayOfWeek].findIndex((element) => element.timeSlice === timeSliceArr[j]);
            if (index > -1) {   //这里检测的是[如果timeSliceArr里的元素在db数组中存在]。               
                deletePermission = (bookingRecordArr[i].serviceHours[dayOfWeek][index].reservation > 0) ? false : deletePermission;  //如果这个元素存在预约，则删除权限为否。否则权限不变。
            }
        }
        matchedRecordStatistic.push({ WeekTime: bookingRecordArr[i].weekMonday, deletePermission });

        if (deletePermission) {
            for (let j = 0; j < timeSliceArr.length; j++) {
                let index = bookingRecordArr[i].serviceHours[dayOfWeek].findIndex((element) => element.timeSlice === timeSliceArr[j]);
                if (index > -1) {
                    bookingRecordArr[i].serviceHours[dayOfWeek].splice(index, 1); //删除bookingRecordArr[i].serviceHours[dayOfWeek][index]
                };
            }
            await bookingRecordArr[i].save();
        }
    }

    if (req.body.openHourBefore === undefined) {
        res.json({ serviceInfo, 'matched bookingRecord Qty': matchedArrQty, matchedRecordStatistic })
    } else {
        req.body.statistic = { deleteStage: matchedRecordStatistic }
    };
}


async function updateServiceInfoCalendarById(req, res) {
    [req.body.openHour, req.body.closingHour] = [req.body.openHourBefore, req.body.closingHourBefore];
    await deleteServiceInfoCalendarById(req, res);

    [req.body.openHour, req.body.closingHour] = [req.body.openHourAfter, req.body.closingHourAfter];
    await addServiceInfoCalendarById(req, res);
}


async function checkTimeIntervalAndBook(req, res) {
    /** algorithm
    * 所需参数：bookingDate，startHour，endHour，serviceInfoId
    * 用户下订单时发生了什么？
    * 1. 把订单的timeInterval拆分为timeSliceArr数组。
    * 2. 首先使用serviceInfoId和时间码*，去bookingRecord表中查询是否存在符合条件的document。进入分支：
    *
    * 分支1：如果没有符合条件的document 
    * 1.1. 检测: timeSliceArr中的所有timeSlice是否落在serviceInfo的模板内。如果否，报错：所选时间不是营业时间。如果是，进入下一步。
    * 1.2. 使用serviceInfoId和时间码*，创建该document。创建方式为复制serviceInfo的模板。
    * 1.3. 遍历timeSliceArr中每一项，向上一步创建的document中对应timeSlice项reservation+1，并且对比maxServicePerSection更新availability状态。
    * 1.4. 返回成功预定的状态。
    *
    * 分支2：如果有符合条件的document
    * 2.1. 取到该document。检测1：timeSliceArr所有元素是否全在document中的serviceHours中。如果否，报错：所选时间不是营业时间。如果是，进入下一步。
    * 2.2. 检测2：检测timeSliceArr所有元素在document中，是否满足 reservation < maxServicePerSection && availability === true。如果否，报错：预约时间已满。如果是，进入下一步。
    * 2.3. 遍历timeSlice数组中每一项，向document中reservation+1，并且对比maxServicePerSection更新availability状态。
    * 2.4. 返回成功预定的状态。
    *
    * * [bookingDate所在周]的周一日期。type为Date，由getWeekMonday(bookingDate)获得。
    */
    const { id } = req.params;
    let { date, startHour, endHour } = req.body;
    let bookingDate = new Date(date);
    let weekMonday = getWeekMonday(bookingDate);  //output: "2022-07-11T00:00:00.000Z"
    let serviceInfoId = id;

    startHour = parseInt(startHour);
    endHour = parseInt(endHour);
    let timeSliceArr = [];
    for (let i = startHour; i < endHour; i += 5) {
        if (i % 100 < 60) { timeSliceArr.push(i); };
    }

    const bookingRecordArr = await BookingRecord.find({ serviceInfoId: id, weekMonday: weekMonday }).exec();

    if (bookingRecordArr.length === 0) { bookingResult = await createBookingRecordAndBook(serviceInfoId, bookingDate, timeSliceArr); };
    if (bookingRecordArr.length === 1) { bookingResult = await checkBookingRecordAndBook(serviceInfoId, bookingDate, timeSliceArr); };
    if (bookingRecordArr.length > 1) { bookingResult = { Error: 'Database error!' } };

    res.json(bookingResult)
}


async function createBookingRecordAndBook(serviceInfoId, bookingDate, timeSliceArr) {
    const serviceInfo = await ServiceInfo.findById(serviceInfoId).exec();
    let dayOfWeek = getDayOfWeek(bookingDate);

    let dbDayOfWeekArray = serviceInfo.calendarTemplate[dayOfWeek];
    let dbDifferentialTimeArray = dbDayOfWeekArray.map((element) => {
        return element.timeSlice;
    });

    let decision = { message: null, permission: true };
    for (let i = 0; i < timeSliceArr.length; i++) {
        if (dbDifferentialTimeArray.indexOf(timeSliceArr[i]) < 0) {
            decision.message = 'Selected time interval is not in business time! (from create branch)';
            decision.permission = false;
        }
    }

    if (decision.permission) {
        let weekMonday = getWeekMonday(bookingDate);
        let serviceHours = serviceInfo.calendarTemplate;
        let storeId = serviceInfo.store;
        const bookingRecord = new BookingRecord({ serviceInfoId, storeId, weekMonday, serviceHours });
        await bookWithPermission(bookingRecord, serviceInfo, decision, dayOfWeek, timeSliceArr);
    }

    return ({ decision, dayOfWeek, timeSliceArr, dbDifferentialTimeArray })
}


async function checkBookingRecordAndBook(serviceInfoId, bookingDate, timeSliceArr) {
    let weekMonday = getWeekMonday(bookingDate);
    let dayOfWeek = getDayOfWeek(bookingDate);
    const serviceInfo = await ServiceInfo.findById(serviceInfoId).exec();
    const bookingRecordArr = await BookingRecord.find({ serviceInfoId: serviceInfoId, weekMonday: weekMonday }).exec();
    let bookingRecord = bookingRecordArr[0];

    let dbDayOfWeekArray = bookingRecord.serviceHours[dayOfWeek];
    let dbDifferentialTimeArray = dbDayOfWeekArray.map((element) => {
        return element.timeSlice;
    });

    let decision = { message: null, permission: true };
    for (let i = 0; i < timeSliceArr.length; i++) {
        if (dbDifferentialTimeArray.indexOf(timeSliceArr[i]) < 0) {
            decision.message = 'Selected time interval is not in business time! (from check branch)';
            decision.permission = false;
        }
    }

    if (decision.permission) {
        let notBookableTimeSliceArr = dbDayOfWeekArray.filter((element) => {
            return (timeSliceArr.indexOf(element.timeSlice) > -1) && (element.reservation >= serviceInfo.maxServicePerSection || element.availability === false);
        });
        if (notBookableTimeSliceArr.length > 0) {
            decision.message = 'Reservation in selected time is full! (from check branch)';
            decision.permission = false;
        }
    }

    if (decision.permission) { await bookWithPermission(bookingRecord, serviceInfo, decision, dayOfWeek, timeSliceArr); }

    return ({ decision, dayOfWeek, timeSliceArr, dbDifferentialTimeArray })
}


function getWeekMonday(bookingDate) { //此处有问题，时间有时不准。但是暂不影响检索和查重
    let dayInWeekIndex = bookingDate.getDay();
    switch (dayInWeekIndex) {
        case 0: dayGap = 1000 * 60 * 60 * 24 * 6; break;
        case 1: dayGap = 0; break;
        case 2: dayGap = 1000 * 60 * 60 * 24; break;
        case 3: dayGap = 1000 * 60 * 60 * 24 * 2; break;
        case 4: dayGap = 1000 * 60 * 60 * 24 * 3; break;
        case 5: dayGap = 1000 * 60 * 60 * 24 * 4; break;
        case 6: dayGap = 1000 * 60 * 60 * 24 * 5; break;
    }
    let timeZoneCorrection = 10 * 60 * 60 * 1000;
    return new Date(bookingDate - dayGap + timeZoneCorrection);
}


function getDayOfWeek(bookingDate) {
    let dayInWeekIndex = bookingDate.getDay()
    switch (dayInWeekIndex) {
        case 0: dayInWeek = "Sunday"; break;
        case 1: dayInWeek = "Monday"; break;
        case 2: dayInWeek = "Tuesday"; break;
        case 3: dayInWeek = "Wednesday"; break;
        case 4: dayInWeek = "Thursday"; break;
        case 5: dayInWeek = "Friday"; break;
        case 6: dayInWeek = "Saturday"; break;
    }
    return dayInWeek;
}


async function bookWithPermission(bookingRecord, serviceInfo, decision, dayOfWeek, timeSliceArr) {
    bookingRecord.serviceHours[dayOfWeek] = bookingRecord.serviceHours[dayOfWeek].map((element) => {
        let newElement = {};
        (timeSliceArr.indexOf(element.timeSlice) === -1) ? (
            newElement = { ...element }
        ) : (
            newElement.timeSlice = element.timeSlice,
            newElement.reservation = element.reservation + 1,
            newElement.availability = (newElement.reservation < serviceInfo.maxServicePerSection) ? true : false
        );
        return newElement;
    });
    await bookingRecord.save();
    decision.message = 'Booking successful!';
}



//营业时间锁：
//如果serviceInfo添加营业时间interval，它的所有timeSlice必须在store的营业时间内，否则拒绝。
//如果store删除营业时间interval，检索所有从属serviceInfo，删除的营业时间必须不存在于任何serviceInfo内，否则拒绝。

//maxServicePerSection修改问题
//如果商家修改maxServicePerSection，需要遍历serviceInfo下所有（创建时间码 >= 当前时间码）的bookingRecord。所得所有documents要更新availability的状态。





async function getAllRecords(req, res) {   //dev test only!
    const records = await BookingRecord.find().exec();
    res.json(records);
}


async function deleteAllRecords(req, res) {   //dev test only! 不是真的要一键删库！
    const records = await BookingRecord.deleteMany().exec();
    res.json(records);
}


module.exports = {
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
}