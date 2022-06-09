
const Order = require('../modules/order');

//create order
async function addOrder(req, res){
    console.log('Adding a new order...');
    const { peopleNumber, orderTime, status , userId,storeCode,serviceInfoId,optionInfo} = req.body;

    const newOrder = new Order({ peopleNumber, orderTime, status,userId,storeCode,serviceInfoId,optionInfo });
    await newOrder.save();

    res.status(200).json(newOrder);
}
//update
async function updateOrderByID(req,res){
    const { id } = req.params;
    const { peopleNumber, orderTime, status } = req.body;
    const order = await Order.findByIdAndUpdate(
      id,
      { peopleNumber, orderTime, status,userId,storeCode,serviceInfoId,optionInfo },
      { new: true }
    ).exec();
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    return res.json(order);
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
    return res.json(order);
};
//get all
async function getAllOrders(req, res){
    console.log('Finding all orders...');
    const orders = await Order.find();

    res.json(orders);
}

module.exports = {
    getAllOrders,
    getOrderByID,
    addOrder,
    updateOrderByID,
    deleteOrderByID,
}
