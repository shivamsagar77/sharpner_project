const pool = require('../config/db');

const demopostController = {

  // ✅ GET API → हमेशा latest data लाना
  data: async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT id, input FROM my_table ORDER BY id DESC LIMIT 1"
      );

      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          message: 'Data fetched successfully',
          data: result.rows[0]   // ✅ सिर्फ latest एक ही row
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'No data found'
        });
      }
    } catch (error) {
      console.error('❌ Query error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error'
      });
    }
  },

  // ✅ POST API → पहली बार insert, बाद में update
  postData: async (req, res) => {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({
        success: false,
        message: 'Input field is required'
      });
    }

    try {
      // 1️⃣ Check if table already has a row
      const checkResult = await pool.query("SELECT id FROM my_table LIMIT 1");

      let result;

      if (checkResult.rows.length === 0) {
        // ✅ Table empty → INSERT
        result = await pool.query(
          "INSERT INTO my_table (input) VALUES ($1) RETURNING *",
          [input]
        );

        res.status(201).json({
          success: true,
          message: 'Data inserted successfully (first time)',
          data: result.rows[0]
        });

      } else {
        // ✅ Table has row → UPDATE that row
        const existingId = checkResult.rows[0].id;

        result = await pool.query(
          "UPDATE my_table SET input = $1 WHERE id = $2 RETURNING *",
          [input, existingId]
        );

        res.status(200).json({
          success: true,
          message: 'Data updated successfully',
          data: result.rows[0]
        });
      }

    } catch (error) {
      console.error('❌ Insert/Update error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error'
      });
    }
  }
};

module.exports = demopostController;
