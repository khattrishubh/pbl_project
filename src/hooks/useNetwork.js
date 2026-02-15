import { useWallet } from '../context/WalletContext';
import { SUPPORTED_CHAIN_ID } from '../constants/networkConfig';

export const useNetwork = () => {
    const { chainId, isConnected, switchToSepolia } = useWallet();

    const isSupportedNetwork = isConnected && parseInt(chainId, 16) === SUPPORTED_CHAIN_ID;

    return {
        isSupportedNetwork,
        chainId,
        switchToSepolia,
    };
};

export default useNetwork;
