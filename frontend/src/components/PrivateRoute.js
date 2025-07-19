import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, navigateTo }) => {
  const { currentUser, isLoadingAuth } = useAuth();

  useEffect(() => {
    if (!isLoadingAuth && !currentUser) {
      // Jika tidak sedang memuat dan tidak ada pengguna, arahkan ke halaman login
      navigateTo('login');
    }
  }, [currentUser, isLoadingAuth, navigateTo]);

  if (isLoadingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-700">Memuat autentikasi...</p>
      </div>
    );
  }

  return currentUser ? children : null; // Render children jika pengguna terautentikasi, jika tidak, jangan render apa-apa (akan diarahkan oleh useEffect)
};

export default PrivateRoute;