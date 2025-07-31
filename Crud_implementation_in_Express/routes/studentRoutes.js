// routes/studentRoutes.js

const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');

router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);

module.exports = router;
