import { useMemo } from 'react';
import { getContract } from '../services/contractService';
import { useWallet } from '../context/WalletContext';

export const useContract = () => {
    const { signer, provider, isConnected } = useWallet();

    const contract = useMemo(() => {
        if (isConnected && signer) {
            return getContract(signer);
        }
        if (provider) {
            return getContract(provider);
        }
        return null;
    }, [isConnected, signer, provider]);

    return contract;
};

export default useContract;
