// routes/userRoutes.js

const express = require('express');
const router = express.Router();

// GET all users
router.get('/', (req, res) => {
  res.send('Fetching all users');
});

// POST new user
router.post('/', (req, res) => {
  res.send('Adding a new user');
});

// GET user by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Fetching user with ID: ${id}`);
});

module.exports = router;
