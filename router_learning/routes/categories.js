const express = require('express');

const router = express.Router;

app.get('/categories', (req, res) => {
  res.send('Here is the list of all categories.');
});

// ✅ POST /categories

app.post('/categories', (req, res) => {
  res.send('A new category has been created.');
});

module.exports = router;