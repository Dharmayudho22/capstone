import React, { useState } from 'react';
import api from '../utils/api'; // Pastikan path ini benar

const RegisterPage = ({ navigateTo }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok.');
      return;
    }

    try {
      const response = await api.post('/auth/register', { email, password, name, phoneNumber });
      setSuccess(response.data.message);
      // Mungkin arahkan ke halaman login setelah registrasi berhasil
      setTimeout(() => {
        navigateTo('login');
      }, 2000);
    } catch (err) {
      console.error('Error during registration:', err);
      setError(err.response?.data?.message || 'Registrasi gagal. Silakan coba lagi.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h2>
        <form onSubmit={handleRegister} className="space-y-6">
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
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Nama</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 border-2 border-gray-300 focus:outline-none focus:border-teal-500 transition duration-200"
              placeholder="Masukkan nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-medium mb-2">Nomor Telepon</label>
            <div className="relative">
              <input
                type="tel"
                id="phoneNumber"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 border-2 border-gray-300 focus:outline-none focus:border-teal-500 transition duration-200 pr-10"
                placeholder="Masukkan nomor telepon Anda"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.04C13.596 18.32 13.238 18.5 12.875 18.5c-.363 0-.721-.18-.999-.46l-4.5-4.5c-.278-.278-.46-.636-.46-.999s.18-.721.46-.999l4.5-4.5c.278-.278.636-.46.999-.46s.721.18.999.46l4.5 4.5c.278.278.46.636.46.999s-.18.721-.46.999l-4.5 4.5z" />
                </svg>
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 border-2 border-gray-300 focus:outline-none focus:border-teal-500 transition duration-200 pr-10"
                placeholder="Buat password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.04C13.596 18.32 13.238 18.5 12.875 18.5c-.363 0-.721-.18-.999-.46l-4.5-4.5c-.278-.278-.46-.636-.46-.999s.18-.721.46-.999l4.5-4.5c.278-.278.636-.46.999-.46s.721.18.999.46l4.5 4.5c.278.278.46.636.46.999s-.18.721-.46.999l-4.5 4.5z" />
                  </svg>
                )}
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">Konfirmasi Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 border-2 border-gray-300 focus:outline-none focus:border-teal-500 transition duration-200 pr-10"
                placeholder="Konfirmasi password Anda"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.04C13.596 18.32 13.238 18.5 12.875 18.5c-.363 0-.721-.18-.999-.46l-4.5-4.5c-.278-.278-.46-.636-.46-.999s.18-.721.46-.999l4.5-4.5c.278-.278.636-.46.999-.46s.721.18.999.46l4.5 4.5c.278.278.46.636.46.999s-.18.721-.46.999l-4.5 4.5z" />
                  </svg>
                )}
              </span>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-teal-600 transition duration-300 shadow-md"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Sudah punya akun?{' '}
          <span
            className="text-teal-500 font-semibold cursor-pointer hover:underline"
            onClick={() => navigateTo('login')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;