import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os
from src.preprocess.preprocess_data import load_and_preprocess_data # Import fungsi dari preprocess_data.py

def train_and_save_model(data_filepath, model_save_path):
    """
    Melatih model klasifikasi dan menyimpannya.
    """
    X, y = load_and_preprocess_data(data_filepath)

    if X is None or y is None:
        print("Tidak dapat melatih model karena data tidak tersedia.")
        return

    # Bagi data menjadi set pelatihan dan pengujian
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Inisialisasi dan latih model (contoh: RandomForestClassifier)
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Evaluasi model
    y_pred = model.predict(X_test)
    print(f"Akurasi Model: {accuracy_score(y_test, y_pred):.2f}")
    print("\nLaporan Klasifikasi:\n", classification_report(y_test, y_pred))

    # Simpan model yang telah dilatih
    os.makedirs(os.path.dirname(model_save_path), exist_ok=True)
    joblib.dump(model, model_save_path)
    print(f"Model berhasil disimpan di: {model_save_path}")

if __name__ == "__main__":
    # Path ke dataset dummy
    data_file = os.path.join(os.path.dirname(__file__), '../data/dummy_urine_data.csv')
    # Path untuk menyimpan model
    model_file = os.path.join(os.path.dirname(__file__), '../models/urine_diagnosis_model.pkl')

    train_and_save_model(data_file, model_file)