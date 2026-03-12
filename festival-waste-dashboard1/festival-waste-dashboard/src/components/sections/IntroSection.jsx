import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, TrendingDown, Users } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

export function IntroSection() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.section
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="mb-12"
        >
            <motion.div variants={item} className="mb-6">
                <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2">
                    Why This System Exists
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Side */}
                <motion.div variants={item} className="space-y-6">
                    <h3 className="text-4xl font-black bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent tracking-wide leading-tight mb-4">
                        Festivals Generate Massive Waste Surges.
                    </h3>
                    <p className="text-xl text-gray-400 leading-relaxed font-medium">
                        During major festivals, cities experience sudden spikes in solid waste.
                        Overflowing bins, lake pollution, and poor resource allocation happen
                        because planning is reactive instead of predictive.
                    </p>

                    <ul className="space-y-4 pt-2">
                        <li className="flex items-start gap-3">
                            <div className="p-1 rounded bg-red-500/10 text-red-400 shadow-lg shadow-red-500/20 mt-0.5">
                                <TrendingDown className="w-4 h-4" />
                            </div>
                            <span className="text-gray-100 font-medium">No accurate waste forecasting</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="p-1 rounded bg-amber-500/10 text-amber-400 shadow-lg shadow-amber-500/20 mt-0.5">
                                <AlertCircle className="w-4 h-4" />
                            </div>
                            <span className="text-gray-100 font-medium">Poor resource allocation</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="p-1 rounded bg-orange-500/10 text-orange-400 shadow-lg shadow-orange-500/20 mt-0.5">
                                <Users className="w-4 h-4" />
                            </div>
                            <span className="text-gray-100 font-medium">Community complaints ignored</span>
                        </li>
                    </ul>
                </motion.div>

                {/* Right Side */}
                <motion.div variants={item}>
                    <Card className="bg-[#1e293b] border-gray-700 shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden h-full">
                        {/* Soft Inner Glow/Lighting effects */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl -ml-16 -mb-16" />

                        <CardContent className="p-8 relative z-10 flex flex-col justify-center h-full text-gray-100">
                            <h4 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center text-sm shadow-inner">
                                    AI
                                </span>
                                Our Solution
                            </h4>
                            <p className="text-lg text-gray-300 leading-relaxed font-medium">
                                We built an AI-powered festival waste intelligence system that
                                <span className="text-blue-400 font-bold drop-shadow-[0_0_8px_rgba(59,130,246,0.7)] animate-pulse inline-block ml-1"> predicts waste before it happens</span>,
                                optimizes resource allocation, and integrates community feedback in real time.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.section>
    );
}
