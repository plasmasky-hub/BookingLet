const User = require('../models/user.model');
const Joi = require('joi');


// GET all users
async function getAllUsers(req, res){
    console.log('Finding all users...');

    try {
        const users = await User.find();

        res.json(users);
    }
    catch{
        console.log('Error in Finding all users!');
    }
}

// ADD new user
async function addUser(req, res){
    console.log('Adding a new user...');
    try{
        const checkResult = checkUserInfo(req.body);
        // console.log("🚀 ~ file: user.js ~ line 24 ~ addUser ~ checkResult", checkResult)

        if( !(checkResult === undefined) ){
            console.log('Invalid user info format!');
            console.log(checkResult)
            return res.json(checkResult);
        }

        const { 
            name, 
            tel, 
            email
        } = req.body;

        const newUser = new User({ 
            name, 
            tel, 
            email 
        });
        await newUser.save();

        res.status(201).json(newUser);
    }
    catch (error) {
        console.log('Error in adding user!');
        console.log(error);
        res.status(422).json('Error in adding user!');
    }
}

// UPDATE user by ID
async function updateUserByID(req, res){
    console.log('Updating user\'s info...');
    try{
        const {id} = req.params;
        const checkResult = checkUserInfo(req.body);
        // console.log("🚀 ~ file: user.js ~ line 24 ~ addUser ~ checkResult", checkResult)

        if( !(checkResult === undefined) ){
            console.log('Invalid user info format!');
            console.log(checkResult)
            return res.json(checkResult);
        }

        const { 
            name, 
            tel,
            email
        } = req.body;

        // data validation

        const user = await User.findByIdAndUpdate( id, {
            name,
            tel,
            email
        });

        if( !user ){
            return res.status(404).json('User not found!');
        }
        res.json('Update successful!');
    }
    catch{
        res.json('Error in Updating user!');
    }

};

// GET user by ID
async function getUserByID(req, res){

    console.log('Getting user\'s info...');
    try{
        const {id} = req.params;
        const user = await User.findById(id);

        if( !user ){
            return res.status(404).json('User info not found!');
        }

        res.json(user);
    }
    catch{
        res.json('Error in finding user!');
    }

};

// DELETE user
async function deleteUserByID(req, res){
    console.log('Deleting user\'s info...');
    try{
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);

        if( !user ){
            return res.status(404).json({
                error: 'User info not found!',
            });
        }

        res.json(user);
    }
    catch{
        res.json('Error in deleting user!');
    };

};

// User info format check
function checkUserInfo(data){

    const schema = Joi.object({
        name: Joi.string().required(),
        tel: Joi.string().regex(/^\d{2}\d{4}\d{4}$/).required(),
        email: Joi.string().email().required()
    });

    console.log("Checking user info format...");

    const validation = schema.validate(data);   
    // console.log(validation);

    const errorCode = new Map([
        ["name" , "Invalid name!"],
        ['tel', "Invalid Tel number!"],
        ["email", "Invalid Email address!"],
    ]);

    // console.log(validation.error.details[0].path);

    // var detail = { details : undefined };

    // if there is no error, the "details" key will be undefined in error
    if( "details" in validation.error ){
        // console.log("🚀 ~ file: user.js ~ line 155 ~ checkUserInfo ~ errorCode.get(validation.error.details[0].path)", errorCode.get(validation.error.details[0].path[0]))

        return errorCode.get(validation.error.details[0].path[0]);
    }
    else{
        return undefined;
    }


}

module.exports = {
    getAllUsers,
    getUserByID,
    addUser,
    updateUserByID,
    deleteUserByID,
}