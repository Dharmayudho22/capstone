import fetch from 'node-fetch';
import dotenv from 'dotenv';
import DiagnosisHistory from '../models/DiagnosisHistory.js'; // Import model DiagnosisHistory

dotenv.config();

const ML_API_URL = process.env.ML_API_URL;

export const submitDiagnosis = async (req, res) => {
    const {
        fullName,
        address,
        gender,
        testDate,
        urineColor,
        urineSmell,
        urinationFrequency,
        painDuringUrination
    } = req.body;

    const userId = req.user.id; // Diambil dari token JWT setelah authMiddleware (ini adalah ID dari PostgreSQL)

    if (!fullName || !address || !gender || !testDate || !urineColor || !urineSmell || !urinationFrequency || !painDuringUrination) {
        return res.status(400).json({ message: 'Semua bidang input diagnosis harus diisi.' });
    }

    // Konversi input teks ke format numerik untuk model ML
    const mlInput = {
        warna_urine: {
            "Bening": 0, "Kuning Pekat": 1, "Coklat": 2, "Merah": 3
        }[urineColor],
        bau_urine: {
            "Normal": 0, "Menyengat": 1
        }[urineSmell],
        frekuensi_buang_air: {
            "Jarang": 0, "Normal": 1, "Sering": 2
        }[urinationFrequency],
        nyeri_saat_buang_air: {
            "Tidak": 0, "Ya": 1
        }[painDuringUrination]
    };

    // Validasi konversi
    if (Object.values(mlInput).some(val => val === undefined)) {
        return res.status(400).json({ message: 'Nilai input tidak valid untuk konversi ML.' });
    }

    try {
        // Panggil API Machine Learning
        const mlResponse = await fetch(ML_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mlInput)
        });

        if (!mlResponse.ok) {
            const errorText = await mlResponse.text();
            console.error('Error dari ML API:', errorText);
            return res.status(mlResponse.status).json({ message: `Gagal mendapatkan diagnosis dari ML API: ${errorText}` });
        }

        const mlResult = await mlResponse.json();

        // Simpan hasil diagnosis ke PostgreSQL
        await DiagnosisHistory.create({
            userId: userId,
            fullName,
            address,
            gender,
            testDate, // Tanggal akan disimpan sesuai format DATEONLY
            inputSymptoms: {
                urineColor,
                urineSmell,
                urinationFrequency,
                painDuringUrination
            },
            diagnosisResult: mlResult.diagnosis,
            urineComposition: mlResult.komposisi_urine,
        });

        res.status(200).json({
            message: 'Data diagnosis berhasil disimpan dan prediksi diterima.',
            diagnosis: mlResult.diagnosis,
            urineComposition: mlResult.komposisi_urine
        });

    } catch (error) {
        console.error('Error saat submit diagnosis:', error);
        res.status(500).json({ message: 'Gagal memproses diagnosis. Silakan coba lagi.' });
    }
};