import React from 'react';

const ServicePage = ({ navigateTo }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Layanan Kami</h2>
        <p className="text-gray-700 mb-4">
          Kami menyediakan berbagai layanan terkait kesehatan saluran kemih, termasuk:
        </p>
        <ul className="list-disc list-inside text-left text-gray-700 mb-8 mx-auto max-w-md">
          <li>Deteksi dini potensi penyakit saluran kemih.</li>
          <li>Informasi edukasi tentang kesehatan urologi.</li>
          <li>Rekomendasi gaya hidup sehat.</li>
          <li>Integrasi dengan dokter spesialis (akan datang).</li>
        </ul>
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition duration-300 shadow-md"
        >
          KEMBALI KE MENU UTAMA
        </button>
      </div>
    </div>
  );
};

export default ServicePage;