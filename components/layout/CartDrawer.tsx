'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#E5ECF7]"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#E5ECF7] flex items-center justify-between bg-[#F5F8FF]/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF3FF] flex items-center justify-center text-[#0866F5] shadow-2xs">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-sora text-base font-bold text-[#10244A]">
                      Your Hardware Cart
                    </h2>
                    <p className="font-manrope text-xs text-[#697B96]">
                      {cartCount} {cartCount === 1 ? 'item' : 'items'} selected
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200/50 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free delivery banner */}
              <div className="bg-[#EAF3FF] px-6 py-3 flex items-center gap-2.5 text-xs font-semibold text-[#0866F5] border-b border-blue-100 font-manrope">
                <Truck className="w-4 h-4 shrink-0" />
                <span>Complimentary Delivery across Nairobi &amp; Kenya Wide</span>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#E5ECF7]">
                {cart.length > 0 ? (
                  cart.map(({ product, quantity }) => (
                    <div key={product.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                      <div className="w-20 h-20 bg-[#F5F8FF] rounded-2xl p-2 flex items-center justify-center shrink-0 border border-[#E5ECF7]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={72}
                          height={72}
                          className="object-contain max-h-16 w-auto"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="font-sora text-[10px] font-bold text-[#0866F5] uppercase tracking-wider">
                          {product.brand}
                        </span>
                        <h4 className="font-sora text-xs font-bold text-[#10244A] line-clamp-2 leading-snug mt-0.5">
                          {product.name}
                        </h4>
                        <div className="font-sora text-xs font-extrabold text-[#0866F5] mt-1">
                          {formatKSh(product.price)}
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-[#E5ECF7] rounded-xl bg-[#F5F8FF] overflow-hidden">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="px-2.5 py-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-bold text-[#10244A] font-sora">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="px-2.5 py-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <div className="w-16 h-16 rounded-2xl bg-[#EAF3FF] text-[#0866F5] flex items-center justify-center mb-4 shadow-2xs">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="font-sora text-base font-bold text-[#10244A]">Your cart is empty</h3>
                    <p className="font-manrope text-xs text-[#697B96] max-w-xs mt-1.5">
                      Explore our enterprise hardware catalog to find servers, laptops, and networking switches.
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        const el = document.getElementById('best-selling-products');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="mt-6 px-6 py-3 bg-[#0866F5] hover:bg-[#0652C7] text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer font-manrope"
                    >
                      Browse Featured Products
                    </button>
                  </div>
                )}
              </div>

              {/* Footer Checkout Summary */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-[#E5ECF7] bg-[#F5F8FF]/80 space-y-4">
                  <div className="space-y-2 text-xs font-manrope">
                    <div className="flex justify-between text-[#697B96]">
                      <span>Subtotal</span>
                      <span className="font-semibold text-[#10244A]">{formatKSh(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#697B96]">
                      <span>Standard Kenya Shipping</span>
                      <span className="text-emerald-600 font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-[#10244A] pt-2 border-t border-[#E5ECF7]">
                      <span>Estimated Total</span>
                      <span className="font-sora text-lg text-[#0866F5]">{formatKSh(cartTotal)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        openQuoteModal();
                      }}
                      className="w-full py-3 px-3 bg-white hover:bg-slate-50 text-[#10244A] border border-[#E5ECF7] font-bold text-xs rounded-xl transition-colors text-center cursor-pointer font-manrope shadow-2xs"
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
                      className="w-full py-3 px-3 bg-[#0866F5] hover:bg-[#0652C7] text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer font-manrope"
                    >
                      <span>Checkout</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center pt-1 text-[11px] text-[#697B96] font-manrope">
                    <span>100% Authentic Hardware Guarantee</span>
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
