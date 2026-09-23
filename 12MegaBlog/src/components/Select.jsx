import React, { useId } from "react";

const Select = React.forwardRef(function Select({
    options = [],
    label,
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && (
                <label htmlFor={id} className="inline-block mb-1.5 pl-0.5 text-sm font-medium text-slate-700">
                    {label}
                </label>
            )}
            <select 
                {...props}
                id={id}
                ref={ref}
                className={`px-3.5 py-2.5 rounded-xl bg-white text-slate-900 outline-none transition-all duration-150 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 w-full text-sm shadow-xs capitalize cursor-pointer ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option} className="capitalize">
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default Select;
