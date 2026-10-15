import React, { useState, useEffect } from 'react';
import {
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  XCircle,
  ThumbsUp,
  Sparkles,
  Info,
  Clock,
  ShieldAlert,
  HelpCircle,
  Package,
  Layers,
  ChevronDown,
  Check,
} from 'lucide-react';
import { useCedarStore } from '../../store/useCedarStore';
import { GroupDot } from '../../components/ui/GroupDot';
import { Button } from '../../components/ui/Button';
import { Draft } from '../../data/seed';
import { useToast } from '../../components/ui/Toast';
import { useHotkeys } from '../../hooks/useHotkeys';
import { BRAND } from '../../config/brand';

export const ReviewPage: React.FC = () => {
  const {
    drafts,
    approveDraft,
    rejectDraft,
    regenerateDraft,
    updateDraftBody,
    switchDraftApproach,
    saveAsExample,
    products,
    isPaused,
  } = useCedarStore();
  const { showToast } = useToast();

  const [activeGroupFilter, setActiveGroupFilter] = useState<'ALL' | 'A' | 'B' | 'C'>('ALL');
  const [selectedDraftId, setSelectedDraftId] = useState<string>(drafts[0]?.id || '');
  const [isEditing, setIsEditing] = useState(false);
  const [editSubject, setEditSubject] = useState('');
  const [editBody, setEditBody] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [hoveredSource, setHoveredSource] = useState<string | null>(null);

  const filteredDrafts = drafts.filter((d) => {
    if (activeGroupFilter === 'ALL') return true;
    return d.group === activeGroupFilter;
  });

  const selectedDraft =
    drafts.find((d) => d.id === selectedDraftId) || filteredDrafts[0] || drafts[0];

  useEffect(() => {
    if (selectedDraft) {
      setEditSubject(selectedDraft.subject);
      setEditBody(selectedDraft.body);
      setIsEditing(false);
    }
  }, [selectedDraft?.id]);

  const selectNextDraft = (direction: number) => {
    const idx = filteredDrafts.findIndex((d) => d.id === selectedDraft?.id);
    if (idx === -1) return;
    const nextIdx = (idx + direction + filteredDrafts.length) % filteredDrafts.length;
    setSelectedDraftId(filteredDrafts[nextIdx].id);
  };

  const handleApprove = () => {
    if (!selectedDraft) return;
    if (isPaused) {
      showToast({ type: 'error', message: 'Sending is paused across all mailboxes.' });
      return;
    }
    const hasFailedCheck = selectedDraft.preSendChecks.some((c) => !c.passed);
    if (hasFailedCheck) {
      showToast({
        type: 'error',
        message: 'This draft cannot be approved: it failed pre-send checks.',
      });
      return;
    }

    const nextDraft = filteredDrafts.find((d) => d.id !== selectedDraft.id);
    const success = approveDraft(selectedDraft.id);
    if (success) {
      showToast({
        type: 'success',
        message: `Approved. Scheduled for ${selectedDraft.scheduledTime} from Marcus's Outlook (demo).`,
      });
      if (nextDraft) setSelectedDraftId(nextDraft.id);
    }
  };

  const handleRegenerate = () => {
    if (!selectedDraft) return;
    setIsRegenerating(true);
    setTimeout(() => {
      regenerateDraft(selectedDraft.id);
      setIsRegenerating(false);
      showToast({ type: 'info', message: 'Regenerated draft variant with grounded inventory.' });
    }, 850);
  };

  // Keyboard Shortcuts: A (Approve), R (Regenerate), E (Edit), J/K (Next/Prev)
  useHotkeys('a', () => handleApprove());
  useHotkeys('r', () => handleRegenerate());
  useHotkeys('e', () => setIsEditing((prev) => !prev));
  useHotkeys('j', () => selectNextDraft(1));
  useHotkeys('k', () => selectNextDraft(-1));


  const handleSaveEdit = () => {
    if (!selectedDraft) return;
    updateDraftBody(selectedDraft.id, editSubject, editBody);
    setIsEditing(false);
    showToast({ type: 'success', message: 'Draft edits saved and re-validated.' });
  };

  const handleApproachSwitch = (approach: Draft['approach']) => {
    if (!selectedDraft) return;
    switchDraftApproach(selectedDraft.id, approach);
    showToast({ type: 'info', message: `Approach switched to ${approach.replace('_', ' ')}.` });
  };

  const handleSaveExample = () => {
    if (!selectedDraft) return;
    saveAsExample(selectedDraft.id);
    showToast({ type: 'success', message: 'Saved as an approved voice example for learning.' });
  };

  const handleApproveAll = () => {
    const passingDrafts = drafts.filter((d) => d.preSendChecks.every((c) => c.passed));
    if (
      window.confirm(
        `Approve all ${passingDrafts.length} drafts that passed all safety checks? They will be spread across business hours in Outlook.`
      )
    ) {
      passingDrafts.forEach((d) => approveDraft(d.id));
      showToast({
        type: 'success',
        message: `Scheduled ${passingDrafts.length} drafts in Marcus's Outlook outbox.`,
      });
    }
  };

  if (drafts.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2DACB]">
          <h1 className="font-serif text-[28px] text-[#2A211B] font-medium">Review Queue</h1>
        </div>
        <div className="p-12 text-center bg-[#FFFFFF] border border-[#E2DACB] rounded-[14px] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#E2F0E7] text-[#3F7D58] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-[20px] text-[#2A211B] font-medium">All caught up!</h2>
          <p className="text-[14px] text-[#5E5249] max-w-md mx-auto">
            Every prepared draft has been approved or addressed. Cedar will prepare the next batch of follow-ups tomorrow morning at 7:30 AM.
          </p>
        </div>
      </div>
    );
  }

  const failingCheck = selectedDraft?.preSendChecks.find((c) => !c.passed);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2DACB]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-[28px] text-[#2A211B] font-medium leading-tight">
              Review Queue
            </h1>
            <span className="text-[12px] font-bold px-2 py-0.5 rounded-full bg-[#EFE4CF] text-[#7A4E2D]">
              {drafts.length} Pending
            </span>
          </div>
          <p className="text-[14px] text-[#5E5249]">
            Human review-before-send · Hotkeys: [A] Approve · [E] Edit · [R] Regenerate · [J/K] Navigate
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleApproveAll}
            icon={<Check className="w-3.5 h-3.5" />}
          >
            Approve All Passing Checks ({drafts.filter((d) => d.preSendChecks.every((c) => c.passed)).length})
          </Button>
        </div>
      </div>

      {/* Main Review Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Pane (4 cols / 340px): Queue List */}
        <div className="lg:col-span-4 bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] overflow-hidden shadow-xs flex flex-col">
          {/* Sub-tabs */}
          <div className="flex items-center border-b border-[#E2DACB] bg-[#FBF9F4] p-1.5 gap-1 text-[12.5px]">
            {[
              { id: 'ALL', label: 'All', count: drafts.length },
              { id: 'A', label: 'Group A', count: drafts.filter((d) => d.group === 'A').length },
              { id: 'B', label: 'Group B', count: drafts.filter((d) => d.group === 'B').length },
              { id: 'C', label: 'Group C', count: drafts.filter((d) => d.group === 'C').length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveGroupFilter(tab.id as any)}
                className={`flex-1 py-1 px-2 rounded-[6px] font-medium text-center transition-colors ${
                  activeGroupFilter === tab.id
                    ? 'bg-[#FFFFFF] text-[#2A211B] shadow-xs border border-[#CFC5B2]'
                    : 'text-[#766A5E] hover:text-[#2A211B]'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Draft Item Cards */}
          <div className="divide-y divide-[#E2DACB]/60 max-h-[680px] overflow-y-auto">
            {filteredDrafts.map((draft) => {
              const isSelected = draft.id === selectedDraft?.id;
              const hasCheckFailed = draft.preSendChecks.some((c) => !c.passed);

              return (
                <div
                  key={draft.id}
                  onClick={() => setSelectedDraftId(draft.id)}
                  className={`p-3.5 text-left cursor-pointer transition-colors duration-120 ${
                    isSelected
                      ? 'bg-[#E3EBE5]/60 border-l-3 border-[#2F4A3F]'
                      : 'hover:bg-[#EFE9DD]/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1.5 mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <GroupDot group={draft.group} size="sm" />
                      <span className="font-semibold text-[13.5px] text-[#2A211B] truncate">
                        {draft.recipientBusiness}
                      </span>
                    </div>
                    {hasCheckFailed ? (
                      <span
                        className="text-[#A63D2F] shrink-0"
                        title="Failed pre-send compliance check"
                      >
                        <AlertTriangle className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="text-[#3F7D58] shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                  <div className="text-[12.5px] font-medium text-[#5E5249] truncate">
                    {draft.subject}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#766A5E] mt-1.5">
                    <span className="capitalize">{draft.approach.replace('_', ' ')}</span>
                    <span className="tabular-nums">{draft.scheduledTime}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Pane (8 cols): Draft Workspace */}
        {selectedDraft ? (
          <div className="lg:col-span-8 bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] p-5 shadow-[0_1px_2px_rgba(42,33,27,0.06)] space-y-5">
            {/* Warning strip if check failed (Hartwell & Finch Wow Moment) */}
            {failingCheck && (
              <div className="p-3 bg-[#F6E0DC] border border-[#E8BCB4] rounded-[8px] flex items-start justify-between gap-3 text-[#75261B] text-[13px] animate-in fade-in duration-200">
                <div className="flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#A63D2F] shrink-0 mt-0.5" />
                  <div>
                    <strong>APPROVAL BLOCKED BY PRE-SEND SAFETY CHECK:</strong>
                    <div className="mt-0.5 text-[12px] text-[#A63D2F]">
                      {failingCheck.reason || 'Draft mentions an unapproved discount or claim.'}
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="bg-white border-[#A63D2F]/30 text-[#A63D2F] shrink-0"
                >
                  Edit Draft
                </Button>
              </div>
            )}

            {/* Email Meta Header */}
            <div className="bg-[#FBF9F4] p-3.5 rounded-[8px] border border-[#E2DACB] space-y-2 text-[13px]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#766A5E] font-medium w-12">To:</span>
                  <span className="text-[#2A211B] font-semibold">
                    {selectedDraft.recipientBusiness} &lt;{selectedDraft.recipientEmail}&gt;
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11.5px] text-[#2F4A3F] font-semibold bg-[#E3EBE5] px-2 py-0.5 rounded">
                  <span>Outlook Delegated OAuth (Marcus Delgado)</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[#766A5E] font-medium w-12">Slot:</span>
                  <span className="text-[#2A211B] font-mono text-[12.5px]">
                    {selectedDraft.scheduledTime} ET (Paced interval)
                  </span>
                </div>
              </div>
            </div>

            {/* Approach Switcher (Segmented Control) */}
            <div className="space-y-1.5">
              <span className="text-[11.5px] font-semibold text-[#766A5E] uppercase tracking-wider">
                Outreach Approach:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-[#EFE9DD] p-1 rounded-[8px] text-[12.5px]">
                {[
                  { id: 'brief_intro', label: 'Brief Intro' },
                  { id: 'wholesale_pricing', label: 'Wholesale Pricing' },
                  { id: 'new_merchandise', label: 'New Merchandise' },
                  { id: 'question', label: 'Short Question' },
                ].map((appr) => (
                  <button
                    key={appr.id}
                    onClick={() => handleApproachSwitch(appr.id as any)}
                    className={`py-1.5 px-2 rounded-[6px] font-medium text-center transition-colors cursor-pointer ${
                      selectedDraft.approach === appr.id
                        ? 'bg-[#FFFFFF] text-[#2A211B] shadow-xs font-semibold'
                        : 'text-[#766A5E] hover:text-[#2A211B]'
                    }`}
                  >
                    {appr.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Line */}
            <div className="space-y-1">
              <label className="text-[12px] font-semibold text-[#766A5E] uppercase tracking-wider">
                Subject Line
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editSubject}
                  onChange={(e) => setEditSubject(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#2F4A3F] rounded-[8px] px-3 py-2 text-[14px] text-[#2A211B] font-medium outline-none"
                />
              ) : (
                <div className="text-[15px] font-semibold text-[#2A211B] p-2 bg-[#FBF9F4] rounded-[6px] border border-[#E2DACB]">
                  {selectedDraft.subject}
                </div>
              )}
            </div>

            {/* Body Workspace with Grounded Highlights */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[12px] text-[#766A5E]">
                <span className="font-semibold uppercase tracking-wider">Email Body</span>
                <span className="text-[11px] text-[#B08D57] font-medium">
                  Highlighted phrases are grounded in QuickBooks or Catalog
                </span>
              </div>

              {isEditing ? (
                <textarea
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  rows={8}
                  className="w-full bg-[#FFFFFF] border border-[#2F4A3F] rounded-[8px] p-3.5 text-[14.5px] font-sans leading-relaxed text-[#2A211B] outline-none"
                />
              ) : (
                <div className="p-4 bg-[#FFFFFF] border border-[#E2DACB] rounded-[8px] text-[14.5px] leading-relaxed text-[#2A211B] whitespace-pre-line relative">
                  {/* Highlight grounded text with brass-soft background */}
                  {selectedDraft.body}
                </div>
              )}

              {/* Grounding Provenance Strip */}
              <div className="p-3 bg-[#EFE4CF]/60 border border-[#DFCBB0] rounded-[8px] space-y-1 text-[12px] text-[#7A4E2D]">
                <div className="font-semibold flex items-center gap-1.5 text-[12px]">
                  <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
                  <span>Verified Grounding Sources:</span>
                </div>
                <div className="space-y-1">
                  {selectedDraft.groundedPhrases.map((phrase, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#B08D57] font-bold">↳</span>
                      <span>
                        "{phrase.text}" — <strong className="text-[#2A211B]">{phrase.source}</strong>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Recommendations Strip */}
            <div className="space-y-2">
              <span className="text-[11.5px] font-semibold text-[#766A5E] uppercase tracking-wider">
                Complementary In-Stock Catalog Items Suggested:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {selectedDraft.recommendationProductIds.map((prodId) => {
                  const prod = products.find((p) => p.id === prodId);
                  if (!prod) return null;
                  return (
                    <div
                      key={prod.id}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-[#FBF9F4] border border-[#E2DACB] text-[12.5px] text-[#2A211B]"
                    >
                      <Package className="w-3.5 h-3.5 text-[#766A5E]" />
                      <span className="font-medium">{prod.name}</span>
                      <span className="text-[11px] text-[#3F7D58] font-bold bg-[#E2F0E7] px-1.5 py-0.2 rounded">
                        ${prod.wholesalePrice.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pre-Send Compliance Checks Strip (5 Checks) */}
            <div className="p-4 bg-[#FBF9F4] border border-[#E2DACB] rounded-[10px] space-y-2">
              <div className="flex items-center justify-between text-[12px] font-semibold uppercase tracking-wider text-[#766A5E]">
                <span>5 Pre-Send Compliance Checks</span>
                <span>Enforced prior to dispatch</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[12.5px]">
                {selectedDraft.preSendChecks.map((check) => (
                  <div
                    key={check.id}
                    className={`flex items-center gap-2 p-2 rounded-[6px] border ${
                      check.passed
                        ? 'bg-[#E2F0E7]/60 border-[#C1DEC9] text-[#1F5333]'
                        : 'bg-[#F6E0DC] border-[#E8BCB4] text-[#75261B] font-semibold'
                    }`}
                  >
                    {check.passed ? (
                      <Check className="w-3.5 h-3.5 text-[#3F7D58] shrink-0" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-[#A63D2F] shrink-0" />
                    )}
                    <span className="truncate">{check.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why This Draft Collapsible Context */}
            <div className="p-3 bg-[#FFFFFF] border border-[#E2DACB] rounded-[8px] text-[12.5px] text-[#5E5249] space-y-1">
              <div className="font-semibold text-[#2A211B]">Why this draft was prepared:</div>
              <div>{selectedDraft.whyThisDraft.relationshipSummary}</div>
              <div className="text-[11.5px] text-[#766A5E]">
                Rules applied: {selectedDraft.whyThisDraft.rulesApplied.join(' · ')}
              </div>
            </div>

            {/* Compliance Footer Preview */}
            <div className="p-3 bg-[#EFE9DD]/50 border border-[#E2DACB] rounded-[6px] text-[11px] text-[#766A5E] leading-relaxed">
              <strong>Outbound Footer Preview:</strong> {BRAND.physicalAddress} · Not interested? Reply
              "no thanks" or click 1-click unsubscribe to be permanently removed from all outreach.
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E2DACB]">
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Button size="sm" onClick={handleSaveEdit}>
                      Save Changes
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="md"
                      onClick={handleApprove}
                      disabled={Boolean(failingCheck) || isPaused}
                      icon={<Check className="w-4 h-4" />}
                    >
                      Approve & Schedule
                    </Button>
                    <Button
                      size="md"
                      variant="secondary"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Text
                    </Button>
                    <Button
                      size="md"
                      variant="secondary"
                      onClick={handleRegenerate}
                      loading={isRegenerating}
                      icon={<RotateCw className="w-3.5 h-3.5" />}
                    >
                      Regenerate
                    </Button>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleSaveExample}
                  icon={<ThumbsUp className="w-3.5 h-3.5 text-[#3F7D58]" />}
                >
                  Save as Voice Example
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const reason = window.prompt('Reason for rejecting draft (used for learning):', 'Too pushy');
                    if (reason) rejectDraft(selectedDraft.id, reason);
                  }}
                  className="text-[#A63D2F]"
                  icon={<XCircle className="w-3.5 h-3.5" />}
                >
                  Reject
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
