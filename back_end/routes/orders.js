const express = require('express');
const { getAllOrders, addOrder, updateOrderByID, getOrderByID, deleteOrderByID,addOrderToUser, removeOrderFromUser } = require('../controllers/order');

const orderRouter = express.Router();

orderRouter.get('', getAllOrders);
orderRouter.post('', addOrder);
orderRouter.get('/:id', getOrderByID);
orderRouter.put('/:id', updateOrderByID);
orderRouter.delete('/:id', deleteOrderByID);
orderRouter.post('/:orderId/user/:userId', addOrderToUser);
orderRouter.delete('/:orderId/user/:userId', removeOrderFromUser);

module.exports = orderRouter;