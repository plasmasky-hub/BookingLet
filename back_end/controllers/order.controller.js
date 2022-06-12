
const Order = require('../models/order.model');
const User =require('../models/user.model');
// const Store =require('../modules/store')

//create order
async function addOrder(req, res){
    console.log('Adding a new order...');
    const { peopleNumber, orderTime, bookingStatus,cancelStatus,userId,storeId,serviceInfoId,optionInfo } = req.body;
    const newOrder = new Order({ peopleNumber, orderTime, bookingStatus,cancelStatus,userId,storeId,serviceInfoId,optionInfo });
    await newOrder.save();
    const orderId = newOrder._id;
    // add orderId into User collection
    const user =await User.findById(userId).exec();
    user.orders.addToSet(orderId);
    await user.save();
    //add orderId into Store collection
    // const store = await Store.findById(storeId).exec();
    // store.orders.addToSet(orderId);
    // await store.save();

    res.status(200).json(newOrder);
    // res.status(200).json({data:newOrder});
}

//update
async function updateOrderByID(req,res){
    const { id } = req.params;
    const { peopleNumber, orderTime, bookingStatus,cancelStatus,userId,storeId,serviceInfoId,optionInfo } = req.body;
    const order = await Order.findByIdAndUpdate(
      id,
      {peopleNumber, orderTime, bookingStatus,cancelStatus,userId,storeId,serviceInfoId,optionInfo },
      { new: true }
    ).exec();
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    return res.json(order);
};
// Store confirm order ->change booking status from false to true
async function confirmOrder(req,res){
  const {id}=req.params;
  const {bookingStatus}=req.body;
  const order =await Order.findByIdAndUpdate(
    id,{$set:{bookingStatus:true}},{new:true}
  ).exec();
  await order.save();

  return res.json(order);

}
//Cancel Order  fake delete
async function cancelOrder(req,res){
  const {id}=req.params;
  const {cancelStatus}=req.body;
  const order =await Order.findByIdAndUpdate(
    id,{$set:{cancelStatus:true}},{new:true}
  ).exec();
  await order.save();

  return res.json(order);

}
//delete
async function deleteOrderByID(req,res){
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id).exec();
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    // return res.sendStatus(200).json("Order has been deleted!");
    return res.sendStatus(200)
};
//get one
async function getOrderByID(req,res){
    const { id } = req.params;
    const order = await Order.findById(id).exec();
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    return res.json(order);
};
//get all
async function getAllOrders(req, res){
    console.log('Finding all orders...');
    //Order.find().sort().limit()--> pagination 分页处理
    const orders = await Order.find().exec();

    return res.json(orders);
}


module.exports = {
    getAllOrders,
    getOrderByID,
    addOrder,
    updateOrderByID,
    deleteOrderByID,
    confirmOrder,
    cancelOrder
   
}
