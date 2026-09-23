import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    error,
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && (
                <label 
                    className='inline-block mb-1.5 pl-0.5 text-sm font-medium text-slate-700' 
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`px-3.5 py-2.5 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-150 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 w-full text-sm shadow-xs ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
            {error && (
                <p className="mt-1 text-xs text-rose-500 pl-0.5">{error}</p>
            )}
        </div>
    );
});

export default Input;