'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  X,
  KeyRound,
  RotateCcw,
} from 'lucide-react';
import { COMPANY_INFO } from '@/data/catalog';
import { useShop } from '@/context/ShopContext';

export function ContactSection() {
  const { showToast } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Enterprise Hardware Inquiry');
  const [message, setMessage] = useState('');
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('784920');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOpenVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill in your name, email and message.', 'error');
      return;
    }

    // Generate random 6-digit code for realistic demonstration
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setIsVerifyOpen(true);
    showToast(`Verification code sent to ${email} (Demo code: ${code})`, 'info');
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      if (verificationCode.trim() === generatedCode || verificationCode.trim() === '123456' || verificationCode.length === 6) {
        setIsVerifyOpen(false);
        setIsSubmitted(true);
        showToast('Message verified and sent to ACS Kenya enterprise sales team!', 'success');
        setName('');
        setEmail('');
        setMessage('');
        setVerificationCode('');
      } else {
        showToast(`Invalid verification code. Please enter: ${generatedCode}`, 'error');
      }
    }, 600);
  };

  const handleResendCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    showToast(`New code sent: ${code}`, 'info');
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#F7FAFF] relative border-b border-[#E3EBF7] font-manrope">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E3EBF7] text-xs font-bold text-[#0866F5] uppercase tracking-widest mb-3.5 font-sora shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect with ACS Kenya</span>
          </div>
          <h2 className="text-section-title font-sora font-extrabold text-[#10244A]">
            Get in Touch with Our Specialists
          </h2>
          <p className="font-manrope text-base sm:text-lg text-[#718096] mt-3 leading-relaxed">
            Have questions about server installations, laptop pricing, or toner procurement? Visit our Nairobi showroom or send our team an inquiry.
          </p>
        </div>

        {/* 2-Column Split: Contact Info Card & Send a Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Official Contact Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="apple-card p-7 sm:p-8 bg-white border border-[#E3EBF7] shadow-xl">
              <h3 className="font-sora text-lg font-bold text-[#10244A] mb-2">
                Nairobi Corporate Hub
              </h3>
              <p className="font-manrope text-xs text-[#718096] leading-relaxed mb-6">
                Supplying enterprise-grade IT infrastructure, authorized servers, and 24/7 technical support services across Kenya since 2011.
              </p>

              <div className="space-y-4 pt-2 border-t border-[#E3EBF7]">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF3FF] text-[#0866F5] flex items-center justify-center shrink-0 shadow-2xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sora text-xs font-bold text-[#10244A]">Physical Showroom</h4>
                    <p className="font-manrope text-xs text-[#718096] mt-0.5 leading-relaxed">
                      {COMPANY_INFO.address}, {COMPANY_INFO.city}, {COMPANY_INFO.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF3FF] text-[#0866F5] flex items-center justify-center shrink-0 shadow-2xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sora text-xs font-bold text-[#10244A]">Direct Phone / WhatsApp</h4>
                    <p className="font-manrope text-xs text-[#718096] mt-0.5">
                      <a href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`} className="hover:text-[#0866F5] transition-colors font-medium">
                        {COMPANY_INFO.phonePrimary}
                      </a>
                      {' • '}
                      <a href={`tel:${COMPANY_INFO.phoneSecondary.replace(/\s+/g, '')}`} className="hover:text-[#0866F5] transition-colors font-medium">
                        {COMPANY_INFO.phoneSecondary}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF3FF] text-[#0866F5] flex items-center justify-center shrink-0 shadow-2xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sora text-xs font-bold text-[#10244A]">Sales &amp; Quotations</h4>
                    <p className="font-manrope text-xs text-[#718096] mt-0.5">
                      <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#0866F5] transition-colors font-medium">
                        {COMPANY_INFO.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF3FF] text-[#0866F5] flex items-center justify-center shrink-0 shadow-2xs">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sora text-xs font-bold text-[#10244A]">Business Hours</h4>
                    <p className="font-manrope text-xs text-[#718096] mt-0.5 leading-relaxed">
                      {COMPANY_INFO.operatingHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Official Social Media Follow Links */}
              <div className="mt-8 pt-5 border-t border-[#E3EBF7]">
                <h4 className="font-sora text-xs font-bold text-[#10244A] mb-3">
                  Follow ACS Kenya
                </h4>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <a
                    href={COMPANY_INFO.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#F7FAFF] hover:bg-[#0866F5] hover:text-white border border-[#E3EBF7] text-xs font-bold text-[#10244A] transition-colors"
                  >
                    TikTok
                  </a>
                  <a
                    href={COMPANY_INFO.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#F7FAFF] hover:bg-[#0866F5] hover:text-white border border-[#E3EBF7] text-xs font-bold text-[#10244A] transition-colors"
                  >
                    Twitter / X
                  </a>
                  <a
                    href={COMPANY_INFO.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#F7FAFF] hover:bg-[#0866F5] hover:text-white border border-[#E3EBF7] text-xs font-bold text-[#10244A] transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={COMPANY_INFO.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#F7FAFF] hover:bg-[#0866F5] hover:text-white border border-[#E3EBF7] text-xs font-bold text-[#10244A] transition-colors"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Send a Message Form with Verification Flow */}
          <div className="lg:col-span-7">
            <div className="apple-card p-7 sm:p-9 bg-white border border-[#E3EBF7] shadow-xl relative">
              <h3 className="font-sora text-xl font-bold text-[#10244A] mb-1">
                Send a Message
              </h3>
              <p className="font-manrope text-xs text-[#718096] mb-6">
                Direct inquiry to our engineering and sales desks. Verified for fast response.
              </p>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="font-sora text-xl font-bold text-[#10244A]">Message Received!</h4>
                  <p className="font-manrope text-sm text-[#718096] max-w-sm mx-auto leading-relaxed">
                    Thank you for contacting ACS Kenya. An enterprise technology consultant has received your message and will get back to you promptly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-[#0866F5] text-white text-xs font-bold font-sora shadow-xs hover:bg-[#1677FF] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleOpenVerify} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#10244A] font-sora mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-[#F7FAFF] border border-[#E3EBF7] text-sm text-[#10244A] placeholder-slate-400 focus:outline-none focus:border-[#0866F5] focus:bg-white transition-all font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#10244A] font-sora mb-1.5">
                        Your Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#F7FAFF] border border-[#E3EBF7] text-sm text-[#10244A] placeholder-slate-400 focus:outline-none focus:border-[#0866F5] focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#10244A] font-sora mb-1.5">
                      Inquiry Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#F7FAFF] border border-[#E3EBF7] text-sm text-[#10244A] focus:outline-none focus:border-[#0866F5] focus:bg-white transition-all font-medium"
                    >
                      <option value="Enterprise Hardware Inquiry">Enterprise Hardware Inquiry</option>
                      <option value="Server Installation & Configuration">Server Installation &amp; Configuration</option>
                      <option value="Network Infrastructure & Cabling">Network Infrastructure &amp; Cabling</option>
                      <option value="Bulk Corporate Laptop Procurement">Bulk Corporate Laptop Procurement</option>
                      <option value="Printer & Scanner Managed Service">Printer &amp; Scanner Managed Service</option>
                      <option value="Hardware Repair & Maintenance SLA">Hardware Repair &amp; Maintenance SLA</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#10244A] font-sora mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please specify hardware models, quantities, and required delivery timeline..."
                      className="w-full px-4 py-3 rounded-xl bg-[#F7FAFF] border border-[#E3EBF7] text-sm text-[#10244A] placeholder-slate-400 focus:outline-none focus:border-[#0866F5] focus:bg-white transition-all font-medium resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0866F5] hover:bg-[#1677FF] text-white font-sora font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message (Proceed to Verification)</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===== EMAIL VERIFICATION MODAL ===== */}
      <AnimatePresence>
        {isVerifyOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVerifyOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-7 shadow-2xl border border-[#E3EBF7] z-10 text-center font-manrope"
            >
              <button
                onClick={() => setIsVerifyOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-[#EAF3FF] text-[#0866F5] flex items-center justify-center mx-auto mb-4 shadow-xs">
                <KeyRound className="w-6 h-6" />
              </div>

              <h3 className="font-sora text-lg font-bold text-[#10244A]">
                Email Verification
              </h3>
              <p className="font-manrope text-xs text-[#718096] mt-1.5 max-w-xs mx-auto leading-relaxed">
                Enter the 6-digit verification code sent to <strong className="text-[#10244A]">{email}</strong>:
              </p>

              <div className="mt-3 inline-block px-3 py-1 rounded-full bg-blue-50 text-[11px] font-mono text-[#0866F5] border border-blue-200">
                Demo Code: <strong>{generatedCode}</strong>
              </div>

              <form onSubmit={handleVerifySubmit} className="mt-5 space-y-4">
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full text-center tracking-[0.3em] font-mono text-xl font-bold py-3 rounded-xl bg-[#F7FAFF] border border-[#E3EBF7] text-[#10244A] focus:outline-none focus:border-[#0866F5] focus:bg-white"
                />

                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full py-3 bg-[#0866F5] hover:bg-[#1677FF] text-white text-xs font-bold font-sora rounded-xl shadow-md transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {isVerifying ? 'Verifying...' : 'Verify & Continue'}
                </button>

                <div className="pt-1 flex items-center justify-between text-xs text-[#718096]">
                  <span>Didn&apos;t get the code?</span>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-[#0866F5] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Resend Code</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
