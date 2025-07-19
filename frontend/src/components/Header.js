import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ navigateTo }) => {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Hapus token dari localStorage
    logout(); // Update state di AuthContext
    navigateTo('home'); // Arahkan ke halaman utama setelah logout
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="text-2xl font-bold text-teal-600 cursor-pointer" onClick={() => navigateTo('home')}>
        U-DETECT
      </div>
      <nav className="flex items-center space-x-6">
        <span className="text-gray-700 hover:text-teal-600 cursor-pointer" onClick={() => navigateTo('home')}>Home</span>
        {/* <span className="text-gray-700 hover:text-teal-600 cursor-pointer">Penjadwalan</span> */}
        {/* <span className="text-gray-700 hover:text-teal-600 cursor-pointer">Service</span> */}
        {/* <span className="text-gray-700 hover:text-teal-600 cursor-pointer">Contact</span> */}
        {/* <span className="text-gray-700 hover:text-teal-600 cursor-pointer">Berita</span> */}
        {currentUser ? (
          <>
            <span className="text-gray-700">Halo, {currentUser.name || currentUser.email}</span>
            <button
              onClick={() => navigateTo('history')}
              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 shadow-md"
            >
              Riwayat
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300 shadow-md"
            >
              Logout
            </button>
          </>
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
      </nav>
    </header>
  );
};

export default Header;