import React, { useState } from 'react';
import { GroupDot } from '../ui/GroupDot';
import { ArrowRight, CheckCircle2, Clock, Package, Search, ShieldCheck } from 'lucide-react';
import { COPY } from '../../data/copy';

export const StickyStory: React.FC = () => {
  const [activeStep, setActiveStep] = useState<'A' | 'B' | 'C'>('A');

  return (
    <section id="three-groups" className="py-20 sm:py-28 bg-[#F6F2EA] scroll-mt-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-2">
          <span className="text-[12px] font-semibold tracking-wider uppercase text-[#7A4E2D]">
            The Three Workflows
          </span>
          <h2 className="font-serif text-[32px] sm:text-[44px] text-[#2A211B] font-medium leading-tight">
            {COPY.section3.title}
          </h2>
          <p className="text-[16px] text-[#5E5249] leading-relaxed">
            {COPY.section3.subtitle}
          </p>
        </div>

        {/* 2-Column Story: Steps on Left, Interactive Mini-Screen on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3 Steps */}
          <div className="lg:col-span-5 space-y-4">
            {COPY.section3.steps.map((step) => {
              const isActive = activeStep === step.id;

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(step.id as any)}
                  className={`p-6 rounded-[14px] border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#FFFFFF] border-[#2F4A3F] shadow-[0_4px_16px_rgba(42,33,27,0.08)] ring-1 ring-[#2F4A3F]'
                      : 'bg-[#FBF9F4] border-[#E2DACB] hover:bg-[#FFFFFF] hover:border-[#CFC5B2]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[12px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        step.id === 'A'
                          ? 'bg-[#EFE4CF] text-[#7A4E2D]'
                          : step.id === 'B'
                          ? 'bg-[#E2F0E7] text-[#1F5333]'
                          : 'bg-[#E1EBF2] text-[#20445E]'
                      }`}
                    >
                      {step.badge}
                    </span>
                    <GroupDot group={step.id as any} size="md" />
                  </div>

                  <h3 className="font-serif text-[20px] font-semibold text-[#2A211B] mb-2">
                    {step.name}
                  </h3>
                  <p className="text-[14px] text-[#5E5249] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive App Miniature Screen */}
          <div className="lg:col-span-7 sticky top-24 bg-[#FFFFFF] border border-[#CFC5B2] rounded-[14px] p-6 shadow-[0_8px_24px_rgba(42,33,27,0.08)]">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2DACB]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#A63D2F]/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#B08D57]/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#3F7D58]/40" />
                <span className="text-[12px] font-mono text-[#766A5E] ml-2">
                  cedar.prestigeimport.example/app/pipeline?group={activeStep}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[#2F4A3F] bg-[#E3EBE5] px-2 py-0.5 rounded">
                Live App Preview
              </span>
            </div>

            {/* Mini Screen View for Step A */}
            {activeStep === 'A' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between bg-[#FBF9F4] p-3 rounded-[8px] border border-[#E2DACB] text-[13px]">
                  <span className="font-semibold text-[#2A211B]">
                    Group A: Inactive Customer Reactivation
                  </span>
                  <div className="flex items-center gap-1.5 text-[12px] text-[#7A4E2D]">
                    <span className="font-medium">Threshold:</span>
                    <span className="px-2 py-0.5 bg-[#7A4E2D] text-white rounded font-bold">180 Days</span>
                  </div>
                </div>

                <div className="space-y-2 text-[13px]">
                  <div className="p-3 rounded-[8px] border border-[#E2DACB] bg-[#FFFFFF] flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#2A211B]">Old Ember Cigar Lounge</div>
                      <div className="text-[12px] text-[#766A5E]">
                        Last order: Mar 12, 2026 (Invoice #4128 · 215 days ago)
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#E2F0E7] text-[#1F5333]">
                      Replied (Hot Lead)
                    </span>
                  </div>

                  <div className="p-3 rounded-[8px] border border-[#E2DACB] bg-[#FFFFFF] flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#2A211B]">Hartwell & Finch Tobacconists</div>
                      <div className="text-[12px] text-[#766A5E]">
                        Last order: Jan 29, 2026 (257 days ago)
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#EFE4CF] text-[#7A4E2D]">
                      Draft Ready (Review)
                    </span>
                  </div>

                  <div className="p-3 rounded-[8px] border border-[#E2DACB] bg-[#FFFFFF] flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#2A211B]">Cedar Row Cigars</div>
                      <div className="text-[12px] text-[#766A5E]">
                        Last order: Apr 22, 2026 (174 days ago)
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#E1EBF2] text-[#20445E]">
                      Step 2 Scheduled
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#E3EBE5] rounded-[8px] text-[12px] text-[#1E3129] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3F7D58] shrink-0" />
                  <span>Grounding rule: References exact invoice date and purchased humidor models.</span>
                </div>
              </div>
            )}

            {/* Mini Screen View for Step B */}
            {activeStep === 'B' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between bg-[#FBF9F4] p-3 rounded-[8px] border border-[#E2DACB] text-[13px]">
                  <span className="font-semibold text-[#2A211B]">
                    Group B: Post-Order Follow-up (14 Days)
                  </span>
                  <div className="flex items-center gap-1.5 text-[12px] text-[#3F7D58]">
                    <span className="font-medium">Lockout:</span>
                    <span className="px-2 py-0.5 bg-[#3F7D58] text-white rounded font-bold">60 Days No Duplicate</span>
                  </div>
                </div>

                <div className="space-y-2 text-[13px]">
                  <div className="p-3 rounded-[8px] border border-[#E2DACB] bg-[#FFFFFF] flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#2A211B]">Blackwater Cigar Co.</div>
                      <div className="text-[12px] text-[#766A5E]">
                        Shipped Sep 29, 2026 · Invoice #4311 (3 × Glass-Top 75-ct)
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#EFE4CF] text-[#7A4E2D]">
                      Day 14 Reached Today
                    </span>
                  </div>

                  <div className="p-3 rounded-[8px] border border-[#E2DACB] bg-[#FFFFFF] flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#2A211B]">Bishop & Sons Tobacco</div>
                      <div className="text-[12px] text-[#766A5E]">
                        Shipped Oct 02, 2026 · Invoice #4320
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#E1EBF2] text-[#20445E]">
                      Next Send: Oct 16
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#E2F0E7] rounded-[8px] text-[12px] text-[#1F5333] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3F7D58] shrink-0" />
                  <span>Duplicate guard: Prevents sending a second post-order touchpoint within 60 days.</span>
                </div>
              </div>
            )}

            {/* Mini Screen View for Step C */}
            {activeStep === 'C' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between bg-[#FBF9F4] p-3 rounded-[8px] border border-[#E2DACB] text-[13px]">
                  <span className="font-semibold text-[#2A211B]">
                    Group C: Verified US Retail Lounge Discovery
                  </span>
                  <span className="text-[12px] text-[#766A5E]">QuickBooks Deduplicated</span>
                </div>

                <div className="space-y-2 text-[13px]">
                  <div className="p-3 rounded-[8px] border border-[#E2DACB] bg-[#FFFFFF] flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#2A211B]">Lone Star Humidor Room</div>
                      <div className="text-[12px] text-[#766A5E]">
                        San Antonio, TX · Verified Public Email
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#E2F0E7] text-[#1F5333]">
                      Route: Outlook Email
                    </span>
                  </div>

                  <div className="p-3 rounded-[8px] border border-[#E2DACB] bg-[#FFFFFF] flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#2A211B]">Brightleaf Smoke & Vape</div>
                      <div className="text-[12px] text-[#766A5E]">
                        Nashville, TN · CAPTCHA Form Detected
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#F7EAD0] text-[#7D5010]">
                      Route: Manual List
                    </span>
                  </div>

                  <div className="p-3 rounded-[8px] border border-[#E2DACB] bg-[#FFFFFF] flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#2A211B]">Redwood Cigar Merchants</div>
                      <div className="text-[12px] text-[#766A5E]">
                        Sacramento, CA · Found in QuickBooks
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#EFE9DD] text-[#766A5E]">
                      Excluded: Existing Customer
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#F7EAD0] rounded-[8px] text-[12px] text-[#7D5010] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#B7791F] shrink-0" />
                  <span>No CAPTCHA bypass: Any site with interactive verification is routed to human reps.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
