export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: 'HP' | 'Dell' | 'Lenovo' | 'TP-Link' | 'Western Digital' | 'Cisco' | 'Microsoft' | 'Epson' | 'APC';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount?: number;
  badge?: 'Best Seller' | 'New' | 'Top Rated' | 'Popular' | 'Hot Deal';
  description: string;
  features: string[];
  specs: Record<string, string>;
  image: string;
  gallery?: string[];
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  unsplashImage?: string;
  itemCount: number;
  featured?: boolean;
  highlight?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  content: string;
  rating: number;
  verifiedClient: boolean;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  image: string;
  deliverables: string[];
  sla: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  location: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  image: string;
  technologies: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface QuoteRequest {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  productCategory: string;
  quantity: number;
  notes: string;
}

