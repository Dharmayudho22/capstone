import os
import joblib
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv() # Memuat variabel lingkungan

app = Flask(__name__)
CORS(app) # Mengaktifkan CORS untuk mengizinkan permintaan dari backend

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model', 'urinary_model.pkl')
EXPECTED_COLUMNS_PATH = os.path.join(os.path.dirname(__file__), 'model', 'expected_columns.pkl')

model = None
expected_columns = None

def load_ml_assets():
    """Memuat model Machine Learning dan daftar kolom yang diharapkan."""
    global model, expected_columns
    try:
        model = joblib.load(MODEL_PATH)
        expected_columns = joblib.load(EXPECTED_COLUMNS_PATH)
        print("Model ML dan daftar kolom berhasil dimuat.")
    except FileNotFoundError:
        print(f"Error: Model atau daftar kolom tidak ditemukan. Pastikan 'train_model.py' sudah dijalankan.")
        model = None
        expected_columns = None
    except Exception as e:
        print(f"Terjadi kesalahan saat memuat aset ML: {e}")
        model = None
        expected_columns = None

# Muat aset ML saat aplikasi dimulai
with app.app_context():
    load_ml_assets()

@app.route('/predict', methods=['POST'])
def predict():
    """Endpoint untuk prediksi penyakit saluran kemih."""
    if model is None or expected_columns is None:
        return jsonify({"error": "Model ML belum dimuat. Silakan periksa log server ML."}), 500

    data = request.get_json(force=True)

    # Validasi input data
    required_fields = ['warna_urine', 'bau_urine', 'nyeri_saat_buang_air_kecil', 'frekuensi_buang_air', 'demam']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Data input tidak lengkap. Diperlukan: warna_urine, bau_urine, nyeri_saat_buang_air_kecil, frekuensi_buang_air, demam."}), 400

    # Pastikan frekuensi_buang_air adalah integer
    try:
        data['frekuensi_buang_air'] = int(data['frekuensi_buang_air'])
    except ValueError:
        return jsonify({"error": "Frekuensi buang air harus berupa angka."}), 400

    # Buat DataFrame dari input user
    input_df = pd.DataFrame([data])

    # Lakukan preprocessing yang sama seperti saat training
    input_df['nyeri_saat_buang_air_kecil'] = input_df['nyeri_saat_buang_air_kecil'].map({'Ya': 1, 'Tidak': 0})
    input_df['demam'] = input_df['demam'].map({'Ya': 1, 'Tidak': 0})

    # One-hot encoding untuk 'warna_urine' dan 'bau_urine'
    input_df = pd.get_dummies(input_df, columns=['warna_urine', 'bau_urine'], drop_first=False)

    # Pastikan semua kolom yang diharapkan ada, isi dengan 0 jika tidak ada
    processed_input = pd.DataFrame(0, index=[0], columns=expected_columns)
    for col in input_df.columns:
        if col in processed_input.columns:
            processed_input[col] = input_df[col]

    try:
        # Lakukan prediksi menggunakan model
        prediction = model.predict(processed_input)
        result = prediction[0]

        return jsonify({"prediction": result})
    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({"error": f"Terjadi kesalahan saat prediksi: {e}"}), 500

if __name__ == '__main__':
    PORT = os.getenv('ML_SERVICE_PORT', 5001)
    app.run(debug=True, port=PORT)