

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'naman',
    database: process.env.DB_NAME || 'edtech_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'naman',
    database: process.env.DB_NAME || 'edtech_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'naman',
    database: process.env.DB_NAME || 'edtech_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres'
  }
};
