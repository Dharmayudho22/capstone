import React, { useState } from 'react';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
// Hapus import { auth } dari '../App';

const LoginPage = ({ navigateTo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setCurrentUser } = useAuth(); // Dapatkan setCurrentUser dari AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

      // Simpan token di localStorage
      localStorage.setItem('token', token);

      // Set user di AuthContext
      setCurrentUser({
        id: user.id, // Gunakan 'id' dari backend PostgreSQL
        email: user.email,
        name: user.name, // Gunakan 'name' dari backend PostgreSQL
      });

      // Arahkan ke halaman utama atau dashboard setelah login
      navigateTo('home');
    } catch (err) {
      console.error('Error during login:', err);
      setError(err.response?.data?.message || 'Login gagal. Silakan coba lagi.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login to your account</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 border-2 border-gray-300 focus:outline-none focus:border-teal-500 transition duration-200"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 border-2 border-gray-300 focus:outline-none focus:border-teal-500 transition duration-200 pr-10"
                placeholder="Masukkan password Anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.04C13.596 18.32 13.238 18.5 12.875 18.5c-.363 0-.721-.18-.999-.46l-4.5-4.5c-.278-.278-.46-.636-.46-.999s.18-.721.46-.999l4.5-4.5c.278-.278.636-.46.999-.46s.721.18.999.46l4.5 4.5c.278.278.46.636.46.999s-.18.721-.46.999l-4.5 4.5z" />
                  </svg>
                )}
              </span>
            </div>
            <div className="text-right mt-2">
              <a href="#" className="text-sm text-teal-500 hover:underline">Lupa password?</a>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-teal-600 transition duration-300 shadow-md"
          >
            Login
          </button>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">Atau Dengan</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <button
          className="w-full flex items-center justify-center bg-white border border-gray-300 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition duration-300 shadow-sm"
        >
          <img src="[https://www.svgrepo.com/show/355037/google.svg](https://www.svgrepo.com/show/355037/google.svg)" alt="Google logo" className="w-5 h-5 mr-3" />
          Lanjutkan dengan Google
        </button>
        <p className="text-center text-gray-600 mt-6">
          Belum punya akun?{' '}
          <span
            className="text-teal-500 font-semibold cursor-pointer hover:underline"
            onClick={() => navigateTo('register')}
          >
            Daftar
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;