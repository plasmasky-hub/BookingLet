
const Order = require('../models/order'); 
const User =require('../models/user');
const Store =require('../models/store');
const ServiceInfo =require('../models/serviceInfo')
const { any } = require('joi');
const { checkTimeIntervalAndBook}=require('./calendar.controller');


//create order
async function addOrder(req,res){
  const { peopleNumber, orderTime,userId,serviceInfoId,tel,optionInfo} = req.body;
  const bookingTime =new Date(orderTime.date)
  const serviceInfo =await ServiceInfo.findById(serviceInfoId).exec();
  const storeId =serviceInfo.store;


//slice time
  let startHour = parseInt(orderTime.startTime);
  let endHour = parseInt(orderTime.endTime);
  let timeSliceArr = [];
    for (let i = startHour; i < endHour; i += 5) {
        if (i % 100 < 60) { timeSliceArr.push(i); };
    }

  const orderArr = await Order.find({"orderTime.date":orderTime.date,"serviceInfoId":serviceInfoId,"userId":userId}).exec();
  let permission=true;

  for(let i =0; i< orderArr.length; i++){
    let comparedTimeSliceArr = [];
    let comparedStartHour = parseInt(orderArr[i].orderTime.startTime);
    let comparedEndHour = parseInt(orderArr[i].orderTime.endTime);

    for (let j =  comparedStartHour; j < comparedEndHour; j += 5) {
        if (j % 100 < 60) { comparedTimeSliceArr.push(j); };
    }
    let repeatedTimeSlice= comparedTimeSliceArr.filter((element)=>{
      return timeSliceArr.indexOf(element)> -1 
    })
    if ( repeatedTimeSlice.length>0){
      permission= false;
    }
  }


  // res.json(comparedTimeSliceArr);

  

  
  // const user =await User.findById(userId).exec();
  //   if(user.orders.indexOf(orderId) !== -1){
  //     return res.status(400).json({ error: 'Order already exists' });}
  //     else{
  //   user.orders.addToSet(orderId);
  //   await user.save();}
   
  //   //add orderId into Store collection
  //   const store = await Store.findById(storeId).exec();
  //   store.orders.addToSet(orderId);
  //   await store.save();
if(permission){
  [req.body.date,req.body.startHour,res.body.endHour]=[
    req.body.orderTime.date,req.body.orderTime.startTime,req.body.orderTime.endTime]
    const newOrder = new Order({ peopleNumber, orderTime,userId,storeId,serviceInfoId,tel,optionInfo,bookingTime });
    await newOrder.save();

    await checkTimeIntervalAndBook(req,res);
    
}else{
     res.send("You have made an appointment at same time, please select another time. ")
}
}



//update
async function updateOrderByID(req,res){
    const { id } = req.params;
    const { peopleNumber, orderTime,tel,optionInfo,bookingTime } = req.body;
    const order = await Order.findByIdAndUpdate(
      id,
      {peopleNumber, orderTime,tel,optionInfo,bookingTime },
      { new: true }
    ).exec();
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    return res.status(200).json(order);
};
// Store confirm order ->change booking status from false to true
async function confirmOrder(req,res){
  console.log('Confirm Order');
  const {id}=req.params;
  const {bookingStatus}=req.body;
  const order =await Order.findByIdAndUpdate(
    id,{$set:{bookingStatus:true}},{new:true}
  ).exec();
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  await order.save();
  return res.status(200).json(order);

}
//Cancel Order  fake delete
async function cancelOrder(req,res){
  console.log('Cancel Order');
  const {id}=req.params;
  const {cancelStatus}=req.body;
  const order =await Order.findByIdAndUpdate(
    id,{$set:{cancelStatus:true}},{new:true}
  ).exec();

  if (!order) {
    return res.status(400).json({ error: 'Order not found' });
  }

  await order.save();
  return res.status(204).json(order);

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
async function getOrderByID(req,res){
    const { id } = req.params;
    const order = await Order.findById(id).exec();
    if (!order) {
      return res.status(400).json({ error: 'Order not found' });
    }
    return res.status(200).json(order);
};
//get all
async function getAllOrders(req, res){
    console.log('Finding all orders...');
    //Order.find().sort().limit()--> pagination 分页处理
    const orders = await Order.find().exec();
    if (!orders) {
      return res.status(400).json({ error: 'Order not found' });
    }
    if(JSON.stringify(orders)==='[]'){
      return res.status(404).json({ error: 'Order data is empty in database' });

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
    cancelOrder
    
 

   
}



