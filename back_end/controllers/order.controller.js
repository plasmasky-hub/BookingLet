const Order = require('../models/order');
const User = require('../models/user');
const Store = require('../models/store');
const ServiceInfo = require('../models/serviceInfo');
const {
  checkTimeIntervalAndBook,
  bookingWithdraw,
  checkDateFormat
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
//delete
// async function deleteOrderByID(req,res){
//     const { id } = req.params;
//     const order = await Order.findByIdAndDelete(id).exec();
//     if (!order) {
//       return res.status(404).json({ error: 'Order not found' });
//     }
//     // return res.sendStatus(200).json("Order has been deleted!");
//     return res.sendStatus(200)
// };
//get one
async function getOrderByID(req, res) {
  const { id } = req.params;
  const order = await Order.findById(id).exec();
  if (!order) {
    return res.status(400).json({ error: 'Order not found' });
  }
  return res.status(200).json(order);
}


async function getAllOrders(req, res) {
  const { userId, storeId, showAll = false } = req.query;
  let findQuery = {};
  if (storeId !== undefined) { findQuery.storeId = storeId };
  if (userId !== undefined) { findQuery.userId = userId };
  let qty = showAll ? 99999 : 99;


  const orders = await Order.find(findQuery).sort({ bookingTime: -1 }).populate('storeId', 'name location tel').populate('userId', 'name tel email').limit(qty).exec();
  if (!orders) {
    return res.status(400).json({ error: 'Order not found' });
  }
  return res.status(200).json(orders);
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
