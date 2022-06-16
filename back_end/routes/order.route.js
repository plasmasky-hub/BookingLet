const express = require('express');
const { getAllOrders, addOrder, updateOrderByID, getOrderByID, deleteOrderByID,confirmOrder,cancelOrder } = require('../controllers/order.controller');

const orderRouter = express.Router();

orderRouter.get('', getAllOrders);
orderRouter.post('', addOrder);
orderRouter.get('/:id', getOrderByID);
orderRouter.put('/:id', updateOrderByID);
orderRouter.delete('/:id', deleteOrderByID);
orderRouter.put('/:id/store', confirmOrder);
orderRouter.put('/:id/user', cancelOrder);


module.exports = orderRouter;