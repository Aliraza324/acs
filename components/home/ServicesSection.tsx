'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Server,
  Cpu,
  Network,
  ShieldCheck,
  Wrench,
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Clock,
} from 'lucide-react';
import { SERVICES } from '@/data/catalog';
import { useShop } from '@/context/ShopContext';

const ICON_MAP: Record<string, React.ElementType> = {
  Server,
  Cpu,
  Network,
  ShieldCheck,
  Wrench,
  Users,
};

export function ServicesSection() {
  const { openQuoteModal } = useShop();

  return (
    <section id="services-solutions" className="py-20 sm:py-28 bg-white relative overflow-hidden border-b border-[#E3EBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF3FF] text-xs font-bold text-[#0866F5] uppercase tracking-widest mb-3.5 font-sora"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enterprise Technology Services</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="text-section-title font-sora font-extrabold text-[#10244A]"
          >
            End-to-End IT Solutions &amp; SLAs
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="font-manrope text-base sm:text-lg text-[#718096] mt-3 leading-relaxed"
          >
            From certified rackmount deployment and 10G fiber backbones to preventative SLA maintenance. We keep your mission-critical infrastructure running around the clock.
          </motion.p>
        </div>

        {/* 6 Services Grid (3 columns on lg, 2 on md, 1 on sm) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {SERVICES.map((service, index) => {
            const IconComponent = ICON_MAP[service.iconName] || Server;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                whileHover={{ y: -6 }}
                className="group apple-card p-6 sm:p-7 flex flex-col justify-between border border-[#E3EBF7] hover:border-[#0866F5]/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden bg-white"
              >
                {/* Background 4K Visual Backdrop on hover */}
                <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-6 bg-slate-900">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071B49]/90 via-[#071B49]/40 to-transparent" />

                  {/* Top Floating Icon */}
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md text-[#0866F5] flex items-center justify-center shadow-md border border-white/60">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Bottom SLA Pill */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-[11px] font-semibold text-white/95 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5 text-[#00D2FF] shrink-0" />
                    <span className="truncate">{service.sla}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-sora text-lg font-bold text-[#10244A] group-hover:text-[#0866F5] transition-colors leading-snug">
                      {service.title}
                    </h3>

                    <p className="font-manrope text-xs sm:text-sm text-[#718096] mt-2.5 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {/* Key Deliverables Bullet Points */}
                    <div className="mt-4 pt-3 border-t border-[#E3EBF7] space-y-2">
                      {service.deliverables.slice(0, 3).map((item) => (
                        <div key={item} className="flex items-start gap-2 text-xs text-[#4A5D78]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6 pt-4 border-t border-[#E3EBF7]">
                    <button
                      onClick={() => openQuoteModal()}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#F7FAFF] group-hover:bg-[#0866F5] text-[#0866F5] group-hover:text-white font-manrope text-xs font-bold transition-all duration-300 flex items-center justify-between border border-[#E3EBF7] group-hover:border-[#0866F5] cursor-pointer shadow-2xs"
                    >
                      <span>Inquire / Request Service</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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

