import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ChevronDown, Search } from 'lucide-react';

const LOCATIONS = [
    'Agrahara', 'Alanahalli', 'Aravindanagar', 'Ashokapuram', 'Bannimantap',
    'Bannur Road', 'Belavadi', 'Bogadi', 'Bogadi 2nd Stage', 'Chamarajapuram',
    'Chamundi Hill', 'Chamundipuram', 'Dattagalli', 'Gandhinagar', 'Gayathripuram',
    'Ghousianagar', 'Gokulam', 'Hanchya', 'Hebbal', 'Hebbal 2nd Stage',
    'Hinkal', 'Hootagalli', 'J P Nagar', 'Jayalakshmipuram', 'Jayanagar',
    'K R Mohalla', 'Kadakola', 'Kalyanagiri', 'Kesare', 'Krishnamurthypuram',
    'Kurubarahalli', 'Kuvempunagar', 'Lakshmipuram', 'Lashkar Mohalla', 'Mahadeshwaranagar',
    'Manchegowdanakoppal', 'Mandi 2nd Stage', 'Mandi Extension', 'Mandi Mohalla', 'Meena Bazar',
    'Metagalli', 'N R Mohalla', 'Nazarbad', 'Raghavendranagar', 'Rajendranagar',
    'Ramakrishnanagar', 'Roopanagar', 'Saraswathipuram', 'Sathagalli', 'Sathyamangala',
    'Shakthinagar', 'Sharadadevinagar', 'Shivarampet', 'Siddarthanagar', 'Srirampura',
    'Srirampura 2nd Stage', 'Srirampura 3rd Stage', 'Tilaknagar', 'Udayagiri', 'V V Mohalla',
    'Vidyaranyapuram', 'Vijayanagar', 'Vijayanagar 2nd Stage', 'Yadavagiri', 'Yelwal'
].sort(); // Sorted alphabetically

export function SearchableLocationDropdown({ selectedLocation, value, onChange, options = LOCATIONS }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);

    const currentValue = selectedLocation !== undefined ? selectedLocation : value;

    // Filter locations based on search
    const filteredLocations = useMemo(() => {
        return options.filter(loc =>
            loc.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, options]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Focus search input on open
    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            // small delay to ensure animation completed and element is focusable
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 50);
        } else {
            setSearchTerm(''); // Reset search on close
        }
    }, [isOpen]);

    // Handle keyboard navigation on the main button
    const handleButtonKeyDown = (e) => {
        if (!isOpen) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                setIsOpen(true);
            }
        }
    };

    // Handle keyboard navigation within the dropdown
    const handleMenuKeyDown = (e) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
            dropdownRef.current?.querySelector('button')?.focus();
            return;
        }

        // Add proper arrow key navigation if needed (optional complex implementation)
        // For now, let standard focus outline and scrolling handle it, or we can just trap focus in the input.
        // We will make the input handle ArrowDown to jump to the list if needed, but keeping it simple first.
        if (e.key === 'Enter') {
            if (filteredLocations.length > 0) {
                // Select the first one if pressing enter while typing
                // (Or could track a highlighted index, but this is a simpler starting point)
                if (document.activeElement === searchInputRef.current) {
                    e.preventDefault();
                    onChange(filteredLocations[0]);
                    setIsOpen(false);
                    dropdownRef.current?.querySelector('button')?.focus();
                }
            }
        }
    };

    const handleSelect = (loc) => {
        onChange(loc);
        setIsOpen(false);
        dropdownRef.current?.querySelector('button')?.focus();
    };

    return (
        <div className="relative w-full z-50" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleButtonKeyDown}
                className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-left text-white flex justify-between items-center transition-all outline-none focus:ring-2 focus:ring-blue-500 min-h-[52px] ${isOpen ? 'ring-2 ring-blue-500/50 border-blue-500/50' : 'hover:border-white/20'
                    }`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className={currentValue ? 'text-white font-medium' : 'text-gray-500'}>
                    {currentValue || 'Select location area...'}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute z-[100] w-full mt-2 bg-[#0f172a] border border-white/10 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-lg overflow-hidden flex flex-col"
                        role="dialog"
                        onKeyDown={handleMenuKeyDown}
                    >
                        {/* Search Input Sticky Top */}
                        <div className="p-3 border-b border-white/5 bg-[#0f172a]/90 backdrop-blur-sm relative z-10 sticky top-0">
                            <div className="relative relative flex items-center">
                                <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search location..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all font-medium"
                                    onClick={(e) => e.stopPropagation()} // Prevent toggling dropdown
                                />
                            </div>
                        </div>

                        {/* List items */}
                        <div className="max-h-64 overflow-y-auto py-2 custom-scrollbar" role="listbox">
                            {filteredLocations.length > 0 ? (
                                filteredLocations.map((loc) => (
                                    <div
                                        key={loc}
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => handleSelect(loc)}
                                        role="option"
                                        aria-selected={currentValue === loc}
                                        className={`px-4 py-3 cursor-pointer flex items-center justify-between transition-colors duration-200 rounded-lg mx-2 my-0.5 ${currentValue === loc
                                            ? 'bg-blue-500/20 text-blue-400 shadow-[inset_0_0_10px_rgba(59,130,246,0.2)]'
                                            : 'text-gray-300 hover:bg-blue-500/20 hover:text-white'
                                            }`}
                                    >
                                        <span className={`font-medium ${currentValue === loc ? 'text-blue-400' : ''}`}>
                                            {loc}
                                        </span>
                                        {currentValue === loc && (
                                            <CheckCircle className="w-4 h-4 text-blue-400" />
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-8 text-center text-gray-500 flex flex-col items-center">
                                    <Search className="w-6 h-6 mb-2 opacity-20" />
                                    <p className="text-sm">No locations found</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}