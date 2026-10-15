import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Send,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  ExternalLink,
  HelpCircle,
  X,
} from 'lucide-react';
import { useCedarStore } from '../../store/useCedarStore';
import { MetricCard } from '../../components/app/MetricCard';
import { SendScheduleStrip } from '../../components/app/SendScheduleStrip';
import { GroupDot } from '../../components/ui/GroupDot';
import { Button } from '../../components/ui/Button';
import { BRAND } from '../../config/brand';
import { useToast } from '../../components/ui/Toast';

export const TodayPage: React.FC = () => {
  const [showTryThis, setShowTryThis] = useState(true);
  const navigate = useNavigate();
  const {
    drafts,
    attentionItems,
    activity,
    contacts,
    dailyRepLimit,
    simulateReply,
  } = useCedarStore();
  const { showToast } = useToast();

  const groupACount = contacts.filter((c) => c.group === 'A').length;
  const groupBCount = contacts.filter((c) => c.group === 'B').length;
  const groupCCount = contacts.filter((c) => c.group === 'C').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2DACB]">
        <div>
          <h1 className="font-serif text-[28px] sm:text-[32px] text-[#2A211B] font-medium leading-tight">
            Good morning, Marcus
          </h1>
          <p className="text-[14px] text-[#5E5249]">
            {BRAND.displayDate} · Official Outlook connection healthy · 18 sends dispatched today
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/app/pipeline')}
            icon={<ExternalLink className="w-3.5 h-3.5" />}
          >
            Open Pipeline
          </Button>
          <Button
            size="sm"
            onClick={() => navigate('/app/review')}
            icon={<FileCheck className="w-3.5 h-3.5" />}
          >
            Review Drafts ({drafts.length})
          </Button>
        </div>
      </div>

      {/* Dismissible "Try This" Onboarding Strip */}
      {showTryThis && (
        <div className="bg-[#EFE4CF] border border-[#DFCBB0] rounded-[12px] p-4 text-[#7A4E2D] relative shadow-xs animate-in fade-in duration-200">
          <button
            onClick={() => setShowTryThis(false)}
            className="absolute top-3 right-3 text-[#7A4E2D] hover:text-[#2A211B] p-1 rounded"
            title="Dismiss suggestions"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-3 pr-6">
            <Sparkles className="w-5 h-5 shrink-0 mt-0.5 text-[#B08D57]" />
            <div>
              <div className="font-serif font-semibold text-[15px] text-[#2A211B]">
                Key client proof points to test in this live demo:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2.5 text-[12.5px]">
                <button
                  onClick={() => {
                    simulateReply('contact-old-ember');
                    showToast({
                      type: 'success',
                      message: "Reply simulated for Old Ember. Sequence stopped automatically.",
                    });
                    navigate('/app/pipeline/contact-old-ember');
                  }}
                  className="bg-white/80 hover:bg-white p-2.5 rounded-[8px] border border-[#DFCBB0] text-left transition-colors font-medium text-[#2A211B] flex items-center justify-between"
                >
                  <span>1. Simulate a customer reply & see sequence halt</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B08D57]" />
                </button>

                <button
                  onClick={() => navigate('/app/review')}
                  className="bg-white/80 hover:bg-white p-2.5 rounded-[8px] border border-[#DFCBB0] text-left transition-colors font-medium text-[#2A211B] flex items-center justify-between"
                >
                  <span>2. Review grounded drafts & check failure block</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B08D57]" />
                </button>

                <button
                  onClick={() => navigate('/app/prospects')}
                  className="bg-white/80 hover:bg-white p-2.5 rounded-[8px] border border-[#DFCBB0] text-left transition-colors font-medium text-[#2A211B] flex items-center justify-between"
                >
                  <span>3. Run retail lounge discovery & verify dedupe</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B08D57]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Row 1: KPI Metrics Row (5 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <MetricCard
          label="Sent Today"
          value={18}
          total={dailyRepLimit}
          subtext="Paced across 9:00–17:00 ET"
          progressPercent={(18 / dailyRepLimit) * 100}
        />
        <MetricCard
          label="Inbound Replies"
          value={7}
          subtext="Sequences stopped automatically"
          badge={
            <span className="w-2 h-2 rounded-full bg-[#3F7D58] shadow-[0_0_0_3px_#E2F0E7]" />
          }
        />
        <MetricCard
          label="Interested / Hot"
          value={3}
          subtext="Ready for rep takeover"
          badge={
            <span className="px-1.5 py-0.2 rounded bg-[#E2F0E7] text-[#1F5333] text-[10px] font-bold">
              HOT
            </span>
          }
        />
        <MetricCard
          label="Needs Attention"
          value={attentionItems.length}
          subtext="Replies, CAPTCHAs, checks"
          badge={
            <span className="w-2 h-2 rounded-full bg-[#B7791F] shadow-[0_0_0_3px_#F7EAD0]" />
          }
        />
        <MetricCard
          label="Drafts Waiting"
          value={drafts.length}
          subtext="Review-before-send queue"
          to="/app/review"
          badge={
            <span className="text-[11px] font-semibold text-[#B08D57] underline">Open</span>
          }
        />
      </div>

      {/* Main Layout: Left 8/12, Right 4/12 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Needs Attention Queue */}
          <div className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] p-5 shadow-[0_1px_2px_rgba(42,33,27,0.06)]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2DACB]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#B7791F]" />
                <h3 className="font-serif text-[17px] text-[#2A211B] font-medium">
                  Needs Your Attention ({attentionItems.length})
                </h3>
              </div>
              <span className="text-[12px] text-[#766A5E]">Real-time safety triggers</span>
            </div>

            {attentionItems.length > 0 ? (
              <div className="space-y-2.5">
                {attentionItems.map((item) => {
                  const tagStyles = {
                    Interested: 'bg-[#E2F0E7] text-[#1F5333] border-[#C1DEC9]',
                    CAPTCHA: 'bg-[#F7EAD0] text-[#7D5010] border-[#E8D1A8]',
                    Blocked: 'bg-[#F6E0DC] text-[#75261B] border-[#E8BCB4]',
                    Bounce: 'bg-[#F7EAD0] text-[#7D5010] border-[#E8D1A8]',
                    Review: 'bg-[#EFE4CF] text-[#7A4E2D] border-[#DFCBB0]',
                  }[item.tag] || 'bg-[#EFE9DD] text-[#5E5249] border-[#CFC5B2]';

                  return (
                    <div
                      key={item.id}
                      className="p-3 rounded-[8px] bg-[#FBF9F4] border border-[#E2DACB] hover:border-[#CFC5B2] hover:bg-[#FFFFFF] transition-all duration-120 flex items-center justify-between gap-3 group"
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${tagStyles}`}
                          >
                            {item.tag}
                          </span>
                          <span className="font-medium text-[13.5px] text-[#2A211B] truncate">
                            {item.title}
                          </span>
                        </div>
                        <p className="text-[12.5px] text-[#5E5249] line-clamp-1">{item.detail}</p>
                      </div>

                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => navigate(item.actionUrl)}
                        className="shrink-0 group-hover:border-[#2F4A3F]"
                      >
                        {item.ctaLabel}
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 text-[13px] text-[#766A5E]">
                Nothing needs your attention right now. All sequences operating quietly.
              </div>
            )}
          </div>

          {/* Today's Send Schedule Strip */}
          <SendScheduleStrip />

          {/* Groups Snapshot Cards (3 Groups) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Group A */}
            <Link
              to="/app/pipeline?group=A"
              className="bg-[#FFFFFF] border-l-4 border-l-[#7A4E2D] border-t border-r border-b border-[#E2DACB] rounded-[10px] p-4 shadow-xs hover:border-[#CFC5B2] transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12px] font-semibold text-[#7A4E2D] uppercase tracking-wider">
                  Group A
                </span>
                <span className="font-serif text-[22px] font-normal text-[#2A211B] tabular-nums">
                  {groupACount}
                </span>
              </div>
              <div className="text-[13.5px] font-medium text-[#2A211B]">Inactive Accounts</div>
              <div className="text-[11.5px] text-[#766A5E] mt-1">
                No orders &gt; 180 days · 412 accounts
              </div>
            </Link>

            {/* Group B */}
            <Link
              to="/app/pipeline?group=B"
              className="bg-[#FFFFFF] border-l-4 border-l-[#3F7D58] border-t border-r border-b border-[#E2DACB] rounded-[10px] p-4 shadow-xs hover:border-[#CFC5B2] transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12px] font-semibold text-[#3F7D58] uppercase tracking-wider">
                  Group B
                </span>
                <span className="font-serif text-[22px] font-normal text-[#2A211B] tabular-nums">
                  {groupBCount}
                </span>
              </div>
              <div className="text-[13.5px] font-medium text-[#2A211B]">Recent Customers</div>
              <div className="text-[11.5px] text-[#766A5E] mt-1">
                ~14 days post-shipment · 38 accounts
              </div>
            </Link>

            {/* Group C */}
            <Link
              to="/app/pipeline?group=C"
              className="bg-[#FFFFFF] border-l-4 border-l-[#3D6A8A] border-t border-r border-b border-[#E2DACB] rounded-[10px] p-4 shadow-xs hover:border-[#CFC5B2] transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12px] font-semibold text-[#3D6A8A] uppercase tracking-wider">
                  Group C
                </span>
                <span className="font-serif text-[22px] font-normal text-[#2A211B] tabular-nums">
                  {groupCCount}
                </span>
              </div>
              <div className="text-[13.5px] font-medium text-[#2A211B]">Retail Prospects</div>
              <div className="text-[11.5px] text-[#766A5E] mt-1">
                Verified US lounges · 1,286 accounts
              </div>
            </Link>
          </div>
        </div>

        {/* Right Rail: Activity Feed (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] p-5 shadow-[0_1px_2px_rgba(42,33,27,0.06)]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2DACB]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2F4A3F]" />
                <h3 className="font-serif text-[16px] text-[#2A211B] font-medium">
                  Recent Activity
                </h3>
              </div>
              <Link
                to="/app/activity"
                className="text-[12px] text-[#2F4A3F] font-semibold hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="space-y-3.5 divide-y divide-[#E2DACB]/60">
              {activity.slice(0, 6).map((item, idx) => (
                <div key={item.id} className={idx > 0 ? 'pt-3' : ''}>
                  <div className="flex items-start justify-between text-[11.5px] text-[#766A5E] mb-0.5">
                    <span className="font-semibold text-[#2F4A3F]">{item.actor}</span>
                    <span>{item.timestamp}</span>
                  </div>
                  <div className="text-[13px] font-medium text-[#2A211B]">{item.action}</div>
                  <div className="text-[12px] text-[#5E5249] truncate mt-0.5">
                    {item.contactBusiness}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Compliance Status Card */}
          <div className="bg-[#FBF9F4] border border-[#E2DACB] rounded-[12px] p-4 text-[12.5px] space-y-2 text-[#5E5249]">
            <div className="flex items-center gap-2 font-serif font-semibold text-[#2A211B] text-[14px]">
              <ShieldCheck className="w-4 h-4 text-[#3F7D58]" />
              <span>Compliance Guardrails Active</span>
            </div>
            <p className="leading-relaxed">
              Every email draft includes sender physical address and 1-click opt-out. Outbound pacing enforces 30/day max per mailbox.
            </p>
            <div className="pt-1">
              <Link
                to="/app/compliance"
                className="text-[#2F4A3F] font-medium underline underline-offset-2 hover:text-[#1E3129]"
              >
                Inspect Do-Not-Contact registry →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
