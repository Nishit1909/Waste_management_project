import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { TrendingUp, Sparkles, Loader2 } from 'lucide-react';

export function PredictionSection() {
    const [chartData, setChartData] = useState([]);
    const [predictionMetrics, setPredictionMetrics] = useState(null); // New state for specific tonnages
    const [explanation, setExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchPrediction = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:8000/predict-with-explanation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ward_name: "Agrahara",
                    festival: "Dussera",
                    year: 2026,
                    population: 55000,
                    festival_duration_days: 7
                })
            });

            if (!response.ok) throw new Error("Prediction failed");

            const data = await response.json();

            // 1. Set the metrics for the top cards
            setPredictionMetrics({
                organic: data.organic_tons,
                plastic: data.plastic_tons,
                metal: data.metal_tons,
                compost: data.compost_tons,
                biogas: data.biogas_tons,
                recyclable: data.recyclable_metal_tons
            });

            // 2. Format chart data
            const formatted = [
                { name: 'Organic', predicted: data.organic_tons },
                { name: 'Plastic', predicted: data.plastic_tons },
                { name: 'Metal', predicted: data.metal_tons },
            ];

            setChartData(formatted);
            setExplanation(data.explanation);
        } catch (error) {
            console.error("Prediction error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPrediction();
    }, []);

  return (
    <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-10"
    >
        {/* THE 6 VALUES REPLACING THE OLD 3 SECTIONS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {[
                { label: 'Organic', value: predictionMetrics?.organic, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                { label: 'Plastic', value: predictionMetrics?.plastic, color: 'text-amber-400', bg: 'bg-amber-500/10' },
                { label: 'Metal', value: predictionMetrics?.metal, color: 'text-slate-400', bg: 'bg-slate-500/10' },
                { label: 'Compost', value: predictionMetrics?.compost, color: 'text-lime-400', bg: 'bg-lime-500/10' },
                { label: 'Biogas', value: predictionMetrics?.biogas, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                { label: 'Recyclable', value: predictionMetrics?.recyclable, color: 'text-blue-400', bg: 'bg-blue-500/10' }
            ].map((metric, idx) => (
                <div key={idx} className={`${metric.bg} border border-white/10 rounded-2xl p-4 backdrop-blur-md`}>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{metric.label}</p>
                    <p className={`text-xl font-black ${metric.color}`}>
                        {isLoading ? "..." : metric.value?.toFixed(2)}
                        <span className="text-[10px] ml-1 opacity-60 font-normal text-white text-[10px]">t</span>
                    </p>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-cyan-400" />
                        ML Composition Forecast
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[340px] w-full mt-6 bg-[#1e293b]/80 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center h-full gap-3">
                                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                                <p className="text-gray-400 animate-pulse text-sm">Consulting AI Model...</p>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #374151', backgroundColor: '#111827' }} />
                                    <Bar dataKey="predicted" name="Predicted (Tons)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* AI Action Plan Card */}
            <Card className="bg-[#1e293b] border-gray-700 overflow-hidden">
                <CardHeader className="border-b border-white/5">
                    <CardTitle className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-500" />
                        Strategic Action Plan
                    </CardTitle>
                </CardHeader>
                <CardContent className="mt-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                    {isLoading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 bg-[#111827] rounded-xl border border-gray-700">
                            <div className="text-sm text-gray-300 whitespace-pre-line leading-relaxed italic">
                                {explanation}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    </motion.section>
);
}