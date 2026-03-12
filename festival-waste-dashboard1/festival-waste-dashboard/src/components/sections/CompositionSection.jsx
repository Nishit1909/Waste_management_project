import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from 'recharts';
import { PieChart as PieChartIcon, Info } from 'lucide-react';

import { FestivalDropdown } from '../ui/FestivalDropdown';
import { SearchableLocationDropdown } from '../ui/SearchableLocationDropdown';

const defaultData = [
    { name: 'Organic', value: 29769.32, color: '#10b981' },
    { name: 'Plastic', value: 7442.30, color: '#f59e0b' },
    { name: 'Metallic', value: 1488.44, color: '#94a3b8' }
];

const initialSupplementary = {
    compost: 17861.60,
    biogas: 11907.71
};

const formatTons = (value) => value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CustomTooltip = ({ active, payload, totalWaste }) => {
    if (active && payload && payload.length) {
        const data = payload[0];
        const percent = ((data.value / totalWaste) * 100).toFixed(1);
        return (
            <div className="bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.payload.color }} />
                    <p className="text-white font-bold text-sm">{data.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase font-semibold">Amount</span>
                        <span className="text-base font-bold text-white">{formatTons(data.value)} t</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase font-semibold">Share</span>
                        <span className="text-base font-bold text-white">{percent}%</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
        <g>
            <Sector
                cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 8}
                startAngle={startAngle} endAngle={endAngle} fill={fill}
            />
        </g>
    );
};

export function CompositionSection() {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [selectedFestival, setSelectedFestival] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [filteredData, setFilteredData] = useState(null);
    const [suppData, setSuppData] = useState(initialSupplementary);
    const [isLoading, setIsLoading] = useState(false);

    const hasFilters = selectedFestival || selectedYear || selectedLocation;

    const handleApply = async () => {
        setIsLoading(true);
        try {
            const baseUrl = "http://localhost:8000/waste-summary";
            const params = new URLSearchParams();
            if (selectedFestival) params.append('festival', selectedFestival);
            if (selectedLocation) params.append('ward', selectedLocation);
            if (selectedYear) params.append('year', selectedYear);

            const response = await fetch(`${baseUrl}?${params.toString()}`);
            if (response.ok) {
                const data = await response.json();
                
                // Map API response to Chart Data
                const newData = [
                    { name: 'Organic', value: Number(data.organic || 0), color: '#10b981' },
                    { name: 'Plastic', value: Number(data.plastic || 0), color: '#f59e0b' },
                    { name: 'Metallic', value: Number(data.metal || 0), color: '#94a3b8' }
                ];
                
                setFilteredData(newData);
                
                // Update supplementary if provided, otherwise estimate as 60% and 40% of organic
                setSuppData({
                    compost: data.compost || (Number(data.organic || 0) * 0.6),
                    biogas: data.biogas || (Number(data.organic || 0) * 0.4)
                });
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setSelectedFestival('');
        setSelectedYear('');
        setSelectedLocation('');
        setFilteredData(null);
        setSuppData(initialSupplementary);
    };

    const compositionData = filteredData || defaultData;
    const pieTotalWaste = compositionData.reduce((sum, item) => sum + item.value, 0);
    // Display total includes the pie + supplementary
    const displayTotalWaste = pieTotalWaste + (suppData.compost + suppData.biogas);

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-5xl mx-auto mt-24 mb-24 px-6 relative z-10">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />
            <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#1e293b]/80 to-[#0f172a]/90 border border-white/10 shadow-2xl backdrop-blur-3xl">
                
                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-16">
                    <div className="p-3 mb-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                        <PieChartIcon className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-black text-white text-center">Waste Composition Breakdown</h3>
                    <div className="mt-3 text-gray-400 bg-white/5 px-4 py-1.5 rounded-full border border-white/5 text-sm">
                        {hasFilters ? `Showing data for ${selectedFestival} ${selectedYear}` : 'Showing 5-Year Cumulative Data'}
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 items-end justify-between p-4 mb-16 bg-white/5 border border-white/10 rounded-2xl z-30 relative">
                    <div className="w-full md:flex-1">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 ml-1">Festival</label>
                        <FestivalDropdown selectedFestival={selectedFestival} onChange={setSelectedFestival} />
                    </div>
                    <div className="w-full md:flex-1">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 ml-1">Year</label>
                        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full h-[52px] px-4 bg-[#0f172a] border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500">
                            <option value="">All Years</option>
                            {[2024, 2023, 2022, 2021, 2020].map(yr => <option key={yr} value={yr}>{yr}</option>)}
                        </select>
                    </div>
                    <div className="w-full md:flex-1">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 ml-1">Location</label>
                        <SearchableLocationDropdown selectedLocation={selectedLocation} onChange={setSelectedLocation} />
                    </div>
                    <div className="flex gap-3 mt-4 md:mt-0">
                        <button onClick={handleApply} disabled={isLoading} className="h-[52px] px-8 font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl transition-all disabled:opacity-50">
                            {isLoading ? '...' : 'Apply'}
                        </button>
                        {hasFilters && <button onClick={handleReset} className="h-[52px] px-4 font-bold text-gray-400 bg-white/5 rounded-xl border border-white/10">Reset</button>}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Chart */}
                    <div className="h-[380px] w-full relative">
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <div className="flex flex-col items-center bg-[#0f172a]/40 w-40 h-40 rounded-full justify-center border border-white/5">
                                <span className="text-gray-400 text-xs font-bold uppercase">Total</span>
                                <span className="text-2xl font-black text-white">{formatTons(displayTotalWaste)}</span>
                                <span className="text-xs text-cyan-400 font-bold uppercase">tons</span>
                            </div>
                        </div>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie 
                                    data={compositionData} innerRadius={90} outerRadius={150} paddingAngle={3} dataKey="value"
                                    activeIndex={activeIndex} activeShape={renderActiveShape} onMouseEnter={(_, i) => setActiveIndex(i)} onMouseLeave={() => setActiveIndex(-1)}
                                >
                                    {compositionData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                                </Pie>
                                <Tooltip content={<CustomTooltip totalWaste={pieTotalWaste} />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Legend */}
                    <div className="bg-[#0f172a]/50 p-6 rounded-3xl border border-white/5">
                        <ul className="flex flex-col gap-3">
                            {compositionData.map((entry, index) => (
                                <li key={index} className={`flex items-center gap-4 p-3 rounded-xl transition-all ${activeIndex === index ? 'bg-white/10' : ''}`}>
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                                    <span className="text-sm font-semibold text-gray-300">{entry.name}</span>
                                    <div className="ml-auto flex gap-4">
                                        <span className="text-white font-bold">{formatTons(entry.value)} t</span>
                                        <span className="text-gray-500 text-xs w-10 text-right">{((entry.value/pieTotalWaste)*100).toFixed(1)}%</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 pt-6 border-t border-white/5 flex flex-col gap-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-emerald-400">Compost Produced</span>
                                <span className="text-white font-bold">{formatTons(suppData.compost)} t</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-cyan-400">Biogas Produced</span>
                                <span className="text-white font-bold">{formatTons(suppData.biogas)} t</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}