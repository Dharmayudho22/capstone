import pandas as pd
from sklearn.model_selection import train_test_split

def load_and_preprocess_data(filepath):
    """
    Memuat dataset dan melakukan pra-pemrosesan dasar.
    Dalam skenario nyata, ini akan melibatkan penanganan nilai yang hilang,
    encoding kategori, scaling fitur, dll.
    """
    try:
        df = pd.read_csv(filepath, comment='#')
        # Pisahkan fitur (X) dan target (y)
        X = df[['warna_urine', 'bau_urine', 'frekuensi_buang_air', 'nyeri_saat_buang_air']]
        y = df['diagnosis']
        return X, y
    except FileNotFoundError:
        print(f"Error: File '{filepath}' tidak ditemukan.")
        return None, None
    except Exception as e:
        print(f"Terjadi kesalahan saat memuat atau memproses data: {e}")
        return None, None

if __name__ == "__main__":
    # Contoh penggunaan
    data_path = '../data/dummy_urine_data.csv'
    X, y = load_and_preprocess_data(data_path)
    if X is not None and y is not None:
        print("Data berhasil dimuat dan diproses.")
        print("Fitur (X) head:\n", X.head())
        print("\nTarget (y) head:\n", y.head())
    else:
        print("Gagal memuat atau memproses data.")