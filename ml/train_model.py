import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os

def train_and_save_model(data_path='ml-service/dataset/dummy_urine_data.csv', model_save_path='ml-service/model/urinary_model.pkl'):
    """
    Melatih model klasifikasi dan menyimpannya.
    """
    # Pastikan direktori model ada
    os.makedirs(os.path.dirname(model_save_path), exist_ok=True)

    try:
        # 1. Muat dataset dummy/sintetik
        # Pastikan kolom sesuai dengan input yang direncanakan:
        # 'warna_urine', 'bau_urine', 'nyeri_saat_buang_air_kecil', 'frekuensi_buang_air', 'demam', 'penyakit'
        # 'penyakit' adalah target variabel (misal: 'ISK', 'Batu Ginjal', 'Dehidrasi', 'Normal')
        df = pd.read_csv(data_path)

        # 2. Preprocessing data
        # Mengubah 'Ya'/'Tidak' ke 1/0
        df['nyeri_saat_buang_air_kecil'] = df['nyeri_saat_buang_air_kecil'].map({'Ya': 1, 'Tidak': 0})
        df['demam'] = df['demam'].map({'Ya': 1, 'Tidak': 0})

        # One-hot encoding untuk fitur kategorikal
        df = pd.get_dummies(df, columns=['warna_urine', 'bau_urine'], drop_first=False)

        # Pisahkan fitur (X) dan target (y)
        X = df.drop('penyakit', axis=1)
        y = df['penyakit']

        # Simpan daftar kolom setelah preprocessing untuk digunakan di `app.py`
        joblib.dump(X.columns.tolist(), 'ml-service/model/expected_columns.pkl')
        print("Daftar kolom yang diharapkan berhasil disimpan.")

        # Bagi data menjadi training dan testing set
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # 3. Inisialisasi dan latih model klasifikasi (contoh: RandomForestClassifier)
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X_train, y_train)

        # 4. Evaluasi model
        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        print(f"Model Accuracy: {accuracy:.2f}")
        print("\nClassification Report:")
        print(classification_report(y_test, y_pred))

        # 5. Simpan model yang sudah dilatih
        joblib.dump(model, model_save_path)
        print(f"Model berhasil disimpan di: {model_save_path}")

    except FileNotFoundError:
        print(f"Error: Dataset tidak ditemukan di {data_path}. Pastikan path benar.")
    except Exception as e:
        print(f"Terjadi kesalahan saat melatih atau menyimpan model: {e}")

if __name__ == "__main__":
    # --- Buat dataset dummy sederhana untuk contoh ---
    # Anda perlu mengganti ini dengan dataset dummy/sintetik yang lebih representatif
    # Berikan keragaman yang cukup untuk fitur dan label penyakit
    dummy_data = {
        'warna_urine': ['Kuning Terang', 'Kuning Gelap', 'Bening', 'Kuning Gelap', 'Merah', 'Kuning Terang', 'Kuning Gelap', 'Bening', 'Merah', 'Kuning Terang'],
        'bau_urine': ['Normal', 'Amis', 'Normal', 'Aroma Kuat', 'Normal', 'Normal', 'Amis', 'Normal', 'Aroma Kuat', 'Normal'],
        'nyeri_saat_buang_air_kecil': ['Tidak', 'Ya', 'Tidak', 'Ya', 'Tidak', 'Tidak', 'Ya', 'Tidak', 'Ya', 'Tidak'],
        'frekuensi_buang_air': [6, 12, 4, 10, 5, 7, 11, 5, 9, 6],
        'demam': ['Tidak', 'Ya', 'Tidak', 'Ya', 'Tidak', 'Tidak', 'Ya', 'Tidak', 'Ya', 'Tidak'],
        'penyakit': ['Normal', 'ISK', 'Normal', 'Batu Ginjal', 'ISK', 'Normal', 'ISK', 'Normal', 'Batu Ginjal', 'Normal'] # Target
    }
    dummy_df = pd.DataFrame(dummy_data)
    
    # Pastikan direktori dataset ada
    os.makedirs('ml-service/dataset', exist_ok=True)
    dummy_df.to_csv('ml-service/dataset/dummy_urine_data.csv', index=False)
    print("Dataset dummy berhasil dibuat di ml-service/dataset/dummy_urine_data.csv")

    train_and_save_model()