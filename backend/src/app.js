import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'; // Pastikan semua ini pakai .js
import diagnosisRoutes from './routes/diagnosisRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import { connectDB } from './config/database.js';
import './models/User.js';
import './models/DiagnosisHistory.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// --- START: Perbaikan Konfigurasi CORS ---
const allowedOrigins = [
  'https://capstone-frontend-iy7q.onrender.com', // Ganti dengan URL frontend Render Anda yang sebenarnya
  // Tambahkan origin lain jika ada, misal:
  // 'http://localhost:3000' // Jika Anda menguji frontend secara lokal
];

const corsOptions = {
  origin: function (origin, callback) {
    // Izinkan permintaan tanpa origin (misalnya, dari Postman atau curl)
    // Atau jika origin ada dalam daftar allowedOrigins
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions)); // Gunakan middleware CORS dengan opsi
// --- END: Perbaikan Konfigurasi CORS ---

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/diagnosis', diagnosisRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/schedule', scheduleRoutes);

app.get('/', (req, res) => {
    res.send('U-Detect Backend API is running!');
});

connectDB();

export default app;
