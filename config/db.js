import { Sequelize, DataTypes } from 'sequelize';
import dotenv from "dotenv";
dotenv.config();


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST || "edtech_db",
  dialect: 'postgres',
});

// Test Connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

export default sequelize; // Use export default for the sequelize instance