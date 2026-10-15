import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Check, Copy, KeyRound, ExternalLink, ShieldCheck, Mail } from 'lucide-react';
import { Contact } from '../../data/seed';
import { useCedarStore } from '../../store/useCedarStore';
import { useToast } from '../ui/Toast';

interface WholesaleAccountModalProps {
  contact: Contact;
  isOpen: boolean;
  onClose: () => void;
}

export const WholesaleAccountModal: React.FC<WholesaleAccountModalProps> = ({
  contact,
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [copied, setCopied] = useState(false);
  const [activationUrl, setActivationUrl] = useState('');
  const { createWholesaleAccount } = useCedarStore();
  const { showToast } = useToast();

  const handleStartCreation = () => {
    setStep(2);
    setTimeout(() => {
      const url = createWholesaleAccount(contact.id);
      setActivationUrl(url);
      setStep(3);
    }, 900);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activationUrl);
    setCopied(true);
    showToast({ type: 'success', message: 'Activation link copied to clipboard.' });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setStep(1);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title="Create Wholesale Store Account"
      subtitle="Issue retailer dealer credentials via prestigeimport.example (Demo)"
      maxWidth="md"
    >
      {step === 1 && (
        <div className="space-y-4">
          <div className="bg-[#FBF9F4] p-3.5 rounded-[8px] border border-[#E2DACB] text-[13px] space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[#766A5E]">Business:</span>
              <strong className="text-[#2A211B]">{contact.business}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#766A5E]">Recipient Email:</span>
              <span className="text-[#2A211B] font-mono">{contact.email || 'None listed'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#766A5E]">State Jurisdiction:</span>
              <span className="text-[#2A211B]">{contact.state}</span>
            </div>
          </div>

          <div className="p-3 bg-[#E3EBE5] rounded-[8px] border border-[#BDD1C3] text-[12.5px] text-[#1E3129] flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2F4A3F] shrink-0 mt-0.5" />
            <span>
              Cedar requests retail account provisioning from your website portal. Wholesale pricing unlocks only once the buyer confirms tax & resale credentials.
            </span>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={handleReset}>
              Cancel
            </Button>
            <Button onClick={handleStartCreation} disabled={!contact.email}>
              Generate Activation Link
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#2F4A3F] border-t-transparent rounded-full animate-spin" />
          <p className="text-[14px] text-[#2A211B] font-medium">
            Requesting account on prestigeimport.example...
          </p>
          <p className="text-[12px] text-[#766A5E]">Generating secure, one-time 7-day token</p>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="p-4 bg-[#E2F0E7] border border-[#C1DEC9] rounded-[8px] flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#3F7D58] text-white flex items-center justify-center shrink-0">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-[14px] text-[#1F5333]">
                Wholesale Invitation Ready
              </div>
              <div className="text-[12.5px] text-[#2F4A3F]">
                Link expires in 7 days. Single-use activation token generated.
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[12px] font-semibold text-[#766A5E] uppercase tracking-wider">
              Activation URL
            </label>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={activationUrl}
                className="flex-1 bg-[#EFE9DD] border border-[#CFC5B2] rounded-[8px] px-3 py-2 text-[13px] font-mono text-[#2A211B] select-all outline-none"
              />
              <Button variant="secondary" size="md" onClick={handleCopy} icon={<Copy className="w-3.5 h-3.5" />}>
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#E2DACB]">
            <Button variant="secondary" onClick={handleReset}>
              Close
            </Button>
            <Button
              onClick={() => {
                showToast({ type: 'success', message: 'Intro email with activation link queued in Review.' });
                handleReset();
              }}
              icon={<Mail className="w-3.5 h-3.5" />}
            >
              Send Dealer Intro Email
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
