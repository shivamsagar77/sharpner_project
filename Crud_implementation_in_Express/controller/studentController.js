// controllers/studentController.js

const { students } = require('../data/data');

exports.getAllStudents = (req, res) => {
  const names = students.map(s => s.name).join(', ');
  res.send(`Students: ${names}`);
};

exports.getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  if (student) {
    res.send(`Student: ${student.name}`);
  } else {
    res.send("Student not found");
  }
};
