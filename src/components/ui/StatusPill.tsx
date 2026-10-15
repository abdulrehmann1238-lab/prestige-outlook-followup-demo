import React from 'react';
import { clsx } from 'clsx';
import {
  FileEdit,
  Clock,
  CheckCircle2,
  AlertTriangle,
  PauseCircle,
  Ban,
  Award,
  UserCheck,
} from 'lucide-react';
import { ContactStatus } from '../../data/seed';

interface StatusPillProps {
  status: ContactStatus;
  className?: string;
  customLabel?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({ status, className, customLabel }) => {
  const config: Record<
    ContactStatus,
    { label: string; icon: React.ReactNode; bg: string; text: string; border: string }
  > = {
    draft_ready: {
      label: 'Draft ready',
      icon: <FileEdit className="w-3.5 h-3.5 text-[#B08D57]" />,
      bg: 'bg-[#EFE4CF]',
      text: 'text-[#5A4522]',
      border: 'border-[#DFCBB0]',
    },
    in_sequence: {
      label: 'In sequence',
      icon: <Clock className="w-3.5 h-3.5 text-[#3D6A8A]" />,
      bg: 'bg-[#E1EBF2]',
      text: 'text-[#20445E]',
      border: 'border-[#C2D6E3]',
    },
    replied: {
      label: 'Replied',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#3F7D58]" />,
      bg: 'bg-[#E2F0E7]',
      text: 'text-[#1F5333]',
      border: 'border-[#C1DEC9]',
    },
    needs_person: {
      label: 'Needs a person',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-[#B7791F]" />,
      bg: 'bg-[#F7EAD0]',
      text: 'text-[#7D5010]',
      border: 'border-[#E8D1A8]',
    },
    paused: {
      label: 'Paused',
      icon: <PauseCircle className="w-3.5 h-3.5 text-[#766A5E]" />,
      bg: 'bg-[#EFE9DD]',
      text: 'text-[#5E5249]',
      border: 'border-[#D9D0C1]',
    },
    dnc: {
      label: 'Do not contact',
      icon: <Ban className="w-3.5 h-3.5 text-[#A63D2F]" />,
      bg: 'bg-[#F6E0DC]',
      text: 'text-[#75261B]',
      border: 'border-[#E8BCB4]',
    },
    converted: {
      label: 'Converted',
      icon: <Award className="w-3.5 h-3.5 text-[#2F4A3F]" />,
      bg: 'bg-[#E3EBE5]',
      text: 'text-[#1E3129]',
      border: 'border-[#BDD1C3]',
    },
    rep_handling: {
      label: 'Rep handling',
      icon: <UserCheck className="w-3.5 h-3.5 text-[#2F4A3F]" />,
      bg: 'bg-[#E3EBE5]',
      text: 'text-[#1E3129]',
      border: 'border-[#BDD1C3]',
    },
  };

  const item = config[status] || config.in_sequence;

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[12px] font-medium border shadow-[0_1px_1px_rgba(42,33,27,0.03)] transition-colors duration-200',
        item.bg,
        item.text,
        item.border,
        className
      )}
    >
      {item.icon}
      <span>{customLabel || item.label}</span>
    </span>
  );
};
