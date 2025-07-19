import DiagnosisHistory from '../models/DiagnosisHistory.js'; // Import model DiagnosisHistory
import { Op } from 'sequelize'; // Untuk operator query jika diperlukan

export const getDiagnosisHistory = async (req, res) => {
    const userId = req.user.id; // Diambil dari token JWT

    try {
        // Mengambil semua riwayat diagnosis untuk pengguna tertentu
        const history = await DiagnosisHistory.findAll({
            where: { userId: userId },
            order: [['createdAt', 'DESC']] // Urutkan berdasarkan waktu pembuatan terbaru
        });

        // Format ulang data jika diperlukan (misalnya, untuk tanggal)
        const formattedHistory = history.map(record => ({
            id: record.id,
            fullName: record.fullName,
            address: record.address,
            gender: record.gender,
            testDate: record.testDate, // testDate sudah DATEONLY
            inputSymptoms: record.inputSymptoms,
            diagnosisResult: record.diagnosisResult,
            urineComposition: record.urineComposition,
            timestamp: record.createdAt.toISOString(), // createdAt adalah objek Date
        }));

        res.status(200).json({ history: formattedHistory });

    } catch (error) {
        console.error('Error saat mengambil riwayat diagnosis:', error);
        res.status(500).json({ message: 'Gagal mengambil riwayat diagnosis.' });
    }
};
