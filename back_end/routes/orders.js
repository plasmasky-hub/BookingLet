const express = require('express');
const { getAllOrders, addOrder, updateOrderByID, getOrderByID, deleteOrderByID } = require('../controllers/order');

const orderRouter = express.Router();

orderRouter.get('', getAllOrders);
orderRouter.post('', addOrder);
orderRouter.get('/:id', getOrderByID);
orderRouter.put('/:id', updateOrderByID);
orderRouter.delete('/:id', deleteOrderByID);

module.exports = orderRouter;