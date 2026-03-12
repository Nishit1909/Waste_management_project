import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export function CompareSection() {

    // ✅ state to store backend data
    const [comparisonData, setComparisonData] = useState([]);

    // ✅ fetch yearly dashboard data from FastAPI
    useEffect(() => {
        fetch("http://localhost:8000/dashboard/yearly")
            .then((res) => res.json())
            .then((data) => {
                // convert backend data → chart format
                const formatted = data.map(item => ({
                    year: item.year,
                    total: item.total,
                    recyclingRate:
                        item.total > 0
                            ? ((item.compost + item.biogas) / item.total * 100).toFixed(1)
                            : 0
                }));

                setComparisonData(formatted);
            })
            .catch((err) => console.error("Dashboard fetch error:", err));
    }, []);

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mb-10"
        >
            <Card>
                <CardHeader>
                    <CardTitle>Year over Year Comparison</CardTitle>
                    <p className="text-sm text-gray-400">
                        Track our progress towards a zero-waste festival
                    </p>
                </CardHeader>

                <CardContent className="mt-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-[400px] w-full mt-6 bg-[#1e293b]/80 backdrop-blur-sm rounded-xl border border-gray-700 shadow-[0_0_25px_rgba(59,130,246,0.15)] p-4"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={comparisonData}
                                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke="rgba(255,255,255,0.05)"
                                />

                                <XAxis
                                    dataKey="year"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9ca3af', fontWeight: 600 }}
                                    dy={10}
                                />

                                <YAxis
                                    yAxisId="left"
                                    orientation="left"
                                    stroke="#9ca3af"
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <YAxis
                                    yAxisId="right"
                                    orientation="right"
                                    stroke="#3b82f6"
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <Tooltip
                                    cursor={{ fill: '#1e293b' }}
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: '1px solid #374151',
                                        backgroundColor: '#111827',
                                        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)'
                                    }}
                                    labelStyle={{
                                        fontWeight: 'bold',
                                        color: '#f3f4f6'
                                    }}
                                />

                                <Legend wrapperStyle={{ paddingTop: '20px' }} />

                                <Bar
                                    yAxisId="left"
                                    dataKey="total"
                                    name="Total Waste (tons)"
                                    fill="url(#colorTotal)"
                                    radius={[6, 6, 0, 0]}
                                    maxBarSize={60}
                                />

                                <Bar
                                    yAxisId="right"
                                    dataKey="recyclingRate"
                                    name="Recycling Rate (%)"
                                    fill="url(#colorRecycling)"
                                    radius={[6, 6, 0, 0]}
                                    maxBarSize={60}
                                />

                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#818cf8" stopOpacity={1} />
                                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.8} />
                                    </linearGradient>

                                    <linearGradient id="colorRecycling" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#60a5fa" stopOpacity={1} />
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.8} />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.section>
    );
}