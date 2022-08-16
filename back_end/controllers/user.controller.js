const User = require('../models/user');
const Store = require('../models/store');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');


async function getAllUsers(req, res) {
  const users = await User.find().populate('stores', 'name');
  res.json(users);
}


async function addUser(req, res) {
  const checkResult = checkUserInfo(req.body);
  if (!(checkResult === undefined)) {
    return res.json(checkResult);
  }

  const { name, tel, email, role, password } = req.body;

  const newUser = new User({ name, tel, email, role, password });

  await newUser.hashPassword();
  await newUser.save();

  res.status(201).json(newUser);
}

async function updatePassword(req, res) {
  console.log('Updating password...');
  const { userId, password } = req.body;

  const schema = Joi.object({
    password: Joi.string().required().min(6).max(30),
  });
  const validation = schema.validate({password:password});
  console.log("🚀 ~ file: user.controller.js ~ line 38 ~ updatePassword ~ validation", validation)
  
  if ( validation.error ) {
    return res.status(401).json(validation.error);
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      error: 'User info not found!'
    });
  };

  user.password = password;
  await user.hashPassword(password);
  await user.save();

  return res.json(user);

}


async function updateUserByID(req, res) {
  console.log(req.body,'ooo');
  if (req.body.location.state === undefined || req.body.location.city === undefined || req.body.location.postcode === undefined) {
    return res.json('location cannot be null');
  } else if (req.body.location.postcode < 200 || req.body.location.postcode > 9999) {
    return res.json('Please input correct postcode !');
  }

  const { id } = req.params;
  const checkResult = checkUserInfo(req.body);

  if (!(checkResult === undefined)) {
    console.log('Invalid user info format!');
    console.log(checkResult);
    return res.json(checkResult);
  }

  const { name, tel, email, location } = req.body;
  const user = await User.findByIdAndUpdate(id, { name, tel, email, location }, { new: true }).exec();
  if (!user) { return res.status(404).json({ error: 'User not found!' }); }

  res.json(user);
}


async function getUserByID(req, res) {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      error: 'User info not found!'
    });
  }

  
    // switch (user.location.state) {
    //     case 'NSW': user.location.state = 1; break;
    //     case 'VIC': user.location.state = 2; break;
    //     case 'SA': user.location.state = 3; break;
    //     case 'TAS': user.location.state = 4; break;
    //     case 'WA': user.location.state = 5; break;
    //     case 'NT': user.location.state = 6; break;
    //     case 'ACT': user.location.state = 7; break;
    //     case 'QSL': user.location.state = 8; break;
    //     default: user.location.state = null;
    // }


  res.json(user);
}


async function deleteUserByID(req, res) {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(404).json({
      error: 'User info not found!',
    });
  }

  res.json(user);
}

async function getUserStores(req, res) {
  const { id } = req.params;
  const user = await User.findById(id);
  console.log("🚀 ~ file: user.controller.js ~ line 126 ~ getUserStores ~ user", user)

  if (!user) {
    return res.status(404).json({ error: 'User info not found!' });
  }

  const userStores = await User.findById(id).populate('stores').exec();
  res.json(userStores);

}


async function addOrCancelFavoriteStore(req, res) {
  //check store exist or not 
  const { userId, storeId } = req.body;

  const store = await Store.findById(storeId).exec();
  const user = await User.findById(userId).exec();
  const storeExists = await user.favoriteStores.indexOf(storeId);
  const userExists = await store.favoriteUsers.indexOf(userId);

  //exist：delete user id into store and delete store id into user size-1
  if (storeExists > -1 || userExists > -1) {
    user.favoriteStores.remove(storeId);
    await user.save();

    store.favoriteUsers.remove(userId);
    store.favoriteUsersSize--;
    await store.save();

    res.json(store)
  } else {
    // do not exist：  add user id into store and add store id into user size+1
    user.favoriteStores.addToSet(storeId);
    await user.save();

    store.favoriteUsers.addToSet(userId);
    store.favoriteUsersSize++;
    await store.save();

    res.json(store)
  }
}

async function getFavouriteStoreById(req, res) {
  const { id } = req.params;
  const user = await User.findById(id).populate('favoriteStores').exec();
  if (!user) {
    return res.status(400).json({ error: 'user not found' });
  }
  return res.status(200).json(user.favoriteStores);
}


function checkUserInfo(data) {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(30),
    tel: Joi.string()
      .regex(/^\d{4}\d{3}\d{3}$/)
      .required(),
    email: Joi.string().email().required(),
  });
  const validation = schema.validate(data);
  const errorCode = new Map([
    ['name', 'Invalid name!'],
    ['tel', 'Invalid Tel number!'],
    ['email', 'Invalid Email address!'],
  ]);

  if ('details' in validation.error) {
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
    password,
    role,
  } = req.body;

  const checkEmail = await User.find({ email });
  // console.log("🚀 ~ file: user.controller.js ~ line 204 ~ register ~ checkName", checkName)

  if (checkEmail.length > 0) {
    return res.status(409).json('This Email has been used, please use another one!');
  }
  // Validation
  // Check if username duplicate

  const newUser = new User({
    name: name,
    tel: tel,
    email: email,
    password: password,
    role: role,
  });

  await newUser.hashPassword();
  await newUser.save();
  // const token = await generateToken({email});

  return res.status(200).json({ user: newUser });

}

async function login(req, res) {
  const { email, password } = req.body;

  const currentUser = await User.findOne({ email }).exec();

  if (!currentUser) {
    return res.status(401).json({ error: "Invalid email account!" });
  }

  // console.log(validation.error.details[0].path);
  const checkPassword = await currentUser.validatePassword(password);
  // const checkPassword = ( password === currentUser.password )? true : false;
  if (!checkPassword) {
    return res.status(401).json({ error: "Invalid password!" });
  };

  const token = await generateToken({ email });

  return res.status(200).json({ user: currentUser, token: token });
}

module.exports = {
  getAllUsers,
  getUserByID,
  addUser,
  updatePassword,
  updateUserByID,
  deleteUserByID,
  getUserStores,
  addOrCancelFavoriteStore,
  login,
  register,
  getFavouriteStoreById
};
