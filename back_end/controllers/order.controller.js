
const Order = require('../models/order'); 
const User =require('../models/user');
const Store =require('../models/store');
const ServiceInfo =require('../models/serviceInfo')
const { any } = require('joi');

//create order
async function addOrder(req, res){
    console.log('Adding a new order...');
    const { peopleNumber, orderTime, bookingStatus,cancelStatus,userId,storeId,serviceInfoId,tel,optionInfo,bookingTime } = req.body;
    const newOrder = new Order({ peopleNumber, orderTime, bookingStatus,cancelStatus,userId,storeId,serviceInfoId,tel,optionInfo,bookingTime });
    const orderId =newOrder._id;
    const serviceId = newOrder.serviceInfoId;
    const newOrderTime =newOrder.orderTime;
    const usersId=newOrder.userId;
   
    //get orders with the same services ID and same order time
    const userExist =await Order.find({"orderTime":newOrderTime ,"userId":usersId,"serviceInfoId":serviceId,})

    //Object.key(orders).length ===0  JSON.stringify(orders)==='{}'

    if(JSON.stringify(userExist)!=='[]'){
      return res.status(200).json('You have already booked the same time, pleas check your order list')
     }

    //check Service Number
     //get the number of max Services 
     const services = await ServiceInfo.findById(serviceId);
     const maxServicesNumber= services.maxServicePerSection;
     console.log(maxServicesNumber);
     //Already have number
     const existServicesNumber = await Order.count({"orderTime":newOrderTime ,"serviceInfoId":serviceId})
     console.log(existServicesNumber)

     if(existServicesNumber +1 > maxServicesNumber){
      return res.status(200).json('Booking number is  full, please find another time')
     }
   
    // add orderId into User collection

    const user =await User.findById(userId).exec();
    if(user.orders.indexOf(orderId) !== -1){
      return res.status(400).json({ error: 'Order already exists' });}
      else{
    user.orders.addToSet(orderId);
    await user.save();}
   
    //add orderId into Store collection
    const store = await Store.findById(storeId).exec();
    store.orders.addToSet(orderId);
    await store.save();

    await newOrder.save();
    res.status(200).json(newOrder);
    // res.status(200).json({data:newOrder});
}

//update
async function updateOrderByID(req,res){
    const { id } = req.params;
    const { peopleNumber, orderTime, bookingStatus,cancelStatus,userId,storeId,serviceInfoId,tel,optionInfo,bookingTime } = req.body;
    const order = await Order.findByIdAndUpdate(
      id,
      {peopleNumber, orderTime, bookingStatus,cancelStatus,userId,storeId,serviceInfoId,tel,optionInfo,bookingTime },
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



