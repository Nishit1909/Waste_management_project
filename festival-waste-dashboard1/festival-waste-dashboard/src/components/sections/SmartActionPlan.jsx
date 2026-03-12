import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Truck, Trash2, Users, Factory, Recycle, Leaf,
    TrendingDown, CloudFog, Sprout, AlertCircle,
    ArrowRight, MessageCircle, Tent, Megaphone, Share2, Settings, Info
} from 'lucide-react';

const AnimatedNumber = ({ value, duration = 1500 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime;
        const animate = (time) => {
            if (!startTime) startTime = time;
            const progress = (time - startTime) / duration;

            if (progress < 1) {
                const easeOut = 1 - Math.pow(2, -10 * progress);
                setCount(Math.round(value * easeOut));
                requestAnimationFrame(animate);
            } else {
                setCount(value);
            }
        };
        requestAnimationFrame(animate);
    }, [value, duration]);

    return <>{count.toLocaleString()}</>;
};

export function SmartActionPlan({ predictedTotal }) {
    const [activeTab, setActiveTab] = useState('allocation');

    // --- DYNAMIC CALCULATIONS ---
    const totalKgs = predictedTotal || 0;
    const totalTons = totalKgs / 1000;
    
    // Resource Allocation
    const trucks = Math.max(1, Math.ceil(totalKgs / 2000)); // 1 truck per 2 tons
    const bins = Math.max(5, Math.ceil(totalKgs / 150));    // 1 bin per 150kg

    // Impact Metrics (Simulated based on typical diversion rates)
    const landfillReduction = totalTons > 10 ? 55 : 72; // Larger volumes are harder to sort perfectly
    const biogasPotential = (totalKgs * 0.4).toFixed(1); // Assuming 40% is organic
    const compostGenerated = Math.round(totalKgs * 0.25); // 25% yield from organic waste

    const tabs = [
        { id: 'allocation', label: 'Allocation' },
        { id: 'routing', label: 'Routing' },
        { id: 'impact', label: 'Impact' },
        { id: 'actions', label: 'Actions' }
    ];

    const tabVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
    };

    return (
        <div className="w-full mt-10">
            {/* Risk Badge */}
            <div className={`mb-6 p-3 rounded-lg border inline-flex items-center gap-2 ${
                totalTons > 10 ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
            }`}>
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                    {totalTons > 10 ? 'High Volume Alert' : 'Normal Capacity'}
                </span>
            </div>

            {/* Tabs Navigation */}
            <div className="flex space-x-4 sm:space-x-8 mb-8 overflow-x-auto custom-scrollbar pb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap outline-none ${activeTab === tab.id
                            ? 'text-cyan-400'
                            : 'text-gray-400 hover:text-gray-200'
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTabIndicator"
                                className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-cyan-400"
                                initial={false}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content Area */}
            <div className="min-h-[250px] relative">
                <AnimatePresence mode="wait">

                    {/* ALLOCATION TAB */}
                    {activeTab === 'allocation' && (
                        <motion.div
                            key="allocation"
                            variants={tabVariants}
                            initial="hidden" animate="visible" exit="exit"
                            className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-6 sm:gap-8"
                        >
                            <div className="p-6 md:p-8 rounded-xl bg-white/5 border border-white/10 shadow-sm flex flex-col justify-center items-center text-center hover:border-white/20 transition-colors">
                                <Truck className="w-8 h-8 text-cyan-400 mb-4" />
                                <div className="text-4xl font-bold text-white mb-2">
                                    <AnimatedNumber value={trucks} />
                                </div>
                                <span className="text-sm font-semibold text-gray-300 mb-1 tracking-wide">Trucks Required</span>
                                <span className="text-xs text-gray-500">Optimized for {totalTons.toFixed(1)}t load</span>
                            </div>

                            <div className="p-6 md:p-8 rounded-xl bg-white/5 border border-white/10 shadow-sm flex flex-col justify-center items-center text-center hover:border-white/20 transition-colors">
                                <Trash2 className="w-8 h-8 text-cyan-400 mb-4" />
                                <div className="text-4xl font-bold text-white mb-2">
                                    <AnimatedNumber value={bins} />
                                </div>
                                <span className="text-sm font-semibold text-gray-300 mb-1 tracking-wide">Smart Bins</span>
                                <span className="text-xs text-gray-500">Strategic placement points</span>
                            </div>
                        </motion.div>
                    )}

                    {/* ROUTING TAB */}
                    {activeTab === 'routing' && (
                        <motion.div
                            key="routing"
                            variants={tabVariants}
                            initial="hidden" animate="visible" exit="exit"
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                            <div className="p-5 rounded-xl bg-white/5 border border-white/10 shadow-sm flex flex-col hover:border-white/20 transition-colors">
                                <div className="flex items-center gap-3 mb-3">
                                    <Leaf className="w-6 h-6 text-emerald-400" />
                                    <h5 className="font-bold text-white flex-1">Organic</h5>
                                </div>
                                <p className="text-sm font-medium text-emerald-400/80 mb-3 flex items-center gap-1">
                                    <ArrowRight className="w-4 h-4" /> Biogas Facility
                                </p>
                                <p className="text-xs text-gray-400 mt-auto">Priority processing for wet waste.</p>
                            </div>

                            <div className="p-5 rounded-xl bg-white/5 border border-white/10 shadow-sm flex flex-col hover:border-white/20 transition-colors">
                                <div className="flex items-center gap-3 mb-3">
                                    <Recycle className="w-6 h-6 text-amber-400" />
                                    <h5 className="font-bold text-white flex-1">Recyclables</h5>
                                </div>
                                <p className="text-sm font-medium text-amber-400/80 mb-3 flex items-center gap-1">
                                    <ArrowRight className="w-4 h-4" /> MRF Center
                                </p>
                                <p className="text-xs text-gray-400 mt-auto">Sorting for plastic, paper, and glass.</p>
                            </div>

                            <div className="p-5 rounded-xl bg-white/5 border border-white/10 shadow-sm flex flex-col hover:border-white/20 transition-colors">
                                <div className="flex items-center gap-3 mb-3">
                                    <Settings className="w-6 h-6 text-slate-400" />
                                    <h5 className="font-bold text-white flex-1">Inorganic</h5>
                                </div>
                                <p className="text-sm font-medium text-slate-400/80 mb-3 flex items-center gap-1">
                                    <ArrowRight className="w-4 h-4" /> RDF Plant
                                </p>
                                <p className="text-xs text-gray-400 mt-auto">Converted to Refuse Derived Fuel.</p>
                            </div>
                        </motion.div>
                    )}

                    {/* IMPACT TAB */}
                    {activeTab === 'impact' && (
                        <motion.div
                            key="impact"
                            variants={tabVariants}
                            initial="hidden" animate="visible" exit="exit"
                            className="flex flex-col gap-6 p-6 rounded-xl bg-white/5 border border-white/10 shadow-sm"
                        >
                            <div className="w-full">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-medium text-gray-200 text-sm">Landfill Diversion Rate</span>
                                    <span className="text-sm font-bold text-blue-400">{landfillReduction}%</span>
                                </div>
                                <div className="w-full bg-black/30 rounded-full h-1.5 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }} animate={{ width: `${landfillReduction}%` }} transition={{ duration: 1 }}
                                        className="bg-blue-400 h-full rounded-full"
                                    />
                                </div>
                            </div>

                            <div className="w-full">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-medium text-gray-200 text-sm">Energy Potential</span>
                                    <span className="text-sm font-bold text-cyan-400">{biogasPotential} kg Biogas</span>
                                </div>
                                <div className="w-full bg-black/30 rounded-full h-1.5 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }} animate={{ width: '82%' }} transition={{ duration: 1, delay: 0.1 }}
                                        className="bg-cyan-400 h-full rounded-full"
                                    />
                                </div>
                            </div>

                            <div className="w-full">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-medium text-gray-200 text-sm">Compost Yield</span>
                                    <span className="text-sm font-bold text-emerald-400">{compostGenerated.toLocaleString()} kg</span>
                                </div>
                                <div className="w-full bg-black/30 rounded-full h-1.5 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }} animate={{ width: '45%' }} transition={{ duration: 1, delay: 0.2 }}
                                        className="bg-emerald-400 h-full rounded-full"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ACTIONS TAB */}
                    {activeTab === 'actions' && (
                        <motion.div
                            key="actions"
                            variants={tabVariants}
                            initial="hidden" animate="visible" exit="exit"
                            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
                        >
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-6">AI Recommendations</h4>
                                <ul className="flex flex-col gap-4">
                                    <li className="flex items-start gap-4 py-2 pl-4 border-l-2 border-l-cyan-400/80">
                                        <span className="text-cyan-400 font-bold mt-0.5 text-sm">1.</span>
                                        <span className="text-sm text-gray-300 leading-relaxed">
                                            {totalTons > 10 
                                                ? `Deploy ${trucks} trucks immediately to handle peak volume.` 
                                                : `Optimize route for ${trucks} trucks to reduce fuel emissions.`}
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-4 py-2 pl-4 border-l-2 border-l-cyan-400/80">
                                        <span className="text-cyan-400 font-bold mt-0.5 text-sm">2.</span>
                                        <span className="text-sm text-gray-300 leading-relaxed">
                                            Activate {Math.ceil(bins/3)} secondary collection points for better segregation.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-4 py-2 pl-4 border-l-2 border-l-cyan-400/80">
                                        <span className="text-cyan-400 font-bold mt-0.5 text-sm">3.</span>
                                        <span className="text-sm text-gray-300 leading-relaxed">
                                            Expected recovery: {Math.round(totalKgs * 0.15)}kg of high-grade plastic.
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-6">Community Focus</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-4 py-3 px-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                                        <MessageCircle className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                                        <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">Segregation Push</span>
                                    </div>
                                    <div className="flex items-center gap-4 py-3 px-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                                        <Share2 className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                                        <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">Vendor Alerts</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}