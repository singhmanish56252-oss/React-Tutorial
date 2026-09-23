import React from 'react';

function Button({
    children,
    type = 'button',
    bgColor = 'bg-indigo-600 hover:bg-indigo-700',
    textColor = 'text-white',
    className = '',
    ...props 
}) {
    return (
        <button 
            type={type} 
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-150 active:scale-[0.99] cursor-pointer ${bgColor} ${textColor} ${className}`} 
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
