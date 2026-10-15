import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { VARIANTS } from '../../motion/presets';

export interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onUndo?: () => void;
  undoLabel?: string;
  duration?: number;
}

interface ToastContextValue {
  showToast: (item: Omit<ToastItem, 'id'>) => void;
  toasts: ToastItem[];
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (item: Omit<ToastItem, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
      const newToast: ToastItem = { ...item, id };
      setToasts((prev) => [...prev, newToast]);

      const duration = item.duration ?? (item.type === 'error' ? 6000 : 4000);
      setTimeout(() => {
        dismissToast(id);
      }, duration);
    },
    [dismissToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, toasts, dismissToast }}>
      {children}
      {/* Toast viewport container at bottom-right */}
      <div
        role="status"
        aria-live="polite"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-[420px] w-full pointer-events-none px-4 sm:px-0"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              variants={VARIANTS.toast}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pointer-events-auto flex items-start gap-3 p-3.5 rounded-[10px] bg-[#FFFFFF] border border-[#CFC5B2] shadow-[0_8px_24px_rgba(42,33,27,0.12)] text-[#2A211B] text-[13.5px]"
            >
              <div className="shrink-0 mt-0.5">
                {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#3F7D58]" />}
                {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-[#A63D2F]" />}
                {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-[#B7791F]" />}
                {toast.type === 'info' && <Info className="w-4 h-4 text-[#3D6A8A]" />}
              </div>
              <div className="flex-1 pr-1 font-medium leading-snug">{toast.message}</div>
              {toast.onUndo && (
                <button
                  onClick={() => {
                    toast.onUndo?.();
                    dismissToast(toast.id);
                  }}
                  className="shrink-0 text-[12px] font-semibold text-[#2F4A3F] underline underline-offset-2 hover:text-[#1E3129]"
                >
                  {toast.undoLabel || 'Undo'}
                </button>
              )}
              <button
                onClick={() => dismissToast(toast.id)}
                className="shrink-0 text-[#766A5E] hover:text-[#2A211B] p-0.5 rounded"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
};
