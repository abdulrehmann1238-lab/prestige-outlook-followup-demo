import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Send,
  Download,
  Filter,
  Layers,
  ArrowRight,
  ShieldCheck,
  Check,
  ClipboardList,
} from 'lucide-react';
import { useCedarStore } from '../../store/useCedarStore';
import { Button } from '../../components/ui/Button';
import { StatusPill } from '../../components/ui/StatusPill';
import { SubmitFormsModal } from '../../components/app/SubmitFormsModal';
import { useToast } from '../../components/ui/Toast';

export const ProspectsPage: React.FC = () => {
  const navigate = useNavigate();
  const { contacts, runProspectDiscovery } = useCedarStore();
  const { showToast } = useToast();

  const [isRunning, setIsRunning] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [selectedStates, setSelectedStates] = useState<string[]>(['TX', 'FL', 'GA']);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    'Cigar lounge',
    'Tobacconist',
    'Cigar shop',
  ]);
  const [formsModalOpen, setFormsModalOpen] = useState(false);
  const [discoveryRunDone, setDiscoveryRunDone] = useState(false);

  const prospectContacts = contacts.filter((c) => c.group === 'C');

  const handleStartDiscovery = () => {
    setIsRunning(true);
    setProgressStep(1);

    const steps = [
      () => setProgressStep(2),
      () => setProgressStep(3),
      () => setProgressStep(4),
      () => setProgressStep(5),
      () => {
        setIsRunning(false);
        setDiscoveryRunDone(true);
        runProspectDiscovery();
        showToast({
          type: 'success',
          message:
            'Discovery complete: 184 found · 29 duplicates merged · 6 existing customers excluded.',
        });
      },
    ];

    steps.forEach((stepFn, i) => {
      setTimeout(stepFn, (i + 1) * 700);
    });
  };

  const discoverySteps = [
    { title: 'Searching public business registries & state sales tax indices', count: '184 found' },
    { title: 'Inspecting retailer websites & public contact pages', count: '148 scanned' },
    { title: 'Verifying commercial tobacco wholesale licenses', count: '136 confirmed' },
    { title: 'Deduplicating cross-directory records', count: '29 merged' },
    { title: 'Cross-referencing active QuickBooks customer list', count: '6 excluded' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2DACB]">
        <div>
          <h1 className="font-serif text-[28px] text-[#2A211B] font-medium leading-tight">
            Prospect Discovery Engine
          </h1>
          <p className="text-[14px] text-[#5E5249]">
            Targeted US retail lounge discovery with automated QuickBooks customer deduplication
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => navigate('/app/prospects/manual')}
            icon={<ClipboardList className="w-3.5 h-3.5 text-[#B7791F]" />}
          >
            Manual CAPTCHA List (6)
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setFormsModalOpen(true)}
            icon={<Send className="w-3.5 h-3.5" />}
          >
            Submit Eligible Forms
          </Button>
          <Button
            size="sm"
            onClick={handleStartDiscovery}
            loading={isRunning}
            icon={<Search className="w-3.5 h-3.5" />}
          >
            Run Discovery
          </Button>
        </div>
      </div>

      {/* Discovery Search Scope Card */}
      <div className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] p-5 shadow-[0_1px_2px_rgba(42,33,27,0.06)] space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2DACB] pb-2">
          <h3 className="font-serif text-[16px] text-[#2A211B] font-medium">Search Scope</h3>
          <span className="text-[12px] text-[#766A5E]">Public business contact details only</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Target States */}
          <div className="space-y-2">
            <label className="text-[12px] font-semibold text-[#766A5E] uppercase tracking-wider">
              Target States
            </label>
            <div className="flex flex-wrap gap-1.5">
              {['TX', 'FL', 'GA', 'NC', 'TN', 'SC', 'AL', 'KY', 'OH', 'CO', 'AZ'].map((st) => (
                <button
                  key={st}
                  onClick={() =>
                    setSelectedStates((prev) =>
                      prev.includes(st) ? prev.filter((s) => s !== st) : [...prev, st]
                    )
                  }
                  className={`px-2.5 py-1 rounded-[6px] text-[12.5px] font-semibold border transition-colors ${
                    selectedStates.includes(st)
                      ? 'bg-[#2F4A3F] text-white border-[#263D34]'
                      : 'bg-[#FBF9F4] text-[#5E5249] border-[#CFC5B2] hover:bg-[#EFE9DD]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Retail Categories */}
          <div className="space-y-2">
            <label className="text-[12px] font-semibold text-[#766A5E] uppercase tracking-wider">
              Business Categories
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Cigar lounge',
                'Tobacconist',
                'Cigar shop',
                'Smoke shop',
                'Hookah retailer',
                'Vape store',
              ].map((type) => (
                <button
                  key={type}
                  onClick={() =>
                    setSelectedTypes((prev) =>
                      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
                    )
                  }
                  className={`px-2.5 py-1 rounded-[6px] text-[12.5px] font-medium border transition-colors ${
                    selectedTypes.includes(type)
                      ? 'bg-[#2F4A3F] text-white border-[#263D34]'
                      : 'bg-[#FBF9F4] text-[#5E5249] border-[#CFC5B2] hover:bg-[#EFE9DD]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Discovery Progress Panel (Wow Moment #4) */}
        {isRunning && (
          <div className="p-4 bg-[#FBF9F4] border border-[#CFC5B2] rounded-[10px] space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-[13px] font-semibold text-[#2F4A3F]">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-[#2F4A3F] border-t-transparent rounded-full animate-spin" />
                <span>Executing multi-source research pipeline...</span>
              </div>
              <span>Step {progressStep} of 5</span>
            </div>

            <div className="space-y-2">
              {discoverySteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between text-[12.5px] p-2 rounded-[6px] transition-colors ${
                    idx < progressStep
                      ? 'bg-[#E2F0E7] text-[#1F5333] font-medium'
                      : idx === progressStep - 1
                      ? 'bg-[#EFE4CF] text-[#7A4E2D] font-semibold'
                      : 'text-[#766A5E]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {idx < progressStep ? (
                      <Check className="w-4 h-4 text-[#3F7D58]" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-current inline-block" />
                    )}
                    <span>{step.title}</span>
                  </div>
                  {idx < progressStep && <span className="tabular-nums font-bold">{step.count}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Discovery Summary Strip after run */}
        {discoveryRunDone && (
          <div className="p-4 bg-[#E2F0E7] border border-[#C1DEC9] rounded-[10px] space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-[14px] font-serif font-semibold text-[#1F5333]">
              <CheckCircle2 className="w-4 h-4 text-[#3F7D58]" />
              <span>Discovery Run Finished (Texas Lounges & Tobacconists)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-1 text-[12px] text-[#2F4A3F]">
              <div className="p-2 bg-white rounded border border-[#C1DEC9] text-center">
                <div className="font-bold text-[16px]">184</div>
                <div className="text-[11px] text-[#766A5E]">Found</div>
              </div>
              <div className="p-2 bg-white rounded border border-[#C1DEC9] text-center">
                <div className="font-bold text-[16px] text-[#B08D57]">29</div>
                <div className="text-[11px] text-[#766A5E]">Duplicates Merged</div>
              </div>
              <div className="p-2 bg-white rounded border border-[#C1DEC9] text-center">
                <div className="font-bold text-[16px] text-[#A63D2F]">6</div>
                <div className="text-[11px] text-[#766A5E]">QuickBooks Excluded</div>
              </div>
              <div className="p-2 bg-white rounded border border-[#C1DEC9] text-center">
                <div className="font-bold text-[16px] text-[#3F7D58]">118</div>
                <div className="text-[11px] text-[#766A5E]">Public Email</div>
              </div>
              <div className="p-2 bg-white rounded border border-[#C1DEC9] text-center">
                <div className="font-bold text-[16px] text-[#B7791F]">31</div>
                <div className="text-[11px] text-[#766A5E]">Contact Form</div>
              </div>
              <div className="p-2 bg-white rounded border border-[#C1DEC9] text-center">
                <div className="font-bold text-[16px] text-[#2F4A3F]">0</div>
                <div className="text-[11px] text-[#766A5E]">Sent Without Review</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Discovered Prospects Table */}
      <div className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] overflow-hidden shadow-[0_1px_2px_rgba(42,33,27,0.06)]">
        <div className="p-4 bg-[#FBF9F4] border-b border-[#E2DACB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-[16px] text-[#2A211B] font-medium">
              Verified Prospects ({prospectContacts.length})
            </h3>
            <span className="text-[11.5px] text-[#766A5E]">
              Source transparency & routing verification
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13.5px]">
            <thead>
              <tr className="bg-[#EFE9DD] border-b border-[#E2DACB] text-[12px] font-semibold text-[#766A5E] uppercase tracking-wider">
                <th className="py-2.5 px-3">Business</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Public Contact</th>
                <th className="py-2.5 px-3">Research Source</th>
                <th className="py-2.5 px-3">Verification</th>
                <th className="py-2.5 px-3">Routing</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DACB]/60">
              {prospectContacts.slice(0, 15).map((contact) => (
                <tr
                  key={contact.id}
                  onClick={() => navigate(`/app/pipeline?id=${contact.id}`)}
                  className="hover:bg-[#EFE9DD]/50 cursor-pointer transition-colors"
                >
                  <td className="py-2.5 px-3 font-semibold text-[#2A211B]">
                    {contact.business}
                    {contact.contactName && (
                      <div className="text-[11.5px] font-normal text-[#766A5E]">
                        Buyer: {contact.contactName}
                      </div>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-[#5E5249]">
                    {contact.city}, {contact.state}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[12px] text-[#2A211B]">
                    {contact.email || contact.contactUrl || contact.phone || 'Phone only'}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-[#EFE9DD] border border-[#CFC5B2] text-[#5E5249]">
                      {contact.source?.label || 'Public Registry'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-[11px] font-bold text-[#3F7D58] bg-[#E2F0E7] px-1.5 py-0.5 rounded">
                      Verified
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-[11.5px] font-medium capitalize text-[#2F4A3F]">
                      {contact.route === 'form' ? 'Web Contact Form' : contact.route}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <StatusPill status={contact.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SubmitFormsModal isOpen={formsModalOpen} onClose={() => setFormsModalOpen(false)} />
    </div>
  );
};
