'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Send, Building2, Phone, Mail, User } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export function QuoteModal() {
  const { isQuoteModalOpen, setIsQuoteModalOpen, quotePrefillProduct, showToast } = useShop();

  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [customProductModel, setCustomProductModel] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const productModel = customProductModel !== null ? customProductModel : (quotePrefillProduct?.name || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast('Quote request submitted to ACS Kenya enterprise sales!', 'success');
    }, 700);
  };

  const handleClose = () => {
    setIsQuoteModalOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setCustomProductModel(null);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-[#E5ECF7] z-10 font-manrope"
          >
            {/* Header */}
            <div className="bg-[#071B49] p-6 text-white flex items-center justify-between relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-36 h-36 bg-[#0866F5]/35 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <span className="font-sora text-[11px] font-bold text-blue-300 tracking-wider uppercase">
                  Enterprise B2B Hardware Quotation
                </span>
                <h3 className="font-sora text-lg sm:text-xl font-bold mt-0.5">
                  Request an Official Proforma Invoice
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="relative z-10 p-2 text-white/70 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="p-8 sm:p-10 text-center space-y-4">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="font-sora text-xl font-bold text-[#10244A]">Quote Request Received</h4>
                <p className="font-manrope text-sm text-[#697B96] max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-[#10244A]">{fullName || 'Valued Customer'}</span>. An ACS Kenya enterprise sales engineer will review your hardware requirements and email a formal proforma within 2 business hours.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleClose}
                    className="px-7 py-3 bg-[#0866F5] hover:bg-[#0652C7] text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer font-manrope"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4">
                <p className="font-manrope text-xs text-[#697B96]">
                  Fill in your company credentials to receive an itemized tender quotation with 16% VAT breakdown and delivery timeframe.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#10244A] mb-1 font-manrope">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. David Mwangi"
                        className="w-full text-xs pl-9 pr-3 py-2.5 border border-[#E5ECF7] rounded-xl focus:outline-none focus:border-[#0866F5] focus:ring-1 focus:ring-[#0866F5] font-manrope"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#10244A] mb-1 font-manrope">
                      Company / Organization *
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Fintech Ltd"
                        className="w-full text-xs pl-9 pr-3 py-2.5 border border-[#E5ECF7] rounded-xl focus:outline-none focus:border-[#0866F5] focus:ring-1 focus:ring-[#0866F5] font-manrope"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#10244A] mb-1 font-manrope">
                      Corporate Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.co.ke"
                        className="w-full text-xs pl-9 pr-3 py-2.5 border border-[#E5ECF7] rounded-xl focus:outline-none focus:border-[#0866F5] focus:ring-1 focus:ring-[#0866F5] font-manrope"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#10244A] mb-1 font-manrope">
                      Direct Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+254 7XX XXX XXX"
                        className="w-full text-xs pl-9 pr-3 py-2.5 border border-[#E5ECF7] rounded-xl focus:outline-none focus:border-[#0866F5] focus:ring-1 focus:ring-[#0866F5] font-manrope"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3.5">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-[#10244A] mb-1 font-manrope">
                      Hardware Model Requested
                    </label>
                    <input
                      type="text"
                      value={productModel}
                      onChange={(e) => setCustomProductModel(e.target.value)}
                      placeholder="e.g. HPE DL380 Gen10 or Dell Latitude"
                      className="w-full text-xs px-3 py-2.5 border border-[#E5ECF7] rounded-xl focus:outline-none focus:border-[#0866F5] focus:ring-1 focus:ring-[#0866F5] font-manrope"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#10244A] mb-1 font-manrope">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={500}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full text-xs px-3 py-2.5 border border-[#E5ECF7] rounded-xl focus:outline-none focus:border-[#0866F5] focus:ring-1 focus:ring-[#0866F5] font-manrope font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#10244A] mb-1 font-manrope">
                    Specific Hardware Requirements / SLA Needs
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Specify CPU, RAM/SSD configuration, warranty extensions, or rack mounting..."
                    className="w-full text-xs p-3 border border-[#E5ECF7] rounded-xl focus:outline-none focus:border-[#0866F5] focus:ring-1 focus:ring-[#0866F5] resize-none font-manrope"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 text-xs font-semibold text-[#697B96] hover:text-[#10244A] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-[#0866F5] hover:bg-[#0652C7] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition-all disabled:opacity-70 cursor-pointer font-manrope"
                  >
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit RFQ</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
