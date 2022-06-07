const User = require('../modules/user');

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
        res.status(422).json('Error in adding user!');
    }
}

// UPDATE user by ID
async function updateUserByID(req, res){
    console.log('Updating user\'s info...');
    try{
        const {id} = req.params;
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
        res.json(user);
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

module.exports = {
    getAllUsers,
    getUserByID,
    addUser,
    updateUserByID,
    deleteUserByID,
}