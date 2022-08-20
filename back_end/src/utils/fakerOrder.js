const { faker } =  require('@faker-js/faker/locale/en_AU');
const Store = require('../models/store');
const User = require('../models/user');
const Order = require('../models/order');

const { connectToDB } = require('../database/connect');
const { mongoose } = require('mongoose');
require('dotenv').config();

faker.setLocale('en_AU');

async function randomOder(){

    /* ---------------------- random people number in order --------------------- */
    const peopleNumber = faker.random.numeric();

    /* --------------------------- random ordered time -------------------------- */
    const soonDate = faker.date.soon(2);
    console.log("🚀 ~ file: fakerOrder.js ~ line 19 ~ randomOder ~ soonDate", soonDate)
    
    const orderDate = soonDate.getFullYear() + '-' + (soonDate.getMonth() + 1) + '-' + soonDate.getDate();
    console.log("🚀 ~ file: fakerOrder.js ~ line 20 ~ randomOder ~ orderDate", orderDate)
    // const orderDate = soonDate.getDate();
    const orderTime = soonDate.getHours() + ':' + soonDate.getMinutes() + ':' + soonDate.getSeconds();
    console.log("🚀 ~ file: fakerOrder.js ~ line 23 ~ randomOder ~ orderTime", orderTime)
    // const orderTime = soonDate.format();

    /* ----------------------- random user from user list, include tel ----------------------- */
    const userList = await User.aggregate([
        {
            $project : {
                "_id" : 1,
                tel : 1,
                name : 1,
            }
        }
    ]);

    const chosedUser = faker.helpers.arrayElement(userList);
    console.log("🚀 ~ file: fakerOrder.js ~ line 42 ~ randomOder ~ chosedUser", chosedUser)
    
    const userId = chosedUser._id;
    console.log("🚀 ~ file: fakerOrder.js ~ line 40 ~ randomOder ~ userId", userId)
    const userTel = chosedUser.tel;
    console.log("🚀 ~ file: fakerOrder.js ~ line 42 ~ randomOder ~ userTel", userTel)

    /* ---------------------- random store from store list ---------------------- */
    const stores = await Store.aggregate([
        {
            $project : {
                "_id" : 1,
            }
        }
    ]);

    const storeList = [];
    for( var i in stores ){
        storeList.push(stores[i]._id);
    }
    // console.log("🚀 ~ file: fakerOrder.js ~ line 50 ~ randomOder ~ storeList", storeList)

    const storeId = faker.helpers.arrayElement(storeList);
    console.log("🚀 ~ file: fakerOrder.js ~ line 56 ~ randomOder ~ storeId", storeId)

    /* ----------------- random service info linked to the store ---------------- */
    const orderStore = await Store.find(storeId) ;
    // console.log("🚀 ~ file: faker.controller.js ~ line 180 ~ randomOder ~ orderStore", orderStore)
    const serviceList = orderStore[0].serviceInfos;
    console.log("🚀 ~ file: faker.controller.js ~ line 176 ~ randomOder ~ serviceList", serviceList);
    const orderService = faker.helpers.arrayElement(serviceList);
    // console.log("🚀 ~ file: faker.controller.js ~ line 183 ~ randomOder ~ orderService", orderService)

    /* ------------------------------- option info ------------------------------ */

    const optionInfo = faker.lorem.sentences(1);

    /* -------------------------------------------------------------------------- */
    /*                            Combine to new order                            */
    /* -------------------------------------------------------------------------- */
    const order = new Order({
        peopleNumber : peopleNumber,
        orderTime : {
            date : orderDate,
            time : orderTime,
        },
        userId : userId,
        storeId : storeId,
        serviceInfoId : orderService,
        tel : userTel,
        optionInfo : optionInfo,
    });

    return order;
    
};

connectToDB().then(async function() {
    var newOrder = await randomOder();
    console.log("🚀 ~ file: fakerOrder.js ~ line 79 ~ connectToDB ~ newOrder", newOrder)
    
    // try{
    //     await newOrder.save();
    //     console.log('Add random order successful!');

    // }
    // catch{
    //     console.log('Error in adding order!');
    //     console.log(error);
    // }

}).then(function(){
    mongoose.connection.close();
})