'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingCart, Heart, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { formatKSh, calculateDiscount } from '@/lib/utils';

export function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openQuoteModal,
  } = useShop();

  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const discount = calculateDiscount(
    quickViewProduct.price,
    quickViewProduct.originalPrice
  );
  const isWish = isInWishlist(quickViewProduct.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E5ECF7] z-10 my-8"
        >
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 text-[#697B96] hover:text-[#10244A] bg-[#F5F8FF] hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Product Image Box */}
            <div className="bg-[#F5F8FF] p-8 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-[#E5ECF7]">
              {quickViewProduct.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-[#0866F5] text-white text-[11px] font-bold rounded-full shadow-2xs font-sora">
                  {quickViewProduct.badge}
                </span>
              )}

              <div className="w-full h-64 flex items-center justify-center p-4 group">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  width={340}
                  height={260}
                  className="object-contain max-h-56 w-auto transition-transform duration-500 group-hover:scale-105 drop-shadow-md"
                  priority
                />
              </div>

              <div className="w-full mt-4 flex items-center justify-around text-xs text-[#697B96] pt-4 border-t border-[#E5ECF7] font-manrope">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0866F5]" />
                  <span>100% Genuine</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#0866F5]" />
                  <span>Kenya Wide Delivery</span>
                </div>
              </div>
            </div>

            {/* Right: Details & Actions */}
            <div className="p-6 sm:p-8 flex flex-col justify-between font-manrope">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-sora text-xs font-bold text-[#0866F5] uppercase tracking-wider">
                    {quickViewProduct.brand} • {quickViewProduct.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold font-sora">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{quickViewProduct.rating}</span>
                    <span className="text-slate-400 font-normal">
                      ({quickViewProduct.reviewsCount})
                    </span>
                  </div>
                </div>

                <h3 className="font-sora text-xl font-bold text-[#10244A] mt-2 leading-snug">
                  {quickViewProduct.name}
                </h3>

                <p className="font-manrope text-xs text-[#697B96] mt-2 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-sora text-2xl font-black text-[#0866F5]">
                    {formatKSh(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="font-manrope text-sm text-slate-400 line-through">
                      {formatKSh(quickViewProduct.originalPrice)}
                    </span>
                  )}
                  {discount && (
                    <span className="font-sora text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                      Save {discount}%
                    </span>
                  )}
                </div>

                {/* Specifications table */}
                <div className="mt-4 bg-[#F5F8FF] rounded-2xl p-4 border border-[#E5ECF7]">
                  <h4 className="font-sora text-[11px] font-bold text-[#10244A] uppercase tracking-wider mb-2">
                    Key Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                    {Object.entries(quickViewProduct.specs)
                      .slice(0, 4)
                      .map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                          <span className="text-[10px] text-[#697B96] font-medium font-manrope">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="text-[#10244A] font-bold truncate font-manrope">
                            {value}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="mt-6 pt-5 border-t border-[#E5ECF7] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#E5ECF7] rounded-xl bg-[#F5F8FF] px-2 py-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 text-sm font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-800 font-sora">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 text-sm font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(quickViewProduct, quantity);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 py-3 px-4 bg-[#0866F5] hover:bg-[#0652C7] text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer font-manrope"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                      isWish
                        ? 'border-red-200 bg-red-50 text-red-500'
                        : 'border-[#E5ECF7] text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                    }`}
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWish ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={() => {
                    setQuickViewProduct(null);
                    openQuoteModal(quickViewProduct);
                  }}
                  className="w-full py-2.5 text-xs font-bold text-[#0866F5] hover:text-[#0652C7] bg-[#EAF3FF] hover:bg-blue-100 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-manrope"
                >
                  <span>Request Corporate Proforma / Bulk Tender Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
