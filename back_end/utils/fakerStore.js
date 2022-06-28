const { faker } =  require('@faker-js/faker/locale/en_AU');
const Store = require('../models/store');
const rootCategory = require('../models/rootCategory');
const User = require('../models/user');

// const subCategory = require('../models/subCategory');
const { connectToDB } = require('../database/connect');
const { mongoose } = require('mongoose');
require('dotenv').config();

faker.setLocale('en_AU');

async function randomStore(){
    const today = new Date();
    
    /* ------------------------------ Name of store ----------------------------- */
    const name = faker.name.findName() + ' (' + (today.getMonth() + 1) + '-' + today.getDate() + ')' ;
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

    const rootCategories = faker.helpers.arrayElements(categoryList, 1);
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
    // console.log("🚀 ~ file: faker.js ~ line 97 ~ randomStore ~ store", store)
    // await store.save();
    // res.status(200).json(store);
    return store;
}

connectToDB().then(async function() {
    var newStore = await randomStore();
    console.log("🚀 ~ file: fakerStore.js ~ line 100 ~ connectToDB ~ newStore", newStore)
    
    try{
        await newStore.save();
        console.log('Add random store successful!');

    }
    catch(error){
        console.log('Error in adding store!');
        console.log(error);
    }

}).then(function(){
    mongoose.connection.close();
})