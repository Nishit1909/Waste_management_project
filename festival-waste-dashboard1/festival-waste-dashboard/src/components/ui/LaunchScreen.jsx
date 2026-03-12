import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LaunchScreen({ onComplete }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 2500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0f172a]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            {/* Glowing Logo Container */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative mb-8"
            >
                {/* Background Glow */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-blue-500 rounded-full blur-[40px] opacity-50"
                />

                {/* Logo Box */}
                <div className="relative w-24 h-24 bg-[#0b1220] border border-blue-500/30 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                    <span className="text-4xl font-black bg-gradient-to-br from-blue-400 to-indigo-600 bg-clip-text text-transparent">
                        FW
                    </span>
                </div>
            </motion.div>

            {/* Initializing Text */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-gray-300 font-medium tracking-wide mb-8 text-center"
            >
                Initializing AI Waste Intelligence
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                >
                    ...
                </motion.span>
            </motion.div>

            {/* Loading Bar Container */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden"
            >
                {/* Animated Loading Bar */}
                <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
            </motion.div>

            {/* Subtle Grid Background for Launch Screen */}
            <div className="absolute inset-0 z-[-1] pointer-events-none opacity-[0.02]"
                style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }}
            />
        </motion.div>
    );
}
