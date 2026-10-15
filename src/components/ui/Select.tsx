import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, children, className, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1">
        {label && (
          <label htmlFor={selectId} className="block text-[13px] font-medium text-[#2A211B]">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={clsx(
              'w-full appearance-none bg-[#FFFFFF] border rounded-[8px] pl-3 pr-9 py-2 text-[14px] text-[#2A211B] transition-colors duration-120 outline-none cursor-pointer',
              'focus:border-[#2F4A3F] focus:ring-2 focus:ring-[#B08D57]/40',
              error ? 'border-[#A63D2F]' : 'border-[#CFC5B2] hover:border-[#2A211B]',
              className
            )}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <div className="absolute right-3 top-2.5 pointer-events-none text-[#766A5E]">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && <p className="text-[12px] text-[#A63D2F]">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
