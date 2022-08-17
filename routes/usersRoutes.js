const express = require('express');
const {
  getUsers, getUserById, updateProfil, updateAvatar,
} = require('../controllers/usersControllers');

const userRoutes = express.Router();

userRoutes.get('/users', getUsers);
userRoutes.patch('/users/me', updateProfil);
userRoutes.get('/users/:userId', getUserById);
userRoutes.patch('/users/me/avatar', updateAvatar);

module.exports = userRoutes;
