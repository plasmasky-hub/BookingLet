const express = require('express');
const { getAllUsers, addUser, updateUserByID, getUserByID, deleteUserByID } = require('../controllers/user');

const userRouter = express.Router();

userRouter.get('', getAllUsers);
userRouter.post('', addUser);
userRouter.get('/:id', getUserByID);
userRouter.put('/:id', updateUserByID);
userRouter.delete('/:id', deleteUserByID);

module.exports = userRouter;