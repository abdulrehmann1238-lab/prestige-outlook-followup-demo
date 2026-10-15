import React from 'react';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';
import { useCountUp } from '../../hooks/useCountUp';

interface MetricCardProps {
  label: string;
  value: number;
  total?: number;
  suffix?: string;
  subtext?: string;
  badge?: React.ReactNode;
  to?: string;
  progressPercent?: number;
  accentColor?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  total,
  suffix = '',
  subtext,
  badge,
  to,
  progressPercent,
  accentColor,
}) => {
  const animatedValue = useCountUp(value, 900);

  const content = (
    <div
      className={clsx(
        'bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] p-5 shadow-[0_1px_2px_rgba(42,33,27,0.06)] transition-all duration-120 flex flex-col justify-between h-full',
        to && 'hover:border-[#CFC5B2] hover:shadow-[0_4px_12px_rgba(42,33,27,0.08)] cursor-pointer'
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[12.5px] font-medium uppercase tracking-wider text-[#766A5E]">
          {label}
        </span>
        {badge}
      </div>

      <div className="flex items-baseline gap-1.5 my-1">
        <span className="font-serif text-[34px] sm:text-[38px] font-normal tracking-tight text-[#2A211B] tabular-nums leading-none">
          {animatedValue}
        </span>
        {total !== undefined && (
          <span className="text-[16px] text-[#766A5E] font-medium">of {total}</span>
        )}
        {suffix && <span className="text-[16px] text-[#766A5E] font-medium">{suffix}</span>}
      </div>

      {progressPercent !== undefined && (
        <div className="w-full bg-[#EFE9DD] h-1.5 rounded-full overflow-hidden mt-2 mb-1">
          <div
            className="h-full bg-[#2F4A3F] rounded-full transition-all duration-480"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {subtext && <div className="text-[12px] text-[#5E5249] mt-1 truncate">{subtext}</div>}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
};
