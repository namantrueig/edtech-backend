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
          course_id: {  
            type: Sequelize.UUID,
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
      await queryInterface.dropTable("Users");
  },
};
