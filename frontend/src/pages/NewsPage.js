import React from 'react';

const NewsPage = ({ navigateTo }) => {
  const newsArticles = [
    {
      id: 1,
      title: "Pentingnya Hidrasi untuk Kesehatan Saluran Kemih",
      date: "15 Juli 2025",
      summary: "Artikel ini membahas mengapa menjaga hidrasi yang cukup sangat penting untuk mencegah masalah saluran kemih seperti infeksi dan batu ginjal."
    },
    {
      id: 2,
      title: "Gejala Awal Infeksi Saluran Kemih yang Perlu Diwaspadai",
      date: "10 Juli 2025",
      summary: "Kenali tanda-tanda awal ISK agar dapat ditangani dengan cepat dan mencegah komplikasi serius."
    },
    {
      id: 3,
      title: "Inovasi Teknologi dalam Deteksi Dini Penyakit Urologi",
      date: "5 Juli 2025",
      summary: "Bagaimana teknologi, seperti machine learning, mengubah cara kita mendeteksi dan mengelola penyakit saluran kemih."
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Berita Terbaru</h2>
        {newsArticles.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Belum ada berita terbaru.</p>
        ) : (
          <div className="space-y-6">
            {newsArticles.map((article) => (
              <div key={article.id} className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-teal-700 mb-2">{article.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{article.date}</p>
                <p className="text-gray-700">{article.summary}</p>
                {/* Anda bisa menambahkan tombol "Baca Selengkapnya" di sini */}
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

export default NewsPage;