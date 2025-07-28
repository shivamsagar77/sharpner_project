const express = require('express');
const router = express.Router();

// ✅ GET /products
router.get('/products', (req, res) => {
  res.send('Here is the list of all products.');
});

// ✅ POST /products
router.post('/products', (req, res) => {
  res.send('A new product has been added.');
});

module.exports = router;