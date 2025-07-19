import React from 'react';

const DiagnosisResultPage = ({ diagnosis, navigateTo }) => {
  if (!diagnosis) {
    // Jika tidak ada data diagnosis, mungkin arahkan kembali atau tampilkan pesan
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Hasil Tes Urine</h2>
          <p className="text-gray-700 mb-4">Tidak ada data diagnosis untuk ditampilkan.</p>
          <button
            onClick={() => navigateTo('home')}
            className="px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition duration-300 shadow-md"
          >
            KEMBALI KE MENU
          </button>
        </div>
      </div>
    );
  }

  const { diagnosis: diagnosisResult, urineComposition } = diagnosis;
  const fullName = diagnosis.fullName || "Pengguna"; // Ambil nama lengkap dari diagnosis jika ada
  const testDate = diagnosis.testDate || new Date().toISOString().split('T')[0]; // Ambil tanggal tes jika ada

  // Tentukan warna dan teks untuk status 'Anda Sehat' atau 'Perlu Perhatian'
  let statusText = diagnosisResult;
  let statusColor = "text-red-500"; // Default untuk perlu perhatian
  let circleColor = "border-red-500";
  let circleFillColor = "bg-red-100";

  if (diagnosisResult === "Sehat") {
    statusText = "Sehat";
    statusColor = "text-green-500";
    circleColor = "border-green-500";
    circleFillColor = "bg-green-100";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Hasil Tes Urine</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Bagian Kiri: Nama, Waktu Tes, dan Status */}
          <div className="flex flex-col space-y-4">
            <div>
              <span className="block text-gray-700 text-sm font-medium mb-2">Nama Lengkap</span>
              <div className="bg-gray-200 p-3 rounded-lg text-gray-800">{fullName}</div>
            </div>
            <div>
              <span className="block text-gray-700 text-sm font-medium mb-2">Waktu Saat Tes Dilakukan</span>
              <div className="bg-gray-200 p-3 rounded-lg text-gray-800">{testDate}</div>
            </div>
            <div className="flex items-center justify-center mt-4">
              <div className={`relative w-32 h-32 rounded-full flex flex-col items-center justify-center ${circleColor} border-4 ${circleFillColor}`}>
                <span className={`text-xl font-bold ${statusColor}`}>Anda</span>
                <span className={`text-lg font-semibold ${statusColor}`}>{statusText}</span>
                {/* Dummy circles for visual effect */}
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="absolute top-4 right-4 w-3 h-3 bg-gray-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Bagian Kanan: Komposisi Urine */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Komposisi Urine Anda</h3>
            <div className="bg-gray-200 p-4 rounded-lg text-gray-800 leading-relaxed">
              {urineComposition && Object.entries(urineComposition).map(([key, value]) => (
                <p key={key}>
                  <span className="font-medium">{key}:</span> {value}
                </p>
              ))}
            </div>
          </div>
        </div>

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

export default DiagnosisResultPage;