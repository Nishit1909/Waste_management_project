import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Recycle, Trash2, Settings } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { AnimatedNumber } from '../ui/AnimatedCounter';

function TiltCard({ children, className }) {
    const [style, setStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)' });
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // max 5 degrees tilt
        const rotateX = ((centerY - y) / centerY) * 5;
        const rotateY = ((x - centerX) / centerX) * 5;

        setStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
            transition: 'transform 0.1s ease-out'
        });
    };

    const handleMouseLeave = () => {
        setStyle({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
            transition: 'transform 0.5s ease-out'
        });
    };

    return (
        <div
            ref={cardRef}
            className={className}
            style={style}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    );
}

export function HeroSection() {
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

    const stats = [
        {
            label: 'Total Combined Waste',
            valueStr: '38,700.06 t',
            colorClass: 'border-white/5 hover:border-white/10 bg-white/5 border-t-indigo-500/50 hover:border-indigo-500/30'
        },
        {
            label: 'Total Organic Waste',
            valueStr: '29,769.32 t',
            colorClass: 'border-white/5 hover:border-white/10 bg-white/5 border-t-emerald-500/50 hover:border-emerald-500/30'
        },
        {
            label: 'Total Plastic Waste',
            valueStr: '7,442.30 t',
            colorClass: 'border-white/5 hover:border-white/10 bg-white/5 border-t-amber-500/50 hover:border-amber-500/30'
        },
        {
            label: 'Total Metal Waste',
            valueStr: '1,488.44 t',
            colorClass: 'border-white/5 hover:border-white/10 bg-white/5 border-t-slate-500/50 hover:border-slate-500/30'
        }
    ];

    return (
        <section className="mb-10 relative rounded-3xl overflow-hidden p-6 -mx-6">
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-[#0f172a]" />
            <div className="absolute inset-0 z-0 opacity-10"
                style={{ backgroundImage: "linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)", backgroundSize: "40px 40px" }}
            />
            {/* Center glow effect behind text */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] z-0 pointer-events-none" />

            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 flex flex-col items-center text-center relative z-10"
                >
                    <div className="relative inline-block mb-4 hover:scale-105 transition-transform duration-300">
                        <h2 className="text-6xl md:text-7xl font-black text-gray-100 tracking-tight leading-tight drop-shadow-lg">
                            Predict Waste
                            <br />
                            <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                                Before It Happens.
                            </span>
                        </h2>
                        {/* Animated Glowing Underline */}
                        <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)] origin-left"
                        />
                    </div>

                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl font-medium mt-6">
                        AI-powered forecasting and real-time community intelligence for festival management.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all hover:-translate-y-1">
                            Get Started
                        </button>
                        <button className="px-8 py-4 bg-transparent border-2 border-blue-500/50 text-blue-400 rounded-xl font-bold text-lg hover:bg-blue-500/10 hover:border-blue-400 transition-all">
                            View Live Data
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {stats.map((stat, i) => (
                        <motion.div key={i} variants={item} className="group h-40">
                            <TiltCard className="h-full">
                                <Card className={`h-full border transition-all duration-500 hover:bg-white/10 ${stat.colorClass} shadow-lg backdrop-blur-md rounded-2xl group-hover:-translate-y-1 relative overflow-hidden`}>
                                    {/* Top accent border handled by border-t- color classes */}
                                    <CardContent className="p-6 flex flex-col justify-center h-full relative z-10 gap-2">
                                        <div className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                                        <div>
                                            <span className="text-[28px] font-black text-white tabular-nums drop-shadow-md tracking-normal inline-block">
                                                {stat.valueStr.split(' ')[0]}
                                                <span className="text-[14px] text-gray-400 font-bold ml-1.5">{stat.valueStr.split(' ')[1]}</span>
                                            </span>
                                        </div>
                                    </CardContent>

                                    {/* Subtle corner light flare */}
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                                </Card>
                            </TiltCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
