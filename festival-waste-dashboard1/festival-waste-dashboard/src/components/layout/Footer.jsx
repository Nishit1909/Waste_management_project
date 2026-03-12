import React from 'react';
import { Heart } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-[#111827] border-t border-gray-700 py-8 mt-auto">
            <div className="dashboard-container flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center text-xs font-bold shadow-lg shadow-blue-500/20">
                        FW
                    </div>
                    <span className="font-semibold text-gray-100">Festival Waste Intelligence System</span>
                </div>

                <p className="text-gray-400 text-sm flex items-center gap-1">
                    Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for a greener future
                </p>

                <div className="flex gap-4 text-sm font-medium text-gray-400">
                    <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms</a>
                    <a href="#" className="hover:text-primary transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
}
