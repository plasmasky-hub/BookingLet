const User = require('../modules/user');

async function getAllUsers(req, res){
    console.log('Finding all users...');
    const users = await User.find();

    res.json(users);
}

async function addUser(req, res){
    console.log('Adding a new user...');
    const { name, tel, email } = req.body;

    const newUser = new User({ name, tel, email });
    await newUser.save();

    res.status(201).json(newUser);
}

async function updateUserByID(){};
async function getUserByID(){};
async function deleteUserByID(){};

module.exports = {
    getAllUsers,
    getUserByID,
    addUser,
    updateUserByID,
    deleteUserByID,
}