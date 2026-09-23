import React from 'react';

function Logo({ width = "auto", className = "" }) {
    return (
        <div 
            className={`flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`} 
            style={{ width }}
        >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-md shadow-indigo-500/25 text-white shrink-0 transition-transform duration-200 hover:scale-105">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Mega<span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Blog</span>
            </span>
        </div>
    );
}

export default Logo;