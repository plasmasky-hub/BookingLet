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
const authGuard = require('../middleware/authGuard');
const roleGuard = require('../middleware/roleGuard');

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.get('/login', login);
userRouter.get('', authGuard, roleGuard, getAllUsers);
userRouter.post('', addUser);
userRouter.get('/:id', getUserByID);
userRouter.put('/:id', updateUserByID);
userRouter.delete('/:id', deleteUserByID);
userRouter.get('/:id/stores', getUserStores);
//userRouter.put('/:id/store', addStoreToUser);

module.exports = userRouter;
