import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'; 

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false, // Set to true to see SQL queries in console
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
    console.log('Koneksi ke PostgreSQL berhasil.');
    // Sinkronkan semua model dengan database
    // { force: true } akan menghapus tabel jika sudah ada dan membuatnya kembali (hati-hati di produksi!)
    // { alter: true } akan mencoba mengubah tabel yang ada agar sesuai dengan model
    await sequelize.sync({ alter: true });
    console.log('Semua model berhasil disinkronkan dengan database.');
  } catch (error) {
    console.error('Gagal terhubung ke PostgreSQL:', error);
    process.exit(1); // Keluar dari proses jika koneksi gagal
  }
};

export { sequelize, connectDB };