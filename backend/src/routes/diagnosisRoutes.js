import express from 'express';
import { submitDiagnosis } from '../controllers/diagnosisController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Rute ini dilindungi oleh autentikasi
router.post('/submit', authMiddleware, submitDiagnosis);

export default router;