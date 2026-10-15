import React, { useState } from 'react';
import {
  X,
  Copy,
  Mail,
  Calendar,
  Pause,
  Play,
  UserCheck,
  Ban,
  MessageSquare,
  Package,
  FileText,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Plus,
  KeyRound,
} from 'lucide-react';
import { useCedarStore } from '../../store/useCedarStore';
import { Drawer } from '../../components/ui/Drawer';
import { StatusPill } from '../../components/ui/StatusPill';
import { GroupDot } from '../../components/ui/GroupDot';
import { Button } from '../../components/ui/Button';
import { Timeline } from '../../components/app/Timeline';
import { useToast } from '../../components/ui/Toast';
import { WholesaleAccountModal } from '../../components/app/WholesaleAccountModal';

export const ContactDetailDrawer: React.FC<{
  contactId: string | null;
  onClose: () => void;
}> = ({ contactId, onClose }) => {
  const {
    contacts,
    takeOverContact,
    simulateReply,
    toggleContactPause,
    addToDnc,
    updateContactNextFollowUp,
  } = useCedarStore();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'timeline' | 'messages' | 'orders' | 'notes'>('timeline');
  const [newNote, setNewNote] = useState('');
  const [wholesaleModalOpen, setWholesaleModalOpen] = useState(false);

  const contact = contacts.find((c) => c.id === contactId);

  if (!contact) return null;

  const handleSimulateReply = () => {
    simulateReply(contact.id);
    showToast({
      type: 'success',
      message: `${contact.business} replied: 'Yes, send me the new cabinet pricing' (Hot lead)`,
    });
  };

  const handleTakeover = () => {
    if (
      window.confirm(
        'Cedar will permanently stop all automated follow-ups to this account and leave the conversation entirely to you in Outlook. Confirm?'
      )
    ) {
      takeOverContact(contact.id);
      showToast({
        type: 'success',
        message: `You're handling ${contact.business}. Automated messages stopped.`,
      });
    }
  };

  const handleCopyEmail = () => {
    if (contact.email) {
      navigator.clipboard.writeText(contact.email);
      showToast({ type: 'info', message: 'Email copied to clipboard.' });
    }
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    contact.notes.unshift({
      id: `n-${Date.now()}`,
      author: 'Marcus Delgado',
      createdAt: 'Just now',
      text: newNote.trim(),
    });
    setNewNote('');
    showToast({ type: 'success', message: 'Note added to account file.' });
  };

  const isPaused = contact.status === 'paused';
  const isRepHandling = contact.status === 'rep_handling';
  const isReplied = contact.status === 'replied';

  return (
    <>
      <Drawer
        isOpen={Boolean(contactId)}
        onClose={onClose}
        width="max-w-[660px]"
        title={
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-serif text-[22px] font-semibold text-[#2A211B]">
                {contact.business}
              </span>
              <StatusPill status={contact.status} />
            </div>
            <div className="flex items-center gap-3 text-[13px] text-[#5E5249]">
              <span>
                {contact.city}, {contact.state}
              </span>
              <span>·</span>
              <GroupDot group={contact.group} showLabel />
              {contact.contactName && (
                <>
                  <span>·</span>
                  <span>Contact: {contact.contactName}</span>
                </>
              )}
            </div>
          </div>
        }
      >
        <div className="space-y-6">
          {/* Rep Handing Banner if taken over */}
          {isRepHandling && (
            <div className="p-3 bg-[#E3EBE5] border border-[#BDD1C3] rounded-[8px] text-[13px] text-[#1E3129] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#2F4A3F]" />
                <span>
                  <strong>You're handling this conversation:</strong> Automated follow-ups are halted.
                </span>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-2 p-3 bg-[#FBF9F4] rounded-[10px] border border-[#E2DACB]">
            {/* Primary Take Over CTA */}
            {!isRepHandling && (
              <Button
                size="sm"
                variant="primary"
                onClick={handleTakeover}
                icon={<UserCheck className="w-3.5 h-3.5" />}
              >
                Take Over in Outlook
              </Button>
            )}

            {/* Wow Moment #2: Simulate Reply Button */}
            {!isReplied && !isRepHandling && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleSimulateReply}
                className="border-dashed border-[#3F7D58] text-[#1F5333] hover:bg-[#E2F0E7]"
                icon={<MessageSquare className="w-3.5 h-3.5 text-[#3F7D58]" />}
              >
                Simulate Reply (Demo)
              </Button>
            )}

            {/* Pause / Resume */}
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                toggleContactPause(contact.id);
                showToast({
                  type: 'info',
                  message: isPaused ? 'Sequence resumed.' : 'Account outreach paused.',
                });
              }}
              icon={isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </Button>

            {/* Group C Wholesale Account Generation */}
            {contact.group === 'C' && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setWholesaleModalOpen(true)}
                icon={<KeyRound className="w-3.5 h-3.5 text-[#B08D57]" />}
              >
                {contact.wholesaleAccountStatus === 'invited'
                  ? 'Wholesale Invited'
                  : 'Wholesale Invite'}
              </Button>
            )}

            {/* Add to DNC */}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                if (contact.email && window.confirm(`Suppress ${contact.email} on Do-Not-Contact?`)) {
                  addToDnc(contact.email, 'Added from account drawer');
                  showToast({ type: 'warning', message: 'Added to DNC and queued sends cancelled.' });
                }
              }}
              className="text-[#A63D2F] hover:bg-[#F6E0DC]"
              icon={<Ban className="w-3.5 h-3.5" />}
            >
              DNC
            </Button>
          </div>

          {/* Next Step Card */}
          <div
            className={`p-4 rounded-[10px] border ${
              isPaused
                ? 'bg-[#EFE9DD] border-[#D9D0C1]'
                : isReplied || isRepHandling
                ? 'bg-[#E2F0E7]/60 border-[#C1DEC9]'
                : 'bg-[#FFFFFF] border-[#E2DACB] shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between text-[12px] font-semibold uppercase tracking-wider text-[#766A5E] mb-1">
              <span>Next Automation Status</span>
              <span>Assigned Rep: {contact.repId.toUpperCase()}</span>
            </div>

            {isPaused ? (
              <div className="text-[13.5px] font-medium text-[#5E5249]">
                Paused by Marcus. No automatic sends scheduled.
              </div>
            ) : isReplied ? (
              <div className="text-[13.5px] font-medium text-[#1F5333] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3F7D58]" />
                <span>
                  Sequence cancelled due to customer response. Ready for personal reply in Outlook.
                </span>
              </div>
            ) : isRepHandling ? (
              <div className="text-[13.5px] font-medium text-[#1E3129]">
                Rep Marcus Delgado is handling all correspondence directly.
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3 pt-1">
                <div>
                  <div className="text-[14px] font-semibold text-[#2A211B]">
                    Step {contact.followUpsSent + 1} of {contact.followUpsMax} · Next Send:{' '}
                    {contact.nextFollowUp || 'Unscheduled'}
                  </div>
                  <div className="text-[12px] text-[#5E5249]">
                    Draft created via Outlook Microsoft Graph Delegated OAuth
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    const newDate = window.prompt(
                      'Reschedule next send date (YYYY-MM-DD):',
                      contact.nextFollowUp || '2026-10-18'
                    );
                    if (newDate) {
                      updateContactNextFollowUp(contact.id, newDate);
                      showToast({ type: 'success', message: 'Send date shifted.' });
                    }
                  }}
                >
                  Reschedule
                </Button>
              </div>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-[#E2DACB] flex items-center gap-2">
            {[
              { id: 'timeline', label: 'Timeline History' },
              { id: 'messages', label: `Messages (${contact.messages.length})` },
              { id: 'orders', label: `QuickBooks Orders (${contact.orders.length})` },
              { id: 'notes', label: `Notes (${contact.notes.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-3 text-[13.5px] font-medium border-b-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-[#2F4A3F] text-[#2F4A3F] font-semibold'
                    : 'border-transparent text-[#5E5249] hover:text-[#2A211B]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Timeline */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <Timeline events={contact.timeline} />
            </div>
          )}

          {/* Tab 2: Messages (Outlook Thread) */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              {contact.messages.length > 0 ? (
                <div className="space-y-3">
                  {contact.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-[10px] border space-y-2 ${
                        msg.sender === 'customer'
                          ? 'bg-[#E2F0E7]/50 border-[#C1DEC9] ml-4'
                          : 'bg-[#FFFFFF] border-[#E2DACB] mr-4'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[12px] text-[#766A5E] pb-1 border-b border-[#E2DACB]/60">
                        <span className="font-semibold text-[#2A211B]">{msg.authorName}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <div className="font-semibold text-[13.5px] text-[#2A211B]">{msg.subject}</div>
                      <p className="text-[13px] text-[#5E5249] whitespace-pre-line leading-relaxed">
                        {msg.body}
                      </p>
                      {msg.isSentFromOutlook && (
                        <div className="pt-2 text-[11px] text-[#3F7D58] font-medium flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          <span>Sent from Outlook · Appears in Sent Items</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-[#766A5E] bg-[#FBF9F4] rounded-[10px] border border-[#E2DACB] text-[13px]">
                  No sent messages recorded yet. A draft is prepared in the Review Queue.
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Orders (QuickBooks History) */}
          {activeTab === 'orders' && (
            <div className="space-y-3">
              {contact.orders.length > 0 ? (
                contact.orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 bg-[#FFFFFF] border border-[#E2DACB] rounded-[10px] space-y-2.5 shadow-xs"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#E2DACB]">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-[#3D6A8A]" />
                        <span className="font-semibold text-[14px] text-[#2A211B]">
                          QuickBooks {order.invoiceNumber}
                        </span>
                      </div>
                      <span className="font-serif text-[16px] text-[#2A211B] font-semibold tabular-nums">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>

                    <div className="text-[12.5px] text-[#5E5249] flex justify-between">
                      <span>Order Date: {order.date}</span>
                      <span>Shipped: {order.shippedDate || 'Confirmed delivered'}</span>
                    </div>

                    <div className="space-y-1 pt-1">
                      <div className="text-[11px] font-semibold text-[#766A5E] uppercase tracking-wider">
                        Purchased Items
                      </div>
                      {order.items.map((it, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between text-[13px] text-[#2A211B] py-0.5 border-b border-[#E2DACB]/40 last:border-none"
                        >
                          <span>
                            {it.qty} × {it.name}
                          </span>
                          <span className="tabular-nums text-[#766A5E]">
                            ${(it.qty * it.price).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-[#766A5E] bg-[#FBF9F4] rounded-[10px] border border-[#E2DACB] text-[13px]">
                  No prior QuickBooks invoices found for this prospect account.
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Notes */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a rep account note..."
                  rows={3}
                  className="w-full bg-[#FFFFFF] border border-[#CFC5B2] rounded-[8px] p-3 text-[13.5px] outline-none focus:border-[#2F4A3F]"
                />
                <div className="flex justify-end">
                  <Button size="sm" onClick={handleAddNote}>
                    Save Note
                  </Button>
                </div>
              </div>

              <div className="space-y-2 divide-y divide-[#E2DACB]/60">
                {contact.notes.map((note) => (
                  <div key={note.id} className="pt-2.5 text-[13px] space-y-1">
                    <div className="flex justify-between text-[11.5px] text-[#766A5E]">
                      <span className="font-semibold text-[#2A211B]">{note.author}</span>
                      <span>{note.createdAt}</span>
                    </div>
                    <p className="text-[#5E5249] leading-relaxed">{note.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Drawer>

      <WholesaleAccountModal
        contact={contact}
        isOpen={wholesaleModalOpen}
        onClose={() => setWholesaleModalOpen(false)}
      />
    </>
  );
};
