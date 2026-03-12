import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IntroSection } from '../sections/IntroSection';
import { HeroSection } from '../sections/HeroSection';
import { CompositionSection } from '../sections/CompositionSection';

export function DashboardPage() {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="dashboard-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen py-10 px-4 md:px-8 bg-[#0f172a] overflow-x-hidden"
            >
                <div className="max-w-7xl mx-auto space-y-12">
                    <IntroSection />
                    <HeroSection />
                    <CompositionSection />
                </div>
            </motion.div>
        </AnimatePresence>
    );
}