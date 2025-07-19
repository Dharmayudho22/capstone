import joblib
import os
import pandas as pd

class UrineDiagnosisModel:
    """
    Kelas untuk memuat model dan melakukan prediksi.
    """
    def __init__(self, model_path):
        self.model_path = model_path
        self.model = None
        self._load_model()
        # Mapping untuk diagnosis hasil
        self.diagnosis_map = {
            0: "Sehat",
            1: "Infeksi Saluran Kemih (ISK)",
            2: "Batu Ginjal",
            3: "Dehidrasi"
        }

    def _load_model(self):
        """Memuat model yang telah dilatih."""
        try:
            self.model = joblib.load(self.model_path)
            print(f"Model berhasil dimuat dari: {self.model_path}")
        except FileNotFoundError:
            print(f"Error: Model file '{self.model_path}' tidak ditemukan. Pastikan Anda telah melatih model terlebih dahulu.")
            self.model = None
        except Exception as e:
            print(f"Terjadi kesalahan saat memuat model: {e}")
            self.model = None

    def predict(self, input_data):
        """
        Melakukan prediksi berdasarkan data input.
        Input data harus berupa dictionary dengan kunci:
        'warna_urine', 'bau_urine', 'frekuensi_buang_air', 'nyeri_saat_buang_air'
        """
        if self.model is None:
            return {"error": "Model belum dimuat. Tidak dapat melakukan prediksi."}

        try:
            # Konversi input data ke DataFrame yang sesuai dengan format pelatihan model
            # Pastikan urutan kolom sesuai dengan yang digunakan saat pelatihan
            df_input = pd.DataFrame([input_data], columns=[
                'warna_urine', 'bau_urine', 'frekuensi_buang_air', 'nyeri_saat_buang_air'
            ])
            
            prediction_numeric = self.model.predict(df_input)[0]
            prediction_text = self.diagnosis_map.get(prediction_numeric, "Diagnosis Tidak Diketahui")

            # Contoh komposisi urine dummy berdasarkan diagnosis
            if prediction_numeric == 0: # Sehat
                komposisi_urine = {
                    "Air": "95%",
                    "Zat Terlarut": "5%",
                    "Urea": "3%",
                    "Natrium (Na+)": "0.5%",
                    "Kalium (K+)": "0.4%",
                    "Klorida (Cl-)": "0.75%",
                    "Kreatinin": "0.2%",
                    "Amonia (NH3)": "0.1%",
                    "Asam urat": "0.05%",
                    "Glukosa dan protein": "Tidak ada",
                    "Keluhan Normal/Tidak ada": ""
                }
            elif prediction_numeric == 1: # ISK
                komposisi_urine = {
                    "Air": "90%",
                    "Zat Terlarut": "10%",
                    "Urea": "4%",
                    "Natrium (Na+)": "0.6%",
                    "Kalium (K+)": "0.5%",
                    "Klorida (Cl-)": "0.8%",
                    "Kreatinin": "0.3%",
                    "Amonia (NH3)": "0.2%",
                    "Asam urat": "0.1%",
                    "Glukosa dan protein": "Ada (ringan)",
                    "Keluhan Normal/Tidak ada": "Nyeri saat buang air kecil, frekuensi sering"
                }
            elif prediction_numeric == 2: # Batu Ginjal
                komposisi_urine = {
                    "Air": "88%",
                    "Zat Terlarut": "12%",
                    "Urea": "4.5%",
                    "Natrium (Na+)": "0.7%",
                    "Kalium (K+)": "0.6%",
                    "Klorida (Cl-)": "0.9%",
                    "Kreatinin": "0.4%",
                    "Amonia (NH3)": "0.3%",
                    "Asam urat": "0.2%",
                    "Glukosa dan protein": "Tidak ada",
                    "Keluhan Normal/Tidak ada": "Nyeri punggung bawah, urine keruh"
                }
            elif prediction_numeric == 3: # Dehidrasi
                komposisi_urine = {
                    "Air": "80%",
                    "Zat Terlarut": "20%",
                    "Urea": "5%",
                    "Natrium (Na+)": "0.8%",
                    "Kalium (K+)": "0.7%",
                    "Klorida (Cl-)": "1.0%",
                    "Kreatinin": "0.5%",
                    "Amonia (NH3)": "0.4%",
                    "Asam urat": "0.3%",
                    "Glukosa dan protein": "Tidak ada",
                    "Keluhan Normal/Tidak ada": "Urine pekat, jarang buang air kecil"
                }
            else: # Default jika diagnosis tidak dikenal
                komposisi_urine = {
                    "Air": "N/A",
                    "Zat Terlarut": "N/A",
                    "Urea": "N/A",
                    "Natrium (Na+)": "N/A",
                    "Kalium (K+)": "N/A",
                    "Klorida (Cl-)": "N/A",
                    "Kreatinin": "N/A",
                    "Amonia (NH3)": "N/A",
                    "Asam urat": "N/A",
                    "Glukosa dan protein": "N/A",
                    "Keluhan Normal/Tidak ada": "N/A"
                }


            return {
                "diagnosis": prediction_text,
                "komposisi_urine": komposisi_urine
            }
        except Exception as e:
            return {"error": f"Terjadi kesalahan saat melakukan prediksi: {e}"}
