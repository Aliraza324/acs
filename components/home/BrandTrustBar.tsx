'use client';

import React from 'react';
import Image from 'next/image';
import { PARTNERS } from '@/data/catalog';
import { Award } from 'lucide-react';

export function BrandTrustBar() {
  // Duplicate partners array for seamless infinite marquee loop
  const marqueePartners = [...PARTNERS, ...PARTNERS];

  return (
    <div className="bg-white border-b border-[#E3EBF7] py-6 sm:py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0866F5]" />
            <span className="font-sora text-xs font-bold text-[#718096] uppercase tracking-wider">
              Authorized Tier-1 Technology Partners
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#0866F5] bg-[#EAF3FF] px-3 py-1 rounded-full border border-blue-100">
            <Award className="w-3.5 h-3.5" />
            <span>Direct Manufacturer Warranty &amp; SLAs in Kenya</span>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex items-center gap-8 sm:gap-12 py-2">
          {marqueePartners.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="group flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#F7FAFF] border border-[#E3EBF7] hover:border-[#0866F5]/40 hover:bg-white hover:shadow-md transition-all duration-300 cursor-default shrink-0"
            >
              {brand.logo ? (
                <div className="relative w-6 h-6 rounded-md overflow-hidden shrink-0">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={24}
                    height={24}
                    className="object-contain w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-2 h-2 rounded-full bg-[#0866F5] group-hover:scale-150 transition-transform" />
              )}
              <div className="font-sora text-sm font-extrabold text-[#10244A] tracking-wider uppercase group-hover:text-[#0866F5] transition-colors">
                {brand.name}
              </div>
              <span className="text-[10px] font-bold text-[#718096] bg-white group-hover:bg-[#EAF3FF] group-hover:text-[#0866F5] px-2 py-0.5 rounded-md border border-[#E3EBF7] transition-colors">
                {brand.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
