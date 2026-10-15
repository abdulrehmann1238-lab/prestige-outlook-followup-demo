import React from 'react';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { Button } from './Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  message,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center p-8 text-center bg-[#FBF9F4] border border-[#E2DACB] rounded-[12px]',
        className
      )}
    >
      <div className="w-10 h-10 rounded-full bg-[#EFE9DD] flex items-center justify-center text-[#766A5E] mb-3">
        <Icon className="w-5 h-5 stroke-[1.5]" />
      </div>
      {title && <h4 className="font-serif text-[17px] text-[#2A211B] font-medium mb-1">{title}</h4>}
      <p className="text-[13.5px] text-[#5E5249] max-w-[42ch] mb-4">{message}</p>
      {actionLabel && onAction && (
        <Button size="sm" variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
