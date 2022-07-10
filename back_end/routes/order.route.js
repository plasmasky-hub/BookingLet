const express = require('express');
const { getAllOrders, addOrder, updateOrderByID, getOrderByID, confirmOrder, cancelOrder } = require('../controllers/order.controller');

const orderRouter = express.Router();

orderRouter.get('', getAllOrders);
orderRouter.post('', addOrder);
orderRouter.get('/:id', getOrderByID);
orderRouter.put('/:id', updateOrderByID);
orderRouter.delete('/:id', cancelOrder);
orderRouter.put('/:id/store', confirmOrder);

module.exports = orderRouter;