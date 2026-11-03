'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export function Toast() {
  const { toast } = useShop();

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-7 sm:right-7 max-w-[calc(100vw-2rem)] z-50 pointer-events-none font-manrope">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-xs font-bold border ${
              toast.type === 'success'
                ? 'bg-[#071B49] text-white border-blue-500/35'
                : toast.type === 'error'
                ? 'bg-red-950 text-white border-red-500/35'
                : 'bg-slate-900 text-white border-slate-700'
            }`}
          >
            {toast.type === 'success' && (
              <CheckCircle2 className="w-4 h-4 text-[#00D2FF] shrink-0" />
            )}
            {toast.type === 'error' && (
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            {toast.type === 'info' && (
              <Info className="w-4 h-4 text-blue-400 shrink-0" />
            )}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
