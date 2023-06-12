const Sequelize = require('sequelize');
require('dotenv').config();

const databaseName = process.env.DB_NAME;

const config = {
  logging: false,
};

if (process.env.LOGGING === 'true') {
  delete config.logging;
}

if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  config
);
module.exports = db;
