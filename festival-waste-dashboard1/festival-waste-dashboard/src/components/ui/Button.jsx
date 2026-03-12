import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function Button({
    children,
    variant = 'primary',
    className,
    ...props
}) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center px-4 py-2 font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm focus:ring-blue-500 focus:ring-offset-[#111827]",
                variant === 'primary' && "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white shadow-xl shadow-blue-500/20",
                variant === 'accent' && "bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-[#0f172a] focus:ring-emerald-400 shadow-xl shadow-emerald-400/20",
                variant === 'outline' && "text-gray-100 bg-transparent border border-gray-700 hover:bg-[#1e293b] focus:ring-gray-700",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
