import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, Activity, Leaf, Recycle, ShieldAlert, CheckCircle } from 'lucide-react';
import { FestivalDropdown } from '../ui/FestivalDropdown';
import { SearchableLocationDropdown } from '../ui/SearchableLocationDropdown';
import { SmartActionPlan } from '../sections/SmartActionPlan';

export function PredictPage() {
    const [isPredicting, setIsPredicting] = useState(false);
    const [hasPredicted, setHasPredicted] = useState(false);

    // Form states
    const [festivalType, setFestivalType] = useState('');
    const [crowd, setCrowd] = useState('');
    const [duration, setDuration] = useState('');
    const [area, setArea] = useState('');

    // Results states for animation
    const [predictedTotal, setPredictedTotal] = useState(0);
    const [organicWaste, setOrganicWaste] = useState(0);
    const [recyclableWaste, setRecyclableWaste] = useState(0);
    const [confidence, setConfidence] = useState(0);

    // useEffect(() => {
    //     if (hasPredicted) {
    //         const durationMs = 1500;
    //         const steps = 60;
    //         const stepTime = durationMs / steps;

    //         let currentStep = 0;
    //         const targetTotal = 12500;
    //         const targetOrganic = 45;
    //         const targetRecyclable = 35;
    //         const targetConfidence = 92;

    //         const interval = setInterval(() => {
    //             currentStep++;
    //             const progress = currentStep / steps;
    //             const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

    //             setPredictedTotal(Math.round(targetTotal * easeOut));
    //             setOrganicWaste(Math.round(targetOrganic * easeOut));
    //             setRecyclableWaste(Math.round(targetRecyclable * easeOut));
    //             setConfidence(Math.round(targetConfidence * easeOut));

    //             if (currentStep >= steps) {
    //                 clearInterval(interval);
    //                 setPredictedTotal(targetTotal);
    //                 setOrganicWaste(targetOrganic);
    //                 setRecyclableWaste(targetRecyclable);
    //                 setConfidence(targetConfidence);
    //             }
    //         }, stepTime);

    //         return () => clearInterval(interval);
    //     }
    // }, [hasPredicted]);
    const animateResults = (targetTotal, targetOrganic, targetRecyclable) => {
    const durationMs = 1500;
    const steps = 60;
    const stepTime = durationMs / steps;

    let currentStep = 0;

    const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        setPredictedTotal(Math.round(targetTotal * easeOut));
        setOrganicWaste(Math.round(targetOrganic * easeOut));
        setRecyclableWaste(Math.round(targetRecyclable * easeOut));
        setConfidence(92);

        if (currentStep >= steps) {
            clearInterval(interval);
            setPredictedTotal(targetTotal);
            setOrganicWaste(targetOrganic);
            setRecyclableWaste(targetRecyclable);
        }
    }, stepTime);
};
    // const handlePredict = (e) => {
    //     e.preventDefault();
    //     if (!festivalType || !crowd || !duration || !area) return;

    //     setIsPredicting(true);
    //     setHasPredicted(false);
    //     setPredictedTotal(0);
    //     setOrganicWaste(0);
    //     setRecyclableWaste(0);
    //     setConfidence(0);

    //     // Mock prediction delay
    //     setTimeout(() => {
    //         setIsPredicting(false);
    //         setHasPredicted(true);
    //     }, 2000);
    // };
    const handlePredict = async (e) => {
    e.preventDefault();
    if (!festivalType || !crowd || !duration || !area) return;

    setIsPredicting(true);
    setHasPredicted(false);
    setPredictedTotal(0);
    setOrganicWaste(0);
    setRecyclableWaste(0);
    setConfidence(0);

    try {
        const response = await fetch("http://localhost:8000/predict-with-explanation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ward_name: area,
                festival: festivalType,
                year: 2023,
                population: Number(crowd),
                festival_duration_days: Number(duration)
            })
        });

        if (!response.ok) throw new Error("Prediction failed");

        const data = await response.json();

        const totalKg = Math.round(data.festival_total_waste_tons * 1000);

        const organicPercent = Math.round(
            (data.organic_tons / data.festival_total_waste_tons) * 100
        );

        const recyclablePercent = Math.round(
            ((data.plastic_tons + data.recyclable_metal_tons) /
                data.festival_total_waste_tons) * 100
        );

        setIsPredicting(false);
        setHasPredicted(true);

        animateResults(totalKg, organicPercent, recyclablePercent);

    } catch (error) {
        console.error(error);
        setIsPredicting(false);
    }
};
 return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full min-h-[calc(100vh-8rem)] rounded-3xl bg-gradient-to-b from-[#0f172a] to-[#020617] p-4 sm:p-6 lg:p-10 shadow-2xl border border-white/5"
    >
        <div className="max-w-7xl mx-auto h-full grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left Panel - Input Form */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="relative group w-full"
            >
                <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-30 transition duration-700"></div>
                <div className="relative h-full p-6 sm:p-10 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col z-10">
                    <div className="mb-10">
                        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 tracking-tight mb-3">Waste Prediction</h2>
                        <p className="text-gray-400 font-medium text-lg">AI-powered waste forecasting for your festival</p>
                    </div>

                    <form onSubmit={handlePredict} className="flex flex-col gap-6 flex-1">
                        <div className="group/field mb-2 relative z-50">
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Select Festival</label>
                            <FestivalDropdown value={festivalType} onChange={setFestivalType} />
                        </div>

                        <div className="group/field">
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Expected Crowd</label>
                            <input
                                type="number"
                                required
                                min="1"
                                placeholder="e.g. 50000"
                                value={crowd}
                                onChange={(e) => setCrowd(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 text-white rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            />
                        </div>

                        <div className="group/field">
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Duration (days)</label>
                            <input
                                type="number"
                                required
                                min="1"
                                placeholder="e.g. 3"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 text-white rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            />
                        </div>

                        <div className="group/field relative z-40">
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Location Area</label>
                            <SearchableLocationDropdown value={area} onChange={setArea} />
                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                disabled={isPredicting}
                                className="w-full relative group/btn overflow-hidden rounded-xl p-[1px] transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-60 group-hover/btn:opacity-100 blur transition-opacity duration-300"></div>
                                <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl px-6 py-5 flex items-center justify-center gap-3 w-full shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                    {isPredicting ? (
                                        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <Sparkles className="w-6 h-6 text-white" />
                                    )}
                                    <span className="text-white font-bold text-xl tracking-tight">
                                        {isPredicting ? 'Analyzing Model...' : 'Predict Waste'}
                                    </span>
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>

            {/* Right Panel - Results */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative group w-full h-full min-h-[600px] flex flex-col"
            >
                <div className="relative h-full p-8 sm:p-12 rounded-[2rem] bg-[#0f172a]/60 backdrop-blur-2xl border border-white/5 shadow-2xl flex flex-col z-10 overflow-hidden">
                    <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/5">
                        <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                            <Activity className="w-6 h-6" />
                        </div>
                        <h3 className="text-3xl font-extrabold text-white tracking-tight">Prediction Results</h3>
                    </div>

                    <div className="flex-1 flex flex-col relative w-full h-full justify-center min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {!hasPredicted && !isPredicting && (
                                <motion.div
                                    key="default"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center text-center"
                                >
                                    <div className="relative w-32 h-32 mb-8">
                                        <div className="absolute inset-0 bg-cyan-500/5 rounded-full blur-2xl"></div>
                                        <div className="relative w-full h-full rounded-full bg-white/5 border border-white/5 flex items-center justify-center">
                                            <Brain className="w-14 h-14 text-gray-500/80" />
                                        </div>
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-3">Ready to Analyze</h4>
                                    <p className="text-gray-400 text-lg max-w-sm">
                                        Enter festival details and click <span className="text-blue-400 font-semibold">predict</span>.
                                    </p>
                                </motion.div>
                            )}

                            {isPredicting && (
                                <motion.div
                                    key="predicting"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center text-center"
                                >
                                    <div className="relative w-32 h-32 mb-10">
                                        <div className="absolute inset-0 bg-cyan-500/5 rounded-full blur-2xl animate-pulse"></div>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                            className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Activity className="w-10 h-10 text-cyan-400 animate-pulse" />
                                        </div>
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-2">Processing Matrix</h4>
                                    <p className="text-blue-400/80 text-lg font-medium animate-pulse">Running advanced predictive models...</p>
                                </motion.div>
                            )}

                            {hasPredicted && !isPredicting && (
                                <motion.div
                                    key="results"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute inset-0 flex flex-col w-full"
                                >
                                    <div className="py-10 flex flex-col gap-8 w-full">
                                        <div className="flex flex-col items-start border-b border-white/5 pb-8">
                                            <p className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-[0.1em]">Total Forecast</p>
                                            <div className="flex items-baseline gap-3">
                                                <span className="text-6xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter">
                                                    {(predictedTotal / 1000).toFixed(2)}
                                                </span>
                                                <span className="text-2xl font-bold text-cyan-400/80">tons</span>
                                            </div>
                                        </div>

                                        {/* THE 6 UPDATED SECTIONS REPLACING THE OLD 3 BOXES */}
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                                            {[
                                                { label: 'Organic', value: (predictedTotal * 0.55 / 1000), color: 'text-emerald-400' },
                                                { label: 'Plastic', value: (predictedTotal * 0.15 / 1000), color: 'text-amber-400' },
                                                { label: 'Metal', value: (predictedTotal * 0.05 / 1000), color: 'text-slate-400' },
                                                { label: 'Compost', value: (predictedTotal * 0.10 / 1000), color: 'text-lime-400' },
                                                { label: 'Biogas', value: (predictedTotal * 0.08 / 1000), color: 'text-cyan-400' },
                                                { label: 'Recyclable', value: (predictedTotal * 0.07 / 1000), color: 'text-blue-400' }
                                            ].map((m, idx) => (
                                                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{m.label}</span>
                                                    <span className={`text-xl font-black ${m.color}`}>{m.value.toFixed(2)}<span className="text-[10px] ml-1 text-white opacity-40">t</span></span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <AnimatePresence>
                        {hasPredicted && !isPredicting && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="w-full mt-4"
                            >
                                <SmartActionPlan predictedTotal={predictedTotal} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    </motion.div>
);
}
