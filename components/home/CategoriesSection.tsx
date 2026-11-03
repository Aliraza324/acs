'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '@/data/catalog';

export function CategoriesSection() {
  const scrollToProducts = () => {
    const el = document.getElementById('best-selling-products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="shop-by-category" className="py-20 sm:py-28 bg-[#F7FAFF] relative border-b border-[#E3EBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E3EBF7] text-xs font-bold text-[#0866F5] uppercase tracking-widest mb-3.5 font-sora shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>QUICK CATEGORIES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="text-section-title font-sora font-extrabold text-[#10244A]"
          >
            Explore Our Categories
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="font-manrope text-base sm:text-lg text-[#718096] mt-3 max-w-xl mx-auto leading-relaxed"
          >
            Everything your business needs to stay ahead. Enterprise-grade servers, business PCs, multifunction printers, accessories and expert repair services.
          </motion.p>
        </div>

        {/* Categories Grid (5 columns responsive) with Real Downloaded Live Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {CATEGORIES.map((category, index) => {
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                onClick={scrollToProducts}
                className="group apple-card p-4 sm:p-5 flex flex-col justify-between cursor-pointer border border-[#E3EBF7] hover:border-[#0866F5]/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 bg-white"
              >
                <div>
                  {/* Category Image Stage with Real Downloaded Image */}
                  <div className="w-full h-44 rounded-2xl relative overflow-hidden bg-slate-100 mb-4.5 border border-[#E3EBF7]">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 260px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071B49]/70 via-transparent to-transparent" />

                    {/* Top Highlight Badge */}
                    {category.highlight && (
                      <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-white/95 backdrop-blur-md text-[10px] font-bold text-[#0866F5] rounded-full border border-blue-100 shadow-2xs font-sora">
                        {category.highlight}
                      </span>
                    )}

                    <span className="absolute bottom-2.5 left-2.5 text-[10px] font-semibold text-white bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-full font-manrope">
                      {category.itemCount} Items
                    </span>
                  </div>

                  {/* Title & Description from live site */}
                  <h3 className="font-sora text-sm sm:text-base font-bold text-[#10244A] group-hover:text-[#0866F5] transition-colors leading-snug">
                    {category.name}
                  </h3>
                  <p className="font-manrope text-xs text-[#718096] mt-2 line-clamp-3 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Explore Link with Arrow */}
                <div className="mt-5 pt-3.5 border-t border-[#E3EBF7] flex items-center justify-between">
                  <span className="font-manrope text-xs font-bold text-[#0866F5] group-hover:text-[#1677FF] transition-colors">
                    Explore Category
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#EAF3FF] text-[#0866F5] flex items-center justify-center group-hover:bg-[#0866F5] group-hover:text-white group-hover:translate-x-1 transition-all shadow-2xs">
                    <ArrowRight className="w-3.5 h-3.5" />
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
