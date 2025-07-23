import express from 'express';
import { getDoctorSchedules, getDoctorDetail } from '../controllers/scheduleController.js';
// Tidak perlu authMiddleware jika penjadwalan bisa diakses publik
// import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Rute untuk mendapatkan jadwal dokter berdasarkan lokasi
// Contoh penggunaan: GET /api/schedule/doctors?location=jakarta
router.get('/doctors', getDoctorSchedules);

// Rute untuk mendapatkan detail dokter berdasarkan ID (opsional)
// Contoh penggunaan: GET /api/schedule/doctors/doc-1
router.get('/doctors/:id', getDoctorDetail);

export default router;