import React, { useState, useRef, useEffect } from 'react';
import { AppStep } from '../types';

interface VoterHeaderProps {
    voterId: string;
    onLogout: () => void;
    onNavigate: (step: AppStep) => void;
}

const VoterHeader: React.FC<VoterHeaderProps> = ({ voterId, onLogout, onNavigate }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNavigation = (step: AppStep) => {
        onNavigate(step);
        setDropdownOpen(false);
    }

    return (
        <header className="w-full max-w-4xl mx-auto mb-8 px-4">
            <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-4 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-white">Welcome, Voter</h2>
                    <p className="text-slate-400 text-sm">{voterId}</p>
                </div>
                <div className="relative" ref={dropdownRef}>
                    <button onClick={() => setDropdownOpen(!dropdownOpen)} className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-slate-700 rounded-md shadow-lg z-20 border border-slate-600 animate-fade-in-down">
                            <button onClick={() => handleNavigation(AppStep.SELECT_ELECTION)} className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-600">Select Elections</button>
                            <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-600">Logout</button>
                        </div>
                    )}
                </div>
            </div>
             <style>{`
                @keyframes fade-in-down {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.2s ease-out forwards;
                }
            `}</style>
        </header>
    );
};

export default VoterHeader;
