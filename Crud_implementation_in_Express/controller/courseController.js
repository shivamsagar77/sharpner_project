// controllers/courseController.js

const { courses } = require('../data/data');

exports.getAllCourses = (req, res) => {
  const names = courses.map(c => c.name).join(', ');
  res.send(`Courses: ${names}`);
};

exports.getCourseById = (req, res) => {
  const id = parseInt(req.params.id);
  const course = courses.find(c => c.id === id);
  if (course) {
    res.send(`Course: ${course.name}, Description: ${course.description}`);
  } else {
    res.send("Course not found");
  }
};
