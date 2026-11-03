import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export function ACSLogo({ className = '', variant = 'light' }: LogoProps) {
  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-2 min-[380px]:gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Precision Geometric Enterprise Hex / Arrow Emblem */}
      <div className="relative flex items-center justify-center w-7 h-7 min-[380px]:w-8 min-[380px]:h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 shrink-0">
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm sm:drop-shadow-md transition-transform duration-300 group-hover:scale-105"
        >
          {/* Outer high-precision polygon in electric blue */}
          <path
            d="M6 34L22 6L38 34H28L22 22L16 34H6Z"
            fill="url(#acs-grad-main)"
          />
          {/* Inner core dynamic chevron in cyan glow */}
          <path
            d="M17 31L22 19L27 31H21.5L19.5 26.5H24.5L22 21.5L19.5 26.5H17Z"
            fill="url(#acs-grad-accent)"
          />
          <defs>
            <linearGradient id="acs-grad-main" x1="6" y1="6" x2="38" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0866F5" />
              <stop offset="1" stopColor="#04102C" />
            </linearGradient>
            <linearGradient id="acs-grad-accent" x1="17" y1="19" x2="27" y2="31" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00D2FF" />
              <stop offset="1" stopColor="#1677FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typography with Sora */}
      <div className="flex flex-col leading-none font-sora">
        <div className="flex items-baseline tracking-tight">
          <span
            className={`font-extrabold text-lg min-[380px]:text-xl sm:text-2xl tracking-tight transition-colors ${
              isDark ? 'text-white' : 'text-[#071B49]'
            }`}
          >
            ACS
          </span>
          <span className="font-black text-lg min-[380px]:text-xl sm:text-2xl text-[#0866F5] ml-0.5">.</span>
        </div>
        <span
          className={`text-[7.5px] min-[380px]:text-[8.5px] sm:text-[9.5px] font-extrabold tracking-[0.24em] min-[380px]:tracking-[0.28em] uppercase -mt-0.5 ${
            isDark ? 'text-blue-300/90' : 'text-[#0866F5]'
          }`}
        >
          KENYA
        </span>
      </div>
    </div>
  );
}
