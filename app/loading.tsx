import React from 'react';

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-md"
      aria-live="polite"
      aria-label="Loading ACS Kenya hardware portal"
    >
      {/* Top Laser Accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0866F5] to-transparent animate-pulse" />

      {/* Compact, Not Massive Container (Max 220px) */}
      <div className="flex flex-col items-center justify-center p-6 text-center select-none">
        {/* Luminous Brand Emblem */}
        <div className="relative w-12 h-12 flex items-center justify-center mb-3">
          <div className="absolute inset-0 bg-[#0866F5]/15 rounded-full blur-md animate-pulse" />

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

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-sora font-extrabold text-xs text-[#071B49] tracking-tighter">
              ACS<span className="text-[#0866F5]">.</span>
            </span>
          </div>
        </div>

        {/* Laser Progress Shimmer */}
        <div className="w-36 h-[3px] bg-[#E3EBF7] rounded-full overflow-hidden relative mb-2.5">
          <div className="h-full w-full bg-gradient-to-r from-[#0866F5] via-[#00D2FF] to-[#1677FF] rounded-full animate-pulse" />
        </div>

        {/* Micro Tagline */}
        <div className="flex items-center gap-1.5 text-[9.5px] font-sora font-semibold text-[#718096] uppercase tracking-[0.22em]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0866F5] animate-ping" />
          <span>Enterprise IT • Kenya</span>
        </div>
      </div>
    </div>
  );
}

