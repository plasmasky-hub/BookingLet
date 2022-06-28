const { faker } =  require('@faker-js/faker/locale/en_AU');
const subCategory = require('../models/subCategory');

const { connectToDB } = require('../database/connect');
const { mongoose } = require('mongoose');
require('dotenv').config();

faker.setLocale('en_AU');

async function randomSubCate(){

    const cateName = faker.name.jobArea();
    const subCate = new subCategory({
        name : cateName,
    })

    return subCate;
}

connectToDB().then(async function() {
    var newSubCate = await randomSubCate();
    console.log("🚀 ~ file: fakerSubCate.js ~ line 22 ~ connectToDB ~ newSubCate", newSubCate)
    
    try{
        await newSubCate.save();
        console.log('Add random sub category successful!');

    }
    catch(error){
        console.log('Error in adding sub category!');
        console.log(error);
    }

}).then(function(){
    mongoose.connection.close();
})
