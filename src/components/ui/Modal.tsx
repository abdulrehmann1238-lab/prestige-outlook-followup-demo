import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { clsx } from 'clsx';
import { VARIANTS } from '../../motion/presets';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnScrim?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = 'md',
  closeOnScrim = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const widths = {
    sm: 'max-w-[420px]',
    md: 'max-w-[540px]',
    lg: 'max-w-[680px]',
    xl: 'max-w-[840px]',
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => closeOnScrim && onClose()}
            className="fixed inset-0 bg-[#2A211B]/40 backdrop-blur-[1px]"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            variants={VARIANTS.modal}
            initial="initial"
            animate="animate"
            exit="exit"
            className={clsx(
              'relative w-full bg-[#FFFFFF] border border-[#E2DACB] rounded-[14px] shadow-[0_16px_40px_rgba(42,33,27,0.16)] overflow-hidden z-10 flex flex-col max-h-[90vh]',
              widths[maxWidth]
            )}
          >
            {/* Header */}
            {(title || subtitle) && (
              <div className="flex items-start justify-between px-6 py-4 border-b border-[#E2DACB] bg-[#FBF9F4]">
                <div>
                  {title && <h3 className="font-serif text-[19px] text-[#2A211B] font-medium">{title}</h3>}
                  {subtitle && <p className="text-[13px] text-[#5E5249] mt-0.5">{subtitle}</p>}
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-[6px] text-[#766A5E] hover:text-[#2A211B] hover:bg-[#EFE9DD] transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-4">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="px-6 py-3.5 bg-[#FBF9F4] border-t border-[#E2DACB] flex items-center justify-end gap-3">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
