 const { Student, Course } = require('../models');

// Create a new student with courses
const createStudentWithCourses = async (req, res) => {
  try {
    const { studentName, courseTitles } = req.body;

    // Create student
    const student = await Student.create({ name: studentName });

    // Create or find courses
    const courses = await Promise.all(
      courseTitles.map(async (title) => {
        const [course] = await Course.findOrCreate({ where: { title } });
        return course;
      })
    );

    // Associate student with courses
    await student.addCourses(courses);

    res.status(201).json({ success: true, student, courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get all students with their courses
const getStudentsWithCourses = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: Course,
    });

    res.status(200).json({ success: true, students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  createStudentWithCourses,
  getStudentsWithCourses,
};
