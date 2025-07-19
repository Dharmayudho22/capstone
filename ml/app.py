from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from src.predict.predict_api import UrineDiagnosisModel

app = Flask(__name__)
CORS(app) # Mengaktifkan CORS untuk semua rute

# Path ke model yang telah dilatih
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'src/models/urine_diagnosis_model.pkl')
# Inisialisasi model diagnosis
model_predictor = UrineDiagnosisModel(MODEL_PATH)

@app.route('/predict', methods=['POST'])
def predict():
    """
    Endpoint untuk melakukan prediksi diagnosis penyakit saluran kemih.
    Menerima data JSON dengan format:
    {
        "warna_urine": <int>,       # 0=Bening, 1=Kuning Pekat, 2=Coklat, 3=Merah
        "bau_urine": <int>,         # 0=Normal, 1=Menyengat
        "frekuensi_buang_air": <int>, # 0=Jarang, 1=Normal, 2=Sering
        "nyeri_saat_buang_air": <int> # 0=Tidak, 1=Ya
    }
    """
    if not request.is_json:
        return jsonify({"error": "Permintaan harus dalam format JSON"}), 400

    data = request.get_json()

    # Validasi input data
    required_fields = ['warna_urine', 'bau_urine', 'frekuensi_buang_air', 'nyeri_saat_buang_air']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Data input tidak lengkap. Pastikan semua bidang ada."}), 400

    # Lakukan prediksi menggunakan model
    prediction_result = model_predictor.predict(data)

    if "error" in prediction_result:
        return jsonify(prediction_result), 500
    
    return jsonify(prediction_result), 200

@app.route('/', methods=['GET'])
def home():
    return "API Machine Learning U-Detect Berjalan!"

if __name__ == '__main__':
    from src.train.train_model import train_and_save_model
    data_file = os.path.join(os.path.dirname(__file__), 'src/data/dummy_urine_data.csv')
    model_file = os.path.join(os.path.dirname(__file__), 'src/models/urine_diagnosis_model.pkl')
    train_and_save_model(data_file, model_file)

    # Jalankan Flask dengan host=127.0.0.1 dan port yang tidak umum
    app.run(debug=False, host='127.0.0.1', port=8088)
