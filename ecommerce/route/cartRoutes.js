// routes/cartRoutes.js

const express = require('express');
const router = express.Router();

// GET cart for a specific user
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  res.send(`Fetching cart for user with ID: ${userId}`);
});

// POST product to cart for a user
router.post('/:userId', (req, res) => {
  const { userId } = req.params;
  res.send(`Adding product to cart for user with ID: ${userId}`);
});

module.exports = router;
