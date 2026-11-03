'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Truck,
  Headphones,
  ArrowRight,
  FileText,
  Server,
  Laptop,
  Activity,
} from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { useGsapScrollAnimation } from '@/hooks/useGsapAnimation';

export function HeroSection() {
  const { openQuoteModal } = useShop();
  const heroRef = useGsapScrollAnimation();

  const titleWords = ['Empowering', 'Businesses', 'with'];

  const scrollToProducts = () => {
    const el = document.getElementById('best-selling-products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#F7FAFF] via-white to-[#F7FAFF] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E3EBF7]"
    >
      {/* Background ambient lighting effects */}
      <div className="gsap-parallax-slow absolute top-8 right-12 w-[600px] h-[600px] bg-gradient-to-br from-[#0866F5]/15 via-[#1677FF]/10 to-[#00D2FF]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-16 w-[480px] h-[480px] bg-[#EAF3FF]/90 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle tech background grid matrix */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(#0866F5 1px, transparent 1px), radial-gradient(#0866F5 1px, #F7FAFF 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Hero Editorial Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
          

            {/* Main Heading with Sora Typography & Word Reveal */}
            <div>
              <h1 className="text-hero-title font-sora font-extrabold text-[#10244A] tracking-tight">
                <span className="block">
                  {titleWords.map((word, i) => (
                    <motion.span
                      key={word}
                      initial={{ opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block mr-3"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.65, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-gradient-to-r from-[#0866F5] via-[#1677FF] to-[#00D2FF] bg-clip-text text-transparent inline-block"
                >
                  Technology
                </motion.span>
              </h1>
            </div>

            {/* Supporting Editorial Paragraph from live site */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="font-manrope text-base sm:text-lg text-[#718096] max-w-xl leading-relaxed"
            >
              Affordable Computer Services (ACS Kenya) supplies &amp; supports HP, Dell and Lenovo servers, business laptops, high-volume printers and full office IT setups across Nairobi and Kenya. We deliver, install and maintain — so your business keeps running.
            </motion.p>
           {/* Primary & Secondary Action CTAs */}
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.55, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
  className="flex w-full min-w-0 flex-nowrap items-center gap-2 sm:gap-4 pt-1"
>
  <button
    onClick={scrollToProducts}
    className="group flex flex-1 min-w-0 items-center justify-center gap-1.5 sm:gap-2.5 whitespace-nowrap px-3 sm:px-7 py-3.5 bg-[#0866F5] hover:bg-[#1677FF] text-white font-manrope font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
  >
    <span>Browse Products</span>
    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform group-hover:translate-x-1" />
  </button>

  <button
    onClick={() => openQuoteModal()}
    className="flex flex-1 min-w-0 items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap px-3 sm:px-7 py-3.5 bg-white hover:bg-[#F7FAFF] text-[#10244A] border-2 border-[#E3EBF7] hover:border-[#0866F5] font-manrope font-bold text-xs sm:text-sm rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-xs"
  >
    <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#0866F5]" />
    <span>Request a Quote</span>
  </button>
</motion.div>

            {/* Three Pillar Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
              className="pt-6 border-t border-[#E3EBF7] grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EAF3FF] text-[#0866F5] flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sora text-xs font-bold text-[#10244A] leading-tight">
                    Fast Delivery
                  </h4>
                  <p className="font-manrope text-[11px] text-[#718096] mt-0.5">Across 47 Counties</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EAF3FF] text-[#0866F5] flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sora text-xs font-bold text-[#10244A] leading-tight">
                    Genuine Products
                  </h4>
                  <p className="font-manrope text-[11px] text-[#718096] mt-0.5">Top Brands (HP, Dell)</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EAF3FF] text-[#0866F5] flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sora text-xs font-bold text-[#10244A] leading-tight">
                    Expert Support
                  </h4>
                  <p className="font-manrope text-[11px] text-[#718096] mt-0.5">24/7 Enterprise SLAs</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: High-Impact Layered 4K Editorial Composition */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[480px] sm:min-h-[540px] lg:min-h-[600px]">
            {/* Concentric Ambient Cyber Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[420px] sm:w-[500px] h-[420px] sm:h-[500px] rounded-full border border-blue-200/50 animate-pulse-slow" />
              <div className="absolute w-[320px] sm:w-[400px] h-[320px] sm:h-[400px] rounded-full border border-[#0866F5]/20" />
              <div className="absolute w-[220px] sm:w-[280px] h-[220px] sm:h-[280px] rounded-full bg-gradient-to-tr from-[#0866F5]/15 via-[#1677FF]/10 to-transparent blur-2xl" />
            </div>

            {/* Main Composition Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-[560px]"
            >
              {/* Primary 4K Data Center Photography Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/80 bg-slate-900 group">
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85"
                    alt="ACS Kenya Enterprise Data Center Server Racks and Infrastructure"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Dark Gradient Overlay for Depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071B49]/90 via-[#071B49]/30 to-transparent" />

                  {/* Overlaid Bottom Hardware Specs Bar */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#0866F5] flex items-center justify-center font-bold text-white shadow-xs">
                        <Server className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold font-sora">
                          HPE ProLiant &amp; Dell PowerEdge
                        </div>
                        <div className="text-[10px] text-blue-200 font-manrope">
                          Dual Xeon Scalable • 3TB ECC RDIMM
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
                      Tier-1 Sourcing
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Specification Card 1: Uptime & SLA (Top Left) */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: -15 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.65, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="animate-float-badge-1 absolute -top-5 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-[#E3EBF7] flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EAF3FF] text-[#0866F5] flex items-center justify-center font-bold shrink-0 shadow-2xs">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-sora text-xs font-black text-[#10244A]">
                      99.999% SLA
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      Verified
                    </span>
                  </div>
                  <div className="font-manrope text-[11px] text-[#718096] mt-0.5">
                    Enterprise Mission Critical
                  </div>
                </div>
              </motion.div>

              {/* Floating Specification Card 2: Authorized Brands (Bottom Right) */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.65, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="animate-float-badge-2 absolute -bottom-5 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-[#E3EBF7] flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1677FF] flex items-center justify-center font-bold shrink-0 shadow-2xs">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-sora text-xs font-black text-[#10244A]">
                      Dell &amp; HP Workstations
                    </span>
                  </div>
                  <div className="font-manrope text-[11px] text-[#718096] mt-0.5">
                    Intel Core Ultra • In Stock Nairobi
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
