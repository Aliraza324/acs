import React from 'react';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/home/HeroSection';
import { BrandTrustBar } from '@/components/home/BrandTrustBar';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { ServicesSection } from '@/components/home/ServicesSection';
import { CaseStudiesSection } from '@/components/home/CaseStudiesSection';
import { Testimonials } from '@/components/home/Testimonials';
import { ContactSection } from '@/components/home/ContactSection';
import { Newsletter } from '@/components/home/Newsletter';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { QuickViewModal } from '@/components/products/QuickViewModal';
import { QuoteModal } from '@/components/layout/QuoteModal';
import { Toast } from '@/components/ui/Toast';
import { ShopProvider } from '@/context/ShopContext';

export default function Home() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#F7FAFF] text-[#10244A] selection:bg-[#0866F5] selection:text-white">
        {/* Top Announcement Bar */}
        <AnnouncementBar />

        {/* Sticky Main Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Section 6: Cinematic Technology Hero */}
          <HeroSection />

          {/* Section 7: Trusted Brand Partners Marquee Strip */}
          <BrandTrustBar />

          {/* Section 8: Quick Categories */}
          <CategoriesSection />

          {/* Section 9: Featured Products Showcase */}
          <FeaturedProducts />

          {/* Section 10: Why Choose ACS Kenya */}
          <WhyChooseUs />

          {/* Section 11: Enterprise Technology Services & Solutions */}
          <ServicesSection />

          {/* Section 12: Enterprise Case Studies & Success Stories */}
          <CaseStudiesSection />

          {/* Section 13: Customer Testimonials & Reviews */}
          <Testimonials />

          {/* Section: Live Contact Form & Email Verification */}
          <ContactSection />

          {/* Section 14: Cinematic Newsletter Banner */}
          <Newsletter />
        </main>

        {/* Section 15: Dark Navy Enterprise Footer */}
        <Footer />

        {/* Global Drawers & Modals */}
        <CartDrawer />
        <QuickViewModal />
        <QuoteModal />
        <Toast />
      </div>
    </ShopProvider>
  );
}
