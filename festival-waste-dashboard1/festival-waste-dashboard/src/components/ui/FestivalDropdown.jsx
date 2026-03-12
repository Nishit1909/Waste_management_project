import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ChevronDown } from 'lucide-react';

export function FestivalDropdown({ selectedFestival, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const listboxRef = useRef(null);

    // Support both selectedFestival and value props for reusability
    const currentValue = selectedFestival !== undefined ? selectedFestival : value;

    const festivals = [
        'Ganesh Chaturthi', 'Diwali', 'Dasara',
        'Ugadi', 'Ramzan Eid', 'Christmas', 'Makara Sankranti'
    ];

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

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (!isOpen) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                setIsOpen(true);
            }
            return;
        }

        switch (e.key) {
            case 'Escape':
                setIsOpen(false);
                break;
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = currentValue ? (festivals.indexOf(currentValue) + 1) % festivals.length : 0;
                if (onChange) onChange(festivals[nextIndex]);
                break;
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = currentValue ? (festivals.indexOf(currentValue) - 1 + festivals.length) % festivals.length : festivals.length - 1;
                if (onChange) onChange(festivals[prevIndex]);
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                setIsOpen(false);
                break;
            default:
                break;
        }
    };

    const handleSelect = (fest) => {
        if (onChange) onChange(fest);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full z-50" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-left text-white flex justify-between items-center transition-all outline-none focus:ring-2 focus:ring-blue-500 min-h-[52px] ${isOpen ? 'ring-2 ring-blue-500/50 border-blue-500/50' : 'hover:border-white/20'
                    }`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className={currentValue ? 'text-white font-medium' : 'text-gray-500'}>
                    {currentValue || 'Select a festival...'}
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
                        className="absolute z-[100] w-full mt-2 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl backdrop-blur-lg overflow-hidden py-2"
                        role="listbox"
                        ref={listboxRef}
                    >
                        {festivals.map((fest) => (
                            <div
                                key={fest}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handleSelect(fest)}
                                role="option"
                                aria-selected={currentValue === fest}
                                className={`px-4 py-3 cursor-pointer flex items-center justify-between transition-colors duration-200 ${currentValue === fest
                                    ? 'bg-blue-500/20 text-white'
                                    : 'text-gray-300 hover:bg-blue-500/20 hover:text-white'
                                    }`}
                            >
                                <span className={`font-medium ${currentValue === fest ? 'text-blue-400' : ''}`}>
                                    {fest}
                                </span>
                                {currentValue === fest && (
                                    <CheckCircle className="w-5 h-5 text-blue-400" />
                                )}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}