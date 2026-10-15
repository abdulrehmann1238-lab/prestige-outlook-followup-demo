import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Search,
  Pause,
  Play,
  Bell,
  ChevronDown,
  AlertOctagon,
  ShieldAlert,
} from 'lucide-react';
import { useCedarStore } from '../../store/useCedarStore';
import { BRAND } from '../../config/brand';
import { CommandPalette } from './CommandPalette';
import { useHotkeys } from '../../hooks/useHotkeys';
import { useToast } from '../ui/Toast';

export const TopBar: React.FC = () => {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const location = useLocation();
  const { isPaused, togglePause, currentRepId, setCurrentRep, attentionItems } = useCedarStore();
  const { showToast } = useToast();

  useHotkeys('cmd+k', () => setPaletteOpen(true));

  // Determine current page title from path
  const path = location.pathname;
  let pageTitle = 'Today';
  if (path.includes('/app/pipeline')) pageTitle = 'Pipeline';
  else if (path.includes('/app/review')) pageTitle = 'Review Queue';
  else if (path.includes('/app/prospects/manual')) pageTitle = 'Manual Contact Forms';
  else if (path.includes('/app/prospects')) pageTitle = 'Prospect Discovery';
  else if (path.includes('/app/sequences')) pageTitle = 'Sequences & Timing';
  else if (path.includes('/app/voice')) pageTitle = 'Voice & Catalog Safeguards';
  else if (path.includes('/app/outlook')) pageTitle = 'Outlook Accounts';
  else if (path.includes('/app/compliance')) pageTitle = 'Compliance & Opt-outs';
  else if (path.includes('/app/activity')) pageTitle = 'Activity History';
  else if (path.includes('/app/reports')) pageTitle = 'Daily Reports & Exports';
  else if (path.includes('/app/architecture')) pageTitle = 'System Architecture';
  else if (path.includes('/app/settings')) pageTitle = 'Settings';

  const currentRep = BRAND.reps.find((r) => r.id === currentRepId) || BRAND.reps[0];

  const handlePauseToggle = () => {
    togglePause();
    showToast({
      type: isPaused ? 'success' : 'error',
      message: isPaused
        ? 'Sending resumed across active mailboxes.'
        : 'Emergency pause active: all queued sends frozen.',
    });
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex flex-col bg-[#FBF9F4] border-b border-[#E2DACB]">
        {/* Emergency Pause Global Banner */}
        {isPaused && (
          <div className="bg-[#F6E0DC] border-b border-[#E8BCB4] px-4 py-2 flex items-center justify-between text-[#75261B] text-[13px] font-medium animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#A63D2F] shrink-0" />
              <span>
                <strong>EMERGENCY PAUSE ENGAGED:</strong> All outbound sending is frozen across all reps' real Outlook mailboxes. No emails will leave the outbox.
              </span>
            </div>
            <button
              onClick={handlePauseToggle}
              className="text-[12px] bg-[#A63D2F] text-white px-2.5 py-1 rounded-[6px] font-semibold hover:bg-[#872D21] transition-colors"
            >
              Resume Sending
            </button>
          </div>
        )}

        {/* Main Bar */}
        <div className="h-14 px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Left: Breadcrumbs / Title */}
          <div className="flex items-center gap-2 text-[14px]">
            <span className="text-[#766A5E] hidden sm:inline">{BRAND.clientName}</span>
            <span className="text-[#CFC5B2] hidden sm:inline">/</span>
            <span className="font-semibold text-[#2A211B]">{pageTitle}</span>
          </div>

          {/* Center: Search trigger */}
          <div className="flex-1 max-w-[340px] hidden md:block">
            <button
              onClick={() => setPaletteOpen(true)}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-[8px] bg-[#EFE9DD] border border-[#CFC5B2] text-[13px] text-[#766A5E] hover:border-[#2A211B] transition-colors text-left"
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5" />
                <span>Search accounts or commands...</span>
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#FFFFFF] border border-[#CFC5B2] rounded text-[#766A5E]">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Demo Data Chip */}
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-[4px] bg-[#EFE4CF] text-[#7A4E2D] border border-[#DFCBB0] text-[11px] font-medium tracking-wide uppercase">
              Demo Data
            </span>

            {/* Emergency Pause Button */}
            <button
              onClick={handlePauseToggle}
              title={isPaused ? 'Resume all sending' : 'Emergency Pause: Freeze all outbound email queues'}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[13px] font-medium transition-all duration-120 border shadow-sm ${
                isPaused
                  ? 'bg-[#3F7D58] text-white border-[#2E6043] hover:bg-[#2E6043]'
                  : 'bg-[#FFFFFF] text-[#A63D2F] border-[#A63D2F] hover:bg-[#F6E0DC] active:bg-[#A63D2F] active:text-white'
              }`}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
              <span>{isPaused ? 'Resume Sending' : 'Pause All Sending'}</span>
            </button>

            {/* Rep Switcher */}
            <div className="relative group">
              <button className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-[8px] hover:bg-[#EFE9DD] border border-transparent hover:border-[#CFC5B2] transition-colors">
                <div
                  className="w-6 h-6 rounded-full text-white text-[10px] font-bold flex items-center justify-center shadow-xs"
                  style={{ backgroundColor: currentRep.color }}
                >
                  {currentRep.initials}
                </div>
                <span className="text-[13px] font-medium text-[#2A211B] hidden lg:inline">
                  {currentRep.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#766A5E]" />
              </button>

              <div className="absolute right-0 top-full mt-1 w-52 bg-[#FFFFFF] border border-[#CFC5B2] rounded-[10px] shadow-[0_8px_24px_rgba(42,33,27,0.12)] p-1.5 hidden group-hover:block z-40">
                <div className="px-2.5 py-1 text-[11px] font-semibold text-[#766A5E] uppercase tracking-wider">
                  Switch Rep Mailbox
                </div>
                {BRAND.reps.map((rep) => (
                  <button
                    key={rep.id}
                    onClick={() => setCurrentRep(rep.id)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-[6px] text-[13px] transition-colors text-left ${
                      rep.id === currentRepId
                        ? 'bg-[#E3EBE5] text-[#1E3129] font-medium'
                        : 'text-[#2A211B] hover:bg-[#EFE9DD]'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full text-white text-[9px] font-bold flex items-center justify-center shrink-0"
                      style={{ backgroundColor: rep.color }}
                    >
                      {rep.initials}
                    </div>
                    <div className="truncate">
                      <div>{rep.name}</div>
                      <div className="text-[11px] text-[#766A5E] truncate">{rep.role}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
};
