const app = require('./app');
const { connectDB, sequelize } = require('./config/db');
require('dotenv').config({ path: '.env' }); // Pastikan memuat .env di root backend

const PORT = process.env.PORT || 5000;

// Panggil fungsi untuk menghubungkan ke database
connectDB();

// Sinkronkan model dengan database (hati-hati di produksi, gunakan migrasi!)
// Ini akan membuat tabel jika belum ada, atau mengubahnya (alter: true)
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created/synced!');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
    process.exit(1); // Keluar jika ada masalah koneksi/sinkronisasi DB
  });