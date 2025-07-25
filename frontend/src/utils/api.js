import axios from 'axios';

const api = axios.create({
  // Ganti dengan URL backend Anda.
  // Untuk pengembangan lokal:
  baseURL: 'https://capstone-backend-6r8j.onrender.com',
  // Untuk deployment, Anda perlu mengganti ini dengan URL server backend yang sebenarnya.
});

// Interceptor untuk menambahkan token ke setiap permintaan
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
