module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("CourseCategory", {
          id: {
              type: Sequelize.UUID,
              defaultValue: Sequelize.literal("gen_random_uuid()"),
              allowNull: false,
              primaryKey: true,
          },
          name: {
              type: Sequelize.STRING,
              allowNull: false,
              unique: true,
          },
          description: {
            type: Sequelize.TEXT,
            allowNull: true,
          },
          created_at: {
              type: Sequelize.DATE,
              allowNull: false,
              defaultValue: Sequelize.literal("NOW()"),
          },
          updated_at: {
              type: Sequelize.DATE,
              allowNull: false,
              defaultValue: Sequelize.literal("NOW()"),
          },
      });
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("CourseCategory");
  },
};
