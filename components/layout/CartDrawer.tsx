'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, ShieldCheck } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { formatKSh } from '@/lib/utils';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
    openQuoteModal,
  } = useShop();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-manrope">
          {/* Backdrop with smooth blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Wrapper: Full width on mobile (<640px / 320px), clamped max-w-md on desktop */}
          <div className="fixed inset-y-0 right-0 w-full sm:max-w-md max-w-full flex">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-full h-full bg-white shadow-2xl flex flex-col border-l border-[#E5ECF7] overflow-hidden"
            >
              {/* Header */}
              <div className="px-3.5 py-3 sm:px-6 sm:py-4 border-b border-[#E5ECF7] flex items-center justify-between bg-[#F5F8FF]/90 shrink-0">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#EAF3FF] flex items-center justify-center text-[#0866F5] shadow-2xs shrink-0">
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h2 className="font-sora text-sm sm:text-base font-bold text-[#10244A] leading-tight">
                      Your Hardware Cart
                    </h2>
                    <p className="font-manrope text-[11px] sm:text-xs text-[#697B96]">
                      {cartCount} {cartCount === 1 ? 'item' : 'items'} selected
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200/60 transition-colors cursor-pointer"
                  aria-label="Close cart drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Complimentary Express Delivery Banner */}
              <div className="bg-[#EAF3FF] px-3.5 py-2 sm:px-6 sm:py-2.5 flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#0866F5] border-b border-blue-100 font-manrope shrink-0">
                <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#0866F5]" />
                <span className="truncate">Complimentary Express Delivery Across Kenya</span>
              </div>

              {/* Items List (Scrollable Area) */}
              <div className="flex-1 overflow-y-auto px-3.5 py-2 sm:px-6 sm:py-4 divide-y divide-[#E5ECF7]">
                {cart.length > 0 ? (
                  cart.map(({ product, quantity }) => (
                    <div key={product.id} className="py-3 sm:py-4 first:pt-0 last:pb-0 flex gap-2.5 sm:gap-3.5 items-center">
                      {/* Product Thumbnail */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F5F8FF] rounded-xl sm:rounded-2xl p-1.5 sm:p-2 flex items-center justify-center shrink-0 border border-[#E5ECF7]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={64}
                          height={64}
                          className="object-contain max-h-12 sm:max-h-16 w-auto"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <span className="font-sora text-[9px] sm:text-[10px] font-bold text-[#0866F5] uppercase tracking-wider block">
                          {product.brand}
                        </span>
                        <h4 className="font-sora text-[11.5px] sm:text-xs font-bold text-[#10244A] line-clamp-1 sm:line-clamp-2 leading-tight mt-0.5" title={product.name}>
                          {product.name}
                        </h4>
                        <div className="font-sora text-xs sm:text-sm font-extrabold text-[#0866F5] mt-0.5">
                          {formatKSh(product.price)}
                        </div>

                        {/* Stepper & Trash Row */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-[#E5ECF7] rounded-lg sm:rounded-xl bg-[#F5F8FF] overflow-hidden">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 sm:px-2.5 text-xs font-bold text-[#10244A] font-sora min-w-[20px] text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="p-1 sm:p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            title="Remove item"
                            aria-label={`Remove ${product.name} from cart`}
                          >
                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 sm:py-20">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#EAF3FF] text-[#0866F5] flex items-center justify-center mb-3 sm:mb-4 shadow-2xs">
                      <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    <h3 className="font-sora text-sm sm:text-base font-bold text-[#10244A]">Your cart is empty</h3>
                    <p className="font-manrope text-xs text-[#697B96] max-w-xs mt-1 px-4">
                      Explore our enterprise hardware catalog to find servers, laptops, and networking infrastructure.
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        const el = document.getElementById('best-selling-products');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="mt-5 px-5 py-2.5 bg-[#0866F5] hover:bg-[#1677FF] text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer font-manrope"
                    >
                      Browse Featured Products
                    </button>
                  </div>
                )}
              </div>

              {/* Footer Summary & Checkout Actions */}
              {cart.length > 0 && (
                <div className="px-3.5 py-3 sm:p-5 border-t border-[#E5ECF7] bg-[#F5F8FF]/90 space-y-2.5 sm:space-y-3.5 shrink-0">
                  <div className="space-y-1.5 text-xs font-manrope">
                    <div className="flex justify-between text-[#697B96]">
                      <span>Subtotal</span>
                      <span className="font-semibold text-[#10244A]">{formatKSh(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#697B96]">
                      <span>Standard Kenya Shipping</span>
                      <span className="text-emerald-600 font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between items-baseline text-sm font-bold text-[#10244A] pt-1.5 border-t border-[#E5ECF7]">
                      <span>Estimated Total</span>
                      <span className="font-sora text-base sm:text-lg text-[#0866F5] font-extrabold">{formatKSh(cartTotal)}</span>
                    </div>
                  </div>

                  {/* Responsive Buttons: Grid on >=360px, Flex-col on ultra-small 320px */}
                  <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        openQuoteModal();
                      }}
                      className="w-full py-2.5 px-3 bg-white hover:bg-slate-50 text-[#10244A] border border-[#E5ECF7] font-bold text-xs rounded-xl transition-colors text-center cursor-pointer font-manrope shadow-2xs"
                    >
                      Request Proforma
                    </button>
                    <button
                      onClick={() => {
                        alert(
                          `Proceeding to ACS Kenya Secure Checkout.\n\nTotal: ${formatKSh(
                            cartTotal
                          )}\nPayment Options: M-Pesa Till / Paybill, Bank Wire (RTGS), Visa & Mastercard.`
                        );
                      }}
                      className="w-full py-2.5 px-3 bg-[#0866F5] hover:bg-[#1677FF] text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer font-manrope active:scale-[0.98]"
                    >
                      <span>Checkout</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center pt-0.5 text-[10px] sm:text-[11px] text-[#697B96] font-manrope">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span>100% Authentic Hardware</span>
                    </span>
                    <button onClick={clearCart} className="hover:text-red-500 underline cursor-pointer">
                      Clear Cart
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
