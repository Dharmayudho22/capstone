import express from 'express';
import { getDiagnosisHistory } from '../controllers/historyController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Rute ini dilindungi oleh autentikasi
router.get('/', authMiddleware, getDiagnosisHistory);

export default router;