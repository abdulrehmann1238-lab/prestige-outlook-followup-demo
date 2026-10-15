import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Ban,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LivingInbox: React.FC = () => {
  const [stage, setStage] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeChipTooltip, setActiveChipTooltip] = useState<string | null>(null);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setStage((prev) => ((prev + 1) % 5) as any);
    }, 2800); // 5 stages * 2.8s = 14s total loop

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setActiveChipTooltip(null);
      }}
      className="relative w-full max-w-[520px] mx-auto select-none group"
    >
      {/* Background Deck Card 2 */}
      <div className="absolute inset-0 bg-[#EFE9DD] rounded-[14px] border border-[#CFC5B2] transform translate-y-3 translate-x-3 -rotate-1 opacity-60 pointer-events-none" />

      {/* Background Deck Card 1 */}
      <div className="absolute inset-0 bg-[#FBF9F4] rounded-[14px] border border-[#E2DACB] transform translate-y-1.5 translate-x-1.5 rotate-0.5 opacity-80 pointer-events-none" />

      {/* Main Front Outlook Card */}
      <div className="relative bg-[#FFFFFF] border border-[#CFC5B2] rounded-[14px] shadow-[0_12px_32px_rgba(42,33,27,0.1)] p-5 overflow-hidden z-10 transition-all duration-300">
        {/* Card Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2DACB]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#2F4A3F] text-white text-[11px] font-bold flex items-center justify-center">
              MD
            </div>
            <div>
              <div className="text-[13.5px] font-semibold text-[#2A211B] flex items-center gap-1.5">
                <span>Old Ember Cigar Lounge</span>
                <span className="text-[11px] text-[#766A5E] font-normal">(Austin, TX)</span>
              </div>
              <div className="text-[11.5px] text-[#766A5E]">
                QuickBooks Account · Marcus Delgado Outlook
              </div>
            </div>
          </div>

          {/* Status Pill that transitions across stages */}
          <div className="shrink-0">
            {stage === 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[12px] font-semibold bg-[#EFE4CF] text-[#7A4E2D] border border-[#DFCBB0] animate-in fade-in duration-200">
                <Sparkles className="w-3 h-3 text-[#B08D57]" />
                <span>Draft Prepared</span>
              </span>
            )}
            {stage === 1 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[12px] font-semibold bg-[#E3EBE5] text-[#1E3129] border border-[#BDD1C3] animate-in fade-in duration-200">
                <CheckCircle2 className="w-3 h-3 text-[#2F4A3F]" />
                <span>Approved by Marcus</span>
              </span>
            )}
            {stage >= 2 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[12px] font-semibold bg-[#E2F0E7] text-[#1F5333] border border-[#C1DEC9] animate-in fade-in duration-200">
                <Send className="w-3 h-3 text-[#3F7D58]" />
                <span>Sent from Outlook</span>
              </span>
            )}
          </div>
        </div>

        {/* Grounding Source Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <span className="text-[11px] text-[#766A5E] font-medium">Grounding:</span>
          <button
            onClick={() =>
              setActiveChipTooltip(
                activeChipTooltip === 'invoice' ? null : 'invoice'
              )
            }
            className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#EFE4CF] text-[#7A4E2D] border border-[#DFCBB0] hover:bg-[#EAE0C7] transition-colors cursor-pointer"
          >
            Invoice #4128 (Mar 2026)
          </button>
          <button
            onClick={() =>
              setActiveChipTooltip(
                activeChipTooltip === 'product' ? null : 'product'
              )
            }
            className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#EFE4CF] text-[#7A4E2D] border border-[#DFCBB0] hover:bg-[#EAE0C7] transition-colors cursor-pointer"
          >
            Oak 150-ct Humidor
          </button>

          {activeChipTooltip && (
            <div className="w-full text-[11px] text-[#7A4E2D] bg-[#EFE4CF]/80 p-1.5 rounded mt-1 border border-[#DFCBB0] animate-in fade-in duration-120">
              ✓ Grounded data verified: Pulled directly from QuickBooks customer invoice ledger.
            </div>
          )}
        </div>

        {/* Email Message Content */}
        <div className="bg-[#FBF9F4] p-3.5 rounded-[8px] border border-[#E2DACB] text-[13px] leading-relaxed text-[#2A211B] space-y-1.5">
          <div className="font-semibold text-[13.5px] text-[#2A211B]">
            Subject: Checking in on the Oak humidors
          </div>
          <p className="text-[#5E5249] whitespace-pre-line text-[12.5px]">
            Hi Daniela,
            {'\n'}
            It's Marcus at Prestige. It's been a while since your March order of the Oak 150-ct humidors and Ember cabinet, and I wanted to see how they've been doing on your floor.
            {'\n'}
            We also have a new line of Ember electronic cabinets arriving that pairs well with what you ordered. Would it help if I sent over our wholesale spec sheet?
          </p>
        </div>

        {/* Stage 2 & Beyond: Customer Reply Bubble Drops In */}
        {stage >= 2 && (
          <div className="mt-3 p-3 rounded-[8px] bg-[#E2F0E7] border border-[#C1DEC9] text-[13px] text-[#1F5333] space-y-1 animate-in slide-in-from-top-2 fade-in duration-300">
            <div className="flex items-center justify-between text-[11.5px] text-[#2F4A3F] font-semibold">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#3F7D58]" />
                <span>Daniela Ortiz (Reply received via Outlook)</span>
              </span>
              <span>10:41 AM</span>
            </div>
            <p className="font-medium text-[#1E3129] text-[12.5px]">
              "Yes, send me the new cabinet pricing. We might need 2 more before November."
            </p>
          </div>
        )}

        {/* Stage 3 & Beyond: Cancelled Steps Strike Through */}
        {stage >= 3 && (
          <div className="mt-3 p-2.5 rounded-[8px] bg-[#F6F2EA] border border-[#E2DACB] text-[12px] text-[#766A5E] space-y-1 animate-in fade-in duration-300">
            <div className="flex items-center justify-between text-[#A63D2F] font-semibold text-[11.5px]">
              <span className="flex items-center gap-1">
                <Ban className="w-3.5 h-3.5" />
                <span>Sequence Halted Automatically</span>
              </span>
              <span>0 Sends After Reply</span>
            </div>
            <div className="line-through text-[11.5px] text-[#766A5E]">
              • Step 2: Day +5 Restock Reminder — <strong className="text-[#A63D2F]">Cancelled</strong>
            </div>
            <div className="line-through text-[11.5px] text-[#766A5E]">
              • Step 3: Day +12 Follow-up — <strong className="text-[#A63D2F]">Cancelled</strong>
            </div>
          </div>
        )}

        {/* Stage 4: Hot Lead Settles */}
        {stage === 4 && (
          <div className="mt-3 p-2.5 bg-[#2F4A3F] text-white rounded-[8px] flex items-center justify-between text-[12.5px] font-semibold animate-in zoom-in-95 fade-in duration-200">
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#B08D57] fill-current" />
              <span>Hot Lead Attributed → Assigned to Marcus Delgado</span>
            </div>
            <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded font-mono">
              In Today Queue
            </span>
          </div>
        )}

        {/* Footer info strip */}
        <div className="mt-3 pt-2.5 border-t border-[#E2DACB]/70 flex items-center justify-between text-[11px] text-[#766A5E]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3F7D58]" />
            <span>Pre-send checks: 5 of 5 passed</span>
          </span>
          <span className="italic">{isPaused ? 'Loop paused (Hovering)' : 'Living simulation'}</span>
        </div>
      </div>
    </div>
  );
};
