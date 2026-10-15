import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { clsx } from 'clsx';
import { VARIANTS } from '../../motion/presets';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = 'max-w-[640px]',
}) => {
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

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-40 flex justify-end">
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#2A211B]/35"
          />

          {/* Drawer Panel */}
          <motion.div
            variants={VARIANTS.drawer}
            initial="initial"
            animate="animate"
            exit="exit"
            className={clsx(
              'relative w-full h-full bg-[#FFFFFF] border-l border-[#E2DACB] shadow-[0_16px_40px_rgba(42,33,27,0.18)] z-10 flex flex-col',
              width
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2DACB] bg-[#FBF9F4] shrink-0">
              <div className="pr-4">
                {title && <h2 className="font-serif text-[20px] text-[#2A211B] font-medium leading-tight">{title}</h2>}
                {subtitle && <div className="mt-1">{subtitle}</div>}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-[6px] text-[#766A5E] hover:text-[#2A211B] hover:bg-[#EFE9DD] transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">{children}</div>

            {/* Optional Footer */}
            {footer && (
              <div className="p-4 bg-[#FBF9F4] border-t border-[#E2DACB] flex items-center justify-end gap-3 shrink-0">
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
