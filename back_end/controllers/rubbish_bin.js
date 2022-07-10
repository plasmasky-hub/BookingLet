//req.body: {dayOfWeek: String, openHour: String, closingHour: String}
async function addStoreBusinessTimeById(req, res) {
    //1. 以storeId找到store
    //2. 遍历req.body的数组
    //3. 将req.body数组中的每一项拆分成微分时间
    //4. 把拆分后的微分时间，按照dayOfWeek插入store的businessHours中（合并）。
    //5. 如果是更新（删除原有的openHour，前端应该可以点击后删除）
    /*businessHours: [{
        dayOfWeek: String,
        openInterval: [Number]
    }],*/

    const { id } = req.params;
    let { dayOfWeek, openHour, closingHour } = req.body;
    const store = await Store.findById(id).exec();

    openHour = parseInt(openHour);         //string转换为number。为了方便计算
    closingHour = parseInt(closingHour);

    let businessHours = store.businessHours;     //取数组，查重，如果数组中没有前端发来的day则添加。
    let businessDayArr = businessHours.map((element)=>{
        return element.dayOfWeek;
    })
    if(businessDayArr.indexOf(dayOfWeek) === -1) {  //查重，因为数组中每周的每一天只有一个元素。
        businessHours.push({
            dayOfWeek,
            openInterval: []
        })
        await store.save();
    }

    let openInterval = [];
    for (let i = openHour; i < closingHour; i += 5) {   //将微分时间注入选定dayOfWeek中
        if (i % 100 < 60) {
            openInterval.push(i)
        };
    };
    res.json(store)
}

async function checkTimeAvailability(orderDate,serviceId){
    console.log('repeatedly verification...1');
    // const {orderTime,serviceInfoId}=req.body;
    const orderTimeDate=orderDate.date
    let orderDay= new Date(orderTimeDate);
    let dayInWeekIndex=orderDay.getDay();
    let dayInWeek = undefined;
    switch(dayInWeekIndex){
      case 0:  dayInWeek ="Sunday"; break;
      case 1:  dayInWeek ="Monday"; break;
      case 2:  dayInWeek ="Tuesday"; break;
      case 3:  dayInWeek ="Wednesday"; break;
      case 4:  dayInWeek ="Thursday"; break;
      case 5:  dayInWeek ="Friday"; break;
      case 6:  dayInWeek ="Saturday"; break;
    }
    // return console.log(dayInWeek)
  // get open hours from serviceInfo time
  // console.log(id);
  const service = await ServiceInfo.findById(serviceId);
  const maxService=service.maxServicePerSection;
  const startTimeArr=service.startTime;
  
  let openHourArr= undefined;
  for(i=0;i<startTimeArr.length; i++){
    if(startTimeArr[i].dayOfWeek=== dayInWeek){
     openHourArr= startTimeArr[i].openHours;
    }
  }
  //new Order Time 
  let orderTimeObjArr=openHourArr.map((element)=>{
     return {date:orderDay,time:element}
  })
  
  let availableTime=[];
  for(j=0;j<orderTimeObjArr.length;j++){
     orderCount = await Order.count({"orderTime":orderTimeObjArr[j],"serviceInfoId":serviceId})
     availableTime.push({orderTime:orderTimeObjArr[j].time,availability:(orderCount< maxService)?true:false})
  }
  return availableTime;
  // return res.status(200).json(availableTime);
  
  }
  
  async function callCheckTimeAvailability(req,res){
    console.log('repeatedly verification...2');
    const {orderTime,serviceInfoId}=req.body;
    const availableTime= await checkTimeAvailability(orderTime,serviceInfoId);
    if (!availableTime) {
      return res.status(404).json({ error });
    }
    return res.status(200).json(availableTime);
  
    // const {orderTime,serviceInfoId}=req.body;
    // const orderTimeDate=orderTime.date
    // let orderDay= new Date(orderTimeDate);
    // let dayInWeekIndex=orderDay.getDay();
    // let dayInWeek = undefined;
    // switch(dayInWeekIndex){
    //   case 0:  dayInWeek ="Sunday"; break;
    //   case 1:  dayInWeek ="Monday"; break;
    //   case 2:  dayInWeek ="Tuesday"; break;
    //   case 3:  dayInWeek ="Wednesday"; break;
    //   case 4:  dayInWeek ="Thursday"; break;
    //   case 5:  dayInWeek ="Friday"; break;
  //     case 6:  dayInWeek ="Saturday"; break;
  //   }
  // // get open hours from serviceInfo time
  // const service = await ServiceInfo.findById(serviceInfoId).exec();
  // const maxService=service.maxServicePerSection;
  // const startTimeArr=service.startTime;
  
  // let openHourArr= undefined;
  // for(i=0;i<startTimeArr.length;i++){
  //   if(startTimeArr[i].dayOfWeek=== dayInWeek){
  //    openHourArr= startTimeArr[i].openHours;
  //   }
  // }
  // //new Order Time 
  // let orderTimeObjArr=openHourArr.map((element)=>{
  //    return {date:orderDay,time:element}
  // })
  
  // let availableTime=[];
  // for(j=0;j<orderTimeObjArr.length;j++){
  //    b = await Order.count({"orderTime":orderTimeObjArr[j],"serviceInfoId":serviceInfoId})
  //    availableTime.push({orderTime:orderTimeObjArr[j].time,availability:(b< maxService)?true:false})
  // }
  // res.status(200).json(availableTime);
  }
  async function addOrder(req, res){
    console.log('Adding a new order...');
    const { peopleNumber, orderTime, bookingStatus,cancelStatus,userId,storeId,serviceInfoId,tel,optionInfo,bookingTime  } = req.body;
    const newOrder = new Order({ peopleNumber, orderTime, bookingStatus,cancelStatus,userId,storeId,serviceInfoId,tel,optionInfo,bookingTime  });
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
    //  const services = await ServiceInfo.findById(serviceId);
    //  const maxServicesNumber= services.maxServicePerSection;
    //  console.log(maxServicesNumber);
    //  //Already have number
    //  const existServicesNumber = await Order.count({"orderTime":newOrderTime ,"serviceInfoId":serviceId})
    //  console.log(existServicesNumber)

    //  if(existServicesNumber +1 > maxServicesNumber){
    //   return res.status(200).json('Booking number is  full, please find another time')
    //  }
   
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
    res.status(201).json(newOrder);
    // res.status(200).json({data:newOrder});
}