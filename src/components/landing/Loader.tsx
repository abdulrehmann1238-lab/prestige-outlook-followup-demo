import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Loader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showTagline, setShowTagline] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check if seen in this session
    const seen = sessionStorage.getItem('cedar_loader_seen');
    const minDuration = seen ? 300 : 700;

    const timer1 = setTimeout(() => {
      setProgress(0.85);
      setShowTagline(true);
    }, 160);

    const timer2 = setTimeout(() => {
      setProgress(1);
    }, minDuration - 200);

    const timer3 = setTimeout(() => {
      setIsDone(true);
      sessionStorage.setItem('cedar_loader_seen', 'true');
      setTimeout(onComplete, 450);
    }, minDuration);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.52, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-50 bg-[#F6F2EA] flex flex-col items-center justify-center select-none"
        >
          {/* Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, delay: 0.16 }}
            className="flex items-center gap-1 mb-4"
          >
            <span className="font-serif text-[42px] font-medium text-[#2A211B] tracking-tight">
              Cedar
            </span>
            <span className="w-2 h-2 rounded-full bg-[#B08D57] mt-3" />
          </motion.div>

          {/* 1px Brass Progress Hairline */}
          <div className="w-40 h-[1px] bg-[#E2DACB] overflow-hidden relative mb-3">
            <motion.div
              className="h-full bg-[#B08D57]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress }}
              style={{ transformOrigin: 'left' }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* Tagline */}
          {showTagline && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.24 }}
              className="text-[13.5px] text-[#5E5249] font-medium tracking-wide"
            >
              Follow-ups that sound like you.
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
