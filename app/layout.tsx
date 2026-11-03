import type { Metadata } from 'next';
import './tailwind-built.css';

export const metadata: Metadata = {
  title: 'ACS Kenya — Enterprise IT Hardware & Technology Solutions',
  description:
    'Affordable Computer Services (ACS Kenya) is Kenya’s premier enterprise IT hardware supplier: HP & Dell servers, business laptops, networking infrastructure, and 24/7 technical support.',
  keywords: [
    'ACS Kenya',
    'Enterprise IT Hardware Kenya',
    'HPE ProLiant Servers Nairobi',
    'Dell PowerEdge Kenya',
    'Dell Latitude Business Laptops',
    'HP EliteBook Kenya',
    'Cisco Networking Nairobi',
    'IT Infrastructure East Africa',
  ],
  authors: [{ name: 'Affordable Computer Services (ACS Kenya)' }],
  openGraph: {
    title: 'ACS Kenya — Enterprise Technology. Exceptional Experience.',
    description:
      'Premium IT Hardware, Dedicated Enterprise SLAs & Reliable Technology Infrastructure across Kenya.',
    url: 'https://www.acskenya.com',
    siteName: 'ACS Kenya',
    locale: 'en_KE',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.acskenya.com',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ComputerStore',
  name: 'Affordable Computer Services (ACS Kenya)',
  alternateName: 'ACS Kenya',
  url: 'https://www.acskenya.com',
  logo: 'https://www.acskenya.com/images/acs-logo.png',
  image: 'https://www.acskenya.com/images/hero-tech-showcase.png',
  description:
    'Suppliers of enterprise servers, business laptops, networking equipment, printers, and ICT solutions in Kenya since 2011.',
  telephone: '+254700123456',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Vision Plaza, Mombasa Road',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '13:00',
    },
  ],
  priceRange: 'KSh 1,000 - 500,000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-manrope text-[#10244A] bg-[#F5F8FF] selection:bg-[#0866F5] selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
