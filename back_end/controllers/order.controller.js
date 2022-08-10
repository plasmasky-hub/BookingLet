const Order = require('../models/order');
const User = require('../models/user');
const Store = require('../models/store');
const ServiceInfo = require('../models/serviceInfo');
const {
  checkTimeIntervalAndBook,
  bookingWithdraw,
  checkDateFormat,
  getWeekMonday
} = require('./calendar.controller');
const { any } = require('joi');

//create order
async function addOrder(req, res) {
  const { peopleNumber, orderTime, userId, serviceInfoId, tel, optionInfo } =
    req.body;
  const dateFormatCheckResult = checkDateFormat(orderTime.date);
  if (!dateFormatCheckResult.permission) {
    return res.json(dateFormatCheckResult.message)
  };

  const bookingTime = new Date();
  const serviceInfo = await ServiceInfo.findById(serviceInfoId).exec();
  if (!serviceInfo || serviceInfo.isDiscard) {
    return res.status(404).json({
      error: 'service info not found!',
    });
  }
  const storeId = serviceInfo.store;

  //slice time
  let startHour = parseInt(orderTime.startTime);
  let endHour = null;
  if (orderTime.endTime === undefined) {
    endHour = startHour + 5;
    req.body.orderTime.endTime = startHour + 5;
  } else {
    endHour = parseInt(orderTime.endTime);
  }


  let timeSliceArr = [];
  for (let i = startHour; i < endHour; i += 5) {
    if (i % 100 < 60) {
      timeSliceArr.push(i);
    }
  }

  const orderArr = await Order.find({
    'orderTime.date': orderTime.date,
    serviceInfoId: serviceInfoId,
    userId: userId,
    cancelStatus: false,
  }).exec();
  let permission = true;

  for (let i = 0; i < orderArr.length; i++) {
    let comparedTimeSliceArr = [];
    let comparedStartHour = parseInt(orderArr[i].orderTime.startTime);
    let comparedEndHour = parseInt(orderArr[i].orderTime.endTime);

    for (let j = comparedStartHour; j < comparedEndHour; j += 5) {
      if (j % 100 < 60) {
        comparedTimeSliceArr.push(j);
      }
    }
    let repeatedTimeSlice = comparedTimeSliceArr.filter((element) => {
      return timeSliceArr.indexOf(element) > -1;
    });
    if (repeatedTimeSlice.length > 0) {
      permission = false;
    }
  }

  if (permission) {
    [req.body.date, req.body.startHour, req.body.endHour] = [
      req.body.orderTime.date,
      req.body.orderTime.startTime,
      req.body.orderTime.endTime,
    ];
    let bookingResult = await checkTimeIntervalAndBook(req, res);

    if (bookingResult.decision.permission === true) {
      const newOrder = new Order({
        peopleNumber,
        orderTime,
        userId,
        storeId,
        serviceInfoId,
        tel,
        optionInfo,
        bookingTime,
      });
      createTimestamp(newOrder);
      await newOrder.save();

      const user = await User.findById(userId).exec();
      user.orders.addToSet(newOrder._id);
      await user.save();

      const store = await Store.findById(storeId).exec();
      store.orders.addToSet(newOrder._id);
      store.orderSize++;
      await store.save();
    }
  } else {
    res.send({
      decision: {
        message: 'You have made an appointment at same time',
        permission: false,
      },
    });
  }
}

//update
async function updateOrderByID(req, res) {
  const { id } = req.params;
  const { peopleNumber, orderTime, tel, optionInfo } = req.body;
  const bookingTime = new Date();
  createTimestampInUpdate(orderTime);

  const order = await Order.findByIdAndUpdate(
    id,
    { peopleNumber, orderTime, tel, optionInfo, bookingTime },
    { new: true }
  ).exec();
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  return res.status(200).json(order);
}


// Store confirm order ->change booking status from false to true
async function confirmOrder(req, res) {
  const { id } = req.params;
  const { bookingStatus } = req.body;
  const order = await Order.findByIdAndUpdate(
    id,
    { $set: { bookingStatus: true } },
    { new: true }
  ).exec();
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  await order.save();
  return res.status(200).json(order);
}
//Cancel Order  fake delete
async function cancelOrder(req, res) {
  const { id } = req.params;
  const order = await Order.findByIdAndUpdate(
    id,
    { $set: { cancelStatus: true } },
    { new: true }
  ).exec();

  const { serviceInfoId, orderTime } = order;

  if (!order) {
    return res.status(400).json({ error: 'Order not found' });
  } else {
    await bookingWithdraw(serviceInfoId, orderTime);
  }

  await order.save();
  res.send(order);
}


async function getOrderByID(req, res) {
  const { id } = req.params;
  const order = await Order.findById(id).exec();
  if (!order) {
    return res.status(400).json({ error: 'Order not found' });
  }
  return res.status(200).json(order);
}


async function getAllOrders(req, res) {
  const { userId, storeId, serviceInfoId, periodLimiter, page, onlyShowUnconfirmedBooking = false } = req.query;
  let periodLimiterEnum = ['coming', 'allPrev', 'yearPrev', 'monthPrev', 'weekPrev'];
  if (periodLimiter !== undefined && periodLimiterEnum.indexOf(periodLimiter) < 0) {
    return res.status(400).json('Incorrect period limiter. It must be one of [coming, allPrev, yearPrev, monthPrev, weekPrev].')
  };

  const reg = /^\d+$/;
  if (page !== undefined && (!reg.test(page) || parseInt(page) < 1)) {
    return res.status(400).json('Incorrect page format. It must be a number greater than 1.');
  }

  let findQuery = {};
  if (storeId !== undefined) { findQuery.storeId = storeId };
  if (userId !== undefined) { findQuery.userId = userId };
  if (serviceInfoId !== undefined) { findQuery.serviceInfoId = serviceInfoId };
  if (onlyShowUnconfirmedBooking) { findQuery.bookingStatus = false };
  let qty = page === undefined ? 99999 : 6;
  let pagination = page === undefined ? 0 : (parseInt(page)-1) * 6;

  const currentTime = new Date();
  const currentDateStart = new Date(`${currentTime.getFullYear()}-${(currentTime.getMonth() + 1) < 10 ? '0' + (currentTime.getMonth() + 1) : (currentTime.getMonth() + 1)}-${(currentTime.getDate()) < 10 ? '0' + (currentTime.getDate()) : (currentTime.getDate())} 00:00:00`);
  const currentYearStart = new Date(`${currentTime.getFullYear()}-01-01 00:00:00`);
  const currentMonthStart = new Date(`${currentTime.getFullYear()}-${(currentTime.getMonth() + 1) < 10 ? '0' + (currentTime.getMonth() + 1) : (currentTime.getMonth() + 1)}-01 00:00:00`);
  const currentWeekStart = getWeekMonday(currentDateStart);

  if (periodLimiter === 'coming') { findQuery['orderTime.timestamp'] = { $gte: currentTime } };
  if (periodLimiter === 'allPrev') { findQuery['orderTime.timestamp'] = { $lt: currentTime } };
  if (periodLimiter === 'yearPrev') { findQuery['orderTime.timestamp'] = { $lt: currentTime, $gte: currentYearStart } };
  if (periodLimiter === 'monthPrev') { findQuery['orderTime.timestamp'] = { $lt: currentTime, $gte: currentMonthStart } };
  if (periodLimiter === 'weekPrev') { findQuery['orderTime.timestamp'] = { $lt: currentTime, $gte: currentWeekStart } };

  const matchedOrders = await Order.find(findQuery).exec();
  const pageQty = Math.ceil(matchedOrders.length/6);

  const orders = await Order.find(findQuery).sort({ bookingTime: -1 })
    .populate('storeId', 'name location tel').populate('userId', 'name tel email').populate('serviceInfoId', 'name description').limit(qty).skip(pagination).exec();
  if (!orders) { return res.status(400).json({ error: 'Order not found' }); }
  return res.status(200).json({pageQty, orders});
}


function createTimestamp(order) {
  let orderYear = order.orderTime.date.getFullYear() + '';
  let orderMonth = order.orderTime.date.getMonth() < 9 ? ('0' + (order.orderTime.date.getMonth() + 1)) : ((order.orderTime.date.getMonth() + 1) + '');
  let orderDate = order.orderTime.date.getDate() < 10 ? ('0' + order.orderTime.date.getDate()) : (order.orderTime.date.getDate() + '')

  let startTime = order.orderTime.startTime.length < 2 ? ('000' + order.orderTime.startTime)
    : order.orderTime.startTime.length < 3 ? ('00' + order.orderTime.startTime)
      : order.orderTime.startTime.length < 4 ? ('0' + order.orderTime.startTime)
        : order.orderTime.startTime;

  let orderHour = startTime.substring(0, 2);
  let orderMinute = startTime.substring(2, 4);
  let orderSecond = '00';

  order.orderTime.timestamp = new Date(`${orderYear}-${orderMonth}-${orderDate} ${orderHour}:${orderMinute}:${orderSecond}`);
}


function createTimestampInUpdate(orderTime) {
  let orderYear = orderTime.date.getFullYear() + '';
  let orderMonth = orderTime.date.getMonth() < 9 ? ('0' + (orderTime.date.getMonth() + 1)) : ((orderTime.date.getMonth() + 1) + '');
  let orderDate = orderTime.date.getDate() < 10 ? ('0' + orderTime.date.getDate()) : (orderTime.date.getDate() + '')

  let startTime = orderTime.startTime.length < 2 ? ('000' + orderTime.startTime)
    : orderTime.startTime.length < 3 ? ('00' + orderTime.startTime)
      : orderTime.startTime.length < 4 ? ('0' + orderTime.startTime)
        : orderTime.startTime;

  let orderHour = startTime.substring(0, 2);
  let orderMinute = startTime.substring(2, 4);
  let orderSecond = '00';

  orderTime.timestamp = new Date(`${orderYear}-${orderMonth}-${orderDate} ${orderHour}:${orderMinute}:${orderSecond}`);
  return timestamp;
}



module.exports = {
  getAllOrders,
  getOrderByID,
  addOrder,
  updateOrderByID,
  // deleteOrderByID,
  confirmOrder,
  cancelOrder,
};
