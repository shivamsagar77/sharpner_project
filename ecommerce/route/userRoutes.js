// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const UserController = require('../conroller/userController')

// GET all users
router.get('/',UserController.data);

// POST new user
router.post('/',UserController.postData);

// GET user by ID
router.get('/:id',UserController.dataById);

module.exports = router;
