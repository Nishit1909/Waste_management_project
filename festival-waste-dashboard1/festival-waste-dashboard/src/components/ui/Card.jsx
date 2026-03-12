import React from 'react';
import { cn } from './Button';

export function Card({ className, children, ...props }) {
    return (
        <div className={cn("bg-[#1e293b] border border-gray-700 rounded-2xl p-6 shadow-sm", className)} {...props}>
            {children}
        </div>
    );
}

export function CardHeader({ className, children, ...props }) {
    return (
        <div className={cn("flex flex-col space-y-1.5 pb-4", className)} {...props}>
            {children}
        </div>
    );
}

export function CardTitle({ className, children, ...props }) {
    return (
        <h3 className={cn("font-semibold leading-none tracking-tight text-gray-100", className)} {...props}>
            {children}
        </h3>
    );
}

export function CardContent({ className, children, ...props }) {
    return (
        <div className={cn("", className)} {...props}>
            {children}
        </div>
    );
}
