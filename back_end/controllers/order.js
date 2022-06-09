
const Order = require('../modules/order');
const User =require('../modules/user');
// const Store =require('../modules/store')

//create order
async function addOrder(req, res){
    console.log('Adding a new order...');
    const { peopleNumber, orderTime, bookingStatus,cancelStatus,userId,storeId,serviceInfoId,optionInfo } = req.body;

    const newOrder = new Order({ peopleNumber, orderTime, bookingStatus,cancelStatus,userId,storeId,serviceInfoId,optionInfo });
    await newOrder.save();

    // res.status(200).json(newOrder);
    res.status(200).json({data:newOrder});
}
//add  orderId into User collection
async function addOrderToUser(req,res){
    const {orderId,userId} =req.params;
    let order =await Order.findById(orderId).exec();
    const user =await User.findById(userId).exec();
    if(!order || !user){
        return res.status(404).json({error:'order or user not found'})
    }
    // return res.json ({'order id':orderId, 'user code:': userId});
    order = await Order.findByIdAndUpdate(
        orderId,
        {$push:{userId:userId}},
        {new:true}
    ).exec();
    user.orders.addToSet(orderId);
    await user.save();

    return res.json(order)
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
    return res.json({data:orders});
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
//remove orderId from User collection
async function removeOrderFromUser(req,res){
    const {orderId,userId} =req.params;
    let order =await Order.findById(orderId).exec();
    const user =await User.findById(userId).exec();
    if(!order || !user){
        return res.status(404).json({error:'order or user not found'})
    }
    // return res.json ({'order id':orderId, 'user code:': userId});
    order = await Order.findByIdAndUpdate(
        orderId,
        {$pull:{userId:userId}},
        {new:true}
    ).exec();
    await User.findByIdAndUpdate(userId,{$pull:{orders:orderId}}).exec();
    

    return res.json(order)
}
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
    addOrderToUser,
    // addOrderToStore
    removeOrderFromUser,
}
