const express = require('express');
const {
  getAllUsers,
  addUser,
  updateUserByID,
  getUserByID,
  deleteUserByID,
  getUserStores,
  addOrCancelFavoriteStore,

  register,
  login,

  getFavouriteStoreById
  

} = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.get('', getAllUsers);
userRouter.post('', addUser);
userRouter.get('/:id', getUserByID);
userRouter.put('/:id', updateUserByID);
userRouter.delete('/:id', deleteUserByID);
userRouter.get('/:id/stores', getUserStores);
userRouter.post('/addOrCancelFavoriteStore',addOrCancelFavoriteStore);

userRouter.post('/register', register);
userRouter.get('/login', login);
userRouter.get('/:id/FavouriteStoreList', getFavouriteStoreById);

module.exports = userRouter;
