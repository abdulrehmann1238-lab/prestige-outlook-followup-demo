import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Check, AlertTriangle, Send, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useCedarStore } from '../../store/useCedarStore';
import { useToast } from '../ui/Toast';

export const SubmitFormsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const { submitEligibleForms } = useCedarStore();
  const { showToast } = useToast();

  const handleStartSubmit = () => {
    setSubmitting(true);
    setProgressStep(1);

    setTimeout(() => {
      setProgressStep(2);
      setTimeout(() => {
        setProgressStep(3);
        setTimeout(() => {
          submitEligibleForms();
          setSubmitting(false);
          setIsCompleted(true);
          showToast({
            type: 'success',
            message: 'Eligible forms submitted. 2 CAPTCHA forms added to Manual List.',
          });
        }, 500);
      }, 500);
    }, 500);
  };

  const handleFinish = () => {
    setSubmitting(false);
    setProgressStep(0);
    setIsCompleted(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleFinish}
      title="Submit Wholesale Contact Forms"
      subtitle="Automated submission with strict CAPTCHA human routing"
      maxWidth="md"
    >
      {!isCompleted ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 bg-[#E2F0E7] border border-[#C1DEC9] rounded-[8px] text-center">
              <div className="text-[20px] font-bold text-[#1F5333]">4</div>
              <div className="text-[11.5px] font-medium text-[#2F4A3F]">Eligible Direct</div>
            </div>
            <div className="p-3 bg-[#F7EAD0] border border-[#E8D1A8] rounded-[8px] text-center">
              <div className="text-[20px] font-bold text-[#7D5010]">2</div>
              <div className="text-[11.5px] font-medium text-[#7D5010]">Needs Person (CAPTCHA)</div>
            </div>
            <div className="p-3 bg-[#EFE9DD] border border-[#D9D0C1] rounded-[8px] text-center">
              <div className="text-[20px] font-bold text-[#5E5249]">1</div>
              <div className="text-[11.5px] font-medium text-[#5E5249]">Not Allowed / Skipped</div>
            </div>
          </div>

          <div className="p-3 bg-[#FBF9F4] border border-[#E2DACB] rounded-[8px] space-y-1.5 text-[12.5px]">
            <span className="font-semibold text-[#2A211B]">Prepared Message Preview:</span>
            <p className="text-[#5E5249] italic bg-white p-2.5 rounded border border-[#E2DACB] text-[12px] leading-relaxed">
              "Hello, I am Marcus Delgado with Prestige Import Group in Florida. We supply retail lounges with Spanish cedar humidors and electronic cabinets. Could I send our 2026 wholesale catalog to your purchasing buyer?"
            </p>
          </div>

          <div className="p-3 bg-[#EFE4CF] border border-[#DFCBB0] rounded-[8px] text-[12px] text-[#7A4E2D] flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Compliance note:</strong> Cedar honors site policies. Sites requiring CAPTCHA verification are never bypassed—they are placed on your daily manual morning queue.
            </span>
          </div>

          {submitting && (
            <div className="space-y-2 py-2">
              <div className="flex items-center gap-2 text-[13px] text-[#2F4A3F]">
                <div className="w-4 h-4 border-2 border-[#2F4A3F] border-t-transparent rounded-full animate-spin" />
                <span>
                  {progressStep === 1 && 'Submitting Piedmont Cigar Exchange form...'}
                  {progressStep === 2 && 'Submitting St. James Humidors form...'}
                  {progressStep === 3 && 'Routing Brightleaf Smoke (CAPTCHA) to manual list...'}
                </span>
              </div>
              <div className="w-full bg-[#EFE9DD] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#2F4A3F] h-full transition-all duration-300"
                  style={{ width: `${(progressStep / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2 border-t border-[#E2DACB]">
            <Button variant="secondary" onClick={handleFinish} disabled={submitting}>
              Cancel
            </Button>
            <Button
              onClick={handleStartSubmit}
              loading={submitting}
              icon={<Send className="w-3.5 h-3.5" />}
            >
              Submit 4 Eligible Forms
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 py-2">
          <div className="p-4 bg-[#E2F0E7] border border-[#C1DEC9] rounded-[8px] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#3F7D58] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[14px] text-[#1F5333]">
                Forms Workflow Completed
              </div>
              <div className="text-[12.5px] text-[#2F4A3F] mt-0.5 leading-relaxed">
                4 eligible forms were submitted directly. 2 forms with CAPTCHA verification were safely moved to your Daily Manual List for human completion.
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={handleFinish}>Done</Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
