'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { CASE_STUDIES } from '@/data/catalog';
import { useShop } from '@/context/ShopContext';

export function CaseStudiesSection() {
  const { openQuoteModal } = useShop();

  return (
    <section id="case-studies" className="py-20 sm:py-28 bg-[#F7FAFF] relative border-b border-[#E3EBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E3EBF7] text-xs font-bold text-[#0866F5] uppercase tracking-widest mb-3.5 font-sora shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enterprise Case Studies</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="text-section-title font-sora font-extrabold text-[#10244A]"
          >
            Delivering Results for Kenya&apos;s Leaders
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="font-manrope text-base sm:text-lg text-[#718096] mt-3 leading-relaxed"
          >
            Real-world enterprise deployments across financial institutions, logistics terminals, and regional hospital networks.
          </motion.p>
        </div>

        {/* Alternating Editorial Grid */}
        <div className="space-y-16 sm:space-y-20">
          {CASE_STUDIES.map((study, index) => {
            const isReversed = index % 2 === 1;

            return (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* 4K Image Side */}
                <div
                  className={`lg:col-span-6 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/80 bg-slate-900 group aspect-16/10">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071B49]/90 via-[#071B49]/30 to-transparent" />

                    {/* Top Pill: Industry & Location */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#0866F5] font-sora shadow-xs">
                        {study.industry}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[11px] font-medium text-white flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#00D2FF]" />
                        <span>{study.location}</span>
                      </span>
                    </div>

                    {/* Bottom Key Metrics Strip */}
                    <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white">
                      {study.metrics.map((metric) => (
                        <div key={metric.label} className="text-center">
                          <div className="font-sora text-sm sm:text-base font-black text-[#00D2FF]">
                            {metric.value}
                          </div>
                          <div className="font-manrope text-[10px] text-blue-100 truncate">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div
                  className={`lg:col-span-6 space-y-5 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold text-[#0866F5] uppercase tracking-wider font-sora">
                      {study.client}
                    </span>
                    <h3 className="font-sora text-2xl sm:text-3xl font-extrabold text-[#10244A] mt-1.5 leading-snug">
                      {study.title}
                    </h3>
                  </div>

                  {/* Challenge & Solution Cards */}
                  <div className="space-y-3.5">
                    <div className="p-4 rounded-2xl bg-white border border-[#E3EBF7] shadow-xs">
                      <div className="font-sora text-xs font-bold text-red-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <span>The Challenge</span>
                      </div>
                      <p className="font-manrope text-xs sm:text-sm text-[#718096] leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-[#E3EBF7] shadow-xs">
                      <div className="font-sora text-xs font-bold text-[#0866F5] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#0866F5]" />
                        <span>ACS Kenya Solution</span>
                      </div>
                      <p className="font-manrope text-xs sm:text-sm text-[#718096] leading-relaxed">
                        {study.solution}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#EAF3FF] border border-blue-200/60 shadow-xs">
                      <div className="font-sora text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Verified Outcome</span>
                      </div>
                      <p className="font-manrope text-xs sm:text-sm text-[#10244A] font-medium leading-relaxed">
                        {study.outcome}
                      </p>
                    </div>
                  </div>

                  {/* Technology Pills */}
                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    {study.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-manrope text-[11px] font-semibold text-[#4A5D78] bg-white px-3 py-1 rounded-full border border-[#E3EBF7] shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="pt-2">
                    <button
                      onClick={() => openQuoteModal()}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0866F5] hover:text-[#1677FF] font-manrope group cursor-pointer"
                    >
                      <span>Inquire About a Similar Solution for Your Business</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
