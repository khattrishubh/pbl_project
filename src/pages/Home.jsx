import React from 'react';
import { Shield, Globe, FileCheck } from 'lucide-react';
import CertificateCard from '../components/CertificateCard';

const Home = ({ navigateTo }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                {/* Hero Text */}
                <div className="flex-1 text-center lg:text-left space-y-8">
                    <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
                        Blockchain-Based <br />
                        <span className="text-blue-600">Student Certificate</span> <br />
                        Verification System
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                        A decentralized solution for secure, tamper-proof student certificate issuance and verification.
                        Eliminate fraud and ensure authenticity instantly.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                        <button
                            onClick={() => navigateTo('issue')}
                            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5"
                        >
                            Issue Certificate
                        </button>
                        <button
                            onClick={() => navigateTo('verify')}
                            className="w-full sm:w-auto px-8 py-3.5 rounded-lg border-2 border-slate-200 dark:border-slate-600 font-semibold text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-500 transition-all"
                        >
                            Verify Certificate
                        </button>
                    </div>
                </div>

                {/* Hero Image / Certificate Preview */}
                <div className="flex-1 w-full max-w-md lg:max-w-full relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <CertificateCard />
                </div>
            </div>

            {/* Features Section */}
            <div className="mt-24 mb-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-white">About This Project</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
                        This project leverages blockchain technology to create a tamper-proof certificate verification system.
                        Certificates issued through this platform are securely stored on the Ethereum blockchain.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Shield className="w-8 h-8 text-blue-500" />,
                            title: "Secure",
                            desc: "Blockchain technology ensures certificates cannot be tampered with or altered once issued."
                        },
                        {
                            icon: <Globe className="w-8 h-8 text-purple-500" />,
                            title: "Decentralized",
                            desc: "No central authority controls the data, making it immutable and verifiable by anyone."
                        },
                        {
                            icon: <FileCheck className="w-8 h-8 text-green-500" />,
                            title: "Verifiable",
                            desc: "Anyone can verify the authenticity of certificates instantly using the certificate ID."
                        }
                    ].map((feature, index) => (
                        <div key={index} className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-slate-100 dark:border-gray-700 hover:shadow-xl transition-shadow text-center flex flex-col items-center">
                            <div className="p-3 rounded-full bg-slate-50 dark:bg-gray-700 mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">{feature.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
