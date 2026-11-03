import React from 'react';

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'white' | 'muted';
  className?: string;
}

const SIZE_MAP = {
  xs: 'w-3.5 h-3.5',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

const COLOR_MAP = {
  primary: 'text-[#0866F5]',
  white: 'text-white',
  muted: 'text-[#718096]',
};

/**
 * Compact, elegant dual-arc tech spinner.
 * Lightweight, beautiful, and never bulky.
 */
export function Spinner({
  size = 'md',
  variant = 'primary',
  className = '',
}: SpinnerProps) {
  const sizeClass = SIZE_MAP[size] || SIZE_MAP.md;
  const colorClass = COLOR_MAP[variant] || COLOR_MAP.primary;

  return (
    <svg
      className={`animate-spin ${sizeClass} ${colorClass} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        className="opacity-90"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="16 50"
        d="M12 3 A9 9 0 0 1 21 12"
      />
    </svg>
  );
}

/**
 * Three subtle breathing dots with staggered pulse.
 */
export function PulseDots({ className = '' }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#0866F5] animate-[bounce_1s_infinite_100ms]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#1677FF] animate-[bounce_1s_infinite_200ms]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] animate-[bounce_1s_infinite_300ms]" />
    </div>
  );
}

/**
 * Apple-style ultra-thin top progress line.
 */
export function TopProgressBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent overflow-hidden pointer-events-none">
      <div className="h-full w-full bg-gradient-to-r from-[#0866F5] via-[#00D2FF] to-[#1677FF] animate-[pulse_1.5s_ease-in-out_infinite]" />
    </div>
  );
}

