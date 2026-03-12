import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { mockData } from '../../data/mockData';

export function TrendSection() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Waste Generation Trends</CardTitle>
                    <p className="text-sm text-gray-400">Daily breakdown by waste category</p>
                </CardHeader>
                <CardContent>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-[380px] w-full mt-6 bg-[#1e293b]/80 backdrop-blur-sm rounded-xl border border-gray-700 shadow-[0_0_25px_rgba(59,130,246,0.15)] p-4"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockData.wasteTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorRecyclable" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorResidual" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#64748b" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#64748b" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: '1px solid #374151', backgroundColor: '#111827', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)' }}
                                    labelStyle={{ fontWeight: 'bold', color: '#f3f4f6' }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                                <Area type="monotone" dataKey="organic" stroke="#22c55e" strokeWidth={4} fillOpacity={1} fill="url(#colorOrganic)" name="Organic Waste" animationDuration={2000} animationEasing="ease-out" style={{ filter: 'drop-shadow(0px 0px 8px rgba(34,197,94,0.6))' }} />
                                <Area type="monotone" dataKey="recyclable" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorRecyclable)" name="Recyclables" animationDuration={2000} animationEasing="ease-out" style={{ filter: 'drop-shadow(0px 0px 8px rgba(59,130,246,0.6))' }} />
                                <Area type="monotone" dataKey="residual" stroke="#64748b" strokeWidth={4} fillOpacity={1} fill="url(#colorResidual)" name="Residual Waste" animationDuration={2000} animationEasing="ease-out" style={{ filter: 'drop-shadow(0px 0px 8px rgba(100,116,139,0.6))' }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </motion.div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Zone Status</CardTitle>
                    <p className="text-sm text-gray-400">Live bin fill levels</p>
                </CardHeader>
                <CardContent className="mt-4 flex flex-col gap-6">
                    {mockData.zones.map((zone, i) => (
                        <div key={i} className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-100">{zone.name}</span>
                                <span className={`font-bold ${zone.fillLevel > 80 ? 'text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]' :
                                    zone.fillLevel > 60 ? 'text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]' : 'text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]'
                                    }`}>
                                    {zone.fillLevel}%
                                </span>
                            </div>
                            <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden shadow-inner">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${zone.fillLevel}%` }}
                                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                    className={`h-full rounded-full ${zone.fillLevel > 80 ? 'bg-red-500' :
                                        zone.fillLevel > 60 ? 'bg-amber-500' : 'bg-emerald-500'
                                        }`}
                                />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </motion.section>
    );
}
