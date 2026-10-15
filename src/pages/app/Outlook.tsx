import React, { useState } from 'react';
import {
  Mail,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Pause,
  Play,
  RotateCw,
  ExternalLink,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useCedarStore } from '../../store/useCedarStore';
import { BRAND } from '../../config/brand';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';

export const OutlookPage: React.FC = () => {
  const { dailyRepLimit, setDailyRepLimit, isPaused, togglePause } = useCedarStore();
  const { showToast } = useToast();

  const [pausedMailboxes, setPausedMailboxes] = useState<string[]>([]);

  const handleLimitChange = (newLimit: number) => {
    setDailyRepLimit(newLimit);
    showToast({
      type: 'info',
      message: `Daily limit set to ${newLimit}/day. Today schedule re-spread across business hours.`,
    });
  };

  const handleToggleMailboxPause = (repId: string, name: string) => {
    setPausedMailboxes((prev) => {
      const isCurrentlyPaused = prev.includes(repId);
      const next = isCurrentlyPaused ? prev.filter((id) => id !== repId) : [...prev, repId];
      showToast({
        type: isCurrentlyPaused ? 'success' : 'warning',
        message: `${name}'s mailbox ${isCurrentlyPaused ? 'resumed' : 'paused'}.`,
      });
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2DACB]">
        <div>
          <h1 className="font-serif text-[28px] text-[#2A211B] font-medium leading-tight">
            Outlook Mailboxes & Rate Control
          </h1>
          <p className="text-[14px] text-[#5E5249]">
            Official delegated Microsoft 365 OAuth integration · Emails send from reps' real accounts
          </p>
        </div>
      </div>

      {/* Official Integration Explainer Note (PRD Requirement #10) */}
      <div className="p-4 bg-[#E3EBE5] border border-[#BDD1C3] rounded-[10px] text-[13px] text-[#1E3129] flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#2F4A3F] shrink-0 mt-0.5" />
        <div>
          <div className="font-serif font-semibold text-[14px] text-[#2A211B]">
            Where Your Sent Mail Appears:
          </div>
          <p className="mt-0.5 leading-relaxed text-[#2F4A3F]">
            Cedar connects directly through <strong>Microsoft Graph delegated permissions</strong>, never through browser automation. Every email sent leaves the rep's real Outlook inbox, carries authentic SPF/DKIM authentication, and sits permanently in their real <strong>Sent Items</strong> folder.
          </p>
        </div>
      </div>

      {/* Rep Mailbox Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {BRAND.reps.map((rep) => {
          const isMailboxPaused = pausedMailboxes.includes(rep.id) || isPaused;

          return (
            <div
              key={rep.id}
              className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] p-5 shadow-[0_1px_2px_rgba(42,33,27,0.06)] space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rep Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full text-white font-bold flex items-center justify-center text-[13px] shadow-sm"
                      style={{ backgroundColor: rep.color }}
                    >
                      {rep.initials}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[15px] text-[#2A211B]">{rep.name}</h3>
                      <div className="text-[12px] text-[#766A5E] font-mono">{rep.email}</div>
                    </div>
                  </div>
                  <span
                    className={`w-2.5 h-2.5 rounded-full mt-1.5 ${
                      isMailboxPaused ? 'bg-[#A63D2F]' : 'bg-[#3F7D58]'
                    }`}
                  />
                </div>

                {/* Connection Status Badge */}
                <div className="flex items-center justify-between text-[12px] p-2 bg-[#FBF9F4] rounded-[6px] border border-[#E2DACB]">
                  <span className="flex items-center gap-1.5 text-[#3F7D58] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>OAuth Connected</span>
                  </span>
                  <span className="text-[#766A5E]">Sync: {rep.syncTime}</span>
                </div>

                {/* Interactive Limit Slider (PRD Wow Moment #5) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[12.5px]">
                    <span className="font-semibold text-[#2A211B]">Daily Send Quota:</span>
                    <span className="font-serif font-bold text-[#2A211B] text-[15px] tabular-nums">
                      {rep.id === 'marcus' ? dailyRepLimit : rep.dailyLimit} emails / day
                    </span>
                  </div>
                  {rep.id === 'marcus' ? (
                    <input
                      type="range"
                      min={10}
                      max={60}
                      step={5}
                      value={dailyRepLimit}
                      onChange={(e) => handleLimitChange(Number(e.target.value))}
                      className="w-full accent-[#2F4A3F] cursor-pointer"
                    />
                  ) : (
                    <div className="text-[12px] text-[#766A5E]">
                      Fixed to default 30 sends/day
                    </div>
                  )}
                  <div className="flex justify-between text-[11px] text-[#766A5E]">
                    <span>10 / day (Conservative)</span>
                    <span>60 / day (Maximum)</span>
                  </div>
                </div>

                {/* Cadence & Hours Details */}
                <div className="space-y-1.5 text-[12.5px] text-[#5E5249] bg-[#FBF9F4] p-3 rounded-[8px] border border-[#E2DACB]">
                  <div className="flex justify-between">
                    <span>Send Hours:</span>
                    <strong className="text-[#2A211B]">9:00 AM – 5:00 PM ET</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Randomized Spacing:</span>
                    <strong className="text-[#2A211B]">12 – 18 min</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Inbox Reply Check:</span>
                    <strong className="text-[#3F7D58]">Every 5 minutes</strong>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-[#E2DACB]/60">
                    <span>Domain Health:</span>
                    <strong className="text-[#3F7D58]">Good (100% inbox)</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-[#E2DACB]">
                <Button
                  size="sm"
                  variant={isMailboxPaused ? 'primary' : 'outline'}
                  onClick={() => handleToggleMailboxPause(rep.id, rep.name)}
                  icon={isMailboxPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                >
                  {isMailboxPaused ? 'Resume Mailbox' : 'Pause Mailbox'}
                </Button>

                <button
                  onClick={() => showToast({ type: 'info', message: 'Re-verified Microsoft OAuth token.' })}
                  className="text-[12px] text-[#766A5E] hover:text-[#2A211B] flex items-center gap-1 p-1"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>Refresh Token</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
