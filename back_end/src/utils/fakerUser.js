const { faker } =  require('@faker-js/faker/locale/en_AU');
const User = require('../models/user');
const { connectToDB } = require('../database/connect');
const { mongoose } = require('mongoose');
require('dotenv').config();

faker.setLocale('en_AU');

async function randomUser(){

    const name = faker.name.findName();
    const spliteName = name.split(' ');
    const tel = faker.phone.phoneNumber('04## ### ###');
    const email = faker.internet.email(spliteName[ spliteName.length - 2 ], spliteName[ spliteName.length - 1 ]);

    const user = new User({
        name : name,
        tel : tel,
        email : email,
    })

    return user;
};

connectToDB().then(async function() {
    var newUser = await randomUser();
    console.log("🚀 ~ file: fakerUser.js ~ line 30 ~ connectToDB ~ newUser", newUser)
    
    try{
        await newUser.save();
        console.log('Add random user successful!');

    }
    catch{
        console.log('Error in adding user!');
        console.log(error);
    }

}).then(function(){
    mongoose.connection.close();
})
