'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Sparkles, Mail, ShieldCheck } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useShop();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid corporate email address', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubscribed(true);
      showToast('Thank you! You are now subscribed to ACS Kenya enterprise insights.', 'success');
      setEmail('');
    }, 500);
  };

  return (
    <section className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Curved deep navy to electric blue gradient banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#071B49] via-[#0866F5] to-[#06132F] text-white p-8 sm:p-14 lg:p-16 overflow-hidden shadow-2xl border-2 border-blue-400/20">
          {/* Animated decorative cyber waves / glow */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00D2FF]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-[#1677FF]/25 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Column: Form & Copy */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-blue-200 tracking-wider uppercase font-sora">
                <Sparkles className="w-3.5 h-3.5 text-[#00D2FF]" />
                <span>STAY AHEAD IN TECHNOLOGY</span>
              </div>

              <h2 className="text-section-title font-sora font-extrabold tracking-tight text-white leading-tight">
                Technology Insights. Smarter Business.
              </h2>

              <p className="font-manrope text-base text-blue-100/80 max-w-lg leading-relaxed">
                Stay updated with enterprise server releases, HP and Dell promotional discounts, and ICT infrastructure best practices across Kenya.
              </p>

              {/* Form Input */}
              {isSubscribed ? (
                <div className="pt-2 flex items-center gap-3 text-emerald-300 font-semibold text-sm bg-white/10 p-4 rounded-2xl border border-emerald-400/30">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>You are successfully subscribed to ACS Kenya enterprise technology updates!</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="pt-2 flex flex-col sm:flex-row gap-3 max-w-lg"
                >
                  <div className="relative flex-1">
                    <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your corporate email address"
                      className="w-full font-manrope text-sm pl-12 pr-4 py-3.5 rounded-xl bg-white text-[#10244A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00D2FF] shadow-inner font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-7 py-3.5 bg-[#0866F5] hover:bg-[#1677FF] hover:shadow-lg hover:shadow-blue-500/30 text-white font-manrope font-bold text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70 cursor-pointer"
                  >
                    {loading ? (
                      <span>Subscribing...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Subscribe</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              <div className="flex items-center gap-2 text-xs text-blue-200/70 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
                <span>We respect your inbox. Strictly zero spam. Unsubscribe anytime.</span>
              </div>
            </div>

            {/* Right Column: High-Resolution 4K Laptop Photography */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className="relative group w-full flex items-center justify-center"
              >
                <div className="relative w-full max-w-md aspect-16/10 rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                  <Image
                    src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1400&q=85"
                    alt="High performance enterprise business workstation with glowing cyber lighting"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071B49]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 bg-black/40 backdrop-blur-md p-2 px-3 rounded-xl border border-white/10 flex items-center justify-between text-xs text-white">
                    <span className="font-sora font-semibold">Enterprise IT Briefing</span>
                    <span className="text-emerald-400 font-bold">Bi-Weekly</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
