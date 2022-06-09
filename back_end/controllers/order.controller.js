
const Order = require('../models/Order');
const User =require('../models/user');
// const Store =require('../modules/store')

//create order
async function addOrder(req, res){
    console.log('Adding a new order...');
    const { peopleNumber, orderTime, bookingStatus,cancelStatus,userId,storeId,serviceInfoId,optionInfo } = req.body;

    const newOrder = new Order({ peopleNumber, orderTime, bookingStatus,cancelStatus,userId,storeId,serviceInfoId,optionInfo });
    await newOrder.save();

    // add orderId into User collection
    const user =await User.findById(userId).exec();
    await user.save();

    // res.status(200).json(newOrder);
    res.status(200).json({data:newOrder});
}

//add  orderId into Store collection
// async function addOrderToStore(req,res){
//     const {orderId,storeId} =req.params;
//     let order =await Order.findById(orderId).exec();
//     const store =await Store.findById(storeId).exec();
//     if(!order || !store){
//         return res.status(404).json({error:'order or user not found'})
//     }
//     // return res.json ({'order id':orderId, 'user code:': userId});
//     order = await Order.findByIdAndUpdate(
//         orderId,
//         {$push:{storeId:storeId}},
//         {new:true}
//     ).exec();
//     store.orders.addToSet(orderId);
//     await store.save();

//     return res.json(order)
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
    return res.json({data:order});
};
//delete
async function deleteOrderByID(req,res){
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id).exec();
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    return res.sendStatus(200).json("Order has been deleted!");
};
//get one
async function getOrderByID(req,res){
    const { id } = req.params;
    const order = await Order.findById(id).exec();
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    return res.json({data:order});
};
//get all
async function getAllOrders(req, res){
    console.log('Finding all orders...');
    //Order.find().sort().limit()--> pagination 分页处理
    const orders = await Order.find().exec();

    return res.json({data:orders});
}


module.exports = {
    getAllOrders,
    getOrderByID,
    addOrder,
    updateOrderByID,
    deleteOrderByID,
   
}
