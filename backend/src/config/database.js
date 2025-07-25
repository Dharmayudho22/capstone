import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'; 

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


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
