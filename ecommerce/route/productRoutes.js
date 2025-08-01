// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../conroller/productController')

// GET all products
router.get('/',productController.data );

// POST new product
router.post('/',productController.postData );

// GET product by ID
router.get('/:id',productController.dataById);

module.exports = router;
