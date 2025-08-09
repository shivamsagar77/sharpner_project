const User = require('../models/User');

const bus_booking_appController = {
  // Create a new user
  create_user: async (req, res) => {
    const { name, email } = req.body;

    try {
      const newUser = await User.create({ name, email });
      console.log('User inserted:', newUser.toJSON());

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: newUser,
      });
    } catch (error) {
      console.error('❌ Create user error:', error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ success: false, message: 'Email must be unique' });
      }
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  },

  // Get user by id
  get_user: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error('❌ Get user error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  },

  // Update user by id
  update_user: async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found for update',
        });
      }

      await user.update({ name, email });

      console.log('User updated:', user.toJSON());

      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: user,
      });
    } catch (error) {
      console.error('❌ Update user error:', error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ success: false, message: 'Email must be unique' });
      }
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  },

  // Delete user by id
  delete_user: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found for delete',
        });
      }

      await user.destroy();

      console.log('User deleted:', user.toJSON());

      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: user,
      });
    } catch (error) {
      console.error('❌ Delete user error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  },
};

module.exports = bus_booking_appController;
