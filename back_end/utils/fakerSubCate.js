const { faker } =  require('@faker-js/faker/locale/en_AU');
const subCategory = require('../models/subCategory');
const rootCategory = require('../models/rootCategory');

const { connectToDB } = require('../database/connect');
const { mongoose } = require('mongoose');
require('dotenv').config();

faker.setLocale('en_AU');

async function randomSubCate(){

    const cateName = faker.name.jobArea();

    const categories = await rootCategory.aggregate(
        [{
            $project : {
                    "_id" : 1,
            }
        }]
    );
    const categoryList = [];
    for( var i in categories ){
        categoryList.push(categories[i]._id);
    };

    const rootCategories = faker.helpers.arrayElements(categoryList, 1);

    const subCate = new subCategory({
        name : cateName,
        parentCategory : rootCategories,
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
