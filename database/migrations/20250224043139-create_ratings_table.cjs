'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ratings', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4, // Generate UUID automatically
        primaryKey: true,
        allowNull: false,
      },
      student_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users', // References the Users table
          key: 'id',
        },
        onDelete: 'CASCADE', // If a student is deleted, their ratings are deleted
      },
      course_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Courses', // References the Courses table
          key: 'id',
        },
        onDelete: 'CASCADE', // If a course is deleted, its ratings are deleted
      },
      rating: {
        type: Sequelize.INTEGER, // Ratings should be an integer (not UUID)
        allowNull: false,
        validate: {
          min: 1,
          max: 5, // Ensures ratings are between 1 and 5
        },
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updated_at: {
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
