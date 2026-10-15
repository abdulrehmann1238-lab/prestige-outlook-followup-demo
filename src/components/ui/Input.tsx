import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { AlertCircle, Check } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  success?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, success, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1">
        {label && (
          <label htmlFor={inputId} className="block text-[13px] font-medium text-[#2A211B]">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            className={clsx(
              'w-full bg-[#FFFFFF] border rounded-[8px] px-3 py-2 text-[14px] text-[#2A211B] placeholder-[#766A5E]/60 transition-colors duration-120 outline-none',
              'focus:border-[#2F4A3F] focus:ring-2 focus:ring-[#B08D57]/40',
              error
                ? 'border-[#A63D2F] text-[#A63D2F]'
                : 'border-[#CFC5B2] hover:border-[#2A211B]',
              className
            )}
            {...props}
          />
          {error && (
            <div className="absolute right-3 top-2.5 text-[#A63D2F] pointer-events-none">
              <AlertCircle className="w-4 h-4" />
            </div>
          )}
          {!error && success && (
            <div className="absolute right-3 top-2.5 text-[#3F7D58] pointer-events-none">
              <Check className="w-4 h-4" />
            </div>
          )}
        </div>
        {error && <p className="text-[12px] text-[#A63D2F]">{error}</p>}
        {!error && helperText && <p className="text-[12px] text-[#766A5E]">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
