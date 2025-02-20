const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const courseCategory = require('./courseCategory'); 
const User = require('./User');


const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  instructorId: {
     type:DataTypes.INTEGER,
     allowNull:false,
     references:{
      model:User,
      key:"id",
     },  
     onDelete:'CASCADE',   
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: courseCategory,
      key: 'id',
    },
    onDelete: 'CASCADE', // If a category is deleted, its courses are also deleted
  },
}, {
  timestamps: true,
});

module.exports = Course;
