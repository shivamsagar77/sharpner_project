// routes/courseRoutes.js

const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseController');

router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);

module.exports = router;
