import React from 'react';

// Menerima prop 'doctor' yang berisi informasi dokter yang dipilih
const ContactPage = ({ navigateTo, doctor }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Hubungi Kami</h2>
        <p className="text-gray-700 mb-4">
          Jika Anda memiliki pertanyaan atau membutuhkan bantuan, jangan ragu untuk menghubungi kami.
        </p>
        
        {doctor ? (
          <div className="text-left text-gray-700 mb-8 mx-auto max-w-md space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold text-teal-700 mb-3">Informasi Kontak Dokter</h3>
            <p><strong>Nama Dokter:</strong> {doctor.name}</p>
            <p><strong>Spesialisasi:</strong> {doctor.specialty}</p>
            <p><strong>Alamat:</strong> {doctor.address}</p>
            <p><strong>Telepon:</strong> <a href={`tel:${doctor.phone}`} className="text-blue-500 hover:underline">{doctor.phone}</a></p>
            <p><strong>Email:</strong> <a href={`mailto:${doctor.email}`} className="text-blue-500 hover:underline">{doctor.email}</a></p>
            <p className="mt-4 text-sm text-gray-600">
              Silakan hubungi dokter langsung untuk menentukan jadwal janji temu Anda.
            </p>
          </div>
        ) : (
          <div className="text-left text-gray-700 mb-8 mx-auto max-w-md space-y-4">
            <p><strong>Email:</strong> support@udetect.com</p>
            <p><strong>Telepon:</strong> +62 812 3456 7890</p>
            <p><strong>Alamat:</strong> Jl. Kesehatan No. 10, Kota Sehat, Indonesia</p>
            <p className="mt-4 text-sm text-gray-600">
              Anda dapat menghubungi kami melalui informasi di atas.
            </p>
          </div>
        )}

        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition duration-300 shadow-md mt-8"
        >
          KEMBALI KE MENU UTAMA
        </button>
      </div>
    </div>
  );
};

export default ContactPage;