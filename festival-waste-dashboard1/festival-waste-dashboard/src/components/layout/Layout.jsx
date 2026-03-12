import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../ui/Button';
import { Background3D } from '../ui/Background3D';

export function Layout({ children }) {
    const location = useLocation();

    const getLinkClass = (path) => {
        const isActive = location.pathname === path;
        return cn(
            "relative transition-all py-1",
            isActive ? "text-blue-400 font-bold" : "text-gray-400 hover:text-gray-100"
        );
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-gray-100 flex flex-col relative overflow-hidden">
            {/* Global Tech Grid Background */}
            <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
            />
            {/* 3D Background */}
            <Background3D />

            {/* Background Animated Blobs */}
            <div
                className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-900/20 blur-3xl opacity-30 animate-pulse"
                style={{ animationDuration: '7s', zIndex: 0 }}
            />
            <div
                className="absolute top-[20%] right-[-5%] w-[35vw] h-[35vw] rounded-full bg-indigo-900/20 blur-3xl opacity-30 animate-pulse"
                style={{ animationDuration: '9s', animationDelay: '1s', zIndex: 0 }}
            />
            <div
                className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-emerald-900/20 blur-3xl opacity-30 animate-pulse"
                style={{ animationDuration: '11s', animationDelay: '2s', zIndex: 0 }}
            />

            {/* Slow Floating Gradient Blob in Top Right */}
            <div
                className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/30 blur-[120px] opacity-40 pointer-events-none"
                style={{
                    animation: 'float 20s ease-in-out infinite',
                    zIndex: 0
                }}
            />

            <style jsx>{`
                @keyframes float {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(-30px, 50px) scale(1.05); }
                    66% { transform: translate(20px, 20px) scale(0.95); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
            `}</style>

            <header className="bg-[#0b1220]/80 backdrop-blur-md border-b border-white/5 py-4 top-0 sticky z-50 shadow-sm">
                <div className="dashboard-container py-0 flex items-center justify-between">
                    <div className="flex items-center gap-2 relative">
                        {/* Subtle background glow for logo */}
                        <div className="absolute -left-2 -top-2 w-12 h-12 bg-blue-500/20 rounded-full blur-xl z-0 pointer-events-none" />

                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10 relative">
                            FW
                        </div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300 z-10 relative">
                            Festival Waste Intelligence System
                        </h1>
                    </div>
                    <nav className="hidden md:flex gap-6 text-sm relative">
                        {[
                            { path: '/', label: 'Dashboard' },
                            { path: '/predict', label: 'Predict' },
                            { path: '/community', label: 'Community' }
                        ].map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link key={item.path} to={item.path} className={getLinkClass(item.path)}>
                                    {item.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.8)]"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                {/* Animated Horizontal Accent Divider */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-blue-500/50 via-indigo-500/50 to-emerald-500/50 bg-[length:200%_auto] animate-shimmer" />
            </header>

            <main className="flex-1 dashboard-container relative z-10 w-full">
                {children}
            </main>
        </div>
    );
}
