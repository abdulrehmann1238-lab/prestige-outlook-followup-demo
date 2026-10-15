import React from 'react';
import { clsx } from 'clsx';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
}) => {
  return (
    <label className={clsx('flex items-start gap-3 cursor-pointer select-none', disabled && 'opacity-60 cursor-not-allowed')}>
      <div className="relative inline-flex items-center mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={clsx(
            'w-10 h-6 rounded-full transition-colors duration-160 ease-in-out border',
            checked
              ? 'bg-[#2F4A3F] border-[#263D34]'
              : 'bg-[#EFE9DD] border-[#CFC5B2]'
          )}
        >
          <div
            className={clsx(
              'w-4 h-4 rounded-full bg-[#FFFFFF] shadow-sm transform transition-transform duration-160 ease-in-out mt-[3px] ml-[3px]',
              checked && 'translate-x-4'
            )}
          />
        </div>
      </div>
      {(label || description) && (
        <div className="text-[13.5px]">
          {label && <div className="font-medium text-[#2A211B] leading-tight">{label}</div>}
          {description && <div className="text-[12.5px] text-[#5E5249] mt-0.5">{description}</div>}
        </div>
      )}
    </label>
  );
};
