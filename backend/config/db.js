const { Sequelize } = require('sequelize');
require('dotenv').config({ path: '.env' });

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT, // Pastikan port juga diambil dari env
    dialect: 'postgres',
    logging: false, // Set true untuk melihat log SQL di console
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Connected...');
  } catch (err) {
    console.error('PostgreSQL Connection Error:', err.message);
    process.exit(1); // Keluar dari proses dengan kegagalan
  }
};

module.exports = { sequelize, connectDB };