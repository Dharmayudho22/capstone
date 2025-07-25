import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

const HistoryPage = ({ navigateTo }) => {
  const { currentUser, isLoadingAuth } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      if (isLoadingAuth || !currentUser) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Anda tidak terautentikasi. Silakan login kembali.');
          setLoading(false);
          navigateTo('login');
          return;
        }

        const response = await api.get('https://capstone-backend-6r8j.onrender.com/api/history', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setHistory(response.data.history);
      } catch (err) {
        console.error('Error fetching history:', err);
        setError(err.response?.data?.message || 'Gagal mengambil riwayat diagnosis.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [currentUser, isLoadingAuth, navigateTo]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full bg-gray-100 p-4">
        <p className="text-xl text-gray-700">Memuat riwayat...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={() => navigateTo('home')}
            className="mt-6 px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition duration-300 shadow-md"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Riwayat Diagnosis Urine</h2>

        {history.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Belum ada riwayat diagnosis.</p>
        ) : (
          <div className="space-y-6">
            {history.map((record) => (
              <div key={record.id} className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-teal-700">{record.fullName || 'Pengguna'}</h3>
                  <span className="text-sm text-gray-500">Tanggal Tes: {record.testDate}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <p><span className="font-medium">Alamat:</span> {record.address}</p>
                    <p><span className="font-medium">Jenis Kelamin:</span> {record.gender}</p>
                    <p><span className="font-medium">Warna Urine:</span> {record.inputSymptoms.urineColor}</p>
                    <p><span className="font-medium">Bau Urine:</span> {record.inputSymptoms.urineSmell}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Frekuensi Buang Air:</span> {record.inputSymptoms.urinationFrequency}</p>
                    <p><span className="font-medium">Nyeri Saat Buang Air:</span> {record.inputSymptoms.painDuringUrination}</p>
                    <p className="text-lg font-bold mt-2">Diagnosis: <span className={`${record.diagnosisResult === 'Sehat' ? 'text-green-600' : 'text-red-600'}`}>{record.diagnosisResult}</span></p>
                  </div>
                </div>
                {record.urineComposition && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-2">Komposisi Urine:</h4>
                    <ul className="list-disc list-inside text-gray-700">
                      {Object.entries(record.urineComposition).map(([key, value]) => (
                        <li key={key} className="text-sm">{key}: {value}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-4 text-right">Dicatat pada: {new Date(record.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => navigateTo('home')}
          className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-teal-600 transition duration-300 shadow-md mt-8"
        >
          KEMBALI KE MENU
        </button>
      </div>
    </div>
  );
};

export default HistoryPage;
