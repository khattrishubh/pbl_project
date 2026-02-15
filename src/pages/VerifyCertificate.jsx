import React, { useState } from 'react';
import { ShieldCheck, X, Ban, Loader2 } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { verifyCertificate, revokeCertificate } from '../services/contractService';
import { formatDate } from '../utils/formatDate';
import StatusBadge from '../components/StatusBadge';
import ConfirmModal from '../components/ConfirmModal';

const VerifyCertificate = () => {
    const { walletAddress, signer, provider, addToast } = useWallet();
    const [searchId, setSearchId] = useState('');
    const [result, setResult] = useState(null);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showRevokeModal, setShowRevokeModal] = useState(false);
    const [revoking, setRevoking] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSearched(false);
        setResult(null);
        setError('');

        try {
            // Use provider for read-only operations
            const cert = await verifyCertificate(provider || window.ethereum, searchId);
            setResult(cert);
            setSearched(true);
        } catch (err) {
            setSearched(true);
            setResult(null);
            const msg = err?.reason || err?.message || 'Certificate not found';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleRevoke = async () => {
        setRevoking(true);
        try {
            if (!signer) throw new Error('Please connect your wallet to revoke.');
            const tx = await revokeCertificate(signer, result.certificateId);
            addToast('Revocation submitted. Waiting for confirmation...', 'info');
            await tx.wait();

            setResult({ ...result, isRevoked: true });
            setShowRevokeModal(false);
            addToast(`Certificate #${result.certificateId} has been revoked.`, 'success');
        } catch (err) {
            const msg = err?.reason || err?.message || 'Revocation failed';
            addToast(msg, 'error');
        } finally {
            setRevoking(false);
        }
    };

    const isIssuerMatch = result && walletAddress && result.issuerAddress.toLowerCase() === walletAddress.toLowerCase();

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            {/* Info Box */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 mb-8 rounded-r-lg flex items-start gap-3">
                <ShieldCheck className="text-blue-600 dark:text-blue-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="font-bold text-blue-800 dark:text-blue-200 text-sm">On-Chain Verification</p>
                    <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                        Certificates are verified directly from the Ethereum blockchain. No wallet connection required.
                    </p>
                </div>
            </div>

            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Verify Certificate</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Enter the Certificate ID to verify authenticity on the blockchain.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-gray-700">
                <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        placeholder="Enter Certificate ID (e.g., 1, 2, 3...)"
                        className="flex-1 px-4 py-3 rounded-lg bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-600 text-slate-800 dark:text-gray-200 placeholder-slate-400 dark:placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition-all font-mono"
                    />
                    <button
                        type="submit"
                        disabled={loading || !searchId}
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {loading ? 'Verifying...' : 'Verify'}
                    </button>
                </form>

                {/* Results Section */}
                {searched && (
                    <div className="mt-8 animate-fade-in">
                        {result ? (
                            <div>
                                <div className="mb-6">
                                    <StatusBadge isRevoked={result.isRevoked} />
                                </div>

                                {/* Certificate Details */}
                                <div className={`rounded-xl p-6 border ${result.isRevoked
                                    ? 'border-red-200 dark:border-red-800/50'
                                    : 'border-green-200 dark:border-green-800/50'
                                    }`}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                        <div>
                                            <p className="text-slate-500 dark:text-slate-400">Student Name</p>
                                            <p className="font-semibold text-slate-800 dark:text-slate-200 text-lg">{result.studentName}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 dark:text-slate-400">Course</p>
                                            <p className="font-semibold text-slate-800 dark:text-slate-200 text-lg">{result.course}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 dark:text-slate-400">Roll Number</p>
                                            <p className="font-medium text-slate-700 dark:text-slate-300">{result.rollNumber}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 dark:text-slate-400">Grade</p>
                                            <p className="font-medium text-slate-700 dark:text-slate-300">{result.grade}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 dark:text-slate-400">Year of Passing</p>
                                            <p className="font-medium text-slate-700 dark:text-slate-300">{result.year}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 dark:text-slate-400">Certificate ID</p>
                                            <p className="font-mono font-medium text-blue-600 dark:text-blue-400">#{result.certificateId}</p>
                                        </div>

                                        {/* Issuer Info */}
                                        <div className="md:col-span-2 pt-4 border-t border-slate-200 dark:border-gray-700 mt-2">
                                            <p className="text-slate-500 dark:text-slate-400 mb-1">Issuer Wallet Address</p>
                                            <p className="font-mono text-xs text-slate-600 dark:text-slate-400 break-all bg-slate-50 dark:bg-gray-900 p-2 rounded border border-slate-200 dark:border-gray-700">
                                                {result.issuerAddress}
                                            </p>
                                        </div>

                                        <div className="md:col-span-2">
                                            <p className="text-slate-500 dark:text-slate-400 mb-1">Issue Date</p>
                                            <p className="font-medium text-slate-700 dark:text-slate-300">
                                                {formatDate(result.issueTimestamp)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Revoke Button — only shown if connected wallet is the issuer */}
                                    {isIssuerMatch && !result.isRevoked && (
                                        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-gray-700">
                                            <button
                                                onClick={() => setShowRevokeModal(true)}
                                                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 shadow-md hover:shadow-lg transition-all"
                                            >
                                                <Ban className="w-4 h-4" />
                                                Revoke Certificate
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-6 text-center">
                                <div className="flex flex-col items-center gap-2 text-red-600 dark:text-red-400">
                                    <X className="w-8 h-8" />
                                    <h3 className="text-lg font-bold">Certificate Not Found</h3>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 mt-2">
                                    {error || (
                                        <>The Certificate ID <span className="font-mono font-bold bg-red-100 dark:bg-red-900/50 px-1 rounded">{searchId}</span> does not exist on the blockchain.</>
                                    )}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Revoke Confirmation Modal */}
            <ConfirmModal
                isOpen={showRevokeModal}
                title="Revoke Certificate"
                message={`Are you sure you want to revoke Certificate #${result?.certificateId}? This action is permanent and cannot be undone. The certificate will be marked as revoked on the blockchain.`}
                onConfirm={handleRevoke}
                onCancel={() => setShowRevokeModal(false)}
                loading={revoking}
            />
        </div>
    );
};

export default VerifyCertificate;
