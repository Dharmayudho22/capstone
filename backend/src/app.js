import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import diagnosisRoutes from './routes/diagnosisRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
// Import koneksi database
import { connectDB } from './config/database.js';
// Import model untuk memastikan mereka terdaftar dengan Sequelize
import './models/User.js';
import './models/DiagnosisHistory.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Mengizinkan permintaan lintas-asal
app.use(express.json()); // Mengurai body permintaan JSON

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/diagnosis', diagnosisRoutes);
app.use('/api/history', historyRoutes);

// Rute dasar untuk menguji server
app.get('/', (req, res) => {
    res.send('U-Detect Backend API is running!');
});

// Koneksi ke database saat aplikasi dimulai
connectDB();

export default app;