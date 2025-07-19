import React, { useState } from 'react';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import InputDataPage from './pages/InputDataPage';
import DiagnosisResultPage from './pages/DiagnosisResultPage';
import HistoryPage from './pages/HistoryPage';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { currentUser, isLoadingAuth } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [diagnosisResult, setDiagnosisResult] = useState(null);

  const navigateTo = (page, data = null) => {
    setCurrentPage(page);
    if (page === 'diagnosisResult' && data) {
      setDiagnosisResult(data);
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
      {/* Anda bisa menambahkan Footer di sini jika diperlukan */}
    </div>
  );
}

export default App;