import React from 'react';
import { clsx } from 'clsx';

interface GroupDotProps {
  group: 'A' | 'B' | 'C';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const GroupDot: React.FC<GroupDotProps> = ({
  group,
  size = 'md',
  showLabel = false,
  className,
}) => {
  const config = {
    A: { color: 'bg-[#7A4E2D]', label: 'Group A (Inactive)' },
    B: { color: 'bg-[#3F7D58]', label: 'Group B (Recent)' },
    C: { color: 'bg-[#3D6A8A]', label: 'Group C (Prospects)' },
  };

  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  };

  return (
    <span className={clsx('inline-flex items-center gap-1.5', className)}>
      <span
        className={clsx('rounded-full shrink-0 shadow-[0_0_0_1px_rgba(42,33,27,0.1)]', config[group].color, sizes[size])}
        title={config[group].label}
      />
      {showLabel && <span className="text-[13px] text-[#5E5249]">{config[group].label}</span>}
    </span>
  );
};
