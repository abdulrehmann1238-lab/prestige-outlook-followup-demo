import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Pause,
  Clock,
  Sparkles,
  Mail,
  UserCheck,
  Send,
  HelpCircle,
  FileCheck,
  Cpu,
  ChevronRight,
  Check,
} from 'lucide-react';
import { Loader } from '../components/landing/Loader';
import { LandingNavbar } from '../components/landing/Navbar';
import { LivingInbox } from '../components/landing/LivingInbox';
import { StickyStory } from '../components/landing/StickyStory';
import { DraftShowcase } from '../components/landing/DraftShowcase';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCountUp } from '../hooks/useCountUp';
import { BRAND } from '../config/brand';
import { COPY } from '../data/copy';
import { useToast } from '../components/ui/Toast';

export const LandingPage: React.FC = () => {
  const [loaderComplete, setLoaderComplete] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactGroupChoice, setContactGroupChoice] = useState('Group A: Inactive customer reactivation');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Proof Strip Counts
  const count30 = useCountUp(30, 900);
  const count0 = useCountUp(0, 900);
  const count100 = useCountUp(100, 900);
  const count1 = useCountUp(1, 900);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim()) {
      showToast({ type: 'error', message: 'Please enter your name and work email.' });
      return;
    }
    setContactSubmitted(true);
    showToast({
      type: 'success',
      message: `Thank you, ${contactName}. We'll follow up directly regarding Prestige Import Group.`,
    });
  };

  return (
    <div className="min-h-screen bg-[#F6F2EA] text-[#2A211B] relative overflow-x-hidden">
      {/* 0.7s - 1.8s Entry Loader */}
      {!loaderComplete && <Loader onComplete={() => setLoaderComplete(true)} />}

      <LandingNavbar />

      {/* Hero Section (100svh, min 640px) */}
      <section className="relative min-h-[90vh] pt-28 pb-20 flex items-center justify-center bg-grain border-b border-[#E2DACB]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (Hero Copy) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE4CF] text-[#7A4E2D] border border-[#DFCBB0] text-[12px] font-semibold tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
                <span>Prepared for Prestige Import Group</span>
              </div>

              <h1 className="font-serif text-[38px] sm:text-[54px] lg:text-[62px] text-[#2A211B] font-normal leading-[1.06] tracking-tight">
                {COPY.hero.h1}
              </h1>

              <p className="text-[16px] sm:text-[18px] text-[#5E5249] leading-relaxed max-w-xl">
                {COPY.hero.support}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Button
                  size="lg"
                  onClick={() => navigate('/app/today')}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  {COPY.hero.primaryCta}
                </Button>
                <a
                  href="#three-groups"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-[8px] text-[14.5px] font-medium text-[#5E5249] hover:text-[#2A211B] hover:bg-[#EFE9DD] transition-colors"
                >
                  {COPY.hero.secondaryCta}
                </a>
              </div>

              <div className="pt-4 flex items-center gap-6 text-[12.5px] text-[#766A5E] border-t border-[#E2DACB]/60">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3F7D58]" />
                  <span>Real Outlook OAuth</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3F7D58]" />
                  <span>QuickBooks History</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3F7D58]" />
                  <span>Instant Stop on Reply</span>
                </span>
              </div>
            </div>

            {/* Right Column: The Living Inbox Scene */}
            <div className="lg:col-span-6 flex justify-center">
              <LivingInbox />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Proof Strip (4 Count-Up Figures) */}
      <section className="py-12 bg-[#FFFFFF] border-b border-[#E2DACB]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="font-serif text-[38px] sm:text-[46px] font-normal text-[#2A211B] tabular-nums">
                {count30} / day
              </div>
              <p className="text-[13px] text-[#5E5249] max-w-[22ch] mx-auto">
                per rep, adjustable across business hours
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-serif text-[38px] sm:text-[46px] font-normal text-[#3F7D58] tabular-nums">
                {count0}
              </div>
              <p className="text-[13px] text-[#5E5249] max-w-[22ch] mx-auto">
                sends after a customer replies
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-serif text-[38px] sm:text-[46px] font-normal text-[#2A211B] tabular-nums">
                {count100}%
              </div>
              <p className="text-[13px] text-[#5E5249] max-w-[22ch] mx-auto">
                drafts reviewable before send
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-serif text-[38px] sm:text-[46px] font-normal text-[#B08D57] tabular-nums">
                {count1} click
              </div>
              <p className="text-[13px] text-[#5E5249] max-w-[22ch] mx-auto">
                universal emergency pause for all sending
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Sticky Story ("Three groups, one quiet system") */}
      <StickyStory />

      {/* Section 4: Draft Showcase ("Written like a rep. Checked like a lawyer.") */}
      <DraftShowcase />

      {/* Section 5: Safeguards Grid (2x3 Plain Cards) */}
      <section id="safeguards" className="py-20 sm:py-28 bg-[#F6F2EA] scroll-mt-20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-[12px] font-semibold tracking-wider uppercase text-[#7A4E2D]">
              Built for Wholesale
            </span>
            <h2 className="font-serif text-[32px] sm:text-[44px] text-[#2A211B] font-medium leading-tight">
              {COPY.safeguards.title}
            </h2>
            <p className="text-[16px] text-[#5E5249] leading-relaxed">
              {COPY.safeguards.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {COPY.safeguards.cards.map((card, idx) => (
              <div
                key={idx}
                className="bg-[#FFFFFF] border border-[#E2DACB] hover:border-[#CFC5B2] rounded-[12px] p-6 shadow-xs hover:shadow-sm transition-all duration-160 space-y-2.5"
              >
                <div className="w-8 h-8 rounded-full bg-[#E3EBE5] text-[#2F4A3F] flex items-center justify-center font-bold text-[13px]">
                  0{idx + 1}
                </div>
                <h3 className="font-serif text-[18px] font-semibold text-[#2A211B]">
                  {card.title}
                </h3>
                <p className="text-[13.5px] text-[#5E5249] leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Architecture ("The simplest stack that stays reliable.") */}
      <section
        id="architecture"
        className="py-20 sm:py-28 bg-[#FFFFFF] border-t border-b border-[#E2DACB] scroll-mt-20"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <span className="text-[12px] font-semibold tracking-wider uppercase text-[#7A4E2D]">
                Simple Stack Architecture
              </span>
              <h2 className="font-serif text-[32px] sm:text-[44px] text-[#2A211B] font-medium leading-tight">
                {COPY.architecture.title}
              </h2>
              <p className="text-[16px] text-[#5E5249] leading-relaxed">
                {COPY.architecture.subtitle}
              </p>
            </div>

            <Button
              size="md"
              variant="secondary"
              onClick={() => navigate('/app/architecture')}
              icon={<Cpu className="w-3.5 h-3.5" />}
            >
              Open Architecture Console
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COPY.architecture.components.map((comp, idx) => (
              <div
                key={idx}
                className="bg-[#FBF9F4] border border-[#E2DACB] rounded-[12px] p-5 space-y-2"
              >
                <div className="flex items-center justify-between text-[11.5px]">
                  <span className="font-mono text-[#766A5E]">{comp.tech}</span>
                  <span className="font-semibold text-[#3F7D58] bg-[#E2F0E7] px-2 py-0.5 rounded">
                    {comp.cost}
                  </span>
                </div>
                <h4 className="font-serif text-[17px] font-semibold text-[#2A211B]">
                  {comp.name}
                </h4>
                <p className="text-[13px] text-[#5E5249] leading-relaxed">{comp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: What You Receive & Delivery Timeline */}
      <section id="delivery" className="py-20 sm:py-28 bg-[#F6F2EA] scroll-mt-20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-[12px] font-semibold tracking-wider uppercase text-[#7A4E2D]">
              Installed System Deliverables
            </span>
            <h2 className="font-serif text-[32px] sm:text-[44px] text-[#2A211B] font-medium leading-tight">
              {COPY.delivery.title}
            </h2>
            <p className="text-[16px] text-[#5E5249] leading-relaxed">
              {COPY.delivery.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Checklist */}
            <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#E2DACB] rounded-[14px] p-6 sm:p-8 shadow-xs space-y-4">
              <h3 className="font-serif text-[20px] font-semibold text-[#2A211B] pb-2 border-b border-[#E2DACB]">
                Delivery Checklist
              </h3>
              <ul className="space-y-3">
                {COPY.delivery.items.map((it, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[14px] text-[#2A211B]">
                    <div className="w-5 h-5 rounded-full bg-[#E2F0E7] text-[#3F7D58] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right 4-Step Rollout */}
            <div className="lg:col-span-6 space-y-3">
              {COPY.delivery.phases.map((ph, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] p-5 shadow-xs flex items-start gap-4"
                >
                  <span className="font-mono text-[16px] font-bold text-[#B08D57] px-2.5 py-1 bg-[#EFE4CF] rounded">
                    {ph.step}
                  </span>
                  <div>
                    <h4 className="font-serif text-[17px] font-semibold text-[#2A211B]">
                      {ph.title}
                    </h4>
                    <p className="text-[13px] text-[#5E5249] mt-1 leading-relaxed">{ph.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Closing Section & Contact Form */}
      <section
        id="contact"
        className="py-20 sm:py-28 bg-[#2F4A3F] text-[#F6F2EA] scroll-mt-20 relative"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[12px] font-semibold tracking-wider uppercase text-[#B08D57]">
                Next Steps
              </span>
              <h2 className="font-serif text-[36px] sm:text-[48px] text-white font-normal leading-tight">
                Let's install this on your office computer.
              </h2>
              <p className="text-[16px] text-[#E3EBE5] leading-relaxed max-w-lg">
                Your reps Marcus, Priya, and Tom stay in real Outlook. Your customers receive warm, grounded follow-ups that preserve your reputation.
              </p>

              <div className="pt-4 space-y-2 text-[13.5px] text-[#E3EBE5]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B08D57]" />
                  <span>Turnkey installation & configuration on your hardware</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B08D57]" />
                  <span>Full source code repository delivered to your GitHub</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B08D57]" />
                  <span>Direct WhatsApp & email access to Shahzaib</span>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-6">
              <div className="bg-[#FFFFFF] text-[#2A211B] rounded-[14px] p-6 sm:p-8 shadow-2xl">
                {!contactSubmitted ? (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <h3 className="font-serif text-[20px] font-semibold text-[#2A211B]">
                      Request Implementation Proposal
                    </h3>

                    <Input
                      label="Your Name"
                      placeholder="e.g. Daniel / Prestige Import Group"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                    />

                    <Input
                      label="Work Email"
                      type="email"
                      placeholder="e.g. daniel@prestigeimportgroup.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required
                    />

                    <div className="space-y-1">
                      <label className="text-[13px] font-medium text-[#2A211B]">
                        What do you want automated first?
                      </label>
                      <select
                        value={contactGroupChoice}
                        onChange={(e) => setContactGroupChoice(e.target.value)}
                        className="w-full bg-[#FFFFFF] border border-[#CFC5B2] rounded-[8px] p-2.5 text-[13.5px] text-[#2A211B] outline-none"
                      >
                        <option value="Group A: Inactive customer reactivation">
                          Group A: Inactive customer reactivation (QuickBooks history)
                        </option>
                        <option value="Group B: 14-day post-order check-in">
                          Group B: 14-day post-order check-in & accessories restock
                        </option>
                        <option value="Group C: Retail prospect discovery">
                          Group C: Retail prospect discovery & contact forms
                        </option>
                        <option value="All three workflows end-to-end">
                          All three workflows end-to-end
                        </option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[13px] font-medium text-[#2A211B]">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Mention any specific QuickBooks or humidor catalog nuances..."
                        className="w-full bg-[#FFFFFF] border border-[#CFC5B2] rounded-[8px] p-2.5 text-[13.5px] outline-none"
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Submit & Review Proposal
                    </Button>
                  </form>
                ) : (
                  <div className="py-8 text-center space-y-3 animate-in fade-in duration-200">
                    <div className="w-12 h-12 rounded-full bg-[#E2F0E7] text-[#3F7D58] flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <h3 className="font-serif text-[22px] font-semibold text-[#2A211B]">
                      Thanks, {contactName}.
                    </h3>
                    <p className="text-[14px] text-[#5E5249] max-w-sm mx-auto">
                      Shahzaib will review your requirements for Prestige Import Group and reply within one business day.
                    </p>
                    <div className="pt-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate('/app/today')}
                      >
                        Explore the Live Demo
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E3129] text-[#E3EBE5] py-12 border-t border-[#263D34]">
        {/* Brass Hairline */}
        <div className="w-full h-[1px] bg-[#B08D57]/40 mb-8" />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 select-none">
              <span className="font-serif text-[24px] font-medium text-white tracking-tight">
                Cedar
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57] mt-1" />
              <span className="text-[11px] font-mono text-[#E3EBE5]/70 ml-2">
                For Prestige Import Group
              </span>
            </div>

            <div className="text-[12.5px] text-[#E3EBE5]/70">
              Interactive demo with simulated data. No real emails are sent.
            </div>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[12.5px] text-[#B08D57] hover:underline"
            >
              Back to top ↑
            </a>
          </div>

          <div className="text-[11.5px] text-[#E3EBE5]/50 flex flex-col sm:flex-row justify-between gap-2 border-t border-[#263D34] pt-4">
            <span>© 2026 Cedar Sales Assistant · Built by Shahzaib Rajpoot Khan</span>
            <span>Spanish Cedar, Electronic Cabinets & Wholesale Accessories Distribution</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
