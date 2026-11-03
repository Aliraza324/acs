'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ShoppingCart, ArrowRight } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/data/catalog';
import { formatKSh } from '@/lib/utils';
import { useShop } from '@/context/ShopContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToCart, setQuickViewProduct } = useShop();

  const handleClose = useCallback(() => {
    setQuery('');
    setSelectedCategory(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesQuery =
      query.trim() === '' ||
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase());

    const matchesCategory =
      !selectedCategory ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesQuery && matchesCategory;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 sm:px-6 font-manrope">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E5ECF7] z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-5 py-4 border-b border-[#E5ECF7] gap-3">
              <Search className="w-5 h-5 text-[#0866F5] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search enterprise servers, laptops, switches, printers..."
                className="w-full text-base font-semibold text-[#10244A] placeholder-slate-400 bg-transparent outline-none font-manrope"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleClose}
                className="px-2.5 py-1 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Quick Filter Tags */}
            <div className="px-5 py-3 bg-[#F5F8FF] border-b border-[#E5ECF7] flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-xs font-bold text-[#697B96] shrink-0 font-sora">Category:</span>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === null
                    ? 'bg-[#0866F5] text-white shadow-xs'
                    : 'bg-white text-[#697B96] hover:bg-slate-100 border border-[#E5ECF7]'
                }`}
              >
                All
              </button>
              {CATEGORIES.slice(0, 5).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === cat.name ? null : cat.name
                    )
                  }
                  className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedCategory === cat.name
                      ? 'bg-[#0866F5] text-white shadow-xs'
                      : 'bg-white text-[#697B96] hover:bg-slate-100 border border-[#E5ECF7]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Results List */}
            <div className="max-h-[380px] overflow-y-auto p-3 divide-y divide-[#E5ECF7]">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-[#F5F8FF] transition-colors group cursor-pointer"
                    onClick={() => {
                      setQuickViewProduct(product);
                      onClose();
                    }}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-14 h-14 bg-white rounded-xl p-1.5 flex items-center justify-center shrink-0 border border-[#E5ECF7] overflow-hidden shadow-2xs">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={56}
                          height={56}
                          className="object-contain max-h-12 w-auto group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-sora text-[10px] font-bold text-[#0866F5] uppercase tracking-wider">
                            {product.brand}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="font-manrope text-[11px] text-[#697B96]">
                            {product.category}
                          </span>
                        </div>
                        <h4 className="font-sora text-xs sm:text-sm font-bold text-[#10244A] truncate group-hover:text-[#0866F5] transition-colors">
                          {product.name}
                        </h4>
                        <div className="font-sora text-xs font-extrabold text-[#0866F5] mt-0.5">
                          {formatKSh(product.price)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="p-2.5 text-[#0866F5] hover:text-white bg-[#EAF3FF] hover:bg-[#0866F5] rounded-xl transition-all shadow-2xs cursor-pointer"
                        title="Add to Cart"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#0866F5] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-14 text-center text-slate-500">
                  <p className="font-sora text-sm font-bold text-[#10244A]">No products found matching &quot;{query}&quot;</p>
                  <p className="font-manrope text-xs text-[#697B96] mt-1">
                    Try searching for &quot;Dell&quot;, &quot;Server&quot;, or &quot;Switch&quot;
                  </p>
                </div>
              )}
            </div>

            {/* Footer Summary */}
            <div className="px-5 py-3 bg-[#F5F8FF] border-t border-[#E5ECF7] flex items-center justify-between text-xs text-[#697B96] font-manrope">
              <span>Showing {filteredProducts.length} verified IT products</span>
              <span className="font-sora text-[#0866F5] font-bold text-[11px]">ACS Kenya Official Hardware Inventory</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
