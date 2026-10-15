import React, { useState } from 'react';
import { PlayCircle, MessageSquare, AlertTriangle, FastForward, RotateCcw, Bug, X, ChevronUp } from 'lucide-react';
import { useCedarStore } from '../../store/useCedarStore';
import { useToast } from '../ui/Toast';

export const DemoControls: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { simulateReply, advanceOneDay, resetDemoData, setFailNext, failNext, contacts } = useCedarStore();
  const { showToast } = useToast();

  const handleSimulateReply = () => {
    simulateReply('contact-old-ember');
    showToast({
      type: 'success',
      message: "Daniela Ortiz (Old Ember) replied: 'Yes, send me the new cabinet pricing' (Hot lead)",
    });
  };

  const handleSimulateBounce = () => {
    simulateReply('contact-summit');
    showToast({
      type: 'warning',
      message: 'Email bounce detected for Summit Tobacco. Added to Attention Queue.',
    });
  };

  const handleAdvanceDay = () => {
    advanceOneDay();
    showToast({
      type: 'info',
      message: 'Advanced demo day by +1. Send slots updated.',
    });
  };

  const handleToggleFailNext = () => {
    const next = !failNext;
    setFailNext(next);
    showToast({
      type: next ? 'warning' : 'info',
      message: next
        ? 'Fail-Next enabled: Next draft approval will simulate an Outlook network error.'
        : 'Fail-Next disabled.',
    });
  };

  const handleReset = () => {
    if (window.confirm('Reset all demo data back to fresh seeded state?')) {
      resetDemoData();
      showToast({ type: 'info', message: 'Demo data reset to initial seed state.' });
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 hidden sm:block">
      {isOpen ? (
        <div className="bg-[#FFFFFF] border-2 border-dashed border-[#B08D57] rounded-[12px] shadow-[0_12px_32px_rgba(42,33,27,0.14)] p-3.5 w-72 animate-in fade-in slide-in-from-bottom-2 duration-160">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2DACB]">
            <div className="flex items-center gap-1.5">
              <PlayCircle className="w-4 h-4 text-[#B08D57]" />
              <span className="font-serif text-[14px] font-semibold text-[#2A211B]">
                Demo Scenario Controls
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#766A5E] hover:text-[#2A211B] p-0.5 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11.5px] text-[#766A5E] mb-3 leading-relaxed">
            Use these controls to test client wow moments without waiting:
          </p>

          <div className="space-y-1.5">
            <button
              onClick={handleSimulateReply}
              className="w-full text-left px-2.5 py-1.5 rounded-[6px] text-[12.5px] bg-[#E3EBE5] text-[#1E3129] hover:bg-[#D4E2D7] font-medium flex items-center gap-2 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#3F7D58]" />
              <span>Simulate Customer Reply (Old Ember)</span>
            </button>

            <button
              onClick={handleSimulateBounce}
              className="w-full text-left px-2.5 py-1.5 rounded-[6px] text-[12.5px] bg-[#F7EAD0] text-[#7D5010] hover:bg-[#EFE2C2] font-medium flex items-center gap-2 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-[#B7791F]" />
              <span>Simulate Bounce (Summit Tobacco)</span>
            </button>

            <button
              onClick={handleAdvanceDay}
              className="w-full text-left px-2.5 py-1.5 rounded-[6px] text-[12.5px] bg-[#E1EBF2] text-[#20445E] hover:bg-[#D4E3ED] font-medium flex items-center gap-2 transition-colors"
            >
              <FastForward className="w-3.5 h-3.5 text-[#3D6A8A]" />
              <span>Advance One Day (+24h)</span>
            </button>

            <button
              onClick={handleToggleFailNext}
              className={`w-full text-left px-2.5 py-1.5 rounded-[6px] text-[12.5px] font-medium flex items-center gap-2 transition-colors ${
                failNext
                  ? 'bg-[#A63D2F] text-white'
                  : 'bg-[#F6F2EA] text-[#5E5249] hover:bg-[#EFE9DD]'
              }`}
            >
              <Bug className="w-3.5 h-3.5" />
              <span>{failNext ? 'Simulate Error (Active)' : 'Simulate Network Error'}</span>
            </button>

            <button
              onClick={handleReset}
              className="w-full text-left px-2.5 py-1.5 rounded-[6px] text-[12px] text-[#A63D2F] hover:bg-[#F6E0DC] flex items-center gap-2 transition-colors pt-1 border-t border-[#E2DACB]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Seeded Database</span>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFFFF] border-2 border-dashed border-[#B08D57] text-[#2A211B] shadow-[0_4px_12px_rgba(42,33,27,0.08)] hover:bg-[#FBF9F4] transition-all text-[12.5px] font-medium group"
        >
          <span className="w-2 h-2 rounded-full bg-[#B08D57] animate-ping" />
          <span>Demo Controls</span>
          <ChevronUp className="w-3.5 h-3.5 text-[#766A5E] group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </div>
  );
};
