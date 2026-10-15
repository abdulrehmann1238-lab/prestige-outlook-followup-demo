import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface ErrorPanelProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorPanel: React.FC<ErrorPanelProps> = ({
  message = "Couldn't load this view. Nothing was changed.",
  onRetry,
}) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-[10px] bg-[#F6E0DC] border border-[#E8BCB4] text-[#75261B]">
      <div className="flex items-center gap-2.5">
        <AlertCircle className="w-5 h-5 shrink-0 text-[#A63D2F]" />
        <span className="text-[13.5px] font-medium">{message}</span>
      </div>
      {onRetry && (
        <Button size="sm" variant="outline" onClick={onRetry} className="bg-white/80 border-[#A63D2F]/30 text-[#75261B] hover:bg-white">
          Retry
        </Button>
      )}
    </div>
  );
};
