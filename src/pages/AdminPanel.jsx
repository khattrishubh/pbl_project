import React, { useState } from 'react';
import { ethers } from 'ethers';
import { ShieldCheck, UserPlus, UserMinus, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { addIssuer, removeIssuer } from '../services/contractService';
import Loader from '../components/Loader';

const AdminPanel = () => {
    const { isConnected, signer, addToast } = useWallet();
    const [clubAddress, setClubAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const showAlert = (type, message) => {
        setAlert({ type, message });
        setTimeout(() => setAlert(null), 5000);
    };

    const handleApprove = async () => {
        if (!isConnected) {
            showAlert('error', 'Please connect your wallet first.');
            return;
        }
        if (!ethers.isAddress(clubAddress)) {
            showAlert('error', 'Please enter a valid Ethereum address.');
            return;
        }

        setLoading(true);
        try {
            const tx = await addIssuer(signer, clubAddress);
            addToast('Transaction submitted. Waiting for confirmation...', 'info');
            await tx.wait();
            showAlert('success', `Club approved as issuer!`);
            addToast('Issuer approved successfully!', 'success');
            setClubAddress('');
        } catch (err) {
            const msg = err?.reason || err?.message || 'Transaction failed';
            showAlert('error', msg);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async () => {
        if (!isConnected) {
            showAlert('error', 'Please connect your wallet first.');
            return;
        }
        if (!ethers.isAddress(clubAddress)) {
            showAlert('error', 'Please enter a valid Ethereum address.');
            return;
        }

        setLoading(true);
        try {
            const tx = await removeIssuer(signer, clubAddress);
            addToast('Transaction submitted. Waiting for confirmation...', 'info');
            await tx.wait();
            showAlert('success', `Club removed as issuer.`);
            addToast('Issuer removed successfully.', 'success');
            setClubAddress('');
        } catch (err) {
            const msg = err?.reason || err?.message || 'Transaction failed';
            showAlert('error', msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                    <ShieldCheck className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Admin Panel</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Manage authorized club issuers on the blockchain.</p>
            </div>

            {/* Warning if wallet not connected */}
            {!isConnected && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg flex items-start gap-3">
                    <AlertTriangle className="text-yellow-600 dark:text-yellow-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-bold text-yellow-800 dark:text-yellow-200 text-sm">Wallet Not Connected</p>
                        <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
                            Connect your admin wallet to manage issuers.
                        </p>
                    </div>
                </div>
            )}

            {/* Alert */}
            {alert && (
                <div
                    className={`mb-6 p-4 rounded-lg flex items-start gap-3 border animate-fade-in ${alert.type === 'success'
                        ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-800 dark:text-green-300'
                        : 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700 text-red-800 dark:text-red-300'
                        }`}
                >
                    {alert.type === 'success' ? (
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    ) : (
                        <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm font-medium">{alert.message}</p>
                </div>
            )}

            {/* Main Card */}
            <div className="rounded-2xl shadow-lg border overflow-hidden bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700">
                <div className="p-8">
                    <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                        Club Wallet Address
                    </label>
                    <input
                        type="text"
                        value={clubAddress}
                        onChange={(e) => setClubAddress(e.target.value)}
                        placeholder="0x..."
                        disabled={!isConnected}
                        className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-600 text-slate-800 dark:text-gray-200 placeholder-slate-400 dark:placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition-all font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    />

                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                        <button
                            onClick={handleApprove}
                            disabled={loading || !isConnected}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? <Loader size="sm" message="" /> : <UserPlus className="w-4 h-4" />}
                            {loading ? 'Processing...' : 'Approve Club'}
                        </button>
                        <button
                            onClick={handleRemove}
                            disabled={loading || !isConnected}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? <Loader size="sm" message="" /> : <UserMinus className="w-4 h-4" />}
                            {loading ? 'Processing...' : 'Remove Club'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Info Note */}
            <div className="mt-6 p-4 rounded-lg text-xs leading-relaxed bg-slate-100 dark:bg-gray-800/50 text-slate-500 dark:text-slate-400">
                <p><strong className="text-slate-700 dark:text-slate-300">Note:</strong> Only the contract admin (deployer wallet) can approve or remove club issuers. If you are not the admin, transactions will be reverted by the smart contract.</p>
            </div>
        </div>
    );
};

export default AdminPanel;

