import React from 'react';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

const HomePage = ({ navigateTo }) => {
  const { currentUser } = useAuth(); // Dapatkan currentUser dari AuthContext

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="flex justify-between items-center p-6 bg-white">
          <div className="text-3xl font-bold text-teal-600">U-DETECT</div>
          <nav className="flex space-x-6 text-lg font-medium">
            <a href="#" className="text-gray-700 hover:text-teal-600">Home</a>
            <a href="#" className="text-gray-700 hover:text-teal-600">Penjadwalan</a>
            <a href="#" className="text-gray-700 hover:text-teal-600">Service</a>
            <a href="#" className="text-gray-700 hover:text-teal-600">Contact</a>
            <a href="#" className="text-gray-700 hover:text-teal-600">Berita</a>
          </nav>
          <div className="flex space-x-4">
            {currentUser ? (
              <button
                onClick={() => navigateTo('history')}
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 shadow-md"
              >
                Riwayat
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigateTo('login')}
                  className="px-6 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition duration-300 shadow-md"
                >
                  LOGIN
                </button>
                <button
                  onClick={() => navigateTo('register')}
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition duration-300 shadow-md"
                >
                  DAFTAR
                </button>
              </>
            )}
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col md:flex-row items-center justify-center p-8 md:p-12 bg-gray-50">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              SUBMIT DATA <br /> URINE SAMPLE
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Deteksi dini potensi penyakit saluran kemih dengan mudah dan cepat.
            </p>
            <button
              onClick={() => navigateTo('inputData')}
              className="px-8 py-4 bg-teal-500 text-white text-xl font-semibold rounded-full shadow-lg hover:bg-teal-600 transition duration-300 transform hover:scale-105"
            >
              TES SEKARANG
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
            {/* Menggunakan placeholder image karena gambar asli tidak dapat diakses secara langsung */}
            <img
              src="[https://placehold.co/400x400/a7f3d0/134e4a?text=Dokter+Urine](https://placehold.co/400x400/a7f3d0/134e4a?text=Dokter+Urine)"
              alt="Dokter memeriksa sampel urine"
              className="rounded-lg shadow-xl max-w-full h-auto"
              onError={(e) => { e.target.onerror = null; e.target.src = "[https://placehold.co/400x400/a7f3d0/134e4a?text=Gambar+Tidak+Tersedia](https://placehold.co/400x400/a7f3d0/134e4a?text=Gambar+Tidak+Tersedia)"; }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;