const express = require('express');
const {
  getUsers, getUserById, createUser, updateProfil, updateAvatar,
} = require('../controllers/usersControllers');

const userRoutes = express.Router();

userRoutes.get('/users', getUsers);
userRoutes.get('/users/:userId', getUserById);
userRoutes.post('/users', createUser);
userRoutes.patch('/users/me', updateProfil);
userRoutes.patch('/users/me/avatar', updateAvatar);

module.exports = userRoutes;
