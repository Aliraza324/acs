'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  ChevronDown,
  Server,
  Cpu,
  ArrowRight,
  FileText,
  Sparkles,
  Layers,
  Wrench,
  Headphones,
} from 'lucide-react';
import { ACSLogo } from '@/components/ui/ACSLogo';
import { useShop } from '@/context/ShopContext';
import { CATEGORIES, SERVICES, COMPANY_INFO } from '@/data/catalog';
import { SearchModal } from './SearchModal';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '#best-selling-products', hasDropdown: 'products' },
  { name: 'Categories', href: '#shop-by-category' },
  { name: 'Services', href: '#services-solutions', hasDropdown: 'services' },
  { name: 'Why ACS', href: '#why-choose-us' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'Reviews', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { cartCount, wishlistCount, setIsCartOpen, openQuoteModal } = useShop();

  // Listen for scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 font-manrope ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E3EBF7] py-2.5'
            : 'bg-[#F7FAFF] border-b border-[#E3EBF7]/80 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Logo */}
            <Link href="/" className="group flex items-center shrink-0">
              <ACSLogo />
            </Link>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.hasDropdown)}
                  onMouseLeave={() => link.hasDropdown && setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-3.5 py-2 text-xs xl:text-sm font-semibold text-[#10244A] hover:text-[#0866F5] rounded-xl hover:bg-white/80 transition-colors"
                  >
                    <span>{link.name}</span>
                    {link.hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          activeDropdown === link.hasDropdown ? 'rotate-180 text-[#0866F5]' : 'text-slate-400'
                        }`}
                      />
                    )}
                  </Link>

                  {/* Mega Dropdown: Hardware Products */}
                  {link.hasDropdown === 'products' && (
                    <AnimatePresence>
                      {activeDropdown === 'products' && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 w-[620px] bg-white rounded-2xl shadow-2xl border border-[#E3EBF7] p-5 z-50"
                        >
                          <div className="pb-3 mb-3 border-b border-[#E3EBF7] flex items-center justify-between">
                            <span className="text-xs font-bold text-[#0866F5] uppercase tracking-wider font-sora flex items-center gap-2">
                              <Server className="w-3.5 h-3.5" />
                              <span>Enterprise Hardware Categories</span>
                            </span>
                            <Link
                              href="#best-selling-products"
                              onClick={() => setActiveDropdown(null)}
                              className="text-xs font-bold text-[#0866F5] hover:underline flex items-center gap-1"
                            >
                              <span>View All Hardware</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>

                          <div className="grid grid-cols-2 gap-2.5">
                            {CATEGORIES.map((cat) => (
                              <Link
                                key={cat.id}
                                href="#best-selling-products"
                                onClick={() => setActiveDropdown(null)}
                                className="group/item p-2.5 rounded-xl hover:bg-[#F7FAFF] border border-transparent hover:border-[#E3EBF7] transition-all flex items-start gap-3"
                              >
                                <div className="w-8 h-8 rounded-lg bg-[#EAF3FF] text-[#0866F5] flex items-center justify-center shrink-0 group-hover/item:bg-[#0866F5] group-hover/item:text-white transition-colors">
                                  <Cpu className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs font-bold text-[#10244A] group-hover/item:text-[#0866F5] transition-colors truncate font-sora">
                                    {cat.name}
                                  </div>
                                  <div className="text-[11px] text-[#718096] truncate mt-0.5">
                                    {cat.highlight || `${cat.itemCount} items`}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>

                          {/* Bottom Banner */}
                          <div className="mt-4 pt-3 border-t border-[#E3EBF7] bg-[#F7FAFF] -mx-5 -mb-5 p-3 px-5 rounded-b-2xl flex items-center justify-between text-xs text-[#718096]">
                            <span className="flex items-center gap-2 font-medium">
                              <Sparkles className="w-3.5 h-3.5 text-[#0866F5]" />
                              <span>Authorized HPE, Dell, Lenovo &amp; Cisco Partner in Nairobi</span>
                            </span>
                            <button
                              onClick={() => {
                                setActiveDropdown(null);
                                openQuoteModal();
                              }}
                              className="text-[#0866F5] font-bold hover:underline cursor-pointer"
                            >
                              Request Bulk Pricing →
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* Mega Dropdown: Services */}
                  {link.hasDropdown === 'services' && (
                    <AnimatePresence>
                      {activeDropdown === 'services' && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white rounded-2xl shadow-2xl border border-[#E3EBF7] p-5 z-50"
                        >
                          <div className="pb-3 mb-3 border-b border-[#E3EBF7] flex items-center justify-between">
                            <span className="text-xs font-bold text-[#0866F5] uppercase tracking-wider font-sora flex items-center gap-2">
                              <Wrench className="w-3.5 h-3.5" />
                              <span>Enterprise IT Services &amp; Support</span>
                            </span>
                            <Link
                              href="#services-solutions"
                              onClick={() => setActiveDropdown(null)}
                              className="text-xs font-bold text-[#0866F5] hover:underline flex items-center gap-1"
                            >
                              <span>Explore All Services</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>

                          <div className="grid grid-cols-2 gap-2.5">
                            {SERVICES.map((srv) => (
                              <Link
                                key={srv.id}
                                href="#services-solutions"
                                onClick={() => setActiveDropdown(null)}
                                className="group/item p-2.5 rounded-xl hover:bg-[#F7FAFF] border border-transparent hover:border-[#E3EBF7] transition-all flex items-start gap-3"
                              >
                                <div className="w-8 h-8 rounded-lg bg-[#EAF3FF] text-[#0866F5] flex items-center justify-center shrink-0 group-hover/item:bg-[#0866F5] group-hover/item:text-white transition-colors">
                                  <Layers className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs font-bold text-[#10244A] group-hover/item:text-[#0866F5] transition-colors truncate font-sora">
                                    {srv.title}
                                  </div>
                                  <div className="text-[11px] text-[#718096] truncate mt-0.5">
                                    {srv.sla}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>

                          <div className="mt-4 pt-3 border-t border-[#E3EBF7] bg-[#F7FAFF] -mx-5 -mb-5 p-3 px-5 rounded-b-2xl flex items-center justify-between text-xs text-[#718096]">
                            <span className="flex items-center gap-2 font-medium">
                              <Headphones className="w-3.5 h-3.5 text-emerald-500" />
                              <span>24/7/365 On-Call Emergency SLAs for Corporate Clients</span>
                            </span>
                            <button
                              onClick={() => {
                                setActiveDropdown(null);
                                openQuoteModal();
                              }}
                              className="text-[#0866F5] font-bold hover:underline cursor-pointer"
                            >
                              Consult an Engineer →
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Right: Actions & CTAs */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Trigger Button with Cmd+K hint */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#718096] bg-white border border-[#E3EBF7] hover:border-[#0866F5] hover:text-[#0866F5] transition-all shadow-2xs cursor-pointer"
                title="Search hardware & services (Cmd+K / Ctrl+K)"
                aria-label="Search hardware"
              >
                <Search className="w-4 h-4 text-[#718096]" />
                <span className="hidden xl:inline">Search hardware...</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-slate-100 rounded border border-slate-200">
                  ⌘K
                </kbd>
              </button>

              {/* Wishlist Trigger */}
              <button
                onClick={() => {
                  const el = document.getElementById('best-selling-products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative p-2.5 rounded-xl bg-white border border-[#E3EBF7] hover:border-[#0866F5] text-[#10244A] hover:text-[#0866F5] transition-all shadow-2xs cursor-pointer"
                title={`Wishlist (${wishlistCount} items)`}
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4 text-[#718096]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center font-sora">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-xl bg-white border border-[#E3EBF7] hover:border-[#0866F5] text-[#10244A] hover:text-[#0866F5] transition-all shadow-2xs cursor-pointer"
                title={`Shopping Cart (${cartCount} items)`}
                aria-label="Cart"
              >
                <ShoppingCart className="w-4 h-4 text-[#718096]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0866F5] text-white text-[10px] font-bold flex items-center justify-center font-sora animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Primary CTA: Request a Quote */}
              <button
                onClick={() => openQuoteModal()}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0866F5] hover:bg-[#1677FF] text-white text-xs font-bold font-sora shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Request a Quote</span>
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-white border border-[#E3EBF7] text-[#10244A] hover:text-[#0866F5] transition-colors cursor-pointer"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden border-t border-[#E3EBF7] bg-white px-4 pt-3 pb-6 shadow-xl overflow-hidden"
            >
              <div className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2.5 text-sm font-semibold text-[#10244A] hover:text-[#0866F5] hover:bg-[#F7FAFF] rounded-xl transition-colors font-sora"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Quick Contact & Quote CTA on Mobile */}
              <div className="mt-5 pt-4 border-t border-[#E3EBF7] space-y-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openQuoteModal();
                  }}
                  className="w-full py-3 rounded-xl bg-[#0866F5] text-white font-sora font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request an Enterprise Quote</span>
                </button>

                <div className="flex items-center justify-between text-xs text-[#718096] pt-1 px-1">
                  <span>Call: {COMPANY_INFO.phonePrimary}</span>
                  <span className="font-semibold text-[#0866F5]">Mon-Fri 8am-5:30pm</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Interactive Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
