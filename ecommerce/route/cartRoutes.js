// routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const cardController  = require('../conroller/cartController')
// GET cart for a specific user
router.get('/:userId',cardController.data);

// POST product to cart for a user
router.post('/:userId',cardController.postData);

module.exports = router;
