import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { MessageSquare, MapPin, Camera, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

export function CommunityInputSection() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = (data) => {
        console.log("Report submitted:", data);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            reset();
        }, 3000);
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-10"
        >
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-8 bg-[#1e293b] flex flex-col justify-center border-r border-gray-700">
                        <div className="w-12 h-12 bg-blue-500/10 text-blue-400 shadow-lg shadow-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-100 mb-2">See an overflowing bin?</h3>
                        <p className="text-gray-400 mb-6 max-w-sm">Help us keep the festival clean. Report areas that need immediate attention from our volunteer team.</p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-100">
                                <MapPin className="w-5 h-5 text-emerald-400" /> Include exact location
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-100">
                                <Camera className="w-5 h-5 text-emerald-400" /> Add an optional photo
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <CardHeader className="px-0 pt-0">
                            <CardTitle>Submit Report</CardTitle>
                        </CardHeader>
                        <CardContent className="px-0 pb-0 relative min-h-[250px]">
                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center text-center"
                                    >
                                        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-100 mb-1">Report Received</h4>
                                        <p className="text-gray-400">Thank you! A team has been dispatched.</p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="space-y-4"
                                    >
                                        <div>
                                            <label className="block text-sm font-medium text-gray-100 mb-1">Zone / Area</label>
                                            <select
                                                {...register("zone", { required: true })}
                                                className="w-full px-4 py-2 bg-[#111827] text-gray-100 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            >
                                                <option value="">Select an area...</option>
                                                <option value="main">Main Stage</option>
                                                <option value="food">Food Court</option>
                                                <option value="camping">Camping Zones</option>
                                                <option value="other">Other</option>
                                            </select>
                                            {errors.zone && <span className="text-xs text-red-500 mt-1">Please select an area</span>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-100 mb-1">Description (Optional)</label>
                                            <textarea
                                                {...register("description")}
                                                rows="3"
                                                className="w-full px-4 py-2 bg-[#111827] text-gray-100 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                                placeholder="E.g., Blue bins near the east exit are overflowing..."
                                            />
                                        </div>

                                        <Button type="submit" className="w-full h-11">
                                            Send to Team
                                        </Button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </CardContent>
                    </div>
                </div>
            </Card>
        </motion.section>
    );
}
