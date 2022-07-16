const express = require('express');
const {
  getAllUsers,
  addUser,
  updateUserByID,
  getUserByID,
  deleteUserByID,
  getUserStores,
  addOrCancelFavoriteStore
  //addStoreToUser,
} = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.get('', getAllUsers);
userRouter.post('', addUser);
userRouter.get('/:id', getUserByID);
userRouter.put('/:id', updateUserByID);
userRouter.delete('/:id', deleteUserByID);
userRouter.get('/:id/stores', getUserStores);
userRouter.post('/addOrCancelFavoriteStore',addOrCancelFavoriteStore);
//userRouter.put('/:id/store', addStoreToUser);

module.exports = userRouter;
