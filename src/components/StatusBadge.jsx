import React from 'react';
import { CheckCircle, Ban } from 'lucide-react';

const StatusBadge = ({ isRevoked }) => {
    if (isRevoked) {
        return (
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700">
                <Ban className="w-5 h-5 text-red-600 dark:text-red-400" />
                <span className="text-sm font-bold text-red-700 dark:text-red-400">REVOKED</span>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-sm font-bold text-green-700 dark:text-green-400">VALID</span>
        </div>
    );
};

export default StatusBadge;
