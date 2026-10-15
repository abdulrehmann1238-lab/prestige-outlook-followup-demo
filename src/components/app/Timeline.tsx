import React from 'react';
import { clsx } from 'clsx';
import {
  Package,
  Send,
  Clock,
  MessageSquare,
  UserCheck,
  Ban,
  Pause,
  AlertTriangle,
  FileCheck,
} from 'lucide-react';
import { TimelineEvent } from '../../data/seed';

export const Timeline: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
  if (!events || events.length === 0) {
    return <div className="text-[13px] text-[#766A5E] py-4">No relationship events recorded yet.</div>;
  }

  const getEventIcon = (type: TimelineEvent['type'], cancelled?: boolean) => {
    if (cancelled) return <Ban className="w-3.5 h-3.5 text-[#A63D2F]" />;
    switch (type) {
      case 'order_shipped':
        return <Package className="w-3.5 h-3.5 text-[#3D6A8A]" />;
      case 'email_sent':
        return <Send className="w-3.5 h-3.5 text-[#3F7D58]" />;
      case 'email_queued':
        return <Clock className="w-3.5 h-3.5 text-[#B08D57]" />;
      case 'reply_received':
        return <MessageSquare className="w-3.5 h-3.5 text-[#3F7D58]" />;
      case 'rep_takeover':
        return <UserCheck className="w-3.5 h-3.5 text-[#2F4A3F]" />;
      case 'paused':
        return <Pause className="w-3.5 h-3.5 text-[#766A5E]" />;
      case 'dnc_added':
        return <Ban className="w-3.5 h-3.5 text-[#A63D2F]" />;
      default:
        return <FileCheck className="w-3.5 h-3.5 text-[#766A5E]" />;
    }
  };

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-[#E2DACB]">
      {events.map((event) => {
        const isCancelled = event.cancelled;

        return (
          <div key={event.id} className="relative group">
            {/* Timeline node */}
            <div
              className={clsx(
                'absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center border shadow-xs transition-colors',
                isCancelled
                  ? 'bg-[#F6E0DC] border-[#E8BCB4]'
                  : event.type === 'reply_received'
                  ? 'bg-[#E2F0E7] border-[#3F7D58]'
                  : 'bg-[#FFFFFF] border-[#CFC5B2]'
              )}
            >
              {getEventIcon(event.type, isCancelled)}
            </div>

            {/* Event Content */}
            <div
              className={clsx(
                'rounded-[8px] p-3 border transition-all duration-160',
                isCancelled
                  ? 'bg-[#F6F2EA] border-[#E2DACB] opacity-75'
                  : event.type === 'reply_received'
                  ? 'bg-[#E2F0E7]/60 border-[#C1DEC9]'
                  : 'bg-[#FFFFFF] border-[#E2DACB]'
              )}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className={clsx(
                      'text-[13.5px] font-semibold text-[#2A211B]',
                      isCancelled && 'line-through text-[#766A5E]'
                    )}
                  >
                    {event.title}
                  </span>
                  {event.statusBadge && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#3F7D58] text-white">
                      {event.statusBadge}
                    </span>
                  )}
                  {isCancelled && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#A63D2F] text-white">
                      Stopped: Customer Replied
                    </span>
                  )}
                </div>
                <span className="text-[11.5px] text-[#766A5E] shrink-0">{event.timestamp}</span>
              </div>
              <p
                className={clsx(
                  'text-[13px] leading-relaxed',
                  isCancelled ? 'line-through text-[#766A5E]' : 'text-[#5E5249]'
                )}
              >
                {event.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
