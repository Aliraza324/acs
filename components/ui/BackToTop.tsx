'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="acs-back-to-top"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#0866F5] hover:bg-[#1677FF] text-white flex items-center justify-center shadow-xl shadow-blue-500/25 z-40 transition-transform hover:scale-105 active:scale-95 cursor-pointer border border-blue-400/40 focus:outline-none"
          title="Scroll to Top"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

