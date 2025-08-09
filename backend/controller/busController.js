const pool = require('../config/db');

const busController = {
  // Create a new bus entry
  create_bus: async (req, res) => {
    let client;
    const { busNumber, total_busseat, available_seat } = req.body;

    try {
      client = await pool.connect();

      const insertQuery = `
        INSERT INTO bustable (busNumber, total_busseat, avaialabe_seat)
        VALUES ($1, $2, $3)
        RETURNING *`;
      const values = [busNumber, total_busseat, available_seat];
      const result = await client.query(insertQuery, values);

      console.log('Bus inserted:', result.rows[0]);

      res.status(201).json({
        success: true,
        message: 'Bus created successfully',
        data: result.rows[0],
      });

    } catch (error) {
      console.error('❌ Query error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    } finally {
      if (client) client.release();
    }
  },

  // Get bus by ID
  get_bus: async (req, res) => {
    let client;
    const { id } = req.params;

    try {
      client = await pool.connect();

      const query = 'SELECT * FROM bustable WHERE id = $1';
      const result = await client.query(query, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Bus not found',
        });
      }

      res.status(200).json({
        success: true,
        data: result.rows[0],
      });

    } catch (error) {
      console.error('❌ Query error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    } finally {
      if (client) client.release();
    }
  },

  // Update bus by ID
  update_bus: async (req, res) => {
    let client;
    const { id } = req.params;
    const { busNumber, total_busseat, available_seat } = req.body;

    try {
      client = await pool.connect();

      const updateQuery = `
        UPDATE bustable
        SET busNumber = $1, total_busseat = $2, avaialabe_seat = $3
        WHERE id = $4
        RETURNING *`;
      const values = [busNumber, total_busseat, available_seat, id];
      const result = await client.query(updateQuery, values);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Bus not found for update',
        });
      }

      console.log('Bus updated:', result.rows[0]);

      res.status(200).json({
        success: true,
        message: 'Bus updated successfully',
        data: result.rows[0],
      });

    } catch (error) {
      console.error('❌ Query error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    } finally {
      if (client) client.release();
    }
  },

  // Delete bus by ID
  delete_bus: async (req, res) => {
    let client;
    const { id } = req.params;

    try {
      client = await pool.connect();

      const deleteQuery = 'DELETE FROM bustable WHERE id = $1 RETURNING *';
      const result = await client.query(deleteQuery, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Bus not found for delete',
        });
      }

      console.log('Bus deleted:', result.rows[0]);

      res.status(200).json({
        success: true,
        message: 'Bus deleted successfully',
        data: result.rows[0],
      });

    } catch (error) {
      console.error('❌ Query error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    } finally {
      if (client) client.release();
    }
  },
};

module.exports = busController;
