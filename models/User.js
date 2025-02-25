const { DataTypes } = require('sequelize');
const Course = require('./Course');
const sequelize  = require('../config/db');


const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { 
      type: DataTypes.ENUM('admin', 'student', 'instructor'), 
      allowNull: false 
    },
    courseId:{
      type:DataTypes.INTEGER,
      allowNull:true,
      references:{
        model:Course,
        key:"id",
      },
      onDelete: 'CASCADE',
    }
   
  },{
    tableName:"Users",
  });


  module.exports=User;
