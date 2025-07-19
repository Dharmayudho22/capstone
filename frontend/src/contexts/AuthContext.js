import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // Periksa apakah token masih valid (belum kadaluarsa)
        if (decodedToken.exp * 1000 > Date.now()) {
          // Set currentUser dari payload token
          setCurrentUser({
            id: decodedToken.uid, // Ini adalah ID pengguna dari PostgreSQL
            email: decodedToken.email,
            // Anda mungkin perlu mengambil nama pengguna dari backend jika tidak ada di token
            // Untuk sementara, kita asumsikan nama ada di token atau akan diambil saat login
            name: decodedToken.name || decodedToken.email // Jika nama tidak ada di token, gunakan email
          });
        } else {
          // Token kadaluarsa, hapus dari localStorage
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem('token');
      }
    }
    setIsLoadingAuth(false); // Selesai memuat otentikasi awal
  }, []);

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('token'); // Pastikan token dihapus saat logout
  };

  const value = {
    currentUser,
    setCurrentUser,
    isLoadingAuth,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};