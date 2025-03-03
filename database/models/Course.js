import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js'; // Ensure to add .js extension
import courseCategory from './courseCategory.js'; // Ensure to add .js extension
import User from './User.js'; // Ensure to add .js extension

const Course = sequelize.define('Courses', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  instructorId: {
    type: DataTypes.UUID,
    // field: "instructor_id", // Map to snake_case
    allowNull: false,
    
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    // field: "category_id", // Map to snake_case
  
    onDelete: 'CASCADE', // If a category is deleted, its courses are also deleted
  },
}, {
  tableName: "Courses",
  timestamps: true,
  underscored: true,
});

export default Course; // Use export default for the Course model