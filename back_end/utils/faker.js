const { faker } =  require('@faker-js/faker/locale/en_AU');
const Store = require('../models/store');
const User = require('../models/user');
const rootCategory = require('../models/rootCategory');
const subCategory = require('../models/subCategory');
const serviceInfoRouter = require('../routes/serviceInfo.route');

faker.setLocale('en_AU');

async function randomUser(req, res){

    const name = faker.name.findName();
    const spliteName = name.split(' ');
    const tel = faker.phone.phoneNumber();
    const email = faker.internet.email(spliteName[ spliteName.length - 2 ], spliteName[ spliteName.length - 1 ]);

    const user = new User({
        name : name,
        tel : tel,
        email : email,
    })

    res.status(200).json(user); 
};

async function randomRootCate(req, res){

    const cateName = faker.name.jobArea();
    const rootCate = new rootCategory({
        name : cateName,
    })

    res.status(200).json(rootCate);
}

async function randomSubCate(req, res){
    const cateName = faker.name.jobArea();
    const subCate = new subCategory({
        name : cateName,
    })

    res.status(200).json(subCate);
}

async function randomStore(req, res){
    
    /* ------------------------------ Name of store ----------------------------- */
    const name = faker.name.findName();
    // console.log("🚀 ~ file: faker.js ~ line 26 ~ randomStore ~ name", name)

    /* ------------------------------- Owner name ------------------------------- */
    // Get all owners' names
    const userList = await User.aggregate(
        [{
            $project : {
                    "_id" : 1,
            }
        }]
    );
    // console.log("🚀 ~ file: faker.js ~ line 22 ~ randomStore ~ userList", userList)

    // transfer object into array
    const nameList = [];
    for( var i in userList ){
        nameList.push(userList[i]._id);
    }
    // console.log("🚀 ~ file: faker.js ~ line 29 ~ randomStore ~ nameList", nameList)

    // Owner is an array
    const owner = faker.helpers.arrayElements( nameList, 1) ;
    // console.log("🚀 ~ file: faker.js ~ line 28 ~ randomStore ~ owner", owner)

    /* ------------------------------ Phone number ------------------------------ */
    const tel = faker.phone.phoneNumber();
    // console.log("🚀 ~ file: faker.js ~ line 30 ~ randomStore ~ tel", tel)

    /* --------------------------------- Address -------------------------------- */
    const state = faker.address.state();
    const location = {
        state : state,
        city : faker.address.city(),
        suburb : faker.address.county(),
        street : faker.address.street(),
        number : faker.random.numeric(2),
        postcode : faker.address.zipCodeByState(state),
    };
    // console.log("🚀 ~ file: faker.js ~ line 35 ~ randomStore ~ location", location)

    /* ------------------------------- Description ------------------------------ */
    const description = faker.lorem.sentences(3);
    // console.log("🚀 ~ file: faker.js ~ line 56 ~ randomStore ~ description", description)

    /* -------------------------------- Category -------------------------------- */
    // Get all categories' names
    const categories = await rootCategory.aggregate(
        [{
            $project : {
                    "_id" : 1,
            }
        }]
    );
    // console.log("🚀 ~ file: faker.js ~ line 68 ~ randomStore ~ categories", categories);

    // transfer object into array
    const categoryList = [];
    for( var i in categories ){
        categoryList.push(categories[i]._id);
    };
    // console.log("🚀 ~ file: faker.js ~ line 72 ~ randomStore ~ categoryList", categoryList);

    const rootCategories = faker.helpers.arrayElements(categoryList);
    // console.log("🚀 ~ file: faker.js ~ line 77 ~ randomStore ~ rootCategories", rootCategories)


    /* -------------------------------------------------------------------------- */
    /*                            Combine to new store                            */
    /* -------------------------------------------------------------------------- */
    const store = new Store({ 
        name : name,
        owner : owner[0],
        tel : tel,
        location : location,
        description : description,
        rootCategories : rootCategories,
    });
    console.log("🚀 ~ file: faker.js ~ line 97 ~ randomStore ~ store", store)
    // await store.save();
    res.status(200).json(store);
    // return store;
}

async function randomOder(req, res){

    /* ---------------------- random people number in order --------------------- */
    const peopleNumber = faker.random.numeric();

    /* --------------------------- random ordered time -------------------------- */
    const soonDate = faker.date.soon();
    const orderDate = toString(soonDate.getFullYear()) + toString(soonDate.getMonth())  + toString(soonDate.getDate() );
    const orderTime = toString(soonDate.getHours()) + toString(soonDate.getMinutes())  + toString(soonDate.getSeconds() );

    /* ----------------------- random user from user list ----------------------- */
    const userList = await User.aggregate([
        {
            $project : {
                "_id" : 1,
            }
        }
    ]);

    const nameList = [];
    for( var i in userList ){
        nameList.push(userList[i]._id);
    }

    const userId = faker.helpers.arrayElement(nameList);
    // console.log("🚀 ~ file: faker.controller.js ~ line 157 ~ randomOder ~ userId", userId)

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
    // console.log("🚀 ~ file: faker.controller.js ~ line 170 ~ randomOder ~ storeList", storeList)


    const storeId = faker.helpers.arrayElements(storeList, 1);
    console.log("🚀 ~ file: faker.controller.js ~ line 173 ~ randomOder ~ storeId", storeId)

    /* ----------------- random service info linked to the store ---------------- */
    // const orderStore = await Store.find(storeId[0]) ;
    // console.log("🚀 ~ file: faker.controller.js ~ line 180 ~ randomOder ~ orderStore", orderStore)
    // const serviceList = orderStore[0].serviceInfos;
    // console.log("🚀 ~ file: faker.controller.js ~ line 176 ~ randomOder ~ serviceList", serviceList);
    // const orderService = faker.helpers.arrayElements(serviceList, 1);
    // console.log("🚀 ~ file: faker.controller.js ~ line 183 ~ randomOder ~ orderService", orderService)





    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    
}

module.exports = {
    randomUser,
    randomRootCate,
    randomSubCate,
    randomStore,
    randomOder,
}



