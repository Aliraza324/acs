'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, PackageOpen } from 'lucide-react';
import { PRODUCTS } from '@/data/catalog';
import { ProductCard } from '@/components/products/ProductCard';

const FILTER_TABS = [
  'All Products',
  'Servers',
  'Business Laptops',
  'Printers & Scanners',
  'Accessories',
  'Networking',
];

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('All Products');

  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeTab === 'All Products') return true;
    if (activeTab === 'Business Laptops' && (product.category === 'Business Laptops' || product.category === 'Business PCs & Laptops')) return true;
    return product.category.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <section id="best-selling-products" className="py-20 sm:py-28 bg-white relative border-b border-[#E3EBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Title and "View All Products" CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF3FF] text-xs font-bold text-[#0866F5] uppercase tracking-widest mb-3 font-sora">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Technology That Performs</span>
            </div>
            <h2 className="text-section-title font-sora font-extrabold text-[#10244A]">
              Featured Products
            </h2>
            <p className="font-manrope text-base sm:text-lg text-[#718096] mt-2.5 max-w-xl">
              Authentic enterprise-grade IT products directly from our Nairobi inventory. Backed by verified manufacturer warranties and nationwide delivery.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#718096] font-manrope">
              Showing {filteredProducts.length} of {PRODUCTS.length} items
            </span>
            <button
              onClick={() => setActiveTab('All Products')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E3EBF7] hover:border-[#0866F5] text-[#0866F5] hover:bg-[#EAF3FF] font-manrope text-xs font-bold transition-all shadow-2xs cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold font-manrope whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#0866F5] text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                  : 'bg-[#F7FAFF] text-[#718096] hover:bg-[#EAF3FF] hover:text-[#0866F5] border border-[#E3EBF7]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <div className="py-24 text-center bg-[#F7FAFF] rounded-3xl border border-dashed border-[#E3EBF7]">
              <PackageOpen className="w-14 h-14 text-slate-300 mx-auto mb-3.5" />
              <h3 className="font-sora text-lg font-bold text-[#10244A]">No hardware items found</h3>
              <p className="font-manrope text-xs text-[#718096] mt-1.5 max-w-sm mx-auto">
                No items currently match this category filter. Please choose another category or contact our team for custom orders.
              </p>
              <button
                onClick={() => setActiveTab('All Products')}
                className="mt-5 px-6 py-2.5 bg-[#0866F5] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer font-manrope hover:bg-[#1677FF] transition-colors"
              >
                Reset Filter
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
