'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Ultra-smooth, non-intrusive micro-loader: finishes in 600ms for high responsiveness
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="acs-page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-md pointer-events-none select-none"
          aria-live="polite"
          aria-label="Loading ACS Kenya"
        >
          {/* Top Apple-style laser accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0866F5] to-transparent animate-pulse" />

          {/* Compact Centered Card - Sleek, Minimal, Not Massive! (Max 220px) */}
          <div className="flex flex-col items-center justify-center p-6 text-center">
            {/* Luminous Brand Emblem with Ambient Blue Glow */}
            <div className="relative w-12 h-12 flex items-center justify-center mb-3">
              {/* Soft pulsing cybernetic glow ring */}
              <div className="absolute inset-0 bg-[#0866F5]/15 rounded-full blur-md animate-pulse" />

              {/* Dual-arc micro tech spinner */}
              <svg
                className="w-12 h-12 animate-spin text-[#0866F5]"
                viewBox="0 0 48 48"
                fill="none"
              >
                <circle
                  className="opacity-15"
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <path
                  className="opacity-95"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="28 90"
                  d="M24 4 A20 20 0 0 1 44 24"
                />
              </svg>

              {/* Central ACS Monogram */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-sora font-extrabold text-xs text-[#071B49] tracking-tighter">
                  ACS<span className="text-[#0866F5]">.</span>
                </span>
              </div>
            </div>

            {/* High-Precision Laser Progress Line (140px wide) */}
            <div className="w-36 h-[3px] bg-[#E3EBF7] rounded-full overflow-hidden relative mb-2.5">
              <motion.div
                className="h-full bg-gradient-to-r from-[#0866F5] via-[#00D2FF] to-[#1677FF] rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Micro Enterprise Tagline */}
            <div className="flex items-center gap-1.5 text-[9.5px] font-sora font-semibold text-[#718096] uppercase tracking-[0.22em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0866F5] animate-ping" />
              <span>Enterprise IT • Kenya</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

