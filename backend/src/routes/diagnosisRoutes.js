import express from 'express';
import { submitDiagnosis } from '../controllers/diagnosisController.js';
import authMiddleware from '../middleware/authMiddleware.js';
// const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Rute ini dilindungi oleh autentikasi
router.post('/submit', authMiddleware, submitDiagnosis);

export default router;
