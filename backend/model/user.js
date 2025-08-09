const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Your Sequelize instance

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  }
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User;
