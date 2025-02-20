const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Database connection
const User = require('./User'); // Importing User model
const Course = require('./Course'); // Importing Course model

const Rating = sequelize.define('Rating', {
  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
    primaryKey: true,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE', // Delete ratings if the student is deleted
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: 'id',
    },
    onDelete: 'CASCADE', // Delete ratings if the course is deleted
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5, // Ensures rating is between 1 and 5
    },
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true, // Optional comment with rating
  },
}, {
  timestamps: true, 
});

module.exports = Rating;
