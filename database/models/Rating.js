import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js'; // Database connection
import User from './User.js'; // Importing User model
import Course from './Course.js'; // Importing Course model

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
    type: DataTypes.INTEGER, // Changed to INTEGER for rating
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
  tableName: "Ratings", // Moved tableName into the same options object
  underscored:true,
});

export default Rating; // Use export default for the Rating model