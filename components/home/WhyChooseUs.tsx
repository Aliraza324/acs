'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Tag,
  Headphones,
  Truck,
  Award,
  Sparkles,
} from 'lucide-react';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Genuine Products',
    badge: '100% Authentic',
    desc: 'Direct tier-1 sourcing from HP, Dell, Lenovo and Cisco backed by verifiable manufacturer warranties.',
  },
  {
    icon: Tag,
    title: 'Competitive Prices',
    badge: 'Volume Discount',
    desc: 'Transparent B2B pricing, credit terms on approved LPOs, and KRA tax-compliant electronic invoices.',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    badge: 'Certified Engineers',
    desc: 'Dedicated Nairobi-based systems engineers on standby for deployment, SLA coverage, and hardware repair.',
  },
  {
    icon: Truck,
    title: 'Nationwide Delivery',
    badge: 'Across 47 Counties',
    desc: 'Same-day express delivery in Nairobi, 24–48hr insured dispatch to Mombasa, Kisumu, Nakuru and nationwide.',
  },
];

const STATS = [
  { value: '14+', label: 'Years in Kenya', desc: 'Established 2011' },
  { value: '5,000+', label: 'Corporate Clients', desc: 'Banks, Logistics, SMEs' },
  { value: '47', label: 'Counties Covered', desc: 'Nationwide Delivery' },
  { value: '99.8%', label: 'On-Time SLA', desc: 'Guaranteed Dispatch' },
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 sm:py-28 bg-[#F7FAFF] relative overflow-hidden border-b border-[#E3EBF7]">
      {/* Decorative ambient gradient blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0866F5]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Headings & 4 Feature Cards */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E3EBF7] text-xs font-bold text-[#0866F5] uppercase tracking-widest mb-3.5 font-sora shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Why Choose ACS Kenya</span>
              </div>
              <h2 className="text-section-title font-sora font-extrabold text-[#10244A]">
                Technology You Can Trust. Partnership You Can Rely On.
              </h2>
              <p className="font-manrope text-base sm:text-lg text-[#718096] mt-3.5 leading-relaxed max-w-xl">
                Supporting businesses across Kenya with authentic IT hardware, expert technical services and dependable technology solutions. From corporate headquarters in Nairobi to field branches nationwide.
              </p>
            </div>

            {/* 2x2 Grid of Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {FEATURES.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="apple-card p-6 bg-white border border-[#E3EBF7] hover:border-[#0866F5]/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#EAF3FF] text-[#0866F5] flex items-center justify-center shadow-2xs">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold text-[#0866F5] bg-[#EAF3FF] px-2.5 py-0.5 rounded-full font-sora">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="font-sora text-sm font-bold text-[#10244A]">
                      {item.title}
                    </h3>
                    <p className="font-manrope text-xs text-[#718096] mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Enterprise Track Record Stats Bar */}
            <div className="pt-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-[#E3EBF7] shadow-xs">
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-center sm:text-left">
                    <div className="font-sora text-xl sm:text-2xl font-black text-[#0866F5]">
                      {stat.value}
                    </div>
                    <div className="font-sora text-xs font-bold text-[#10244A] mt-0.5">
                      {stat.label}
                    </div>
                    <div className="font-manrope text-[10px] text-[#718096]">
                      {stat.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Layered 4K Specialist Composition with Depth */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Visual presentation box with layered depth */}
            <div className="relative w-full max-w-md aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/80 bg-slate-900 group">
              {/* High-Resolution Unsplash Specialist Portrait */}
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=85"
                alt="ACS Kenya Senior Enterprise Technology Specialist and Infrastructure Engineer"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Atmospheric Deep Blue Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B49]/90 via-[#071B49]/25 to-transparent" />

              {/* Internal Cyan Glow Aura */}
              <div className="absolute top-6 right-6 w-44 h-44 rounded-full bg-[#00D2FF]/20 blur-3xl pointer-events-none" />

              {/* Floating Credential Badge 1: 14+ Years (Top Left) */}
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.35 }}
                className="animate-float-badge-1 absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-white/80 z-20 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EAF3FF] text-[#0866F5] flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-sora text-xs font-black text-[#10244A]">14+ Years</div>
                  <div className="font-manrope text-[11px] text-[#718096] font-medium">Serving Kenya</div>
                </div>
              </motion.div>

              {/* Floating Credential Badge 2: Certified Specialists (Bottom Right) */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.45 }}
                className="animate-float-badge-2 absolute bottom-6 right-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-white/80 z-20 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-sora text-xs font-black text-[#10244A]">HPE &amp; Dell</div>
                  <div className="font-manrope text-[11px] text-[#718096] font-medium">Certified Engineers</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
