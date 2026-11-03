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
      setTimeout(() => inputRef.current?.focus(), 60);
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
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-3 sm:pt-20 px-2 sm:px-6 font-manrope overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Dialog Container: Responsive for 320px up to 4K */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-[#E5ECF7] z-10 my-2 sm:my-4"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-3.5 py-3 sm:px-5 sm:py-4 border-b border-[#E5ECF7] gap-2.5 sm:gap-3 bg-[#F5F8FF]/50">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#0866F5] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search servers, laptops, printers..."
                className="w-full text-xs sm:text-base font-semibold text-[#10244A] placeholder-slate-400 bg-transparent outline-none font-manrope min-w-0"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer shrink-0"
                  aria-label="Clear search input"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              )}
              {/* Close / ESC Button */}
              <button
                onClick={handleClose}
                className="px-2 py-1 text-[11px] sm:text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer shrink-0 flex items-center gap-1"
                aria-label="Close search modal"
              >
                <span className="hidden sm:inline">ESC</span>
                <X className="w-3.5 h-3.5 sm:hidden" />
              </button>
            </div>

            {/* Quick Filter Tags (Horizontal Scrollable) */}
            <div className="px-3 py-2 sm:px-5 sm:py-2.5 bg-[#F5F8FF] border-b border-[#E5ECF7] flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[10px] sm:text-xs font-bold text-[#697B96] shrink-0 font-sora hidden min-[360px]:inline">
                Category:
              </span>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-2.5 sm:px-3.5 py-1 rounded-full text-[10.5px] sm:text-xs font-bold transition-all shrink-0 cursor-pointer ${
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
                  className={`px-2.5 sm:px-3.5 py-1 rounded-full text-[10.5px] sm:text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedCategory === cat.name
                      ? 'bg-[#0866F5] text-white shadow-xs'
                      : 'bg-white text-[#697B96] hover:bg-slate-100 border border-[#E5ECF7]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Results List: Optimized for 320px screens */}
            <div className="max-h-[55vh] sm:max-h-[380px] overflow-y-auto p-2 sm:p-3 divide-y divide-[#E5ECF7]">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl sm:rounded-2xl hover:bg-[#F5F8FF] transition-colors group cursor-pointer gap-2"
                    onClick={() => {
                      setQuickViewProduct(product);
                      onClose();
                    }}
                  >
                    {/* Left: Thumbnail & Details */}
                    <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
                      <div className="w-11 h-11 sm:w-14 sm:h-14 bg-white rounded-lg sm:rounded-xl p-1 sm:p-1.5 flex items-center justify-center shrink-0 border border-[#E5ECF7] overflow-hidden shadow-2xs">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={56}
                          height={56}
                          className="object-contain max-h-9 sm:max-h-12 w-auto group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 text-[9.5px] sm:text-[10px] truncate">
                          <span className="font-sora font-bold text-[#0866F5] uppercase tracking-wider shrink-0">
                            {product.brand}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="font-manrope text-[#697B96] truncate">
                            {product.category}
                          </span>
                        </div>
                        <h4
                          className="font-sora text-xs sm:text-sm font-bold text-[#10244A] truncate group-hover:text-[#0866F5] transition-colors mt-0.5"
                          title={product.name}
                        >
                          {product.name}
                        </h4>
                        <div className="font-sora text-xs sm:text-sm font-extrabold text-[#0866F5] mt-0.5">
                          {formatKSh(product.price)}
                        </div>
                      </div>
                    </div>

                    {/* Right: Quick Action Buttons */}
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="p-1.5 sm:p-2 text-[#0866F5] hover:text-white bg-[#EAF3FF] hover:bg-[#0866F5] rounded-lg sm:rounded-xl transition-all shadow-2xs cursor-pointer active:scale-95"
                        title="Add to Cart"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                      <ArrowRight className="hidden sm:block w-4 h-4 text-slate-300 group-hover:text-[#0866F5] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 sm:py-14 text-center text-slate-500 px-4">
                  <p className="font-sora text-xs sm:text-sm font-bold text-[#10244A]">
                    No hardware found matching &quot;{query}&quot;
                  </p>
                  <p className="font-manrope text-[11px] sm:text-xs text-[#697B96] mt-1">
                    Try searching for &quot;HP&quot;, &quot;Dell&quot;, &quot;Server&quot;, or &quot;Switch&quot;
                  </p>
                </div>
              )}
            </div>

            {/* Footer Summary: Fully Responsive without text collisions */}
            <div className="px-3 py-2 sm:px-5 sm:py-2.5 bg-[#F5F8FF] border-t border-[#E5ECF7] flex flex-col min-[380px]:flex-row items-center justify-between text-[10px] sm:text-xs text-[#697B96] font-manrope gap-0.5 text-center min-[380px]:text-left">
              <span>{filteredProducts.length} verified products found</span>
              <span className="font-sora text-[#0866F5] font-bold text-[10px] sm:text-[11px]">
                ACS Kenya Official Inventory
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
