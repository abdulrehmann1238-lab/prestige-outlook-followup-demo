import React, { useState } from 'react';
import {
  GitFork,
  Clock,
  ShieldCheck,
  Check,
  AlertTriangle,
  RotateCcw,
  Save,
  ArrowRight,
  Lock,
} from 'lucide-react';
import { useCedarStore } from '../../store/useCedarStore';
import { GroupDot } from '../../components/ui/GroupDot';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';

export const SequencesPage: React.FC = () => {
  const {
    inactiveThreshold,
    setInactiveThreshold,
    postOrderDays,
    setPostOrderDays,
  } = useCedarStore();
  const { showToast } = useToast();

  const [activeGroup, setActiveGroup] = useState<'A' | 'B' | 'C'>('A');

  const [stepDelaysA, setStepDelaysA] = useState([0, 5, 12, 21]);
  const [stepDelaysB, setStepDelaysB] = useState([14, 28]);
  const [stepDelaysC, setStepDelaysC] = useState([0, 6, 15]);

  const handleSave = () => {
    showToast({
      type: 'success',
      message: 'Sequence timing saved. Active account queues adjusted.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2DACB]">
        <div>
          <h1 className="font-serif text-[28px] text-[#2A211B] font-medium leading-tight">
            Sequences & Timing Control
          </h1>
          <p className="text-[14px] text-[#5E5249]">
            Adjust step intervals, cadence, and automatic sequence termination rules per workflow
          </p>
        </div>

        <Button onClick={handleSave} icon={<Save className="w-3.5 h-3.5" />}>
          Save Timing Rules
        </Button>
      </div>

      {/* Group Selector */}
      <div className="flex items-center gap-2 border-b border-[#E2DACB] pb-2">
        {[
          { id: 'A', label: 'Group A: Inactive Accounts', dot: 'A' },
          { id: 'B', label: 'Group B: Post-Order Customers', dot: 'B' },
          { id: 'C', label: 'Group C: Retail Prospects', dot: 'C' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveGroup(tab.id as any)}
            className={`flex items-center gap-2 py-2 px-3 text-[13.5px] rounded-[8px] transition-colors cursor-pointer ${
              activeGroup === tab.id
                ? 'bg-[#2F4A3F] text-white font-semibold'
                : 'bg-[#FFFFFF] text-[#5E5249] border border-[#CFC5B2] hover:bg-[#EFE9DD]'
            }`}
          >
            <GroupDot group={tab.dot as any} size="sm" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Configuration Card */}
      <div className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] p-6 shadow-[0_1px_2px_rgba(42,33,27,0.06)] space-y-6">
        {/* Step Diagram */}
        <div className="space-y-2">
          <h3 className="font-serif text-[17px] text-[#2A211B] font-medium">
            Touchpoint Cadence & Delays
          </h3>
          <p className="text-[13px] text-[#5E5249]">
            Each touchpoint is personalized using past order history or public catalog availability.
          </p>

          <div className="pt-4 flex flex-col md:flex-row items-stretch md:items-center gap-3 overflow-x-auto">
            {activeGroup === 'A' &&
              stepDelaysA.map((delay, idx) => (
                <React.Fragment key={idx}>
                  <div className="p-4 rounded-[10px] bg-[#FBF9F4] border border-[#E2DACB] flex-1 min-w-[180px] space-y-2">
                    <div className="flex items-center justify-between text-[12px] font-semibold text-[#7A4E2D] uppercase">
                      <span>Step {idx + 1}</span>
                      <span>Day +{delay}</span>
                    </div>
                    <div className="text-[14px] font-semibold text-[#2A211B]">
                      {idx === 0
                        ? 'QuickBooks Purchase Check-in'
                        : idx === 1
                        ? 'Catalog Complement Restock'
                        : idx === 2
                        ? 'New Cabinet Announcement'
                        : 'Final Gentle Touch'}
                    </div>
                    <div className="text-[11.5px] text-[#766A5E]">
                      Sent via Outlook with rep signature
                    </div>
                  </div>
                  {idx < stepDelaysA.length - 1 && (
                    <div className="hidden md:flex text-[#B08D57] shrink-0">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </React.Fragment>
              ))}

            {activeGroup === 'B' &&
              stepDelaysB.map((delay, idx) => (
                <React.Fragment key={idx}>
                  <div className="p-4 rounded-[10px] bg-[#FBF9F4] border border-[#E2DACB] flex-1 min-w-[200px] space-y-2">
                    <div className="flex items-center justify-between text-[12px] font-semibold text-[#3F7D58] uppercase">
                      <span>Step {idx + 1}</span>
                      <span>Day +{delay} Post-Shipment</span>
                    </div>
                    <div className="text-[14px] font-semibold text-[#2A211B]">
                      {idx === 0
                        ? 'Arrival & Condition Check'
                        : 'Complementary Accessories Restock'}
                    </div>
                    <div className="text-[11.5px] text-[#766A5E]">
                      Recommends dividers & hygrometers
                    </div>
                  </div>
                  {idx < stepDelaysB.length - 1 && (
                    <div className="hidden md:flex text-[#B08D57] shrink-0">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </React.Fragment>
              ))}

            {activeGroup === 'C' &&
              stepDelaysC.map((delay, idx) => (
                <React.Fragment key={idx}>
                  <div className="p-4 rounded-[10px] bg-[#FBF9F4] border border-[#E2DACB] flex-1 min-w-[180px] space-y-2">
                    <div className="flex items-center justify-between text-[12px] font-semibold text-[#3D6A8A] uppercase">
                      <span>Step {idx + 1}</span>
                      <span>Day +{delay}</span>
                    </div>
                    <div className="text-[14px] font-semibold text-[#2A211B]">
                      {idx === 0
                        ? 'Brief Wholesale Introduction'
                        : idx === 1
                        ? 'Dealer Price Sheet Offer'
                        : 'Low-Pressure Follow-up'}
                    </div>
                    <div className="text-[11.5px] text-[#766A5E]">
                      Verified US tobacconists only
                    </div>
                  </div>
                  {idx < stepDelaysC.length - 1 && (
                    <div className="hidden md:flex text-[#B08D57] shrink-0">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </React.Fragment>
              ))}
          </div>
        </div>

        {/* Group Specific Rules */}
        <div className="p-4 bg-[#FBF9F4] border border-[#E2DACB] rounded-[10px] space-y-3">
          <h4 className="font-serif text-[15px] text-[#2A211B] font-medium">
            Workflow Specific Parameters
          </h4>

          {activeGroup === 'A' && (
            <div className="flex items-center justify-between text-[13px] text-[#2A211B]">
              <div>
                <span className="font-semibold">Reactivate accounts inactive for:</span>
                <p className="text-[12px] text-[#766A5E]">
                  Pulls from QuickBooks invoice history. Accounts without orders beyond this threshold enter Group A.
                </p>
              </div>
              <div className="flex items-center gap-2">
                {[90, 180, 240].map((d) => (
                  <button
                    key={d}
                    onClick={() => setInactiveThreshold(d)}
                    className={`px-3 py-1 rounded-[6px] font-semibold text-[12.5px] border ${
                      inactiveThreshold === d
                        ? 'bg-[#7A4E2D] text-white border-[#7A4E2D]'
                        : 'bg-white text-[#7A4E2D] border-[#CFC5B2]'
                    }`}
                  >
                    {d} Days
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeGroup === 'B' && (
            <div className="flex items-center justify-between text-[13px] text-[#2A211B]">
              <div>
                <span className="font-semibold">Initial Post-Order Check-in:</span>
                <p className="text-[12px] text-[#766A5E]">
                  Triggered after QuickBooks marks shipment delivered. 60-day lockout prevents duplicate touches.
                </p>
              </div>
              <div className="flex items-center gap-2">
                {[10, 14, 21].map((d) => (
                  <button
                    key={d}
                    onClick={() => setPostOrderDays(d)}
                    className={`px-3 py-1 rounded-[6px] font-semibold text-[12.5px] border ${
                      postOrderDays === d
                        ? 'bg-[#3F7D58] text-white border-[#3F7D58]'
                        : 'bg-white text-[#1F5333] border-[#CFC5B2]'
                    }`}
                  >
                    {d} Days
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeGroup === 'C' && (
            <div className="text-[13px] text-[#2A211B] space-y-1">
              <span className="font-semibold">New Retail Prospect Safeguards:</span>
              <p className="text-[12px] text-[#766A5E]">
                Deduplicated against active QuickBooks customer database before any draft is generated. Maximum 3 follow-ups before permanent sequence completion.
              </p>
            </div>
          )}
        </div>

        {/* Automatic Stop Rules (PRD Requirement: Locked & Always Enforced) */}
        <div className="p-4 bg-[#E2F0E7] border border-[#C1DEC9] rounded-[10px] space-y-2">
          <div className="flex items-center gap-2 font-semibold text-[#1F5333] text-[14px]">
            <Lock className="w-4 h-4 text-[#3F7D58]" />
            <span>Automatic Stop Rules (System Enforced & Locked)</span>
          </div>
          <p className="text-[12.5px] text-[#2F4A3F] leading-relaxed">
            Cedar permanently halts the automated sequence for an account whenever any of the following occur:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[12.5px] text-[#1E3129] font-medium">
            <div className="flex items-center gap-2 bg-white/70 p-2 rounded border border-[#C1DEC9]">
              <Check className="w-4 h-4 text-[#3F7D58]" />
              <span>Customer replies to any message (Inbox reply detection)</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 p-2 rounded border border-[#C1DEC9]">
              <Check className="w-4 h-4 text-[#3F7D58]" />
              <span>Customer clicks opt-out or added to Do-Not-Contact</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 p-2 rounded border border-[#C1DEC9]">
              <Check className="w-4 h-4 text-[#3F7D58]" />
              <span>Sales rep clicks "Take Over in Outlook"</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 p-2 rounded border border-[#C1DEC9]">
              <Check className="w-4 h-4 text-[#3F7D58]" />
              <span>Customer places new order in QuickBooks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
