import React, { useState } from 'react';
import api from '../utils/api'; // Import instance axios Anda

const SchedulePage = ({ navigateTo }) => {
  const [location, setLocation] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDoctors([]);
    setError('');
    setMessage('');

    if (!location.trim()) {
      setError('Harap masukkan lokasi untuk mencari dokter.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(`https://capstone-backend-6r8j.onrender.com/api/schedule/doctors?location=${encodeURIComponent(location)}`);
      setDoctors(response.data.doctors);
      setMessage(response.data.message);
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setDoctors([]);
      setError(err.response?.data?.message || 'Gagal mencari dokter. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleContactDoctor = (doctor) => {
    // Navigasi ke halaman kontak dan kirim data dokter
    navigateTo('contact', { doctor });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Penjadwalan Dokter Urologi</h2>

        <form onSubmit={handleSearch} className="mb-8 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Masukkan lokasi (misal: Jakarta, Bandung)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-grow px-4 py-3 rounded-lg bg-gray-200 border-2 border-gray-300 focus:outline-none focus:border-teal-500 transition duration-200"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition duration-300 shadow-md"
            disabled={loading}
          >
            {loading ? 'Mencari...' : 'Cari Dokter'}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && doctors.length === 0 && !error && <p className="text-gray-600 text-center mb-4">{message}</p>}

        {doctors.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">Daftar Dokter Ditemukan:</h3>
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="text-left mb-4 md:mb-0">
                  <h4 className="text-xl font-semibold text-teal-700">{doctor.name}</h4>
                  <p className="text-gray-600">{doctor.specialty}</p>
                  <p className="text-gray-600">{doctor.address}</p>
                  <p className="text-gray-600">Telp: {doctor.phone}</p>
                  <p className="text-gray-600">Email: {doctor.email}</p>
                  <div className="mt-2">
                    <p className="font-medium text-gray-700">Ketersediaan:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {doctor.availability.map((slot, index) => (
                        <li key={index}>{slot.day}: {slot.time}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button
                  onClick={() => handleContactDoctor(doctor)}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300 shadow-md"
                >
                  Hubungi Dokter
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => navigateTo('home')}
          className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-teal-600 transition duration-300 shadow-md mt-8"
        >
          KEMBALI KE MENU UTAMA
        </button>
      </div>
    </div>
  );
};

export default SchedulePage;
