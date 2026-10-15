import React, { useState } from 'react';
import {
  ClipboardList,
  Copy,
  ExternalLink,
  Check,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCedarStore } from '../../store/useCedarStore';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';

export const ManualListPage: React.FC = () => {
  const { contacts, markManualDone } = useCedarStore();
  const { showToast } = useToast();

  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter contacts needing manual person (formStatus === 'needs_person')
  const manualContacts = contacts.filter(
    (c) => c.route === 'form' && c.formStatus === 'needs_person' && c.status === 'needs_person'
  );

  const completedCount = 6 - manualContacts.length;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast({ type: 'success', message: 'Prepared message copied to clipboard.' });
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleMarkDone = (id: string, business: string) => {
    markManualDone(id);
    showToast({
      type: 'success',
      message: `Form marked as completed for ${business}.`,
    });
  };

  const defaultMessage = (business: string) =>
    `Hello ${business} Purchasing Team,\n\nMy name is Marcus Delgado with Prestige Import Group in Florida. We are a direct wholesale importer of Spanish cedar humidors, electronic climate cabinets, and retail cigar accessories.\n\nWe supply retail tobacconists across the region with volume pricing. Would you be open to receiving our wholesale catalog and dealer price list?\n\nSincerely,\nMarcus Delgado · Prestige Import Group\nmarcus@prestigeimport.example`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2DACB]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              to="/app/prospects"
              className="text-[#766A5E] hover:text-[#2A211B] flex items-center gap-1 text-[13px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Prospects</span>
            </Link>
          </div>
          <h1 className="font-serif text-[28px] text-[#2A211B] font-medium leading-tight mt-1">
            Today's Manual Contact Forms ({manualContacts.length})
          </h1>
          <p className="text-[14px] text-[#5E5249]">
            Morning rep queue for retail websites with CAPTCHAs or custom interactive forms
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="bg-[#FFFFFF] p-3 rounded-[10px] border border-[#E2DACB] text-right min-w-[200px]">
          <div className="text-[12px] font-semibold text-[#766A5E]">
            Queue Progress: {completedCount} of 6 Completed
          </div>
          <div className="w-full bg-[#EFE9DD] h-2 rounded-full overflow-hidden mt-1.5">
            <div
              className="bg-[#3F7D58] h-full transition-all duration-300"
              style={{ width: `${(completedCount / 6) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Compliance Box: No CAPTCHA Bypass (PRD Requirement #9) */}
      <div className="p-4 bg-[#F7EAD0] border border-[#E8D1A8] rounded-[10px] text-[13px] text-[#7D5010] flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-[#B7791F] shrink-0 mt-0.5" />
        <div>
          <div className="font-serif font-semibold text-[14px] text-[#2A211B]">
            Strict Anti-Abuse & Website Policy:
          </div>
          <p className="text-[#5E5249] mt-0.5 leading-relaxed">
            Cedar strictly honors website terms of service and <strong>never solves or bypasses CAPTCHAs</strong> with automated bots. Contacts with interactive verification appear here so a sales rep can paste the prepared message in 15 seconds.
          </p>
        </div>
      </div>

      {/* Contact Cards List */}
      {manualContacts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {manualContacts.map((contact) => {
            const message = defaultMessage(contact.business);
            const isCopied = copiedId === contact.id;

            return (
              <div
                key={contact.id}
                className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] p-5 shadow-[0_1px_2px_rgba(42,33,27,0.06)] space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-serif text-[18px] text-[#2A211B] font-semibold">
                        {contact.business}
                      </h3>
                      <div className="text-[12.5px] text-[#5E5249]">
                        {contact.city}, {contact.state} · {contact.website}
                      </div>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#F7EAD0] text-[#7D5010] border border-[#E8D1A8] flex items-center gap-1 shrink-0">
                      <AlertTriangle className="w-3 h-3 text-[#B7791F]" />
                      <span>Needs a Person (CAPTCHA)</span>
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11.5px] text-[#766A5E]">
                      <span className="font-semibold uppercase tracking-wider">Prepared Message</span>
                      <span>Verified US B2B wholesale intro</span>
                    </div>
                    <div className="p-3 bg-[#FBF9F4] border border-[#E2DACB] rounded-[8px] text-[12.5px] text-[#2A211B] font-mono leading-relaxed whitespace-pre-line max-h-36 overflow-y-auto">
                      {message}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E2DACB]">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleCopy(contact.id, message)}
                    icon={
                      isCopied ? (
                        <Check className="w-3.5 h-3.5 text-[#3F7D58]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )
                    }
                  >
                    {isCopied ? 'Copied to Clipboard' : 'Copy Prepared Message'}
                  </Button>

                  <div className="flex items-center gap-2">
                    <a
                      href={contact.contactUrl || contact.website || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[12.5px] font-medium text-[#2F4A3F] hover:underline px-2 py-1"
                    >
                      <span>Open Website Form</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <Button
                      size="sm"
                      onClick={() => handleMarkDone(contact.id, contact.business)}
                      icon={<Check className="w-3.5 h-3.5" />}
                    >
                      Mark as Done
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-[#FFFFFF] border border-[#E2DACB] rounded-[14px] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#E2F0E7] text-[#3F7D58] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-[20px] text-[#2A211B] font-medium">
            That's everyone for today!
          </h2>
          <p className="text-[14px] text-[#5E5249] max-w-md mx-auto">
            All manual website forms have been submitted and checked off. New form-only accounts discovered tomorrow will appear here.
          </p>
        </div>
      )}
    </div>
  );
};
