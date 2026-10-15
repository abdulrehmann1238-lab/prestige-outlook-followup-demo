import React from 'react';
import { Clock, Send } from 'lucide-react';
import { useCedarStore } from '../../store/useCedarStore';
import { GroupDot } from '../ui/GroupDot';

export const SendScheduleStrip: React.FC = () => {
  const { dailyRepLimit, drafts, isPaused } = useCedarStore();

  // 30 slots spread from 9:00 to 17:00 (480 minutes total, ~16 min spacing)
  const totalSlots = dailyRepLimit;
  const sentSlots = Math.min(18, Math.floor(totalSlots * 0.6));
  const queuedSlots = Math.min(drafts.length, totalSlots - sentSlots);
  const remainingSlots = Math.max(0, totalSlots - sentSlots - queuedSlots);

  // Slot timing calculation (starts at 9:00 AM)
  const getSlotTime = (index: number) => {
    const startMinutes = 9 * 60; // 540 min
    const interval = Math.floor(480 / totalSlots);
    const totalMin = startMinutes + index * interval;
    const hour = Math.floor(totalMin / 60);
    const min = totalMin % 60;
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${min < 10 ? '0' : ''}${min} ${period}`;
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] p-5 shadow-[0_1px_2px_rgba(42,33,27,0.06)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-[#E2DACB] gap-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#2F4A3F]" />
          <h3 className="font-serif text-[16px] text-[#2A211B] font-medium">
            Today's Outlook Dispatch Schedule (Marcus Delgado)
          </h3>
        </div>
        <div className="text-[12.5px] text-[#5E5249]">
          Paced across <strong className="text-[#2A211B]">9:00 AM – 5:00 PM ET</strong> (intervals ~{Math.floor(480 / totalSlots)} mins)
        </div>
      </div>

      {/* Visual Slot Ribbon */}
      <div className="relative pt-4 pb-2">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
          {Array.from({ length: totalSlots }).map((_, idx) => {
            const isSent = idx < sentSlots;
            const isQueued = !isSent && idx < sentSlots + queuedSlots;
            const isCurrentNow = idx === sentSlots;
            const draft = isQueued ? drafts[idx - sentSlots] : null;

            return (
              <div
                key={idx}
                className="relative group flex-1 min-w-[10px] max-w-[28px] h-6 flex flex-col justify-end"
              >
                {/* Now marker indicator */}
                {isCurrentNow && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <span className="text-[9px] font-bold text-[#A63D2F] uppercase tracking-tighter">
                      NOW
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A63D2F] animate-ping" />
                  </div>
                )}

                {/* Slot bar */}
                <div
                  className={`w-full rounded-[3px] transition-all duration-160 cursor-pointer ${
                    isSent
                      ? 'h-6 bg-[#2F4A3F] border border-[#263D34]'
                      : isQueued
                      ? 'h-6 bg-transparent border-2 border-[#2F4A3F] border-dashed hover:bg-[#E3EBE5]'
                      : 'h-4 bg-[#EFE9DD] border border-[#CFC5B2]'
                  }`}
                />

                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col z-30 w-52 p-2 bg-[#FFFFFF] border border-[#CFC5B2] rounded-[8px] shadow-lg text-[11.5px] text-[#2A211B] pointer-events-none animate-in fade-in zoom-in-95 duration-120">
                  <div className="font-semibold text-[#2F4A3F] flex items-center justify-between border-b border-[#E2DACB] pb-1 mb-1">
                    <span>Slot #{idx + 1}</span>
                    <span>{getSlotTime(idx)}</span>
                  </div>
                  {isSent && (
                    <div className="text-[#3F7D58] font-medium flex items-center gap-1">
                      <Send className="w-3 h-3" />
                      <span>Sent from Outlook</span>
                    </div>
                  )}
                  {isQueued && draft && (
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1 font-medium">
                        <GroupDot group={draft.group} size="sm" />
                        <span className="truncate">{draft.recipientBusiness}</span>
                      </div>
                      <div className="text-[#766A5E] truncate">"{draft.subject}"</div>
                      <div className="text-[10px] text-[#B08D57] font-semibold">Queued for send</div>
                    </div>
                  )}
                  {!isSent && !isQueued && (
                    <div className="text-[#766A5E]">Available dispatch slot</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between pt-3 text-[12px] text-[#5E5249] border-t border-[#E2DACB]/60 gap-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-[2px] bg-[#2F4A3F]" />
              <span>Sent today (<strong>{sentSlots}</strong>)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-[2px] border-2 border-dashed border-[#2F4A3F]" />
              <span>Queued in Review (<strong>{queuedSlots}</strong>)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-[2px] bg-[#EFE9DD] border border-[#CFC5B2]" />
              <span>Remaining slots (<strong>{remainingSlots}</strong>)</span>
            </span>
          </div>
          <div className="text-[#766A5E] text-[11.5px]">
            {isPaused ? (
              <span className="text-[#A63D2F] font-semibold">● Sending paused</span>
            ) : (
              <span>Next send in <strong>7 minutes</strong> (10:31 AM ET)</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
