import React from 'react';
import { Shield, Award } from 'lucide-react';

const CertificateCard = ({ studentName, course, date, certId }) => {
    return (
        <div className="relative bg-white dark:bg-gray-800 p-2 rounded-xl shadow-xl transform rotate-2 hover:rotate-0 transition duration-500">
            <div className="border-4 border-double border-slate-200 dark:border-slate-600 p-8 rounded-lg flex flex-col items-center text-center space-y-4 bg-slate-50 dark:bg-gray-900/50 min-h-[400px] justify-center">
                <Award className="w-16 h-16 text-blue-600 mb-2" />
                <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100 uppercase">Certificate of Achievement</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 italic">This is to certify that</p>
                <h3 className="text-xl font-bold text-blue-600 underline decoration-wavy underline-offset-4">{studentName || 'Student Name'}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Has successfully completed the course</p>
                <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 uppercase">{course || 'Blockchain Technology'}</h4>

                <div className="flex justify-between w-full mt-8 pt-8 border-t border-slate-200 dark:border-slate-700 text-left">
                    <div className="text-xs text-slate-700 dark:text-slate-300">
                        <p className="font-bold">Date</p>
                        <p>{date || 'Nov 18, 2025'}</p>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                        <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="text-xs text-right text-slate-700 dark:text-slate-300">
                        <p className="font-bold">Signature</p>
                        <p className="font-script text-lg">Authority</p>
                    </div>
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-4 font-mono">ID: {certId || '0x892...124'}</p>
            </div>
        </div>
    );
};

export default CertificateCard;
