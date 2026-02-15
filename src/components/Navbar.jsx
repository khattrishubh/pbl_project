import React from 'react';
import { Shield, Wallet, Sun, Moon } from 'lucide-react';
import { formatAddress } from '../utils/formatAddress';

const Navbar = ({ currentPage, navigateTo, darkMode, setDarkMode, isConnected, walletAddress, connectWallet, disconnectWallet }) => {
    const navItems = [
        { key: 'home', label: 'Home' },
        { key: 'issue', label: 'Issue Certificate' },
        { key: 'verify', label: 'Verify Certificate' },
        { key: 'admin', label: 'Admin' },
    ];

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md border-b bg-white/80 dark:bg-gray-900/80 border-slate-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div
                        className="flex items-center cursor-pointer gap-2"
                        onClick={() => navigateTo('home')}
                    >
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <Shield className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                            CertChain
                        </span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.key}
                                onClick={() => navigateTo(item.key)}
                                className={`text-sm font-medium transition-colors hover:text-blue-500 ${currentPage === item.key
                                    ? 'text-blue-600'
                                    : 'text-slate-600 dark:text-slate-300'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full border border-slate-200 dark:border-gray-600 text-slate-500 dark:text-yellow-400 hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>

                        <button
                            onClick={isConnected ? disconnectWallet : connectWallet}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${isConnected
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 hover:bg-green-200 dark:hover:bg-green-900/50'
                                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                                }`}
                        >
                            <Wallet className="w-4 h-4" />
                            {isConnected ? formatAddress(walletAddress) : 'Connect Wallet'}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
