const pool = require('../config/db'); // adjust path accordingly

const signUpController = {
  signup: async (req, res) => {
    try {
      const { name, phone, email, password } = req.body;

      // basic validation
      if (!name || !phone || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const created_at = new Date();

      const query = `
        INSERT INTO signup (name, phone, email, created_at)
        VALUES ($1, $2, $3, $4) RETURNING *;
      `;

      const values = [name, phone, email, created_at];

      const result = await pool.query(query, values);

      return res.status(201).json({
        message: "User signed up successfully",
        user: result.rows[0],
      });
    } catch (error) {
      console.error("Error in signup:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = signUpController;
