import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ message = 'Loading...', size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 gap-4">
            <Loader2 className={`${sizeClasses[size] || sizeClasses.md} animate-spin text-blue-600`} />
            {message && <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{message}</p>}
        </div>
    );
};

export default Loader;
