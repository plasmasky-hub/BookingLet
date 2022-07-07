const User = require('../models/user');
const Store = require('../models/store');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

// GET all users
async function getAllUsers(req, res) {
	console.log('Finding all users...');

	try {
		const users = await User.find().populate('stores');

		res.json(users);
	} catch {
		console.log('Error in Finding all users!');
	}
}

// ADD new user
async function addUser(req, res) {
	console.log('Adding a new user...');
	try {
		const checkResult = checkUserInfo(req.body);
		// console.log("🚀 ~ file: user.js ~ line 24 ~ addUser ~ checkResult", checkResult)

		if (!(checkResult === undefined)) {
			console.log('Invalid user info format!');
			console.log(checkResult);
			return res.json(checkResult);
		}

		const { name, tel, email } = req.body;

		const newUser = new User({
			name,
			tel,
			email,
		});
		await newUser.save();

		res.status(201).json(newUser);
	} catch (error) {
		console.log('Error in adding user!');
		console.log(error);
		res.status(422).json('Error in adding user!');
	}
}

// UPDATE user by ID
async function updateUserByID(req, res) {
	console.log("Updating user's info...");
	try {
		const { id } = req.params;
		const checkResult = checkUserInfo(req.body);
		// console.log("🚀 ~ file: user.js ~ line 24 ~ addUser ~ checkResult", checkResult)

		if (!(checkResult === undefined)) {
			console.log('Invalid user info format!');
			console.log(checkResult);
			return res.json(checkResult);
		}

		const { name, tel, email } = req.body;

		// data validation

		const user = await User.findByIdAndUpdate(id, {
			name,
			tel,
			email,
		});

		if (!user) {
			return res.status(404).json({
				error: 'User not found!'
			});
		}

		res.json('Update successful!');
	} catch {
		res.json('Error in Updating user!');
	}
}

// GET user by ID
async function getUserByID(req, res) {
	console.log("Getting user's info...");
	try {
		const { id } = req.params;
		const user = await User.findById(id);

		if (!user) {
			return res.status(404).json({
				error: 'User info not found!'
			});
		}

		res.json(user);
	} catch {
		res.json('Error in finding user!');
	}
}

// DELETE user
async function deleteUserByID(req, res) {
	console.log("Deleting user's info...");
	try {
		const { id } = req.params;
		const user = await User.findByIdAndDelete(id);

		if (!user) {
			return res.status(404).json({
				error: 'User info not found!',
			});
		}

		res.json(user);
	} catch {
		res.json('Error in deleting user!');
	}
}

async function getUserStores(req, res) {
	console.log('Getting user\'s stores...');
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		console.log("🚀 ~ file: user.controller.js ~ line 126 ~ getUserStores ~ user", user)

		if (!user) {
			return res.status(404).json({
				error: 'User info not found!',
			});
		}

		// const storeId = user.stores[0];
		// console.log("🚀 ~ file: user.controller.js ~ line 136 ~ getUserStores ~ storeId", storeId)
		const users = await User.findById(id).populate('stores').exec();
		// console.log("🚀 ~ file: user.controller.js ~ line 136 ~ getUserStores ~ stores", stores)

		// if(!stores){
		//   res.status(404).json({
		//     error : 'No store found!'
		//   });
		// }

		res.json(users);
	}
	catch (Error) {
		// res.json('Error in finding user\'s store!');
		console.log(Error);
		res.json(Error);
	}
}

// User info format check
function checkUserInfo(data) {

	const schema = Joi.object({
		name: Joi.string().required(),
		tel: Joi.string()
			.regex(/^\d{4}\d{3}\d{3}$/)
			.required(),
		email: Joi.string().email().required(),
		password: Joi.string().required().min(6),
	});

	console.log('Checking user info format...');

	const validation = schema.validate(data);
	// console.log(validation);

	const errorCode = new Map([
		['name', 'Invalid name!'],
		['tel', 'Invalid Tel number!'],
		['email', 'Invalid Email address!'],
		['password', 'Invalid password!'],
	]);

	// console.log(validation.error.details[0].path);

	// var detail = { details : undefined };

	// if there is no error, the "details" key will be undefined in error
	if ('details' in validation.error) {
		// console.log("🚀 ~ file: user.js ~ line 155 ~ checkUserInfo ~ errorCode.get(validation.error.details[0].path)", errorCode.get(validation.error.details[0].path[0]))

		return errorCode.get(validation.error.details[0].path[0]);
	} else {
		return undefined;
	}
}

async function register(req, res) {
	console.log('Register new user...');
	
	const { name,
		tel,
		email,
		password } = req.body;
		
	const checkName = await User.find({name});
    console.log("🚀 ~ file: user.controller.js ~ line 204 ~ register ~ checkName", checkName)
	
	if( checkName.length > 0 ){
		return res.json('User name is duplicated, please use another name!');
	}
	// Validation
	// Check if username duplicate

	const newUser = new User({
		name: name,
		tel: tel,
		email: email,
		password: password,
	});

	await newUser.hashPassword();
	await newUser.save();
	const token = await generateToken({name});

	return res.status(200).json({user: newUser, token: token});

}

async function login(req, res) {
	const { name, password } = req.body;

	const currentUser = await User.findOne({ name }).exec();

	if (!currentUser) {
		return res.status(401).json({ error: "Invalid user name!" });
	}

	const checkPassword = await currentUser.validatePassword(password);
	if (!checkPassword) {
		return res.status(401).json({ error: "Invalid password!" });
	};

	// const userId = currentUser._id;

	const token = await generateToken({name});

	return res.status(200).json({user: currentUser, token: token});
}

module.exports = {
	getAllUsers,
	getUserByID,
	addUser,
	updateUserByID,
	deleteUserByID,
	getUserStores,
	register,
	login,
	//addStoreToUser,
};
