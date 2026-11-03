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
  Laptop,
  Printer,
  Wrench,
  Layers,
  ArrowRight,
  FileText,
  Sparkles,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { ACSLogo } from '@/components/ui/ACSLogo';
import { useShop } from '@/context/ShopContext';
import { CATEGORIES, SERVICES, COMPANY_INFO } from '@/data/catalog';
import { SearchModal } from './SearchModal';

// Streamlined 5 top-level enterprise navigation links (replaces cluttered 8-link bar)
const NAV_LINKS = [
  { name: 'Products', href: '#best-selling-products', hasDropdown: 'products' },
  { name: 'Services', href: '#services-solutions', hasDropdown: 'services' },
  { name: 'Why ACS', href: '#why-choose-us' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<'categories' | 'services' | null>(null);

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

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 font-manrope ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-[#E3EBF7] py-2 sm:py-2.5'
            : 'bg-[#F7FAFF] border-b border-[#E3EBF7]/80 py-2.5 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: Brand Logo */}
            <Link
              href="/"
              className="group flex items-center shrink-0 focus:outline-none focus:ring-2 focus:ring-[#0866F5] rounded-xl"
              aria-label="ACS Kenya Home"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ACSLogo />
            </Link>

            {/* Center: Desktop Navigation Links (>= 1024px) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.hasDropdown)}
                  onMouseLeave={() => link.hasDropdown && setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 px-3 py-2 text-xs xl:text-sm font-semibold rounded-xl transition-all ${
                      activeDropdown === link.hasDropdown
                        ? 'text-[#0866F5] bg-blue-50/70'
                        : 'text-[#10244A] hover:text-[#0866F5] hover:bg-white/80'
                    }`}
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
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 w-[620px] bg-white rounded-2xl shadow-2xl border border-[#E3EBF7] p-5 z-50 mt-1"
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
                                  {cat.name.includes('Server') ? (
                                    <Server className="w-4 h-4" />
                                  ) : cat.name.includes('Laptop') ? (
                                    <Laptop className="w-4 h-4" />
                                  ) : cat.name.includes('Printer') ? (
                                    <Printer className="w-4 h-4" />
                                  ) : (
                                    <Wrench className="w-4 h-4" />
                                  )}
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

                          {/* Dropdown Footer Banner */}
                          <div className="mt-4 pt-3 border-t border-[#E3EBF7] bg-[#F7FAFF] -mx-5 -mb-5 p-3 px-5 rounded-b-2xl flex items-center justify-between text-xs text-[#718096]">
                            <span className="flex items-center gap-2 font-medium">
                              <Sparkles className="w-3.5 h-3.5 text-[#0866F5]" />
                              <span>Authorized HPE, Dell, Lenovo &amp; Cisco Partner</span>
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
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 w-[580px] bg-white rounded-2xl shadow-2xl border border-[#E3EBF7] p-5 z-50 mt-1"
                        >
                          <div className="pb-3 mb-3 border-b border-[#E3EBF7] flex items-center justify-between">
                            <span className="text-xs font-bold text-[#0866F5] uppercase tracking-wider font-sora flex items-center gap-2">
                              <Wrench className="w-3.5 h-3.5" />
                              <span>Enterprise IT Solutions &amp; SLAs</span>
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
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                              <span>24/7/365 On-Call Emergency SLAs for Corporates</span>
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

            {/* Right: Actions Suite (Responsive for 320px up to 4K) */}
            <div className="flex items-center gap-1.5 min-[380px]:gap-2 sm:gap-2.5 shrink-0">
              {/* Search Trigger Button */}
              {/* Desktop version (>= 1280px): Compact pill with ⌘K */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#718096] bg-white border border-[#E3EBF7] hover:border-[#0866F5] hover:text-[#0866F5] transition-all shadow-2xs cursor-pointer"
                title="Search hardware & services (Cmd+K / Ctrl+K)"
                aria-label="Search hardware"
              >
                <Search className="w-3.5 h-3.5 text-[#718096]" />
                <span>Search</span>
                <kbd className="px-1.5 py-0.5 text-[9.5px] font-mono font-medium text-slate-400 bg-slate-100 rounded border border-slate-200">
                  ⌘K
                </kbd>
              </button>

              {/* Tablet/Mobile Search Icon (< 1280px down to 320px) */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="xl:hidden p-2 sm:p-2.5 rounded-xl bg-white border border-[#E3EBF7] hover:border-[#0866F5] text-[#10244A] hover:text-[#0866F5] transition-all shadow-2xs cursor-pointer"
                title="Search hardware (Cmd+K)"
                aria-label="Search hardware"
              >
                <Search className="w-4 h-4 text-[#718096]" />
              </button>

              {/* Wishlist Trigger (Visible on >= 640px) */}
              <button
                onClick={() => {
                  const el = document.getElementById('best-selling-products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hidden sm:flex relative p-2 sm:p-2.5 rounded-xl bg-white border border-[#E3EBF7] hover:border-[#0866F5] text-[#10244A] hover:text-[#0866F5] transition-all shadow-2xs cursor-pointer"
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

              {/* Cart Drawer Trigger (Always visible, perfectly sized for 320px) */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 sm:p-2.5 rounded-xl bg-white border border-[#E3EBF7] hover:border-[#0866F5] text-[#10244A] hover:text-[#0866F5] transition-all shadow-2xs cursor-pointer"
                title={`Shopping Cart (${cartCount} items)`}
                aria-label="Cart"
              >
                <ShoppingCart className="w-4 h-4 text-[#718096]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0866F5] text-white text-[9.5px] font-bold flex items-center justify-center font-sora animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Primary CTA: Request a Quote (Visible on >= 640px) */}
              <button
                onClick={() => openQuoteModal()}
                className="hidden md:flex items-center gap-1.5 px-3.5 lg:px-4 py-2 rounded-xl bg-[#0866F5] hover:bg-[#1677FF] text-white text-xs font-bold font-sora shadow-sm shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">Request a Quote</span>
              </button>

              {/* Mobile Menu Hamburger (Visible on < 1024px) */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 sm:p-2.5 rounded-xl bg-white border border-[#E3EBF7] text-[#10244A] hover:text-[#0866F5] hover:border-[#0866F5] transition-all cursor-pointer shadow-2xs"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer Overlay (Apple-Grade Full Experience) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'calc(100vh - 54px)' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden border-t border-[#E3EBF7] bg-white/98 backdrop-blur-2xl shadow-2xl overflow-y-auto px-4 py-4 fixed top-[49px] sm:top-[57px] left-0 right-0 bottom-0 z-50 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Instant Search Bar inside Drawer */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#F7FAFF] border border-[#E3EBF7] text-[#718096] text-xs font-medium cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#0866F5]" />
                    <span>Search 25+ hardware products...</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                    FIND
                  </span>
                </button>

                {/* Primary Navigation Links */}
                <div className="space-y-1 pt-1">
                  <Link
                    href="#best-selling-products"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 text-sm font-bold text-[#10244A] hover:text-[#0866F5] hover:bg-[#F7FAFF] rounded-xl transition-colors font-sora"
                  >
                    <span className="flex items-center gap-2.5">
                      <Server className="w-4 h-4 text-[#0866F5]" />
                      <span>Products &amp; Hardware</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>

                  {/* Collapsible Categories inside Mobile Menu */}
                  <div>
                    <button
                      onClick={() =>
                        setMobileExpandedSection(
                          mobileExpandedSection === 'categories' ? null : 'categories'
                        )
                      }
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-[#10244A] hover:text-[#0866F5] hover:bg-[#F7FAFF] rounded-xl transition-colors font-sora cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <Laptop className="w-4 h-4 text-[#0866F5]" />
                        <span>Categories ({CATEGORIES.length})</span>
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          mobileExpandedSection === 'categories' ? 'rotate-180 text-[#0866F5]' : ''
                        }`}
                      />
                    </button>

                    {mobileExpandedSection === 'categories' && (
                      <div className="pl-6 pr-2 py-2 grid grid-cols-1 gap-1 bg-[#F7FAFF] rounded-xl my-1 border border-[#E3EBF7]">
                        {CATEGORIES.map((cat) => (
                          <Link
                            key={cat.id}
                            href="#best-selling-products"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-between py-1.5 px-2 text-xs font-semibold text-[#10244A] hover:text-[#0866F5]"
                          >
                            <span>{cat.name}</span>
                            <span className="text-[10px] text-[#718096] bg-white px-2 py-0.5 rounded-full border border-slate-200">
                              {cat.itemCount} items
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link
                    href="#services-solutions"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 text-sm font-bold text-[#10244A] hover:text-[#0866F5] hover:bg-[#F7FAFF] rounded-xl transition-colors font-sora"
                  >
                    <span className="flex items-center gap-2.5">
                      <Wrench className="w-4 h-4 text-[#0866F5]" />
                      <span>Enterprise Services &amp; SLAs</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>

                  <Link
                    href="#why-choose-us"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 text-sm font-bold text-[#10244A] hover:text-[#0866F5] hover:bg-[#F7FAFF] rounded-xl transition-colors font-sora"
                  >
                    <span className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>Why Choose ACS</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>

                  <Link
                    href="#case-studies"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 text-sm font-bold text-[#10244A] hover:text-[#0866F5] hover:bg-[#F7FAFF] rounded-xl transition-colors font-sora"
                  >
                    <span className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Case Studies &amp; Outcomes</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>

                  <Link
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 text-sm font-bold text-[#10244A] hover:text-[#0866F5] hover:bg-[#F7FAFF] rounded-xl transition-colors font-sora"
                  >
                    <span className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-[#0866F5]" />
                      <span>Contact &amp; Showroom</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                </div>

                {/* Wishlist Link on Mobile */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      const el = document.getElementById('best-selling-products');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#10244A]"
                  >
                    <span className="flex items-center gap-2">
                      <Heart className="w-3.5 h-3.5 text-red-500" />
                      <span>Saved in Wishlist</span>
                    </span>
                    <span className="font-bold text-[#0866F5]">{wishlistCount} items</span>
                  </button>
                </div>
              </div>

              {/* Bottom Actions: Quote CTA + Direct Phone Hotline */}
              <div className="pt-4 pb-2 border-t border-[#E3EBF7] space-y-2.5">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openQuoteModal();
                  }}
                  className="w-full py-3 rounded-xl bg-[#0866F5] hover:bg-[#1677FF] text-white font-sora font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request an Enterprise Quote</span>
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`}
                  className="w-full py-2.5 rounded-xl bg-white border border-[#0866F5]/30 hover:border-[#0866F5] text-[#0866F5] font-sora font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Us: {COMPANY_INFO.phonePrimary}</span>
                </a>

                <div className="flex items-center justify-between text-[11px] text-[#718096] pt-1 px-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#0866F5]" />
                    <span>Vision Plaza, Mombasa Rd</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>Mon-Fri 8am-5:30pm</span>
                  </span>
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
