import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { SUPPORTED_CHAIN_ID, NETWORK_CONFIG } from '../constants/networkConfig';

const WalletContext = createContext(null);

export const useWallet = () => {
    const ctx = useContext(WalletContext);
    if (!ctx) throw new Error('useWallet must be used within WalletProvider');
    return ctx;
};

export const WalletProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState('');
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [chainId, setChainId] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [isWrongNetwork, setIsWrongNetwork] = useState(false);
    const [toasts, setToasts] = useState([]);

    const SUPPORTED_CHAIN_ID_HEX = `0x${SUPPORTED_CHAIN_ID.toString(16)}`;

    // --- Toast System ---
    const addToast = useCallback((message, type = 'info', duration = 4000) => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    // --- Internal: set up provider + signer from accounts ---
    const setupProvider = useCallback(async (accounts) => {
        if (!window.ethereum || accounts.length === 0) {
            setWalletAddress('');
            setProvider(null);
            setSigner(null);
            setIsConnected(false);
            setChainId('');
            setIsWrongNetwork(false);
            return;
        }

        try {
            const browserProvider = new ethers.BrowserProvider(window.ethereum);
            const walletSigner = await browserProvider.getSigner();
            const network = await browserProvider.getNetwork();
            const currentChainIdHex = `0x${network.chainId.toString(16)}`;

            setProvider(browserProvider);
            setSigner(walletSigner);
            setWalletAddress(accounts[0]);
            setChainId(currentChainIdHex);
            setIsConnected(true);
            setIsWrongNetwork(currentChainIdHex !== SUPPORTED_CHAIN_ID_HEX);
        } catch (err) {
            console.error('Error setting up provider:', err);
        }
    }, [SUPPORTED_CHAIN_ID_HEX]);

    // --- Connect Wallet ---
    const connectWallet = useCallback(async () => {
        if (!window.ethereum) {
            addToast('Please install MetaMask to continue.', 'error', 5000);
            return;
        }

        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            await setupProvider(accounts);
            addToast('Wallet connected successfully!', 'success');
        } catch (err) {
            console.error('Wallet connection failed:', err);
            addToast('Failed to connect wallet. Please try again.', 'error');
        }
    }, [setupProvider, addToast]);

    // --- Disconnect Wallet ---
    const disconnectWallet = useCallback(() => {
        setWalletAddress('');
        setProvider(null);
        setSigner(null);
        setIsConnected(false);
        setChainId('');
        setIsWrongNetwork(false);
        addToast('Wallet disconnected.', 'info');
    }, [addToast]);

    // --- Switch to Sepolia ---
    const switchToSepolia = useCallback(async () => {
        if (!window.ethereum) return;

        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: SUPPORTED_CHAIN_ID_HEX }],
            });
        } catch (err) {
            // Chain not added — try adding it
            if (err.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [NETWORK_CONFIG.sepolia],
                    });
                } catch (addErr) {
                    addToast('Failed to add Sepolia network.', 'error');
                }
            } else {
                addToast('Failed to switch network.', 'error');
            }
        }
    }, [addToast, SUPPORTED_CHAIN_ID_HEX]);

    // --- Auto-reconnect on page load ---
    useEffect(() => {
        const autoConnect = async () => {
            if (!window.ethereum) return;
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    await setupProvider(accounts);
                }
            } catch (err) {
                console.error('Auto-reconnect failed:', err);
            }
        };
        autoConnect();
    }, [setupProvider]);

    // --- Listen for account & chain changes ---
    useEffect(() => {
        if (!window.ethereum) return;

        const handleAccountsChanged = async (accounts) => {
            if (accounts.length === 0) {
                disconnectWallet();
            } else {
                await setupProvider(accounts);
                addToast('Account changed.', 'info');
            }
        };

        const handleChainChanged = () => {
            window.location.reload();
        };

        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);

        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            window.ethereum.removeListener('chainChanged', handleChainChanged);
        };
    }, [setupProvider, disconnectWallet, addToast]);

    const value = {
        walletAddress,
        provider,
        signer,
        chainId,
        isConnected,
        isWrongNetwork,
        connectWallet,
        disconnectWallet,
        switchToSepolia,
        toasts,
        addToast,
        removeToast,
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
};

export default WalletContext;

