const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('edtech_db', 'postgres', 'naman', {
  host: 'localhost',
  dialect: 'postgres',
});

// Test Connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

module.exports = sequelize;