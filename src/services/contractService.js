import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from '../constants/contractAddress';
import abi from '../constants/abi.json';

/**
 * Get contract instance
 * @param {ethers.Signer | ethers.Provider} signerOrProvider 
 * @returns {ethers.Contract}
 */
export const getContract = (signerOrProvider) => {
    return new ethers.Contract(CONTRACT_ADDRESS, abi, signerOrProvider);
};

/**
 * Issue a new certificate
 * @param {ethers.Signer} signer 
 * @param {Object} data 
 * @returns {Promise<ethers.ContractTransactionResponse>}
 */
export const issueCertificate = async (signer, { studentName, course, rollNumber, grade, year }) => {
    const contract = getContract(signer);
    return await contract.issueCertificate(studentName, course, rollNumber, grade, year);
};

/**
 * Verify a certificate by ID
 * @param {ethers.Provider} provider 
 * @param {string|number} certificateId 
 * @returns {Promise<Object>}
 */
export const verifyCertificate = async (provider, certificateId) => {
    const contract = getContract(provider);
    const cert = await contract.getCertificate(certificateId);

    return {
        certificateId: cert[0].toString(),
        issuerAddress: cert[1],
        issueTimestamp: cert[2],
        isRevoked: cert[3],
        studentName: cert[4],
        course: cert[5],
        rollNumber: cert[6],
        grade: cert[7],
        year: cert[8],
    };
};

/**
 * Revoke a certificate
 * @param {ethers.Signer} signer 
 * @param {string|number} certificateId 
 * @returns {Promise<ethers.ContractTransactionResponse>}
 */
export const revokeCertificate = async (signer, certificateId) => {
    const contract = getContract(signer);
    return await contract.revokeCertificate(certificateId);
};

/**
 * Add a new issuer (Admin only)
 * @param {ethers.Signer} signer 
 * @param {string} issuerAddress 
 * @returns {Promise<ethers.ContractTransactionResponse>}
 */
export const addIssuer = async (signer, issuerAddress) => {
    const contract = getContract(signer);
    return await contract.addIssuer(issuerAddress);
};

/**
 * Check if an address is an authorized issuer
 * @param {ethers.Provider | ethers.Signer} providerOrSigner 
 * @param {string} address 
 * @returns {Promise<boolean>}
 */
export const isIssuer = async (providerOrSigner, address) => {
    const contract = getContract(providerOrSigner);
    return await contract.isIssuer(address);
};

/**
 * Check if an address is the admin
 * @param {ethers.Provider | ethers.Signer} providerOrSigner 
 * @param {string} address 
 * @returns {Promise<boolean>}
 */
export const isAdmin = async (providerOrSigner, address) => {
    const contract = getContract(providerOrSigner);
    const adminAddress = await contract.admin();
    return adminAddress.toLowerCase() === address.toLowerCase();
};
/**
 * Remove an existing issuer (Admin only)
 * @param {ethers.Signer} signer 
 * @param {string} issuerAddress 
 * @returns {Promise<ethers.ContractTransactionResponse>}
 */
export const removeIssuer = async (signer, issuerAddress) => {
    const contract = getContract(signer);
    return await contract.removeIssuer(issuerAddress);
};
