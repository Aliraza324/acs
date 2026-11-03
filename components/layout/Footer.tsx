'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  ShieldCheck,
  Clock,
  CreditCard,
  Building2,
  FileText,
} from 'lucide-react';
import { ACSLogo } from '@/components/ui/ACSLogo';
import { COMPANY_INFO } from '@/data/catalog';

export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer-contact" className="bg-[#071B49] text-white pt-20 pb-10 border-t border-blue-900/40 relative font-manrope">
      {/* Decorative ambient lighting glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0866F5]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#00D2FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-16 border-b border-blue-900/60">
          {/* Column 1: Brand Info & KRA Tax Compliance */}
          <div className="lg:col-span-1 space-y-4">
            <ACSLogo variant="dark" />
            <p className="font-manrope text-xs text-blue-100/75 leading-relaxed">
              Affordable Computer Services (ACS Kenya). Your trusted corporate partner for enterprise servers, business laptops, networking, and IT infrastructure solutions across Kenya and East Africa since 2011.
            </p>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-blue-200 space-y-1">
              <div className="font-sora font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>KRA Tax Compliant</span>
              </div>
              <div className="text-[10px] text-blue-300">
                PIN: {COMPANY_INFO.kraPin}
              </div>
            </div>

            {/* Official Social Links from ACS Kenya */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <a
                href={COMPANY_INFO.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#0866F5] text-blue-200 hover:text-white transition-all text-[11px] font-bold"
                aria-label="TikTok"
              >
                TikTok
              </a>
              <a
                href={COMPANY_INFO.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#0866F5] text-blue-200 hover:text-white transition-all text-[11px] font-bold"
                aria-label="Twitter / X"
              >
                X / Twitter
              </a>
              <a
                href={COMPANY_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#0866F5] text-blue-200 hover:text-white transition-all text-[11px] font-bold"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a
                href={COMPANY_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#0866F5] text-blue-200 hover:text-white transition-all text-[11px] font-bold"
                aria-label="Instagram"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-sora text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 font-manrope text-xs text-blue-200/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#best-selling-products" className="hover:text-white transition-colors">
                  Products Catalog ({28}+ items)
                </Link>
              </li>
              <li>
                <Link href="#shop-by-category" className="hover:text-white transition-colors">
                  Quick Categories
                </Link>
              </li>
              <li>
                <Link href="#services-solutions" className="hover:text-white transition-colors">
                  Services &amp; Maintenance
                </Link>
              </li>
              <li>
                <Link href="#case-studies" className="hover:text-white transition-colors">
                  Case Studies &amp; Outcomes
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white transition-colors">
                  Contact Form &amp; Inquiry
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="hover:text-white transition-colors">
                  Client Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Products & Services */}
          <div className="space-y-4">
            <h4 className="font-sora text-xs font-bold text-white uppercase tracking-wider">
              Hardware Solutions
            </h4>
            <ul className="space-y-2.5 font-manrope text-xs text-blue-200/80">
              <li>
                <Link href="#best-selling-products" className="hover:text-white transition-colors">
                  Dell PowerEdge Servers (Xeon)
                </Link>
              </li>
              <li>
                <Link href="#best-selling-products" className="hover:text-white transition-colors">
                  HP ProLiant &amp; DL360 Gen11
                </Link>
              </li>
              <li>
                <Link href="#best-selling-products" className="hover:text-white transition-colors">
                  Apple MacBook Air M2 &amp; HP Spectre
                </Link>
              </li>
              <li>
                <Link href="#best-selling-products" className="hover:text-white transition-colors">
                  HP EliteBook 840 &amp; Pavilion Touch
                </Link>
              </li>
              <li>
                <Link href="#best-selling-products" className="hover:text-white transition-colors">
                  Epson LQ-350 &amp; LQ-690 Dot-Matrix
                </Link>
              </li>
              <li>
                <Link href="#best-selling-products" className="hover:text-white transition-colors">
                  HP Color LaserJet Pro Multi-Function
                </Link>
              </li>
              <li>
                <Link href="#best-selling-products" className="hover:text-white transition-colors">
                  Epson TM-T20III POS Thermal Receipt
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="space-y-4">
            <h4 className="font-sora text-xs font-bold text-white uppercase tracking-wider">
              Nairobi Hub &amp; Contact
            </h4>
            <div className="space-y-3 font-manrope text-xs text-blue-200/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00D2FF] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {COMPANY_INFO.address}, {COMPANY_INFO.city}, {COMPANY_INFO.country}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00D2FF] shrink-0" />
                <a href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`} className="hover:text-white transition-colors font-medium">
                  {COMPANY_INFO.phonePrimary} / {COMPANY_INFO.phoneSecondary}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00D2FF] shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors font-medium">
                  {COMPANY_INFO.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#00D2FF] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {COMPANY_INFO.operatingHours}
                </span>
              </div>
            </div>
          </div>

          {/* Column 5: Secure Payment & Procurement Terms */}
          <div className="space-y-4">
            <h4 className="font-sora text-xs font-bold text-white uppercase tracking-wider">
              Corporate Procurement
            </h4>
            <p className="font-manrope text-xs text-blue-100/70 leading-relaxed">
              We support flexible corporate billing methods across East Africa:
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-blue-200 bg-white/5 p-2 rounded-lg border border-white/10">
                <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-medium">M-Pesa Express &amp; Till Payments</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-blue-200 bg-white/5 p-2 rounded-lg border border-white/10">
                <Building2 className="w-3.5 h-3.5 text-[#00D2FF]" />
                <span className="font-medium">Direct Bank RTGS / Wire Transfer</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-blue-200 bg-white/5 p-2 rounded-lg border border-white/10">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-medium">30-Day Invoicing on Approved LPOs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-300/60 gap-4">
          <p>© {new Date().getFullYear()} Affordable Computer Services (ACS Kenya). All rights reserved.</p>

          <div className="flex items-center gap-5 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-white transition-colors">
              OEM Warranty Terms
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-11 h-11 rounded-2xl bg-[#0866F5] hover:bg-[#1677FF] text-white flex items-center justify-center shadow-2xl z-40 transition-all hover:scale-110 active:scale-95 cursor-pointer border border-blue-400/40"
          title="Scroll to Top"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}
