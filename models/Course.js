const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const courseCategory = require('./courseCategory'); 
const User = require('./User');


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
  price:{
    type: DataTypes.INTEGER,
    allowNull:true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  instructorId: {
     type:DataTypes.UUID,
     allowNull:false,
     references:{
      model:User,
      key:"id",
     },  
     onDelete:'CASCADE',   
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: courseCategory,
      key: 'id',
    },
    onDelete: 'CASCADE', // If a category is deleted, its courses are also deleted
  },
}, {
  tableName:"Courses",
  timestamps: true,
  underscored: true,
});

module.exports = Course;
