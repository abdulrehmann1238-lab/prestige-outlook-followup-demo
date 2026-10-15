import React, { useState } from 'react';
import { Sparkles, Check, RotateCw, ShieldCheck, FileCheck, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { COPY } from '../../data/copy';

export const DraftShowcase: React.FC = () => {
  const [draftIndex, setDraftIndex] = useState(0);
  const [activeSource, setActiveSource] = useState<string | null>(null);

  const drafts = [
    {
      business: 'Old Ember Cigar Lounge',
      contact: 'Daniela Ortiz',
      subject: 'Checking in on the Oak humidors',
      groundedText: [
        { text: "It's been a while since your ", grounded: false },
        {
          text: 'March order of the Oak 150-ct humidors and Ember cabinet',
          grounded: true,
          source: 'QuickBooks Invoice #4128 (Shipped Mar 14, 2026)',
        },
        { text: ', and I wanted to see how they have been moving on your retail floor.\n\nWe also have a ', grounded: false },
        {
          text: 'new line of Ember electronic climate cabinets',
          grounded: true,
          source: "Catalog: In-stock Florida inventory (Approved Promotion: 'New Ember Line')",
        },
        { text: ' arriving that pairs well with what you carry. Would it help if I sent over our current wholesale dealer price sheet?\n\nBest,\nMarcus Delgado · Prestige Import Group', grounded: false },
      ],
      checks: [
        'Not on Do-Not-Contact list',
        'No duplicate send in last 30 days',
        'Within rep daily quota (18 of 30 sent)',
        'No unapproved discounts mentioned',
        'Physical address & 1-click opt-out attached',
      ],
    },
    {
      business: 'Blackwater Cigar Co.',
      contact: 'Ray Delgado',
      subject: 'Following up on your humidor shipment delivery',
      groundedText: [
        { text: 'Hi Ray,\n\nQuickBooks shows your ', grounded: false },
        {
          text: 'three Cedar Glass-Top 75-ct humidors',
          grounded: true,
          source: 'QuickBooks Invoice #4311 (Delivered Oct 1, 2026)',
        },
        { text: ' were delivered to your Ybor City store two weeks ago. I wanted to verify the shipment arrived in perfect condition.\n\nSeveral retail tobacconists pair these with our ', grounded: false },
        {
          text: 'Spanish cedar divider sets and digital brass hygrometers',
          grounded: true,
          source: 'Catalog: In-stock accessories (Humidification gel omitted: out of stock)',
        },
        { text: '. Would you like me to include a sample set in your next order?\n\nBest regards,\nMarcus Delgado', grounded: false },
      ],
      checks: [
        'Not on Do-Not-Contact list',
        'Duplicate post-order lockout enforced (60d)',
        'Within rep daily quota (18 of 30 sent)',
        'Grounded inventory verified in Doral warehouse',
        'Physical address & opt-out line verified',
      ],
    },
    {
      business: 'Lone Star Humidor Room',
      contact: 'Carlos Morales',
      subject: 'Wholesale humidors and electronic cabinets for Lone Star',
      groundedText: [
        { text: 'Hi Carlos,\n\nI came across ', grounded: false },
        {
          text: 'Lone Star Humidor Room while researching premier cigar lounges in San Antonio',
          grounded: true,
          source: 'Verified Public Listing & Texas Commercial Tobacco Directory',
        },
        { text: ". I'm Marcus with Prestige Import Group—we are a direct wholesale distributor of Spanish cedar humidors and electronic cabinets.\n\nWe supply retail tobacconists across Texas with direct commercial pricing. Would it be useful if I sent over our ", grounded: false },
        {
          text: 'current wholesale catalog and dealer terms',
          grounded: true,
          source: 'Prestige Import Group Standard Wholesale Price Sheet',
        },
        { text: '?\n\nSincerely,\nMarcus Delgado', grounded: false },
      ],
      checks: [
        'Not on Do-Not-Contact list',
        'Deduplicated against active QuickBooks database',
        'Within rep daily quota (18 of 30 sent)',
        'No unverified claims made about retail store',
        'One-click opt out line present',
      ],
    },
  ];

  const currentDraft = drafts[draftIndex];

  const handleSwapVariant = () => {
    setDraftIndex((prev) => (prev + 1) % drafts.length);
    setActiveSource(null);
  };

  return (
    <section id="draft-showcase" className="py-20 sm:py-28 bg-[#FBF9F4] border-t border-b border-[#E2DACB] scroll-mt-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <span className="text-[12px] font-semibold tracking-wider uppercase text-[#7A4E2D]">
              Grounding & Safety
            </span>
            <h2 className="font-serif text-[32px] sm:text-[44px] text-[#2A211B] font-medium leading-tight">
              {COPY.section4.title}
            </h2>
            <p className="text-[16px] text-[#5E5249] leading-relaxed">
              {COPY.section4.subtitle}
            </p>
          </div>

          <Button
            size="md"
            variant="secondary"
            onClick={handleSwapVariant}
            icon={<RotateCw className="w-3.5 h-3.5" />}
          >
            Regenerate Sample ({draftIndex + 1} of 3)
          </Button>
        </div>

        {/* Big Draft Showcase Card */}
        <div className="bg-[#FFFFFF] border border-[#CFC5B2] rounded-[14px] p-6 sm:p-8 shadow-[0_8px_24px_rgba(42,33,27,0.08)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2DACB] gap-2">
            <div>
              <span className="text-[12px] font-semibold text-[#766A5E] uppercase tracking-wider">
                Recipient
              </span>
              <div className="font-serif text-[20px] font-semibold text-[#2A211B]">
                {currentDraft.business} &lt;{currentDraft.contact}&gt;
              </div>
            </div>
            <div className="text-[12.5px] text-[#2F4A3F] font-semibold bg-[#E3EBE5] px-3 py-1 rounded">
              Grounded AI Draft · Dispatched via Marcus's Outlook
            </div>
          </div>

          {/* Subject Line */}
          <div>
            <div className="text-[12px] font-semibold text-[#766A5E] uppercase tracking-wider mb-1">
              Subject
            </div>
            <div className="text-[16px] font-semibold text-[#2A211B] p-2.5 bg-[#FBF9F4] rounded-[6px] border border-[#E2DACB]">
              {currentDraft.subject}
            </div>
          </div>

          {/* Body with Interactive Highlight Spans */}
          <div>
            <div className="text-[12px] font-semibold text-[#766A5E] uppercase tracking-wider mb-1">
              Body Text (Hover highlighted phrases to verify data grounding source)
            </div>
            <div className="p-5 bg-[#FBF9F4] border border-[#E2DACB] rounded-[10px] text-[15px] sm:text-[16px] leading-relaxed text-[#2A211B] font-sans whitespace-pre-line">
              {currentDraft.groundedText.map((chunk, idx) => {
                if (chunk.grounded) {
                  return (
                    <span
                      key={idx}
                      onMouseEnter={() => setActiveSource(chunk.source || null)}
                      onMouseLeave={() => setActiveSource(null)}
                      className="bg-[#EFE4CF] text-[#7A4E2D] font-medium px-1.5 py-0.5 rounded border-b-2 border-[#B08D57] cursor-pointer hover:bg-[#EAE0C7] transition-colors"
                    >
                      {chunk.text}
                    </span>
                  );
                }
                return <span key={idx}>{chunk.text}</span>;
              })}
            </div>
          </div>

          {/* Source Provenance Callout */}
          <div className="p-4 bg-[#EFE4CF] border border-[#DFCBB0] rounded-[10px] text-[13px] text-[#7A4E2D] space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <Sparkles className="w-4 h-4 text-[#B08D57]" />
              <span>Verified Data Source:</span>
            </div>
            <p className="font-mono text-[12.5px] text-[#2A211B]">
              {activeSource || 'Hover over any shaded phrase above to inspect the exact invoice or catalog citation.'}
            </p>
          </div>

          {/* 5 Pre-Send Checks Strip */}
          <div className="p-4 bg-[#FFFFFF] border border-[#E2DACB] rounded-[10px] space-y-2">
            <div className="text-[12px] font-semibold uppercase tracking-wider text-[#766A5E]">
              Pre-Send Safety Checks (Ticked prior to queue approval)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1 text-[12.5px] text-[#1F5333] font-medium">
              {currentDraft.checks.map((chk, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 bg-[#E2F0E7] border border-[#C1DEC9] rounded-[6px]"
                >
                  <Check className="w-4 h-4 text-[#3F7D58] shrink-0" />
                  <span>{chk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
