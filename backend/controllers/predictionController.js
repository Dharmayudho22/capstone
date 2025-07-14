const axios = require('axios');
const History = require('../models/history');
require('dotenv').config({ path: '.env' });

// @desc    Get prediction from ML service and save to history
// @route   POST /api/predictions
// @access  Private
const getPrediction = async (req, res, next) => {
  const { warna_urine, bau_urine, nyeri_saat_buang_air_kecil, frekuensi_buang_air, demam } = req.body;
  const userId = req.user.id; // Diambil dari authMiddleware

  try {
    const mlServiceUrl = process.env.ML_SERVICE_URL + '/predict';

    const mlResponse = await axios.post(mlServiceUrl, {
      warna_urine,
      bau_urine,
      nyeri_saat_buang_air_kecil,
      frekuensi_buang_air,
      demam
    });

    const predictionResult = mlResponse.data.prediction;

    // Simpan prediksi ke histori
    const historyEntry = await History.create({
      userId,
      warna_urine,
      bau_urine,
      nyeri_saat_buang_air_kecil,
      frekuensi_buang_air,
      demam,
      prediction_result: predictionResult
    });

    res.status(200).json({ prediction: predictionResult, historyId: historyEntry.id });

  } catch (error) {
    console.error("Error getting prediction or saving history:", error.response ? error.response.data : error.message);
    let errorMessage = 'Gagal mendapatkan prediksi dari layanan ML.';
    if (error.response && error.response.data && error.response.data.error) {
        errorMessage = `Layanan ML: ${error.response.data.error}`;
    }
    res.status(error.response ? error.response.status : 500).json({ message: errorMessage });
  }
};

module.exports = { getPrediction };