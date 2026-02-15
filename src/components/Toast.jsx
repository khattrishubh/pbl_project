import React from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const iconMap = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
};

const bgMap = {
    success: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700',
    error: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700',
    info: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700',
};

const Toast = ({ toasts, removeToast }) => {
    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-20 right-4 z-[200] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-sm animate-fade-in ${bgMap[toast.type] || bgMap.info}`}
                >
                    {iconMap[toast.type] || iconMap.info}
                    <p className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                        {toast.message}
                    </p>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Toast;
