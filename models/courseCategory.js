const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const courseCategory = sequelize.define('CourseCategory', {
  id: {
    type: DataTypes.UUID, // Unique Identifier
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // No duplicate category names
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: "CourseCategory",
  timestamps: true, // Adds createdAt & updatedAt fields
});

module.exports = courseCategory;
