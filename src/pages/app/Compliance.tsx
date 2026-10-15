import React, { useState } from 'react';
import {
  ShieldCheck,
  UserX,
  Plus,
  Upload,
  Ban,
  CheckCircle2,
  Lock,
  Mail,
  FileText,
  AlertCircle,
  Trash2,
} from 'lucide-react';
import { useCedarStore } from '../../store/useCedarStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { BRAND } from '../../config/brand';
import { useToast } from '../../components/ui/Toast';

export const CompliancePage: React.FC = () => {
  const { dncList, addToDnc, removeFromDnc } = useCedarStore();
  const { showToast } = useToast();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newTarget, setNewTarget] = useState('');
  const [newReason, setNewReason] = useState('Manual addition by sales manager');

  const handleAddDnc = () => {
    if (!newTarget.trim()) return;
    addToDnc(newTarget.trim(), newReason);
    setNewTarget('');
    setAddModalOpen(false);
    showToast({
      type: 'warning',
      message: `${newTarget} added to Do-Not-Contact. Queued messages suppressed across all mailboxes.`,
    });
  };

  const handleRemove = (id: string, target: string) => {
    if (window.confirm(`Remove ${target} from Do-Not-Contact registry?`)) {
      removeFromDnc(id);
      showToast({ type: 'info', message: `${target} removed from DNC registry.` });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2DACB]">
        <div>
          <h1 className="font-serif text-[28px] text-[#2A211B] font-medium leading-tight">
            Commercial Email Compliance & Do-Not-Contact
          </h1>
          <p className="text-[14px] text-[#5E5249]">
            Universal opt-out enforcement, suppression registry, and tobacco B2B restrictions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setAddModalOpen(true)}
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Add to Do-Not-Contact
          </Button>
        </div>
      </div>

      {/* Mandatory Tobacco B2B Compliance Guardrails (PRD Section 3) */}
      <div className="p-4 bg-[#E3EBE5] border border-[#BDD1C3] rounded-[10px] space-y-2">
        <div className="flex items-center gap-2 font-semibold text-[#1F5333] text-[14px]">
          <Lock className="w-4 h-4 text-[#3F7D58]" />
          <span>Industry Specific Guardrails (Locked & Enforced)</span>
        </div>
        <p className="text-[12.5px] text-[#2F4A3F] leading-relaxed">
          Because cigar accessories and humidor wholesale are tobacco-adjacent, the system enforces the following non-negotiable rules across all reps:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1 text-[12px] text-[#1E3129]">
          <div className="p-2.5 bg-white/80 rounded border border-[#C1DEC9]">
            <strong>1. Licensed Retailers Only:</strong> Outreach strictly restricted to verified business-to-business retail lounges and tobacconists. Zero consumer contact.
          </div>
          <div className="p-2.5 bg-white/80 rounded border border-[#C1DEC9]">
            <strong>2. Immediate Opt-Out Honor:</strong> Opt-outs via link click or "no thanks" reply permanently suppress all future touches across all 3 reps.
          </div>
          <div className="p-2.5 bg-white/80 rounded border border-[#C1DEC9]">
            <strong>3. Physical Identity:</strong> Full physical Florida warehouse address and verified company wordmark present on every outbound email.
          </div>
        </div>
      </div>

      {/* Do-Not-Contact Registry Table */}
      <div className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] overflow-hidden shadow-xs space-y-3 p-4">
        <div className="flex items-center justify-between border-b border-[#E2DACB] pb-3">
          <div>
            <h3 className="font-serif text-[17px] text-[#2A211B] font-medium">
              Do-Not-Contact Registry ({dncList.length})
            </h3>
            <p className="text-[12.5px] text-[#766A5E]">
              Addresses and domains suppressed globally from all three workflows
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13.5px]">
            <thead>
              <tr className="bg-[#EFE9DD] border-b border-[#E2DACB] text-[12px] font-semibold text-[#766A5E] uppercase tracking-wider">
                <th className="py-2.5 px-3">Suppressed Target (Email or Domain)</th>
                <th className="py-2.5 px-3">Reason for Suppression</th>
                <th className="py-2.5 px-3">Date Added</th>
                <th className="py-2.5 px-3">Authorized By</th>
                <th className="py-2.5 px-3 w-16">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DACB]/60">
              {dncList.map((entry) => (
                <tr key={entry.id} className="hover:bg-[#FBF9F4]">
                  <td className="py-2.5 px-3 font-mono font-semibold text-[#2A211B]">
                    {entry.target}
                  </td>
                  <td className="py-2.5 px-3 text-[#5E5249]">{entry.reason}</td>
                  <td className="py-2.5 px-3 tabular-nums text-[#766A5E]">{entry.dateAdded}</td>
                  <td className="py-2.5 px-3 text-[#5E5249]">{entry.addedBy}</td>
                  <td className="py-2.5 px-3">
                    <button
                      onClick={() => handleRemove(entry.id, entry.target)}
                      className="text-[#A63D2F] hover:text-[#75261B] p-1 rounded"
                      title="Remove from DNC"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Outbound Email Footer Preview */}
      <div className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] p-5 shadow-xs space-y-3">
        <h3 className="font-serif text-[16px] text-[#2A211B] font-medium">
          Outbound Commercial Footer Preview
        </h3>
        <p className="text-[12.5px] text-[#766A5E]">
          Attached automatically to every email sent through Microsoft Graph
        </p>

        <div className="p-4 bg-[#FBF9F4] border border-[#E2DACB] rounded-[8px] text-[12px] text-[#5E5249] font-sans leading-relaxed space-y-1">
          <div>—</div>
          <div className="font-semibold text-[#2A211B]">Marcus Delgado · Senior Wholesale Rep</div>
          <div>Prestige Import Group · Direct Importer of Spanish Cedar Humidors & Accessories</div>
          <div className="text-[#766A5E]">{BRAND.physicalAddress}</div>
          <div className="text-[11.5px] text-[#766A5E] pt-2 border-t border-[#E2DACB]/60">
            You received this commercial B2B message because your retail store carries cigar and humidor accessories.
            To stop receiving messages, reply "no thanks" or{' '}
            <span className="text-[#2F4A3F] underline cursor-pointer">click here to opt out permanently</span>.
          </div>
        </div>
      </div>

      {/* Add to DNC Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add to Do-Not-Contact List"
        subtitle="Immediately halt all queued emails and permanently blacklist recipient"
      >
        <div className="space-y-4">
          <Input
            label="Email Address or Domain"
            placeholder="e.g. buyer@retailer.example or retailer.example"
            value={newTarget}
            onChange={(e) => setNewTarget(e.target.value)}
          />

          <div className="space-y-1">
            <label className="text-[13px] font-medium text-[#2A211B]">Suppression Reason</label>
            <select
              value={newReason}
              onChange={(e) => setNewReason(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#CFC5B2] rounded-[8px] p-2 text-[13.5px] outline-none"
            >
              <option value="Unsubscribed (one-click link)">Unsubscribed (one-click link)</option>
              <option value="Asked to stop via email reply">Asked to stop via email reply</option>
              <option value="Hard bounce (Mailbox not found)">Hard bounce (Mailbox not found)</option>
              <option value="Manual addition by sales manager">Manual addition by sales manager</option>
            </select>
          </div>

          <div className="p-3 bg-[#F6E0DC] rounded-[8px] border border-[#E8BCB4] text-[12.5px] text-[#75261B] flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-[#A63D2F] shrink-0 mt-0.5" />
            <span>
              Adding this target will cancel all queued drafts and block any future sequence steps across Marcus, Priya, and Tom.
            </span>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleAddDnc}>
              Suppress Target
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
