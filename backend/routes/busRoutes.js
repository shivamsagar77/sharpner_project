const express = require('express');
const router = express.Router();

const busController = require('../controller/busController');

// Create new bus
router.post('/create_bus', busController.create_bus);

// Get bus by ID
router.get('/bus/:id', busController.get_bus);

// Update bus by ID
router.put('/update_bus/:id', busController.update_bus);

// Delete bus by ID
router.delete('/delete_bus/:id', busController.delete_bus);

module.exports = router;
