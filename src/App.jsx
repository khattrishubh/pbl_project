import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useWallet } from './context/WalletContext';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Home from './pages/Home';
import IssueCertificate from './pages/IssueCertificate';
import VerifyCertificate from './pages/VerifyCertificate';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('certchain-darkmode');
    return saved === 'true';
  });
  const [certificates, setCertificates] = useState([]);

  const {
    walletAddress,
    isConnected,
    isWrongNetwork,
    connectWallet,
    disconnectWallet,
    switchToSepolia,
    toasts,
    removeToast,
  } = useWallet();

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('certchain-darkmode', darkMode.toString());
  }, [darkMode]);

  const navigateTo = (page) => setCurrentPage(page);

  const addCertificate = (newCert) => {
    setCertificates([newCert, ...certificates]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigateTo={navigateTo} />;
      case 'issue':
        return (
          <IssueCertificate
            addCertificate={addCertificate}
            certificates={certificates}
          />
        );
      case 'verify':
        return <VerifyCertificate />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <Home navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-gray-100 font-sans">
      <Toast toasts={toasts} removeToast={removeToast} />

      {isConnected && isWrongNetwork && (
        <div className="bg-orange-500 text-white text-center py-2.5 px-4 text-sm font-medium flex items-center justify-center gap-3 flex-wrap animate-fade-in">
          <AlertTriangle className="w-4 h-4" />
          <span>Please switch to Sepolia Testnet to use CertChain.</span>
          <button
            onClick={switchToSepolia}
            className="px-3 py-1 bg-white text-orange-600 rounded-full text-xs font-bold hover:bg-orange-50 transition-colors"
          >
            Switch Network
          </button>
        </div>
      )}

      <Navbar
        currentPage={currentPage}
        navigateTo={navigateTo}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isConnected={isConnected}
        walletAddress={walletAddress}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
      />

      <main className="pb-20">
        {renderPage()}
      </main>

      <footer className="fixed bottom-0 w-full py-4 text-center text-sm border-t backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border-slate-200 dark:border-gray-800 text-slate-500 dark:text-gray-400">
        <div className="relative max-w-7xl mx-auto px-4">
          <p>Developed by Shubh and Team | Powered by Ethereum Blockchain</p>
        </div>
      </footer>
    </div>
  );
}