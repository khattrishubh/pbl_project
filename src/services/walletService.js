export const walletService = {
    /**
     * Check if MetaMask is installed
     * @returns {boolean}
     */
    isMetaMaskInstalled: () => {
        return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
    },

    /**
     * Request account access
     * @returns {Promise<string[]>}
     */
    requestAccounts: async () => {
        if (!window.ethereum) throw new Error('MetaMask not installed');
        return await window.ethereum.request({ method: 'eth_requestAccounts' });
    },

    /**
     * Get connected accounts
     * @returns {Promise<string[]>}
     */
    getAccounts: async () => {
        if (!window.ethereum) return [];
        return await window.ethereum.request({ method: 'eth_accounts' });
    }
};
