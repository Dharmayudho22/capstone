import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Pastikan ini mengarah ke App.js atau App.jsx
import './styles/App.css'; // Path ke App.css
import { AuthProvider } from './contexts/AuthContext'; // Path ke AuthContext

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);