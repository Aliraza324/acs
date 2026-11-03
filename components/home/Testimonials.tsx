'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Star, CheckCircle2, Sparkles, Building2 } from 'lucide-react';
import { TESTIMONIALS } from '@/data/catalog';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-white relative overflow-hidden border-b border-[#E3EBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF3FF] text-xs font-bold text-[#0866F5] uppercase tracking-widest mb-3.5 font-sora">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Testimonials</span>
          </div>
          <h2 className="text-section-title font-sora font-extrabold text-[#10244A]">
            What Our Clients Say
          </h2>
          <p className="font-manrope text-base sm:text-lg text-[#718096] mt-3 max-w-xl mx-auto leading-relaxed">
            Trusted by businesses across Kenya. Real reviews from corporate IT managers, infrastructure directors, and CTOs.
          </p>
        </div>

        {/* Split Editorial Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Corporate Architecture 4K Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-2 border-[#E3EBF7] group aspect-4/3 sm:aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85"
                alt="ACS Kenya Enterprise Technology Corporate Client Hub in Nairobi"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B49]/95 via-[#071B49]/40 to-transparent flex items-end p-7 sm:p-8">
                <div>
                  <span className="font-sora text-[10px] font-extrabold text-[#00D2FF] uppercase tracking-widest flex items-center gap-1.5">
                    <Building2 className="w-3 h-3" />
                    <span>Nairobi Corporate Technology Partner</span>
                  </span>
                  <h4 className="font-sora text-white font-extrabold text-lg sm:text-xl mt-1.5 leading-snug">
                    Empowering 5,000+ Enterprises Across Kenya
                  </h4>
                  <p className="font-manrope text-xs text-blue-100/80 mt-1.5 leading-relaxed">
                    Deploying high-availability servers, business laptops &amp; fiber backbones to leading banks, logistics depots, and healthcare centers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Testimonial Carousel Card */}
          <div className="lg:col-span-7 relative">
            <div className="apple-card p-8 sm:p-12 border border-[#E3EBF7] relative min-h-[380px] flex flex-col justify-between bg-[#F7FAFF]/80">
              {/* Header with Quote Icon & Rating */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF3FF] text-[#0866F5] flex items-center justify-center shadow-2xs">
                  <Quote className="w-6 h-6" />
                </div>

                <div className="flex items-center gap-1.5 text-amber-500 bg-white px-3.5 py-1.5 rounded-full border border-[#E3EBF7] shadow-2xs">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="font-sora text-xs font-bold text-[#10244A] ml-1">5.0</span>
                </div>
              </div>

              {/* Animated review quote */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6 flex-1 flex flex-col justify-between"
                >
                  <p className="font-manrope text-base sm:text-xl text-[#10244A] font-medium leading-relaxed italic">
                    &quot;{current.content}&quot;
                  </p>

                  {/* Author profile */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#E3EBF7] flex-wrap gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#0866F5] shadow-xs shrink-0">
                        <Image
                          src={current.avatar}
                          alt={current.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-sora text-sm sm:text-base font-bold text-[#10244A]">
                            {current.name}
                          </h4>
                          {current.verifiedClient && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                              <span>Verified Client</span>
                            </span>
                          )}
                        </div>
                        <div className="font-manrope text-xs text-[#718096] mt-0.5">
                          {current.role} • <strong className="text-[#10244A] font-semibold">{current.company}</strong> ({current.location})
                        </div>
                      </div>
                    </div>

                    {/* Navigation Carousel Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={prevTestimonial}
                        className="p-2.5 rounded-xl bg-white hover:bg-[#EAF3FF] text-[#10244A] hover:text-[#0866F5] border border-[#E3EBF7] transition-all cursor-pointer shadow-2xs"
                        aria-label="Previous testimonial"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextTestimonial}
                        className="p-2.5 rounded-xl bg-white hover:bg-[#EAF3FF] text-[#10244A] hover:text-[#0866F5] border border-[#E3EBF7] transition-all cursor-pointer shadow-2xs"
                        aria-label="Next testimonial"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
