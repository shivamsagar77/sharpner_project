const pool = require('../config/db'); // adjust path accordingly

const studentController = {
  createStudent: async (req, res) => {
    const { name, email, age } = req.body;

    try {
      const [result] = await pool.query(
        'INSERT INTO students (name, email, age) VALUES (?, ?, ?)',
        [name, email, age]
      );
      console.log('Inserted student with ID:', result.insertId);

      const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [result.insertId]);

      res.status(201).json({
        success: true,
        message: 'Student created successfully',
        data: rows[0],
      });
    } catch (error) {
      console.error('Insert error:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ success: false, message: 'Email must be unique' });
      }
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getAllStudents: async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM students');
      res.status(200).json({
        success: true,
        data: rows,
      });
    } catch (error) {
      console.error('Get all students error:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getStudentById: async (req, res) => {
    const { id } = req.params;

    try {
      const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Student not found' });
      }
      res.status(200).json({ success: true, data: rows[0] });
    } catch (error) {
      console.error('Get student by ID error:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  updateStudent: async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    try {
      const [result] = await pool.query(
        'UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?',
        [name, email, age, id]
      );

      if (result.affectedRows === 0) {
        console.log('Update failed: Student not found with id', id);
        return res.status(404).json({ success: false, message: 'Student not found for update' });
      }
      console.log('Student updated with ID:', id);

      const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);
      res.status(200).json({ success: true, message: 'Student updated successfully', data: rows[0] });
    } catch (error) {
      console.error('Update error:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ success: false, message: 'Email must be unique' });
      }
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  deleteStudent: async (req, res) => {
    const { id } = req.params;

    try {
      const [result] = await pool.query('DELETE FROM students WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        console.log('Delete failed: Student not found with id', id);
        return res.status(404).json({ success: false, message: 'Student not found for delete' });
      }
      console.log('Student deleted with ID:', id);

      res.status(200).json({ success: true, message: 'Student deleted successfully' });
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
};

module.exports = studentController;
