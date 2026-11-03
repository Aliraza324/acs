'use client';

import React from 'react';
import { Truck, ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '@/data/catalog';

export function AnnouncementBar() {
  return (
    <div className="bg-[#071B49] text-white text-[10.5px] sm:text-[11px] font-manrope font-medium border-b border-blue-900/40 relative z-50">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between py-1.5 sm:py-2 gap-2">
          {/* Left: Express Delivery Guarantee */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="flex items-center gap-1.5 text-blue-200 truncate">
              <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00D2FF] shrink-0" />
              <span className="truncate">
                <strong className="text-white font-semibold hidden min-[400px]:inline">Complimentary </strong>
                <span className="text-white font-semibold min-[400px]:hidden">Free </span>
                Express Delivery Across Kenya
              </span>
            </div>
            <span className="hidden md:inline text-blue-900">•</span>
            <div className="hidden md:flex items-center gap-1.5 text-blue-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>100% Genuine OEM Hardware</span>
            </div>
          </div>

          {/* Right: Direct Hotline & Location */}
          <div className="flex items-center gap-2 sm:gap-3.5 text-blue-200/90 shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`}
              className="flex items-center gap-1 sm:gap-1.5 hover:text-white transition-colors"
              title={`Call ACS Kenya: ${COMPANY_INFO.phonePrimary}`}
            >
              <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#00D2FF] shrink-0" />
              <span className="font-semibold text-white sm:text-blue-100 text-[10px] sm:text-[11px]">
                {COMPANY_INFO.phonePrimary}
              </span>
            </a>

            <span className="hidden lg:inline text-blue-900">•</span>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="hidden lg:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3 text-[#00D2FF] shrink-0" />
              <span>{COMPANY_INFO.email}</span>
            </a>

            <span className="hidden sm:inline text-blue-900">•</span>
            <div className="hidden sm:flex items-center gap-1 text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-blue-200 font-sora font-semibold">
              <MapPin className="w-2.5 h-2.5 text-[#00D2FF] shrink-0" />
              <span>Vision Plaza, Nairobi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
