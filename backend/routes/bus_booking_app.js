const express = require('express');
const router = express.Router();

const bus_booking_appController = require('../controller/bus_booking_appController');

// Create a user
router.post('/create_user', bus_booking_appController.create_user);

// Get user by ID
router.get('/user/:id', bus_booking_appController.get_user);

// Update user by ID
router.put('/update_user/:id', bus_booking_appController.update_user);

// Delete user by ID
router.delete('/delete_user/:id', bus_booking_appController.delete_user);

module.exports = router;
