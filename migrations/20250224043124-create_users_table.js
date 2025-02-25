module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Users", {
          id: {
              type: Sequelize.UUID,
              defaultValue: Sequelize.literal("gen_random_uuid()"),
              allowNull: false,
              primaryKey: true,
          },
          name: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          email: {
              type: Sequelize.STRING,
              allowNull: false,
              unique: true,
          },
          password: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          role: {
              type: Sequelize.ENUM("student", "instructor", "admin"),
              defaultValue: "student",
          },
          courseId: {  
            type: Sequelize.UUID,
            allowNull: true,
            
        },
          createdAt: {
              type: Sequelize.DATE,
              allowNull: false,
              defaultValue: Sequelize.literal("NOW()"),
          },
          updatedAt: {
              type: Sequelize.DATE,
              allowNull: false,
              defaultValue: Sequelize.literal("NOW()"),
          },
      });
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("Users");
  },
};
