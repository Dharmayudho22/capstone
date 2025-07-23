import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

const InputDataPage = ({ navigateTo }) => {
  const { currentUser } = useAuth(); // Dapatkan currentUser
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '', // Pre-fill with current user's name (use .name from PostgreSQL)
    address: '',
    gender: '',
    testDate: new Date().toISOString().split('T')[0], // Default ke tanggal hari ini
    urineColor: '',
    urineSmell: '',
    urinationFrequency: '',
    painDuringUrination: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    // Update fullName if currentUser changes after initial render
    if (currentUser && currentUser.name && formData.fullName === '') {
      setFormData(prev => ({ ...prev, fullName: currentUser.name }));
    }
  }, [currentUser, formData.fullName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    setError('');
    // Validasi untuk Step 1
    if (step === 1) {
      if (!formData.fullName || !formData.address || !formData.gender || !formData.testDate) {
        setError('Harap isi semua bidang pada formulir ini.');
        return;
      }
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setError('');
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    setShowConfirmationModal(false); // Tutup modal setelah konfirmasi

    try {
      const token = localStorage.getItem('token'); // Ambil token dari localStorage
      if (!token) {
        setError('Anda tidak terautentikasi. Silakan login kembali.');
        setLoading(false);
        navigateTo('login');
        return;
      }

      const response = await api.post('/diagnosis/submit', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigateTo('diagnosisResult', response.data);
    } catch (err) {
      console.error('Error submitting diagnosis:', err);
      setError(err.response?.data?.message || 'Gagal mengirim data diagnosis. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const openConfirmationModal = () => {
    setError('');
    // Validasi untuk Step 2 sebelum membuka modal
    if (!formData.urineColor || !formData.urineSmell || !formData.urinationFrequency || !formData.painDuringUrination) {
      setError('Harap isi semua bidang keluhan pada formulir ini.');
      return;
      }
      setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
      setShowConfirmationModal(false);
  };

  const renderStep1 = () => (
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Form Tes Urine</h2>
          <div className="space-y-6">
              <div>
                  <label htmlFor="fullName" className="block text-gray-700 text-sm font-medium mb-2">Nama Lengkap</label>
                  <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 border-2 border-gray-300 focus:outline-none focus:border-teal-500 transition duration-200"
                      placeholder="Masukkan nama lengkap Anda"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                  />
              </div>
              <div>
                  <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-2">Alamat Lengkap</label>
                  <input
                      type="text"
                      id="address"
                      name="address"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 border-2 border-gray-300 focus:outline-none focus:border-teal-500 transition duration-200"
                      placeholder="Masukkan alamat lengkap Anda"
                      value={formData.address}
                      onChange={handleChange}
                      required
                  />
              </div>
              <div>
                  <label htmlFor="gender" className="block text-gray-700 text-sm font-medium mb-2">Jenis Kelamin</label>
                  <select
                      id="gender"
                      name="gender"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 border-2 border-gray-300 focus:outline-none focus:border-teal-500 transition duration-200"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                  >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="Laki-Laki">Laki-Laki</option>
                      <option value="Perempuan">Perempuan</option>
                  </select>
              </div>
              <div>
                  <label htmlFor="testDate" className="block text-gray-700 text-sm font-medium mb-2">Waktu Saat Tes Dilakukan</label>
                  <input
                      type="date"
                      id="testDate"
                      name="testDate"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 border-2 border-gray-300 focus:outline-none focus:border-teal-500 transition duration-200"
                      value={formData.testDate}
                      onChange={handleChange}
                      required
                  />
              </div>
              {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
              <button
                  type="button"
                  onClick={handleNext}
                  className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-teal-600 transition duration-300 shadow-md"
              >
                  KIRIM DATA
              </button>
          </div>
      </div>
  );

  const renderStep2 = () => (
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Form Tes Urine</h2>
          <div className="space-y-6">
              <div>
                  <label htmlFor="urineColor" className="block text-gray-700 text-sm font-medium mb-2">Warna Urine (Bening, Kuning Pekat, Coklat, Merah)</label>
                  <select
                      id="urineColor"
                      name="urineColor"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 border-2 border-gray-300 focus:outline-none focus:border-teal-500 transition duration-200"
                      value={formData.urineColor}
                      onChange={handleChange}
                      required
                  >
                      <option value="">Pilih Warna Urine</option>
                      <option value="Bening">Bening</option>
                      <option value="Kuning Pekat">Kuning Pekat</option>
                      <option value="Coklat">Coklat</option>
                      <option value="Merah">Merah</option>
                  </select>
              </div>
              <div>
                  <label htmlFor="urineSmell" className="block text-gray-700 text-sm font-medium mb-2">Bau Urine (Normal, Menyengat)</label>
                  <select
                      id="urineSmell"
                      name="urineSmell"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 border-2 border-gray-300 focus:outline-none focus:border-teal-500 transition duration-200"
                      value={formData.urineSmell}
                      onChange={handleChange}
                      required
                  >
                      <option value="">Pilih Bau Urine</option>
                      <option value="Normal">Normal</option>
                      <option value="Menyengat">Menyengat</option>
                  </select>
              </div>
              <div>
                  <label htmlFor="urinationFrequency" className="block text-gray-700 text-sm font-medium mb-2">Frekuensi buang air/hari (Jarang, Normal, Sering)</label>
                  <select
                      id="urinationFrequency"
                      name="urinationFrequency"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 border-2 border-gray-300 focus:outline-none focus:border-teal-500 transition duration-200"
                      value={formData.urinationFrequency}
                      onChange={handleChange}
                      required
                  >
                      <option value="">Pilih Frekuensi Buang Air</option>
                      <option value="Jarang">Jarang</option>
                      <option value="Normal">Normal</option>
                      <option value="Sering">Sering</option>
                  </select>
              </div>
              <div>
                  <label htmlFor="painDuringUrination" className="block text-gray-700 text-sm font-medium mb-2">Nyeri Saat Buang Air</label>
                  <select
                      id="painDuringUrination"
                      name="painDuringUrination"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 border-2 border-gray-300 focus:outline-none focus:border-teal-500 transition duration-200"
                      value={formData.painDuringUrination}
                      onChange={handleChange}
                      required
                  >
                      <option value="">Pilih Opsi</option>
                      <option value="Tidak">Tidak</option>
                      <option value="Ya">Ya</option>
                  </select>
              </div>
              {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
              <div className="flex justify-between space-x-4">
                  <button
                      type="button"
                      onClick={handleBack}
                      className="w-1/2 bg-gray-400 text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-500 transition duration-300 shadow-md"
                  >
                      KEMBALI
                  </button>
                  <button
                      type="button"
                      onClick={openConfirmationModal}
                      className="w-1/2 bg-teal-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-teal-600 transition duration-300 shadow-md"
                  >
                      KIRIM DATA
                  </button>
              </div>
          </div>
      </div>
  );

  const renderConfirmationModal = () => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          {/* max-h-[90vh] dan overflow-y-auto untuk membuat modal scrollable */}
          <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Konfirmasi Form Tes Urine</h3>
              <div className="space-y-4 text-gray-700">
                  <div className="flex flex-col">
                      <span className="font-semibold">Nama Lengkap:</span>
                      <span className="bg-gray-200 p-3 rounded-lg mt-1">{formData.fullName}</span>
                  </div>
                  <div className="flex flex-col">
                      <span className="font-semibold">Alamat Lengkap:</span>
                      <span className="bg-gray-200 p-3 rounded-lg mt-1">{formData.address}</span>
                  </div>
                  <div className="flex flex-col">
                      <span className="font-semibold">Jenis Kelamin:</span>
                      <span className="bg-gray-200 p-3 rounded-lg mt-1">{formData.gender}</span>
                  </div>
                  <div className="flex flex-col">
                      <span className="font-semibold">Waktu Saat Tes Dilakukan:</span>
                      <span className="bg-gray-200 p-3 rounded-lg mt-1">{formData.testDate}</span>
                  </div>
                  <div className="flex flex-col">
                      <span className="font-semibold">Warna Urine:</span>
                      <span className="bg-gray-200 p-3 rounded-lg mt-1">{formData.urineColor}</span>
                  </div>
                  <div className="flex flex-col">
                      <span className="font-semibold">Bau Urine:</span>
                      <span className="bg-gray-200 p-3 rounded-lg mt-1">{formData.urineSmell}</span>
                  </div>
                  <div className="flex flex-col">
                      <span className="font-semibold">Frekuensi Buang Air:</span>
                      <span className="bg-gray-200 p-3 rounded-lg mt-1">{formData.urinationFrequency}</span>
                  </div>
                  <div className="flex flex-col">
                      <span className="font-semibold">Nyeri Saat Buang Air:</span>
                      <span className="bg-gray-200 p-3 rounded-lg mt-1">{formData.painDuringUrination}</span>
                  </div>
              </div>
              {loading && <p className="text-blue-500 text-center mt-4">Memproses diagnosis...</p>}
              {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
              {/* Hapus kelas 'sticky bottom-0 bg-white pt-4 pb-2 -mx-8 px-8 border-t border-gray-200' */}
              {/* Cukup gunakan margin-top untuk memisahkan dari konten di atasnya */}
              <div className="flex justify-between space-x-4 mt-8">
                  <button
                      type="button"
                      onClick={closeConfirmationModal}
                      className="w-1/2 bg-gray-400 text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-500 transition duration-300 shadow-md"
                  >
                      BATAL
                  </button>
                  <button
                      type="button"
                      onClick={handleSubmit}
                      className="w-1/2 bg-teal-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-teal-600 transition duration-300 shadow-md"
                      disabled={loading}
                  >
                      {loading ? 'Mengirim...' : 'KONFIRMASI'}
                  </button>
              </div>
          </div>
      </div>
  );


  return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 p-4">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {showConfirmationModal && renderConfirmationModal()}
      </div>
  );
};

export default InputDataPage;