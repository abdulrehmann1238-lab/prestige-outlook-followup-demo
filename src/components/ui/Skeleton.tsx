import React from 'react';
import { clsx } from 'clsx';

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={clsx(
        'bg-[#EFE9DD] rounded-[6px] animate-[pulse_1.6s_ease-in-out_infinite]',
        className
      )}
    />
  );
};
