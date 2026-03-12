import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Mail, Phone, Camera, Trash2, UploadCloud, AlertTriangle, Clock, CheckCircle, Users, Shield } from 'lucide-react';

export function CommunityPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reportStatus, setReportStatus] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        date: '2026-02-28',
        email: '',
        phone: '',
        location: '',
        cleanlinessLevel: 50,
        description: ''
    });

    // Table Data State
    const [reports, setReports] = useState([
        { id: '#RPT-1009', area: 'Bogadi', wasteType: 'Plastic', severity: 'High', status: 'PENDING', vendor: 'Assigning...', submitted: '10h ago' },
        { id: '#RPT-1008', area: 'Alanahalli', wasteType: 'Organic', severity: 'Medium', status: 'PENDING', vendor: 'Assigning...', submitted: '9h ago' },
        { id: '#RPT-1007', area: 'Agrahara', wasteType: 'General', severity: 'Medium', status: 'PENDING', vendor: 'Assigning...', submitted: '8h ago' },
        { id: '#RPT-1006', area: 'Saraswathipuram', wasteType: 'Metal', severity: 'High', status: 'PENDING', vendor: 'Assigning...', submitted: '7h ago' },
    ]);

    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const mysoreAreas = ['Agrahara', 'Alanahalli', 'Bogadi', 'Gokulam', 'Hebbal', 'Kuvempunagar', 'Saraswathipuram'].sort();

    const getCleanlinessStatus = (val) => {
        if (val <= 30) return { text: 'Critical', color: 'text-rose-400', icon: '🔴' };
        if (val <= 65) return { text: 'Moderate', color: 'text-amber-400', icon: '🟡' };
        return { text: 'Minor', color: 'text-emerald-400', icon: '🟢' };
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setSelectedImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleReportSubmit = (e) => {
        e.preventDefault();

        // Create new report object from form data
        const newEntry = {
            id: `#RPT-${1010 + reports.length}`,
            area: formData.location || "General Area",
            wasteType: "Reported",
            severity: formData.cleanlinessLevel <= 30 ? "High" : "Medium",
            status: "PENDING",
            vendor: "Assigning...",
            submitted: "Just now"
        };

        // Add to the top of the table
        setReports([newEntry, ...reports]);
        
        setReportStatus('success');
        setTimeout(() => {
            setIsModalOpen(false);
            setReportStatus(null);
            setSelectedImage(null);
            setFormData({ name: '', date: '2026-02-28', email: '', phone: '', location: '', cleanlinessLevel: 50, description: '' });
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#0b0f1a] text-white p-8 font-sans">
            {/* HERO SECTION */}
            <div className="max-w-6xl mx-auto mb-16 text-center py-20 bg-[#161b2a]/40 border border-white/5 rounded-[2.5rem] backdrop-blur-sm shadow-2xl">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400">
                        <Users className="w-10 h-10" />
                    </div>
                </div>
                <h1 className="text-5xl font-bold mb-4 tracking-tight">Community Cleanliness Network</h1>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto italic">"Help us maintain a spotless festival environment. Report issues and earn rewards."</p>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold flex items-center gap-2 mx-auto hover:bg-gray-200 transition-all active:scale-95 shadow-lg"
                >
                    <AlertTriangle className="w-5 h-5" /> Report Waste Issue
                </button>
            </div>

            {/* LIVE TRACKER TABLE */}
            <div className="max-w-6xl mx-auto mb-10">
                <div className="flex items-center gap-2 mb-6">
                    <Clock className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-xl font-bold">Live Reports Tracker</h2>
                </div>
                <div className="bg-[#161b2a]/60 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-[10px] uppercase tracking-widest font-bold text-gray-500 border-b border-white/10">
                            <tr>
                                <th className="p-4 pl-6">Report ID</th>
                                <th className="p-4">Area</th>
                                <th className="p-4">Severity</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Vendor</th>
                                <th className="p-4 pr-6">Submitted</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {reports.map((report) => (
                                <tr key={report.id} className="text-sm hover:bg-white/5 transition-colors">
                                    <td className="p-4 pl-6 font-mono text-xs text-gray-500">{report.id}</td>
                                    <td className="p-4 font-bold">{report.area}</td>
                                    <td className={`p-4 font-bold ${report.severity === 'High' ? 'text-rose-400' : 'text-amber-400'}`}>{report.severity}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded-md text-[10px] font-bold border bg-white/5 border-white/10 text-gray-400 uppercase">
                                            {report.status}
                                        </span>
                                    </td>
                                    <td className="p-4 italic text-gray-400 text-xs">{report.vendor}</td>
                                    <td className="p-4 pr-6 text-gray-500 text-xs">{report.submitted}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0b0f1a]/95 backdrop-blur-md overflow-y-auto">
                        <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-[#161b2a] border border-white/10 rounded-[2rem] w-full max-w-2xl p-8 relative my-8">
                            <button onClick={() => setIsModalOpen(false)} className="absolute right-6 top-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 transition-colors">
                                <X className="w-5 h-5" />
                            </button>

                            {reportStatus === 'success' ? (
                                <div className="py-20 text-center">
                                    <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                                    <h2 className="text-2xl font-bold">Report Submitted Successfully</h2>
                                    <p className="text-gray-400 mt-2">The live tracker has been updated.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleReportSubmit} className="space-y-5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400"><AlertTriangle className="w-6 h-6" /></div>
                                        <h2 className="text-2xl font-bold tracking-tight">Report Issue</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Name *</label>
                                            <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Your Name" className="w-full bg-[#0b0f1a] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500/50 transition-all" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Date *</label>
                                            <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full bg-[#0b0f1a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none [color-scheme:dark]" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Email *</label>
                                            <div className="relative">
                                                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="email@example.com" className="w-full bg-[#0b0f1a] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500/50" />
                                                <Mail className="absolute right-4 top-3.5 w-4 h-4 text-gray-600" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Phone *</label>
                                            <div className="relative">
                                                <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+91 8095176176" className="w-full bg-[#0b0f1a] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500/50" />
                                                <Phone className="absolute right-4 top-3.5 w-4 h-4 text-gray-600" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Location *</label>
                                        <select required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full bg-[#0b0f1a] border border-white/10 rounded-xl px-4 py-3 text-gray-300 outline-none focus:border-indigo-500/50 appearance-none">
                                            <option value="">Select Area</option>
                                            {mysoreAreas.map(a => <option key={a} value={a}>{a}</option>)}
                                        </select>
                                    </div>

                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <div className="flex justify-between items-center mb-4">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">Cleanliness Level</label>
                                            <span className={`text-sm font-bold flex items-center gap-1.5 ${getCleanlinessStatus(formData.cleanlinessLevel).color}`}>
                                                {getCleanlinessStatus(formData.cleanlinessLevel).text} 
                                                <span>{getCleanlinessStatus(formData.cleanlinessLevel).icon}</span>
                                            </span>
                                        </div>
                                        <input type="range" className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" value={formData.cleanlinessLevel} onChange={(e) => setFormData({...formData, cleanlinessLevel: parseInt(e.target.value)})} />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Evidence Photo</label>
                                        <div onClick={() => fileInputRef.current.click()} className="h-32 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center bg-[#0b0f1a] hover:border-indigo-500/50 cursor-pointer transition-all relative overflow-hidden">
                                            {selectedImage ? (
                                                <img src={selectedImage} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-center text-gray-500">
                                                    <UploadCloud className="w-6 h-6 mx-auto mb-2" />
                                                    <p className="text-xs">Upload Photo (Max 5MB)</p>
                                                </div>
                                            )}
                                        </div>
                                        <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageUpload} />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Description *</label>
                                        <textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-[#0b0f1a] border border-white/10 rounded-xl px-4 py-3 h-24 outline-none focus:border-indigo-500/50 resize-none" placeholder="Provide details..." />
                                    </div>

                                    <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20">
                                        Submit Report
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}