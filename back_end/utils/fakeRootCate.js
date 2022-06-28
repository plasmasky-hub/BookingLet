const { faker } =  require('@faker-js/faker/locale/en_AU');
const rootCategory = require('../models/rootCategory');

const { connectToDB } = require('../database/connect');
const { mongoose } = require('mongoose');
require('dotenv').config();

faker.setLocale('en_AU');

async function randomRootCate(){

    const cateName = faker.name.jobArea();
    const rootCate = new rootCategory({
        name : cateName,
    })

    return rootCate;
}

connectToDB().then(async function() {
    var newCate = await randomRootCate();
    console.log("🚀 ~ file: fakeRootCate.js ~ line 21 ~ connectToDB ~ newCate", newCate)
    
    try{
        await newCate.save();
        console.log('Add random root category successful!');

    }
    catch{
        console.log('Error in adding category!');
        console.log(error);
    }

}).then(function(){
    mongoose.connection.close();
})
