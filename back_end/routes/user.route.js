const express = require('express');
const {
	getAllUsers,
	addUser,
	updateUserByID,
	getUserByID,
	deleteUserByID,
	getUserStores,
	register,
	login,
	//addStoreToUser,
} = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.get('/login', login);
userRouter.get('', getAllUsers);
userRouter.post('', addUser);
userRouter.get('/:id', getUserByID);
userRouter.put('/:id', updateUserByID);
userRouter.delete('/:id', deleteUserByID);
userRouter.get('/:id/stores', getUserStores);
//userRouter.put('/:id/store', addStoreToUser);

module.exports = userRouter;
