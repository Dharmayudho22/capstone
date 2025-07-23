import React, { useState } from 'react';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import InputDataPage from './pages/InputDataPage';
import DiagnosisResultPage from './pages/DiagnosisResultPage';
import HistoryPage from './pages/HistoryPage';
// Impor halaman-halaman baru
import SchedulePage from './pages/SchedulePage';
import ServicePage from './pages/ServicePage';
import ContactPage from './pages/ContactPage';
import NewsPage from './pages/NewsPage';
import Footer from './components/Footer';

import { useAuth } from './contexts/AuthContext';

function App() {
  const { currentUser, isLoadingAuth } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  // State untuk menyimpan data dokter yang akan diteruskan ke halaman kontak
  const [selectedDoctor, setSelectedDoctor] = useState(null); 

  const navigateTo = (page, data = null) => {
    setCurrentPage(page);
    if (page === 'diagnosisResult' && data) {
      setDiagnosisResult(data);
    } else if (page === 'contact' && data && data.doctor) { // Jika navigasi ke contact dengan data dokter
      setSelectedDoctor(data.doctor);
    } else {
      setSelectedDoctor(null); // Reset selectedDoctor jika bukan ke halaman contact
    }
  };

  const renderPage = () => {
    if (isLoadingAuth) {
      return (
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl text-gray-700">Memuat...</p>
        </div>
      );
    }

    switch (currentPage) {
      case 'home':
        return <HomePage navigateTo={navigateTo} />;
      case 'register':
        return <RegisterPage navigateTo={navigateTo} />;
      case 'login':
        return <LoginPage navigateTo={navigateTo} />;
      case 'inputData':
        return (
          <PrivateRoute currentUser={currentUser} navigateTo={navigateTo}>
            <InputDataPage navigateTo={navigateTo} />
          </PrivateRoute>
        );
      case 'diagnosisResult':
        return (
          <PrivateRoute currentUser={currentUser} navigateTo={navigateTo}>
            <DiagnosisResultPage diagnosis={diagnosisResult} navigateTo={navigateTo} />
          </PrivateRoute>
        );
      case 'history':
        return (
          <PrivateRoute currentUser={currentUser} navigateTo={navigateTo}>
            <HistoryPage navigateTo={navigateTo} />
          </PrivateRoute>
        );
      // Rute baru
      case 'schedule':
        return <SchedulePage navigateTo={navigateTo} />;
      case 'service':
        return <ServicePage navigateTo={navigateTo} />;
      case 'contact':
        // Teruskan selectedDoctor ke ContactPage
        return <ContactPage navigateTo={navigateTo} doctor={selectedDoctor} />;
      case 'news':
        return <NewsPage navigateTo={navigateTo} />;
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header navigateTo={navigateTo} />
      <main className="flex-grow container mx-auto p-4 flex items-center justify-center">
        {renderPage()}
      </main>
      <Footer/>
    </div>
  );
}

export default App;