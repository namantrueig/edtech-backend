'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ratings', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // References the Users table
          key: 'id',
        },
        onDelete: 'CASCADE', // If a student is deleted, their ratings are deleted
      },
      courseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Courses', // References the Courses table
          key: 'id',
        },
        onDelete: 'CASCADE', // If a course is deleted, its ratings are deleted
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5, // Ensures ratings are between 1 and 5
        },
      },
      comment:{
        type:Sequelize.TEXT,
        allowNull:true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ratings');
  }
};
