const pool = require('../config/db');

const bus_booking_appController = {
  create_user: async (req, res) => {
    let client;

    try {
      client = await pool.connect(); // get a connection from the pool

      // 1. Insert user
      const insertQuery = `
        INSERT INTO users (name, email) 
        VALUES ($1, $2) 
        RETURNING *`;
      const insertValues = ['Virat Kohli', 'virat.kohli@example.com'];
      const insertResult = await client.query(insertQuery, insertValues);
      console.log('User inserted:', insertResult.rows[0]);

      const userId = insertResult.rows[0].id;

      // 2. Update user
      const updateQuery = `
        UPDATE users 
        SET name = $1, email = $2 
        WHERE id = $3 
        RETURNING *`;
      const updateValues = ['King Kohli', 'king.kohli@example.com', userId];
      const updateResult = await client.query(updateQuery, updateValues);

      if (updateResult.rows.length === 0) {
        // No user found for update
        console.log('Update failed: User not found with id', userId);
        return res.status(404).json({
          success: false,
          message: 'User not found for update',
        });
      }
      console.log('User updated:', updateResult.rows[0]);

      // 3. Delete user
      const deleteQuery = `
        DELETE FROM users 
        WHERE id = $1 
        RETURNING *`;
      const deleteResult = await client.query(deleteQuery, [userId]);

      if (deleteResult.rows.length === 0) {
        // No user found for delete
        console.log('Delete failed: User not found with id', userId);
        return res.status(404).json({
          success: false,
          message: 'User not found for delete',
        });
      }
      console.log('User deleted:', deleteResult.rows[0]);

      // 4. Send success response
      res.status(200).json({
        success: true,
        message: 'User created, updated, and deleted successfully',
        data: {
          inserted: insertResult.rows[0],
          updated: updateResult.rows[0],
          deleted: deleteResult.rows[0],
        },
      });

    } catch (error) {
      console.error('❌ Query error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    } finally {
      if (client) client.release(); // release connection back to pool
    }
  }
};

module.exports = bus_booking_appController;
