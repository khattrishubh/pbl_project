import { useWallet } from '../context/WalletContext';

export const useWalletInfo = () => {
    const wallet = useWallet();
    return {
        address: wallet.walletAddress,
        isConnected: wallet.isConnected,
        isWrongNetwork: wallet.isWrongNetwork,
        connect: wallet.connectWallet,
        disconnect: wallet.disconnectWallet,
        provider: wallet.provider,
        signer: wallet.signer,
        chainId: wallet.chainId,
        switchToSepolia: wallet.switchToSepolia,
    };
};

export default useWalletInfo;
