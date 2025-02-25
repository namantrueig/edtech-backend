const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Database connection
const User = require('./User'); // Importing User model
const Course = require('./Course'); // Importing Course model

const Rating = sequelize.define('Ratings', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  studentId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE', // Delete ratings if the student is deleted
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Course,
      key: 'id',
    },
    onDelete: 'CASCADE', // Delete ratings if the course is deleted
  },
  rating: {
    type: DataTypes.UUID,
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
},{
  tableName:"Ratings",
});

module.exports = Rating;
