const express = require('express');
const router = express.Router();
const demopostController = require('../controller/demopost');

router.get('/', demopostController.data);
router.post('/', demopostController.postData);

module.exports = router;
